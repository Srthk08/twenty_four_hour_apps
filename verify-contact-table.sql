-- Verify contact_submissions table exists and is working
-- Run this in Supabase SQL Editor

-- Check if table exists
SELECT 
    'Table exists' as status,
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_name = 'contact_submissions'
AND table_schema = 'public';

-- Check table structure
SELECT 
    'Table structure' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT 
    'RLS Policies' as info,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- Test insert (this should work if table is set up correctly)
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
    'This is a test submission to verify the table works.',
    'This is a test submission to verify the table works.'
) RETURNING id, first_name, last_name, email, created_at;

-- Check total records
SELECT 
    'Total records' as info,
    COUNT(*) as count
FROM contact_submissions;
