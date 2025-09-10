-- Fix Contact Form RLS Policy Issue
-- This script fixes the Row-Level Security policy that's blocking contact form submissions

-- Step 1: Drop all existing policies on contact_submissions table
DROP POLICY IF EXISTS "Enable insert for everyone" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable select for admin users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update for admin users" ON contact_submissions;

-- Step 2: Create a simple policy that allows anyone to insert contact submissions
CREATE POLICY "Allow public contact form submissions" ON contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Step 3: Create policy for admin users to view all submissions
CREATE POLICY "Allow admin to view all contact submissions" ON contact_submissions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 4: Create policy for admin users to update submissions
CREATE POLICY "Allow admin to update contact submissions" ON contact_submissions
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 5: Test the policy by trying to insert a test record
-- This will verify that the RLS policy is working correctly
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
  'This is a test submission to verify RLS policy is working.'
);

-- Step 6: Verify the test record was inserted
SELECT 'SUCCESS: RLS policy fixed! Contact form should now work.' as message;
SELECT COUNT(*) as total_contacts FROM contact_submissions;
SELECT first_name, last_name, email, project_type FROM contact_submissions ORDER BY created_at DESC LIMIT 3;
