-- Updated OMS (Order Menu System) Database Setup with Duplicate Prevention
-- This creates separate tables and functions for OMS form data
-- Run this in Supabase SQL Editor

-- 1. Drop existing OMS functions and table if they exist
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

DROP FUNCTION IF EXISTS get_oms_customizations_by_user(VARCHAR(255));
DROP FUNCTION IF EXISTS get_oms_customization_for_qr(UUID);
DROP FUNCTION IF EXISTS check_oms_duplicate(VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(20));

-- Drop the table if it exists
DROP TABLE IF EXISTS oms_customizations CASCADE;

-- 2. Create OMS-specific table (separate from customization_forms)
CREATE TABLE oms_customizations (
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
    
    -- Address details
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    
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
CREATE INDEX idx_oms_customizations_user_email ON oms_customizations(user_email);
CREATE INDEX idx_oms_customizations_created_at ON oms_customizations(created_at);
CREATE INDEX idx_oms_customizations_status ON oms_customizations(status);
CREATE INDEX idx_oms_customizations_project_restaurant ON oms_customizations(user_email, project_name, restaurant_name);
CREATE INDEX idx_oms_customizations_contact_info ON oms_customizations(contact_person, phone_number);

-- 4. Create function to check for duplicates before insertion
CREATE OR REPLACE FUNCTION check_oms_duplicate(
    p_user_email VARCHAR(255),
    p_project_name VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_contact_person VARCHAR(255),
    p_phone_number VARCHAR(20)
)
RETURNS TABLE (
    is_duplicate BOOLEAN,
    duplicate_type VARCHAR(50),
    existing_id UUID,
    message TEXT
) AS $$
DECLARE
    existing_record RECORD;
    exact_duplicate BOOLEAN := FALSE;
    partial_duplicate BOOLEAN := FALSE;
BEGIN
    -- Check for exact duplicate (same email, project name, and restaurant name)
    SELECT id, user_email, project_name, restaurant_name, owner_name, restaurant_address, 
           contact_person, phone_number, additional_requirements, primary_color, 
           secondary_color, accent_color, text_color
    INTO existing_record
    FROM oms_customizations
    WHERE user_email = p_user_email 
      AND project_name = p_project_name 
      AND restaurant_name = p_restaurant_name;
    
    IF existing_record.id IS NOT NULL THEN
        exact_duplicate := TRUE;
        RETURN QUERY SELECT 
            TRUE as is_duplicate,
            'exact' as duplicate_type,
            existing_record.id as existing_id,
            'Data already exists with the same project name and restaurant name for this email.' as message;
        RETURN;
    END IF;
    
    -- Check for partial duplicate (same contact person and phone number)
    SELECT id, user_email, project_name, restaurant_name
    INTO existing_record
    FROM oms_customizations
    WHERE contact_person = p_contact_person 
      AND phone_number = p_phone_number;
    
    IF existing_record.id IS NOT NULL THEN
        partial_duplicate := TRUE;
        RETURN QUERY SELECT 
            TRUE as is_duplicate,
            'contact' as duplicate_type,
            existing_record.id as existing_id,
            'Data already exists with the same contact person and phone number.' as message;
        RETURN;
    END IF;
    
    -- Check for restaurant name duplicate (same restaurant name)
    SELECT id, user_email, project_name, restaurant_name
    INTO existing_record
    FROM oms_customizations
    WHERE restaurant_name = p_restaurant_name;
    
    IF existing_record.id IS NOT NULL THEN
        partial_duplicate := TRUE;
        RETURN QUERY SELECT 
            TRUE as is_duplicate,
            'restaurant' as duplicate_type,
            existing_record.id as existing_id,
            'Data already exists with the same restaurant name.' as message;
        RETURN;
    END IF;
    
    -- No duplicates found
    RETURN QUERY SELECT 
        FALSE as is_duplicate,
        'none' as duplicate_type,
        NULL::UUID as existing_id,
        'No duplicates found. Safe to proceed.' as message;
END;
$$ LANGUAGE plpgsql;

-- 5. Create OMS-specific function with enhanced duplicate prevention
CREATE OR REPLACE FUNCTION upsert_oms_customization(
    p_user_email VARCHAR(255),
    p_project_name VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_owner_name VARCHAR(255),
    p_restaurant_address TEXT,
    p_contact_person VARCHAR(255),
    p_phone_number VARCHAR(20),
    p_house_number VARCHAR(100) DEFAULT NULL,
    p_address_line1 VARCHAR(255) DEFAULT NULL,
    p_city VARCHAR(100) DEFAULT NULL,
    p_state VARCHAR(100) DEFAULT NULL,
    p_pincode VARCHAR(10) DEFAULT NULL,
    p_country VARCHAR(100) DEFAULT NULL,
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
    is_duplicate BOOLEAN,
    duplicate_type VARCHAR(50)
) AS $$
DECLARE
    result_id UUID;
    existing_record RECORD;
    duplicate_check RECORD;
    is_exact_duplicate BOOLEAN := FALSE;
    is_partial_duplicate BOOLEAN := FALSE;
BEGIN
    -- First check for duplicates
    SELECT * INTO duplicate_check FROM check_oms_duplicate(
        p_user_email, p_project_name, p_restaurant_name, p_contact_person, p_phone_number
    );
    
    IF duplicate_check.is_duplicate THEN
        -- Handle different types of duplicates
        IF duplicate_check.duplicate_type = 'exact' THEN
            -- Exact duplicate - return existing record
            RETURN QUERY SELECT 
                TRUE as success,
                'Data already exists with identical information. No new record created.' as message,
                duplicate_check.existing_id as data_id,
                TRUE as is_duplicate,
                'exact' as duplicate_type;
            RETURN;
        ELSIF duplicate_check.duplicate_type = 'contact' THEN
            -- Contact duplicate - update existing record
            UPDATE oms_customizations SET
                project_name = p_project_name,
                restaurant_name = p_restaurant_name,
                owner_name = p_owner_name,
                restaurant_address = p_restaurant_address,
                house_number = p_house_number,
                address_line1 = p_address_line1,
                city = p_city,
                state = p_state,
                pincode = p_pincode,
                country = p_country,
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
            WHERE id = duplicate_check.existing_id
            RETURNING id INTO result_id;
            
            RETURN QUERY SELECT 
                TRUE as success,
                'Existing record updated with new project information.' as message,
                result_id as data_id,
                FALSE as is_duplicate,
                'updated' as duplicate_type;
            RETURN;
        ELSIF duplicate_check.duplicate_type = 'restaurant' THEN
            -- Restaurant name duplicate - create new record with different project name
            INSERT INTO oms_customizations (
                user_email, project_name, restaurant_name, owner_name, restaurant_address,
                contact_person, phone_number, house_number, address_line1, city, state,
                pincode, country, user_id, logo_url, logo_filename, logo_size,
                menu_categories, menu_items, primary_color, secondary_color,
                accent_color, text_color, additional_requirements
            ) VALUES (
                p_user_email, p_project_name, p_restaurant_name, p_owner_name, p_restaurant_address,
                p_contact_person, p_phone_number, p_house_number, p_address_line1, p_city, p_state,
                p_pincode, p_country, p_user_id, p_logo_url, p_logo_filename, p_logo_size,
                p_menu_categories, p_menu_items, p_primary_color, p_secondary_color,
                p_accent_color, p_text_color, p_additional_requirements
            ) RETURNING id INTO result_id;
            
            RETURN QUERY SELECT 
                TRUE as success,
                'New record created. Restaurant name was already in use, but project name is different.' as message,
                result_id as data_id,
                FALSE as is_duplicate,
                'created' as duplicate_type;
            RETURN;
        END IF;
    END IF;

    -- No duplicates found, create new record
    INSERT INTO oms_customizations (
        user_email, project_name, restaurant_name, owner_name, restaurant_address,
        contact_person, phone_number, house_number, address_line1, city, state,
        pincode, country, user_id, logo_url, logo_filename, logo_size,
        menu_categories, menu_items, primary_color, secondary_color,
        accent_color, text_color, additional_requirements
    ) VALUES (
        p_user_email, p_project_name, p_restaurant_name, p_owner_name, p_restaurant_address,
        p_contact_person, p_phone_number, p_house_number, p_address_line1, p_city, p_state,
        p_pincode, p_country, p_user_id, p_logo_url, p_logo_filename, p_logo_size,
        p_menu_categories, p_menu_items, p_primary_color, p_secondary_color,
        p_accent_color, p_text_color, p_additional_requirements
    ) RETURNING id INTO result_id;
    
    RETURN QUERY SELECT 
        TRUE as success,
        'New OMS customization created successfully.' as message,
        result_id as data_id,
        FALSE as is_duplicate,
        'created' as duplicate_type;
END;
$$ LANGUAGE plpgsql;

-- 6. Create function to get OMS customizations by user
CREATE OR REPLACE FUNCTION get_oms_customizations_by_user(p_user_email VARCHAR(255))
RETURNS TABLE (
    id UUID,
    project_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    owner_name VARCHAR(255),
    restaurant_address TEXT,
    contact_person VARCHAR(255),
    phone_number VARCHAR(20),
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
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
        o.id, o.project_name, o.restaurant_name, o.owner_name, o.restaurant_address,
        o.contact_person, o.phone_number, o.house_number, o.address_line1,
        o.city, o.state, o.pincode, o.country, o.logo_url,
        o.menu_categories, o.menu_items, o.primary_color, o.secondary_color,
        o.accent_color, o.text_color, o.product_type, o.product_name,
        o.product_price, o.additional_requirements, o.status,
        o.created_at, o.updated_at
    FROM oms_customizations o
    WHERE o.user_email = p_user_email
    ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- 7. Create function to get OMS customization for QR code generation
CREATE OR REPLACE FUNCTION get_oms_customization_for_qr(p_customization_id UUID)
RETURNS TABLE (
    id UUID,
    project_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    owner_name VARCHAR(255),
    restaurant_address TEXT,
    contact_person VARCHAR(255),
    phone_number VARCHAR(20),
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
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
        o.id, o.project_name, o.restaurant_name, o.owner_name, o.restaurant_address,
        o.contact_person, o.phone_number, o.house_number, o.address_line1,
        o.city, o.state, o.pincode, o.country, o.logo_url,
        o.menu_categories, o.menu_items, o.primary_color, o.secondary_color,
        o.accent_color, o.text_color, o.product_type, o.product_name,
        o.product_price, o.additional_requirements, o.created_at
    FROM oms_customizations o
    WHERE o.id = p_customization_id;
END;
$$ LANGUAGE plpgsql;

-- 8. Create trigger for automatic timestamp updates
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

-- 9. Grant permissions (OMS specific)
GRANT ALL ON oms_customizations TO authenticated;
GRANT EXECUTE ON FUNCTION upsert_oms_customization TO authenticated;
GRANT EXECUTE ON FUNCTION get_oms_customizations_by_user TO authenticated;
GRANT EXECUTE ON FUNCTION get_oms_customization_for_qr TO authenticated;
GRANT EXECUTE ON FUNCTION check_oms_duplicate TO authenticated;

-- 10. Test the OMS setup with different scenarios
-- Test 1: Insert new data
SELECT * FROM upsert_oms_customization(
    'test@example.com',
    'My Restaurant App',
    'Delicious Bites',
    'John Doe',
    '123 Main Street, City, State 400001, India',
    'John Doe',
    '+91 9876543210',
    '123',
    'Main Street',
    'Mumbai',
    'Maharashtra',
    '400001',
    'India',
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
    '123 Main Street, City, State 400001, India',
    'John Doe',
    '+91 9876543210',
    '123',
    'Main Street',
    'Mumbai',
    'Maharashtra',
    '400001',
    'India',
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
    '123 Main Street, City, State 400001, India',
    'John Doe',
    '+91 9876543210',
    '123',
    'Main Street',
    'Mumbai',
    'Maharashtra',
    '400001',
    'India',
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

-- Test 4: Same contact person and phone (should update existing)
SELECT * FROM upsert_oms_customization(
    'different@example.com',
    'New Project',
    'New Restaurant',
    'John Doe',
    '456 New Street, City, State 500001, India',
    'John Doe',
    '+91 9876543210',
    '456',
    'New Street',
    'Delhi',
    'Delhi',
    '500001',
    'India',
    NULL,
    NULL,
    NULL,
    NULL,
    '[{"id": "cat3", "name": "Desserts"}]'::jsonb,
    '[{"id": "item3", "name": "New Item", "price": 300}]'::jsonb,
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#000000',
    'New requirements'
);

-- 11. Verify all data in the table
SELECT 
    id, user_email, project_name, restaurant_name, owner_name, 
    contact_person, phone_number, city, state, created_at, updated_at
FROM oms_customizations 
ORDER BY created_at DESC;

-- 12. Test the get functions
SELECT * FROM get_oms_customizations_by_user('test@example.com');
