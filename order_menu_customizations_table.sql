-- =====================================================
-- ORDER MENU CUSTOMIZATION FORM - COMPLETE SQL QUERY
-- Based on the form images provided
-- Handles duplicate prevention and file storage
-- =====================================================

-- CREATE ORDER MENU CUSTOMIZATIONS TABLE
CREATE TABLE IF NOT EXISTS order_menu_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Project Information
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    
    -- Contact Information
    contact_person VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    
    -- Restaurant Address (Complete Address)
    house_flat_number VARCHAR(100) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    
    -- File Storage URLs
    logo_url TEXT,
    logo_storage_path TEXT,
    menu_photo_url TEXT,
    menu_photo_storage_path TEXT,
    
    -- Additional Requirements
    additional_requirements TEXT,
    
    -- Order Information
    base_package_price DECIMAL(10,2) DEFAULT 999.00,
    gst_amount DECIMAL(10,2) DEFAULT 180.00,
    total_amount DECIMAL(10,2) DEFAULT 1179.00,
    
    -- Status and Timestamps
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    
    -- UNIQUE CONSTRAINT TO PREVENT DUPLICATES
    -- Same email + same restaurant name + same address = DUPLICATE (BLOCKED)
    -- Same email + different restaurant name = ALLOWED
    -- Same email + same restaurant name + different address = ALLOWED
    UNIQUE(user_email, restaurant_name, house_flat_number, address_line_1, city, state, pincode)
);

-- CREATE INDEXES FOR BETTER PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_email ON order_menu_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_restaurant ON order_menu_customizations(restaurant_name);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_status ON order_menu_customizations(status);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_created_at ON order_menu_customizations(created_at);

-- =====================================================
-- FUNCTIONS FOR DUPLICATE HANDLING
-- =====================================================

-- FUNCTION TO CHECK FOR DUPLICATE ORDER MENU CUSTOMIZATION
CREATE OR REPLACE FUNCTION check_order_menu_duplicate(
    p_user_email VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_house_flat_number VARCHAR(100),
    p_address_line_1 VARCHAR(255),
    p_city VARCHAR(100),
    p_state VARCHAR(100),
    p_pincode VARCHAR(20)
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM order_menu_customizations 
        WHERE user_email = p_user_email 
        AND restaurant_name = p_restaurant_name
        AND house_flat_number = p_house_flat_number
        AND address_line_1 = p_address_line_1
        AND city = p_city
        AND state = p_state
        AND pincode = p_pincode
    );
END;
$$ LANGUAGE plpgsql;

-- FUNCTION TO INSERT ORDER MENU CUSTOMIZATION WITH DUPLICATE CHECK
CREATE OR REPLACE FUNCTION insert_order_menu_customization(
    p_project_name VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_owner_name VARCHAR(255),
    p_contact_person VARCHAR(255),
    p_user_email VARCHAR(255),
    p_phone_number VARCHAR(50),
    p_house_flat_number VARCHAR(100),
    p_address_line_1 VARCHAR(255),
    p_city VARCHAR(100),
    p_state VARCHAR(100),
    p_pincode VARCHAR(20),
    p_country VARCHAR(100) DEFAULT 'India',
    p_logo_url TEXT DEFAULT NULL,
    p_logo_storage_path TEXT DEFAULT NULL,
    p_menu_photo_url TEXT DEFAULT NULL,
    p_menu_photo_storage_path TEXT DEFAULT NULL,
    p_additional_requirements TEXT DEFAULT NULL,
    p_base_package_price DECIMAL(10,2) DEFAULT 999.00,
    p_gst_amount DECIMAL(10,2) DEFAULT 180.00,
    p_total_amount DECIMAL(10,2) DEFAULT 1179.00
) RETURNS UUID AS $$
DECLARE
    order_id UUID;
BEGIN
    -- Check for duplicate
    IF check_order_menu_duplicate(
        p_user_email, p_restaurant_name, p_house_flat_number, 
        p_address_line_1, p_city, p_state, p_pincode
    ) THEN
        RAISE EXCEPTION 'Duplicate order menu customization: Same email, restaurant name, and address already exists';
    END IF;
    
    -- Insert new order menu customization
    INSERT INTO order_menu_customizations (
        project_name, restaurant_name, owner_name, contact_person, user_email, phone_number,
        house_flat_number, address_line_1, city, state, pincode, country,
        logo_url, logo_storage_path, menu_photo_url, menu_photo_storage_path,
        additional_requirements, base_package_price, gst_amount, total_amount
    ) VALUES (
        p_project_name, p_restaurant_name, p_owner_name, p_contact_person, p_user_email, p_phone_number,
        p_house_flat_number, p_address_line_1, p_city, p_state, p_pincode, p_country,
        p_logo_url, p_logo_storage_path, p_menu_photo_url, p_menu_photo_storage_path,
        p_additional_requirements, p_base_package_price, p_gst_amount, p_total_amount
    ) RETURNING id INTO order_id;
    
    RETURN order_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- EXAMPLE DATA INSERTION
-- =====================================================

