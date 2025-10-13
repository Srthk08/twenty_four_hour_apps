-- =====================================================
-- CHECK OMS_CUSTOMIZATIONS TABLE STRUCTURE
-- Run this first to see what columns exist
-- =====================================================

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'oms_customizations' 
ORDER BY ordinal_position;

-- =====================================================
-- FIXED SQL QUERY - WITHOUT menu_photo_url COLUMN
-- =====================================================

-- Insert OMS customization (FIXED VERSION)
INSERT INTO oms_customizations (
    user_email, 
    project_name, 
    owner_name, 
    restaurant_name, 
    restaurant_address, 
    phone_number, 
    logo_url
) VALUES (
    'maria@bellavista.com',
    'Bella Vista Restaurant',
    'Maria Rodriguez',
    'Bella Vista',
    '123 Main Street, New York, NY',
    '+1 (555) 123-4567',
    'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=BV'
);

-- Insert another OMS customization
INSERT INTO oms_customizations (
    user_email, 
    project_name, 
    owner_name, 
    restaurant_name, 
    restaurant_address, 
    phone_number, 
    logo_url
) VALUES (
    'david@goldendragon.com',
    'Golden Dragon Chinese',
    'David Chen',
    'Golden Dragon',
    '456 Oak Avenue, Los Angeles, CA',
    '+1 (555) 987-6543',
    'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=GD'
);

-- Insert another OMS customization
INSERT INTO oms_customizations (
    user_email, 
    project_name, 
    owner_name, 
    restaurant_name, 
    restaurant_address, 
    phone_number, 
    logo_url
) VALUES (
    'sophie@cafedelsol.com',
    'Café Del Sol',
    'Sophie Martin',
    'Café Del Sol',
    '789 Pine Street, Miami, FL',
    '+1 (555) 456-7890',
    'https://via.placeholder.com/100x100/059669/FFFFFF?text=CD'
);

-- Insert another OMS customization
INSERT INTO oms_customizations (
    user_email, 
    project_name, 
    owner_name, 
    restaurant_name, 
    restaurant_address, 
    phone_number, 
    logo_url
) VALUES (
    'tony@pizzapalace.com',
    'Pizza Palace',
    'Tony Romano',
    'Pizza Palace',
    '321 Elm Street, Chicago, IL',
    '+1 (555) 321-9876',
    'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=PP'
);

-- Insert another OMS customization
INSERT INTO oms_customizations (
    user_email, 
    project_name, 
    owner_name, 
    restaurant_name, 
    restaurant_address, 
    phone_number, 
    logo_url
) VALUES (
    'yuki@sushimaster.com',
    'Sushi Master',
    'Yuki Tanaka',
    'Sushi Master',
    '654 Maple Drive, Seattle, WA',
    '+1 (555) 654-3210',
    'https://via.placeholder.com/100x100/EA580C/FFFFFF?text=SM'
);

-- =====================================================
-- VERIFY DATA WAS INSERTED
-- =====================================================

-- Check all OMS customizations
SELECT * FROM oms_customizations ORDER BY created_at DESC;

-- Count total records
SELECT COUNT(*) as total_oms_customizations FROM oms_customizations;
