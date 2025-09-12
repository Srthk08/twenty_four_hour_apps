-- How to View Menu Items in Supabase After Update
-- Execute these queries in Supabase SQL Editor to see your menu items

-- 1. BASIC VIEW - See all customizations with menu items
SELECT 
  id,
  user_email,
  restaurant_name,
  owner_name,
  menu_items_count,
  created_at
FROM order_menu_system_customizations
WHERE menu_items_count > 0
ORDER BY created_at DESC;

-- 2. DETAILED VIEW - See menu items in readable format
SELECT 
  id,
  user_email,
  restaurant_name,
  owner_name,
  menu_items_count,
  jsonb_pretty(menu_items) as menu_items_formatted
FROM order_menu_system_customizations
WHERE menu_items_count > 0
ORDER BY created_at DESC;

-- 3. EXPANDED VIEW - Each menu item on separate row
SELECT 
  omc.id as customization_id,
  omc.user_email,
  omc.restaurant_name,
  omc.owner_name,
  (item->>'item_name') as item_name,
  (item->>'price')::DECIMAL as price,
  (item->>'quantity_available')::INTEGER as quantity_available,
  (item->>'item_description') as item_description,
  (item->>'item_category') as item_category,
  (item->>'is_available')::BOOLEAN as is_available,
  (item->>'created_at')::TIMESTAMP as item_created_at
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
ORDER BY omc.created_at DESC, (item->>'item_name');

-- 4. SUMMARY VIEW - Count of items per restaurant
SELECT 
  user_email,
  restaurant_name,
  owner_name,
  menu_items_count,
  COUNT(*) as total_menu_items,
  STRING_AGG(DISTINCT (item->>'item_name'), ', ') as item_names
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
GROUP BY user_email, restaurant_name, owner_name, menu_items_count
ORDER BY menu_items_count DESC;

-- 5. PRICE ANALYSIS - Price range and average
SELECT 
  user_email,
  restaurant_name,
  MIN((item->>'price')::DECIMAL) as min_price,
  MAX((item->>'price')::DECIMAL) as max_price,
  AVG((item->>'price')::DECIMAL) as avg_price,
  COUNT(*) as total_items
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
GROUP BY user_email, restaurant_name
ORDER BY avg_price DESC;

-- 6. CATEGORY ANALYSIS - Items by category
SELECT 
  (item->>'item_category') as category,
  COUNT(*) as item_count,
  AVG((item->>'price')::DECIMAL) as avg_price,
  STRING_AGG(DISTINCT (item->>'item_name'), ', ') as items
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
GROUP BY (item->>'item_category')
ORDER BY item_count DESC;

-- 7. AVAILABILITY CHECK - Available vs unavailable items
SELECT 
  user_email,
  restaurant_name,
  COUNT(*) as total_items,
  COUNT(CASE WHEN (item->>'is_available')::BOOLEAN = true THEN 1 END) as available_items,
  COUNT(CASE WHEN (item->>'is_available')::BOOLEAN = false THEN 1 END) as unavailable_items
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
GROUP BY user_email, restaurant_name
ORDER BY available_items DESC;

-- 8. RECENT ITEMS - Latest added menu items
SELECT 
  omc.user_email,
  omc.restaurant_name,
  (item->>'item_name') as item_name,
  (item->>'price')::DECIMAL as price,
  (item->>'quantity_available')::INTEGER as quantity_available,
  (item->>'created_at')::TIMESTAMP as item_created_at
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
ORDER BY (item->>'created_at')::TIMESTAMP DESC
LIMIT 20;

-- 9. SEARCH BY ITEM NAME - Find specific items
SELECT 
  omc.user_email,
  omc.restaurant_name,
  (item->>'item_name') as item_name,
  (item->>'price')::DECIMAL as price,
  (item->>'quantity_available')::INTEGER as quantity_available,
  (item->>'item_description') as description
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
AND LOWER(item->>'item_name') LIKE LOWER('%pizza%')  -- Change 'pizza' to search term
ORDER BY (item->>'price')::DECIMAL;

-- 10. DUPLICATE CHECK - Check for potential duplicates
SELECT 
  user_email,
  (item->>'item_name') as item_name,
  (item->>'price')::DECIMAL as price,
  (item->>'quantity_available')::INTEGER as quantity_available,
  COUNT(*) as duplicate_count
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
GROUP BY user_email, (item->>'item_name'), (item->>'price'), (item->>'quantity_available')
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 11. TABLE STRUCTURE - See the actual table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'order_menu_system_customizations'
ORDER BY ordinal_position;

-- 12. SAMPLE DATA - Show a complete example
SELECT 
  'Sample Data' as info,
  id,
  user_email,
  restaurant_name,
  menu_items_count,
  menu_items
FROM order_menu_system_customizations
WHERE menu_items_count > 0
LIMIT 1;

-- Success message
SELECT 'Menu items viewing queries ready! Run any of these to see your data.' as status;
