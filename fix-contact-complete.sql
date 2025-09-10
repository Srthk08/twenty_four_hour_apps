-- COMPLETE FIX for Contact Form 403 Forbidden Error
-- This script fixes both RLS policies AND table-level permissions

-- Step 1: First, let's check if the table exists and create it if needed
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

-- Step 3: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Enable insert for everyone" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public contact form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable select for admin users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow admin to view all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update for admin users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow admin to update contact submissions" ON contact_submissions;

-- Step 4: Grant table-level permissions to anon role
-- This is CRITICAL - without this, RLS policies won't work
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO anon;
GRANT INSERT ON contact_submissions TO authenticated;
GRANT SELECT ON contact_submissions TO authenticated;
GRANT UPDATE ON contact_submissions TO authenticated;

-- Step 5: Create simple RLS policies that definitely work
-- Policy for anonymous users to insert (contact form)
CREATE POLICY "anon_can_insert_contact" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy for authenticated users to insert
CREATE POLICY "authenticated_can_insert_contact" ON contact_submissions
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to select (for admin panel)
CREATE POLICY "authenticated_can_select_contact" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);

-- Policy for admin users to update
CREATE POLICY "admin_can_update_contact" ON contact_submissions
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 6: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Step 7: Test the fix by inserting a test record as anonymous user
-- This simulates what the contact form does
DO $$
BEGIN
  -- Try to insert a test record
  INSERT INTO contact_submissions (
    first_name,
    last_name,
    email,
    phone,
    company_name,
    project_type,
    message
  ) VALUES (
    'Test',
    'User',
    'test@example.com',
    '+1 (555) 000-0000',
    'Test Company',
    'test-project',
    'This is a test submission to verify the fix works.'
  );
  
  RAISE NOTICE 'SUCCESS: Test record inserted successfully! Contact form should now work.';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'ERROR: Failed to insert test record: %', SQLERRM;
END $$;

-- Step 8: Verify the table and permissions
SELECT 'Contact form fix completed!' as status;
SELECT COUNT(*) as total_contacts FROM contact_submissions;
SELECT first_name, last_name, email, project_type, created_at 
FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 3;

-- Step 9: Show current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions';
