-- Contact Form SQL Script for Supabase
-- Based on the contact form fields shown in the screenshot

-- Step 1: Create the contact_form_data table
CREATE TABLE IF NOT EXISTS contact_form_data (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email_address text NOT NULL,
  phone_number text,
  company_name text,
  project_type text NOT NULL,
  project_details text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 2: Enable Row Level Security
ALTER TABLE contact_form_data ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies for authenticated users
CREATE POLICY "Enable insert for authenticated users" ON contact_form_data
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable select for users based on user_id" ON contact_form_data
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Enable update for users based on user_id" ON contact_form_data
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Step 4: Create RLS policies for admin users (to view all messages)
CREATE POLICY "Enable select for admin users" ON contact_form_data
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Enable update for admin users" ON contact_form_data
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 5: Create indexes for better performance
CREATE INDEX idx_contact_form_user_id ON contact_form_data(user_id);
CREATE INDEX idx_contact_form_email ON contact_form_data(email_address);
CREATE INDEX idx_contact_form_created_at ON contact_form_data(created_at);
CREATE INDEX idx_contact_form_project_type ON contact_form_data(project_type);

-- Step 6: Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_contact_form_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 7: Create trigger
CREATE TRIGGER update_contact_form_updated_at 
  BEFORE UPDATE ON contact_form_data 
  FOR EACH ROW 
  EXECUTE FUNCTION update_contact_form_updated_at();

-- Step 8: Insert sample data based on the form screenshot
INSERT INTO contact_form_data (
  first_name,
  last_name,
  email_address,
  phone_number,
  company_name,
  project_type,
  project_details
) VALUES (
  'ragav',
  'Doe',
  'ragav@example.com',
  '985467123',
  'ragav.co',
  'restaurant-menu',
  'I need a restaurant menu system for my new restaurant. Looking for QR code ordering and real-time updates.'
), (
  'Jane',
  'Smith',
  'jane.smith@example.com',
  '+1 (555) 987-6543',
  'Streaming Corp',
  'streaming-app',
  'We need a mobile streaming app for our content platform. Should support live streaming and VOD.'
), (
  'John',
  'Wilson',
  'john.wilson@tech.com',
  '+91 9876543210',
  'Tech Solutions Inc',
  'android-tv',
  'Looking for a custom Android TV app with streaming capabilities and smart remote support.'
);

-- Step 9: Create a view for admin dashboard
CREATE OR REPLACE VIEW contact_form_summary AS
SELECT 
  id,
  first_name,
  last_name,
  email_address,
  phone_number,
  company_name,
  project_type,
  created_at,
  CASE 
    WHEN project_type = 'restaurant-menu' THEN 'Restaurant Menu System'
    WHEN project_type = 'android-tv' THEN 'Android TV App'
    WHEN project_type = 'streaming-app' THEN 'Streaming Mobile App'
    WHEN project_type = 'restaurant-website' THEN 'Restaurant Website'
    WHEN project_type = 'custom-app' THEN 'Custom Application'
    ELSE project_type
  END as project_type_display
FROM contact_form_data
ORDER BY created_at DESC;

-- Step 10: Verify the table and data
SELECT 'SUCCESS: contact_form_data table created successfully!' as message;
SELECT COUNT(*) as total_contacts FROM contact_form_data;
SELECT first_name, last_name, email_address, project_type FROM contact_form_data LIMIT 5;

-- Step 11: Show table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'contact_form_data' 
ORDER BY ordinal_position;

-- Step 12: Test query to see all data
SELECT * FROM contact_form_data ORDER BY created_at DESC;
