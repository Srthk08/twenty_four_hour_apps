-- Test Menu Items Storage
-- This script tests the menu items storage functionality
-- Execute this in Supabase SQL Editor

-- Test 1: Check current menu items
SELECT 
  'Current Menu Items' as test_name,
  COUNT(*) as total_items,
  COUNT(DISTINCT user_email) as unique_users
FROM order_menu_items;

-- Test 2: Check for duplicates (should be 0 after fix)
SELECT 
  'Duplicate Check' as test_name,
  user_email,
  item_name,
  quantity_available,
  COUNT(*) as duplicate_count
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND quantity_available IS NOT NULL
GROUP BY user_email, item_name, quantity_available
HAVING COUNT(*) > 1;

-- Test 3: Show menu items by user
SELECT 
  'Menu Items by User' as test_name,
  user_email,
  restaurant_name,
  COUNT(*) as item_count,
  STRING_AGG(item_name, ', ') as items
FROM order_menu_items
WHERE user_email IS NOT NULL
GROUP BY user_email, restaurant_name
ORDER BY user_email;

-- Test 4: Test duplicate prevention (this should fail if duplicates exist)
-- This is just a test query, not an actual insert
SELECT 
  'Duplicate Prevention Test' as test_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM order_menu_items 
      WHERE user_email = 'test@example.com'
      AND item_name = 'Test Pizza'
      AND quantity_available = 50
    ) THEN 'WOULD BE BLOCKED'
    ELSE 'WOULD BE ALLOWED'
  END as test_result;

-- Test 5: Show sample data
SELECT 
  'Sample Data' as test_name,
  user_email,
  item_name,
  price,
  quantity_available,
  restaurant_name,
  created_at
FROM order_menu_items
WHERE user_email IS NOT NULL
ORDER BY created_at DESC
LIMIT 5;

-- Test 6: Check policies
SELECT 
  'RLS Policies' as test_name,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'order_menu_items';

-- Test 7: Check triggers
SELECT 
  'Triggers' as test_name,
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'order_menu_items';

-- Final status
SELECT 'Menu items test completed!' as status;
