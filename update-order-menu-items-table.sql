-- Update Order Menu Items Table to include user details and prevent duplicates
-- Execute this in Supabase SQL Editor

-- First, add the new columns to order_menu_items table
ALTER TABLE order_menu_items 
ADD COLUMN IF NOT EXISTS user_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS restaurant_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS owner_name VARCHAR(255);

-- Create index for better performance on user_email
CREATE INDEX IF NOT EXISTS idx_order_menu_items_user_email ON order_menu_items(user_email);

-- Create a function to prevent duplicate menu items for the same user
CREATE OR REPLACE FUNCTION prevent_duplicate_menu_items()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this user already has menu items for this restaurant
  IF EXISTS (
    SELECT 1 FROM order_menu_items 
    WHERE user_email = NEW.user_email 
    AND restaurant_name = NEW.restaurant_name 
    AND owner_name = NEW.owner_name
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  ) THEN
    RAISE EXCEPTION 'Menu items already exist for this user and restaurant combination';
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

-- Update existing menu items with user details from the parent customization
UPDATE order_menu_items 
SET 
  user_email = omc.user_email,
  restaurant_name = omc.restaurant_name,
  owner_name = omc.owner_name
FROM order_menu_system_customizations omc
WHERE order_menu_items.customization_id = omc.id
AND (order_menu_items.user_email IS NULL OR order_menu_items.restaurant_name IS NULL OR order_menu_items.owner_name IS NULL);

-- Create a view for easy querying with all details
CREATE OR REPLACE VIEW order_menu_items_complete AS
SELECT 
  omi.*,
  omc.user_email,
  omc.restaurant_name,
  omc.owner_name,
  omc.restaurant_address,
  omc.contact_email,
  omc.contact_phone,
  omc.project_name,
  omc.contact_person,
  omc.created_at as customization_created_at
FROM order_menu_items omi
LEFT JOIN order_menu_system_customizations omc ON omi.customization_id = omc.id;

-- Add comments for documentation
COMMENT ON COLUMN order_menu_items.user_email IS 'Email of the user who created this menu item';
COMMENT ON COLUMN order_menu_items.restaurant_name IS 'Name of the restaurant for this menu item';
COMMENT ON COLUMN order_menu_items.owner_name IS 'Name of the restaurant owner for this menu item';

-- Create a function to get menu items by user email
CREATE OR REPLACE FUNCTION get_menu_items_by_user(user_email_param VARCHAR(255))
RETURNS TABLE (
  id UUID,
  item_name VARCHAR(255),
  price DECIMAL(10,2),
  quantity_available INTEGER,
  item_description TEXT,
  item_category VARCHAR(100),
  is_available BOOLEAN,
  restaurant_name VARCHAR(255),
  owner_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    omi.id,
    omi.item_name,
    omi.price,
    omi.quantity_available,
    omi.item_description,
    omi.item_category,
    omi.is_available,
    omi.restaurant_name,
    omi.owner_name,
    omi.created_at
  FROM order_menu_items omi
  WHERE omi.user_email = user_email_param
  ORDER BY omi.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check if user already has menu items
CREATE OR REPLACE FUNCTION user_has_menu_items(user_email_param VARCHAR(255))
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM order_menu_items 
    WHERE user_email = user_email_param
  );
END;
$$ LANGUAGE plpgsql;

-- Update RLS policies to include the new columns
DROP POLICY IF EXISTS "Users can view menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can insert menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can update menu items for their customizations" ON order_menu_items;
DROP POLICY IF EXISTS "Users can delete menu items for their customizations" ON order_menu_items;

-- Create new RLS policies
CREATE POLICY "Users can view their own menu items" ON order_menu_items
  FOR SELECT USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own menu items" ON order_menu_items
  FOR INSERT WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own menu items" ON order_menu_items
  FOR UPDATE USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete their own menu items" ON order_menu_items
  FOR DELETE USING (user_email = auth.jwt() ->> 'email');

-- Grant permissions on the new view
GRANT SELECT ON order_menu_items_complete TO authenticated;

-- Success message
SELECT 'Order Menu Items table updated successfully with user details and duplicate prevention!' as status;
