-- Fixed Cart Customization Table with Duplicate Prevention
-- Removed generated column with subquery (not allowed in PostgreSQL)
-- Uses a simpler approach for duplicate detection

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

-- Create composite index for duplicate detection
CREATE INDEX idx_cart_duplicate_check ON cart_customizations(user_email, product_id, restaurant_logo_hash, menu_photos_hashes) 
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

-- Create function to generate file hash for duplicate detection
CREATE OR REPLACE FUNCTION generate_file_hash(file_content BYTEA)
RETURNS VARCHAR(64) AS $$
BEGIN
    RETURN encode(digest(file_content, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Create function to generate duplicate hash
CREATE OR REPLACE FUNCTION generate_duplicate_hash(
    p_user_email VARCHAR(255),
    p_product_id VARCHAR(50),
    p_restaurant_logo_hash VARCHAR(64),
    p_menu_photos_hashes JSONB
)
RETURNS VARCHAR(64) AS $$
DECLARE
    combined_string TEXT;
    photos_string TEXT;
BEGIN
    -- Convert menu photos hashes to string
    SELECT string_agg(value::text, '|') INTO photos_string
    FROM jsonb_array_elements_text(p_menu_photos_hashes);
    
    -- Combine all parts
    combined_string := p_user_email || '|' || 
                      p_product_id || '|' || 
                      COALESCE(p_restaurant_logo_hash, '') || '|' || 
                      COALESCE(photos_string, '');
    
    -- Generate hash
    RETURN encode(digest(combined_string, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Create function to check for exact duplicates
CREATE OR REPLACE FUNCTION check_exact_duplicate(
    p_user_email VARCHAR(255),
    p_product_id VARCHAR(50),
    p_restaurant_logo_hash VARCHAR(64),
    p_menu_photos_hashes JSONB
)
RETURNS BOOLEAN AS $$
DECLARE
    duplicate_count INTEGER;
    target_hash VARCHAR(64);
BEGIN
    -- Generate hash for comparison
    target_hash := generate_duplicate_hash(p_user_email, p_product_id, p_restaurant_logo_hash, p_menu_photos_hashes);
    
    -- Check for existing cart with same hash
    SELECT COUNT(*) INTO duplicate_count
    FROM cart_customizations 
    WHERE user_email = p_user_email 
    AND product_id = p_product_id 
    AND restaurant_logo_hash = COALESCE(p_restaurant_logo_hash, '')
    AND menu_photos_hashes = COALESCE(p_menu_photos_hashes, '[]'::jsonb)
    AND cart_status = 'active';
    
    RETURN duplicate_count > 0;
END;
$$ LANGUAGE plpgsql;

-- Create main upsert function with duplicate prevention
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
    existing_cart_id UUID;
BEGIN
    -- Check if exact duplicate exists
    SELECT id INTO existing_cart_id 
    FROM cart_customizations 
    WHERE user_email = p_user_email 
    AND product_id = p_product_id 
    AND restaurant_logo_hash = COALESCE(p_restaurant_logo_hash, '')
    AND menu_photos_hashes = COALESCE(p_menu_photos_hashes, '[]'::jsonb)
    AND cart_status = 'active';
    
    IF existing_cart_id IS NOT NULL THEN
        -- UPDATE existing cart (exact duplicate found)
        UPDATE cart_customizations SET
            product_name = p_product_name,
            product_description = p_product_description,
            base_price = p_base_price,
            total_amount = p_total_amount,
            project_name = p_project_name,
            app_name = p_app_name,
            contact_person = p_contact_person,
            product_description_custom = p_product_description_custom,
            restaurant_name = p_restaurant_name,
            cuisine_type = p_cuisine_type,
            contact_email = p_contact_email,
            contact_phone = p_contact_phone,
            restaurant_logo_url = p_restaurant_logo_url,
            restaurant_logo_filename = p_restaurant_logo_filename,
            restaurant_logo_size = p_restaurant_logo_size,
            restaurant_logo_type = p_restaurant_logo_type,
            restaurant_logo_hash = p_restaurant_logo_hash,
            menu_photos_urls = p_menu_photos_urls,
            menu_photos_filenames = p_menu_photos_filenames,
            menu_photos_sizes = p_menu_photos_sizes,
            menu_photos_types = p_menu_photos_types,
            menu_photos_hashes = p_menu_photos_hashes,
            primary_color = p_primary_color,
            secondary_color = p_secondary_color,
            accent_color = p_accent_color,
            text_color = p_text_color,
            additional_requirements = p_additional_requirements,
            updated_at = NOW()
        WHERE id = existing_cart_id;
        
        cart_id := existing_cart_id;
        RAISE NOTICE 'Updated existing cart (exact duplicate) ID: %', cart_id;
    ELSE
        -- INSERT new cart (no exact duplicate found)
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
        ) RETURNING id INTO cart_id;
        
        RAISE NOTICE 'Created new cart ID: %', cart_id;
    END IF;
    
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

-- Create view to monitor duplicate prevention
CREATE OR REPLACE VIEW cart_duplicate_monitor AS
SELECT 
    user_email,
    product_id,
    product_name,
    project_name,
    restaurant_name,
    cuisine_type,
    restaurant_logo_hash,
    menu_photos_hashes,
    COUNT(*) as duplicate_count,
    CASE 
        WHEN COUNT(*) > 1 THEN 'DUPLICATE FOUND'
        WHEN COUNT(*) = 1 THEN 'SINGLE CART'
        ELSE 'NO CART'
    END as status,
    MAX(created_at) as latest_created,
    MAX(updated_at) as latest_updated
FROM cart_customizations 
WHERE cart_status = 'active'
GROUP BY user_email, product_id, product_name, project_name, restaurant_name, cuisine_type, restaurant_logo_hash, menu_photos_hashes
ORDER BY duplicate_count DESC, latest_updated DESC;

-- Grant permissions
GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON cart_customizations TO service_role;
GRANT EXECUTE ON FUNCTION upsert_cart_customization TO authenticated;
GRANT EXECUTE ON FUNCTION check_exact_duplicate TO authenticated;
GRANT EXECUTE ON FUNCTION get_cart_by_user_product TO authenticated;
GRANT EXECUTE ON FUNCTION generate_duplicate_hash TO authenticated;
GRANT SELECT ON cart_duplicate_monitor TO authenticated;
GRANT SELECT ON cart_duplicate_monitor TO service_role;

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
COMMENT ON TABLE cart_customizations IS 'Stores cart customization data from Project Requirements form with duplicate prevention';
COMMENT ON COLUMN cart_customizations.restaurant_logo_hash IS 'Hash of restaurant logo for duplicate detection';
COMMENT ON COLUMN cart_customizations.menu_photos_hashes IS 'JSON array of hashes of menu photos for duplicate detection';
COMMENT ON FUNCTION upsert_cart_customization IS 'Main function to insert or update cart with duplicate prevention based on exact match';
COMMENT ON FUNCTION check_exact_duplicate IS 'Check if exact duplicate exists (same email + product + images)';
COMMENT ON VIEW cart_duplicate_monitor IS 'Monitor duplicate prevention status and detect any duplicates';
