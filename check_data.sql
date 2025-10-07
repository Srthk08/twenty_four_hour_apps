-- Check what data exists in your tables
-- Run this to see what's currently in your database

-- 1. Check profiles table
SELECT 'profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'contact_submissions', COUNT(*) FROM contact_submissions
UNION ALL
SELECT 'support_tickets', COUNT(*) FROM support_tickets
UNION ALL
SELECT 'customization_forms', COUNT(*) FROM customization_forms
UNION ALL
SELECT 'cart_customizations', COUNT(*) FROM cart_customizations
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'product_plans', COUNT(*) FROM product_plans
UNION ALL
SELECT 'oms_customizations', COUNT(*) FROM oms_customizations
UNION ALL
SELECT 'oms_product_customizations', COUNT(*) FROM oms_product_customizations;

-- 2. Check if there are any users in auth.users
SELECT 'auth.users' as table_name, COUNT(*) as record_count FROM auth.users;

-- 3. Check specific table contents (first 5 records)
SELECT '=== PROFILES ===' as info;
SELECT id, full_name, email, role, created_at FROM profiles LIMIT 5;

SELECT '=== PRODUCTS ===' as info;
SELECT id, name, base_price, product_type FROM products LIMIT 5;

SELECT '=== OMS CUSTOMIZATIONS ===' as info;
SELECT id, project_name, restaurant_name, user_email, created_at FROM oms_customizations LIMIT 5;
