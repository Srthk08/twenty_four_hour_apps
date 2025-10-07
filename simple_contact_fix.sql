-- SIMPLE CONTACT FORM FIX
-- This will fix the contact form error without any column reference issues

-- 1. Check current table structure
SELECT 
    'Current table structure:' as info,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Add the missing company_name column
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT '';

-- 3. Add other missing columns
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_type VARCHAR(100) DEFAULT 'general';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_details TEXT DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- 4. Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company_name ON contact_submissions(company_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- 5. Grant permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 6. Test inserting a record
INSERT INTO contact_submissions (
    first_name,
    last_name,
    name,
    email,
    phone,
    company_name,
    project_type,
    project_details,
    message,
    subject,
    created_at,
    updated_at
) VALUES (
    'Test',
    'User',
    'Test User',
    'test@example.com',
    '+91 9876543210',
    'Test Company',
    'website',
    'Test project details',
    'Test message content',
    'Test Subject',
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- 7. Verify the table structure
SELECT 
    'Updated table structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 8. Check if company_name column exists
SELECT 
    'company_name column check:' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'company_name' AND table_schema = 'public')
        THEN 'SUCCESS: company_name column now exists'
        ELSE 'ERROR: company_name column still missing'
    END as status;

-- 9. Show sample data
SELECT 
    'Sample data:' as info,
    id,
    first_name,
    last_name,
    name,
    email,
    phone,
    company_name,
    project_type,
    subject,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 3;
