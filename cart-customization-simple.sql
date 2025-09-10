-- Simple Cart Customization Table with Reliable Duplicate Prevention
-- Uses unique constraint to prevent duplicates at database level

-- Drop existing table if exists
DROP TABLE IF EXISTS cart_customizations CASCADE;

-- Create the main cart customizations table
CREATE TABLE cart_customizations (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- User identification
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Product information
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    
    -- Project Requirements (from form)
    project_name VARCHAR(255) NOT NULL,
    app_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    product_description_custom TEXT NOT NULL,
    
    -- Restaurant specific fields
    restaurant_name VARCHAR(255),
    cuisine_type VARCHAR(100),
    
    -- Contact Information
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    
    -- File uploads - Restaurant Logo
    restaurant_logo_url TEXT,
    restaurant_logo_filename VARCHAR(255),
    restaurant_logo_size INTEGER,
    restaurant_logo_type VARCHAR(100),
    restaurant_logo_hash VARCHAR(64), -- For duplicate detection
    
    -- File uploads - Menu Photos (multiple images)
    menu_photos_urls JSONB DEFAULT '[]',
    menu_photos_filenames JSONB DEFAULT '[]',
    menu_photos_sizes JSONB DEFAULT '[]',
    menu_photos_types JSONB DEFAULT '[]',
    menu_photos_hashes JSONB DEFAULT '[]', -- For duplicate detection
    
    -- Brand Colors
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#000000',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    
    -- Additional Requirements
    additional_requirements TEXT,
    
    -- Cart status and metadata
    cart_status VARCHAR(20) DEFAULT 'active' CHECK (cart_status IN ('active', 'completed', 'cancelled', 'expired')),
    is_checkout_initiated BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_cart_user_email ON cart_customizations(user_email);
CREATE INDEX idx_cart_product_id ON cart_customizations(product_id);
CREATE INDEX idx_cart_status ON cart_customizations(cart_status);
CREATE INDEX idx_cart_created_at ON cart_customizations(created_at);

-- Create UNIQUE constraint to prevent duplicates at database level
-- This is the most reliable way to prevent duplicates
CREATE UNIQUE INDEX idx_cart_unique_user_product 
ON cart_customizations(user_email, product_id) 
WHERE cart_status = 'active';

-- Enable Row Level Security (RLS)
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own cart customizations" ON cart_customizations
    FOR SELECT USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert own cart customizations" ON cart_customizations
    FOR INSERT WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update own cart customizations" ON cart_customizations
    FOR UPDATE USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete own cart customizations" ON cart_customizations
    FOR DELETE USING (user_email = auth.jwt() ->> 'email');

-- Create simple upsert function using ON CONFLICT
CREATE OR REPLACE FUNCTION upsert_cart_customization(
    p_user_email VARCHAR(255),
    p_user_id UUID,
    p_product_id VARCHAR(50),
    p_product_name VARCHAR(255),
    p_product_description TEXT,
    p_base_price DECIMAL(10, 2),
    p_total_amount DECIMAL(10, 2),
    p_project_name VARCHAR(255),
    p_app_name VARCHAR(255),
    p_contact_person VARCHAR(255),
    p_product_description_custom TEXT,
    p_restaurant_name VARCHAR(255),
    p_cuisine_type VARCHAR(100),
    p_contact_email VARCHAR(255),
    p_contact_phone VARCHAR(20),
    p_restaurant_logo_url TEXT,
    p_restaurant_logo_filename VARCHAR(255),
    p_restaurant_logo_size INTEGER,
    p_restaurant_logo_type VARCHAR(100),
    p_restaurant_logo_hash VARCHAR(64),
    p_menu_photos_urls JSONB,
    p_menu_photos_filenames JSONB,
    p_menu_photos_sizes JSONB,
    p_menu_photos_types JSONB,
    p_menu_photos_hashes JSONB,
    p_primary_color VARCHAR(7),
    p_secondary_color VARCHAR(7),
    p_accent_color VARCHAR(7),
    p_text_color VARCHAR(7),
    p_additional_requirements TEXT
)
RETURNS UUID AS $$
DECLARE
    cart_id UUID;
BEGIN
    -- Use INSERT ... ON CONFLICT for reliable upsert
    INSERT INTO cart_customizations (
        user_email, user_id, product_id, product_name, product_description,
        base_price, total_amount, project_name, app_name, contact_person,
        product_description_custom, restaurant_name, cuisine_type,
        contact_email, contact_phone, restaurant_logo_url, restaurant_logo_filename,
        restaurant_logo_size, restaurant_logo_type, restaurant_logo_hash,
        menu_photos_urls, menu_photos_filenames, menu_photos_sizes,
        menu_photos_types, menu_photos_hashes, primary_color, secondary_color,
        accent_color, text_color, additional_requirements, cart_status, is_checkout_initiated
    ) VALUES (
        p_user_email, p_user_id, p_product_id, p_product_name, p_product_description,
        p_base_price, p_total_amount, p_project_name, p_app_name, p_contact_person,
        p_product_description_custom, p_restaurant_name, p_cuisine_type,
        p_contact_email, p_contact_phone, p_restaurant_logo_url, p_restaurant_logo_filename,
        p_restaurant_logo_size, p_restaurant_logo_type, p_restaurant_logo_hash,
        p_menu_photos_urls, p_menu_photos_filenames, p_menu_photos_sizes,
        p_menu_photos_types, p_menu_photos_hashes, p_primary_color, p_secondary_color,
        p_accent_color, p_text_color, p_additional_requirements, 'active', FALSE
    )
    ON CONFLICT (user_email, product_id) 
    WHERE cart_status = 'active'
    DO UPDATE SET
        product_name = EXCLUDED.product_name,
        product_description = EXCLUDED.product_description,
        base_price = EXCLUDED.base_price,
        total_amount = EXCLUDED.total_amount,
        project_name = EXCLUDED.project_name,
        app_name = EXCLUDED.app_name,
        contact_person = EXCLUDED.contact_person,
        product_description_custom = EXCLUDED.product_description_custom,
        restaurant_name = EXCLUDED.restaurant_name,
        cuisine_type = EXCLUDED.cuisine_type,
        contact_email = EXCLUDED.contact_email,
        contact_phone = EXCLUDED.contact_phone,
        restaurant_logo_url = EXCLUDED.restaurant_logo_url,
        restaurant_logo_filename = EXCLUDED.restaurant_logo_filename,
        restaurant_logo_size = EXCLUDED.restaurant_logo_size,
        restaurant_logo_type = EXCLUDED.restaurant_logo_type,
        restaurant_logo_hash = EXCLUDED.restaurant_logo_hash,
        menu_photos_urls = EXCLUDED.menu_photos_urls,
        menu_photos_filenames = EXCLUDED.menu_photos_filenames,
        menu_photos_sizes = EXCLUDED.menu_photos_sizes,
        menu_photos_types = EXCLUDED.menu_photos_types,
        menu_photos_hashes = EXCLUDED.menu_photos_hashes,
        primary_color = EXCLUDED.primary_color,
        secondary_color = EXCLUDED.secondary_color,
        accent_color = EXCLUDED.accent_color,
        text_color = EXCLUDED.text_color,
        additional_requirements = EXCLUDED.additional_requirements,
        updated_at = NOW()
    RETURNING id INTO cart_id;
    
    RAISE NOTICE 'Cart upserted with ID: %', cart_id;
    RETURN cart_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to get existing cart for user and product
CREATE OR REPLACE FUNCTION get_cart_by_user_product(
    p_user_email VARCHAR(255),
    p_product_id VARCHAR(50)
)
RETURNS TABLE(
    cart_id UUID,
    project_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    cuisine_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cc.id,
        cc.project_name,
        cc.restaurant_name,
        cc.cuisine_type,
        cc.created_at,
        cc.updated_at
    FROM cart_customizations cc
    WHERE cc.user_email = p_user_email 
    AND cc.product_id = p_product_id 
    AND cc.cart_status = 'active'
    ORDER BY cc.updated_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Create view to monitor cart data
CREATE OR REPLACE VIEW cart_monitor AS
SELECT 
    user_email,
    product_id,
    product_name,
    project_name,
    restaurant_name,
    cuisine_type,
    created_at,
    updated_at,
    CASE 
        WHEN updated_at > created_at THEN 'UPDATED'
        ELSE 'CREATED'
    END as status
FROM cart_customizations 
WHERE cart_status = 'active'
ORDER BY user_email, product_id, updated_at DESC;

-- Grant permissions
GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON cart_customizations TO service_role;
GRANT EXECUTE ON FUNCTION upsert_cart_customization TO authenticated;
GRANT EXECUTE ON FUNCTION get_cart_by_user_product TO authenticated;
GRANT SELECT ON cart_monitor TO authenticated;
GRANT SELECT ON cart_monitor TO service_role;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cart_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cart_customizations_updated_at
    BEFORE UPDATE ON cart_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_cart_updated_at();

-- Add comments for documentation
COMMENT ON TABLE cart_customizations IS 'Stores cart customization data from Project Requirements form with unique constraint duplicate prevention';
COMMENT ON FUNCTION upsert_cart_customization IS 'Upsert function using ON CONFLICT to prevent duplicates reliably';
COMMENT ON VIEW cart_monitor IS 'Monitor cart data and detect updates vs new creations';
