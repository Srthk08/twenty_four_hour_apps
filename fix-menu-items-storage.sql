-- Fix Menu Items Storage Issues
-- This script fixes the policy error and ensures multiple menu items are stored correctly
-- Execute this in Supabase SQL Editor

-- First, drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can insert their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can update their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can delete their own menu items" ON order_menu_items;
DROP POLICY IF EXISTS "Users can view menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can insert menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can update menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can delete menu items for their customizations" ON order_menu_items;

-- Drop existing trigger to avoid conflicts
DROP TRIGGER IF EXISTS prevent_duplicate_menu_items_trigger ON order_menu_items;
DROP FUNCTION IF EXISTS prevent_duplicate_menu_items();

-- Create new function to prevent duplicate menu items (same name + same quantity only)
CREATE OR REPLACE FUNCTION prevent_duplicate_menu_items()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this user already has the same menu item (same name AND same quantity)
  -- Allow different prices for same item name and quantity
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

-- Create trigger to prevent duplicates
CREATE TRIGGER prevent_duplicate_menu_items_trigger
  BEFORE INSERT OR UPDATE ON order_menu_items
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_menu_items();

-- Create new RLS policies
CREATE POLICY "Users can view their own menu items" ON order_menu_items
  FOR SELECT USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own menu items" ON order_menu_items
  FOR INSERT WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own menu items" ON order_menu_items
  FOR UPDATE USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete their own menu items" ON order_menu_items
  FOR DELETE USING (user_email = auth.jwt() ->> 'email');

-- Clean up existing duplicates based on new logic (same name + same quantity)
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

-- Show count of deleted duplicates
SELECT 
  COUNT(*) as deleted_duplicates,
  'Duplicate menu items (same name + quantity) deleted successfully!' as message
FROM (
  SELECT 
    user_email,
    item_name,
    quantity_available,
    COUNT(*) - 1 as duplicate_count
  FROM order_menu_items
  WHERE user_email IS NOT NULL 
    AND item_name IS NOT NULL 
    AND quantity_available IS NOT NULL
  GROUP BY user_email, item_name, quantity_available
  HAVING COUNT(*) > 1
) as duplicate_groups;

-- Show current menu items per user
SELECT 
  user_email,
  restaurant_name,
  owner_name,
  COUNT(*) as total_menu_items,
  COUNT(DISTINCT CONCAT(item_name, '|', quantity_available)) as unique_items_by_name_quantity,
  COUNT(DISTINCT item_name) as unique_item_names
FROM order_menu_items
WHERE user_email IS NOT NULL 
  AND item_name IS NOT NULL 
  AND price IS NOT NULL
  AND quantity_available IS NOT NULL
GROUP BY user_email, restaurant_name, owner_name
ORDER BY user_email;

-- Show sample of current menu items
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
LIMIT 20;

-- Success message
SELECT 'Menu items storage fixed successfully! Multiple items allowed, duplicates prevented.' as status;
