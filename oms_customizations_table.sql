-- =====================================================
-- OMS CUSTOMIZATIONS TABLE - COMPLETE SQL QUERY
-- Handles duplicate prevention and file storage
-- =====================================================

-- CREATE OMS CUSTOMIZATIONS TABLE
CREATE TABLE IF NOT EXISTS oms_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    restaurant_address TEXT NOT NULL,
    phone_number VARCHAR(50),
    logo_url TEXT,
    logo_storage_path TEXT,
    menu_photo_url TEXT,
    menu_photo_storage_path TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    
    -- UNIQUE CONSTRAINT TO PREVENT DUPLICATES
    -- Same email + project + restaurant = DUPLICATE (BLOCKED)
    -- Same email + different project/restaurant = ALLOWED
    UNIQUE(user_email, project_name, restaurant_name)
);

-- CREATE INDEXES FOR BETTER PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_oms_customizations_email ON oms_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_status ON oms_customizations(status);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_created_at ON oms_customizations(created_at);

-- =====================================================
-- EXAMPLE DATA INSERTION
-- =====================================================

-- Example 1: Insert OMS customization (ALLOWED - different project)
INSERT INTO oms_customizations (
    user_email, project_name, owner_name, restaurant_name, 
    restaurant_address, phone_number, logo_url, menu_photo_url
) VALUES (
    'john@restaurant.com',
    'Pizza Palace Downtown',
    'John Smith',
    'Pizza Palace',
    '123 Main St, New York, NY',
    '+1-555-123-4567',
    'https://storage.supabase.com/logos/pizza-palace-logo.png',
    'https://storage.supabase.com/menus/pizza-palace-menu.jpg'
);

-- Example 2: Same email, different project (ALLOWED)
INSERT INTO oms_customizations (
    user_email, project_name, owner_name, restaurant_name, 
    restaurant_address, phone_number, logo_url, menu_photo_url
) VALUES (
    'john@restaurant.com',
    'Burger King Central',
    'John Smith',
    'Burger King',
    '456 Oak Ave, Los Angeles, CA',
    '+1-555-987-6543',
    'https://storage.supabase.com/logos/burger-king-logo.png',
    'https://storage.supabase.com/menus/burger-king-menu.jpg'
);

-- Example 3: Exact duplicate (BLOCKED - will cause error)
-- INSERT INTO oms_customizations (
--     user_email, project_name, owner_name, restaurant_name, 
--     restaurant_address, phone_number, logo_url, menu_photo_url
-- ) VALUES (
--     'john@restaurant.com',
--     'Pizza Palace Downtown',
--     'John Smith',
--     'Pizza Palace',
--     '123 Main St, New York, NY',
--     '+1-555-123-4567',
--     'https://storage.supabase.com/logos/pizza-palace-logo.png',
--     'https://storage.supabase.com/menus/pizza-palace-menu.jpg'
-- );
-- ERROR: duplicate key value violates unique constraint

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get all OMS customizations
SELECT * FROM oms_customizations ORDER BY created_at DESC;

-- Get OMS customizations by email (same email, different projects)
SELECT * FROM oms_customizations 
WHERE user_email = 'john@restaurant.com' 
ORDER BY created_at DESC;

-- Get pending OMS customizations
SELECT * FROM oms_customizations 
WHERE status = 'pending' 
ORDER BY created_at ASC;

-- Update OMS status
UPDATE oms_customizations 
SET 
    status = 'completed',
    updated_at = NOW(),
    processed_at = NOW()
WHERE id = 'your-oms-id-here';

-- Check for duplicates before inserting
SELECT COUNT(*) FROM oms_customizations 
WHERE user_email = 'john@restaurant.com' 
AND project_name = 'Pizza Palace Downtown' 
AND restaurant_name = 'Pizza Palace';

-- =====================================================
-- STATUS VALUES
-- =====================================================
-- 'pending' - Newly submitted form
-- 'processing' - Currently being processed
-- 'completed' - Successfully processed
-- 'failed' - Processing failed

-- =====================================================
-- FILE STORAGE NOTES
-- =====================================================
-- logo_url: Public URL to access the logo file
-- logo_storage_path: Internal storage path in Supabase
-- menu_photo_url: Public URL to access the menu photo
-- menu_photo_storage_path: Internal storage path in Supabase
