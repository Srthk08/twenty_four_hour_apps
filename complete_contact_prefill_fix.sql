-- COMPLETE CONTACT FORM PRE-FILL FIX
-- This will fix all issues with contact form pre-filling user data

-- 1. Check current profiles table structure
SELECT 
    'Current profiles table structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Ensure all required columns exist in profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255) DEFAULT '';

-- 3. Update existing profiles to ensure they have proper data
UPDATE profiles 
SET 
    phone = COALESCE(phone, ''),
    company_name = COALESCE(company_name, ''),
    full_name = COALESCE(full_name, '')
WHERE phone IS NULL OR company_name IS NULL OR full_name IS NULL;

-- 4. Create a function to get user profile data for contact form
CREATE OR REPLACE FUNCTION get_user_profile_for_contact(user_email TEXT)
RETURNS JSON AS $$
DECLARE
    profile_data JSON;
BEGIN
    SELECT json_build_object(
        'id', id,
        'email', email,
        'full_name', COALESCE(full_name, ''),
        'phone', COALESCE(phone, ''),
        'company_name', COALESCE(company_name, ''),
        'role', role,
        'status', status
    ) INTO profile_data
    FROM profiles
    WHERE email = user_email
    LIMIT 1;
    
    RETURN COALESCE(profile_data, '{}'::JSON);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Grant execute permission
GRANT EXECUTE ON FUNCTION get_user_profile_for_contact TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_profile_for_contact TO anon;

-- 6. Create a function to update user profile data
CREATE OR REPLACE FUNCTION update_user_contact_info(
    user_email TEXT,
    new_phone TEXT DEFAULT NULL,
    new_company_name TEXT DEFAULT NULL,
    new_full_name TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    UPDATE profiles 
    SET 
        phone = COALESCE(new_phone, phone),
        company_name = COALESCE(new_company_name, company_name),
        full_name = COALESCE(new_full_name, full_name),
        updated_at = NOW()
    WHERE email = user_email;
    
    IF FOUND THEN
        result := json_build_object(
            'success', true,
            'message', 'Profile updated successfully',
            'email', user_email
        );
    ELSE
        result := json_build_object(
            'success', false,
            'message', 'User not found',
            'email', user_email
        );
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Grant execute permission
GRANT EXECUTE ON FUNCTION update_user_contact_info TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_contact_info TO anon;

-- 7. Test the functions
SELECT 'Testing profile functions...' as info;

-- Test getting profile data
SELECT get_user_profile_for_contact('test@example.com') as test_profile;

-- 8. Create sample profiles for testing
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
) VALUES 
(
    gen_random_uuid(),
    'john.doe@example.com',
    'John Doe',
    '+91 9876543210',
    'John Doe Enterprises',
    'customer',
    'active',
    'john_doe',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'jane.smith@example.com',
    'Jane Smith',
    '+91 9876543211',
    'Smith & Co',
    'customer',
    'active',
    'jane_smith',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    phone = EXCLUDED.phone,
    company_name = EXCLUDED.company_name,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- 9. Test the functions with sample data
SELECT 
    'Testing with sample profiles:' as info,
    get_user_profile_for_contact('john.doe@example.com') as john_profile,
    get_user_profile_for_contact('jane.smith@example.com') as jane_profile;

-- 10. Show all profiles with contact information
SELECT 
    'All profiles with contact information:' as info,
    id,
    email,
    full_name,
    phone,
    company_name,
    role,
    status,
    created_at
FROM profiles
WHERE phone IS NOT NULL AND phone != ''
ORDER BY created_at DESC;

-- 11. Check for profiles missing contact information
SELECT 
    'Profiles missing contact information:' as info,
    COUNT(*) as total_profiles,
    COUNT(CASE WHEN phone IS NULL OR phone = '' THEN 1 END) as missing_phone,
    COUNT(CASE WHEN company_name IS NULL OR company_name = '' THEN 1 END) as missing_company,
    COUNT(CASE WHEN full_name IS NULL OR full_name = '' THEN 1 END) as missing_name
FROM profiles;

-- 12. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_company_name ON profiles(company_name);

-- 13. Grant all necessary permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON profiles TO anon;
GRANT ALL ON profiles TO service_role;

-- 14. Show final profiles table structure
SELECT 
    'Final profiles table structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;
