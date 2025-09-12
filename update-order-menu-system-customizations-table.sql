-- Update Order Menu System Customizations Table
-- Add menu items columns and duplicate prevention
-- Execute this in Supabase SQL Editor

-- Step 1: Add menu items columns to order_menu_system_customizations table
ALTER TABLE order_menu_system_customizations 
ADD COLUMN IF NOT EXISTS menu_items JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS menu_items_count INTEGER DEFAULT 0;

-- Step 2: Create index for better performance
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_user_email ON order_menu_system_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_menu_items ON order_menu_system_customizations USING GIN(menu_items);

-- Step 3: Create function to prevent duplicate menu items in customizations table
CREATE OR REPLACE FUNCTION prevent_duplicate_menu_items_in_customizations()
RETURNS TRIGGER AS $$
DECLARE
  existing_items JSONB;
  new_item JSONB;
  item_name TEXT;
  item_price DECIMAL;
  item_quantity INTEGER;
  i INTEGER;
BEGIN
  -- Get existing menu items
  existing_items := COALESCE(OLD.menu_items, '[]'::jsonb);
  
  -- If this is an update and menu_items hasn't changed, allow it
  IF TG_OP = 'UPDATE' AND OLD.menu_items = NEW.menu_items THEN
    RETURN NEW;
  END IF;
  
  -- Check each new menu item for duplicates
  FOR i IN 0..jsonb_array_length(NEW.menu_items) - 1 LOOP
    new_item := NEW.menu_items->i;
    item_name := new_item->>'item_name';
    item_price := (new_item->>'price')::DECIMAL;
    item_quantity := (new_item->>'quantity_available')::INTEGER;
    
    -- Check if this exact combination already exists
    IF EXISTS (
      SELECT 1 FROM jsonb_array_elements(existing_items) AS existing_item
      WHERE existing_item->>'item_name' = item_name
      AND (existing_item->>'price')::DECIMAL = item_price
      AND (existing_item->>'quantity_available')::INTEGER = item_quantity
    ) THEN
      RAISE EXCEPTION 'Menu item "%" with price % and quantity % already exists. Please use different values or update the existing item.', 
        item_name, item_price, item_quantity;
    END IF;
  END LOOP;
  
  -- Update menu_items_count
  NEW.menu_items_count := jsonb_array_length(NEW.menu_items);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create trigger to prevent duplicates
DROP TRIGGER IF EXISTS prevent_duplicate_menu_items_customizations_trigger ON order_menu_system_customizations;
CREATE TRIGGER prevent_duplicate_menu_items_customizations_trigger
  BEFORE INSERT OR UPDATE ON order_menu_system_customizations
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_menu_items_in_customizations();

-- Step 5: Create function to add menu item to customizations
CREATE OR REPLACE FUNCTION add_menu_item_to_customization(
  customization_id_param UUID,
  item_name_param TEXT,
  price_param DECIMAL,
  quantity_available_param INTEGER,
  item_description_param TEXT DEFAULT '',
  item_category_param TEXT DEFAULT 'General'
)
RETURNS JSONB AS $$
DECLARE
  current_items JSONB;
  new_item JSONB;
  updated_items JSONB;
BEGIN
  -- Get current menu items
  SELECT menu_items INTO current_items
  FROM order_menu_system_customizations
  WHERE id = customization_id_param;
  
  -- Check for duplicate
  IF EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(current_items, '[]'::jsonb)) AS existing_item
    WHERE existing_item->>'item_name' = item_name_param
    AND (existing_item->>'price')::DECIMAL = price_param
    AND (existing_item->>'quantity_available')::INTEGER = quantity_available_param
  ) THEN
    RAISE EXCEPTION 'Menu item "%" with price % and quantity % already exists in this customization.', 
      item_name_param, price_param, quantity_available_param;
  END IF;
  
  -- Create new item
  new_item := jsonb_build_object(
    'item_name', item_name_param,
    'price', price_param,
    'quantity_available', quantity_available_param,
    'item_description', item_description_param,
    'item_category', item_category_param,
    'is_available', true,
    'created_at', NOW()
  );
  
  -- Add to existing items
  updated_items := COALESCE(current_items, '[]'::jsonb) || jsonb_build_array(new_item);
  
  -- Update the record
  UPDATE order_menu_system_customizations
  SET 
    menu_items = updated_items,
    menu_items_count = jsonb_array_length(updated_items),
    updated_at = NOW()
  WHERE id = customization_id_param;
  
  RETURN updated_items;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create function to remove menu item from customizations
CREATE OR REPLACE FUNCTION remove_menu_item_from_customization(
  customization_id_param UUID,
  item_name_param TEXT,
  price_param DECIMAL,
  quantity_available_param INTEGER
)
RETURNS JSONB AS $$
DECLARE
  current_items JSONB;
  updated_items JSONB;
