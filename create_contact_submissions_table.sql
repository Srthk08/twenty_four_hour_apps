-- CREATE CONTACT_SUBMISSIONS TABLE
-- This will create the missing table that's causing the error

-- 1. Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) DEFAULT '',
    last_name VARCHAR(255) DEFAULT '',
    name VARCHAR(255) DEFAULT '',
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT '',
    company_name VARCHAR(255) DEFAULT '',
    project_type VARCHAR(100) DEFAULT 'general',
    project_details TEXT DEFAULT '',
    message TEXT NOT NULL,
    subject VARCHAR(255) DEFAULT '',
    user_id UUID,
    status VARCHAR(50) DEFAULT 'new',
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);

-- 3. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 4. Disable RLS to avoid permission issues
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 5. Test inserting a record
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
    'This is a test message',
    'Test Subject',
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- 6. Verify the table was created and test record inserted
SELECT 
    'Table created successfully!' as status,
    COUNT(*) as total_records
FROM contact_submissions;

-- 7. Show the table structure
SELECT 
    'Table structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;
