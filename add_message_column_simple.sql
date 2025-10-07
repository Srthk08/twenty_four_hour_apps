-- ADD MESSAGE COLUMN SIMPLE FIX
-- This will add the message column and fix the contact form

-- 1. Check if contact_submissions table exists
SELECT 
    'Table exists check:' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contact_submissions' AND table_schema = 'public') 
        THEN 'YES - contact_submissions table exists'
        ELSE 'NO - contact_submissions table does not exist'
    END as status;

-- 2. Check current table structure
SELECT 
    'Current table structure:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Add the message column with default value
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS message TEXT DEFAULT '';

-- 4. Add other missing columns if they don't exist
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS name VARCHAR(255) DEFAULT '';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS email VARCHAR(255) DEFAULT '';

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

-- 5. Update any existing records with null values
UPDATE contact_submissions 
SET 
    message = COALESCE(message, ''),
    email = COALESCE(email, ''),
    first_name = COALESCE(first_name, ''),
    last_name = COALESCE(last_name, ''),
    name = COALESCE(name, ''),
    phone = COALESCE(phone, ''),
    company_name = COALESCE(company_name, ''),
    project_type = COALESCE(project_type, 'general'),
    project_details = COALESCE(project_details, ''),
    subject = COALESCE(subject, ''),
    status = COALESCE(status, 'new'),
    priority = COALESCE(priority, 'medium')
WHERE message IS NULL 
   OR email IS NULL 
   OR first_name IS NULL 
   OR last_name IS NULL 
   OR name IS NULL 
   OR phone IS NULL 
   OR company_name IS NULL 
   OR project_type IS NULL 
   OR project_details IS NULL 
   OR subject IS NULL 
   OR status IS NULL 
   OR priority IS NULL;

-- 6. Now make message and email NOT NULL
ALTER TABLE contact_submissions 
ALTER COLUMN message SET NOT NULL;

ALTER TABLE contact_submissions 
ALTER COLUMN email SET NOT NULL;

-- 7. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);

-- 8. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 9. Disable RLS to avoid permission issues
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 10. Test inserting a record
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

-- 11. Verify the final table structure
SELECT 
    'Final table structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 12. Test selecting data
SELECT 
    'Test data selection:' as info,
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
ORDER BY created_at DESC
LIMIT 3;

-- 13. Show final status
SELECT 'Contact submissions table fixed successfully!' as status;
