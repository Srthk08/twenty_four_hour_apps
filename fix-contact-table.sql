-- Fix Contact Form Table Issue
-- This script creates the contact_submissions table that the contact form expects

-- Step 1: Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company_name text,
  project_type text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to uuid REFERENCES profiles(id),
  response text,
  responded_at timestamptz,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Step 2: Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies for public access (contact form can be used by anyone)
-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Enable insert for everyone" ON contact_submissions;

-- Create new policy that allows anyone to insert
CREATE POLICY "Enable insert for everyone" ON contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Also create a policy for anonymous users specifically
CREATE POLICY "Enable insert for anonymous users" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Step 4: Create RLS policies for admin users to view all submissions
CREATE POLICY "Enable select for admin users" ON contact_submissions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 5: Create RLS policies for admin users to update submissions
CREATE POLICY "Enable update for admin users" ON contact_submissions
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 6: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_project_type ON contact_submissions(project_type);

-- Step 7: Insert sample data for testing
INSERT INTO contact_submissions (
  first_name,
  last_name,
  email,
  phone,
  company_name,
  project_type,
  message
) VALUES (
  'John',
  'Doe',
  'john.doe@example.com',
  '+1 (555) 123-4567',
  'Example Corp',
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
  'Mike',
  'Wilson',
  'mike.wilson@tech.com',
  '+91 9876543210',
  'Tech Solutions Inc',
  'android-tv',
  'Looking for a custom Android TV app with streaming capabilities and smart remote support.'
);

-- Step 8: Verify the table was created successfully
SELECT 'SUCCESS: contact_submissions table created successfully!' as message;
SELECT COUNT(*) as total_contacts FROM contact_submissions;
SELECT first_name, last_name, email, project_type FROM contact_submissions LIMIT 5;

-- Step 9: Show table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
ORDER BY ordinal_position;
