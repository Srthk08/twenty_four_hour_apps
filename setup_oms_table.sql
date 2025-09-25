-- Quick setup for OMS table in Supabase
-- Run this in Supabase SQL Editor if the oms_customizations table doesn't exist

-- First, check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'oms_customizations'
);

-- If the above returns false, run the main schema
-- Copy and paste the entire content from oms_customization_schema.sql

-- Or create a minimal version for testing:
CREATE TABLE IF NOT EXISTS oms_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    restaurant_address TEXT NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    logo_url TEXT,
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
    additional_requirements TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint to prevent duplicates
    CONSTRAINT unique_oms_customization UNIQUE (user_email, project_name, restaurant_name)
);

-- Create the upsert function
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
    -- Check if exact duplicate exists
    SELECT id INTO existing_record
    FROM oms_customizations
    WHERE user_email = p_user_email 
      AND project_name = p_project_name 
      AND restaurant_name = p_restaurant_name;
    
    IF existing_record.id IS NOT NULL THEN
        -- Exact duplicate found, return existing ID
        RAISE NOTICE 'Exact duplicate found. Returning existing ID: %', existing_record.id;
        RETURN existing_record.id;
    END IF;

    -- No exact duplicate, proceed with insert
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
    RETURN result_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT ALL ON oms_customizations TO authenticated;
GRANT EXECUTE ON FUNCTION upsert_oms_customization TO authenticated;

-- Test the function
SELECT upsert_oms_customization(
    'test@example.com',
    'Test Project',
    'Test Restaurant',
    'Test Owner',
    '123 Test Street',
    'Test Contact',
    '+91 9999999999'
);
