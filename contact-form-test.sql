-- Simple Contact Form Test Script
-- Run this to test the contact form data storage

-- Test 1: Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'contact_form_data'
) as table_exists;

-- Test 2: Insert test data
INSERT INTO contact_form_data (
  first_name,
  last_name,
  email_address,
  phone_number,
  company_name,
  project_type,
  project_details
) VALUES (
  'Test',
  'User',
  'test@example.com',
  '1234567890',
  'Test Company',
  'restaurant-menu',
  'This is a test message for the contact form.'
);

-- Test 3: Verify data was inserted
SELECT 
  first_name,
  last_name,
  email_address,
  phone_number,
  company_name,
  project_type,
  project_details,
  created_at
FROM contact_form_data 
WHERE email_address = 'test@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- Test 4: Show all contact form data
SELECT 
  id,
  first_name,
  last_name,
  email_address,
  phone_number,
  company_name,
  project_type,
  created_at
FROM contact_form_data 
ORDER BY created_at DESC;
