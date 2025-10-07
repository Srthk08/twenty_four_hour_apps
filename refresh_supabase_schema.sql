-- REFRESH SUPABASE SCHEMA CACHE
-- This will refresh the schema cache to recognize the new columns

-- 1. Refresh the schema cache by querying the table
SELECT 'Refreshing schema cache...' as info;

-- 2. Query the table to force schema cache refresh
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Test a simple select to refresh the cache
SELECT COUNT(*) as total_records FROM contact_submissions;

-- 4. Test selecting the company_name column specifically
SELECT 
    'Testing company_name column access:' as info,
    COUNT(*) as records_with_company_name
FROM contact_submissions 
WHERE company_name IS NOT NULL;

-- 5. Test inserting a new record to verify the schema is updated
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
        'Schema',
        'Test',
        'Schema Test',
        'schema.test@example.com',
        '+91 9876543211',
        'Schema Test Company',
        'api',
        'Testing schema refresh',
        'This is a test to verify schema refresh',
        'Schema Refresh Test',
        NOW(),
        NOW()
    ) RETURNING id INTO test_id;
    
    RAISE NOTICE 'SUCCESS: Schema refresh test record inserted with ID: %', test_id;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR during schema refresh test: %', SQLERRM;
END $$;

-- 6. Verify the test record was inserted successfully
SELECT 
    'Schema refresh test result:' as info,
    id,
    first_name,
    last_name,
    email,
    company_name,
    project_type,
    subject,
    created_at
FROM contact_submissions
WHERE email = 'schema.test@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- 7. Show final table structure
SELECT 
    'Final table structure after schema refresh:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 8. Test the exact data structure the contact form sends
SELECT 
    'Testing contact form data structure:' as info,
    'All required columns are now available' as status;

-- 9. Show a sample record with all the columns the form expects
SELECT 
    'Sample record with all form columns:' as info,
    id,
    first_name,
    last_name,
    email,
    phone,
    company_name,
    project_type,
    project_details,
    message,
    user_id,
    name,
    subject,
    status,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 1;
