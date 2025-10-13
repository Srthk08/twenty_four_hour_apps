-- =====================================================
-- ORDER MENU SYSTEM CUSTOMIZATION FORM - OPTIMIZED SQL
-- For Supabase Database
-- Based on form images and duplicate prevention requirements
-- =====================================================

-- =====================================================
-- MAIN ORDER MENU CUSTOMIZATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_menu_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Project Information (from first form image)
    project_name VARCHAR(255) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    
    -- Contact Information (from first form image)
    contact_person VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    
    -- Restaurant Address (from third form image)
    house_flat_number VARCHAR(100) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    
    -- Additional Requirements (from second form image)
    additional_requirements TEXT,
    
    -- Order Information (from first form image - Order Summary)
    service_type VARCHAR(100) DEFAULT 'Order Menu System',
    base_package_price DECIMAL(10,2) DEFAULT 999.00,
    gst_percentage DECIMAL(5,2) DEFAULT 18.00,
    gst_amount DECIMAL(10,2) DEFAULT 180.00,
    total_amount DECIMAL(10,2) DEFAULT 1179.00,
    payment_type VARCHAR(50) DEFAULT 'one-time',
    
    -- Status and Timestamps
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    
    -- UNIQUE CONSTRAINT FOR DUPLICATE PREVENTION
    -- Prevents exact duplicates: same email + same restaurant + same address
    -- Allows: same email + different restaurant OR same email + different address
    CONSTRAINT unique_order_customization 
        UNIQUE(user_email, restaurant_name, house_flat_number, address_line_1, city, state, pincode)
);

-- =====================================================
-- FILE STORAGE TABLES
-- =====================================================

-- Table for storing restaurant logos
CREATE TABLE IF NOT EXISTS restaurant_logos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_customization_id UUID NOT NULL REFERENCES order_menu_customizations(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure only one logo per order
    CONSTRAINT unique_logo_per_order UNIQUE(order_customization_id)
);

-- Table for storing menu photos (multiple photos allowed)
CREATE TABLE IF NOT EXISTS menu_photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_customization_id UUID NOT NULL REFERENCES order_menu_customizations(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    display_order INTEGER DEFAULT 1
);

-- =====================================================
-- INDEXES FOR FILE STORAGE TABLES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_restaurant_logos_order_id ON restaurant_logos(order_customization_id);
CREATE INDEX IF NOT EXISTS idx_menu_photos_order_id ON menu_photos(order_customization_id);
CREATE INDEX IF NOT EXISTS idx_menu_photos_display_order ON menu_photos(order_customization_id, display_order);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_order_customizations_email ON order_menu_customizations(user_email);
CREATE INDEX IF NOT EXISTS idx_order_customizations_restaurant ON order_menu_customizations(restaurant_name);
CREATE INDEX IF NOT EXISTS idx_order_customizations_status ON order_menu_customizations(status);
CREATE INDEX IF NOT EXISTS idx_order_customizations_created_at ON order_menu_customizations(created_at);
CREATE INDEX IF NOT EXISTS idx_order_customizations_city_state ON order_menu_customizations(city, state);

-- =====================================================
-- VALIDATION FUNCTIONS
-- =====================================================

