-- UPDATE CONTACT TABLE IN SUPABASE
-- This will directly fix the missing company_name column error

-- 1. First, let's check if the table exists and what columns it has
SELECT 
    'Checking current table structure...' as info,
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

-- 3. Set default value for company_name
ALTER TABLE contact_submissions 
ALTER COLUMN company_name SET DEFAULT '';

-- 4. Add all other missing columns that the contact form needs
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_type VARCHAR(100) DEFAULT 'general';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_details TEXT DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- 5. Update existing records to populate the new columns
UPDATE contact_submissions 
SET 
    first_name = COALESCE(SPLIT_PART(name, ' ', 1), ''),
    last_name = CASE 
        WHEN POSITION(' ' IN name) > 0 THEN SUBSTRING(name FROM POSITION(' ' IN name) + 1)
        ELSE ''
    END,
    company_name = COALESCE(company, ''),
    phone = COALESCE(phone, ''),
    project_type = 'general',
    project_details = COALESCE(message, '')
WHERE first_name IS NULL OR first_name = '';

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company_name ON contact_submissions(company_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_phone ON contact_submissions(phone);

-- 7. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 8. Test inserting a record with the exact data the form sends
INSERT INTO contact_submissions (
    first_name,
    last_name,
    email,
    phone,
    company_name,
    project_type,
    project_details,
    message,
    user_id,
    name,
    subject,
    created_at,
    updated_at
) VALUES (
    'Test',
    'User',
    'test@example.com',
    '+91 9876543210',
    'Test Company',
    'website',
    'Test project details',
    'Test message content',
    NULL,
    'Test User',
    'Test Subject',
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- 9. Verify the table structure after updates
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

-- 10. Check if company_name column now exists
SELECT 
    'company_name column check:' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'company_name' AND table_schema = 'public')
        THEN 'SUCCESS: company_name column now exists'
        ELSE 'ERROR: company_name column still missing'
    END as status;

-- 11. Show sample data
SELECT 
    'Sample data after update:' as info,
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

-- 12. Test selecting data with all the columns the form expects
SELECT 
    'Testing form data selection:' as info,
    id,
    first_name,
    last_name,
    email,
    phone,
    company_name,
    project_type,
    project_details,
    message,
    user_id
FROM contact_submissions
WHERE id IS NOT NULL
LIMIT 1;
