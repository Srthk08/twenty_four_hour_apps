-- FIX ALL RLS POLICIES
-- This will fix RLS issues for all tables that might be blocking form submissions

-- 1. Check RLS status for all tables
SELECT 
    'RLS status for all tables:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Disable RLS on all form-related tables
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE customization_forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE cart_customizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE oms_customizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE oms_product_customizations DISABLE ROW LEVEL SECURITY;

-- 3. Drop all existing RLS policies on form tables
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all policies on contact_submissions
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'contact_submissions'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON contact_submissions';
    END LOOP;
    
    -- Drop all policies on customization_forms
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'customization_forms'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON customization_forms';
    END LOOP;
    
    -- Drop all policies on cart_customizations
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'cart_customizations'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON cart_customizations';
    END LOOP;
    
    -- Drop all policies on orders
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'orders'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON orders';
    END LOOP;
    
    -- Drop all policies on order_items
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'order_items'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON order_items';
    END LOOP;
    
    -- Drop all policies on oms_customizations
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'oms_customizations'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON oms_customizations';
    END LOOP;
    
    -- Drop all policies on oms_product_customizations
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'oms_product_customizations'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON oms_product_customizations';
    END LOOP;
    
    RAISE NOTICE 'All RLS policies dropped successfully';
END $$;

-- 4. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

GRANT ALL ON customization_forms TO authenticated;
GRANT ALL ON customization_forms TO anon;
GRANT ALL ON customization_forms TO service_role;

GRANT ALL ON cart_customizations TO authenticated;
GRANT ALL ON cart_customizations TO anon;
GRANT ALL ON cart_customizations TO service_role;

GRANT ALL ON orders TO authenticated;
GRANT ALL ON orders TO anon;
GRANT ALL ON orders TO service_role;

GRANT ALL ON order_items TO authenticated;
GRANT ALL ON order_items TO anon;
GRANT ALL ON order_items TO service_role;

GRANT ALL ON oms_customizations TO authenticated;
GRANT ALL ON oms_customizations TO anon;
GRANT ALL ON oms_customizations TO service_role;

GRANT ALL ON oms_product_customizations TO authenticated;
GRANT ALL ON oms_product_customizations TO anon;
GRANT ALL ON oms_product_customizations TO service_role;

-- 5. Test inserting records into all tables
DO $$
DECLARE
    test_id UUID;
BEGIN
    -- Test contact_submissions
    INSERT INTO contact_submissions (
        first_name, last_name, name, email, phone, company_name, project_type, project_details, message, subject, created_at, updated_at
    ) VALUES (
        'Test', 'User', 'Test User', 'test@example.com', '+91 9876543210', 'Test Company', 'website', 'Test details', 'Test message', 'Test Subject', NOW(), NOW()
    ) RETURNING id INTO test_id;
    RAISE NOTICE 'SUCCESS: Contact form test record inserted with ID: %', test_id;
    
    -- Test customization_forms
    INSERT INTO customization_forms (
        user_id, product_name, status, created_at, updated_at
    ) VALUES (
        NULL, 'Test Product', 'new', NOW(), NOW()
    ) RETURNING id INTO test_id;
    RAISE NOTICE 'SUCCESS: Customization form test record inserted with ID: %', test_id;
    
    -- Test oms_customizations
    INSERT INTO oms_customizations (
        user_email, project_name, restaurant_name, contact_person, phone_number, restaurant_address, additional_requirements, logo_url, created_at, updated_at
    ) VALUES (
        'test@example.com', 'Test Project', 'Test Restaurant', 'Test Contact', '+91 9876543210', 'Test Address', 'Test Requirements', 'test-logo.png', NOW(), NOW()
    ) RETURNING id INTO test_id;
    RAISE NOTICE 'SUCCESS: OMS customization test record inserted with ID: %', test_id;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR during test insertions: %', SQLERRM;
END $$;

-- 6. Verify RLS status after fix
SELECT 
    'RLS status after fix:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 7. Show sample data from all tables
SELECT 
    'Sample contact submissions:' as info,
    id, first_name, last_name, email, company_name, subject, created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 2;

SELECT 
    'Sample customization forms:' as info,
    id, product_name, status, created_at
FROM customization_forms
ORDER BY created_at DESC
LIMIT 2;

SELECT 
    'Sample OMS customizations:' as info,
    id, project_name, restaurant_name, contact_person, created_at
FROM oms_customizations
ORDER BY created_at DESC
LIMIT 2;
