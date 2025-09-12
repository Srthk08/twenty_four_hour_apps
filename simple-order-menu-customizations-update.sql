-- Simple Update for Order Menu System Customizations Table
-- Add menu items support with duplicate prevention
-- Execute this in Supabase SQL Editor

-- Step 1: Add menu items columns
ALTER TABLE order_menu_system_customizations 
ADD COLUMN IF NOT EXISTS menu_items JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS menu_items_count INTEGER DEFAULT 0;

-- Step 2: Create index for performance
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_menu_items ON order_menu_system_customizations USING GIN(menu_items);

-- Step 3: Create function to prevent duplicate menu items
CREATE OR REPLACE FUNCTION prevent_duplicate_menu_items_customizations()
RETURNS TRIGGER AS $$
DECLARE
  existing_items JSONB;
  new_item JSONB;
  item_name TEXT;  *
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
      RAISE EXCEPTION 'Menu item "%" with price % and quantity % already exists. Please use different values.', 
        item_name, item_price, item_quantity;
    END IF;
  END LOOP;
  
  -- Update menu_items_count
  NEW.menu_items_count := jsonb_array_length(NEW.menu_items);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create trigger
DROP TRIGGER IF EXISTS prevent_duplicate_menu_items_customizations_trigger ON order_menu_system_customizations;
CREATE TRIGGER prevent_duplicate_menu_items_customizations_trigger
  BEFORE INSERT OR UPDATE ON order_menu_system_customizations
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_menu_items_customizations();

-- Step 5: Update existing records
UPDATE order_menu_system_customizations 
SET 
  menu_items = '[]'::jsonb,
  menu_items_count = 0
WHERE menu_items IS NULL;

-- Step 6: Create helper function to add menu item
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

-- Step 7: Add comments
COMMENT ON COLUMN order_menu_system_customizations.menu_items IS 'JSON array of menu items for this customization';
COMMENT ON COLUMN order_menu_system_customizations.menu_items_count IS 'Count of menu items in the menu_items JSON array';

-- Step 8: Grant permissions
GRANT EXECUTE ON FUNCTION add_menu_item_to_customization TO authenticated;

-- Step 9: Test with sample data
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
  'Sample Restaurant',
  'John Doe',
  '123 Main Street',
  'test@example.com',
  '+1234567890',
  '[
    {
      "item_name": "Pizza Margherita",
      "price": 299.00,
      "quantity_available": 50,
      "item_description": "Classic Italian pizza",
      "item_category": "Pizza",
      "is_available": true
    },
    {
      "item_name": "Burger Deluxe",
      "price": 199.00,
      "quantity_available": 30,
      "item_description": "Delicious burger",
      "item_category": "Burgers",
      "is_available": true
    }
  ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Step 10: Show sample data
SELECT 
  id,
  user_email,
  restaurant_name,
  menu_items_count,
  jsonb_pretty(menu_items) as menu_items_formatted
FROM order_menu_system_customizations
WHERE user_email = 'test@example.com'
LIMIT 1;

-- Step 11: Test duplicate prevention
-- This should show an error message
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
SELECT 'Order Menu System Customizations table updated successfully!' as status;
