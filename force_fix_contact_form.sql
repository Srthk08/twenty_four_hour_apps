-- FORCE FIX: Contact Form Error
-- This will definitely fix the contact form by recreating the table if needed

-- 1. First, let's see what we're working with
SELECT 'Starting contact form fix...' as info;

-- 2. Check if the table exists and what columns it has
SELECT 
    'Current table structure:' as info,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. If company_name column doesn't exist, add it
DO $$
BEGIN
    -- Check if company_name column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'contact_submissions' 
        AND column_name = 'company_name' 
        AND table_schema = 'public'
    ) THEN
        -- Add the missing column
        ALTER TABLE contact_submissions ADD COLUMN company_name VARCHAR(255) DEFAULT '';
        RAISE NOTICE 'Added company_name column';
    ELSE
        RAISE NOTICE 'company_name column already exists';
    END IF;
END $$;

-- 4. Add all other missing columns that the form might need
DO $$
BEGIN
    -- Add first_name if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'first_name' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN first_name VARCHAR(255) DEFAULT '';
        RAISE NOTICE 'Added first_name column';
    END IF;
    
    -- Add last_name if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'last_name' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN last_name VARCHAR(255) DEFAULT '';
        RAISE NOTICE 'Added last_name column';
    END IF;
    
    -- Add project_type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'project_type' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN project_type VARCHAR(100) DEFAULT 'general';
        RAISE NOTICE 'Added project_type column';
    END IF;
    
    -- Add project_details if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'project_details' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN project_details TEXT DEFAULT '';
        RAISE NOTICE 'Added project_details column';
    END IF;
    
    -- Add user_id if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'user_id' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN user_id UUID;
        RAISE NOTICE 'Added user_id column';
    END IF;
    
    -- Add phone_number if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'phone_number' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN phone_number VARCHAR(20);
        RAISE NOTICE 'Added phone_number column';
    END IF;
END $$;

-- 5. Update existing records to populate new columns
UPDATE contact_submissions 
SET 
    first_name = SPLIT_PART(name, ' ', 1),
    last_name = CASE 
        WHEN POSITION(' ' IN name) > 0 THEN SUBSTRING(name FROM POSITION(' ' IN name) + 1)
        ELSE ''
    END,
    company_name = COALESCE(company, ''),
    project_type = 'general',
    project_details = COALESCE(message, ''),
    phone_number = COALESCE(phone, '')
WHERE first_name IS NULL OR first_name = '';

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company_name ON contact_submissions(company_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- 7. Grant necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;

-- 8. Test inserting a record with all the fields the form expects
DO $$
DECLARE
    test_id UUID;
BEGIN
    INSERT INTO contact_submissions (
        first_name,
        last_name,
        name,
        email,
        phone_number,
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
        'Test message content',
        'Test Subject',
        NULL,
        'new',
        'medium',
        NOW(),
        NOW()
    ) RETURNING id INTO test_id;
    
    RAISE NOTICE 'SUCCESS: Test record inserted with ID: %', test_id;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR inserting test record: %', SQLERRM;
END $$;

-- 9. Verify the final table structure
SELECT 
    'Final table structure after fix:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 10. Show sample data
SELECT 
    'Sample data after fix:' as info,
    id,
    first_name,
    last_name,
    name,
    email,
    company_name,
    project_type,
    subject,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 3;
