-- Missing Tables Recovery Script
-- This recreates only the tables that were deleted, without touching existing OMS tables
-- Run this in Supabase SQL Editor

-- 1. Create profiles table (user profiles) - if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    company_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'customer',
    status VARCHAR(50) DEFAULT 'active',
    username VARCHAR(100),
    avatar_url VARCHAR(500),
    bio TEXT,
    website VARCHAR(255),
    location VARCHAR(255),
    timezone VARCHAR(100),
    language VARCHAR(10),
    last_login_at TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    admin_level VARCHAR(50),
    admin_permissions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create contact_submissions table (contact form data) - if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    priority VARCHAR(20) DEFAULT 'medium',
    assigned_to UUID REFERENCES profiles(id),
    response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create support_tickets table - if it doesn't exist
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open',
    priority VARCHAR(20) DEFAULT 'medium',
    category VARCHAR(100),
    assigned_to UUID REFERENCES profiles(id),
    resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create customization_forms table (main customization data) - if it doesn't exist
CREATE TABLE IF NOT EXISTS customization_forms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_id VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    project_name VARCHAR(255),
    app_name VARCHAR(255),
    restaurant_name VARCHAR(255),
    cuisine_type VARCHAR(100),
    contact_person VARCHAR(255),
    company_name VARCHAR(255),
    owner_name VARCHAR(255),
    restaurant_address TEXT,
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    logo_filename VARCHAR(255),
    logo_size INTEGER,
    app_icon_url VARCHAR(500),
    app_icon_filename VARCHAR(255),
    app_icon_size INTEGER,
    app_screenshots JSONB DEFAULT '[]'::jsonb,
    menu_photos JSONB DEFAULT '[]'::jsonb,
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    additional_requirements TEXT,
    cart_status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create cart_customizations table (shopping cart data) - if it doesn't exist
CREATE TABLE IF NOT EXISTS cart_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_id VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    customization_data JSONB NOT NULL,
    cart_status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_cart_item UNIQUE (user_email, product_id)
);

-- 6. Create orders table - if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(100),
    payment_id VARCHAR(255),
    billing_address JSONB,
    shipping_address JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create order_items table - if it doesn't exist
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    customization_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create products table - if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    product_type VARCHAR(100),
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create product_plans table - if it doesn't exist
CREATE TABLE IF NOT EXISTS product_plans (
    id VARCHAR(100) PRIMARY KEY,
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);

CREATE INDEX IF NOT EXISTS idx_customization_forms_user_email ON customization_forms(user_email);
CREATE INDEX IF NOT EXISTS idx_customization_forms_product_type ON customization_forms(product_type);
CREATE INDEX IF NOT EXISTS idx_customization_forms_created_at ON customization_forms(created_at);

CREATE INDEX IF NOT EXISTS idx_cart_customizations_user_email ON cart_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_cart_status ON cart_customizations(cart_status);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_created_at ON cart_customizations(created_at);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_product_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

CREATE INDEX IF NOT EXISTS idx_product_plans_product_id ON product_plans(product_id);
CREATE INDEX IF NOT EXISTS idx_product_plans_is_active ON product_plans(is_active);

-- 11. Create triggers for automatic timestamp updates (only if they don't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at columns (only if triggers don't exist)
DO $$
BEGIN
    -- Profiles trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_profiles_updated_at') THEN
        CREATE TRIGGER trigger_profiles_updated_at
            BEFORE UPDATE ON profiles
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Contact submissions trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_contact_submissions_updated_at') THEN
        CREATE TRIGGER trigger_contact_submissions_updated_at
            BEFORE UPDATE ON contact_submissions
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Support tickets trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_support_tickets_updated_at') THEN
        CREATE TRIGGER trigger_support_tickets_updated_at
            BEFORE UPDATE ON support_tickets
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Customization forms trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_customization_forms_updated_at') THEN
        CREATE TRIGGER trigger_customization_forms_updated_at
            BEFORE UPDATE ON customization_forms
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Cart customizations trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_cart_customizations_updated_at') THEN
        CREATE TRIGGER trigger_cart_customizations_updated_at
            BEFORE UPDATE ON cart_customizations
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Orders trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_orders_updated_at') THEN
        CREATE TRIGGER trigger_orders_updated_at
            BEFORE UPDATE ON orders
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Products trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_products_updated_at') THEN
        CREATE TRIGGER trigger_products_updated_at
            BEFORE UPDATE ON products
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Product plans trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_product_plans_updated_at') THEN
        CREATE TRIGGER trigger_product_plans_updated_at
            BEFORE UPDATE ON product_plans
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- 12. Grant permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON support_tickets TO authenticated;
GRANT ALL ON customization_forms TO authenticated;
GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON orders TO authenticated;
GRANT ALL ON order_items TO authenticated;
GRANT ALL ON products TO authenticated;
GRANT ALL ON product_plans TO authenticated;

