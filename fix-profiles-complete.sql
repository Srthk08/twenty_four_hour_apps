-- Complete fix for profiles table RLS policies
-- This will allow admin users to see all users in the admin panel
-- Run this in your Supabase SQL Editor

-- Step 1: Check current RLS status
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled,
    hasrls as has_rls
FROM pg_tables 
WHERE tablename = 'profiles';

-- Step 2: Check existing policies
SELECT 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual, 
    with_check
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Step 3: Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;
DROP POLICY IF EXISTS "Allow authenticated users to read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow authenticated users to insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow authenticated users to update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow admin users to update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow admin users to delete any profile" ON public.profiles;

-- Step 4: Create comprehensive policies

-- Policy 1: Allow authenticated users to read all profiles (for admin panel)
CREATE POLICY "Admin can read all profiles" ON public.profiles
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy 2: Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Policy 3: Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy 4: Allow admin users to update any profile
CREATE POLICY "Admin can update any profile" ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy 5: Allow admin users to delete any profile
CREATE POLICY "Admin can delete any profile" ON public.profiles
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Step 5: Grant necessary permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Step 6: Verify the setup
SELECT 
    policyname, 
    permissive, 
    roles, 
    cmd
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Step 7: Test query to verify all users are visible
SELECT 
    id, 
    full_name, 
    email, 
    role, 
    status, 
    created_at 
FROM public.profiles 
ORDER BY created_at DESC;
