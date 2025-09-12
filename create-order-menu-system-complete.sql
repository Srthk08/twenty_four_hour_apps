-- Complete Order Menu System Database Schema
-- This script drops existing tables and creates new comprehensive tables
-- for storing all Order Menu System customization data

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS order_menu_items CASCADE;
DROP TABLE IF EXISTS order_menu_system_customizations CASCADE;

-- Create main Order Menu System customizations table
CREATE TABLE order_menu_system_customizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- User identification
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Product information
    product_id VARCHAR(50) NOT NULL DEFAULT 'order-menu-system',
    product_name VARCHAR(255) NOT NULL DEFAULT 'Order Menu System',
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 25000.00,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 25000.00,
    
    -- 1. Project Name
    project_name VARCHAR(255),
    
    -- 2. Contact Person
    contact_person VARCHAR(255),
    
    -- 3. Restaurant Name
    restaurant_name VARCHAR(255) NOT NULL,
    
    -- 4. Owner Name
    owner_name VARCHAR(255) NOT NULL,
    
    -- 5. App Icon (for non-Order Menu System products)
    app_icon_url TEXT,
    app_icon_filename VARCHAR(255),
    app_icon_size INTEGER,
    app_icon_type VARCHAR(100),
    app_icon_hash VARCHAR(64),
    
    -- 6. Restaurant Address
    restaurant_address TEXT NOT NULL,
    
    -- 7. Restaurant Logo
    restaurant_logo_url TEXT,
    restaurant_logo_filename VARCHAR(255),
    restaurant_logo_size INTEGER,
    restaurant_logo_type VARCHAR(100),
    restaurant_logo_hash VARCHAR(64),
    
    -- 9. Contact Information
    -- 9.1. Email
    contact_email VARCHAR(255) NOT NULL,
    -- 9.2. Phone Number
    contact_phone VARCHAR(20) NOT NULL,
    
    -- 10. App Screenshots (for non-Order Menu System products)
    app_screenshots JSONB DEFAULT '[]'::jsonb, -- Array of screenshot URLs
    app_screenshots_count INTEGER DEFAULT 0,
    
    -- 11. Brand Colors
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#000000',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    
    -- 12. Additional Requirements
    additional_requirements TEXT,
    
    -- Cart status
    cart_status VARCHAR(20) DEFAULT 'active' CHECK (cart_status IN ('active', 'completed', 'cancelled', 'expired')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Order Menu System menu items (8. Menu Items)
CREATE TABLE order_menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customization_id UUID REFERENCES order_menu_system_customizations(id) ON DELETE CASCADE,
    
    -- 8.1. Item Name
    item_name VARCHAR(255) NOT NULL,
    
    -- 8.2. Price
    price DECIMAL(10, 2) NOT NULL,
    
    -- 8.3. Quantity Available
    quantity_available INTEGER NOT NULL DEFAULT 0,
    
    -- Additional menu item details
    item_description TEXT,
    item_category VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_user_email ON order_menu_system_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_user_id ON order_menu_system_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_product_id ON order_menu_system_customizations(product_id);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_cart_status ON order_menu_system_customizations(cart_status);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_restaurant_name ON order_menu_system_customizations(restaurant_name);
CREATE INDEX IF NOT EXISTS idx_order_menu_customizations_created_at ON order_menu_system_customizations(created_at);

CREATE INDEX IF NOT EXISTS idx_order_menu_items_customization_id ON order_menu_items(customization_id);
CREATE INDEX IF NOT EXISTS idx_order_menu_items_item_name ON order_menu_items(item_name);
CREATE INDEX IF NOT EXISTS idx_order_menu_items_category ON order_menu_items(item_category);
CREATE INDEX IF NOT EXISTS idx_order_menu_items_available ON order_menu_items(is_available);

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

-- Create function to automatically update app_screenshots_count
CREATE OR REPLACE FUNCTION update_app_screenshots_count()
RETURNS TRIGGER AS $$
BEGIN
    NEW.app_screenshots_count = jsonb_array_length(NEW.app_screenshots);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for app_screenshots_count
CREATE TRIGGER update_app_screenshots_count_trigger
    BEFORE INSERT OR UPDATE ON order_menu_system_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_app_screenshots_count();

-- Insert sample data for testing
INSERT INTO order_menu_system_customizations (
    user_email,
    project_name,
    contact_person,
    restaurant_name,
    owner_name,
    restaurant_address,
    contact_email,
    contact_phone,
    primary_color,
    secondary_color,
    accent_color,
    text_color,
    additional_requirements,
    app_screenshots
) VALUES (
    'test@example.com',
    'My Restaurant Order System',
    'John Smith',
    'Sample Restaurant',
    'John Doe',
    '123 Main Street, City, State 12345',
    'test@example.com',
    '+1234567890',
    '#3B82F6',
    '#000000',
    '#F59E0B',
    '#1F2937',
    'Need QR code integration and real-time order tracking',
    '["https://example.com/screenshot1.jpg", "https://example.com/screenshot2.jpg"]'::jsonb
);

-- Insert sample menu items
INSERT INTO order_menu_items (customization_id, item_name, price, quantity_available, item_description, item_category, sort_order)
SELECT 
    omc.id,
    item_data.item_name,
    item_data.price,
    item_data.quantity_available,
    item_data.item_description,
    item_data.item_category,
    item_data.sort_order
FROM order_menu_system_customizations omc
CROSS JOIN (
    VALUES 
        ('Margherita Pizza', 299.00, 50, 'Classic Italian pizza with fresh tomatoes and mozzarella', 'Pizza', 1),
        ('Chicken Burger', 199.00, 30, 'Juicy chicken patty with fresh vegetables', 'Burgers', 2),
        ('Caesar Salad', 149.00, 25, 'Fresh romaine lettuce with caesar dressing', 'Salads', 3),
        ('Chocolate Cake', 99.00, 15, 'Rich chocolate cake with chocolate frosting', 'Desserts', 4),
        ('Coca Cola', 49.00, 100, 'Refreshing cola drink', 'Beverages', 5)
) AS item_data(item_name, price, quantity_available, item_description, item_category, sort_order)
WHERE omc.user_email = 'test@example.com';

-- Add comprehensive comments for documentation
COMMENT ON TABLE order_menu_system_customizations IS 'Stores complete Order Menu System customization data including all form fields';
COMMENT ON TABLE order_menu_items IS 'Stores individual menu items for Order Menu System customizations with detailed information';

-- Field documentation
COMMENT ON COLUMN order_menu_system_customizations.project_name IS 'Name of the project (1. Project Name)';
COMMENT ON COLUMN order_menu_system_customizations.contact_person IS 'Name of the contact person (2. Contact Person)';
COMMENT ON COLUMN order_menu_system_customizations.restaurant_name IS 'Name of the restaurant (3. Restaurant Name)';
COMMENT ON COLUMN order_menu_system_customizations.owner_name IS 'Name of the restaurant owner (4. Owner Name)';
COMMENT ON COLUMN order_menu_system_customizations.app_icon_url IS 'URL of the uploaded app icon (5. App Icon)';
COMMENT ON COLUMN order_menu_system_customizations.restaurant_address IS 'Complete address of the restaurant (6. Restaurant Address)';
COMMENT ON COLUMN order_menu_system_customizations.restaurant_logo_url IS 'URL of the uploaded restaurant logo (7. Restaurant Logo)';
COMMENT ON COLUMN order_menu_system_customizations.contact_email IS 'Contact email for the restaurant (9.1. Email)';
COMMENT ON COLUMN order_menu_system_customizations.contact_phone IS 'Contact phone number for the restaurant (9.2. Phone Number)';
COMMENT ON COLUMN order_menu_system_customizations.app_screenshots IS 'JSON array of app screenshot URLs (10. App Screenshots)';
COMMENT ON COLUMN order_menu_system_customizations.primary_color IS 'Primary brand color hex code (11. Brand Colors)';
COMMENT ON COLUMN order_menu_system_customizations.secondary_color IS 'Secondary brand color hex code (11. Brand Colors)';
COMMENT ON COLUMN order_menu_system_customizations.accent_color IS 'Accent brand color hex code (11. Brand Colors)';
COMMENT ON COLUMN order_menu_system_customizations.text_color IS 'Text color hex code (11. Brand Colors)';
COMMENT ON COLUMN order_menu_system_customizations.additional_requirements IS 'Any additional requirements or special requests (12. Additional Requirements)';

COMMENT ON COLUMN order_menu_items.item_name IS 'Name of the menu item (8.1. Item Name)';
COMMENT ON COLUMN order_menu_items.price IS 'Price of the menu item (8.2. Price)';
COMMENT ON COLUMN order_menu_items.quantity_available IS 'Available quantity of the menu item (8.3. Quantity Available)';

-- Create a view for easy data retrieval
CREATE OR REPLACE VIEW order_menu_system_complete AS
SELECT 
    omc.*,
    COALESCE(
        json_agg(
            json_build_object(
                'id', omi.id,
                'item_name', omi.item_name,
                'price', omi.price,
                'quantity_available', omi.quantity_available,
                'item_description', omi.item_description,
                'item_category', omi.item_category,
                'is_available', omi.is_available,
                'sort_order', omi.sort_order
            ) ORDER BY omi.sort_order, omi.item_name
        ) FILTER (WHERE omi.id IS NOT NULL),
        '[]'::json
    ) as menu_items
FROM order_menu_system_customizations omc
LEFT JOIN order_menu_items omi ON omc.id = omi.customization_id
GROUP BY omc.id;

-- Grant necessary permissions
GRANT ALL ON order_menu_system_customizations TO authenticated;
GRANT ALL ON order_menu_items TO authenticated;
GRANT ALL ON order_menu_system_complete TO authenticated;

-- Enable Row Level Security (RLS)
ALTER TABLE order_menu_system_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_menu_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own order menu customizations" ON order_menu_system_customizations
    FOR SELECT USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own order menu customizations" ON order_menu_system_customizations
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own order menu customizations" ON order_menu_system_customizations
    FOR UPDATE USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete their own order menu customizations" ON order_menu_system_customizations
    FOR DELETE USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can view menu items for their customizations" ON order_menu_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM order_menu_system_customizations omc 
            WHERE omc.id = customization_id 
            AND (omc.user_id = auth.uid() OR omc.user_email = auth.jwt() ->> 'email')
        )
    );

CREATE POLICY "Users can insert menu items for their customizations" ON order_menu_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM order_menu_system_customizations omc 
            WHERE omc.id = customization_id 
            AND (omc.user_id = auth.uid() OR omc.user_email = auth.jwt() ->> 'email')
        )
    );

CREATE POLICY "Users can update menu items for their customizations" ON order_menu_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM order_menu_system_customizations omc 
            WHERE omc.id = customization_id 
            AND (omc.user_id = auth.uid() OR omc.user_email = auth.jwt() ->> 'email')
        )
    );

CREATE POLICY "Users can delete menu items for their customizations" ON order_menu_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM order_menu_system_customizations omc 
            WHERE omc.id = customization_id 
            AND (omc.user_id = auth.uid() OR omc.user_email = auth.jwt() ->> 'email')
        )
    );

-- Success message
SELECT 'Order Menu System tables created successfully with all required fields!' as status;
