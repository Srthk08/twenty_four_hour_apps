-- Complete Cart Customizations Fix
-- This script will clean up all cart-related objects and recreate them properly

-- Step 1: Drop all dependent objects first
DROP VIEW IF EXISTS abandoned_carts_analysis CASCADE;
DROP VIEW IF EXISTS active_carts_view CASCADE;

-- Step 2: Drop dependent tables
DROP TABLE IF EXISTS cart_file_uploads CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;

-- Step 3: Drop cart_customizations table and all its dependencies
DROP TABLE IF EXISTS cart_customizations CASCADE;

-- Step 4: Create cart_customizations table
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

-- Step 5: Create cart_items table (if needed)
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_customization_id uuid REFERENCES cart_customizations(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  quantity integer DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Step 6: Create cart_file_uploads table (if needed)
CREATE TABLE IF NOT EXISTS cart_file_uploads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_customization_id uuid REFERENCES cart_customizations(id) ON DELETE CASCADE,
  file_type text NOT NULL CHECK (file_type IN ('logo', 'photos', 'documents')),
  file_name text NOT NULL,
  file_url text,
  file_size integer,
  uploaded_at timestamptz DEFAULT now()
);

-- Step 7: Enable RLS on all tables
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_file_uploads ENABLE ROW LEVEL SECURITY;

-- Step 8: Create RLS policies for cart_customizations
CREATE POLICY "Users can view own cart customizations" ON cart_customizations 
  FOR SELECT TO authenticated 
  USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert own cart customizations" ON cart_customizations 
  FOR INSERT TO authenticated 
  WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update own cart customizations" ON cart_customizations 
  FOR UPDATE TO authenticated 
  USING (user_email = auth.jwt() ->> 'email')
  WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete own cart customizations" ON cart_customizations 
  FOR DELETE TO authenticated 
  USING (user_email = auth.jwt() ->> 'email');

-- Step 9: Create RLS policies for cart_items
CREATE POLICY "Users can view own cart items" ON cart_items 
  FOR SELECT TO authenticated 
  USING (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can insert own cart items" ON cart_items 
  FOR INSERT TO authenticated 
  WITH CHECK (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can update own cart items" ON cart_items 
  FOR UPDATE TO authenticated 
  USING (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can delete own cart items" ON cart_items 
  FOR DELETE TO authenticated 
  USING (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

-- Step 10: Create RLS policies for cart_file_uploads
CREATE POLICY "Users can view own cart file uploads" ON cart_file_uploads 
  FOR SELECT TO authenticated 
  USING (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can insert own cart file uploads" ON cart_file_uploads 
  FOR INSERT TO authenticated 
  WITH CHECK (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can update own cart file uploads" ON cart_file_uploads 
  FOR UPDATE TO authenticated 
  USING (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Users can delete own cart file uploads" ON cart_file_uploads 
  FOR DELETE TO authenticated 
  USING (cart_customization_id IN (
    SELECT id FROM cart_customizations WHERE user_email = auth.jwt() ->> 'email'
  ));

-- Step 11: Create indexes
CREATE INDEX idx_cart_customizations_user_email ON cart_customizations(user_email);
CREATE INDEX idx_cart_customizations_product_id ON cart_customizations(product_id);
CREATE INDEX idx_cart_customizations_status ON cart_customizations(cart_status);
CREATE INDEX idx_cart_customizations_created_at ON cart_customizations(created_at);

CREATE INDEX idx_cart_items_cart_customization_id ON cart_items(cart_customization_id);
CREATE INDEX idx_cart_file_uploads_cart_customization_id ON cart_file_uploads(cart_customization_id);

-- Step 12: Create trigger function and trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cart_customizations_updated_at 
  BEFORE UPDATE ON cart_customizations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Step 13: Recreate views
CREATE VIEW active_carts_view AS
SELECT 
  cc.id,
  cc.user_email,
  cc.product_name,
  cc.project_name,
  cc.cart_status,
  cc.created_at,
  cc.updated_at
FROM cart_customizations cc
WHERE cc.cart_status = 'active';

CREATE VIEW abandoned_carts_analysis AS
SELECT 
  cc.user_email,
  cc.product_name,
  cc.cart_status,
  cc.created_at,
  EXTRACT(EPOCH FROM (now() - cc.created_at))/3600 as hours_since_created
FROM cart_customizations cc
WHERE cc.cart_status = 'active' 
  AND cc.created_at < now() - interval '24 hours';

-- Step 14: Insert test data to verify
INSERT INTO cart_customizations (
  user_email, 
  product_id, 
  product_name, 
  product_description, 
  base_price,
  cart_status
) VALUES (
  'test@example.com',
  'restaurant-menu',
  'Restaurant Menu System',
  'Test description',
  5000,
  'active'
);

-- Step 15: Verify everything works
SELECT 'cart_customizations' as table_name, COUNT(*) as record_count FROM cart_customizations
UNION ALL
SELECT 'cart_items' as table_name, COUNT(*) as record_count FROM cart_items
UNION ALL
SELECT 'cart_file_uploads' as table_name, COUNT(*) as record_count FROM cart_file_uploads;
