-- Fix Contact Form Column Mismatch
-- This aligns the database columns with what the contact form expects

-- 1. First, let's see what columns the contact form is trying to use
-- Based on the code analysis, the form expects these columns:
-- first_name, last_name, email, phone, company_name, project_type, project_details, message, user_id

-- 2. Add missing columns to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255);

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255);

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_type VARCHAR(100);

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS project_details TEXT;

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id);

-- 3. Update existing records to split name into first_name and last_name
UPDATE contact_submissions 
SET 
    first_name = SPLIT_PART(name, ' ', 1),
    last_name = CASE 
        WHEN POSITION(' ' IN name) > 0 THEN SUBSTRING(name FROM POSITION(' ' IN name) + 1)
        ELSE ''
    END
WHERE first_name IS NULL AND name IS NOT NULL;

-- 4. Update company_name from company column
UPDATE contact_submissions 
SET company_name = company 
WHERE company_name IS NULL AND company IS NOT NULL;

-- 5. Set default values for new columns
ALTER TABLE contact_submissions 
ALTER COLUMN first_name SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN last_name SET DEFAULT '';

ALTER TABLE contact_submissions 
ALTER COLUMN project_type SET DEFAULT 'general';

ALTER TABLE contact_submissions 
ALTER COLUMN project_details SET DEFAULT '';

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_first_name ON contact_submissions(first_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_last_name ON contact_submissions(last_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_project_type ON contact_submissions(project_type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);

-- 7. Create a comprehensive contact form submission function
CREATE OR REPLACE FUNCTION submit_contact_form_complete(
    p_first_name VARCHAR(255),
    p_last_name VARCHAR(255),
    p_email VARCHAR(255),
    p_phone VARCHAR(20) DEFAULT NULL,
    p_company_name VARCHAR(255) DEFAULT NULL,
    p_project_type VARCHAR(100) DEFAULT 'general',
    p_project_details TEXT DEFAULT NULL,
    p_message TEXT,
    p_user_id UUID DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    result_id UUID;
    result JSON;
    full_name VARCHAR(255);
BEGIN
    -- Combine first and last name
    full_name := TRIM(CONCAT(p_first_name, ' ', p_last_name));
    
    -- Insert the contact submission
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
        p_first_name,
        p_last_name,
        full_name,
        p_email,
        p_phone,
        p_company_name,
        p_project_type,
        p_project_details,
        p_message,
        COALESCE(p_project_type, 'Contact Form Submission'),
        p_user_id,
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
        'first_name', p_first_name,
        'last_name', p_last_name,
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

-- 8. Grant execute permission
GRANT EXECUTE ON FUNCTION submit_contact_form_complete TO authenticated;
GRANT EXECUTE ON FUNCTION submit_contact_form_complete TO anon;

-- 9. Create a simple contact form submission function (for backward compatibility)
CREATE OR REPLACE FUNCTION submit_contact_simple(
    p_name VARCHAR(255),
    p_email VARCHAR(255),
    p_phone VARCHAR(20) DEFAULT NULL,
    p_company VARCHAR(255) DEFAULT NULL,
    p_subject VARCHAR(255),
    p_message TEXT
)
RETURNS JSON AS $$
DECLARE
    result_id UUID;
    result JSON;
    first_name VARCHAR(255);
    last_name VARCHAR(255);
BEGIN
    -- Split name into first and last name
    first_name := SPLIT_PART(p_name, ' ', 1);
    last_name := CASE 
        WHEN POSITION(' ' IN p_name) > 0 THEN SUBSTRING(p_name FROM POSITION(' ' IN p_name) + 1)
        ELSE ''
    END;
    
    -- Call the complete function
    SELECT submit_contact_form_complete(
        first_name,
        last_name,
        p_email,
        p_phone,
        p_company,
        'general',
        p_message,
        p_message,
        NULL
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Grant execute permission
GRANT EXECUTE ON FUNCTION submit_contact_simple TO authenticated;
GRANT EXECUTE ON FUNCTION submit_contact_simple TO anon;

-- 11. Test the functions
SELECT 'Testing contact form functions...' as info;

-- Test the complete function
SELECT submit_contact_form_complete(
    'John',
    'Doe',
    'john@example.com',
    '+91 9876543210',
    'Test Company',
    'website',
    'Need a website for my business',
    'I need a professional website for my restaurant business.',
    NULL
) as test_complete;

-- Test the simple function
SELECT submit_contact_simple(
    'Jane Smith',
    'jane@example.com',
    '+91 9876543211',
    'Another Company',
    'Mobile App Inquiry',
    'I need a mobile app for my business.'
) as test_simple;

-- 12. Verify the final table structure
SELECT 
    'Final contact_submissions columns:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 13. Check existing data
SELECT 
    'Contact submissions count:' as info,
    COUNT(*) as total_count
FROM contact_submissions;

-- 14. Show sample data
SELECT 
    'Sample contact submissions:' as info,
    id,
    first_name,
    last_name,
    email,
    company_name,
    project_type,
    status,
    created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 5;