-- 13. Insert sample data for testing (only if products table is empty)
INSERT INTO products (id, name, description, base_price, category, product_type, features) 
SELECT * FROM (VALUES
('1', 'Restaurant Menu System', 'Digital menu system with QR code integration', 25000.00, 'restaurant', 'restaurant', '["QR Code Integration", "Online Ordering", "Real-time Updates"]'::jsonb),
('2', 'Android TV App', 'Custom Android TV applications', 55000.00, 'entertainment', 'non-restaurant', '["Custom UI", "Content Management", "Remote Control"]'::jsonb),
('3', 'Streaming Mobile App', 'Mobile streaming applications', 35000.00, 'entertainment', 'non-restaurant', '["iOS & Android", "User Authentication", "Content Management"]'::jsonb),
('4', 'Restaurant Website', 'Professional restaurant website', 20000.00, 'restaurant', 'restaurant', '["Online Ordering", "Menu Display", "Customer Management"]'::jsonb),
('5', 'Order Menu System', 'Complete order management system', 999.00, 'restaurant', 'order-menu', '["Digital Menu", "Order Tracking", "Payment Processing"]'::jsonb)
) AS v(id, name, description, base_price, category, product_type, features)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = v.id);

-- 14. Create RLS (Row Level Security) policies (only if not already enabled)
DO $$
BEGIN
    -- Enable RLS on tables if not already enabled
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'profiles' AND relrowsecurity = true) THEN
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'contact_submissions' AND relrowsecurity = true) THEN
        ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'support_tickets' AND relrowsecurity = true) THEN
        ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'customization_forms' AND relrowsecurity = true) THEN
        ALTER TABLE customization_forms ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'cart_customizations' AND relrowsecurity = true) THEN
        ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'orders' AND relrowsecurity = true) THEN
        ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'order_items' AND relrowsecurity = true) THEN
        ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- 15. Create basic RLS policies (only if they don't exist)
DO $$
BEGIN
    -- Profiles policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
        CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
    END IF;

    -- Customization forms policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customization_forms' AND policyname = 'Users can view own customizations') THEN
        CREATE POLICY "Users can view own customizations" ON customization_forms FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customization_forms' AND policyname = 'Users can insert own customizations') THEN
        CREATE POLICY "Users can insert own customizations" ON customization_forms FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customization_forms' AND policyname = 'Users can update own customizations') THEN
        CREATE POLICY "Users can update own customizations" ON customization_forms FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    -- Cart customizations policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_customizations' AND policyname = 'Users can view own cart') THEN
        CREATE POLICY "Users can view own cart" ON cart_customizations FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_customizations' AND policyname = 'Users can insert own cart') THEN
        CREATE POLICY "Users can insert own cart" ON cart_customizations FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_customizations' AND policyname = 'Users can update own cart') THEN
        CREATE POLICY "Users can update own cart" ON cart_customizations FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    -- Orders policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Users can view own orders') THEN
        CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Users can insert own orders') THEN
        CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    -- Order items policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'order_items' AND policyname = 'Users can view own order items') THEN
        CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
            EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
        );
    END IF;
END $$;

-- 16. Create storage buckets for file uploads (only if they don't exist)
INSERT INTO storage.buckets (id, name, public) 
SELECT * FROM (VALUES
('logos', 'logos', true),
('menu-photos', 'menu-photos', true),
('app-screenshots', 'app-screenshots', true)
) AS v(id, name, public)
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = v.id);

-- 17. Set up storage policies (only if they don't exist)
DO $$
BEGIN
    -- Logos bucket policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Anyone can view logos') THEN
        CREATE POLICY "Anyone can view logos" ON storage.objects FOR SELECT USING (bucket_id = 'logos');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can upload logos') THEN
        CREATE POLICY "Authenticated users can upload logos" ON storage.objects FOR INSERT WITH CHECK (
            bucket_id = 'logos' AND auth.role() = 'authenticated'
        );
    END IF;

    -- Menu photos bucket policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Anyone can view menu photos') THEN
        CREATE POLICY "Anyone can view menu photos" ON storage.objects FOR SELECT USING (bucket_id = 'menu-photos');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can upload menu photos') THEN
        CREATE POLICY "Authenticated users can upload menu photos" ON storage.objects FOR INSERT WITH CHECK (
            bucket_id = 'menu-photos' AND auth.role() = 'authenticated'
        );
    END IF;

    -- App screenshots bucket policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Anyone can view app screenshots') THEN
        CREATE POLICY "Anyone can view app screenshots" ON storage.objects FOR SELECT USING (bucket_id = 'app-screenshots');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can upload app screenshots') THEN
        CREATE POLICY "Authenticated users can upload app screenshots" ON storage.objects FOR INSERT WITH CHECK (
            bucket_id = 'app-screenshots' AND auth.role() = 'authenticated'
        );
    END IF;
END $$;

-- 18. Verify all tables were created
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
