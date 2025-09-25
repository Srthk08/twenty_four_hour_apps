-- Fixed Order Menu System (OMS) Database Setup
-- This fixes the function return type error
-- Run this in Supabase SQL Editor

-- 1. Drop existing function if it exists
DROP FUNCTION IF EXISTS upsert_oms_customization(
    VARCHAR(255),
    VARCHAR(255),
    VARCHAR(255),
    VARCHAR(255),
    TEXT,
    VARCHAR(255),
    VARCHAR(20),
    UUID,
    TEXT,
    VARCHAR(255),
    INTEGER,
    JSONB,
    JSONB,
    VARCHAR(7),
    VARCHAR(7),
    VARCHAR(7),
    VARCHAR(7),
    TEXT
);

-- 2. Create OMS-specific table (separate from customization_forms)
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
    
    -- Product information (OMS specific)
    product_type VARCHAR(100) DEFAULT 'order-menu-system',
    product_name VARCHAR(255) DEFAULT 'Order Menu System',
    product_price DECIMAL(10,2) DEFAULT 999.00,
    
    -- Additional requirements
    additional_requirements TEXT,
    
    -- Status and timestamps
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint to prevent exact duplicates
    CONSTRAINT unique_oms_customization UNIQUE (user_email, project_name, restaurant_name)
);

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_oms_customizations_user_email ON oms_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_created_at ON oms_customizations(created_at);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_status ON oms_customizations(status);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_project_restaurant ON oms_customizations(user_email, project_name, restaurant_name);

-- 4. Create OMS-specific function with duplicate prevention (FIXED RETURN TYPE)
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
RETURNS TABLE (
    success BOOLEAN,
    message TEXT,
    data_id UUID,
    is_duplicate BOOLEAN
) AS $$
DECLARE
    result_id UUID;
    existing_record RECORD;
    is_exact_duplicate BOOLEAN := FALSE;
