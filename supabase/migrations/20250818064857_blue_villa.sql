/*
  # Complete 24-Hour Development Platform Schema

  1. New Tables
    - `profiles` - User profile information with role-based access
    - `products` - Service offerings (Restaurant Menu, Android TV, etc.)
    - `product_plans` - Different pricing tiers for each product
    - `cart_items` - Shopping cart functionality
    - `orders` - Order management and tracking
    - `order_items` - Individual items within orders
    - `project_details` - Product-specific project information
    - `payments` - Payment transaction records

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for authenticated users
    - Separate admin and customer access levels

  3. Features
    - Complete e-commerce functionality
    - Product-specific data collection
    - Order tracking and management
    - Payment integration support
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  company_name text,
  role text DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  category text NOT NULL CHECK (category IN ('restaurant', 'mobile', 'tv', 'web')),
  base_price decimal(10,2) NOT NULL DEFAULT 0,
  featured_image text,
  gallery jsonb DEFAULT '[]',
  features jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product plans/pricing tiers
CREATE TABLE IF NOT EXISTS product_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  features jsonb DEFAULT '[]',
  delivery_days integer DEFAULT 1,
  is_popular boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Shopping cart
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES product_plans(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  custom_requirements jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id, plan_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  total_amount decimal(10,2) NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  plan_id uuid REFERENCES product_plans(id),
  quantity integer DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  custom_requirements jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Project details for different product types
CREATE TABLE IF NOT EXISTS project_details (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id uuid REFERENCES order_items(id) ON DELETE CASCADE,
  project_type text NOT NULL CHECK (project_type IN ('restaurant_menu', 'restaurant_website', 'android_tv', 'streaming_app')),
  
  -- Common fields
  project_name text NOT NULL,
  logo_url text,
  brand_colors jsonb DEFAULT '[]',
  
  -- Restaurant specific
  restaurant_name text,
  cuisine_type text,
  menu_categories jsonb DEFAULT '[]',
  contact_info jsonb DEFAULT '{}',
  
  -- App specific
  app_name text,
  app_description text,
  target_audience text,
  preferred_features jsonb DEFAULT '[]',
  
  -- Streaming specific
  content_types jsonb DEFAULT '[]',
  monetization_model text,
  
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'in_development', 'completed')),
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  payment_id text UNIQUE, -- Razorpay payment ID
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'INR',
  status text DEFAULT 'created' CHECK (status IN ('created', 'authorized', 'captured', 'refunded', 'failed')),
  payment_method text,
  gateway_response jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON products FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Product plans policies
CREATE POLICY "Anyone can view product plans" ON product_plans FOR SELECT USING (true);
CREATE POLICY "Admins can manage product plans" ON product_plans FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Cart policies
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Order items policies
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create order items" ON order_items FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);

-- Project details policies
CREATE POLICY "Users can manage own project details" ON project_details FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM order_items oi 
    JOIN orders o ON oi.order_id = o.id 
    WHERE oi.id = order_item_id AND o.user_id = auth.uid()
  )
);

-- Payments policies
CREATE POLICY "Users can view own payments" ON payments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create payments" ON payments FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, category, base_price, featured_image, features) VALUES
(
  'Restaurant Menu System',
  'restaurant-menu-system',
  'Complete digital menu solution with QR code integration, online ordering, and real-time updates. Perfect for modern restaurants looking to enhance customer experience.',
  'Digital menu with QR codes and online ordering',
  'restaurant',
  15000.00,
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400/880687216188351.677c1628ee128.png',
  '["QR Code Integration", "Online Ordering", "Real-time Updates", "Multi-language Support", "Analytics Dashboard"]'
),
(
  'Android TV App Development',
  'android-tv-app',
  'Custom Android TV applications built for streaming, entertainment, and business needs. Optimized for big screen experience with intuitive navigation.',
  'Custom Android TV apps for streaming and entertainment',
  'tv',
  45000.00,
  'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg',
  '["Custom UI/UX", "Remote Control Navigation", "Content Management", "Analytics Integration", "Play Store Publishing"]'
),
(
  'Streaming Mobile App',
  'streaming-mobile-app',
  'Professional streaming applications for iOS and Android with advanced features like live streaming, video on demand, and monetization options.',
  'Professional streaming apps for iOS and Android',
  'mobile',
  55000.00,
  'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
  '["Live Streaming", "Video on Demand", "User Authentication", "Payment Integration", "Push Notifications"]'
),
(
  'Restaurant Website',
  'restaurant-website',
  'Beautiful, responsive restaurant websites with online reservation system, menu showcase, and social media integration. SEO optimized for local search.',
  'Professional restaurant websites with reservations',
  'web',
  25000.00,
  'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
  '["Responsive Design", "Online Reservations", "Menu Showcase", "SEO Optimization", "Social Media Integration"]'
),
(
  'Order Menu System',
  'order-menu-system',
  'Complete order management system with digital menu integration, real-time order tracking, and payment processing. Perfect for restaurants looking to streamline their ordering process.',
  'Complete order management system with digital menu integration',
  'restaurant',
  25000.00,
  'https://i.pinimg.com/736x/af/62/3c/af623c96836f449885d2fb2b1dcbac82.jpg',
  '["Order Management", "Digital Menu Integration", "Real-time Tracking", "Payment Processing", "Analytics Dashboard"]'
);

-- Insert sample plans for each product
INSERT INTO product_plans (product_id, name, description, price, features, delivery_days, is_popular) VALUES
-- Restaurant Menu System Plans
((SELECT id FROM products WHERE slug = 'restaurant-menu-system'), 'Basic', 'Essential digital menu features', 15000.00, '["QR Code Menu", "Basic Customization", "Mobile Responsive"]', 1, false),
((SELECT id FROM products WHERE slug = 'restaurant-menu-system'), 'Professional', 'Advanced menu with ordering', 25000.00, '["Everything in Basic", "Online Ordering", "Payment Integration", "Analytics"]', 1, true),
((SELECT id FROM products WHERE slug = 'restaurant-menu-system'), 'Enterprise', 'Complete restaurant solution', 40000.00, '["Everything in Professional", "Multi-location Support", "Advanced Analytics", "Custom Branding"]', 1, false),

-- Android TV App Plans
((SELECT id FROM products WHERE slug = 'android-tv-app'), 'Starter', 'Basic Android TV app', 45000.00, '["Custom Design", "Basic Navigation", "Content Display"]', 1, false),
((SELECT id FROM products WHERE slug = 'android-tv-app'), 'Professional', 'Advanced TV app with CMS', 65000.00, '["Everything in Starter", "Content Management", "User Accounts", "Analytics"]', 1, true),
((SELECT id FROM products WHERE slug = 'android-tv-app'), 'Premium', 'Enterprise TV solution', 85000.00, '["Everything in Professional", "Live Streaming", "Monetization", "Advanced Features"]', 1, false),

-- Streaming Mobile App Plans
((SELECT id FROM products WHERE slug = 'streaming-mobile-app'), 'Basic', 'Simple streaming app', 55000.00, '["iOS & Android", "Video Streaming", "User Registration"]', 1, false),
((SELECT id FROM products WHERE slug = 'streaming-mobile-app'), 'Advanced', 'Professional streaming platform', 75000.00, '["Everything in Basic", "Live Streaming", "Chat Features", "Monetization"]', 1, true),
((SELECT id FROM products WHERE slug = 'streaming-mobile-app'), 'Enterprise', 'Complete streaming solution', 95000.00, '["Everything in Advanced", "Admin Panel", "Analytics", "Custom Features"]', 1, false),

-- Restaurant Website Plans
((SELECT id FROM products WHERE slug = 'restaurant-website'), 'Essential', 'Basic restaurant website', 25000.00, '["Responsive Design", "Menu Display", "Contact Information"]', 1, false),
((SELECT id FROM products WHERE slug = 'restaurant-website'), 'Professional', 'Advanced restaurant site', 35000.00, '["Everything in Essential", "Online Reservations", "Gallery", "SEO Optimization"]', 1, true),
((SELECT id FROM products WHERE slug = 'restaurant-website'), 'Premium', 'Complete digital presence', 50000.00, '["Everything in Professional", "Online Ordering", "Blog", "Social Integration"]', 1, false),

-- Order Menu System Plans
((SELECT id FROM products WHERE slug = 'order-menu-system'), 'Basic', 'Essential order management features', 15000.00, '["Order Management", "Basic Menu Integration", "Mobile Responsive"]', 1, false),
((SELECT id FROM products WHERE slug = 'order-menu-system'), 'Professional', 'Advanced order system with tracking', 25000.00, '["Everything in Basic", "Real-time Tracking", "Payment Integration", "Analytics"]', 1, true),
((SELECT id FROM products WHERE slug = 'order-menu-system'), 'Enterprise', 'Complete order management solution', 40000.00, '["Everything in Professional", "Multi-location Support", "Advanced Analytics", "Custom Branding"]', 1, false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_project_details_order_item_id ON project_details(order_item_id);

-- Create functions for order number generation
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();