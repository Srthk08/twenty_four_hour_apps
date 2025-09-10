-- Quick migration script for Order Menu System
-- Run this in your Supabase SQL editor or psql

-- Enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table for Order Menu System customizations
CREATE TABLE IF NOT EXISTS order_menu_system_customizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- User identification
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Product information
    product_id VARCHAR(50) NOT NULL DEFAULT 'order-menu-system',
    product_name VARCHAR(255) NOT NULL DEFAULT 'Order Menu System',
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 25000.00,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 25000.00,
    
    -- Restaurant Information
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    restaurant_address TEXT NOT NULL,
    
    -- Contact Information
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    
    -- Brand Colors (Optional)
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#000000',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    
    -- Restaurant Logo
    restaurant_logo_url TEXT,
    restaurant_logo_filename VARCHAR(255),
    restaurant_logo_size INTEGER,
    restaurant_logo_type VARCHAR(100),
    restaurant_logo_hash VARCHAR(64),
    
    -- Additional Requirements
    additional_requirements TEXT,
    
    -- Cart status
    cart_status VARCHAR(20) DEFAULT 'active' CHECK (cart_status IN ('active', 'completed', 'cancelled', 'expired')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Order Menu System menu items
CREATE TABLE IF NOT EXISTS order_menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customization_id UUID REFERENCES order_menu_system_customizations(id) ON DELETE CASCADE,
    
    -- Menu Item Details
    item_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity_available INTEGER NOT NULL DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_user_email ON order_menu_system_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_product_id ON order_menu_system_customizations(product_id);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_cart_status ON order_menu_system_customizations(cart_status);
CREATE INDEX IF NOT EXISTS idx_order_menu_items_customization_id ON order_menu_items(customization_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_order_menu_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_order_menu_customizations_updated_at
    BEFORE UPDATE ON order_menu_system_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_order_menu_updated_at();

CREATE TRIGGER update_order_menu_items_updated_at
    BEFORE UPDATE ON order_menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_order_menu_updated_at();

-- Success message
SELECT 'Order Menu System tables created successfully!' as status;
