-- =====================================================
-- SUPABASE DATABASE SCHEMA FOR CUSTOMIZATION FORMS
-- =====================================================
-- This schema stores customization form data for all 4 products:
-- 1. Restaurant Website
-- 2. Streaming Mobile App  
-- 3. Android TV App
-- 4. Restaurant Menu System (Order Menu System)
-- =====================================================

-- First, drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS project_customizations CASCADE;
DROP TABLE IF EXISTS order_menu_customizations CASCADE;
DROP TABLE IF EXISTS user_requirements CASCADE;
DROP TABLE IF EXISTS customization_forms CASCADE;

-- =====================================================
-- MAIN CUSTOMIZATION FORMS TABLE
-- =====================================================
-- This table stores all customization form data for all 4 products
-- with duplicate prevention based on email + product type combination

CREATE TABLE customization_forms (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Product Information
    product_type TEXT NOT NULL CHECK (product_type IN ('restaurant-website', 'streaming-mobile-app', 'android-tv-app', 'restaurant-menu-system')),
    product_name TEXT NOT NULL,
    product_price TEXT NOT NULL,
    
    -- Project Details (Required for all products)
    project_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    app_name TEXT NOT NULL,
    product_description TEXT,
    
    -- Restaurant-specific fields (for restaurant products)
    restaurant_name TEXT, -- Only for restaurant-website and restaurant-menu-system
    cuisine_type TEXT,    -- Only for restaurant-website and restaurant-menu-system
    
    -- Logo/Media Upload
    logo_url TEXT,        -- URL to uploaded logo file
    logo_filename TEXT,   -- Original filename
    logo_mime_type TEXT,  -- MIME type of uploaded file
    logo_size INTEGER,    -- File size in bytes
    
    -- Contact Information
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    
    -- Color Customization (JSONB for flexibility)
    color_customization JSONB DEFAULT '{}',
    -- Structure: {
    --   "primary_color": "#3B82F6",
    --   "secondary_color": "#10B981", 
    --   "accent_color": "#F59E0B",
    --   "text_color": "#1F2937"
    -- }
    
    -- Additional Requirements
    additional_requirements TEXT,
    
    -- User Information (if logged in)
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Order Menu System specific fields (JSONB for menu items)
    menu_items JSONB DEFAULT '[]',
    -- Structure: [
    --   {
    --     "item_name": "Margherita Pizza",
    --     "item_price": 299.00,
    --     "item_quantity": 50,
    --     "item_description": "Classic tomato and mozzarella"
    --   }
    -- ]
    
    -- Restaurant Address (for Order Menu System)
    restaurant_address TEXT,
    owner_name TEXT,
    
    -- Status and Processing
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    admin_notes TEXT,
    
    -- Unique constraint to prevent duplicates
    -- Same email + product_type combination should not exist twice
    UNIQUE(contact_email, product_type)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Index for faster lookups by email
CREATE INDEX idx_customization_forms_email ON customization_forms(contact_email);

-- Index for faster lookups by product type
CREATE INDEX idx_customization_forms_product_type ON customization_forms(product_type);

-- Index for faster lookups by user_id
CREATE INDEX idx_customization_forms_user_id ON customization_forms(user_id);

-- Index for faster lookups by status
CREATE INDEX idx_customization_forms_status ON customization_forms(status);

-- Index for faster lookups by created_at
CREATE INDEX idx_customization_forms_created_at ON customization_forms(created_at);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE customization_forms ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to insert their own forms
CREATE POLICY "Allow authenticated users to insert" ON customization_forms
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: Allow users to view their own forms
CREATE POLICY "Allow users to view their own data" ON customization_forms
FOR SELECT USING (auth.uid() = user_id);

-- Policy: Allow users to update their own forms
CREATE POLICY "Allow users to update their own data" ON customization_forms
FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Allow users to delete their own forms
CREATE POLICY "Allow users to delete their own data" ON customization_forms
FOR DELETE USING (auth.uid() = user_id);

-- Policy: Allow anonymous users to insert (for non-logged in users)
CREATE POLICY "Allow anonymous users to insert" ON customization_forms
FOR INSERT WITH CHECK (true);

-- Policy: Allow anonymous users to view their own forms by email
-- (This requires additional application logic to verify email ownership)
CREATE POLICY "Allow anonymous users to view by email" ON customization_forms
FOR SELECT USING (true);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_customization_forms_updated_at 
    BEFORE UPDATE ON customization_forms 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get customization forms by email
CREATE OR REPLACE FUNCTION get_customizations_by_email(user_email TEXT)
RETURNS TABLE (
    id UUID,
    product_type TEXT,
    product_name TEXT,
    project_name TEXT,
    contact_person TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cf.id,
        cf.product_type,
        cf.product_name,
        cf.project_name,
        cf.contact_person,
        cf.created_at,
        cf.status
    FROM customization_forms cf
    WHERE cf.contact_email = user_email
    ORDER BY cf.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if duplicate exists
CREATE OR REPLACE FUNCTION check_duplicate_customization(
    user_email TEXT,
    product_type TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM customization_forms 
        WHERE contact_email = user_email 
        AND product_type = product_type
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =====================================================

-- Insert sample data for testing (uncomment if needed)
/*
INSERT INTO customization_forms (
    product_type,
    product_name,
    product_price,
    project_name,
    contact_person,
    app_name,
    product_description,
    restaurant_name,
    cuisine_type,
    contact_email,
    contact_phone,
    color_customization,
    additional_requirements,
    status
) VALUES 
-- Restaurant Website Sample
(
    'restaurant-website',
    'Restaurant Website',
    '₹15,000',
    'My Awesome Restaurant Project',
    'Srthk',
    'AwesomeEatsApp',
    'We need a modern, user-friendly website with online ordering and reservation features.',
    'Awesome Eats',
    'Indian',
    'sarthak210426@gmail.com',
    '+918303160677',
    '{"primary_color": "#3B82F6", "secondary_color": "#10B981", "accent_color": "#F59E0B", "text_color": "#1F2937"}',
    'Integrate with a third-party delivery service API. Also, add a loyalty program section.',
    'pending'
),
-- Order Menu System Sample
(
    'restaurant-menu-system',
    'Order Menu System',
    '₹25,000',
    'Digital Menu Project',
    'John Doe',
    'RestaurantOrderApp',
    'Complete order management system with digital menu integration.',
    'Pizza Palace',
    'Italian',
    'john@example.com',
    '+1234567890',
    '{"primary_color": "#FF6B6B", "secondary_color": "#4ECDC4", "accent_color": "#45B7D1", "text_color": "#2C3E50"}',
    'Need real-time order tracking and payment integration.',
    'pending'
);
*/

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if table was created successfully
SELECT 'customization_forms table created successfully' as status;

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'customization_forms'
ORDER BY ordinal_position;

-- Check constraints
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'customization_forms';

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes 
WHERE tablename = 'customization_forms';

-- =====================================================
-- USAGE EXAMPLES
-- =====================================================

-- Example 1: Insert a new customization form
/*
INSERT INTO customization_forms (
    product_type,
    product_name,
    product_price,
    project_name,
    contact_person,
    app_name,
    product_description,
    restaurant_name,
    cuisine_type,
    contact_email,
    contact_phone,
    color_customization,
    additional_requirements
) VALUES (
    'restaurant-website',
    'Restaurant Website',
    '₹15,000',
    'My Restaurant Project',
    'John Doe',
    'MyRestaurantApp',
    'Need a modern restaurant website with online ordering.',
    'Johns Pizza',
    'Italian',
    'john@example.com',
    '+1234567890',
    '{"primary_color": "#3B82F6", "secondary_color": "#10B981", "accent_color": "#F59E0B", "text_color": "#1F2937"}',
    'Need delivery integration and online payment.'
);
*/

-- Example 2: Get all customizations for a user
-- SELECT * FROM get_customizations_by_email('john@example.com');

-- Example 3: Check for duplicates before inserting
-- SELECT check_duplicate_customization('john@example.com', 'restaurant-website');

-- Example 4: Update a customization form
/*
UPDATE customization_forms 
SET 
    project_name = 'Updated Project Name',
    additional_requirements = 'Updated requirements',
    updated_at = now()
WHERE id = 'your-uuid-here' AND user_id = auth.uid();
*/

-- Example 5: Get all customizations by product type
-- SELECT * FROM customization_forms WHERE product_type = 'restaurant-website';

-- Example 6: Get customizations with specific status
-- SELECT * FROM customization_forms WHERE status = 'pending';

-- =====================================================
-- END OF SCHEMA
-- =====================================================
