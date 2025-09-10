-- Create Admin User Script
-- Run this in Supabase SQL Editor to create an admin user

-- First, create a user in auth.users (you'll need to do this through Supabase Auth UI)
-- Then run this script to set their role as admin

-- Update existing user to admin role (replace 'your-admin-email@example.com' with actual email)
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';

-- If the user doesn't exist in profiles table, create them
-- (This assumes the user already exists in auth.users)
INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  status,
  created_at,
  updated_at
)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 'Admin User') as full_name,
  'admin' as role,
  'active' as status,
  NOW() as created_at,
  NOW() as updated_at
FROM auth.users au
WHERE au.email = 'your-admin-email@example.com'
AND NOT EXISTS (
  SELECT 1 FROM profiles p WHERE p.id = au.id
);

-- Verify the admin user was created/updated
SELECT 
  id,
  email,
  full_name,
  role,
  status,
  created_at
FROM profiles 
WHERE role = 'admin'
ORDER BY created_at DESC;
