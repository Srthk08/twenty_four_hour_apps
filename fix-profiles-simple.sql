-- Simple fix: Temporarily disable RLS for profiles table
-- This will allow the admin panel to see all users
-- Run this in your Supabase SQL Editor

-- Disable RLS temporarily
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to authenticated users
GRANT ALL ON public.profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- Test query to see all users
SELECT id, full_name, email, role, status, created_at 
FROM public.profiles 
ORDER BY created_at DESC;
