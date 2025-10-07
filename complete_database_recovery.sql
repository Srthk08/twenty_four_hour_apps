-- Complete Database Recovery Script
-- This recreates ALL tables that were deleted by the DROP SCHEMA CASCADE command
-- Based on analysis of your application code

-- 1. Create profiles table (user profiles)
CREATE TABLE profiles (
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

-- 2. Create contact_submissions table (contact form data)
CREATE TABLE contact_submissions (
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

-- 3. Create support_tickets table
CREATE TABLE support_tickets (
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

-- 4. Create customization_forms table (main customization data)
CREATE TABLE customization_forms (
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

-- 5. Create cart_customizations table (shopping cart data)
CREATE TABLE cart_customizations (
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

-- 6. Create orders table
CREATE TABLE orders (
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

-- 7. Create order_items table
CREATE TABLE order_items (
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

-- 8. Create products table
CREATE TABLE products (
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

-- 9. Create product_plans table
CREATE TABLE product_plans (
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

-- 10. Create OMS customizations table (Order Menu System)
CREATE TABLE oms_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    restaurant_address VARCHAR(500) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    logo_filename VARCHAR(255),
    logo_size INTEGER,
    menu_categories JSONB DEFAULT '[]'::jsonb,
    menu_items JSONB DEFAULT '[]'::jsonb,
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    product_type VARCHAR(100) DEFAULT 'order-menu-system',
    product_name VARCHAR(255) DEFAULT 'Order Menu System',
    product_price DECIMAL(10,2) DEFAULT 999.00,
    additional_requirements VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_oms_customization UNIQUE (user_email, project_name, restaurant_name)
);

-- 11. Create OMS product customizations table
CREATE TABLE oms_product_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    restaurant_address VARCHAR(500) NOT NULL,
    house_number VARCHAR(100),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100),
    logo_url VARCHAR(500),
    logo_filename VARCHAR(255),
    logo_size INTEGER,
    menu_categories JSONB DEFAULT '[]'::jsonb,
    menu_items JSONB DEFAULT '[]'::jsonb,
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    accent_color VARCHAR(7) DEFAULT '#F59E0B',
    text_color VARCHAR(7) DEFAULT '#1F2937',
    product_type VARCHAR(100) DEFAULT 'order-menu-system',
    product_name VARCHAR(255) DEFAULT 'Order Menu System',
    product_price DECIMAL(10,2) DEFAULT 999.00,
    additional_requirements VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_oms_product_customization UNIQUE (user_email, project_name, restaurant_name)
);

-- 12. Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);

CREATE INDEX idx_customization_forms_user_email ON customization_forms(user_email);
CREATE INDEX idx_customization_forms_product_type ON customization_forms(product_type);
CREATE INDEX idx_customization_forms_created_at ON customization_forms(created_at);

CREATE INDEX idx_cart_customizations_user_email ON cart_customizations(user_email);
CREATE INDEX idx_cart_customizations_cart_status ON cart_customizations(cart_status);
CREATE INDEX idx_cart_customizations_created_at ON cart_customizations(created_at);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_product_type ON products(product_type);
CREATE INDEX idx_products_is_active ON products(is_active);

CREATE INDEX idx_product_plans_product_id ON product_plans(product_id);
CREATE INDEX idx_product_plans_is_active ON product_plans(is_active);

CREATE INDEX idx_oms_customizations_user_email ON oms_customizations(user_email);
CREATE INDEX idx_oms_customizations_created_at ON oms_customizations(created_at);
CREATE INDEX idx_oms_customizations_status ON oms_customizations(status);

CREATE INDEX idx_oms_product_customizations_user_email ON oms_product_customizations(user_email);
CREATE INDEX idx_oms_product_customizations_created_at ON oms_product_customizations(created_at);
CREATE INDEX idx_oms_product_customizations_status ON oms_product_customizations(status);

-- 13. Create triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at columns
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_support_tickets_updated_at
    BEFORE UPDATE ON support_tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_customization_forms_updated_at
    BEFORE UPDATE ON customization_forms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_cart_customizations_updated_at
    BEFORE UPDATE ON cart_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_product_plans_updated_at
    BEFORE UPDATE ON product_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_oms_customizations_updated_at
    BEFORE UPDATE ON oms_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_oms_product_customizations_updated_at
    BEFORE UPDATE ON oms_product_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 14. Grant permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON support_tickets TO authenticated;
GRANT ALL ON customization_forms TO authenticated;
GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON orders TO authenticated;
GRANT ALL ON order_items TO authenticated;
GRANT ALL ON products TO authenticated;
GRANT ALL ON product_plans TO authenticated;
GRANT ALL ON oms_customizations TO authenticated;
GRANT ALL ON oms_product_customizations TO authenticated;

-- 15. Insert sample data for testing
INSERT INTO products (id, name, description, base_price, category, product_type, features) VALUES
('1', 'Restaurant Menu System', 'Digital menu system with QR code integration', 25000.00, 'restaurant', 'restaurant', '["QR Code Integration", "Online Ordering", "Real-time Updates"]'),
('2', 'Android TV App', 'Custom Android TV applications', 55000.00, 'entertainment', 'non-restaurant', '["Custom UI", "Content Management", "Remote Control"]'),
('3', 'Streaming Mobile App', 'Mobile streaming applications', 35000.00, 'entertainment', 'non-restaurant', '["iOS & Android", "User Authentication", "Content Management"]'),
('4', 'Restaurant Website', 'Professional restaurant website', 20000.00, 'restaurant', 'restaurant', '["Online Ordering", "Menu Display", "Customer Management"]'),
('5', 'Order Menu System', 'Complete order management system', 999.00, 'restaurant', 'order-menu', '["Digital Menu", "Order Tracking", "Payment Processing"]');

-- 16. Create RLS (Row Level Security) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE customization_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE oms_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE oms_product_customizations ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (users can only see their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own customizations" ON customization_forms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own customizations" ON customization_forms FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own customizations" ON customization_forms FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own cart" ON cart_customizations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart" ON cart_customizations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_customizations FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

CREATE POLICY "Users can view own OMS customizations" ON oms_customizations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own OMS customizations" ON oms_customizations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own OMS customizations" ON oms_customizations FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own OMS product customizations" ON oms_product_customizations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own OMS product customizations" ON oms_product_customizations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own OMS product customizations" ON oms_product_customizations FOR UPDATE USING (auth.uid() = user_id);

-- Admin policies (admin users can see all data)
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can view all contact submissions" ON contact_submissions FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can view all support tickets" ON support_tickets FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can view all customizations" ON customization_forms FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can view all OMS customizations" ON oms_customizations FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can view all OMS product customizations" ON oms_product_customizations FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 17. Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES
('logos', 'logos', true),
('menu-photos', 'menu-photos', true),
('app-screenshots', 'app-screenshots', true);

-- 18. Set up storage policies
CREATE POLICY "Anyone can view logos" ON storage.objects FOR SELECT USING (bucket_id = 'logos');
CREATE POLICY "Authenticated users can upload logos" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'logos' AND auth.role() = 'authenticated'
);
CREATE POLICY "Users can update own logos" ON storage.objects FOR UPDATE USING (
    bucket_id = 'logos' AND auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view menu photos" ON storage.objects FOR SELECT USING (bucket_id = 'menu-photos');
CREATE POLICY "Authenticated users can upload menu photos" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'menu-photos' AND auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view app screenshots" ON storage.objects FOR SELECT USING (bucket_id = 'app-screenshots');
CREATE POLICY "Authenticated users can upload app screenshots" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'app-screenshots' AND auth.role() = 'authenticated'
);

-- 19. Verify all tables were created
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
