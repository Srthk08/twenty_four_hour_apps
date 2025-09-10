-- Migration for Order Menu System data storage
-- This creates separate tables for Order Menu System while keeping existing structure for other products

-- Enable uuid extension if not already enabled
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
    restaurant_logo_hash VARCHAR(64), -- For duplicate detection
    
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

-- Create indexes for better performance
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

-- Create triggers for updated_at
CREATE TRIGGER update_order_menu_customizations_updated_at
    BEFORE UPDATE ON order_menu_system_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_order_menu_updated_at();

CREATE TRIGGER update_order_menu_items_updated_at
    BEFORE UPDATE ON order_menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_order_menu_updated_at();

-- Insert sample data for testing (optional)
INSERT INTO order_menu_system_customizations (
    user_email,
    restaurant_name,
    owner_name,
    restaurant_address,
    contact_email,
    contact_phone,
    primary_color,
    secondary_color,
    accent_color,
    text_color,
    additional_requirements
) VALUES (
    'test@example.com',
    'Sample Restaurant',
    'John Doe',
    '123 Main Street, City, State 12345',
    'test@example.com',
    '+1234567890',
    '#3B82F6',
    '#000000',
    '#F59E0B',
    '#1F2937',
    'Need QR code integration and real-time order tracking'
);

-- Insert sample menu items
INSERT INTO order_menu_items (customization_id, item_name, price, quantity_available)
SELECT 
    omc.id,
    item_data.item_name,
    item_data.price,
    item_data.quantity_available
FROM order_menu_system_customizations omc
CROSS JOIN (
    VALUES 
        ('Margherita Pizza', 299.00, 50),
        ('Chicken Burger', 199.00, 30),
        ('Caesar Salad', 149.00, 25),
        ('Chocolate Cake', 99.00, 15)
) AS item_data(item_name, price, quantity_available)
WHERE omc.user_email = 'test@example.com';

-- Add comments for documentation
COMMENT ON TABLE order_menu_system_customizations IS 'Stores Order Menu System customization data for restaurants';
COMMENT ON TABLE order_menu_items IS 'Stores individual menu items for Order Menu System customizations';

COMMENT ON COLUMN order_menu_system_customizations.restaurant_name IS 'Name of the restaurant';
COMMENT ON COLUMN order_menu_system_customizations.owner_name IS 'Name of the restaurant owner';
COMMENT ON COLUMN order_menu_system_customizations.restaurant_address IS 'Complete address of the restaurant';
COMMENT ON COLUMN order_menu_system_customizations.contact_email IS 'Contact email for the restaurant';
COMMENT ON COLUMN order_menu_system_customizations.contact_phone IS 'Contact phone number for the restaurant';
COMMENT ON COLUMN order_menu_system_customizations.primary_color IS 'Primary brand color (hex code)';
COMMENT ON COLUMN order_menu_system_customizations.secondary_color IS 'Secondary brand color (hex code)';
COMMENT ON COLUMN order_menu_system_customizations.accent_color IS 'Accent brand color (hex code)';
COMMENT ON COLUMN order_menu_system_customizations.text_color IS 'Text color (hex code)';
COMMENT ON COLUMN order_menu_system_customizations.restaurant_logo_url IS 'URL of the uploaded restaurant logo';
COMMENT ON COLUMN order_menu_system_customizations.additional_requirements IS 'Any additional requirements or special requests';

COMMENT ON COLUMN order_menu_items.item_name IS 'Name of the menu item';
COMMENT ON COLUMN order_menu_items.price IS 'Price of the menu item in the base currency';
COMMENT ON COLUMN order_menu_items.quantity_available IS 'Available quantity of the menu item';