BEGIN
  -- Get current menu items
  SELECT menu_items INTO current_items
  FROM order_menu_system_customizations
  WHERE id = customization_id_param;
  
  -- Remove the specific item
  updated_items := (
    SELECT jsonb_agg(item)
    FROM jsonb_array_elements(COALESCE(current_items, '[]'::jsonb)) AS item
    WHERE NOT (
      item->>'item_name' = item_name_param
      AND (item->>'price')::DECIMAL = price_param
      AND (item->>'quantity_available')::INTEGER = quantity_available_param
    )
  );
  
  -- Update the record
  UPDATE order_menu_system_customizations
  SET 
    menu_items = COALESCE(updated_items, '[]'::jsonb),
    menu_items_count = jsonb_array_length(COALESCE(updated_items, '[]'::jsonb)),
    updated_at = NOW()
  WHERE id = customization_id_param;
  
  RETURN COALESCE(updated_items, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql;

-- Step 7: Create function to get menu items for a customization
CREATE OR REPLACE FUNCTION get_menu_items_for_customization(customization_id_param UUID)
RETURNS TABLE (
  item_name TEXT,
  price DECIMAL,
  quantity_available INTEGER,
  item_description TEXT,
  item_category TEXT,
  is_available BOOLEAN,
  created_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (item->>'item_name')::TEXT as item_name,
    (item->>'price')::DECIMAL as price,
    (item->>'quantity_available')::INTEGER as quantity_available,
    (item->>'item_description')::TEXT as item_description,
    (item->>'item_category')::TEXT as item_category,
    (item->>'is_available')::BOOLEAN as is_available,
    (item->>'created_at')::TIMESTAMP as created_at
  FROM order_menu_system_customizations omc,
       jsonb_array_elements(omc.menu_items) AS item
  WHERE omc.id = customization_id_param;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Update existing records to have empty menu_items if NULL
UPDATE order_menu_system_customizations 
SET 
  menu_items = '[]'::jsonb,
  menu_items_count = 0
WHERE menu_items IS NULL;

-- Step 9: Create view for easy querying
CREATE OR REPLACE VIEW order_menu_customizations_with_items AS
SELECT 
  omc.*,
  omc.menu_items_count as total_menu_items,
  CASE 
    WHEN omc.menu_items_count > 0 THEN 'Has Menu Items'
    ELSE 'No Menu Items'
  END as menu_status
FROM order_menu_system_customizations omc;

-- Step 10: Add comments
COMMENT ON COLUMN order_menu_system_customizations.menu_items IS 'JSON array of menu items for this customization';
COMMENT ON COLUMN order_menu_system_customizations.menu_items_count IS 'Count of menu items in the menu_items JSON array';

-- Step 11: Grant permissions
GRANT SELECT ON order_menu_customizations_with_items TO authenticated;
GRANT EXECUTE ON FUNCTION add_menu_item_to_customization TO authenticated;
GRANT EXECUTE ON FUNCTION remove_menu_item_from_customization TO authenticated;
GRANT EXECUTE ON FUNCTION get_menu_items_for_customization TO authenticated;

-- Step 12: Test the setup
-- Insert a test record with menu items
INSERT INTO order_menu_system_customizations (
  user_email,
  restaurant_name,
  owner_name,
  restaurant_address,
  contact_email,
  contact_phone,
  menu_items
) VALUES (
  'test@example.com',
  'Test Restaurant',
  'Test Owner',
  '123 Test Street',
  'test@example.com',
  '+1234567890',
  '[
    {
      "item_name": "Pizza Margherita",
      "price": 299.00,
      "quantity_available": 50,
      "item_description": "Classic Italian pizza",
      "item_category": "Pizza",
      "is_available": true,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "item_name": "Burger Deluxe",
      "price": 199.00,
      "quantity_available": 30,
      "item_description": "Delicious burger",
      "item_category": "Burgers",
      "is_available": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Step 13: Show sample data
SELECT 
  id,
  user_email,
  restaurant_name,
  menu_items_count,
  menu_items
FROM order_menu_system_customizations
WHERE user_email = 'test@example.com'
LIMIT 1;

-- Step 14: Test duplicate prevention
-- This should fail with duplicate error
DO $$
BEGIN
  PERFORM add_menu_item_to_customization(
    (SELECT id FROM order_menu_system_customizations WHERE user_email = 'test@example.com' LIMIT 1),
    'Pizza Margherita',
    299.00,
    50,
    'Test description',
    'Test category'
  );
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Duplicate prevention working: %', SQLERRM;
END $$;

-- Success message
SELECT 'Order Menu System Customizations table updated successfully with menu items support!' as status;
