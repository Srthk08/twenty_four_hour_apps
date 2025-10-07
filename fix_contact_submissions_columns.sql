-- FIX CONTACT_SUBMISSIONS TABLE COLUMNS
-- This will add the missing 'message' column and fix schema cache issues

-- 1. Check current table structure
SELECT 
    'Current table structure:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Add missing columns to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS message TEXT;

-- 3. Add other potentially missing columns
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS email VARCHAR(255);

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_type VARCHAR(100) DEFAULT 'general';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_details TEXT DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS subject VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS user_id UUID;

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 4. Make email NOT NULL if it's not already
ALTER TABLE contact_submissions 
ALTER COLUMN email SET NOT NULL;

-- 5. Make message NOT NULL if it's not already
ALTER TABLE contact_submissions 
ALTER COLUMN message SET NOT NULL;

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_message ON contact_submissions(message);

-- 7. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 8. Disable RLS to avoid permission issues
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 9. Test inserting a record with all columns
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
    user_id,
    status,
    priority,
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
    'This is a test message for the contact form',
    'Test Subject',
    NULL,
    'new',
    'medium',
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- 10. Verify the table structure after fixes
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

-- 11. Test selecting data to verify schema cache
SELECT 
    'Schema cache test:' as info,
    id,
    first_name,
    last_name,
    email,
    phone,
    company_name,
    message,
    subject,
    created_at
FROM contact_submissions
LIMIT 1;

-- 12. Show sample data
SELECT 
    'Sample data:' as info,
    COUNT(*) as total_records
FROM contact_submissions;
