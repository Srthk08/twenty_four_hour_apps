-- Quick fix for cart customizations table
-- Run this in Supabase SQL Editor

-- Step 1: Check if table exists
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cart_customizations' AND table_schema = 'public')
        THEN 'Table EXISTS'
        ELSE 'Table DOES NOT EXIST'
    END as table_status;

-- Step 2: If table doesn't exist, create it
CREATE TABLE IF NOT EXISTS cart_customizations (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- User identification
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Product information
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    
    -- Project Requirements
    project_name VARCHAR(255) NOT NULL,
    app_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    product_description_custom TEXT NOT NULL,
    
    -- Restaurant specific fields
    restaurant_name VARCHAR(255),
    cuisine_type VARCHAR(100),
    
    -- Contact Information
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    
    -- File uploads - Restaurant Logo
    restaurant_logo_url TEXT,
    restaurant_logo_filename VARCHAR(255),
    restaurant_logo_size INTEGER,
    restaurant_logo_type VARCHAR(100),
    restaurant_logo_hash VARCHAR(64),
    
    -- File uploads - Menu Photos
    menu_photos_urls JSONB DEFAULT '[]',
    menu_photos_filenames JSONB DEFAULT '[]',
    menu_photos_sizes JSONB DEFAULT '[]',
    menu_photos_types JSONB DEFAULT '[]',
    menu_photos_hashes JSONB DEFAULT '[]',
    
    -- Brand Colors
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#000000',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    
    -- Additional Requirements
    additional_requirements TEXT,
    
    -- Cart status and metadata
    cart_status VARCHAR(20) DEFAULT 'active' CHECK (cart_status IN ('active', 'completed', 'cancelled', 'expired')),
    is_checkout_initiated BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_cart_user_email ON cart_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart_customizations(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_status ON cart_customizations(cart_status);
CREATE INDEX IF NOT EXISTS idx_cart_created_at ON cart_customizations(created_at);

-- Step 4: Enable RLS
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies
DROP POLICY IF EXISTS "Anyone can insert cart customizations" ON cart_customizations;
CREATE POLICY "Anyone can insert cart customizations" ON cart_customizations
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own cart customizations" ON cart_customizations;
CREATE POLICY "Users can view own cart customizations" ON cart_customizations
    FOR SELECT USING (
        user_email = auth.jwt() ->> 'email' OR 
        user_id = auth.uid() OR 
        user_id IS NULL
    );

DROP POLICY IF EXISTS "Admins can view all cart customizations" ON cart_customizations;
CREATE POLICY "Admins can view all cart customizations" ON cart_customizations
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own cart customizations" ON cart_customizations;
CREATE POLICY "Users can update own cart customizations" ON cart_customizations
    FOR UPDATE USING (
        user_email = auth.jwt() ->> 'email' OR 
        user_id = auth.uid()
    );

DROP POLICY IF EXISTS "Admins can update all cart customizations" ON cart_customizations;
CREATE POLICY "Admins can update all cart customizations" ON cart_customizations
    FOR UPDATE USING (true);

-- Step 6: Grant permissions
GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON cart_customizations TO service_role;
GRANT ALL ON cart_customizations TO anon;

-- Step 7: Insert test data with different statuses
INSERT INTO cart_customizations (
    user_email, product_id, product_name, product_description, base_price, total_amount,
    project_name, app_name, contact_person, product_description_custom,
    restaurant_name, cuisine_type, contact_email, contact_phone,
    primary_color, secondary_color, accent_color, text_color,
    additional_requirements, cart_status
) VALUES 
-- Active order (not completed yet - should not count in revenue)
('test@example.com', '1', 'Restaurant Menu System', 'Digital menu system with QR code ordering',
 25000, 29500, 'Test Restaurant', 'Test App', 'Test User', 'Test project description',
 'Test Restaurant', 'italian', 'test@example.com', '+1234567890',
 '#3B82F6', '#000000', '#F59E0B', '#1F2937',
 'Test requirements', 'active'),

-- Completed order (should count in revenue)
('completed@example.com', '2', 'Android TV App', 'Smart TV application for streaming content',
 30000, 35400, 'Completed Project', 'TV App', 'Completed User', 'This order is completed',
 'Completed Restaurant', 'indian', 'completed@example.com', '+1234567891',
 '#FF6B6B', '#4ECDC4', '#45B7D1', '#2C3E50',
 'Completed requirements', 'completed'),

-- Another active order (not completed yet - should not count in revenue)
('pending@example.com', '3', 'Streaming Mobile App', 'Mobile app for content streaming',
 35000, 41300, 'Pending Project', 'Mobile App', 'Pending User', 'This order is pending',
 'Pending Restaurant', 'chinese', 'pending@example.com', '+1234567892',
 '#9B59B6', '#E74C3C', '#F39C12', '#34495E',
 'Pending requirements', 'active')

ON CONFLICT DO NOTHING;

-- Step 8: Verify table and data
SELECT 
    'Table verification' as status,
    COUNT(*) as total_records
FROM cart_customizations;

-- Step 9: Show sample data
SELECT 
    id, user_email, product_name, total_amount, created_at
FROM cart_customizations 
ORDER BY created_at DESC 
LIMIT 5;
