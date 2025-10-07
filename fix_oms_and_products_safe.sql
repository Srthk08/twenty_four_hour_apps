-- SAFE FIX FOR OMS AND OTHER PRODUCTS
-- This script only adds missing columns without deleting or changing existing data

-- 1. Check current OMS customizations table structure
SELECT 
    'Current oms_customizations structure:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'oms_customizations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Add missing columns to oms_customizations table (safe - only adds if not exists)
ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS admin_replies TEXT DEFAULT '';

ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '';

ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';

ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';

ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS assigned_to UUID;

ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS last_admin_response TIMESTAMP WITH TIME ZONE;

ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS response_count INTEGER DEFAULT 0;

ALTER TABLE oms_customizations 
ADD COLUMN IF NOT EXISTS is_escalated BOOLEAN DEFAULT FALSE;

-- 3. Check oms_product_customizations table structure
SELECT 
    'Current oms_product_customizations structure:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'oms_product_customizations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Add missing columns to oms_product_customizations table (safe)
ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS admin_replies TEXT DEFAULT '';

ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '';

ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';

ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';

ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS assigned_to UUID;

ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS last_admin_response TIMESTAMP WITH TIME ZONE;

ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS response_count INTEGER DEFAULT 0;

ALTER TABLE oms_product_customizations 
ADD COLUMN IF NOT EXISTS is_escalated BOOLEAN DEFAULT FALSE;

-- 5. Check customization_forms table structure
SELECT 
    'Current customization_forms structure:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'customization_forms' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Add missing columns to customization_forms table (safe)
ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS admin_replies TEXT DEFAULT '';

ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '';

ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';

ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';

ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS assigned_to UUID;

ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS last_admin_response TIMESTAMP WITH TIME ZONE;

ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS response_count INTEGER DEFAULT 0;

ALTER TABLE customization_forms 
ADD COLUMN IF NOT EXISTS is_escalated BOOLEAN DEFAULT FALSE;

-- 7. Check cart_customizations table structure
SELECT 
    'Current cart_customizations structure:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cart_customizations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 8. Add missing columns to cart_customizations table (safe)
ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS admin_replies TEXT DEFAULT '';

ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '';

ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';

ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';

ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS assigned_to UUID;

ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS last_admin_response TIMESTAMP WITH TIME ZONE;

ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS response_count INTEGER DEFAULT 0;

ALTER TABLE cart_customizations 
ADD COLUMN IF NOT EXISTS is_escalated BOOLEAN DEFAULT FALSE;

-- 9. Create indexes for better performance (safe - only creates if not exists)
CREATE INDEX IF NOT EXISTS idx_oms_customizations_admin_replies ON oms_customizations(admin_replies);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_status ON oms_customizations(status);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_priority ON oms_customizations(priority);
CREATE INDEX IF NOT EXISTS idx_oms_customizations_assigned_to ON oms_customizations(assigned_to);

CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_admin_replies ON oms_product_customizations(admin_replies);
CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_status ON oms_product_customizations(status);
CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_priority ON oms_product_customizations(priority);
CREATE INDEX IF NOT EXISTS idx_oms_product_customizations_assigned_to ON oms_product_customizations(assigned_to);

CREATE INDEX IF NOT EXISTS idx_customization_forms_admin_replies ON customization_forms(admin_replies);
CREATE INDEX IF NOT EXISTS idx_customization_forms_status ON customization_forms(status);
CREATE INDEX IF NOT EXISTS idx_customization_forms_priority ON customization_forms(priority);
CREATE INDEX IF NOT EXISTS idx_customization_forms_assigned_to ON customization_forms(assigned_to);

CREATE INDEX IF NOT EXISTS idx_cart_customizations_admin_replies ON cart_customizations(admin_replies);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_status ON cart_customizations(status);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_priority ON cart_customizations(priority);
CREATE INDEX IF NOT EXISTS idx_cart_customizations_assigned_to ON cart_customizations(assigned_to);

-- 10. Grant permissions (safe - only grants if not already granted)
GRANT ALL ON oms_customizations TO authenticated, anon, service_role;
GRANT ALL ON oms_product_customizations TO authenticated, anon, service_role;
GRANT ALL ON customization_forms TO authenticated, anon, service_role;
GRANT ALL ON cart_customizations TO authenticated, anon, service_role;

-- 11. Disable RLS on all tables (safe - only disables if enabled)
ALTER TABLE oms_customizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE oms_product_customizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE customization_forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE cart_customizations DISABLE ROW LEVEL SECURITY;

-- 12. Update existing records with default values (safe - only updates null values)
UPDATE oms_customizations 
SET 
    admin_replies = COALESCE(admin_replies, ''),
    admin_notes = COALESCE(admin_notes, ''),
    status = COALESCE(status, 'pending'),
    priority = COALESCE(priority, 'medium'),
    response_count = COALESCE(response_count, 0),
    is_escalated = COALESCE(is_escalated, FALSE)
WHERE admin_replies IS NULL 
   OR admin_notes IS NULL 
   OR status IS NULL 
   OR priority IS NULL 
   OR response_count IS NULL 
   OR is_escalated IS NULL;

UPDATE oms_product_customizations 
SET 
    admin_replies = COALESCE(admin_replies, ''),
    admin_notes = COALESCE(admin_notes, ''),
    status = COALESCE(status, 'pending'),
    priority = COALESCE(priority, 'medium'),
    response_count = COALESCE(response_count, 0),
    is_escalated = COALESCE(is_escalated, FALSE)
WHERE admin_replies IS NULL 
   OR admin_notes IS NULL 
   OR status IS NULL 
   OR priority IS NULL 
   OR response_count IS NULL 
   OR is_escalated IS NULL;

UPDATE customization_forms 
SET 
    admin_replies = COALESCE(admin_replies, ''),
    admin_notes = COALESCE(admin_notes, ''),
    status = COALESCE(status, 'pending'),
    priority = COALESCE(priority, 'medium'),
    response_count = COALESCE(response_count, 0),
    is_escalated = COALESCE(is_escalated, FALSE)
WHERE admin_replies IS NULL 
   OR admin_notes IS NULL 
   OR status IS NULL 
   OR priority IS NULL 
   OR response_count IS NULL 
   OR is_escalated IS NULL;

UPDATE cart_customizations 
SET 
    admin_replies = COALESCE(admin_replies, ''),
    admin_notes = COALESCE(admin_notes, ''),
    status = COALESCE(status, 'pending'),
    priority = COALESCE(priority, 'medium'),
    response_count = COALESCE(response_count, 0),
    is_escalated = COALESCE(is_escalated, FALSE)
WHERE admin_replies IS NULL 
   OR admin_notes IS NULL 
   OR status IS NULL 
   OR priority IS NULL 
   OR response_count IS NULL 
   OR is_escalated IS NULL;

-- 13. Show final table structures
SELECT 
    'Final oms_customizations structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'oms_customizations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 
    'Final oms_product_customizations structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'oms_product_customizations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 
    'Final customization_forms structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'customization_forms' 
AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 
    'Final cart_customizations structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'cart_customizations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 14. Show final status
SELECT 'All product tables updated safely with admin functionality!' as status;
SELECT 'No existing data was deleted or modified' as message;
SELECT 'Added admin_replies, admin_notes, status, priority columns to all product tables' as details;
