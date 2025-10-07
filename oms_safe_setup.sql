-- Safe OMS Database Setup - Only drops OMS-specific tables and functions
-- This preserves all other existing tables in your database

-- 1. Drop only OMS-specific functions (if they exist)
DROP FUNCTION IF EXISTS check_oms_duplicate(VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(20)) CASCADE;
DROP FUNCTION IF EXISTS upsert_oms_customization(VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(500), VARCHAR(255), VARCHAR(20), VARCHAR(100), VARCHAR(255), VARCHAR(100), VARCHAR(100), VARCHAR(10), VARCHAR(100), UUID, VARCHAR(500), VARCHAR(255), INTEGER, JSONB, JSONB, VARCHAR(7), VARCHAR(7), VARCHAR(7), VARCHAR(7), VARCHAR(1000)) CASCADE;
DROP FUNCTION IF EXISTS get_oms_customizations_by_user(VARCHAR(255)) CASCADE;
DROP FUNCTION IF EXISTS get_oms_customization_for_qr(UUID) CASCADE;
DROP FUNCTION IF EXISTS upsert_oms_product_customization(VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(20), VARCHAR(500), VARCHAR(100), VARCHAR(255), VARCHAR(100), VARCHAR(100), VARCHAR(10), VARCHAR(100), UUID, VARCHAR(500), VARCHAR(255), INTEGER, JSONB, JSONB, VARCHAR(7), VARCHAR(7), VARCHAR(7), VARCHAR(7), VARCHAR(1000)) CASCADE;
DROP FUNCTION IF EXISTS get_oms_product_customizations_by_user(VARCHAR(255)) CASCADE;
DROP FUNCTION IF EXISTS check_oms_product_duplicate(VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(255), VARCHAR(20)) CASCADE;

-- 2. Drop only OMS-specific tables (if they exist)
DROP TABLE IF EXISTS oms_customizations CASCADE;
DROP TABLE IF EXISTS oms_product_customizations CASCADE;

-- 3. Create OMS Customizations table
CREATE TABLE oms_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    restaurant_address VARCHAR(500) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    logo_filename VARCHAR(255),
    logo_size INTEGER,
    menu_categories JSONB DEFAULT '[]'::jsonb,
    menu_items JSONB DEFAULT '[]'::jsonb,
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    product_type VARCHAR(100) DEFAULT 'order-menu-system',
    product_name VARCHAR(255) DEFAULT 'Order Menu System',
    product_price DECIMAL(10,2) DEFAULT 999.00,
    additional_requirements VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_oms_customization UNIQUE (user_email, project_name, restaurant_name)
);

-- 4. Create OMS Product Customizations table
CREATE TABLE oms_product_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    restaurant_address VARCHAR(500) NOT NULL,
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    logo_filename VARCHAR(255),
    logo_size INTEGER,
    menu_categories JSONB DEFAULT '[]'::jsonb,
    menu_items JSONB DEFAULT '[]'::jsonb,
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    product_type VARCHAR(100) DEFAULT 'order-menu-system',
    product_name VARCHAR(255) DEFAULT 'Order Menu System',
    product_price DECIMAL(10,2) DEFAULT 999.00,
    additional_requirements VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_oms_product_customization UNIQUE (user_email, project_name, restaurant_name)
);

-- 5. Create indexes
CREATE INDEX IF NOT EXISTS idx_oms_customizations_user_email ON oms_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_created_at ON oms_customizations(created_at);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_status ON oms_customizations(status);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_project_restaurant ON oms_customizations(user_email, project_name, restaurant_name);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_contact_info ON oms_customizations(contact_person, phone_number);

CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_user_email ON oms_product_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_created_at ON oms_product_customizations(created_at);
CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_status ON oms_product_customizations(status);
CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_project_restaurant ON oms_product_customizations(user_email, project_name, restaurant_name);
CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_contact_info ON oms_product_customizations(contact_person, phone_number);

-- 6. Create check_oms_duplicate function
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
    message VARCHAR(500)
) AS $$
DECLARE
    existing_record RECORD;
BEGIN
    -- Check for exact duplicate
    SELECT id, user_email, project_name, restaurant_name, owner_name, restaurant_address, 
           contact_person, phone_number, additional_requirements, primary_color, 
           secondary_color, accent_color, text_color
    INTO existing_record
    FROM oms_customizations
    WHERE user_email = p_user_email 
      AND project_name = p_project_name 
      AND restaurant_name = p_restaurant_name;
    
    IF existing_record.id IS NOT NULL THEN
        RETURN QUERY SELECT 
            TRUE as is_duplicate,
            'exact'::VARCHAR(50) as duplicate_type,
            existing_record.id as existing_id,
            'Data already exists with the same project name and restaurant name for this email.'::VARCHAR(500) as message;
        RETURN;
    END IF;
    
    -- Check for contact duplicate
    SELECT id, user_email, project_name, restaurant_name
    INTO existing_record
    FROM oms_customizations
    WHERE contact_person = p_contact_person 
      AND phone_number = p_phone_number;
    
    IF existing_record.id IS NOT NULL THEN
        RETURN QUERY SELECT 
            TRUE as is_duplicate,
            'contact'::VARCHAR(50) as duplicate_type,
            existing_record.id as existing_id,
            'Data already exists with the same contact person and phone number.'::VARCHAR(500) as message;
        RETURN;
    END IF;
    
    -- Check for restaurant duplicate
    SELECT id, user_email, project_name, restaurant_name
    INTO existing_record
    FROM oms_customizations
    WHERE restaurant_name = p_restaurant_name;
    
    IF existing_record.id IS NOT NULL THEN
        RETURN QUERY SELECT 
            TRUE as is_duplicate,
            'restaurant'::VARCHAR(50) as duplicate_type,
            existing_record.id as existing_id,
            'Data already exists with the same restaurant name.'::VARCHAR(500) as message;
        RETURN;
    END IF;
    
    -- No duplicates found
    RETURN QUERY SELECT 
        FALSE as is_duplicate,
        'none'::VARCHAR(50) as duplicate_type,
        NULL::UUID as existing_id,
        'No duplicates found. Safe to proceed.'::VARCHAR(500) as message;
