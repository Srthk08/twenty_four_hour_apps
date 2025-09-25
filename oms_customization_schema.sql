-- Order Menu System (OMS) Customization Form Database Schema
-- This schema stores all OMS customization data with proper validation

-- Create the main OMS customization table
CREATE TABLE IF NOT EXISTS oms_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- User identification
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Project identification (prevents duplicates)
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    
    -- Owner details
    owner_name VARCHAR(255) NOT NULL,
    restaurant_address TEXT NOT NULL,
    
    -- Contact information
    contact_person VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    
    -- Logo information
    logo_url TEXT,
    logo_filename VARCHAR(255),
    logo_size INTEGER, -- in bytes
    
    -- Menu data (stored as JSON for flexibility)
    menu_categories JSONB DEFAULT '[]'::jsonb, -- Array of category objects
    menu_items JSONB DEFAULT '[]'::jsonb, -- Array of menu item objects
    
    -- Color customization
    primary_color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color code
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    
    -- Product information
    product_type VARCHAR(100) DEFAULT 'order-menu-system',
    product_name VARCHAR(255) DEFAULT 'Order Menu System',
    product_price DECIMAL(10,2) DEFAULT 999.00,
    
    -- Additional requirements
    additional_requirements TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    
    -- Unique constraint to prevent exact duplicates
    UNIQUE(user_email, project_name, restaurant_name)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_oms_customizations_user_email ON oms_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_user_id ON oms_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_project_name ON oms_customizations(project_name);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_restaurant_name ON oms_customizations(restaurant_name);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_created_at ON oms_customizations(created_at);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_status ON oms_customizations(status);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_oms_customizations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER trigger_update_oms_customizations_updated_at
    BEFORE UPDATE ON oms_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_oms_customizations_updated_at();

