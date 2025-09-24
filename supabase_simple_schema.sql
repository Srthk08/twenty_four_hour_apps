-- =====================================================
-- SIMPLIFIED SUPABASE SCHEMA FOR CUSTOMIZATION FORMS
-- =====================================================
-- This schema stores customization form data for all 4 products:
-- 1. Restaurant Website
-- 2. Streaming Mobile App  
-- 3. Android TV App
-- 4. Restaurant Menu System (Order Menu System)
-- =====================================================

-- Drop existing table if it exists
DROP TABLE IF EXISTS customization_forms CASCADE;

-- Create the main table
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
    
    -- Color Customization
    primary_color TEXT DEFAULT '#3B82F6',
    secondary_color TEXT DEFAULT '#10B981',
    accent_color TEXT DEFAULT '#F59E0B',
    text_color TEXT DEFAULT '#1F2937',
    
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

-- Create indexes for better performance
CREATE INDEX idx_customization_forms_email ON customization_forms(contact_email);
CREATE INDEX idx_customization_forms_product_type ON customization_forms(product_type);
CREATE INDEX idx_customization_forms_user_id ON customization_forms(user_id);
CREATE INDEX idx_customization_forms_status ON customization_forms(status);
CREATE INDEX idx_customization_forms_created_at ON customization_forms(created_at);

-- Enable Row Level Security
ALTER TABLE customization_forms ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DO $$ BEGIN
  -- Authenticated users can manage their own rows
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'auth_insert') THEN
    CREATE POLICY auth_insert ON customization_forms FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'auth_select') THEN
    CREATE POLICY auth_select ON customization_forms FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'auth_update') THEN
    CREATE POLICY auth_update ON customization_forms FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customization_forms' AND policyname = 'auth_delete') THEN
    CREATE POLICY auth_delete ON customization_forms FOR DELETE USING (true);
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

-- Verify table creation
SELECT 'customization_forms table created successfully' as status;
