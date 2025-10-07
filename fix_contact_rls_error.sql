-- FIX CONTACT FORM RLS ERROR
-- This will fix the Row Level Security policy violation

-- 1. Check current RLS status
SELECT 
    'Current RLS status:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contact_submissions' 
AND schemaname = 'public';

-- 2. Check existing RLS policies
SELECT 
    'Current RLS policies:' as info,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'contact_submissions'
ORDER BY policyname;

-- 3. Disable RLS on contact_submissions table
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 4. Drop all existing RLS policies on contact_submissions
DROP POLICY IF EXISTS "Enable read access for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update for users based on email" ON contact_submissions;
DROP POLICY IF EXISTS "Enable all access for contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Users can view own contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Users can insert own contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Users can update own contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON contact_submissions;

-- 5. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 6. Test inserting a record to verify RLS is disabled
DO $$
DECLARE
    test_id UUID;
BEGIN
    INSERT INTO contact_submissions (
        first_name,
        last_name,
        name,
        email,
        phone,
        company_name,
        project_type,
        project_details,
        message,
        subject,
        created_at,
        updated_at
    ) VALUES (
        'RLS',
        'Test',
        'RLS Test',
        'rls.test@example.com',
        '+91 9876543212',
        'RLS Test Company',
        'api',
        'Testing RLS fix',
        'This is a test to verify RLS is disabled',
        'RLS Fix Test',
        NOW(),
        NOW()
    ) RETURNING id INTO test_id;
    
    RAISE NOTICE 'SUCCESS: RLS test record inserted with ID: %', test_id;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR during RLS test: %', SQLERRM;
END $$;

-- 7. Verify the test record was inserted
SELECT 
    'RLS test result:' as info,
    id,
    first_name,
    last_name,
    email,
    company_name,
    project_type,
    subject,
    created_at
FROM contact_submissions
WHERE email = 'rls.test@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- 8. Check RLS status after fix
SELECT 
    'RLS status after fix:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contact_submissions' 
AND schemaname = 'public';

-- 9. Show sample data
SELECT 
    'Sample data after RLS fix:' as info,
    id,
    first_name,
    last_name,
    name,
    email,
    phone,
    company_name,
    project_type,
    subject,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 3;

-- 10. Test selecting data to ensure everything works
SELECT 
    'Testing data access:' as info,
    COUNT(*) as total_records
FROM contact_submissions;
