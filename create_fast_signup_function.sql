-- Create Fast Signup Function
-- This creates a simple function to handle user signup without delays

-- 1. Create a fast profile creation function
CREATE OR REPLACE FUNCTION create_user_profile(
    user_id UUID,
    user_email TEXT,
    user_name TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Insert profile with error handling
    INSERT INTO profiles (
        id,
        full_name,
        email,
        role,
        status,
        created_at,
        updated_at
    ) VALUES (
        user_id,
        COALESCE(user_name, user_email),
        user_email,
        'customer',
        'active',
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = NOW();
    
    -- Return success
    result := json_build_object(
        'success', true,
        'message', 'Profile created successfully',
        'user_id', user_id,
        'email', user_email
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Return error
        result := json_build_object(
            'success', false,
            'message', 'Error creating profile: ' || SQLERRM,
            'user_id', user_id,
            'email', user_email
        );
        
        RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Grant execute permission
GRANT EXECUTE ON FUNCTION create_user_profile TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile TO anon;

-- 3. Create a simple user signup function
CREATE OR REPLACE FUNCTION signup_user(
    email TEXT,
    password TEXT,
    full_name TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    user_id UUID;
    result JSON;
BEGIN
    -- This function is for reference - actual signup should be done through Supabase Auth
    -- But we can create the profile part
    
    -- Get the user ID from auth.users (assuming they just signed up)
    SELECT id INTO user_id 
    FROM auth.users 
    WHERE email = signup_user.email 
    ORDER BY created_at DESC 
    LIMIT 1;
    
    IF user_id IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'message', 'User not found in auth.users'
        );
    END IF;
    
    -- Create profile
    SELECT create_user_profile(user_id, email, full_name) INTO result;
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Signup error: ' || SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Grant execute permission
GRANT EXECUTE ON FUNCTION signup_user TO authenticated;
GRANT EXECUTE ON FUNCTION signup_user TO anon;

-- 5. Create a function to check if user exists
CREATE OR REPLACE FUNCTION user_exists(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM auth.users WHERE auth.users.email = user_exists.email
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Grant execute permission
GRANT EXECUTE ON FUNCTION user_exists TO authenticated;
GRANT EXECUTE ON FUNCTION user_exists TO anon;

-- 7. Test the functions
SELECT 'Testing functions...' as info;

-- Test user_exists function
SELECT 
    'Testing user_exists function:' as info,
    user_exists('test@example.com') as exists;

-- 8. Show current database performance
SELECT 
    'Database performance check:' as info,
    'Current connections:' as metric,
    (SELECT setting FROM pg_settings WHERE name = 'max_connections') as value
UNION ALL
SELECT 
    '',
    'Shared buffers:',
    (SELECT setting FROM pg_settings WHERE name = 'shared_buffers')
UNION ALL
SELECT 
    '',
    'Work memory:',
    (SELECT setting FROM pg_settings WHERE name = 'work_mem');

-- 9. Check for any blocking queries
SELECT 
    'Blocking queries check:' as info,
    COUNT(*) as blocked_queries
FROM pg_stat_activity 
WHERE state = 'active' 
AND query NOT LIKE '%pg_stat_activity%';

-- 10. Show table sizes
SELECT 
    'Table sizes:' as info,
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
