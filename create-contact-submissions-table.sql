-- Create contact_submissions table with all required fields
-- This matches the contact form structure shown in the image

-- Drop existing table if it exists
DROP TABLE IF EXISTS contact_submissions CASCADE;

-- Create the contact_submissions table
CREATE TABLE contact_submissions (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Personal Information (from form)
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company_name VARCHAR(255),
    
    -- Project Information
    project_type VARCHAR(50) NOT NULL,
    project_details TEXT NOT NULL,
    message TEXT NOT NULL, -- Same as project_details for backward compatibility
    
    -- Additional fields for tracking
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to UUID REFERENCES auth.users(id),
    
    -- User tracking (if user is logged in)
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_project_type ON contact_submissions(project_type);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_user_id ON contact_submissions(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow anyone to insert contact submissions (public form)
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view their own submissions
CREATE POLICY "Users can view own contact submissions" ON contact_submissions
    FOR SELECT USING (
        user_id = auth.uid() OR 
        user_id IS NULL -- Allow viewing submissions made without login
    );

-- Allow admins to view all submissions
CREATE POLICY "Admins can view all contact submissions" ON contact_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'developer', 'support')
        )
    );

-- Allow admins to update submissions
CREATE POLICY "Admins can update contact submissions" ON contact_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'developer', 'support')
        )
    );

-- Allow admins to delete submissions
CREATE POLICY "Admins can delete contact submissions" ON contact_submissions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'developer', 'support')
        )
    );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_submissions_updated_at();

-- Grant permissions
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO service_role;
GRANT ALL ON contact_submissions TO anon; -- Allow anonymous users to insert

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the public contact page';
COMMENT ON COLUMN contact_submissions.first_name IS 'User first name from contact form';
COMMENT ON COLUMN contact_submissions.last_name IS 'User last name from contact form';
COMMENT ON COLUMN contact_submissions.email IS 'User email address from contact form';
COMMENT ON COLUMN contact_submissions.phone IS 'User phone number (optional)';
COMMENT ON COLUMN contact_submissions.company_name IS 'User company name (optional)';
COMMENT ON COLUMN contact_submissions.project_type IS 'Type of project selected from dropdown';
COMMENT ON COLUMN contact_submissions.project_details IS 'Detailed project description from textarea';
COMMENT ON COLUMN contact_submissions.message IS 'Same as project_details for backward compatibility';
COMMENT ON COLUMN contact_submissions.status IS 'Submission status: new, read, replied, closed';
COMMENT ON COLUMN contact_submissions.priority IS 'Priority level: low, medium, high, urgent';
COMMENT ON COLUMN contact_submissions.user_id IS 'ID of user if they were logged in when submitting';

-- Insert some test data to verify the table works
INSERT INTO contact_submissions (
    first_name,
    last_name,
    email,
    phone,
    company_name,
    project_type,
    project_details,
    message
) VALUES 
(
    'John',
    'Doe',
    'john.doe@example.com',
    '+1 (555) 123-4567',
    'Tech Solutions Inc',
    'android-tv',
    'I need a custom Android TV app for my restaurant with menu display and ordering system.',
    'I need a custom Android TV app for my restaurant with menu display and ordering system.'
),
(
    'Jane',
    'Smith',
    'jane.smith@example.com',
    '+1 (555) 987-6543',
    'Restaurant Group',
    'restaurant-menu',
    'Looking for a digital menu system with QR code ordering and real-time updates.',
    'Looking for a digital menu system with QR code ordering and real-time updates.'
);

-- Verify the table was created correctly
SELECT 
    'Table created successfully' as status,
    COUNT(*) as total_records
FROM contact_submissions;
