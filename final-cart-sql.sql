-- Final Cart Customizations SQL Script
-- This will create the table and allow data storage from cart page

-- Step 1: Clean up any existing objects
DROP VIEW IF EXISTS abandoned_carts_analysis CASCADE;
DROP VIEW IF EXISTS active_carts_view CASCADE;
DROP TABLE IF EXISTS cart_file_uploads CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS cart_customizations CASCADE;

-- Step 2: Create the main cart_customizations table
CREATE TABLE cart_customizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email text NOT NULL,
  product_id text NOT NULL,
  product_name text NOT NULL,
  product_description text,
  base_price decimal(10,2) NOT NULL DEFAULT 0,
  custom_name text DEFAULT '',
  selected_color text DEFAULT '#3B82F6',
  selected_features jsonb DEFAULT '[]',
  project_name text DEFAULT '',
  contact_person text DEFAULT '',
  restaurant_name text DEFAULT '',
  cuisine_type text DEFAULT '',
  app_name text DEFAULT '',
  contact_email text DEFAULT '',
  contact_phone text DEFAULT '',
  primary_color text DEFAULT '#3B82F6',
  secondary_color text DEFAULT '#A5CF6',
  accent_color text DEFAULT '#F59E0B',
  text_color text DEFAULT '#1F2937',
  additional_requirements text DEFAULT '',
  cart_status text DEFAULT 'active' CHECK (cart_status IN ('active', 'pending', 'completed', 'cancelled')),
  is_checkout_initiated boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 3: Enable Row Level Security
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policies for authenticated users
CREATE POLICY "Enable insert for authenticated users" ON cart_customizations
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable select for users based on email" ON cart_customizations
  FOR SELECT TO authenticated
  USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Enable update for users based on email" ON cart_customizations
  FOR UPDATE TO authenticated
  USING (user_email = auth.jwt() ->> 'email')
  WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Enable delete for users based on email" ON cart_customizations
  FOR DELETE TO authenticated
  USING (user_email = auth.jwt() ->> 'email');

-- Step 5: Add unique constraint to prevent duplicate user-product combinations
ALTER TABLE cart_customizations 
ADD CONSTRAINT unique_user_product UNIQUE (user_email, product_id);

-- Step 6: Create indexes for better performance
CREATE INDEX idx_cart_customizations_user_email ON cart_customizations(user_email);
CREATE INDEX idx_cart_customizations_product_id ON cart_customizations(product_id);
CREATE INDEX idx_cart_customizations_status ON cart_customizations(cart_status);
CREATE INDEX idx_cart_customizations_created_at ON cart_customizations(created_at);

-- Step 7: Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 8: Create trigger
CREATE TRIGGER update_cart_customizations_updated_at 
  BEFORE UPDATE ON cart_customizations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Step 9: Insert test data to verify everything works
INSERT INTO cart_customizations (
  user_email,
  product_id,
  product_name,
  product_description,
  base_price,
  custom_name,
  selected_color,
  selected_features,
  project_name,
  contact_person,
  restaurant_name,
  cuisine_type,
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
  'restaurant-menu',
  'Restaurant Menu System',
  'Digital menu system with QR code ordering',
  5000,
  'My Custom Restaurant',
  '#3B82F6',
  '["responsive", "seo"]',
  'Test Project',
  'John Doe',
  'Test Restaurant',
  'indian',
  'test@example.com',
  '+91 9876543210',
  '#3B82F6',
  '#A5CF6',
  '#F59E0B',
  '#1F2937',
  'Test requirements for restaurant menu',
  'active'
);

-- Step 10: Verify the table and data
SELECT 'SUCCESS: cart_customizations table created successfully!' as message;
SELECT COUNT(*) as total_records FROM cart_customizations;
SELECT user_email, product_name, cart_status FROM cart_customizations LIMIT 5;
