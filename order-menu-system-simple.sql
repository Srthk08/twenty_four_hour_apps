-- Simple Order Menu System SQL Query for Supabase
-- Execute this in Supabase SQL Editor

-- Drop existing tables if they exist
DROP TABLE IF EXISTS order_menu_items CASCADE;
DROP TABLE IF EXISTS order_menu_system_customizations CASCADE;

-- Create main Order Menu System table with all required fields
CREATE TABLE order_menu_system_customizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
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
    
    -- 5. App Icon
    app_icon_url TEXT,
    app_icon_filename VARCHAR(255),
    app_icon_size INTEGER,
    app_icon_type VARCHAR(100),
    
    -- 6. Restaurant Address
    restaurant_address TEXT NOT NULL,
    
    -- 7. Restaurant Logo
    restaurant_logo_url TEXT,
    restaurant_logo_filename VARCHAR(255),
    restaurant_logo_size INTEGER,
    restaurant_logo_type VARCHAR(100),
    
    -- 9. Contact Information
    -- 9.1. Email
    contact_email VARCHAR(255) NOT NULL,
    -- 9.2. Phone Number
    contact_phone VARCHAR(20) NOT NULL,
    
    -- 10. App Screenshots
    app_screenshots JSONB DEFAULT '[]'::jsonb,
    
    -- 11. Brand Colors
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#000000',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    
    -- 12. Additional Requirements
    additional_requirements TEXT,
    
    -- Status and timestamps
    cart_status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu items table
CREATE TABLE order_menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customization_id UUID REFERENCES order_menu_system_customizations(id) ON DELETE CASCADE,
    
    -- 8.1. Item Name
    item_name VARCHAR(255) NOT NULL,
    
    -- 8.2. Price
    price DECIMAL(10, 2) NOT NULL,
    
    -- 8.3. Quantity Available
    quantity_available INTEGER NOT NULL DEFAULT 0,
    
    -- Additional fields
    item_description TEXT,
    item_category VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_order_menu_user_email ON order_menu_system_customizations(user_email);
CREATE INDEX idx_order_menu_cart_status ON order_menu_system_customizations(cart_status);
CREATE INDEX idx_order_menu_items_customization ON order_menu_items(customization_id);

-- Enable RLS
ALTER TABLE order_menu_system_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_menu_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own order menu data" ON order_menu_system_customizations
    FOR ALL USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can manage their own menu items" ON order_menu_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM order_menu_system_customizations omc 
            WHERE omc.id = customization_id 
            AND (omc.user_id = auth.uid() OR omc.user_email = auth.jwt() ->> 'email')
        )
    );

-- Insert test data
INSERT INTO order_menu_system_customizations (
    user_email,
    project_name,
    contact_person,
    restaurant_name,
    owner_name,
    restaurant_address,
    contact_email,
    contact_phone,
    additional_requirements
) VALUES (
    'test@example.com',
    'My Restaurant Order System',
    'John Smith',
    'Sample Restaurant',
    'John Doe',
    '123 Main Street, City, State 12345',
    'test@example.com',
    '+1234567890',
    'Need QR code integration and real-time order tracking'
);

-- Insert sample menu items
INSERT INTO order_menu_items (customization_id, item_name, price, quantity_available, item_category)
SELECT 
    omc.id,
    item_data.item_name,
    item_data.price,
    item_data.quantity_available,
    item_data.item_category
FROM order_menu_system_customizations omc
CROSS JOIN (
    VALUES 
        ('Margherita Pizza', 299.00, 50, 'Pizza'),
        ('Chicken Burger', 199.00, 30, 'Burgers'),
        ('Caesar Salad', 149.00, 25, 'Salads'),
        ('Chocolate Cake', 99.00, 15, 'Desserts')
) AS item_data(item_name, price, quantity_available, item_category)
WHERE omc.user_email = 'test@example.com';

-- Success message
SELECT 'Order Menu System tables created successfully!' as status;
