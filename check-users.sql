-- Check Users in Database
-- This script checks what users exist in the profiles table

-- Check all users in profiles table
SELECT 
  id,
  email,
  full_name,
  role,
  status,
  created_at,
  last_login_at
FROM profiles 
ORDER BY created_at DESC;

-- Count total users
SELECT COUNT(*) as total_users FROM profiles;

-- Check if there are any users with different roles
SELECT 
  role,
  COUNT(*) as count
FROM profiles 
GROUP BY role;

-- Check if there are any users with different statuses
SELECT 
  status,
  COUNT(*) as count
FROM profiles 
GROUP BY status;
