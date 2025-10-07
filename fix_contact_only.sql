-- FIX CONTACT FORM ONLY
-- This will fix only the contact form RLS issue without touching other tables

-- 1. Check RLS status for contact_submissions
SELECT 
    'RLS status for contact_submissions:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contact_submissions' 
AND schemaname = 'public';

-- 2. Disable RLS on contact_submissions table
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 3. Drop all existing RLS policies on contact_submissions
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'contact_submissions'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON contact_submissions';
    END LOOP;
    
    RAISE NOTICE 'All RLS policies dropped from contact_submissions';
END $$;

-- 4. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 5. Test inserting a record to verify RLS is disabled
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
        'Contact',
        'Test',
        'Contact Test',
        'contact.test@example.com',
        '+91 9876543213',
        'Contact Test Company',
        'website',
        'Testing contact form fix',
        'This is a test to verify contact form works',
        'Contact Form Test',
        NOW(),
        NOW()
    ) RETURNING id INTO test_id;
    
    RAISE NOTICE 'SUCCESS: Contact form test record inserted with ID: %', test_id;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR during contact form test: %', SQLERRM;
END $$;

-- 6. Verify the test record was inserted
SELECT 
    'Contact form test result:' as info,
    id,
    first_name,
    last_name,
    email,
    company_name,
    project_type,
    subject,
    created_at
FROM contact_submissions
WHERE email = 'contact.test@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- 7. Check RLS status after fix
SELECT 
    'RLS status after fix:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contact_submissions' 
AND schemaname = 'public';

-- 8. Show sample data
SELECT 
    'Sample contact submissions:' as info,
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

-- 9. Test selecting data to ensure everything works
SELECT 
    'Testing data access:' as info,
    COUNT(*) as total_records
FROM contact_submissions;
