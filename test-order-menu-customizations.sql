-- Test Order Menu System Customizations with Menu Items
-- Execute this in Supabase SQL Editor to test the functionality

-- Test 1: Check table structure
SELECT 
  'Table Structure' as test_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'order_menu_system_customizations'
AND column_name IN ('menu_items', 'menu_items_count')
ORDER BY column_name;

-- Test 2: Check existing data
SELECT 
  'Existing Data' as test_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN menu_items IS NOT NULL THEN 1 END) as records_with_menu_items,
  AVG(menu_items_count) as avg_menu_items_count
FROM order_menu_system_customizations;

-- Test 3: Show sample menu items
SELECT 
  'Sample Menu Items' as test_name,
  user_email,
  restaurant_name,
  menu_items_count,
  jsonb_array_length(menu_items) as actual_menu_count
FROM order_menu_system_customizations
WHERE menu_items IS NOT NULL
AND jsonb_array_length(menu_items) > 0
LIMIT 3;

-- Test 4: Test adding new menu item (should work)
DO $$
DECLARE
  test_id UUID;
  result JSONB;
BEGIN
  -- Get a test record
  SELECT id INTO test_id 
  FROM order_menu_system_customizations 
  WHERE user_email = 'test@example.com' 
  LIMIT 1;
  
  IF test_id IS NOT NULL THEN
    -- Try to add a new menu item
    SELECT add_menu_item_to_customization(
      test_id,
      'Chicken Wings',
      149.00,
      25,
      'Spicy chicken wings',
      'Appetizers'
    ) INTO result;
    
    RAISE NOTICE 'Successfully added new menu item: %', result;
  ELSE
    RAISE NOTICE 'No test record found';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error adding menu item: %', SQLERRM;
END $$;

-- Test 5: Test duplicate prevention (should fail)
DO $$
DECLARE
  test_id UUID;
  result JSONB;
BEGIN
  -- Get a test record
  SELECT id INTO test_id 
  FROM order_menu_system_customizations 
  WHERE user_email = 'test@example.com' 
  LIMIT 1;
  
  IF test_id IS NOT NULL THEN
    -- Try to add a duplicate menu item
    SELECT add_menu_item_to_customization(
      test_id,
      'Pizza Margherita',
      299.00,
      50,
      'Duplicate test',
      'Test'
    ) INTO result;
    
    RAISE NOTICE 'Unexpectedly added duplicate item: %', result;
  ELSE
    RAISE NOTICE 'No test record found';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Duplicate prevention working: %', SQLERRM;
END $$;

-- Test 6: Show current menu items for test user
SELECT 
  'Current Menu Items' as test_name,
  user_email,
  restaurant_name,
  menu_items_count,
  jsonb_pretty(menu_items) as menu_items_formatted
FROM order_menu_system_customizations
WHERE user_email = 'test@example.com'
LIMIT 1;

-- Test 7: Test different variations (should work)
DO $$
DECLARE
  test_id UUID;
  result JSONB;
BEGIN
  -- Get a test record
  SELECT id INTO test_id 
  FROM order_menu_system_customizations 
  WHERE user_email = 'test@example.com' 
  LIMIT 1;
  
  IF test_id IS NOT NULL THEN
    -- Try to add same name, different price (should work)
    SELECT add_menu_item_to_customization(
      test_id,
      'Pizza Margherita',
      399.00,  -- Different price
      50,
      'Premium pizza',
      'Pizza'
    ) INTO result;
    
    RAISE NOTICE 'Successfully added variation with different price: %', result;
    
    -- Try to add same name, different quantity (should work)
    SELECT add_menu_item_to_customization(
      test_id,
      'Pizza Margherita',
      299.00,
      100,  -- Different quantity
      'Large pizza',
      'Pizza'
    ) INTO result;
    
    RAISE NOTICE 'Successfully added variation with different quantity: %', result;
  ELSE
    RAISE NOTICE 'No test record found';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error adding variations: %', SQLERRM;
END $$;

-- Test 8: Check triggers
SELECT 
  'Triggers' as test_name,
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'order_menu_system_customizations'
AND trigger_name LIKE '%menu%';

-- Test 9: Check functions
SELECT 
  'Functions' as test_name,
  routine_name,
  routine_type,
  data_type as return_type
FROM information_schema.routines 
WHERE routine_name LIKE '%menu%'
AND routine_schema = 'public';

-- Test 10: Final data check
SELECT 
  'Final Data Check' as test_name,
  user_email,
  restaurant_name,
  menu_items_count,
  jsonb_array_length(menu_items) as actual_count,
  CASE 
    WHEN menu_items_count = jsonb_array_length(menu_items) THEN 'Count matches'
    ELSE 'Count mismatch'
  END as count_status
FROM order_menu_system_customizations
WHERE user_email = 'test@example.com'
LIMIT 1;

-- Final status
SELECT 'Order Menu System Customizations testing completed!' as status;