END;
$$ LANGUAGE plpgsql;

-- 7. Create upsert_oms_customization function
CREATE OR REPLACE FUNCTION upsert_oms_customization(
    p_user_email VARCHAR(255),
    p_project_name VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_owner_name VARCHAR(255),
    p_restaurant_address VARCHAR(500),
    p_contact_person VARCHAR(255),
    p_phone_number VARCHAR(20),
    p_house_number VARCHAR(100) DEFAULT NULL,
    p_address_line1 VARCHAR(255) DEFAULT NULL,
    p_city VARCHAR(100) DEFAULT NULL,
    p_state VARCHAR(100) DEFAULT NULL,
    p_pincode VARCHAR(10) DEFAULT NULL,
    p_country VARCHAR(100) DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_logo_url VARCHAR(500) DEFAULT NULL,
    p_logo_filename VARCHAR(255) DEFAULT NULL,
    p_logo_size INTEGER DEFAULT NULL,
    p_menu_categories JSONB DEFAULT '[]'::jsonb,
    p_menu_items JSONB DEFAULT '[]'::jsonb,
    p_primary_color VARCHAR(7) DEFAULT '#3B82F6',
    p_secondary_color VARCHAR(7) DEFAULT '#10B981',
    p_accent_color VARCHAR(7) DEFAULT '#F59E0B',
    p_text_color VARCHAR(7) DEFAULT '#1F2937',
    p_additional_requirements VARCHAR(1000) DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    message VARCHAR(500),
    data_id UUID,
    is_duplicate BOOLEAN,
    duplicate_type VARCHAR(50)
) AS $$
DECLARE
    result_id UUID;
    duplicate_check RECORD;
BEGIN
    -- Check for duplicates
    SELECT * INTO duplicate_check FROM check_oms_duplicate(
        p_user_email, p_project_name, p_restaurant_name, p_contact_person, p_phone_number
    );
    
    IF duplicate_check.is_duplicate THEN
        IF duplicate_check.duplicate_type = 'exact' THEN
            RETURN QUERY SELECT 
                TRUE as success,
                'Data already exists with identical information. No new record created.'::VARCHAR(500) as message,
                duplicate_check.existing_id as data_id,
                TRUE as is_duplicate,
                'exact'::VARCHAR(50) as duplicate_type;
            RETURN;
        ELSIF duplicate_check.duplicate_type = 'contact' THEN
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
                'Existing record updated with new project information.'::VARCHAR(500) as message,
                result_id as data_id,
                FALSE as is_duplicate,
                'updated'::VARCHAR(50) as duplicate_type;
            RETURN;
        ELSIF duplicate_check.duplicate_type = 'restaurant' THEN
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
                'New record created. Restaurant name was already in use, but project name is different.'::VARCHAR(500) as message,
                result_id as data_id,
                FALSE as is_duplicate,
                'created'::VARCHAR(50) as duplicate_type;
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
        'New OMS customization created successfully.'::VARCHAR(500) as message,
        result_id as data_id,
        FALSE as is_duplicate,
        'created'::VARCHAR(50) as duplicate_type;
END;
$$ LANGUAGE plpgsql;

-- 8. Create get_oms_customizations_by_user function
CREATE OR REPLACE FUNCTION get_oms_customizations_by_user(p_user_email VARCHAR(255))
RETURNS TABLE (
    id UUID,
    project_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    owner_name VARCHAR(255),
    restaurant_address VARCHAR(500),
    contact_person VARCHAR(255),
    phone_number VARCHAR(20),
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    menu_categories JSONB,
    menu_items JSONB,
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    accent_color VARCHAR(7),
    text_color VARCHAR(7),
    product_type VARCHAR(100),
    product_name VARCHAR(255),
    product_price DECIMAL(10,2),
    additional_requirements VARCHAR(1000),
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

-- 9. Create get_oms_customization_for_qr function
CREATE OR REPLACE FUNCTION get_oms_customization_for_qr(p_customization_id UUID)
RETURNS TABLE (
    id UUID,
    project_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    owner_name VARCHAR(255),
    restaurant_address VARCHAR(500),
    contact_person VARCHAR(255),
    phone_number VARCHAR(20),
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    menu_categories JSONB,
    menu_items JSONB,
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    accent_color VARCHAR(7),
    text_color VARCHAR(7),
    product_type VARCHAR(100),
    product_name VARCHAR(255),
    product_price DECIMAL(10,2),
    additional_requirements VARCHAR(1000),
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

-- 10. Create triggers
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

CREATE OR REPLACE FUNCTION update_oms_product_customizations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_oms_product_customizations_updated_at
    BEFORE UPDATE ON oms_product_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_oms_product_customizations_updated_at();

-- 11. Grant permissions
GRANT ALL ON oms_customizations TO authenticated;
GRANT ALL ON oms_product_customizations TO authenticated;
GRANT EXECUTE ON FUNCTION upsert_oms_customization TO authenticated;
GRANT EXECUTE ON FUNCTION get_oms_customizations_by_user TO authenticated;
GRANT EXECUTE ON FUNCTION get_oms_customization_for_qr TO authenticated;
GRANT EXECUTE ON FUNCTION check_oms_duplicate TO authenticated;

-- 12. Test the setup
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

-- 13. Verify the data
SELECT * FROM get_oms_customizations_by_user('test@example.com');
