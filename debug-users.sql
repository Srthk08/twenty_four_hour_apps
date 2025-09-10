-- Debug script to check users in the database
-- Run this in your Supabase SQL Editor

-- Check all users in profiles table
SELECT 
  id,
  full_name,
  email,
  role,
  status,
  created_at,
  updated_at
FROM profiles 
ORDER BY created_at DESC;

-- Check user count
SELECT COUNT(*) as total_users FROM profiles;

-- Check users by role
SELECT 
  role,
  COUNT(*) as count
FROM profiles 
GROUP BY role;

-- Check if there are any users with customer role
SELECT 
  id,
  full_name,
  email,
  role,
  status
FROM profiles 
WHERE role = 'customer' OR role IS NULL
ORDER BY created_at DESC;
