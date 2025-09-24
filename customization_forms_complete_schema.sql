-- =====================================================
-- COMPLETE SUPABASE SCHEMA FOR CUSTOMIZATION FORMS
-- =====================================================
-- This schema stores customization form data for all 4 products:
-- 1. Restaurant Website
-- 2. Streaming Mobile App  
-- 3. Android TV App
-- 4. Restaurant Menu System (Order Menu System)
-- =====================================================

-- Drop existing table and related objects if they exist
DROP TABLE IF EXISTS customization_forms CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create the main table with all required fields
CREATE TABLE customization_forms (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Product Information (Auto-fetched when user selects)
    product_type TEXT NOT NULL CHECK (product_type IN ('restaurant-website', 'streaming-mobile-app', 'android-tv-app', 'restaurant-menu-system')),
    product_name TEXT NOT NULL,
    product_price TEXT NOT NULL,
    
    -- 1. Project Name (Required)
    project_name TEXT NOT NULL,
    
    -- 2. Contact Person (Required)
    contact_person TEXT NOT NULL,
    
    -- 3. App Name (Required)
    app_name TEXT NOT NULL,
    
    -- 4. Product Description (Optional)
    product_description TEXT,
    
    -- 5. Restaurant Name (Required for restaurant products)
    restaurant_name TEXT,
    
    -- 6. Cuisine Type (Required for restaurant products)
    cuisine_type TEXT,
    
    -- 7. Upload Logo (File upload fields)
    logo_url TEXT,           -- URL to uploaded logo file
    logo_filename TEXT,      -- Original filename
    logo_mime_type TEXT,     -- MIME type (image/png, image/jpeg, image/svg+xml)
    logo_size INTEGER,       -- File size in bytes
    logo_uploaded_at TIMESTAMP WITH TIME ZONE, -- When logo was uploaded
    
    -- 8. Contact Information
    -- 8.1. Email (Required)
    contact_email TEXT NOT NULL,
    -- 8.2. Phone Number (Required)
    contact_phone TEXT NOT NULL,
    
    -- 9. Color Customization
    -- 9.1. Primary Color (Required)
    primary_color TEXT NOT NULL DEFAULT '#3B82F6',
    -- 9.2. Secondary Color (Optional)
    secondary_color TEXT DEFAULT '#10B981',
    -- 9.3. Accent Color (Optional)
    accent_color TEXT DEFAULT '#F59E0B',
    -- 9.4. Text Color (Optional)
    text_color TEXT DEFAULT '#1F2937',
    
    -- 10. Additional Requirements (Optional)
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
    
    -- Payment Information
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_id TEXT,
    payment_amount DECIMAL(10,2),
    payment_currency TEXT DEFAULT 'USD',
    
    -- Form Validation
    is_validated BOOLEAN DEFAULT false,
    validation_errors JSONB DEFAULT '[]',
    
    -- Unique constraint to prevent exact duplicates
    -- Same email + product_type + product_name + product_price combination should not exist twice
    UNIQUE(contact_email, product_type, product_name, product_price)
);

-- Create indexes for better performance
CREATE INDEX idx_customization_forms_email ON customization_forms(contact_email);
CREATE INDEX idx_customization_forms_product_type ON customization_forms(product_type);
CREATE INDEX idx_customization_forms_product_name ON customization_forms(product_name);
CREATE INDEX idx_customization_forms_user_id ON customization_forms(user_id);
CREATE INDEX idx_customization_forms_status ON customization_forms(status);
CREATE INDEX idx_customization_forms_payment_status ON customization_forms(payment_status);
CREATE INDEX idx_customization_forms_created_at ON customization_forms(created_at);
CREATE INDEX idx_customization_forms_restaurant_name ON customization_forms(restaurant_name) WHERE restaurant_name IS NOT NULL;
CREATE INDEX idx_customization_forms_cuisine_type ON customization_forms(cuisine_type) WHERE cuisine_type IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE customization_forms ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (Permissive for testing - can be made more restrictive later)
DO $$ BEGIN
  -- Allow all operations for authenticated users
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'allow_all_for_authenticated') THEN
    CREATE POLICY allow_all_for_authenticated ON customization_forms 
    FOR ALL USING (true) WITH CHECK (true);
  END IF;
  
  -- Allow public access for form submissions (unauthenticated users)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'allow_public_insert') THEN
    CREATE POLICY allow_public_insert ON customization_forms 
    FOR INSERT WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'allow_public_select') THEN
    CREATE POLICY allow_public_select ON customization_forms 
    FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'allow_public_update') THEN
    CREATE POLICY allow_public_update ON customization_forms 
    FOR UPDATE USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_customization_forms_updated_at 
    BEFORE UPDATE ON customization_forms 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to validate required fields based on product type
