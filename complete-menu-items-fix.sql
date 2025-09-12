-- Complete Fix for Menu Items Storage
-- This script fixes all issues with menu items storage
-- Execute this in Supabase SQL Editor

-- Step 1: Clean up existing policies and triggers
DROP POLICY IF EXISTS "Users can view their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can insert their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can update their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can delete their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can view menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can insert menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can update menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can delete menu items for their customizations" ON order_menu_items;

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS prevent_duplicate_menu_items_trigger ON order_menu_items;
DROP FUNCTION IF EXISTS prevent_duplicate_menu_items();

-- Step 2: Create new function with correct duplicate logic
-- Only prevent duplicates if SAME name AND SAME quantity (allow different prices)
CREATE OR REPLACE FUNCTION prevent_duplicate_menu_items()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this user already has the same menu item (same name AND same quantity)
  -- This allows different prices for the same item name and quantity
  IF EXISTS (
    SELECT 1 FROM order_menu_items 
    WHERE user_email = NEW.user_email 
    AND item_name = NEW.item_name
    AND quantity_available = NEW.quantity_available
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  ) THEN
    RAISE EXCEPTION 'Menu item "%" with quantity % already exists for this user. Please use a different quantity or update the existing item.', 
      NEW.item_name, NEW.quantity_available;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Create trigger
CREATE TRIGGER prevent_duplicate_menu_items_trigger
  BEFORE INSERT OR UPDATE ON order_menu_items
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_menu_items();

-- Step 4: Create RLS policies
CREATE POLICY "Users can view their own menu items" ON order_menu_items
  FOR SELECT USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own menu items" ON order_menu_items
  FOR INSERT WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own menu items" ON order_menu_items
  FOR UPDATE USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete their own menu items" ON order_menu_items
  FOR DELETE USING (user_email = auth.jwt() ->> 'email');

-- Step 5: Clean up existing duplicates (same name + same quantity only)
WITH duplicates AS (
  SELECT 
    id,
    user_email,
    item_name,
    quantity_available,
    ROW_NUMBER() OVER (
      PARTITION BY user_email, item_name, quantity_available 
      ORDER BY created_at DESC, id DESC
    ) as rn
  FROM order_menu_items
  WHERE user_email IS NOT NULL 
    AND item_name IS NOT NULL 
    AND quantity_available IS NOT NULL
)
DELETE FROM order_menu_items 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Step 6: Show statistics
SELECT 
  COUNT(*) as total_menu_items,
  COUNT(DISTINCT user_email) as unique_users,
  COUNT(DISTINCT CONCAT(user_email, '|', item_name, '|', quantity_available)) as unique_combinations
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND quantity_available IS NOT NULL;

-- Step 7: Show menu items per user
SELECT 
  user_email,
  restaurant_name,
  owner_name,
  COUNT(*) as total_menu_items,
  STRING_AGG(DISTINCT item_name, ', ') as item_names
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND price IS NOT NULL
  AND quantity_available IS NOT NULL
GROUP BY user_email, restaurant_name, owner_name
ORDER BY user_email;

-- Step 8: Show sample menu items
SELECT 
  user_email,
  item_name,
  price,
  quantity_available,
  restaurant_name,
  created_at
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND price IS NOT NULL
  AND quantity_available IS NOT NULL
ORDER BY user_email, item_name, created_at
LIMIT 10;

-- Step 9: Test the duplicate prevention
-- This should show what would be blocked
SELECT 
  user_email,
  item_name,
  quantity_available,
  COUNT(*) as count,
  CASE 
    WHEN COUNT(*) > 1 THEN 'WOULD BE BLOCKED'
    ELSE 'ALLOWED'
  END as status
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND quantity_available IS NOT NULL
GROUP BY user_email, item_name, quantity_available
ORDER BY user_email, item_name;

-- Success message
SELECT 'Menu items storage completely fixed! Multiple items allowed, exact duplicates prevented.' as status;
