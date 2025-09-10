-- Test Fixed Cart Customization Duplicate Prevention
-- Run this in Supabase SQL Editor to test the fixed duplicate prevention logic

-- Test 1: Insert first cart (should succeed)
SELECT upsert_cart_customization(
    'john@example.com',                    -- user_email
    gen_random_uuid(),                     -- user_id
    '1',                                   -- product_id (Restaurant Menu System)
    'Restaurant Menu System',              -- product_name
    'Digital menu system with QR code ordering', -- product_description
    25000.00,                              -- base_price
    29500.00,                              -- total_amount
    'My Pizza Palace',                     -- project_name
    'Pizza Palace App',                    -- app_name
    'John Doe',                            -- contact_person
    'Need QR code menu and online ordering', -- product_description_custom
    'Pizza Palace',                        -- restaurant_name
    'italian',                             -- cuisine_type
    'john@example.com',                    -- contact_email
    '+1234567890',                         -- contact_phone
    'https://example.com/logo1.png',       -- restaurant_logo_url
    'logo1.png',                           -- restaurant_logo_filename
    1024000,                               -- restaurant_logo_size
    'image/png',                           -- restaurant_logo_type
    'abc123hash1',                         -- restaurant_logo_hash
    '["https://example.com/menu1.jpg", "https://example.com/menu2.jpg"]'::jsonb, -- menu_photos_urls
    '["menu1.jpg", "menu2.jpg"]'::jsonb,   -- menu_photos_filenames
    '[2048000, 1536000]'::jsonb,           -- menu_photos_sizes
    '["image/jpeg", "image/jpeg"]'::jsonb, -- menu_photos_types
    '["hash1", "hash2"]'::jsonb,           -- menu_photos_hashes
    '#FF6B35',                             -- primary_color
    '#2C3E50',                             -- secondary_color
    '#F39C12',                             -- accent_color
    '#FFFFFF',                             -- text_color
    'Need online ordering and payment integration' -- additional_requirements
) as cart_id_1;

-- Test 2: Try to insert exact duplicate (should UPDATE, not INSERT)
SELECT upsert_cart_customization(
    'john@example.com',                    -- SAME user_email
    gen_random_uuid(),                     -- user_id
    '1',                                   -- SAME product_id
    'Restaurant Menu System',              -- product_name
    'Digital menu system with QR code ordering', -- product_description
    25000.00,                              -- base_price
    29500.00,                              -- total_amount
    'My Updated Pizza Palace',             -- UPDATED project_name
    'Updated Pizza Palace App',            -- UPDATED app_name
    'John Updated Doe',                    -- UPDATED contact_person
    'Updated requirements',                -- UPDATED product_description_custom
    'Updated Pizza Palace',                -- UPDATED restaurant_name
    'mexican',                             -- UPDATED cuisine_type
    'john@example.com',                    -- SAME contact_email
    '+1234567890',                         -- contact_phone
    'https://example.com/logo1.png',       -- SAME restaurant_logo_url
    'logo1.png',                           -- SAME restaurant_logo_filename
    1024000,                               -- SAME restaurant_logo_size
    'image/png',                           -- SAME restaurant_logo_type
    'abc123hash1',                         -- SAME restaurant_logo_hash
    '["https://example.com/menu1.jpg", "https://example.com/menu2.jpg"]'::jsonb, -- SAME menu_photos_urls
    '["menu1.jpg", "menu2.jpg"]'::jsonb,   -- SAME menu_photos_filenames
    '[2048000, 1536000]'::jsonb,           -- SAME menu_photos_sizes
    '["image/jpeg", "image/jpeg"]'::jsonb, -- SAME menu_photos_types
    '["hash1", "hash2"]'::jsonb,           -- SAME menu_photos_hashes
    '#FF0000',                             -- UPDATED primary_color
    '#00FF00',                             -- UPDATED secondary_color
    '#0000FF',                             -- UPDATED accent_color
    '#FFFFFF',                             -- text_color
    'Updated additional requirements'      -- UPDATED additional_requirements
) as cart_id_2;

-- Test 3: Different user, same product and images (should INSERT new)
SELECT upsert_cart_customization(
    'jane@example.com',                    -- DIFFERENT user_email
    gen_random_uuid(),                     -- user_id
    '1',                                   -- SAME product_id
    'Restaurant Menu System',              -- product_name
    'Digital menu system with QR code ordering', -- product_description
    25000.00,                              -- base_price
    29500.00,                              -- total_amount
    'Jane Pizza Palace',                   -- project_name
    'Jane Pizza Palace App',               -- app_name
    'Jane Doe',                            -- contact_person
    'Jane requirements',                   -- product_description_custom
    'Jane Pizza Palace',                   -- restaurant_name
    'italian',                             -- cuisine_type
    'jane@example.com',                    -- contact_email
    '+0987654321',                         -- contact_phone
    'https://example.com/logo1.png',       -- SAME restaurant_logo_url
    'logo1.png',                           -- SAME restaurant_logo_filename
    1024000,                               -- SAME restaurant_logo_size
    'image/png',                           -- SAME restaurant_logo_type
    'abc123hash1',                         -- SAME restaurant_logo_hash
    '["https://example.com/menu1.jpg", "https://example.com/menu2.jpg"]'::jsonb, -- SAME menu_photos_urls
    '["menu1.jpg", "menu2.jpg"]'::jsonb,   -- SAME menu_photos_filenames
    '[2048000, 1536000]'::jsonb,           -- SAME menu_photos_sizes
    '["image/jpeg", "image/jpeg"]'::jsonb, -- SAME menu_photos_types
    '["hash1", "hash2"]'::jsonb,           -- SAME menu_photos_hashes
    '#8B5CF6',                             -- primary_color
    '#1E1B4B',                             -- secondary_color
    '#F59E0B',                             -- accent_color
    '#FFFFFF',                             -- text_color
    'Jane additional requirements'         -- additional_requirements
) as cart_id_3;

-- Check results - should show duplicate prevention working
SELECT 
    'Test Results' as test_type,
    user_email,
    product_id,
    project_name,
    restaurant_name,
    cuisine_type,
    restaurant_logo_hash,
    created_at,
    updated_at
FROM cart_customizations 
WHERE user_email IN ('john@example.com', 'jane@example.com')
ORDER BY user_email, product_id, created_at;

-- Check duplicate monitor
SELECT * FROM cart_duplicate_monitor 
WHERE user_email IN ('john@example.com', 'jane@example.com')
ORDER BY duplicate_count DESC;

-- Summary of expected results:
-- 1. john@example.com + product 1 + same images = 1 record (updated)
-- 2. jane@example.com + product 1 + same images = 1 record (new)
-- Total: 2 records, no duplicates
