-- Test queries for duplicate prevention
-- Run these in Supabase SQL Editor to test the functionality

-- 1. Check current duplicate status
SELECT * FROM cart_duplicate_status;

-- 2. Test the duplicate check function
SELECT check_cart_duplicate('test@example.com', '1') as has_duplicate;

-- 3. Test getting existing cart
SELECT * FROM get_existing_cart('test@example.com', '1');

-- 4. Test the simple upsert function with sample data
SELECT simple_upsert_cart(
    'test@example.com',
    '1',
    '{
        "product_name": "Restaurant Menu System",
        "product_description": "Digital menu system with QR code ordering",
        "base_price": 25000.00,
        "total_amount": 29500.00,
        "project_name": "My Test Restaurant",
        "contact_person": "John Doe",
        "restaurant_name": "Test Pizza Palace",
        "cuisine_type": "italian",
        "app_name": "Pizza Palace App",
        "contact_email": "test@example.com",
        "contact_phone": "+1234567890",
        "primary_color": "#FF6B35",
        "secondary_color": "#2C3E50",
        "accent_color": "#F39C12",
        "text_color": "#FFFFFF",
        "additional_requirements": "Need online ordering and payment integration"
    }'::jsonb
) as cart_id;

-- 5. Check if duplicate was prevented
SELECT * FROM cart_duplicate_status WHERE user_email = 'test@example.com';

-- 6. Test updating the same cart (should update, not create new)
SELECT simple_upsert_cart(
    'test@example.com',
    '1',
    '{
        "product_name": "Restaurant Menu System",
        "product_description": "Updated description",
        "base_price": 25000.00,
        "total_amount": 29500.00,
        "project_name": "My Updated Restaurant",
        "contact_person": "Jane Doe",
        "restaurant_name": "Updated Pizza Palace",
        "cuisine_type": "mexican",
        "app_name": "Updated Pizza Palace App",
        "contact_email": "test@example.com",
        "contact_phone": "+1234567890",
        "primary_color": "#FF0000",
        "secondary_color": "#00FF00",
        "accent_color": "#0000FF",
        "text_color": "#FFFFFF",
        "additional_requirements": "Updated requirements"
    }'::jsonb
) as updated_cart_id;

-- 7. Verify only one cart exists for this user and product
SELECT 
    user_email,
    product_id,
    project_name,
    restaurant_name,
    cuisine_type,
    created_at,
    updated_at
FROM cart_customizations 
WHERE user_email = 'test@example.com' 
AND product_id = '1' 
AND cart_status = 'active'
ORDER BY updated_at DESC;

-- 8. Test with different product (should create new cart)
SELECT simple_upsert_cart(
    'test@example.com',
    '2',
    '{
        "product_name": "Android TV App",
        "product_description": "Custom Android TV application",
        "base_price": 55000.00,
        "total_amount": 64900.00,
        "project_name": "My TV App",
        "contact_person": "John Doe",
        "app_name": "My TV App",
        "contact_email": "test@example.com",
        "contact_phone": "+1234567890",
        "primary_color": "#8B5CF6",
        "secondary_color": "#1E1B4B",
        "accent_color": "#F59E0B",
        "text_color": "#FFFFFF",
        "additional_requirements": "Need streaming capabilities"
    }'::jsonb
) as new_cart_id;

-- 9. Check final status - should have 2 carts for same user, different products
SELECT * FROM cart_duplicate_status WHERE user_email = 'test@example.com';

-- 10. Clean up test data (optional)
-- DELETE FROM cart_customizations WHERE user_email = 'test@example.com';
