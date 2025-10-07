-- FINAL FIX: Contact Form Error
-- This will fix all column mismatches between the form and database

-- 1. First, let's see what we have
SELECT 'Starting final contact form fix...' as info;

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

-- 3. Add ALL missing columns that the form sends
DO $$
BEGIN
    -- Add company_name (the main missing column)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'company_name' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN company_name VARCHAR(255) DEFAULT '';
        RAISE NOTICE 'Added company_name column';
    END IF;
    
    -- Add first_name
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'first_name' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN first_name VARCHAR(255) DEFAULT '';
        RAISE NOTICE 'Added first_name column';
    END IF;
    
    -- Add last_name
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'last_name' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN last_name VARCHAR(255) DEFAULT '';
        RAISE NOTICE 'Added last_name column';
    END IF;
    
    -- Add phone (the form sends 'phone', not 'phone_number')
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'phone' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN phone VARCHAR(20);
        RAISE NOTICE 'Added phone column';
    END IF;
    
    -- Add project_type
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'project_type' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN project_type VARCHAR(100) DEFAULT 'general';
        RAISE NOTICE 'Added project_type column';
    END IF;
    
    -- Add project_details
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'project_details' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN project_details TEXT DEFAULT '';
        RAISE NOTICE 'Added project_details column';
    END IF;
    
    -- Add user_id
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'user_id' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN user_id UUID;
        RAISE NOTICE 'Added user_id column';
    END IF;
    
    -- Add status if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'status' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN status VARCHAR(50) DEFAULT 'new';
        RAISE NOTICE 'Added status column';
    END IF;
    
    -- Add priority if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'priority' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN priority VARCHAR(20) DEFAULT 'medium';
        RAISE NOTICE 'Added priority column';
    END IF;
    
    -- Add created_at if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'created_at' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added created_at column';
    END IF;
    
    -- Add updated_at if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'updated_at' AND table_schema = 'public') THEN
        ALTER TABLE contact_submissions ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column';
    END IF;
END $$;

-- 4. Update existing records to populate new columns
UPDATE contact_submissions 
SET 
    first_name = COALESCE(SPLIT_PART(name, ' ', 1), ''),
    last_name = CASE 
        WHEN POSITION(' ' IN name) > 0 THEN SUBSTRING(name FROM POSITION(' ' IN name) + 1)
        ELSE ''
    END,
    company_name = COALESCE(company, ''),
    phone = COALESCE(phone_number, ''),
    project_type = 'general',
    project_details = COALESCE(message, ''),
    status = COALESCE(status, 'new'),
    priority = COALESCE(priority, 'medium'),
    created_at = COALESCE(created_at, NOW()),
    updated_at = COALESCE(updated_at, NOW())
WHERE first_name IS NULL OR first_name = '';

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company_name ON contact_submissions(company_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_phone ON contact_submissions(phone);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- 6. Grant all necessary permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO service_role;

-- 7. Test inserting a record with EXACTLY the data the form sends
DO $$
DECLARE
    test_id UUID;
BEGIN
    -- This simulates exactly what the contact form sends
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
        status,
        priority,
        created_at,
        updated_at
    ) VALUES (
        'John',
        'Doe',
        'john.doe@example.com',
        '+91 9876543210',
        'Test Company Ltd',
        'website',
        'Need a professional website for my restaurant',
        'I need a professional website for my restaurant business. Please contact me for more details.',
        NULL,
        'John Doe',
        'Website Development Inquiry',
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

-- 8. Verify the final table structure
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

-- 9. Show sample data
SELECT 
    'Sample data after fix:' as info,
    id,
    first_name,
    last_name,
    name,
    email,
    phone,
    company_name,
    project_type,
    subject,
    status,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 3;

-- 10. Test selecting data with the exact columns the form expects
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
