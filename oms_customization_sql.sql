-- =====================================================
-- OMS CUSTOMIZATION FORM SQL QUERIES
-- Handles duplicate prevention and file storage
-- =====================================================

-- 1. CREATE OMS CUSTOMIZATIONS TABLE (if not exists)
-- This table stores OMS customization form data
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
    
    -- Unique constraint to prevent exact duplicates
    UNIQUE(user_email, project_name, restaurant_name)
);

-- 2. CREATE FILE STORAGE TABLE (if not exists)
-- This table stores file metadata for logos and menu photos
CREATE TABLE IF NOT EXISTS oms_file_storage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    oms_customization_id UUID REFERENCES oms_customizations(id) ON DELETE CASCADE,
    file_type VARCHAR(50) NOT NULL, -- 'logo' or 'menu_photo'
    original_filename VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    storage_path TEXT NOT NULL,
    public_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREATE INDEXES FOR BETTER PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_oms_customizations_email ON oms_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_status ON oms_customizations(status);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_created_at ON oms_customizations(created_at);
CREATE INDEX IF NOT EXISTS idx_oms_file_storage_oms_id ON oms_file_storage(oms_customization_id);
CREATE INDEX IF NOT EXISTS idx_oms_file_storage_type ON oms_file_storage(file_type);

-- =====================================================
-- FUNCTIONS FOR DUPLICATE HANDLING
-- =====================================================

-- 4. FUNCTION TO CHECK FOR DUPLICATE OMS FORM
CREATE OR REPLACE FUNCTION check_oms_duplicate(
    p_user_email VARCHAR(255),
    p_project_name VARCHAR(255),
    p_restaurant_name VARCHAR(255)
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM oms_customizations 
        WHERE user_email = p_user_email 
        AND project_name = p_project_name 
        AND restaurant_name = p_restaurant_name
    );
END;
$$ LANGUAGE plpgsql;

