-- Simple Update for Order Menu Items Table
-- Execute this in Supabase SQL Editor

-- Add user details columns to order_menu_items table
ALTER TABLE order_menu_items 
ADD COLUMN IF NOT EXISTS user_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS restaurant_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS owner_name VARCHAR(255);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_order_menu_items_user_email ON order_menu_items(user_email);

-- Update existing menu items with user details from parent customization
UPDATE order_menu_items 
SET 
  user_email = omc.user_email,
  restaurant_name = omc.restaurant_name,
  owner_name = omc.owner_name
FROM order_menu_system_customizations omc
WHERE order_menu_items.customization_id = omc.id;

-- Create a function to prevent duplicate menu items for same user
CREATE OR REPLACE FUNCTION prevent_duplicate_menu_items()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this user already has the same menu item (same name, price, quantity)
  IF EXISTS (
    SELECT 1 FROM order_menu_items 
    WHERE user_email = NEW.user_email 
    AND item_name = NEW.item_name
    AND price = NEW.price
    AND quantity_available = NEW.quantity_available
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  ) THEN
    RAISE EXCEPTION 'This menu item already exists for this user. Item: % (Price: %, Quantity: %). Please update the existing item instead of creating a duplicate.', 
      NEW.item_name, NEW.price, NEW.quantity_available;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to prevent duplicates
DROP TRIGGER IF EXISTS prevent_duplicate_menu_items_trigger ON order_menu_items;
CREATE TRIGGER prevent_duplicate_menu_items_trigger
  BEFORE INSERT OR UPDATE ON order_menu_items
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_menu_items();

-- Update RLS policies to include user_email
DROP POLICY IF EXISTS "Users can view menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can insert menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can update menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can delete menu items for their customizations" ON order_menu_items;

-- Create new RLS policies based on user_email
CREATE POLICY "Users can view their own menu items" ON order_menu_items
  FOR SELECT USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own menu items" ON order_menu_items
  FOR INSERT WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own menu items" ON order_menu_items
  FOR UPDATE USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete their own menu items" ON order_menu_items
  FOR DELETE USING (user_email = auth.jwt() ->> 'email');

-- Add comments
COMMENT ON COLUMN order_menu_items.user_email IS 'Email of the user who created this menu item';
COMMENT ON COLUMN order_menu_items.restaurant_name IS 'Name of the restaurant for this menu item';
COMMENT ON COLUMN order_menu_items.owner_name IS 'Name of the restaurant owner for this menu item';

-- Delete duplicate data from same email, same item name, same price, and same quantity
-- Keep only the most recent record for each item combination
WITH duplicates AS (
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

-- Success message
SELECT 'Order Menu Items table updated successfully!' as status;
