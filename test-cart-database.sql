-- Test Cart Database Setup
-- Run this in Supabase SQL Editor to verify everything is working

-- Check if table exists
SELECT 
  table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cart_customizations') as table_exists
FROM information_schema.tables 
WHERE table_name = 'cart_customizations';

-- Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'cart_customizations'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'cart_customizations';

-- Test insert (will fail if not authenticated, but that's expected)
-- INSERT INTO cart_customizations (user_email, product_id, product_name, base_price) 
-- VALUES ('test@example.com', 'test-product', 'Test Product', 1000);

-- Show any existing data
SELECT 
  id,
  user_email,
  product_id,
  product_name,
  base_price,
  created_at
FROM cart_customizations 
LIMIT 5;
