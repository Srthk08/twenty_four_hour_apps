-- Create cart_customizations table for storing cart customization data
-- This table stores all the form data from the cart customization process

CREATE TABLE IF NOT EXISTS cart_customizations (
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
    
    -- Customization details
    custom_name VARCHAR(255),
    restaurant_name_customization VARCHAR(255),
    selected_color VARCHAR(7) DEFAULT '#3B82F6',
    selected_features JSONB DEFAULT '[]',
    
    -- Project requirements
    project_name VARCHAR(255),
    contact_person VARCHAR(255),
    restaurant_name VARCHAR(255),
    cuisine_type VARCHAR(100),
    app_name VARCHAR(255),
    product_description_custom TEXT,
    
    -- Contact information
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    
    -- Brand colors
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#000000',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    
    -- File uploads (storing file paths/URLs)
    restaurant_logo_url TEXT,
    restaurant_logo_filename VARCHAR(255),
    restaurant_logo_size INTEGER,
    restaurant_logo_type VARCHAR(100),
    
    menu_photos_urls JSONB DEFAULT '[]', -- Array of photo URLs
    menu_photos_filenames JSONB DEFAULT '[]', -- Array of filenames
    menu_photos_sizes JSONB DEFAULT '[]', -- Array of file sizes
    menu_photos_types JSONB DEFAULT '[]', -- Array of file types
    
    -- Additional requirements
    additional_requirements TEXT,
    
    -- Cart status
    cart_status VARCHAR(20) DEFAULT 'active' CHECK (cart_status IN ('active', 'completed', 'cancelled', 'expired')),
    is_checkout_initiated BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_customizations_user_email ON cart_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_product_id ON cart_customizations(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_cart_status ON cart_customizations(cart_status);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_created_at ON cart_customizations(created_at);

-- Create unique constraint to prevent duplicate active carts for same user and product
CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_customizations_unique_active 
ON cart_customizations(user_email, product_id) 
WHERE cart_status = 'active';

-- Enable Row Level Security (RLS)
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Policy 1: Users can view their own cart customizations
CREATE POLICY "Users can view own cart customizations" ON cart_customizations
    FOR SELECT USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Policy 2: Users can insert their own cart customizations
CREATE POLICY "Users can insert own cart customizations" ON cart_customizations
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Policy 3: Users can update their own cart customizations
CREATE POLICY "Users can update own cart customizations" ON cart_customizations
    FOR UPDATE USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Policy 4: Users can delete their own cart customizations
CREATE POLICY "Users can delete own cart customizations" ON cart_customizations
    FOR DELETE USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Policy 5: Admins can view all cart customizations (assuming admin role exists)
CREATE POLICY "Admins can view all cart customizations" ON cart_customizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cart_customizations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_cart_customizations_updated_at 
  BEFORE UPDATE ON cart_customizations 
  FOR EACH ROW 
    EXECUTE FUNCTION update_cart_customizations_updated_at();

-- Create function to handle file uploads (optional - for future use)
CREATE OR REPLACE FUNCTION add_menu_photo_to_cart(
    cart_id UUID,
    photo_url TEXT,
    filename VARCHAR(255),
    file_size INTEGER,
    file_type VARCHAR(100)
)
RETURNS VOID AS $$
BEGIN
    UPDATE cart_customizations 
    SET 
        menu_photos_urls = COALESCE(menu_photos_urls, '[]'::jsonb) || to_jsonb(ARRAY[photo_url]),
        menu_photos_filenames = COALESCE(menu_photos_filenames, '[]'::jsonb) || to_jsonb(ARRAY[filename]),
        menu_photos_sizes = COALESCE(menu_photos_sizes, '[]'::jsonb) || to_jsonb(ARRAY[file_size]),
        menu_photos_types = COALESCE(menu_photos_types, '[]'::jsonb) || to_jsonb(ARRAY[file_type]),
        updated_at = NOW()
    WHERE id = cart_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to remove menu photo from cart
CREATE OR REPLACE FUNCTION remove_menu_photo_from_cart(
    cart_id UUID,
    photo_index INTEGER
)
RETURNS VOID AS $$
DECLARE
    current_urls JSONB;
    current_filenames JSONB;
    current_sizes JSONB;
    current_types JSONB;
BEGIN
    SELECT menu_photos_urls, menu_photos_filenames, menu_photos_sizes, menu_photos_types
    INTO current_urls, current_filenames, current_sizes, current_types
    FROM cart_customizations WHERE id = cart_id;
    
    -- Remove the photo at the specified index
    current_urls := current_urls - photo_index;
    current_filenames := current_filenames - photo_index;
    current_sizes := current_sizes - photo_index;
    current_types := current_types - photo_index;
    
    UPDATE cart_customizations 
    SET 
        menu_photos_urls = current_urls,
        menu_photos_filenames = current_filenames,
        menu_photos_sizes = current_sizes,
        menu_photos_types = current_types,
        updated_at = NOW()
    WHERE id = cart_id;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data for testing (optional)
INSERT INTO cart_customizations (
    user_email,
    product_id,
    product_name,
    product_description,
    base_price,
    total_amount,
    project_name,
    contact_person,
    restaurant_name,
    cuisine_type,
    app_name,
    contact_email,
    contact_phone,
    primary_color,
    secondary_color,
    accent_color,
    text_color,
    additional_requirements,
    cart_status
) VALUES (
    'test@example.com',
    '1',
    'Restaurant Menu System',
    'Digital menu system with QR code ordering, real-time updates, and analytics dashboard.',
    25000.00,
    29500.00,
    'My Restaurant App',
    'John Doe',
    'Pizza Palace',
    'italian',
    'Pizza Palace App',
    'test@example.com',
    '+1234567890',
    '#FF6B35',
    '#2C3E50',
    '#F39C12',
    '#FFFFFF',
    'Need online ordering and payment integration',
    'active'
) ON CONFLICT (user_email, product_id) WHERE cart_status = 'active' DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON cart_customizations TO service_role;

-- Create view for admin dashboard (optional)
CREATE OR REPLACE VIEW cart_customizations_admin AS
SELECT 
    cc.*,
    p.full_name as user_full_name,
    p.phone as user_phone,
    p.company_name as user_company
FROM cart_customizations cc
LEFT JOIN profiles p ON cc.user_id = p.id
ORDER BY cc.created_at DESC;

-- Grant permissions on the view
GRANT SELECT ON cart_customizations_admin TO authenticated;
GRANT SELECT ON cart_customizations_admin TO service_role;

-- Add comments for documentation
COMMENT ON TABLE cart_customizations IS 'Stores cart customization data from the project requirements form';
COMMENT ON COLUMN cart_customizations.restaurant_logo_url IS 'URL/path to uploaded restaurant logo file';
COMMENT ON COLUMN cart_customizations.menu_photos_urls IS 'JSON array of URLs/paths to uploaded menu photo files';
COMMENT ON COLUMN cart_customizations.selected_features IS 'JSON array of selected product features';
COMMENT ON COLUMN cart_customizations.cart_status IS 'Status of the cart: active, completed, cancelled, or expired';