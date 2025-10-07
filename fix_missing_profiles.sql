-- Fix Missing User Profiles
-- This creates profiles for existing auth.users who don't have profiles

-- 1. First, let's see what users exist in auth.users but not in profiles
SELECT 
    'Users in auth.users' as info,
    COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
    'Users in profiles',
    COUNT(*)
FROM profiles
UNION ALL
SELECT 
    'Missing profiles',
    (SELECT COUNT(*) FROM auth.users) - (SELECT COUNT(*) FROM profiles);

-- 2. Show which users are missing profiles
SELECT 
    'Missing user profiles:' as info,
    au.id,
    au.email,
    au.created_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- 3. Create profiles for all users in auth.users who don't have profiles
INSERT INTO profiles (
    id,
    full_name,
    email,
    role,
    status,
    created_at,
    updated_at
)
SELECT 
    au.id,
    COALESCE(au.raw_user_meta_data->>'full_name', au.email) as full_name,
    au.email,
    CASE 
        WHEN au.email = 'admin@example.com' OR au.email LIKE '%admin%' THEN 'admin'
        ELSE 'customer'
    END as role,
    CASE 
        WHEN au.email_confirmed_at IS NOT NULL THEN 'active'
        ELSE 'pending_verification'
    END as status,
    au.created_at,
    NOW() as updated_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- 4. Update existing profiles with better data from auth.users
UPDATE profiles 
SET 
    full_name = COALESCE(
        profiles.full_name,
        au.raw_user_meta_data->>'full_name',
        au.email
    ),
    email = au.email,
    updated_at = NOW()
FROM auth.users au
WHERE profiles.id = au.id;

-- 5. Create a super admin profile if none exists
INSERT INTO profiles (
    id,
    full_name,
    email,
    role,
    status,
    admin_level,
    created_at,
    updated_at
)
SELECT 
    au.id,
    'Super Admin',
    au.email,
    'admin',
    'active',
    'super_admin',
    au.created_at,
    NOW()
FROM auth.users au
WHERE au.email LIKE '%admin%' 
   OR au.email = 'admin@example.com'
   OR au.email = 'sarthakintellisobs@gmail.com'
   AND NOT EXISTS (
       SELECT 1 FROM profiles p 
       WHERE p.id = au.id AND p.role = 'admin'
   );

-- 6. Verify the fix
SELECT 
    'After fix - Users in auth.users' as info,
    COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
    'After fix - Users in profiles',
    COUNT(*)
FROM profiles
UNION ALL
SELECT 
    'After fix - Missing profiles',
    (SELECT COUNT(*) FROM auth.users) - (SELECT COUNT(*) FROM profiles);

-- 7. Show all profiles with their details
SELECT 
    'All profiles:' as info,
    id,
    full_name,
    email,
    role,
    status,
    created_at
FROM profiles
ORDER BY created_at DESC;

-- 8. Check if we have any admin users
SELECT 
    'Admin users:' as info,
    id,
    full_name,
    email,
    role,
    admin_level
FROM profiles
WHERE role = 'admin';
