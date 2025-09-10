-- Prevent duplicate cart data for same user and same product
-- This ensures only one active cart per user per product

-- First, let's add a unique constraint to prevent duplicates
-- (This should already be in the main table creation, but let's ensure it exists)

-- Drop existing unique constraint if it exists
ALTER TABLE cart_customizations DROP CONSTRAINT IF EXISTS cart_customizations_unique_active;

-- Create unique constraint to prevent duplicate active carts
CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_customizations_unique_active 
ON cart_customizations(user_email, product_id) 
WHERE cart_status = 'active';

-- Create a function to handle upsert (update or insert) for cart data
CREATE OR REPLACE FUNCTION upsert_cart_customization(
    p_user_email VARCHAR(255),
    p_user_id UUID,
    p_product_id VARCHAR(50),
    p_product_name VARCHAR(255),
    p_product_description TEXT,
    p_base_price DECIMAL(10, 2),
    p_total_amount DECIMAL(10, 2),
    p_custom_name VARCHAR(255),
    p_restaurant_name_customization VARCHAR(255),
    p_selected_color VARCHAR(7),
    p_selected_features JSONB,
    p_project_name VARCHAR(255),
    p_contact_person VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_cuisine_type VARCHAR(100),
    p_app_name VARCHAR(255),
    p_product_description_custom TEXT,
    p_contact_email VARCHAR(255),
    p_contact_phone VARCHAR(20),
    p_primary_color VARCHAR(7),
    p_secondary_color VARCHAR(7),
    p_accent_color VARCHAR(7),
    p_text_color VARCHAR(7),
    p_restaurant_logo_url TEXT,
    p_restaurant_logo_filename VARCHAR(255),
    p_restaurant_logo_size INTEGER,
    p_restaurant_logo_type VARCHAR(100),
    p_menu_photos_urls JSONB,
    p_menu_photos_filenames JSONB,
    p_menu_photos_sizes JSONB,
    p_menu_photos_types JSONB,
    p_additional_requirements TEXT
)
RETURNS UUID AS $$
DECLARE
    cart_id UUID;
BEGIN
    -- Try to find existing active cart for this user and product
    SELECT id INTO cart_id 
    FROM cart_customizations 
    WHERE user_email = p_user_email 
    AND product_id = p_product_id 
    AND cart_status = 'active';
    
    IF cart_id IS NOT NULL THEN
        -- Update existing cart
        UPDATE cart_customizations SET
            product_name = p_product_name,
            product_description = p_product_description,
            base_price = p_base_price,
            total_amount = p_total_amount,
            custom_name = p_custom_name,
            restaurant_name_customization = p_restaurant_name_customization,
            selected_color = p_selected_color,
            selected_features = p_selected_features,
            project_name = p_project_name,
            contact_person = p_contact_person,
            restaurant_name = p_restaurant_name,
            cuisine_type = p_cuisine_type,
            app_name = p_app_name,
            product_description_custom = p_product_description_custom,
            contact_email = p_contact_email,
            contact_phone = p_contact_phone,
            primary_color = p_primary_color,
            secondary_color = p_secondary_color,
            accent_color = p_accent_color,
            text_color = p_text_color,
            restaurant_logo_url = p_restaurant_logo_url,
            restaurant_logo_filename = p_restaurant_logo_filename,
            restaurant_logo_size = p_restaurant_logo_size,
            restaurant_logo_type = p_restaurant_logo_type,
            menu_photos_urls = p_menu_photos_urls,
            menu_photos_filenames = p_menu_photos_filenames,
            menu_photos_sizes = p_menu_photos_sizes,
            menu_photos_types = p_menu_photos_types,
            additional_requirements = p_additional_requirements,
            updated_at = NOW()
        WHERE id = cart_id;
        
        RAISE NOTICE 'Updated existing cart with ID: %', cart_id;
    ELSE
        -- Insert new cart
        INSERT INTO cart_customizations (
            user_email, user_id, product_id, product_name, product_description,
            base_price, total_amount, custom_name, restaurant_name_customization,
            selected_color, selected_features, project_name, contact_person,
            restaurant_name, cuisine_type, app_name, product_description_custom,
            contact_email, contact_phone, primary_color, secondary_color,
            accent_color, text_color, restaurant_logo_url, restaurant_logo_filename,
            restaurant_logo_size, restaurant_logo_type, menu_photos_urls,
            menu_photos_filenames, menu_photos_sizes, menu_photos_types,
            additional_requirements, cart_status, is_checkout_initiated
        ) VALUES (
            p_user_email, p_user_id, p_product_id, p_product_name, p_product_description,
            p_base_price, p_total_amount, p_custom_name, p_restaurant_name_customization,
            p_selected_color, p_selected_features, p_project_name, p_contact_person,
            p_restaurant_name, p_cuisine_type, p_app_name, p_product_description_custom,
            p_contact_email, p_contact_phone, p_primary_color, p_secondary_color,
            p_accent_color, p_text_color, p_restaurant_logo_url, p_restaurant_logo_filename,
            p_restaurant_logo_size, p_restaurant_logo_type, p_menu_photos_urls,
            p_menu_photos_filenames, p_menu_photos_sizes, p_menu_photos_types,
            p_additional_requirements, 'active', FALSE
        ) RETURNING id INTO cart_id;
        
        RAISE NOTICE 'Created new cart with ID: %', cart_id;
    END IF;
    
    RETURN cart_id;
END;
$$ LANGUAGE plpgsql;

-- Create a simpler upsert function for basic cart data
CREATE OR REPLACE FUNCTION simple_upsert_cart(
    p_user_email VARCHAR(255),
    p_product_id VARCHAR(50),
    p_cart_data JSONB
)
RETURNS UUID AS $$
DECLARE
    cart_id UUID;
    existing_cart_id UUID;
BEGIN
    -- Check if active cart exists for this user and product
    SELECT id INTO existing_cart_id 
    FROM cart_customizations 
    WHERE user_email = p_user_email 
    AND product_id = p_product_id 
    AND cart_status = 'active';
    
    IF existing_cart_id IS NOT NULL THEN
        -- Update existing cart with new data
        UPDATE cart_customizations 
        SET 
            product_name = COALESCE((p_cart_data->>'product_name')::VARCHAR(255), product_name),
            product_description = COALESCE((p_cart_data->>'product_description')::TEXT, product_description),
            base_price = COALESCE((p_cart_data->>'base_price')::DECIMAL(10,2), base_price),
            total_amount = COALESCE((p_cart_data->>'total_amount')::DECIMAL(10,2), total_amount),
            custom_name = COALESCE((p_cart_data->>'custom_name')::VARCHAR(255), custom_name),
            restaurant_name_customization = COALESCE((p_cart_data->>'restaurant_name_customization')::VARCHAR(255), restaurant_name_customization),
            selected_color = COALESCE((p_cart_data->>'selected_color')::VARCHAR(7), selected_color),
            selected_features = COALESCE((p_cart_data->>'selected_features')::JSONB, selected_features),
            project_name = COALESCE((p_cart_data->>'project_name')::VARCHAR(255), project_name),
            contact_person = COALESCE((p_cart_data->>'contact_person')::VARCHAR(255), contact_person),
            restaurant_name = COALESCE((p_cart_data->>'restaurant_name')::VARCHAR(255), restaurant_name),
            cuisine_type = COALESCE((p_cart_data->>'cuisine_type')::VARCHAR(100), cuisine_type),
            app_name = COALESCE((p_cart_data->>'app_name')::VARCHAR(255), app_name),
            product_description_custom = COALESCE((p_cart_data->>'product_description_custom')::TEXT, product_description_custom),
            contact_email = COALESCE((p_cart_data->>'contact_email')::VARCHAR(255), contact_email),
            contact_phone = COALESCE((p_cart_data->>'contact_phone')::VARCHAR(20), contact_phone),
            primary_color = COALESCE((p_cart_data->>'primary_color')::VARCHAR(7), primary_color),
            secondary_color = COALESCE((p_cart_data->>'secondary_color')::VARCHAR(7), secondary_color),
            accent_color = COALESCE((p_cart_data->>'accent_color')::VARCHAR(7), accent_color),
            text_color = COALESCE((p_cart_data->>'text_color')::VARCHAR(7), text_color),
            restaurant_logo_url = COALESCE((p_cart_data->>'restaurant_logo_url')::TEXT, restaurant_logo_url),
            restaurant_logo_filename = COALESCE((p_cart_data->>'restaurant_logo_filename')::VARCHAR(255), restaurant_logo_filename),
            restaurant_logo_size = COALESCE((p_cart_data->>'restaurant_logo_size')::INTEGER, restaurant_logo_size),
            restaurant_logo_type = COALESCE((p_cart_data->>'restaurant_logo_type')::VARCHAR(100), restaurant_logo_type),
            menu_photos_urls = COALESCE((p_cart_data->>'menu_photos_urls')::JSONB, menu_photos_urls),
            menu_photos_filenames = COALESCE((p_cart_data->>'menu_photos_filenames')::JSONB, menu_photos_filenames),
            menu_photos_sizes = COALESCE((p_cart_data->>'menu_photos_sizes')::JSONB, menu_photos_sizes),
            menu_photos_types = COALESCE((p_cart_data->>'menu_photos_types')::JSONB, menu_photos_types),
            additional_requirements = COALESCE((p_cart_data->>'additional_requirements')::TEXT, additional_requirements),
            updated_at = NOW()
        WHERE id = existing_cart_id;
        
        cart_id := existing_cart_id;
        RAISE NOTICE 'Updated existing cart ID: %', cart_id;
    ELSE
        -- Insert new cart
        INSERT INTO cart_customizations (
            user_email, user_id, product_id, product_name, product_description,
            base_price, total_amount, custom_name, restaurant_name_customization,
            selected_color, selected_features, project_name, contact_person,
            restaurant_name, cuisine_type, app_name, product_description_custom,
            contact_email, contact_phone, primary_color, secondary_color,
            accent_color, text_color, restaurant_logo_url, restaurant_logo_filename,
            restaurant_logo_size, restaurant_logo_type, menu_photos_urls,
            menu_photos_filenames, menu_photos_sizes, menu_photos_types,
            additional_requirements, cart_status, is_checkout_initiated
        ) VALUES (
            p_user_email,
            (p_cart_data->>'user_id')::UUID,
            p_product_id,
            (p_cart_data->>'product_name')::VARCHAR(255),
            (p_cart_data->>'product_description')::TEXT,
            (p_cart_data->>'base_price')::DECIMAL(10,2),
            (p_cart_data->>'total_amount')::DECIMAL(10,2),
            (p_cart_data->>'custom_name')::VARCHAR(255),
            (p_cart_data->>'restaurant_name_customization')::VARCHAR(255),
            (p_cart_data->>'selected_color')::VARCHAR(7),
            (p_cart_data->>'selected_features')::JSONB,
            (p_cart_data->>'project_name')::VARCHAR(255),
            (p_cart_data->>'contact_person')::VARCHAR(255),
            (p_cart_data->>'restaurant_name')::VARCHAR(255),
            (p_cart_data->>'cuisine_type')::VARCHAR(100),
            (p_cart_data->>'app_name')::VARCHAR(255),
            (p_cart_data->>'product_description_custom')::TEXT,
            (p_cart_data->>'contact_email')::VARCHAR(255),
            (p_cart_data->>'contact_phone')::VARCHAR(20),
            (p_cart_data->>'primary_color')::VARCHAR(7),
            (p_cart_data->>'secondary_color')::VARCHAR(7),
            (p_cart_data->>'accent_color')::VARCHAR(7),
            (p_cart_data->>'text_color')::VARCHAR(7),
            (p_cart_data->>'restaurant_logo_url')::TEXT,
            (p_cart_data->>'restaurant_logo_filename')::VARCHAR(255),
            (p_cart_data->>'restaurant_logo_size')::INTEGER,
            (p_cart_data->>'restaurant_logo_type')::VARCHAR(100),
            (p_cart_data->>'menu_photos_urls')::JSONB,
            (p_cart_data->>'menu_photos_filenames')::JSONB,
            (p_cart_data->>'menu_photos_sizes')::JSONB,
            (p_cart_data->>'menu_photos_types')::JSONB,
            (p_cart_data->>'additional_requirements')::TEXT,
            'active',
            FALSE
        ) RETURNING id INTO cart_id;
        
        RAISE NOTICE 'Created new cart ID: %', cart_id;
    END IF;
    
    RETURN cart_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check for duplicates before inserting
CREATE OR REPLACE FUNCTION check_cart_duplicate(
    p_user_email VARCHAR(255),
    p_product_id VARCHAR(50)
)
RETURNS BOOLEAN AS $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM cart_customizations 
    WHERE user_email = p_user_email 
    AND product_id = p_product_id 
    AND cart_status = 'active';
    
    RETURN duplicate_count > 0;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get existing cart for user and product
CREATE OR REPLACE FUNCTION get_existing_cart(
    p_user_email VARCHAR(255),
    p_product_id VARCHAR(50)
)
RETURNS TABLE(
    cart_id UUID,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cc.id,
        cc.created_at,
        cc.updated_at
    FROM cart_customizations cc
    WHERE cc.user_email = p_user_email 
    AND cc.product_id = p_product_id 
    AND cc.cart_status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Grant permissions on the functions
GRANT EXECUTE ON FUNCTION upsert_cart_customization TO authenticated;
GRANT EXECUTE ON FUNCTION simple_upsert_cart TO authenticated;
GRANT EXECUTE ON FUNCTION check_cart_duplicate TO authenticated;
GRANT EXECUTE ON FUNCTION get_existing_cart TO authenticated;

-- Create a view to show duplicate prevention status
CREATE OR REPLACE VIEW cart_duplicate_status AS
SELECT 
    user_email,
    product_id,
    product_name,
    COUNT(*) as cart_count,
    CASE 
        WHEN COUNT(*) > 1 THEN 'DUPLICATE FOUND'
        WHEN COUNT(*) = 1 THEN 'SINGLE CART'
        ELSE 'NO CART'
    END as status,
    MAX(created_at) as latest_created,
    MAX(updated_at) as latest_updated
FROM cart_customizations 
WHERE cart_status = 'active'
GROUP BY user_email, product_id, product_name
ORDER BY cart_count DESC, latest_updated DESC;

-- Grant permissions on the view
GRANT SELECT ON cart_duplicate_status TO authenticated;
GRANT SELECT ON cart_duplicate_status TO service_role;

-- Add comments for documentation
COMMENT ON FUNCTION upsert_cart_customization IS 'Upsert function to prevent duplicate cart data for same user and product';
COMMENT ON FUNCTION simple_upsert_cart IS 'Simplified upsert function using JSONB for cart data';
COMMENT ON FUNCTION check_cart_duplicate IS 'Check if duplicate active cart exists for user and product';
COMMENT ON FUNCTION get_existing_cart IS 'Get existing active cart for user and product';
COMMENT ON VIEW cart_duplicate_status IS 'View to monitor duplicate cart prevention status';
