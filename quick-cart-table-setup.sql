-- Quick setup for cart_customizations table
-- Run this in Supabase SQL Editor if the table doesn't exist

-- Drop table if exists (for fresh start)
DROP TABLE IF EXISTS cart_customizations CASCADE;

-- Create the main table
CREATE TABLE cart_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    custom_name VARCHAR(255),
    restaurant_name_customization VARCHAR(255),
    selected_color VARCHAR(7) DEFAULT '#3B82F6',
    selected_features JSONB DEFAULT '[]',
    project_name VARCHAR(255),
    contact_person VARCHAR(255),
    restaurant_name VARCHAR(255),
    cuisine_type VARCHAR(100),
    app_name VARCHAR(255),
    product_description_custom TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#000000',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    restaurant_logo_url TEXT,
    restaurant_logo_filename VARCHAR(255),
    restaurant_logo_size INTEGER,
    restaurant_logo_type VARCHAR(100),
    menu_photos_urls JSONB DEFAULT '[]',
    menu_photos_filenames JSONB DEFAULT '[]',
    menu_photos_sizes JSONB DEFAULT '[]',
    menu_photos_types JSONB DEFAULT '[]',
    additional_requirements TEXT,
    cart_status VARCHAR(20) DEFAULT 'active',
    is_checkout_initiated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_cart_user_email ON cart_customizations(user_email);
CREATE INDEX idx_cart_product_id ON cart_customizations(product_id);
CREATE INDEX idx_cart_status ON cart_customizations(cart_status);

-- Enable RLS
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can manage own carts" ON cart_customizations
    FOR ALL USING (user_email = auth.jwt() ->> 'email');

-- Grant permissions
GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON cart_customizations TO service_role;
