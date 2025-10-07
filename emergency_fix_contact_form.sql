-- EMERGENCY FIX: Add Missing company_name Column
-- This will immediately fix the contact form error

-- 1. First, let's see what columns actually exist in contact_submissions
SELECT 
    'Current contact_submissions columns:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Add the missing company_name column immediately
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255);

-- 3. Set a default value for the new column
ALTER TABLE contact_submissions 
ALTER COLUMN company_name SET DEFAULT '';

-- 4. Update existing records to copy company data to company_name
UPDATE contact_submissions 
SET company_name = COALESCE(company, '') 
WHERE company_name IS NULL;

-- 5. Add other missing columns that the form might need
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_type VARCHAR(100) DEFAULT 'general';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_details TEXT DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- 6. Create an index on company_name for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company_name 
ON contact_submissions(company_name);

-- 7. Verify the column was added
SELECT 
    'Updated contact_submissions columns:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 8. Test inserting a record with company_name
INSERT INTO contact_submissions (
    name,
    email,
    company_name,
    subject,
    message,
    created_at,
    updated_at
) VALUES (
    'Test User',
    'test@example.com',
    'Test Company',
    'Test Subject',
    'This is a test message',
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- 9. Verify the test record was inserted
SELECT 
    'Test record verification:' as info,
    id,
    name,
    email,
    company_name,
    subject,
    created_at
FROM contact_submissions
WHERE email = 'test@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- 10. Check if there are any existing contact submissions
SELECT 
    'Total contact submissions:' as info,
    COUNT(*) as count
FROM contact_submissions;

-- 11. Show sample data
SELECT 
    'Sample contact submissions:' as info,
    id,
    name,
    email,
    company_name,
    subject,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 5;
