-- Test the OMS SQL Schema
-- Run this after running the main oms_customization_schema.sql

-- Test 1: Insert a new OMS customization using the function
SELECT upsert_oms_customization(
    'test@example.com',           -- p_user_email
    'Test Project',               -- p_project_name  
    'Test Restaurant',            -- p_restaurant_name
    'Test Owner',                 -- p_owner_name
    '123 Test Street',            -- p_restaurant_address
    'Test Contact',               -- p_contact_person
    '+91 9999999999',            -- p_phone_number
    NULL,                         -- p_user_id (optional)
    NULL,                         -- p_logo_url (optional)
    NULL,                         -- p_logo_filename (optional)
    NULL,                         -- p_logo_size (optional)
    '[{"id": "cat1", "name": "Test Category"}]'::jsonb,  -- p_menu_categories
    '[{"id": "item1", "name": "Test Item", "price": 100}]'::jsonb,  -- p_menu_items
    '#FF0000',                    -- p_primary_color
    '#00FF00',                    -- p_secondary_color
    '#0000FF',                    -- p_accent_color
    '#000000',                    -- p_text_color
    'Test additional requirements' -- p_additional_requirements
);

-- Test 2: Try to insert duplicate (should return existing ID)
SELECT upsert_oms_customization(
    'test@example.com',           -- Same email
    'Test Project',               -- Same project
    'Test Restaurant',            -- Same restaurant
    'Different Owner',            -- Different owner (should still be duplicate)
    '456 Different Street',       -- Different address
    'Different Contact',          -- Different contact
    '+91 8888888888',            -- Different phone
    NULL,                         -- p_user_id
    NULL,                         -- p_logo_url
    NULL,                         -- p_logo_filename
    NULL,                         -- p_logo_size
    '[{"id": "cat2", "name": "Different Category"}]'::jsonb,  -- Different categories
    '[{"id": "item2", "name": "Different Item", "price": 200}]'::jsonb,  -- Different items
    '#FFFF00',                    -- Different colors
    '#FF00FF',
    '#00FFFF',
    '#FFFFFF',
    'Different requirements'      -- Different requirements
);

-- Test 3: Insert different project for same user (should create new record)
SELECT upsert_oms_customization(
    'test@example.com',           -- Same email
    'Different Project',          -- Different project
    'Test Restaurant',            -- Same restaurant
    'Test Owner',                 -- p_owner_name
    '123 Test Street',            -- p_restaurant_address
    'Test Contact',               -- p_contact_person
    '+91 9999999999',            -- p_phone_number
    NULL,                         -- p_user_id
    NULL,                         -- p_logo_url
    NULL,                         -- p_logo_filename
    NULL,                         -- p_logo_size
    '[{"id": "cat3", "name": "Another Category"}]'::jsonb,  -- p_menu_categories
    '[{"id": "item3", "name": "Another Item", "price": 300}]'::jsonb,  -- p_menu_items
    '#FF0000',                    -- p_primary_color
    '#00FF00',                    -- p_secondary_color
    '#0000FF',                    -- p_accent_color
    '#000000',                    -- p_text_color
    'Another test requirements'   -- p_additional_requirements
);

-- Test 4: Get user's customizations
SELECT * FROM get_oms_customizations_by_user('test@example.com');

-- Test 5: Get QR code data for first customization
SELECT * FROM get_oms_customization_for_qr(
    (SELECT id FROM oms_customizations WHERE user_email = 'test@example.com' LIMIT 1)
);

-- Test 6: Check the data in the table
SELECT 
    user_email,
    project_name,
    restaurant_name,
    owner_name,
    contact_person,
    phone_number,
    product_type,
    product_name,
    product_price,
    additional_requirements,
    created_at
FROM oms_customizations 
WHERE user_email = 'test@example.com'
ORDER BY created_at;
