-- Fix Contact Form Error
-- This adds the missing company_name column and fixes the contact form

-- 1. First, let's see the current structure of contact_submissions table
SELECT 
    'Current contact_submissions columns:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Add the missing company_name column
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255);

-- 3. Update existing records to copy company data to company_name
UPDATE contact_submissions 
SET company_name = company 
WHERE company_name IS NULL AND company IS NOT NULL;

-- 4. Make company_name NOT NULL and add default value
ALTER TABLE contact_submissions 
ALTER COLUMN company_name SET DEFAULT '';

-- 5. Update the table structure to match what the contact form expects
-- Add any other missing columns that might be needed
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS message_type VARCHAR(50) DEFAULT 'general';

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS source VARCHAR(100) DEFAULT 'contact_form';

-- 6. Create an index on company_name for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company_name 
ON contact_submissions(company_name);

-- 7. Update the table to ensure all required columns exist
-- Check what columns the contact form actually needs
DO $$
BEGIN
    -- Add any missing columns that might be referenced in the contact form
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'contact_submissions' 
                   AND column_name = 'created_at') THEN
        ALTER TABLE contact_submissions ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'contact_submissions' 
                   AND column_name = 'updated_at') THEN
        ALTER TABLE contact_submissions ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'contact_submissions' 
                   AND column_name = 'status') THEN
        ALTER TABLE contact_submissions ADD COLUMN status VARCHAR(50) DEFAULT 'new';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'contact_submissions' 
                   AND column_name = 'priority') THEN
        ALTER TABLE contact_submissions ADD COLUMN priority VARCHAR(20) DEFAULT 'medium';
    END IF;
END $$;

-- 8. Create a function to handle contact form submissions
CREATE OR REPLACE FUNCTION submit_contact_form(
    p_name VARCHAR(255),
    p_email VARCHAR(255),
    p_phone VARCHAR(20) DEFAULT NULL,
    p_company_name VARCHAR(255) DEFAULT NULL,
    p_subject VARCHAR(255),
    p_message TEXT,
    p_message_type VARCHAR(50) DEFAULT 'general',
    p_source VARCHAR(100) DEFAULT 'contact_form'
)
RETURNS JSON AS $$
DECLARE
    result_id UUID;
    result JSON;
BEGIN
    -- Insert the contact submission
    INSERT INTO contact_submissions (
        name,
        email,
        phone_number,
        company_name,
        subject,
        message,
        message_type,
        source,
        status,
        priority,
        created_at,
        updated_at
    ) VALUES (
        p_name,
        p_email,
        p_phone,
        p_company_name,
        p_subject,
        p_message,
        p_message_type,
        p_source,
        'new',
        'medium',
        NOW(),
        NOW()
    ) RETURNING id INTO result_id;
    
    -- Return success response
    result := json_build_object(
        'success', true,
        'message', 'Contact form submitted successfully',
        'id', result_id,
        'name', p_name,
        'email', p_email
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Return error response
        result := json_build_object(
            'success', false,
            'message', 'Error submitting contact form: ' || SQLERRM,
            'error_code', SQLSTATE
        );
        
        RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Grant execute permission
GRANT EXECUTE ON FUNCTION submit_contact_form TO authenticated;
GRANT EXECUTE ON FUNCTION submit_contact_form TO anon;

-- 10. Test the function
SELECT 'Testing contact form function...' as info;

-- Test with sample data
SELECT submit_contact_form(
    'Test User',
    'test@example.com',
    '+91 9876543210',
    'Test Company',
    'Test Subject',
    'This is a test message',
    'general',
    'contact_form'
) as test_result;

-- 11. Verify the table structure after changes
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

-- 12. Check if there are any existing contact submissions
SELECT 
    'Existing contact submissions:' as info,
    COUNT(*) as count
FROM contact_submissions;

-- 13. Show sample contact submissions
SELECT 
    'Sample contact submissions:' as info,
    id,
    name,
    email,
    company_name,
    subject,
    status,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 5;
