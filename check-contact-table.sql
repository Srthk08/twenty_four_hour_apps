-- Check if contact_submissions table exists and has correct structure
-- Run this in Supabase SQL Editor to verify the table setup

-- Check if table exists
SELECT 
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_name = 'contact_submissions'
AND table_schema = 'public';

-- Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if there are any existing records
SELECT COUNT(*) as total_records FROM contact_submissions;

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- Test insert (this will fail if there are issues)
-- Uncomment the lines below to test insert
/*
INSERT INTO contact_submissions (
    first_name,
    last_name,
    email,
    phone,
    company_name,
    project_type,
    project_details,
    message
) VALUES (
    'Test',
    'User',
    'test@example.com',
    '+1234567890',
    'Test Company',
    'custom-app',
    'This is a test message',
    'This is a test message'
) RETURNING *;
*/
