-- Preview Duplicate Menu Items Before Deletion
-- This script shows what duplicates will be deleted WITHOUT actually deleting them
-- Based on user_email, item_name, price, and quantity_available
-- Execute this in Supabase SQL Editor to see what will be removed

-- Show all duplicate records that will be deleted
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

-- Show summary of what will be deleted
SELECT 
  COUNT(*) as records_to_delete,
  COUNT(DISTINCT CONCAT(user_email, '|', item_name, '|', price, '|', quantity_available)) as unique_item_combinations_affected
FROM (
  SELECT 
    id,
    user_email,
    item_name,
    price,
    quantity_available,
    ROW_NUMBER() OVER (
      PARTITION BY user_email, item_name, price, quantity_available 
      ORDER BY created_at DESC, id DESC
    ) as rn
  FROM order_menu_items
  WHERE user_email IS NOT NULL 
    AND item_name IS NOT NULL 
    AND price IS NOT NULL
    AND quantity_available IS NOT NULL
) as duplicates
WHERE rn > 1;

-- Show records that will be KEPT (most recent for each item combination)
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
  'WILL BE KEPT' as action,
  id,
  user_email,
  item_name,
  price,
  quantity_available,
  restaurant_name,
  owner_name,
  created_at
FROM duplicates 
WHERE rn = 1
ORDER BY user_email, item_name, price, quantity_available, created_at;

-- Show current duplicate count by item details
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
ORDER BY duplicate_count DESC, user_email, item_name;

-- Final summary
SELECT 'Preview completed. Review the results above before running the actual cleanup.' as message;
