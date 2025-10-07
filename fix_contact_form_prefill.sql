-- FIX CONTACT FORM PRE-FILL ISSUE
-- This will ensure user profile data is properly available for contact form pre-filling

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

-- 2. Check if phone and company_name columns exist in profiles
SELECT 
    'Phone column check:' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'phone' AND table_schema = 'public')
        THEN 'SUCCESS: phone column exists'
        ELSE 'ERROR: phone column missing'
    END as status;

SELECT 
    'Company name column check:' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'company_name' AND table_schema = 'public')
        THEN 'SUCCESS: company_name column exists'
        ELSE 'ERROR: company_name column missing'
    END as status;

-- 3. Add missing columns if they don't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20) DEFAULT '';

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT '';

-- 4. Update existing profiles to ensure they have proper data
UPDATE profiles 
SET 
    phone = COALESCE(phone, ''),
    company_name = COALESCE(company_name, '')
WHERE phone IS NULL OR company_name IS NULL;

-- 5. Grant permissions for profiles table
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON profiles TO anon;
GRANT ALL ON profiles TO service_role;

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_company_name ON profiles(company_name);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 7. Test inserting a sample profile with all fields
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
    gen_random_uuid(),
    'test.profile@example.com',
    'Test Profile User',
    '+91 9876543210',
    'Test Company Ltd',
    'customer',
    'active',
    'test_profile_user',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    phone = EXCLUDED.phone,
    company_name = EXCLUDED.company_name,
    updated_at = NOW();

-- 8. Verify the test profile was created/updated
SELECT 
    'Test profile verification:' as info,
    id,
    email,
    full_name,
    phone,
    company_name,
    role,
    status,
    created_at
FROM profiles
WHERE email = 'test.profile@example.com';

-- 9. Show sample profiles with phone and company data
SELECT 
    'Sample profiles with contact data:' as info,
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
ORDER BY created_at DESC
LIMIT 5;

-- 10. Check if there are any profiles without phone or company data
SELECT 
    'Profiles missing contact data:' as info,
    COUNT(*) as total_profiles,
    COUNT(CASE WHEN phone IS NULL OR phone = '' THEN 1 END) as missing_phone,
    COUNT(CASE WHEN company_name IS NULL OR company_name = '' THEN 1 END) as missing_company
FROM profiles;

-- 11. Show final profiles table structure
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
