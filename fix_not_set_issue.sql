-- FIX "NOT SET" ISSUE IN CONTACT FORM
-- This will ensure user profile data is properly available and formatted

-- 1. Check current user profiles and their data
SELECT 
    'Current user profiles:' as info,
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

-- 2. Check for profiles with missing or empty contact data
SELECT 
    'Profiles with missing contact data:' as info,
    COUNT(*) as total_profiles,
    COUNT(CASE WHEN phone IS NULL OR phone = '' OR phone = 'Not set' THEN 1 END) as missing_phone,
    COUNT(CASE WHEN company_name IS NULL OR company_name = '' OR company_name = 'Not set' THEN 1 END) as missing_company,
    COUNT(CASE WHEN full_name IS NULL OR full_name = '' OR full_name = 'Not set' THEN 1 END) as missing_name
FROM profiles;

-- 3. Update profiles to remove "Not set" values and set proper defaults
UPDATE profiles 
SET 
    phone = CASE 
        WHEN phone IS NULL OR phone = '' OR phone = 'Not set' THEN ''
        ELSE phone
    END,
    company_name = CASE 
        WHEN company_name IS NULL OR company_name = '' OR company_name = 'Not set' THEN ''
        ELSE company_name
    END,
    full_name = CASE 
        WHEN full_name IS NULL OR full_name = '' OR full_name = 'Not set' THEN ''
        ELSE full_name
    END,
    updated_at = NOW()
WHERE phone IS NULL OR phone = '' OR phone = 'Not set' 
   OR company_name IS NULL OR company_name = '' OR company_name = 'Not set'
   OR full_name IS NULL OR full_name = '' OR full_name = 'Not set';

-- 4. Create a function to get user profile data specifically for contact form
CREATE OR REPLACE FUNCTION get_contact_form_user_data(user_email TEXT)
RETURNS JSON AS $$
DECLARE
    profile_data JSON;
    clean_phone TEXT;
    clean_company TEXT;
    clean_name TEXT;
BEGIN
    SELECT 
        id,
        email,
        COALESCE(full_name, '') as full_name,
        COALESCE(phone, '') as phone,
        COALESCE(company_name, '') as company_name,
        role,
        status
    INTO profile_data
    FROM profiles
    WHERE email = user_email
    LIMIT 1;
    
    -- If no profile found, return empty data
    IF profile_data IS NULL THEN
        RETURN json_build_object(
            'id', NULL,
            'email', user_email,
            'full_name', '',
            'phone', '',
            'company_name', '',
            'role', 'customer',
            'status', 'active'
        );
    END IF;
    
    -- Clean up the data
    clean_phone := COALESCE((profile_data->>'phone')::TEXT, '');
    clean_company := COALESCE((profile_data->>'company_name')::TEXT, '');
    clean_name := COALESCE((profile_data->>'full_name')::TEXT, '');
    
    -- Remove "Not set" values
    IF clean_phone = 'Not set' THEN clean_phone := ''; END IF;
    IF clean_company = 'Not set' THEN clean_company := ''; END IF;
    IF clean_name = 'Not set' THEN clean_name := ''; END IF;
    
    -- Return cleaned data
    RETURN json_build_object(
        'id', profile_data->>'id',
        'email', profile_data->>'email',
        'full_name', clean_name,
        'phone', clean_phone,
        'company_name', clean_company,
        'role', profile_data->>'role',
        'status', profile_data->>'status'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Grant execute permission
GRANT EXECUTE ON FUNCTION get_contact_form_user_data TO authenticated;
GRANT EXECUTE ON FUNCTION get_contact_form_user_data TO anon;

-- 6. Test the function with sample data
SELECT 
    'Testing contact form user data function:' as info,
    get_contact_form_user_data('test@example.com') as test_data;

-- 7. Create sample profiles with proper contact data for testing
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
    'contact.test@example.com',
    'Contact Test User',
    '+91 9876543210',
    'Contact Test Company',
    'customer',
    'active',
    'contact_test_user',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'demo.user@example.com',
    'Demo User',
    '+91 9876543211',
    'Demo Company Ltd',
    'customer',
    'active',
    'demo_user',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    phone = EXCLUDED.phone,
    company_name = EXCLUDED.company_name,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- 8. Test the function with the sample profiles
SELECT 
    'Testing with sample profiles:' as info,
    get_contact_form_user_data('contact.test@example.com') as contact_test_data,
    get_contact_form_user_data('demo.user@example.com') as demo_user_data;

-- 9. Show all profiles after cleanup
SELECT 
    'Profiles after cleanup:' as info,
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

-- 10. Check for any remaining "Not set" values
SELECT 
    'Remaining Not set values:' as info,
    COUNT(CASE WHEN phone = 'Not set' THEN 1 END) as phone_not_set,
    COUNT(CASE WHEN company_name = 'Not set' THEN 1 END) as company_not_set,
    COUNT(CASE WHEN full_name = 'Not set' THEN 1 END) as name_not_set
FROM profiles;

-- 11. Create a function to update user contact info from contact form
CREATE OR REPLACE FUNCTION update_user_contact_from_form(
    user_email TEXT,
    new_phone TEXT DEFAULT NULL,
    new_company_name TEXT DEFAULT NULL,
    new_full_name TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    result JSON;
    clean_phone TEXT;
    clean_company TEXT;
    clean_name TEXT;
BEGIN
    -- Clean the input data
    clean_phone := COALESCE(TRIM(new_phone), '');
    clean_company := COALESCE(TRIM(new_company_name), '');
    clean_name := COALESCE(TRIM(new_full_name), '');
    
    -- Remove "Not set" values
    IF clean_phone = 'Not set' THEN clean_phone := ''; END IF;
    IF clean_company = 'Not set' THEN clean_company := ''; END IF;
    IF clean_name = 'Not set' THEN clean_name := ''; END IF;
    
    -- Update the profile
    UPDATE profiles 
    SET 
        phone = CASE WHEN clean_phone != '' THEN clean_phone ELSE phone END,
        company_name = CASE WHEN clean_company != '' THEN clean_company ELSE company_name END,
        full_name = CASE WHEN clean_name != '' THEN clean_name ELSE full_name END,
        updated_at = NOW()
    WHERE email = user_email;
    
    IF FOUND THEN
        result := json_build_object(
            'success', true,
            'message', 'Contact information updated successfully',
            'email', user_email,
            'phone', clean_phone,
            'company_name', clean_company,
            'full_name', clean_name
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

-- 12. Grant execute permission
GRANT EXECUTE ON FUNCTION update_user_contact_from_form TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_contact_from_form TO anon;

-- 13. Test the update function
SELECT 
    'Testing update function:' as info,
    update_user_contact_from_form(
        'contact.test@example.com',
        '+91 9876543212',
        'Updated Company Name',
        'Updated Full Name'
    ) as update_result;

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