CREATE OR REPLACE FUNCTION validate_customization_form()
RETURNS TRIGGER AS $$
DECLARE
    validation_errors TEXT[] := '{}';
BEGIN
    -- Clear previous validation errors
    NEW.validation_errors := '[]';
    
    -- Basic required fields for all products
    IF NEW.project_name IS NULL OR TRIM(NEW.project_name) = '' THEN
        validation_errors := array_append(validation_errors, 'Project name is required');
    END IF;
    
    IF NEW.contact_person IS NULL OR TRIM(NEW.contact_person) = '' THEN
        validation_errors := array_append(validation_errors, 'Contact person is required');
    END IF;
    
    IF NEW.app_name IS NULL OR TRIM(NEW.app_name) = '' THEN
        validation_errors := array_append(validation_errors, 'App name is required');
    END IF;
    
    IF NEW.contact_email IS NULL OR TRIM(NEW.contact_email) = '' THEN
        validation_errors := array_append(validation_errors, 'Contact email is required');
    END IF;
    
    IF NEW.contact_phone IS NULL OR TRIM(NEW.contact_phone) = '' THEN
        validation_errors := array_append(validation_errors, 'Contact phone is required');
    END IF;
    
    -- Restaurant-specific validation
    IF NEW.product_type IN ('restaurant-website', 'restaurant-menu-system') THEN
        IF NEW.restaurant_name IS NULL OR TRIM(NEW.restaurant_name) = '' THEN
            validation_errors := array_append(validation_errors, 'Restaurant name is required for restaurant products');
        END IF;
        
        IF NEW.cuisine_type IS NULL OR TRIM(NEW.cuisine_type) = '' THEN
            validation_errors := array_append(validation_errors, 'Cuisine type is required for restaurant products');
        END IF;
    END IF;
    
    -- Set validation status
    IF array_length(validation_errors, 1) > 0 THEN
        NEW.is_validated := false;
        NEW.validation_errors := to_jsonb(validation_errors);
    ELSE
        NEW.is_validated := true;
        NEW.validation_errors := '[]';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for validation
CREATE TRIGGER validate_customization_form_trigger
    BEFORE INSERT OR UPDATE ON customization_forms
    FOR EACH ROW EXECUTE FUNCTION validate_customization_form();

