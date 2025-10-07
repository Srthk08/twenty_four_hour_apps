-- Add Admin Data to Show in Admin Panel
-- This adds sample data that will be visible in your admin dashboard

-- 1. First, ensure we have an admin user
DO $$
DECLARE
    admin_count INTEGER;
    first_user_id UUID;
BEGIN
    -- Check if we have any admin users
    SELECT COUNT(*) INTO admin_count FROM profiles WHERE role = 'admin';
    
    IF admin_count = 0 THEN
        -- Get the first user and make them admin
        SELECT id INTO first_user_id FROM auth.users ORDER BY created_at ASC LIMIT 1;
        
        IF first_user_id IS NOT NULL THEN
            -- Update or insert admin profile
            INSERT INTO profiles (id, full_name, email, role, status, admin_level, created_at, updated_at)
            VALUES (
                first_user_id,
                'Admin User',
                (SELECT email FROM auth.users WHERE id = first_user_id),
                'admin',
                'active',
                'super_admin',
                NOW(),
                NOW()
            )
            ON CONFLICT (id) DO UPDATE SET
                role = 'admin',
                admin_level = 'super_admin',
                status = 'active',
                updated_at = NOW();
            
            RAISE NOTICE 'Created admin user: %', first_user_id;
        END IF;
    END IF;
END $$;

-- 2. Insert sample contact submissions
INSERT INTO contact_submissions (name, email, phone, company, subject, message, status, priority, created_at)
SELECT * FROM (VALUES
('John Doe', 'john@example.com', '+91 9876543210', 'ABC Restaurant', 'Website Inquiry', 'I am interested in getting a website for my restaurant. Please contact me for more details.', 'new', 'medium', NOW() - INTERVAL '2 days'),
('Jane Smith', 'jane@example.com', '+91 9876543211', 'XYZ Cafe', 'Menu System', 'Looking for a digital menu system with QR codes for our cafe.', 'new', 'high', NOW() - INTERVAL '1 day'),
('Mike Johnson', 'mike@example.com', '+91 9876543212', 'Tech Corp', 'Android TV App', 'Need a custom Android TV application for our company presentation.', 'in_progress', 'low', NOW() - INTERVAL '3 hours'),
('Sarah Wilson', 'sarah@example.com', '+91 9876543213', 'Media House', 'Streaming App', 'Interested in a mobile streaming application for our content.', 'new', 'medium', NOW() - INTERVAL '1 hour'),
('David Brown', 'david@example.com', '+91 9876543214', 'Food Chain', 'Order System', 'Need a complete order management system for our restaurant chain.', 'new', 'high', NOW() - INTERVAL '30 minutes')
) AS v(name, email, phone, company, subject, message, status, priority, created_at)
WHERE NOT EXISTS (SELECT 1 FROM contact_submissions WHERE email = v.email);

-- 3. Insert sample support tickets
INSERT INTO support_tickets (user_id, title, description, status, priority, category, created_at)
SELECT 
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Website not loading properly',
    'My website is not loading properly. Getting 500 error. Please help me resolve this issue.',
    'open',
    'high',
    'technical',
    NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM support_tickets WHERE title = 'Website not loading properly');

INSERT INTO support_tickets (user_id, title, description, status, priority, category, created_at)
SELECT 
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Payment integration issue',
    'Having trouble with payment integration. Transactions are not going through.',
    'open',
    'medium',
    'payment',
    NOW() - INTERVAL '2 days'
WHERE NOT EXISTS (SELECT 1 FROM support_tickets WHERE title = 'Payment integration issue');

INSERT INTO support_tickets (user_id, title, description, status, priority, category, created_at)
SELECT 
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Need help with customization',
    'I need help customizing my restaurant menu system. Can you guide me?',
    'closed',
    'low',
    'customization',
    NOW() - INTERVAL '3 days'
WHERE NOT EXISTS (SELECT 1 FROM support_tickets WHERE title = 'Need help with customization');

-- 4. Insert sample customization forms
INSERT INTO customization_forms (
    user_email, user_id, product_id, product_name, product_type, base_price, total_amount,
    project_name, restaurant_name, contact_person, additional_requirements, cart_status, created_at
)
SELECT 
    'customer1@example.com',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    '1',
    'Restaurant Menu System',
    'restaurant',
    25000.00,
    29500.00,
    'Delicious Bites Menu',
    'Delicious Bites Restaurant',
    'John Doe',
    'Need QR code integration and online ordering system',
    'completed',
    NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM customization_forms WHERE user_email = 'customer1@example.com');