-- Create a function to validate and insert/update OMS customization data
CREATE OR REPLACE FUNCTION upsert_oms_customization(
    p_user_email VARCHAR(255),
    p_project_name VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_owner_name VARCHAR(255),
    p_restaurant_address TEXT,
    p_contact_person VARCHAR(255),
    p_phone_number VARCHAR(20),
    p_user_id UUID DEFAULT NULL,
    p_logo_url TEXT DEFAULT NULL,
    p_logo_filename VARCHAR(255) DEFAULT NULL,
    p_logo_size INTEGER DEFAULT NULL,
    p_menu_categories JSONB DEFAULT '[]'::jsonb,
    p_menu_items JSONB DEFAULT '[]'::jsonb,
    p_primary_color VARCHAR(7) DEFAULT '#3B82F6',
    p_secondary_color VARCHAR(7) DEFAULT '#10B981',
    p_accent_color VARCHAR(7) DEFAULT '#F59E0B',
    p_text_color VARCHAR(7) DEFAULT '#1F2937',
    p_additional_requirements TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    result_id UUID;
    existing_record RECORD;
BEGIN
    -- Check if exact duplicate exists (same email, project name, and restaurant name)
    SELECT id INTO existing_record
    FROM oms_customizations
    WHERE user_email = p_user_email 
      AND project_name = p_project_name 
      AND restaurant_name = p_restaurant_name;
    
    IF existing_record.id IS NOT NULL THEN
        -- Exact duplicate found, return existing ID without updating
        RAISE NOTICE 'Exact duplicate found for user %, project %, restaurant %. No update performed.', 
                     p_user_email, p_project_name, p_restaurant_name;
        RETURN existing_record.id;
    END IF;
    
    -- No exact duplicate, proceed with insert
    INSERT INTO oms_customizations (
        user_email,
        user_id,
        project_name,
        restaurant_name,
        owner_name,
        restaurant_address,
        contact_person,
        phone_number,
        logo_url,
        logo_filename,
        logo_size,
        menu_categories,
        menu_items,
        primary_color,
        secondary_color,
        accent_color,
        text_color,
        additional_requirements
    ) VALUES (
        p_user_email,
        p_project_name,
        p_restaurant_name,
        p_owner_name,
        p_restaurant_address,
        p_contact_person,
        p_phone_number,
        p_user_id,
        p_logo_url,
        p_logo_filename,
        p_logo_size,
        p_menu_categories,
        p_menu_items,
        p_primary_color,
        p_secondary_color,
        p_accent_color,
        p_text_color,
        p_additional_requirements
    ) RETURNING id INTO result_id;
    
    RAISE NOTICE 'New OMS customization created with ID: %', result_id;
    RETURN result_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get OMS customization by user email
CREATE OR REPLACE FUNCTION get_oms_customizations_by_user(p_user_email VARCHAR(255))
RETURNS TABLE (
    id UUID,
    project_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    owner_name VARCHAR(255),
    restaurant_address TEXT,
    contact_person VARCHAR(255),
    phone_number VARCHAR(20),
    logo_url TEXT,
    menu_categories JSONB,
    menu_items JSONB,
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    accent_color VARCHAR(7),
    text_color VARCHAR(7),
    product_type VARCHAR(100),
    product_name VARCHAR(255),
    product_price DECIMAL(10,2),
    additional_requirements TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.project_name,
        o.restaurant_name,
        o.owner_name,
        o.restaurant_address,
        o.contact_person,
        o.phone_number,
        o.logo_url,
        o.menu_categories,
        o.menu_items,
        o.primary_color,
        o.secondary_color,
        o.accent_color,
        o.text_color,
        o.product_type,
        o.product_name,
        o.product_price,
        o.additional_requirements,
        o.status,
        o.created_at,
        o.updated_at
    FROM oms_customizations o
    WHERE o.user_email = p_user_email
    ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get OMS customization by ID for QR code generation
CREATE OR REPLACE FUNCTION get_oms_customization_for_qr(p_customization_id UUID)
RETURNS TABLE (
    id UUID,
    project_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    owner_name VARCHAR(255),
    restaurant_address TEXT,
    contact_person VARCHAR(255),
    phone_number VARCHAR(20),
    logo_url TEXT,
    menu_categories JSONB,
    menu_items JSONB,
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    accent_color VARCHAR(7),
    text_color VARCHAR(7),
    additional_requirements TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.project_name,
        o.restaurant_name,
        o.owner_name,
        o.restaurant_address,
        o.contact_person,
        o.phone_number,
        o.logo_url,
        o.menu_categories,
        o.menu_items,
        o.primary_color,
        o.secondary_color,
        o.accent_color,
        o.text_color,
        o.additional_requirements,
        o.created_at
    FROM oms_customizations o
    WHERE o.id = p_customization_id;
END;
$$ LANGUAGE plpgsql;

-- Example JSON structure for menu categories
-- [
--   {
--     "id": "cat_1",
--     "name": "Starters",
--     "description": "Appetizers and starters",
--     "sort_order": 1
--   },
--   {
--     "id": "cat_2", 
--     "name": "Main Course",
--     "description": "Main dishes",
--     "sort_order": 2
--   }
-- ]

-- Example JSON structure for menu items
-- [
--   {
--     "id": "item_1",
--     "name": "Margherita Pizza",
--     "description": "Classic tomato and mozzarella pizza",
--     "price": 299.00,
--     "category_id": "cat_1",
--     "category_name": "Starters",
--     "is_available": true,
--     "sort_order": 1,
--     "image_url": "https://example.com/pizza.jpg"
--   },
--   {
--     "id": "item_2",
--     "name": "Chicken Biryani",
--     "description": "Fragrant basmati rice with spiced chicken",
--     "price": 450.00,
--     "category_id": "cat_2",
--     "category_name": "Main Course", 
--     "is_available": true,
--     "sort_order": 1,
--     "image_url": "https://example.com/biryani.jpg"
--   }
-- ]

-- Grant necessary permissions (adjust as needed for your Supabase setup)
-- GRANT ALL ON oms_customizations TO authenticated;
-- GRANT EXECUTE ON FUNCTION upsert_oms_customization TO authenticated;
-- GRANT EXECUTE ON FUNCTION get_oms_customizations_by_user TO authenticated;
-- GRANT EXECUTE ON FUNCTION get_oms_customization_for_qr TO authenticated;

-- Insert sample data for testing
INSERT INTO oms_customizations (
    user_email,
    project_name,
    restaurant_name,
    owner_name,
    restaurant_address,
    contact_person,
    phone_number,
    menu_categories,
    menu_items,
    additional_requirements
) VALUES (
    'rav@gmail.com',
    'My Restaurant App',
    'Rav''s Kitchen',
    'Rav Kumar',
    '123 Main Street, City, State 12345',
    'Rav Kumar',
    '+91 9876543210',
    '[
        {
            "id": "cat_1",
            "name": "Starters",
            "description": "Appetizers and starters",
            "sort_order": 1
        },
        {
            "id": "cat_2",
            "name": "Main Course", 
            "description": "Main dishes",
            "sort_order": 2
        }
    ]'::jsonb,
    '[
        {
            "id": "item_1",
            "name": "Margherita Pizza",
            "description": "Classic tomato and mozzarella pizza",
            "price": 299.00,
            "category_id": "cat_1",
            "category_name": "Starters",
            "is_available": true,
            "sort_order": 1
        },
        {
            "id": "item_2", 
            "name": "Chicken Biryani",
            "description": "Fragrant basmati rice with spiced chicken",
            "price": 450.00,
            "category_id": "cat_2",
            "category_name": "Main Course",
            "is_available": true,
            "sort_order": 1
        }
    ]'::jsonb,
    'Need QR code generation and mobile app integration'
) ON CONFLICT (user_email, project_name, restaurant_name) DO NOTHING;

-- Create a view for easy querying of OMS data
CREATE OR REPLACE VIEW oms_customizations_view AS
SELECT 
    id,
    user_email,
    project_name,
    restaurant_name,
    owner_name,
    restaurant_address,
    contact_person,
    phone_number,
    logo_url,
    menu_categories,
    menu_items,
    primary_color,
    secondary_color,
    accent_color,
    text_color,
    product_type,
    product_name,
    product_price,
    additional_requirements,
    status,
    created_at,
    updated_at,
    -- Computed fields
    jsonb_array_length(menu_categories) as category_count,
    jsonb_array_length(menu_items) as item_count
FROM oms_customizations;

-- Add comments for documentation
COMMENT ON TABLE oms_customizations IS 'Stores Order Menu System customization data with duplicate prevention';
COMMENT ON COLUMN oms_customizations.user_email IS 'User email address for identification';
COMMENT ON COLUMN oms_customizations.project_name IS 'Name of the project (part of unique constraint)';
COMMENT ON COLUMN oms_customizations.restaurant_name IS 'Name of the restaurant (part of unique constraint)';
COMMENT ON COLUMN oms_customizations.menu_categories IS 'JSON array of menu categories with structure: {id, name, description, sort_order}';
COMMENT ON COLUMN oms_customizations.menu_items IS 'JSON array of menu items with structure: {id, name, description, price, category_id, category_name, is_available, sort_order, image_url}';
COMMENT ON COLUMN oms_customizations.primary_color IS 'Primary color in hex format (e.g., #3B82F6)';
COMMENT ON COLUMN oms_customizations.secondary_color IS 'Secondary color in hex format (e.g., #10B981)';
COMMENT ON COLUMN oms_customizations.accent_color IS 'Accent color in hex format (e.g., #F59E0B)';
COMMENT ON COLUMN oms_customizations.text_color IS 'Text color in hex format (e.g., #1F2937)';
COMMENT ON COLUMN oms_customizations.additional_requirements IS 'Additional requirements or special notes from the user';
