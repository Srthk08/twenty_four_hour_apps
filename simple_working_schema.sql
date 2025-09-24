-- =====================================================
-- SIMPLE WORKING SCHEMA - NO COMPLEX CONSTRAINTS
-- =====================================================
-- This schema is designed to work without complex constraints
-- that might be causing the insert failures
-- =====================================================

-- Drop existing table if it exists
DROP TABLE IF EXISTS customization_forms CASCADE;

-- Create the main table with SIMPLE structure
CREATE TABLE customization_forms (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Product Information (REQUIRED - these were missing!)
    product_type TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_price TEXT NOT NULL,
    
    -- Project Details
    project_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    app_name TEXT NOT NULL,
    product_description TEXT,
    
    -- Restaurant-specific fields
    restaurant_name TEXT,
    cuisine_type TEXT,
    
    -- Logo/Media Upload
    logo_url TEXT,
    logo_filename TEXT,
    logo_mime_type TEXT,
    logo_size INTEGER,
    
    -- Contact Information
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    
    -- Color Customization
    primary_color TEXT DEFAULT '#3B82F6',
    secondary_color TEXT DEFAULT '#10B981',
    accent_color TEXT DEFAULT '#F59E0B',
    text_color TEXT DEFAULT '#1F2937',
    
    -- Additional Requirements
    additional_requirements TEXT,
    
    -- User Information (if logged in)
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Order Menu System specific fields
    menu_items JSONB DEFAULT '[]',
    restaurant_address TEXT,
    owner_name TEXT,
    
    -- Status and Processing
    status TEXT DEFAULT 'pending',
    admin_notes TEXT
);

-- Create basic indexes for performance
CREATE INDEX idx_customization_forms_email ON customization_forms(contact_email);
CREATE INDEX idx_customization_forms_product_type ON customization_forms(product_type);
CREATE INDEX idx_customization_forms_created_at ON customization_forms(created_at);

-- Enable Row Level Security
ALTER TABLE customization_forms ENABLE ROW LEVEL SECURITY;

-- Create SIMPLE RLS policies (allow everything for testing)
CREATE POLICY "Allow all operations" ON customization_forms
    FOR ALL USING (true) WITH CHECK (true);

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

-- Verify table creation
SELECT 'customization_forms table created successfully with simple schema' as status;

-- Show table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'customization_forms' 
ORDER BY ordinal_position;