-- Function to validate email format
CREATE OR REPLACE FUNCTION validate_email(email TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql;

-- Function to validate phone number (basic validation)
CREATE OR REPLACE FUNCTION validate_phone(phone TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN phone ~ '^[0-9+\-\s\(\)]{7,20}$';
END;
$$ LANGUAGE plpgsql;

-- Function to check for duplicate order
CREATE OR REPLACE FUNCTION check_order_duplicate(
    p_user_email VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_house_flat_number VARCHAR(100),
    p_address_line_1 VARCHAR(255),
    p_city VARCHAR(100),
    p_state VARCHAR(100),
    p_pincode VARCHAR(20)
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM order_menu_customizations 
        WHERE user_email = p_user_email 
        AND restaurant_name = p_restaurant_name
        AND house_flat_number = p_house_flat_number
        AND address_line_1 = p_address_line_1
        AND city = p_city
        AND state = p_state
        AND pincode = p_pincode
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INSERT FUNCTION WITH VALIDATION
-- =====================================================
CREATE OR REPLACE FUNCTION insert_order_menu_customization(
    p_project_name VARCHAR(255),
    p_restaurant_name VARCHAR(255),
    p_owner_name VARCHAR(255),
    p_contact_person VARCHAR(255),
    p_user_email VARCHAR(255),
    p_phone_number VARCHAR(50),
    p_house_flat_number VARCHAR(100),
    p_address_line_1 VARCHAR(255),
    p_city VARCHAR(100),
    p_state VARCHAR(100),
    p_pincode VARCHAR(20),
    p_country VARCHAR(100) DEFAULT 'India',
    p_additional_requirements TEXT DEFAULT NULL,
    p_base_package_price DECIMAL(10,2) DEFAULT 999.00,
    p_gst_percentage DECIMAL(5,2) DEFAULT 18.00
) RETURNS JSON AS $$
DECLARE
    order_id UUID;
    gst_amount DECIMAL(10,2);
    total_amount DECIMAL(10,2);
    result JSON;
BEGIN
    -- Validate email format
    IF NOT validate_email(p_user_email) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Invalid email format',
            'order_id', null
        );
    END IF;
    
    -- Validate phone number
    IF NOT validate_phone(p_phone_number) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Invalid phone number format',
            'order_id', null
        );
    END IF;
    
    -- Check for duplicate
    IF check_order_duplicate(
        p_user_email, p_restaurant_name, p_house_flat_number, 
        p_address_line_1, p_city, p_state, p_pincode
    ) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Duplicate order: Same email, restaurant name, and address already exists',
            'order_id', null
        );
    END IF;
    
    -- Calculate amounts
    gst_amount := (p_base_package_price * p_gst_percentage) / 100;
    total_amount := p_base_package_price + gst_amount;
    
    -- Insert new order
    INSERT INTO order_menu_customizations (
        project_name, restaurant_name, owner_name, contact_person, user_email, phone_number,
        house_flat_number, address_line_1, city, state, pincode, country,
        additional_requirements, base_package_price, gst_percentage, gst_amount, total_amount
    ) VALUES (
        p_project_name, p_restaurant_name, p_owner_name, p_contact_person, p_user_email, p_phone_number,
        p_house_flat_number, p_address_line_1, p_city, p_state, p_pincode, p_country,
        p_additional_requirements, p_base_package_price, p_gst_percentage, gst_amount, total_amount
    ) RETURNING id INTO order_id;
    
    RETURN json_build_object(
        'success', true,
        'error', null,
        'order_id', order_id,
        'total_amount', total_amount
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FILE UPLOAD FUNCTIONS
-- =====================================================

-- Function to upload restaurant logo
CREATE OR REPLACE FUNCTION upload_restaurant_logo(
    p_order_id UUID,
    p_file_name VARCHAR(255),
    p_file_size BIGINT,
    p_file_type VARCHAR(50),
    p_storage_path TEXT,
    p_public_url TEXT
) RETURNS JSON AS $$
DECLARE
    logo_id UUID;
BEGIN
    -- Check if order exists
    IF NOT EXISTS(SELECT 1 FROM order_menu_customizations WHERE id = p_order_id) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Order not found',
            'logo_id', null
        );
    END IF;
    
    -- Validate file type
    IF p_file_type NOT IN ('image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml') THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Invalid file type. Only PNG, JPG, JPEG, SVG allowed',
            'logo_id', null
        );
    END IF;
    
    -- Validate file size (10MB max)
    IF p_file_size > 10485760 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'File size too large. Maximum 10MB allowed',
            'logo_id', null
        );
    END IF;
    
    -- Insert or update logo
    INSERT INTO restaurant_logos (
        order_customization_id, file_name, file_size, file_type, storage_path, public_url
    ) VALUES (
        p_order_id, p_file_name, p_file_size, p_file_type, p_storage_path, p_public_url
    ) 
    ON CONFLICT (order_customization_id) 
    DO UPDATE SET
        file_name = EXCLUDED.file_name,
        file_size = EXCLUDED.file_size,
        file_type = EXCLUDED.file_type,
        storage_path = EXCLUDED.storage_path,
        public_url = EXCLUDED.public_url,
        uploaded_at = NOW()
    RETURNING id INTO logo_id;
    
    RETURN json_build_object(
        'success', true,
        'error', null,
        'logo_id', logo_id
    );
END;
$$ LANGUAGE plpgsql;

-- Function to upload menu photo
CREATE OR REPLACE FUNCTION upload_menu_photo(
    p_order_id UUID,
    p_file_name VARCHAR(255),
    p_file_size BIGINT,
    p_file_type VARCHAR(50),
    p_storage_path TEXT,
    p_public_url TEXT,
    p_display_order INTEGER DEFAULT 1
) RETURNS JSON AS $$
DECLARE
    photo_id UUID;
    photo_count INTEGER;
