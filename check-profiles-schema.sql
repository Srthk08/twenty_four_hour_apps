-- Check the actual schema of the profiles table
-- Run this in your Supabase SQL Editor

-- Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if login_count column exists
SELECT 
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
AND column_name IN ('login_count', 'last_login_at', 'created_at', 'updated_at', 'company_name');

-- Sample data to see what fields are actually populated
SELECT 
    id,
    full_name,
    email,
    company_name,
    created_at,
    updated_at,
    last_login_at,
    login_count
FROM profiles 
LIMIT 3;