INSERT INTO customization_forms (
    user_email, user_id, product_id, product_name, product_type, base_price, total_amount,
    project_name, restaurant_name, contact_person, additional_requirements, cart_status, created_at
)
SELECT 
    'customer2@example.com',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    '5',
    'Order Menu System',
    'order-menu',
    999.00,
    1179.00,
    'Quick Order System',
    'Fast Food Corner',
    'Jane Smith',
    'Need real-time order tracking and payment processing',
    'completed',
    NOW() - INTERVAL '2 days'
WHERE NOT EXISTS (SELECT 1 FROM customization_forms WHERE user_email = 'customer2@example.com');

-- 5. Insert sample orders
INSERT INTO orders (order_number, user_id, service_name, status, total_amount, payment_status, payment_method, created_at)
SELECT 
    'ORD-001',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Restaurant Menu System',
    'completed',
    29500.00,
    'paid',
    'razorpay',
    NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE order_number = 'ORD-001');

INSERT INTO orders (order_number, user_id, service_name, status, total_amount, payment_status, payment_method, created_at)
SELECT 
    'ORD-002',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Order Menu System',
    'pending',
    1179.00,
    'pending',
    'razorpay',
    NOW() - INTERVAL '2 hours'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE order_number = 'ORD-002');

-- 6. Insert sample order items
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price, customization_data, created_at)
SELECT 
    (SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1),
    '1',
    'Restaurant Menu System',
    1,
    25000.00,
    25000.00,
    '{"project_name": "Delicious Bites Menu", "restaurant_name": "Delicious Bites Restaurant"}'::jsonb,
    NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM order_items WHERE order_id = (SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1));

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price, customization_data, created_at)
SELECT 
    (SELECT id FROM orders WHERE order_number = 'ORD-002' LIMIT 1),
    '5',
    'Order Menu System',
    1,
    999.00,
    999.00,
    '{"project_name": "Quick Order System", "restaurant_name": "Fast Food Corner"}'::jsonb,
    NOW() - INTERVAL '2 hours'
WHERE NOT EXISTS (SELECT 1 FROM order_items WHERE order_id = (SELECT id FROM orders WHERE order_number = 'ORD-002' LIMIT 1));

-- 7. Insert sample OMS customizations
INSERT INTO oms_customizations (
    user_email, user_id, project_name, restaurant_name, owner_name, restaurant_address,
    contact_person, phone_number, city, state, pincode, country, additional_requirements,
    status, created_at
)
SELECT 
    'oms1@example.com',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Pizza Palace Menu',
    'Pizza Palace',
    'Mario Rossi',
    '123 Main Street, Mumbai, Maharashtra 400001, India',
    'Mario Rossi',
    '+91 9876543210',
    'Mumbai',
    'Maharashtra',
    '400001',
    'India',
    'Need custom pizza menu with online ordering',
    'pending',
    NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM oms_customizations WHERE user_email = 'oms1@example.com');

INSERT INTO oms_customizations (
    user_email, user_id, project_name, restaurant_name, owner_name, restaurant_address,
    contact_person, phone_number, city, state, pincode, country, additional_requirements,
    status, created_at
)
SELECT 
    'oms2@example.com',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Burger King Digital Menu',
    'Burger King',
    'John Smith',
    '456 Park Avenue, Delhi, Delhi 110001, India',
    'John Smith',
    '+91 9876543211',
    'Delhi',
    'Delhi',
    '110001',
    'India',
    'Need burger menu with QR code ordering',
    'completed',
    NOW() - INTERVAL '2 days'
WHERE NOT EXISTS (SELECT 1 FROM oms_customizations WHERE user_email = 'oms2@example.com');

-- 8. Verify all data was inserted
SELECT '=== FINAL DATA COUNT ===' as info;
SELECT 'profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'contact_submissions', COUNT(*) FROM contact_submissions
UNION ALL
SELECT 'support_tickets', COUNT(*) FROM support_tickets
UNION ALL
SELECT 'customization_forms', COUNT(*) FROM customization_forms
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'oms_customizations', COUNT(*) FROM oms_customizations
UNION ALL
SELECT 'products', COUNT(*) FROM products;

-- 9. Show sample data
SELECT '=== SAMPLE PROFILES ===' as info;
SELECT id, full_name, email, role, status FROM profiles LIMIT 5;

SELECT '=== SAMPLE CONTACT SUBMISSIONS ===' as info;
SELECT id, name, email, subject, status, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 5;

SELECT '=== SAMPLE ORDERS ===' as info;
SELECT id, order_number, service_name, status, total_amount, created_at FROM orders ORDER BY created_at DESC LIMIT 5;
