-- Add sample data to test your application
-- This will populate tables with test data

-- 1. Insert sample products (if products table is empty)
INSERT INTO products (id, name, description, base_price, category, product_type, features) 
SELECT * FROM (VALUES
('1', 'Restaurant Menu System', 'Digital menu system with QR code integration, online ordering, and real-time updates. Perfect for restaurants looking to modernize their customer experience.', 25000.00, 'restaurant', 'restaurant', '["QR Code Integration", "Online Ordering", "Real-time Updates", "Admin Dashboard", "Mobile Responsive"]'::jsonb),
('2', 'Android TV App', 'Custom Android TV applications with beautiful UI, content management, and remote control support. Perfect for streaming services and media companies.', 55000.00, 'entertainment', 'non-restaurant', '["Custom UI", "Content Management", "Remote Control", "High Performance", "Easy Navigation"]'::jsonb),
('3', 'Streaming Mobile App', 'Mobile streaming applications for iOS and Android with custom features, user authentication, and content management.', 35000.00, 'entertainment', 'non-restaurant', '["iOS & Android", "User Authentication", "Content Management", "Offline Support", "Push Notifications"]'::jsonb),
('4', 'Restaurant Website', 'Professional restaurant website with online ordering, menu display, and customer management features.', 20000.00, 'restaurant', 'restaurant', '["Online Ordering", "Menu Display", "Customer Management", "SEO Optimized", "Mobile Friendly"]'::jsonb),
('5', 'Order Menu System', 'Complete order management system with digital menu integration, real-time order tracking, and payment processing. Perfect for restaurants looking to streamline their ordering process.', 999.00, 'restaurant', 'order-menu', '["Digital Menu", "Order Tracking", "Payment Processing", "Admin Dashboard", "Real-time Updates"]'::jsonb)
) AS v(id, name, description, base_price, category, product_type, features)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = v.id);

-- 2. Insert sample product plans
INSERT INTO product_plans (id, product_id, name, description, price, features) 
SELECT * FROM (VALUES
('plan-1', '1', 'Basic Plan', 'Basic restaurant menu system', 25000.00, '["QR Code", "Basic Menu", "Email Support"]'::jsonb),
('plan-2', '1', 'Premium Plan', 'Advanced restaurant menu system', 35000.00, '["QR Code", "Advanced Menu", "Phone Support", "Customization"]'::jsonb),
('plan-3', '2', 'Standard Plan', 'Standard Android TV app', 55000.00, '["Custom UI", "Content Management", "Basic Support"]'::jsonb),
('plan-4', '3', 'Mobile Plan', 'Mobile streaming app', 35000.00, '["iOS & Android", "User Auth", "Content Management"]'::jsonb),
('plan-5', '4', 'Website Plan', 'Restaurant website', 20000.00, '["Online Ordering", "Menu Display", "SEO"]'::jsonb),
('plan-6', '5', 'OMS Plan', 'Order Menu System', 999.00, '["Digital Menu", "Order Tracking", "Payment"]'::jsonb)
) AS v(id, product_id, name, description, price, features)
WHERE NOT EXISTS (SELECT 1 FROM product_plans WHERE id = v.id);

-- 3. Create a test admin user profile (if you have a user in auth.users)
-- First, let's see if there are any users
DO $$
DECLARE
    user_count INTEGER;
    first_user_id UUID;
BEGIN
    SELECT COUNT(*) INTO user_count FROM auth.users;
    
    IF user_count > 0 THEN
        -- Get the first user ID
        SELECT id INTO first_user_id FROM auth.users LIMIT 1;
        
        -- Create a profile for the first user
        INSERT INTO profiles (id, full_name, email, role, status, admin_level)
        SELECT 
            first_user_id,
            'Admin User',
            (SELECT email FROM auth.users WHERE id = first_user_id),
            'admin',
            'active',
            'super_admin'
        WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE id = first_user_id);
        
        RAISE NOTICE 'Created admin profile for user: %', first_user_id;
    ELSE
        RAISE NOTICE 'No users found in auth.users table';
    END IF;
END $$;

-- 4. Insert sample contact submissions
INSERT INTO contact_submissions (name, email, phone, company, subject, message, status, priority)
SELECT * FROM (VALUES
('John Doe', 'john@example.com', '+91 9876543210', 'ABC Restaurant', 'Website Inquiry', 'I am interested in getting a website for my restaurant. Please contact me.', 'new', 'medium'),
('Jane Smith', 'jane@example.com', '+91 9876543211', 'XYZ Cafe', 'Menu System', 'Looking for a digital menu system with QR codes.', 'new', 'high'),
('Mike Johnson', 'mike@example.com', '+91 9876543212', 'Tech Corp', 'Android TV App', 'Need a custom Android TV application for our company.', 'new', 'low'),
('Sarah Wilson', 'sarah@example.com', '+91 9876543213', 'Media House', 'Streaming App', 'Interested in a mobile streaming application.', 'new', 'medium')
) AS v(name, email, phone, company, subject, message, status, priority)
WHERE NOT EXISTS (SELECT 1 FROM contact_submissions WHERE email = v.email);

-- 5. Insert sample support tickets
INSERT INTO support_tickets (user_id, title, description, status, priority, category)
SELECT 
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Website not loading',
    'My website is not loading properly. Please help.',
    'open',
    'high',
    'technical'
WHERE EXISTS (SELECT 1 FROM profiles WHERE role = 'admin')
AND NOT EXISTS (SELECT 1 FROM support_tickets WHERE title = 'Website not loading');

-- 6. Insert sample customization form
INSERT INTO customization_forms (user_email, user_id, product_id, product_name, product_type, base_price, total_amount, project_name, restaurant_name, contact_person, additional_requirements, cart_status)
SELECT 
    'test@example.com',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    '1',
    'Restaurant Menu System',
    'restaurant',
    25000.00,
    29500.00,
    'My Restaurant Project',
    'Delicious Bites',
    'John Doe',
    'Need QR code integration and online ordering',
    'completed'
WHERE EXISTS (SELECT 1 FROM profiles WHERE role = 'admin')
AND NOT EXISTS (SELECT 1 FROM customization_forms WHERE user_email = 'test@example.com');

-- 7. Insert sample order
INSERT INTO orders (order_number, user_id, service_name, status, total_amount, payment_status, payment_method)
SELECT 
    'ORD-001',
    (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
    'Restaurant Menu System',
    'completed',
    29500.00,
    'paid',
    'razorpay'
WHERE EXISTS (SELECT 1 FROM profiles WHERE role = 'admin')
AND NOT EXISTS (SELECT 1 FROM orders WHERE order_number = 'ORD-001');

-- 8. Insert sample order item
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price, customization_data)
SELECT 
    (SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1),
    '1',
    'Restaurant Menu System',
    1,
    25000.00,
    25000.00,
    '{"project_name": "My Restaurant Project", "restaurant_name": "Delicious Bites"}'::jsonb
WHERE EXISTS (SELECT 1 FROM orders WHERE order_number = 'ORD-001')
AND NOT EXISTS (SELECT 1 FROM order_items WHERE order_id = (SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1));

-- 9. Verify data was inserted
SELECT '=== DATA INSERTED ===' as info;
SELECT 'profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'product_plans', COUNT(*) FROM product_plans
UNION ALL
SELECT 'contact_submissions', COUNT(*) FROM contact_submissions
UNION ALL
SELECT 'support_tickets', COUNT(*) FROM support_tickets
UNION ALL
SELECT 'customization_forms', COUNT(*) FROM customization_forms
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items;