-- 5. FUNCTION TO INSERT OMS CUSTOMIZATION WITH DUPLICATE CHECK
CREATE OR REPLACE FUNCTION insert_oms_customization(
    p_user_email VARCHAR(255),
    p_project_name VARCHAR(255),
    p_owner_name VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_restaurant_address TEXT,
    p_phone_number VARCHAR(50),
    p_logo_url TEXT DEFAULT NULL,
    p_logo_storage_path TEXT DEFAULT NULL,
    p_menu_photo_url TEXT DEFAULT NULL,
    p_menu_photo_storage_path TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    oms_id UUID;
BEGIN
    -- Check for duplicate
    IF check_oms_duplicate(p_user_email, p_project_name, p_restaurant_name) THEN
        RAISE EXCEPTION 'Duplicate OMS customization form: Same email, project name, and restaurant name already exists';
    END IF;
    
    -- Insert new OMS customization
    INSERT INTO oms_customizations (
        user_email, project_name, owner_name, restaurant_name, 
        restaurant_address, phone_number, logo_url, logo_storage_path,
        menu_photo_url, menu_photo_storage_path
    ) VALUES (
        p_user_email, p_project_name, p_owner_name, p_restaurant_name,
        p_restaurant_address, p_phone_number, p_logo_url, p_logo_storage_path,
        p_menu_photo_url, p_menu_photo_storage_path
    ) RETURNING id INTO oms_id;
    
    RETURN oms_id;
END;
$$ LANGUAGE plpgsql;

-- 6. FUNCTION TO INSERT FILE METADATA
CREATE OR REPLACE FUNCTION insert_oms_file(
    p_oms_customization_id UUID,
    p_file_type VARCHAR(50),
    p_original_filename VARCHAR(255),
    p_file_size BIGINT,
    p_mime_type VARCHAR(100),
    p_storage_path TEXT,
    p_public_url TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    file_id UUID;
BEGIN
    INSERT INTO oms_file_storage (
        oms_customization_id, file_type, original_filename, 
        file_size, mime_type, storage_path, public_url
    ) VALUES (
        p_oms_customization_id, p_file_type, p_original_filename,
        p_file_size, p_mime_type, p_storage_path, p_public_url
    ) RETURNING id INTO file_id;
    
    RETURN file_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- QUERIES FOR APPLICATION USE
-- =====================================================

-- 7. QUERY TO GET ALL OMS CUSTOMIZATIONS WITH FILE INFO
SELECT 
    oc.id,
    oc.user_email,
    oc.project_name,
    oc.owner_name,
    oc.restaurant_name,
    oc.restaurant_address,
    oc.phone_number,
    oc.logo_url,
    oc.menu_photo_url,
    oc.status,
    oc.created_at,
    oc.updated_at,
    oc.processed_at,
    -- Logo file info
    logo_file.original_filename as logo_filename,
    logo_file.file_size as logo_file_size,
    logo_file.public_url as logo_public_url,
    -- Menu photo file info
    menu_file.original_filename as menu_filename,
    menu_file.file_size as menu_file_size,
    menu_file.public_url as menu_public_url
FROM oms_customizations oc
LEFT JOIN oms_file_storage logo_file ON oc.id = logo_file.oms_customization_id AND logo_file.file_type = 'logo'
LEFT JOIN oms_file_storage menu_file ON oc.id = menu_file.oms_customization_id AND menu_file.file_type = 'menu_photo'
ORDER BY oc.created_at DESC;

-- 8. QUERY TO GET OMS CUSTOMIZATIONS BY EMAIL (same email, different projects)
SELECT 
    oc.id,
    oc.project_name,
    oc.restaurant_name,
    oc.status,
    oc.created_at,
    logo_file.public_url as logo_url,
    menu_file.public_url as menu_photo_url
FROM oms_customizations oc
LEFT JOIN oms_file_storage logo_file ON oc.id = logo_file.oms_customization_id AND logo_file.file_type = 'logo'
LEFT JOIN oms_file_storage menu_file ON oc.id = menu_file.oms_customization_id AND menu_file.file_type = 'menu_photo'
WHERE oc.user_email = $1
ORDER BY oc.created_at DESC;

-- 9. QUERY TO GET PENDING OMS CUSTOMIZATIONS
SELECT 
    oc.id,
    oc.user_email,
    oc.project_name,
    oc.restaurant_name,
    oc.status,
    oc.created_at,
    logo_file.public_url as logo_url,
    menu_file.public_url as menu_photo_url
FROM oms_customizations oc
LEFT JOIN oms_file_storage logo_file ON oc.id = logo_file.oms_customization_id AND logo_file.file_type = 'logo'
LEFT JOIN oms_file_storage menu_file ON oc.id = menu_file.oms_customization_id AND menu_file.file_type = 'menu_photo'
WHERE oc.status = 'pending'
ORDER BY oc.created_at ASC;

-- 10. QUERY TO UPDATE OMS STATUS
UPDATE oms_customizations 
SET 
    status = $2,
    updated_at = NOW(),
    processed_at = CASE WHEN $2 = 'completed' THEN NOW() ELSE processed_at END
WHERE id = $1;

-- =====================================================
-- EXAMPLE USAGE
-- =====================================================

-- Example 1: Insert new OMS customization with files
-- SELECT insert_oms_customization(
--     'john@restaurant.com',
--     'Pizza Palace Downtown',
--     'John Smith',
--     'Pizza Palace',
--     '123 Main St, New York, NY',
--     '+1-555-123-4567',
--     'https://storage.supabase.com/logos/pizza-palace-logo.png',
--     'logos/pizza-palace-logo.png',
--     'https://storage.supabase.com/menus/pizza-palace-menu.jpg',
--     'menus/pizza-palace-menu.jpg'
-- );

-- Example 2: Insert file metadata for logo
-- SELECT insert_oms_file(
--     'oms-id-here',
--     'logo',
--     'pizza-palace-logo.png',
--     245760,
--     'image/png',
--     'logos/pizza-palace-logo.png',
--     'https://storage.supabase.com/logos/pizza-palace-logo.png'
-- );

-- Example 3: Insert file metadata for menu photo
-- SELECT insert_oms_file(
--     'oms-id-here',
--     'menu_photo',
--     'pizza-palace-menu.jpg',
--     1024000,
--     'image/jpeg',
--     'menus/pizza-palace-menu.jpg',
--     'https://storage.supabase.com/menus/pizza-palace-menu.jpg'
-- );

-- =====================================================
-- CLEANUP QUERIES (Optional)
-- =====================================================

-- Query to find potential duplicates (same email, different projects)
-- SELECT 
--     user_email,
--     COUNT(*) as project_count,
--     STRING_AGG(project_name, ', ') as projects
-- FROM oms_customizations 
-- GROUP BY user_email 
-- HAVING COUNT(*) > 1
-- ORDER BY project_count DESC;

-- Query to get file storage usage
-- SELECT 
--     file_type,
--     COUNT(*) as file_count,
--     SUM(file_size) as total_size_bytes,
--     ROUND(SUM(file_size) / 1024.0 / 1024.0, 2) as total_size_mb
-- FROM oms_file_storage 
-- GROUP BY file_type;