BEGIN
    -- Check if exact duplicate exists (same email, project name, and restaurant name)
    SELECT id, user_email, project_name, restaurant_name, owner_name, restaurant_address, 
           contact_person, phone_number, additional_requirements, primary_color, 
           secondary_color, accent_color, text_color
    INTO existing_record
    FROM oms_customizations
    WHERE user_email = p_user_email 
      AND project_name = p_project_name 
      AND restaurant_name = p_restaurant_name;
    
    IF existing_record.id IS NOT NULL THEN
        -- Check if ALL fields are identical (exact duplicate)
        IF existing_record.owner_name = p_owner_name 
           AND existing_record.restaurant_address = p_restaurant_address
           AND existing_record.contact_person = p_contact_person
           AND existing_record.phone_number = p_phone_number
           AND COALESCE(existing_record.additional_requirements, '') = COALESCE(p_additional_requirements, '')
           AND existing_record.primary_color = p_primary_color
           AND existing_record.secondary_color = p_secondary_color
           AND existing_record.accent_color = p_accent_color
           AND existing_record.text_color = p_text_color THEN
            
            is_exact_duplicate := TRUE;
            RAISE NOTICE 'Exact duplicate found for user %, project %, restaurant %. All data is identical.', 
                         p_user_email, p_project_name, p_restaurant_name;
            
            -- Return existing record with duplicate flag
            RETURN QUERY SELECT 
                TRUE as success,
                'Data already exists with identical information. No new record created.' as message,
                existing_record.id as data_id,
                TRUE as is_duplicate;
            RETURN;
        ELSE
            -- Same email, project, restaurant but different data - update existing
            RAISE NOTICE 'Same email, project, restaurant found but with different data. Updating existing record.';
            
            UPDATE oms_customizations SET
                owner_name = p_owner_name,
                restaurant_address = p_restaurant_address,
                contact_person = p_contact_person,
                phone_number = p_phone_number,
                user_id = p_user_id,
                logo_url = p_logo_url,
                logo_filename = p_logo_filename,
                logo_size = p_logo_size,
                menu_categories = p_menu_categories,
                menu_items = p_menu_items,
                primary_color = p_primary_color,
                secondary_color = p_secondary_color,
                accent_color = p_accent_color,
                text_color = p_text_color,
                additional_requirements = p_additional_requirements,
                updated_at = NOW()
            WHERE id = existing_record.id
            RETURNING id INTO result_id;
            
            RETURN QUERY SELECT 
                TRUE as success,
                'Existing record updated with new data.' as message,
                result_id as data_id,
                FALSE as is_duplicate;
            RETURN;
        END IF;
    END IF;

    -- No existing record found, create new one
    INSERT INTO oms_customizations (
        user_email,
        project_name,
        restaurant_name,
        owner_name,
        restaurant_address,
        contact_person,
        phone_number,
        user_id,
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
    
    RETURN QUERY SELECT 
        TRUE as success,
        'New OMS customization created successfully.' as message,
        result_id as data_id,
        FALSE as is_duplicate;
END;
$$ LANGUAGE plpgsql;

-- 5. Create function to get OMS customizations by user
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

-- 6. Create function to get OMS customization for QR code generation
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
    product_type VARCHAR(100),
    product_name VARCHAR(255),
    product_price DECIMAL(10,2),
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
        o.product_type,
        o.product_name,
        o.product_price,
        o.additional_requirements,
        o.created_at
    FROM oms_customizations o
    WHERE o.id = p_customization_id;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_oms_customizations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_oms_customizations_updated_at
    BEFORE UPDATE ON oms_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_oms_customizations_updated_at();

-- 8. Grant permissions (OMS specific)
GRANT ALL ON oms_customizations TO authenticated;
GRANT EXECUTE ON FUNCTION upsert_oms_customization TO authenticated;
GRANT EXECUTE ON FUNCTION get_oms_customizations_by_user TO authenticated;
GRANT EXECUTE ON FUNCTION get_oms_customization_for_qr TO authenticated;

-- 9. Test the OMS setup with different scenarios
-- Test 1: Insert new data
SELECT * FROM upsert_oms_customization(
    'test@example.com',
    'My Restaurant App',
    'Delicious Bites',
    'John Doe',
    '123 Main Street, City',
    'John Doe',
    '+91 9876543210',
    NULL,
    NULL,
    NULL,
    NULL,
    '[{"id": "cat1", "name": "Starters"}]'::jsonb,
    '[{"id": "item1", "name": "Test Item", "price": 100}]'::jsonb,
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#000000',
    'Test requirements'
);

-- Test 2: Same email, different project (should create new row)
SELECT * FROM upsert_oms_customization(
    'test@example.com',
    'Different Project',
    'Delicious Bites',
    'John Doe',
    '123 Main Street, City',
    'John Doe',
    '+91 9876543210',
    NULL,
    NULL,
    NULL,
    NULL,
    '[{"id": "cat2", "name": "Main Course"}]'::jsonb,
    '[{"id": "item2", "name": "Different Item", "price": 200}]'::jsonb,
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#000000',
    'Different requirements'
);

-- Test 3: Same email, same project, same restaurant (should show duplicate message)
SELECT * FROM upsert_oms_customization(
    'test@example.com',
    'My Restaurant App',
    'Delicious Bites',
    'John Doe',
    '123 Main Street, City',
    'John Doe',
    '+91 9876543210',
    NULL,
    NULL,
    NULL,
    NULL,
    '[{"id": "cat1", "name": "Starters"}]'::jsonb,
    '[{"id": "item1", "name": "Test Item", "price": 100}]'::jsonb,
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#000000',
    'Test requirements'
);

-- 10. Verify all data in the table
SELECT 
    id,
    user_email,
    project_name,
    restaurant_name,
    owner_name,
    contact_person,
    phone_number,
    additional_requirements,
    created_at,
    updated_at
FROM oms_customizations 
ORDER BY created_at DESC;

-- 11. Test the get functions
SELECT * FROM get_oms_customizations_by_user('test@example.com');
