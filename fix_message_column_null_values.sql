-- FIX MESSAGE COLUMN NULL VALUES
-- This will update existing null values before making the column NOT NULL

-- 1. Check current null values in message column
SELECT 
    'Checking null values in message column:' as info,
    COUNT(*) as total_records,
    COUNT(CASE WHEN message IS NULL THEN 1 END) as null_message_count
FROM contact_submissions;

-- 2. Update all null message values to empty string
UPDATE contact_submissions 
SET message = ''
WHERE message IS NULL;

-- 3. Update all null email values to empty string (if any)
UPDATE contact_submissions 
SET email = ''
WHERE email IS NULL;

-- 4. Update other potentially null columns
UPDATE contact_submissions 
SET 
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
WHERE first_name IS NULL 
   OR last_name IS NULL 
   OR name IS NULL 
   OR phone IS NULL 
   OR company_name IS NULL 
   OR project_type IS NULL 
   OR project_details IS NULL 
   OR subject IS NULL 
   OR status IS NULL 
   OR priority IS NULL;

-- 5. Verify no null values remain
SELECT 
    'After updating null values:' as info,
    COUNT(*) as total_records,
    COUNT(CASE WHEN message IS NULL THEN 1 END) as null_message_count,
    COUNT(CASE WHEN email IS NULL THEN 1 END) as null_email_count
FROM contact_submissions;

-- 6. Now make the columns NOT NULL
ALTER TABLE contact_submissions 
ALTER COLUMN message SET NOT NULL;

ALTER TABLE contact_submissions 
ALTER COLUMN email SET NOT NULL;

-- 7. Set default values for other columns
ALTER TABLE contact_submissions 
ALTER COLUMN first_name SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN last_name SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN name SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN phone SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN company_name SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN project_type SET DEFAULT 'general';

ALTER TABLE contact_submissions 
ALTER COLUMN project_details SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN subject SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN status SET DEFAULT 'new';

ALTER TABLE contact_submissions 
ALTER COLUMN priority SET DEFAULT 'medium';

-- 8. Test inserting a new record
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

-- 9. Verify the final table structure
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

-- 10. Test selecting data
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

-- 11. Show final status
SELECT 'Contact submissions table fixed successfully!' as status;
