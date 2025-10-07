-- Check Current Contact Table Structure
-- This will show us exactly what columns exist

-- 1. Check if contact_submissions table exists
SELECT 
    'Table exists check:' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contact_submissions' AND table_schema = 'public') 
        THEN 'YES - contact_submissions table exists'
        ELSE 'NO - contact_submissions table does not exist'
    END as status;

-- 2. Show all columns in contact_submissions table
SELECT 
    'Current columns in contact_submissions:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if company_name column exists specifically
SELECT 
    'company_name column check:' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'company_name' AND table_schema = 'public')
        THEN 'YES - company_name column exists'
        ELSE 'NO - company_name column does not exist'
    END as status;

-- 4. Check table permissions
SELECT 
    'Table permissions:' as info,
    grantee,
    privilege_type
FROM information_schema.table_privileges 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public';

-- 5. Try to insert a test record to see what error we get
DO $$
BEGIN
    INSERT INTO contact_submissions (
        name,
        email,
        company_name,
        subject,
        message,
        created_at,
        updated_at
    ) VALUES (
        'Test User',
        'test@example.com',
        'Test Company',
        'Test Subject',
        'Test message',
        NOW(),
        NOW()
    );
    
    RAISE NOTICE 'SUCCESS: Test record inserted successfully';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR: %', SQLERRM;
END $$;
