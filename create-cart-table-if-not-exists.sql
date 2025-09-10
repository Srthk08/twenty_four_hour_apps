-- Create cart_customizations table if it doesn't exist
-- This is a safe version that won't break if the table already exists

-- Check if table exists first
DO $$
BEGIN
    -- Only create the table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cart_customizations' AND table_schema = 'public') THEN
        -- Create the cart_customizations table
        CREATE TABLE cart_customizations (
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
            
            -- Project Requirements (from form)
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
            
            -- File uploads - Menu Photos (multiple images)
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

        -- Create indexes for better performance
        CREATE INDEX idx_cart_user_email ON cart_customizations(user_email);
        CREATE INDEX idx_cart_product_id ON cart_customizations(product_id);
        CREATE INDEX idx_cart_status ON cart_customizations(cart_status);
        CREATE INDEX idx_cart_created_at ON cart_customizations(created_at);

        -- Create UNIQUE constraint to prevent duplicates at database level
        CREATE UNIQUE INDEX idx_cart_unique_user_product 
        ON cart_customizations(user_email, product_id) 
        WHERE cart_status = 'active';

        -- Enable Row Level Security (RLS)
        ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;

        -- Create RLS policies
        CREATE POLICY "Anyone can insert cart customizations" ON cart_customizations
            FOR INSERT WITH CHECK (true);

        CREATE POLICY "Users can view own cart customizations" ON cart_customizations
            FOR SELECT USING (
                user_email = auth.jwt() ->> 'email' OR 
                user_id = auth.uid() OR 
                user_id IS NULL
            );

        CREATE POLICY "Admins can view all cart customizations" ON cart_customizations
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM profiles 
                    WHERE profiles.id = auth.uid() 
                    AND profiles.role IN ('admin', 'developer', 'support')
                )
            );

        CREATE POLICY "Users can update own cart customizations" ON cart_customizations
            FOR UPDATE USING (
                user_email = auth.jwt() ->> 'email' OR 
                user_id = auth.uid()
            );

        CREATE POLICY "Admins can update all cart customizations" ON cart_customizations
            FOR UPDATE USING (
                EXISTS (
                    SELECT 1 FROM profiles 
                    WHERE profiles.id = auth.uid() 
                    AND profiles.role IN ('admin', 'developer', 'support')
                )
            );

        CREATE POLICY "Users can delete own cart customizations" ON cart_customizations
            FOR DELETE USING (
                user_email = auth.jwt() ->> 'email' OR 
                user_id = auth.uid()
            );

        CREATE POLICY "Admins can delete all cart customizations" ON cart_customizations
            FOR DELETE USING (
                EXISTS (
                    SELECT 1 FROM profiles 
                    WHERE profiles.id = auth.uid() 
                    AND profiles.role IN ('admin', 'developer', 'support')
                )
            );

        -- Create trigger to update updated_at timestamp
        CREATE OR REPLACE FUNCTION update_cart_customizations_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER update_cart_customizations_updated_at
            BEFORE UPDATE ON cart_customizations
            FOR EACH ROW
            EXECUTE FUNCTION update_cart_customizations_updated_at();

        -- Grant permissions
        GRANT ALL ON cart_customizations TO authenticated;
        GRANT ALL ON cart_customizations TO service_role;
        GRANT ALL ON cart_customizations TO anon;

        RAISE NOTICE 'cart_customizations table created successfully';
    ELSE
        RAISE NOTICE 'cart_customizations table already exists';
    END IF;
END $$;

-- Verify table was created
SELECT 
    'Table verification' as status,
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_name = 'cart_customizations'
AND table_schema = 'public';

-- Check table structure
SELECT 
    'Table structure' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cart_customizations'
AND table_schema = 'public'
ORDER BY ordinal_position;
