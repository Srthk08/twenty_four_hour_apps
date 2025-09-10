-- Check if cart_customizations table exists and has data
-- Run this in Supabase SQL Editor

-- Check if table exists
SELECT 
    'Table exists' as status,
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_name = 'cart_customizations'
AND table_schema = 'public';

-- Check table structure
SELECT 
    'Table structure' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cart_customizations'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if there are any records
SELECT 
    'Record count' as info,
    COUNT(*) as total_records
FROM cart_customizations;

-- Check RLS policies
SELECT 
    'RLS Policies' as info,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename = 'cart_customizations';

-- Test select (this will show if there are permission issues)
SELECT 
    'Sample data' as info,
    id,
    user_email,
    product_name,
    total_amount,
    created_at
FROM cart_customizations 
LIMIT 5;