-- Create function to handle upsert (insert or update) based on unique constraint
CREATE OR REPLACE FUNCTION upsert_customization_form(
    p_contact_email TEXT,
    p_product_type TEXT,
    p_product_name TEXT,
    p_product_price TEXT,
    p_project_name TEXT,
    p_contact_person TEXT,
    p_app_name TEXT,
    p_product_description TEXT DEFAULT NULL,
    p_restaurant_name TEXT DEFAULT NULL,
    p_cuisine_type TEXT DEFAULT NULL,
    p_logo_url TEXT DEFAULT NULL,
    p_logo_filename TEXT DEFAULT NULL,
    p_logo_mime_type TEXT DEFAULT NULL,
    p_logo_size INTEGER DEFAULT NULL,
    p_contact_phone TEXT DEFAULT NULL,
    p_primary_color TEXT DEFAULT '#3B82F6',
    p_secondary_color TEXT DEFAULT '#10B981',
    p_accent_color TEXT DEFAULT '#F59E0B',
    p_text_color TEXT DEFAULT '#1F2937',
    p_additional_requirements TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_menu_items JSONB DEFAULT '[]',
    p_restaurant_address TEXT DEFAULT NULL,
    p_owner_name TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    result_id UUID;
BEGIN
    INSERT INTO customization_forms (
        contact_email, product_type, product_name, product_price,
        project_name, contact_person, app_name, product_description,
        restaurant_name, cuisine_type, logo_url, logo_filename, logo_mime_type, logo_size,
        contact_phone, primary_color, secondary_color, accent_color, text_color,
        additional_requirements, user_id, menu_items, restaurant_address, owner_name
    ) VALUES (
        p_contact_email, p_product_type, p_product_name, p_product_price,
        p_project_name, p_contact_person, p_app_name, p_product_description,
        p_restaurant_name, p_cuisine_type, p_logo_url, p_logo_filename, p_logo_mime_type, p_logo_size,
        p_contact_phone, p_primary_color, p_secondary_color, p_accent_color, p_text_color,
        p_additional_requirements, p_user_id, p_menu_items, p_restaurant_address, p_owner_name
    )
    ON CONFLICT (contact_email, product_type, product_name, product_price)
    DO UPDATE SET
        project_name = EXCLUDED.project_name,
        contact_person = EXCLUDED.contact_person,
        app_name = EXCLUDED.app_name,
        product_description = EXCLUDED.product_description,
        restaurant_name = EXCLUDED.restaurant_name,
        cuisine_type = EXCLUDED.cuisine_type,
        logo_url = EXCLUDED.logo_url,
        logo_filename = EXCLUDED.logo_filename,
        logo_mime_type = EXCLUDED.logo_mime_type,
        logo_size = EXCLUDED.logo_size,
        contact_phone = EXCLUDED.contact_phone,
        primary_color = EXCLUDED.primary_color,
        secondary_color = EXCLUDED.secondary_color,
        accent_color = EXCLUDED.accent_color,
        text_color = EXCLUDED.text_color,
        additional_requirements = EXCLUDED.additional_requirements,
        user_id = EXCLUDED.user_id,
        menu_items = EXCLUDED.menu_items,
        restaurant_address = EXCLUDED.restaurant_address,
        owner_name = EXCLUDED.owner_name,
        updated_at = now()
    RETURNING id INTO result_id;
    
    RETURN result_id;
END;
$$ language 'plpgsql';

-- Create view for easy querying
CREATE OR REPLACE VIEW customization_forms_view AS
SELECT 
    id,
    created_at,
    updated_at,
    product_type,
    product_name,
    product_price,
    project_name,
    contact_person,
    app_name,
    product_description,
    restaurant_name,
    cuisine_type,
    logo_url,
    logo_filename,
    contact_email,
    contact_phone,
    primary_color,
    secondary_color,
    accent_color,
    text_color,
    additional_requirements,
    status,
    payment_status,
    is_validated,
    validation_errors,
    CASE 
        WHEN product_type = 'restaurant-website' THEN 'Restaurant Website'
        WHEN product_type = 'streaming-mobile-app' THEN 'Streaming Mobile App'
        WHEN product_type = 'android-tv-app' THEN 'Android TV App'
        WHEN product_type = 'restaurant-menu-system' THEN 'Restaurant Menu System'
        ELSE product_type
    END as product_display_name
FROM customization_forms
ORDER BY created_at DESC;

-- Insert sample data for testing (optional)
-- INSERT INTO customization_forms (
--     product_type, product_name, product_price,
--     project_name, contact_person, app_name,
--     contact_email, contact_phone,
--     restaurant_name, cuisine_type,
--     primary_color, secondary_color, accent_color, text_color
-- ) VALUES (
--     'restaurant-website', 'Restaurant Website', '$299',
--     'My Restaurant Project', 'John Doe', 'MyRestaurantApp',
--     'john@example.com', '+1234567890',
--     'Pizza Palace', 'Italian',
--     '#3B82F6', '#10B981', '#F59E0B', '#1F2937'
-- );

-- Verify table creation and show structure
SELECT 'customization_forms table created successfully' as status;

-- Show table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'customization_forms' 
ORDER BY ordinal_position;