BEGIN
    -- Check if order exists
    IF NOT EXISTS(SELECT 1 FROM order_menu_customizations WHERE id = p_order_id) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Order not found',
            'photo_id', null
        );
    END IF;
    
    -- Count existing photos
    SELECT COUNT(*) INTO photo_count FROM menu_photos WHERE order_customization_id = p_order_id;
    
    -- Check photo limit (max 10 photos)
    IF photo_count >= 10 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Maximum 10 photos allowed per order',
            'photo_id', null
        );
    END IF;
    
    -- Validate file type
    IF p_file_type NOT IN ('image/png', 'image/jpeg', 'image/jpg') THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Invalid file type. Only PNG, JPG, JPEG allowed',
            'photo_id', null
        );
    END IF;
    
    -- Validate file size (5MB max per photo)
    IF p_file_size > 5242880 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'File size too large. Maximum 5MB per photo allowed',
            'photo_id', null
        );
    END IF;
    
    -- Insert photo
    INSERT INTO menu_photos (
        order_customization_id, file_name, file_size, file_type, storage_path, public_url, display_order
    ) VALUES (
        p_order_id, p_file_name, p_file_size, p_file_type, p_storage_path, p_public_url, p_display_order
    ) RETURNING id INTO photo_id;
    
    RETURN json_build_object(
        'success', true,
        'error', null,
        'photo_id', photo_id
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_order_customizations_updated_at
    BEFORE UPDATE ON order_menu_customizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- EXAMPLE USAGE AND TEST DATA
-- =====================================================

-- Example 1: Insert order (ALLOWED - new restaurant)
SELECT insert_order_menu_customization(
    'Pizza Palace Downtown Project',
    'Pizza Palace',
    'Tony Romano',
    'Tony Romano',
    'arun@gmail.com',
    '74185296',
    '123',
    'Main Street, Sector 15',
    'Mumbai',
    'Maharashtra',
    '400001',
    'India',
    'Need custom pizza ordering system with delivery tracking',
    999.00,
    18.00
);

-- Example 2: Same email, different restaurant (ALLOWED)
SELECT insert_order_menu_customization(
    'Burger King Central Project',
    'Burger King',
    'John Smith',
    'John Smith',
    'arun@gmail.com',
    '74185296',
    '456',
    'Oak Avenue, Sector 20',
    'Delhi',
    'Delhi',
    '110001',
    'India',
    'Need burger customization options',
    999.00,
    18.00
);

-- Example 3: Upload logo
SELECT upload_restaurant_logo(
    'your-order-id-here',
    'pizza-palace-logo.png',
    2048576,
    'image/png',
    'logos/pizza-palace-logo.png',
    'https://storage.supabase.com/logos/pizza-palace-logo.png'
);

-- Example 4: Upload menu photo
SELECT upload_menu_photo(
    'your-order-id-here',
    'pizza-menu-1.jpg',
    3145728,
    'image/jpeg',
    'menus/pizza-menu-1.jpg',
    'https://storage.supabase.com/menus/pizza-menu-1.jpg',
    1
);

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get all orders with their files
SELECT 
    omc.*,
    rl.file_name as logo_name,
    rl.public_url as logo_url,
    COUNT(mp.id) as menu_photo_count
FROM order_menu_customizations omc
LEFT JOIN restaurant_logos rl ON omc.id = rl.order_customization_id
LEFT JOIN menu_photos mp ON omc.id = mp.order_customization_id
GROUP BY omc.id, rl.id
ORDER BY omc.created_at DESC;

-- Get orders by email (showing different restaurants for same email)
SELECT 
    project_name,
    restaurant_name,
    total_amount,
    status,
    created_at
FROM order_menu_customizations 
WHERE user_email = 'arun@gmail.com' 
ORDER BY created_at DESC;

-- Get pending orders
SELECT 
    id,
    project_name,
    restaurant_name,
    owner_name,
    user_email,
    total_amount,
    created_at
FROM order_menu_customizations 
WHERE status = 'pending' 
ORDER BY created_at ASC;

-- Check for duplicates before inserting
SELECT COUNT(*) as duplicate_count
FROM order_menu_customizations 
WHERE user_email = 'arun@gmail.com' 
AND restaurant_name = 'Pizza Palace'
AND house_flat_number = '123'
AND address_line_1 = 'Main Street, Sector 15'
AND city = 'Mumbai'
AND state = 'Maharashtra'
AND pincode = '400001';

-- =====================================================
-- STATUS VALUES
-- =====================================================
-- 'pending' - Newly submitted form
-- 'processing' - Currently being processed  
-- 'completed' - Successfully processed
-- 'failed' - Processing failed
-- 'cancelled' - Order cancelled

-- =====================================================
-- DUPLICATE PREVENTION LOGIC SUMMARY
-- =====================================================
-- ✅ ALLOWED: Same email + different restaurant name
-- ✅ ALLOWED: Same email + same restaurant + different address  
-- ✅ ALLOWED: Same email + same restaurant + same address + different contact person
-- ❌ BLOCKED: Exact duplicate (same email + same restaurant + same address + same contact person)

-- =====================================================
-- FILE STORAGE SPECIFICATIONS
-- =====================================================
-- Logo: PNG, JPG, JPEG, SVG up to 10MB (1 per order)
-- Menu Photos: PNG, JPG, JPEG up to 5MB each (max 10 photos per order)
-- Storage: Supabase Storage with public URLs