-- Example 1: Insert order menu customization (ALLOWED - different restaurant)
INSERT INTO order_menu_customizations (
    project_name, restaurant_name, owner_name, contact_person, user_email, phone_number,
    house_flat_number, address_line_1, city, state, pincode, country,
    logo_url, menu_photo_url, additional_requirements, total_amount
) VALUES (
    'Pizza Palace Downtown Project',
    'Pizza Palace',
    'Tony Romano',
    'Tony Romano',
    'arun@gmail.com',
    '74185296',
    '123',
    'Main Street, Sector 15',
    'Mumbai',
    'Maharashtra',
    '400001',
    'India',
    'https://storage.supabase.com/logos/pizza-palace-logo.png',
    'https://storage.supabase.com/menus/pizza-palace-menu.jpg',
    'Need custom pizza ordering system with delivery tracking',
    1179.00
);

-- Example 2: Same email, different restaurant (ALLOWED)
INSERT INTO order_menu_customizations (
    project_name, restaurant_name, owner_name, contact_person, user_email, phone_number,
    house_flat_number, address_line_1, city, state, pincode, country,
    logo_url, menu_photo_url, additional_requirements, total_amount
) VALUES (
    'Burger King Central Project',
    'Burger King',
    'John Smith',
    'John Smith',
    'arun@gmail.com',
    '74185296',
    '456',
    'Oak Avenue, Sector 20',
    'Delhi',
    'Delhi',
    '110001',
    'India',
    'https://storage.supabase.com/logos/burger-king-logo.png',
    'https://storage.supabase.com/menus/burger-king-menu.jpg',
    'Need burger customization options',
    1179.00
);

-- Example 3: Same email, same restaurant, different address (ALLOWED)
INSERT INTO order_menu_customizations (
    project_name, restaurant_name, owner_name, contact_person, user_email, phone_number,
    house_flat_number, address_line_1, city, state, pincode, country,
    logo_url, menu_photo_url, additional_requirements, total_amount
) VALUES (
    'Pizza Palace Branch 2 Project',
    'Pizza Palace',
    'Tony Romano',
    'Tony Romano',
    'arun@gmail.com',
    '74185296',
    '789',
    'Elm Street, Sector 25',
    'Bangalore',
    'Karnataka',
    '560001',
    'India',
    'https://storage.supabase.com/logos/pizza-palace-logo-2.png',
    'https://storage.supabase.com/menus/pizza-palace-menu-2.jpg',
    'Second branch with different menu',
    1179.00
);

-- Example 4: Exact duplicate (BLOCKED - will cause error)
-- INSERT INTO order_menu_customizations (
--     project_name, restaurant_name, owner_name, contact_person, user_email, phone_number,
--     house_flat_number, address_line_1, city, state, pincode, country,
--     logo_url, menu_photo_url, additional_requirements, total_amount
-- ) VALUES (
--     'Pizza Palace Downtown Project',
--     'Pizza Palace',
--     'Tony Romano',
--     'Tony Romano',
--     'arun@gmail.com',
--     '74185296',
--     '123',
--     'Main Street, Sector 15',
--     'Mumbai',
--     'Maharashtra',
--     '400001',
--     'India',
--     'https://storage.supabase.com/logos/pizza-palace-logo.png',
--     'https://storage.supabase.com/menus/pizza-palace-menu.jpg',
--     'Need custom pizza ordering system with delivery tracking',
--     1179.00
-- );
-- ERROR: duplicate key value violates unique constraint

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get all order menu customizations
SELECT * FROM order_menu_customizations ORDER BY created_at DESC;

-- Get order menu customizations by email (same email, different restaurants)
SELECT * FROM order_menu_customizations 
WHERE user_email = 'arun@gmail.com' 
ORDER BY created_at DESC;

-- Get pending order menu customizations
SELECT * FROM order_menu_customizations 
WHERE status = 'pending' 
ORDER BY created_at ASC;

-- Update order menu customization status
UPDATE order_menu_customizations 
SET 
    status = 'completed',
    updated_at = NOW(),
    processed_at = NOW()
WHERE id = 'your-order-id-here';

-- Check for duplicates before inserting
SELECT COUNT(*) FROM order_menu_customizations 
WHERE user_email = 'arun@gmail.com' 
AND restaurant_name = 'Pizza Palace'
AND house_flat_number = '123'
AND address_line_1 = 'Main Street, Sector 15'
AND city = 'Mumbai'
AND state = 'Maharashtra'
AND pincode = '400001';

-- =====================================================
-- STATUS VALUES
-- =====================================================
-- 'pending' - Newly submitted form
-- 'processing' - Currently being processed
-- 'completed' - Successfully processed
-- 'failed' - Processing failed

-- =====================================================
-- FILE STORAGE NOTES
-- =====================================================
-- logo_url: Public URL to access the logo file
-- logo_storage_path: Internal storage path in Supabase
-- menu_photo_url: Public URL to access the menu photo
-- menu_photo_storage_path: Internal storage path in Supabase

-- =====================================================
-- DUPLICATE PREVENTION LOGIC
-- =====================================================
-- ✅ ALLOWED: Same email + different restaurant name
-- ✅ ALLOWED: Same email + same restaurant + different address
-- ❌ BLOCKED: Same email + same restaurant + same address
