-- Cleanup Duplicate Menu Items
-- This script removes duplicate records based on user_email, item_name, price, and quantity_available
-- Execute this in Supabase SQL Editor

-- First, let's see how many duplicates exist based on item details
SELECT 
  user_email,
  item_name,
  price,
  quantity_available,
  COUNT(*) as duplicate_count
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND price IS NOT NULL
  AND quantity_available IS NOT NULL
GROUP BY user_email, item_name, price, quantity_available
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- Show detailed view of duplicates that will be deleted
WITH duplicates AS (
  SELECT 
    id,
    user_email,
    item_name,
    price,
    quantity_available,
    restaurant_name,
    owner_name,
    created_at,
    ROW_NUMBER() OVER (
      PARTITION BY user_email, item_name, price, quantity_available 
      ORDER BY created_at DESC, id DESC
    ) as rn
  FROM order_menu_items
  WHERE user_email IS NOT NULL 
    AND item_name IS NOT NULL 
    AND price IS NOT NULL
    AND quantity_available IS NOT NULL
)
SELECT 
  'WILL BE DELETED' as action,
  id,
  user_email,
  item_name,
  price,
  quantity_available,
  restaurant_name,
  owner_name,
  created_at
FROM duplicates 
WHERE rn > 1
ORDER BY user_email, item_name, price, quantity_available, created_at;

-- Delete duplicate data - Keep only the most recent record for each item combination
WITH duplicates AS (
  SELECT 
    id,
    user_email,
    item_name,
    price,
    quantity_available,
    created_at,
    ROW_NUMBER() OVER (
      PARTITION BY user_email, item_name, price, quantity_available 
      ORDER BY created_at DESC, id DESC
    ) as rn
  FROM order_menu_items
  WHERE user_email IS NOT NULL 
    AND item_name IS NOT NULL 
    AND price IS NOT NULL
    AND quantity_available IS NOT NULL
)
DELETE FROM order_menu_items 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Show count of deleted duplicates
SELECT 
  COUNT(*) as deleted_duplicates,
  'Duplicate menu items deleted successfully!' as message
FROM (
  SELECT 
    user_email,
    item_name,
    price,
    quantity_available,
    COUNT(*) - 1 as duplicate_count
  FROM order_menu_items
  WHERE user_email IS NOT NULL 
    AND item_name IS NOT NULL 
    AND price IS NOT NULL
    AND quantity_available IS NOT NULL
  GROUP BY user_email, item_name, price, quantity_available
  HAVING COUNT(*) > 1
) as duplicate_groups;

-- Show final count of remaining records
SELECT 
  COUNT(*) as total_records,
  COUNT(DISTINCT CONCAT(user_email, '|', item_name, '|', price, '|', quantity_available)) as unique_item_combinations
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND price IS NOT NULL
  AND quantity_available IS NOT NULL;

-- Verify no duplicates remain based on item details
SELECT 
  user_email,
  item_name,
  price,
  quantity_available,
  COUNT(*) as count
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND price IS NOT NULL
  AND quantity_available IS NOT NULL
GROUP BY user_email, item_name, price, quantity_available
HAVING COUNT(*) > 1;

-- Show remaining unique menu items per user
SELECT 
  user_email,
  restaurant_name,
  owner_name,
  COUNT(*) as total_menu_items,
  COUNT(DISTINCT CONCAT(item_name, '|', price, '|', quantity_available)) as unique_items
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND price IS NOT NULL
  AND quantity_available IS NOT NULL
GROUP BY user_email, restaurant_name, owner_name
ORDER BY user_email;

-- Success message
SELECT 'Duplicate menu items cleanup completed successfully!' as status;
