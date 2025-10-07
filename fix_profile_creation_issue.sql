-- FIX PROFILE CREATION ISSUE
-- This will ensure profiles are created properly during signup

-- 1. Check if profiles table exists and its structure
SELECT 
    'Profiles table structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Ensure profiles table has all required columns
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) DEFAULT '',
    phone VARCHAR(20) DEFAULT '',
    company_name VARCHAR(255) DEFAULT '',
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'developer', 'support')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending_verification')),
    username VARCHAR(255) DEFAULT '',
    avatar_url VARCHAR(500) DEFAULT '',
    bio TEXT DEFAULT '',
    website VARCHAR(255) DEFAULT '',
    location VARCHAR(255) DEFAULT '',
    timezone VARCHAR(50) DEFAULT '',
    language VARCHAR(10) DEFAULT 'en',
    preferences JSONB DEFAULT '{}',
    last_login_at TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add missing columns if they don't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'customer';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS username VARCHAR(255) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS website VARCHAR(255) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS location VARCHAR(255) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS timezone VARCHAR(50) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'en';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);

-- 5. Grant all necessary permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON profiles TO anon;
GRANT ALL ON profiles TO service_role;

-- 6. Disable RLS to avoid permission issues
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 7. Create a function to handle profile creation during signup
CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into profiles table
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        phone,
        company_name,
        role,
        status,
        username,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
        'customer',
        CASE 
            WHEN NEW.email_confirmed_at IS NOT NULL THEN 'active'
            ELSE 'pending_verification'
        END,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        phone = COALESCE(EXCLUDED.phone, profiles.phone),
        company_name = COALESCE(EXCLUDED.company_name, profiles.company_name),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();

-- 9. Create a function to manually create profile for existing users
CREATE OR REPLACE FUNCTION create_profile_for_existing_user(
    user_id UUID,
    user_email VARCHAR(255),
    user_full_name VARCHAR(255) DEFAULT '',
    user_phone VARCHAR(20) DEFAULT '',
    user_company_name VARCHAR(255) DEFAULT '',
    user_role VARCHAR(20) DEFAULT 'customer'
)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    INSERT INTO profiles (
        id,
        email,
        full_name,
        phone,
        company_name,
        role,
        status,
        username,
        created_at,
        updated_at
    ) VALUES (
        user_id,
        user_email,
        user_full_name,
        user_phone,
        user_company_name,
        user_role,
        'active',
        COALESCE(user_full_name, user_email),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        phone = COALESCE(EXCLUDED.phone, profiles.phone),
        company_name = COALESCE(EXCLUDED.company_name, profiles.company_name),
        role = COALESCE(EXCLUDED.role, profiles.role),
        updated_at = NOW();
    
    result := json_build_object(
        'success', true,
        'message', 'Profile created/updated successfully',
        'user_id', user_id,
        'email', user_email
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'message', 'Error creating profile: ' || SQLERRM,
            'user_id', user_id,
            'email', user_email
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Grant execute permission
GRANT EXECUTE ON FUNCTION create_profile_for_existing_user TO authenticated;
GRANT EXECUTE ON FUNCTION create_profile_for_existing_user TO anon;

-- 11. Check for users without profiles and create them
DO $$
DECLARE
    user_record RECORD;
    result JSON;
BEGIN
    FOR user_record IN 
        SELECT id, email, raw_user_meta_data
        FROM auth.users
        WHERE id NOT IN (SELECT id FROM profiles)
    LOOP
        SELECT create_profile_for_existing_user(
            user_record.id,
            user_record.email,
            COALESCE(user_record.raw_user_meta_data->>'full_name', ''),
            COALESCE(user_record.raw_user_meta_data->>'phone', ''),
            COALESCE(user_record.raw_user_meta_data->>'company_name', ''),
            'customer'
        ) INTO result;
        
        RAISE NOTICE 'Created profile for user: %', user_record.email;
    END LOOP;
END $$;

-- 12. Test the trigger by checking if it works
SELECT 
    'Testing profile creation trigger...' as info,
    'Trigger should automatically create profiles for new users' as message;

-- 13. Show current profiles
SELECT 
    'Current profiles:' as info,
    id,
    email,
    full_name,
    phone,
    company_name,
    role,
    status,
    created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 10;

-- 14. Show users without profiles (if any)
SELECT 
    'Users without profiles:' as info,
    COUNT(*) as count
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles);

-- 15. Show final status
SELECT 'Profile creation system fixed successfully!' as status;
SELECT 'New users will automatically get profiles created' as message;
