-- Setup Cart Database
-- Run this in Supabase SQL Editor to ensure cart functionality works

-- Drop existing table if it exists (to recreate with correct structure)
DROP TABLE IF EXISTS cart_customizations CASCADE;

-- Create the cart_customizations table with all necessary fields
CREATE TABLE cart_customizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email text NOT NULL,
  product_id text NOT NULL,
  product_name text NOT NULL,
  product_description text,
  base_price integer NOT NULL,
  custom_name text,
  restaurant_name_customization text,
  selected_color text DEFAULT '#3B82F6',
  selected_features text[] DEFAULT '{}',
  project_name text,
  contact_person text,
  restaurant_name text,
  cuisine_type text,
  app_name text,
  product_description_custom text,
  contact_email text,
  contact_phone text,
  primary_color text DEFAULT '#3B82F6',
  secondary_color text DEFAULT '#A5CF6',
  accent_color text DEFAULT '#F59E0B',
  text_color text DEFAULT '#1F2937',
  additional_requirements text,
  cart_status text DEFAULT 'active',
  is_checkout_initiated boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create unique constraint to prevent duplicates
ALTER TABLE cart_customizations ADD CONSTRAINT unique_user_product UNIQUE (user_email, product_id);

-- Enable Row Level Security
ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON cart_customizations;
DROP POLICY IF EXISTS "Enable select for users based on user_email" ON cart_customizations;
DROP POLICY IF EXISTS "Enable update for users based on user_email" ON cart_customizations;
DROP POLICY IF EXISTS "Enable delete for users based on user_email" ON cart_customizations;
DROP POLICY IF EXISTS "Admins can view all cart customizations" ON cart_customizations;

-- Create RLS policies
CREATE POLICY "Enable insert for authenticated users" ON cart_customizations
  FOR INSERT TO authenticated
  WITH CHECK (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Enable select for users based on user_email" ON cart_customizations
  FOR SELECT TO authenticated
  USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Enable update for users based on user_email" ON cart_customizations
  FOR UPDATE TO authenticated
  USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Enable delete for users based on user_email" ON cart_customizations
  FOR DELETE TO authenticated
  USING (user_email = auth.jwt() ->> 'email');

-- Admin can view all cart customizations
CREATE POLICY "Admins can view all cart customizations" ON cart_customizations
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Show final status
SELECT 
  'cart_customizations' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cart_customizations') as exists,
  'Table created successfully!' as status;
