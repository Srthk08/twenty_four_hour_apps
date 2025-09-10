-- Check if support_tickets table exists and create it if it doesn't
-- Run this in your Supabase SQL Editor

-- First, check if the table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'support_tickets'
) as table_exists;

-- If the table doesn't exist, create it
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    admin_replies JSONB DEFAULT '[]'::jsonb,
    assigned_to UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read all tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Allow authenticated users to insert tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Allow authenticated users to update tickets" ON public.support_tickets;

-- Create RLS policies
CREATE POLICY "Allow authenticated users to read all tickets" ON public.support_tickets
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert tickets" ON public.support_tickets
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update tickets" ON public.support_tickets
    FOR UPDATE
    TO authenticated
    USING (true);

-- Grant permissions
GRANT ALL ON public.support_tickets TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Check if there's any data
SELECT COUNT(*) as ticket_count FROM public.support_tickets;

-- If no data, insert some sample tickets
INSERT INTO public.support_tickets (ticket_number, customer_name, customer_email, subject, description, priority, status) 
SELECT * FROM (VALUES
    ('TKT-2024-001', 'John Doe', 'john.doe@example.com', 'App not loading properly', 'The app keeps showing a loading screen and never loads the main content. I have tried refreshing multiple times and restarting the app, but the issue persists.', 'high', 'open'),
    ('TKT-2024-002', 'Jane Smith', 'jane.smith@example.com', 'Password reset not working', 'I tried to reset my password but I am not receiving the reset email. I checked my spam folder as well.', 'medium', 'in_progress'),
    ('TKT-2024-003', 'Mike Johnson', 'mike.johnson@example.com', 'Feature request: Dark mode', 'It would be great to have a dark mode option in the app. The current light theme is too bright for night usage.', 'low', 'open'),
    ('TKT-2024-004', 'Sarah Wilson', 'sarah.wilson@example.com', 'Payment issue', 'I was charged twice for the same subscription. Please help me get a refund for the duplicate charge.', 'urgent', 'resolved'),
    ('TKT-2024-005', 'David Brown', 'david.brown@example.com', 'Login problems', 'I cannot log into my account. It says invalid credentials but I am sure the password is correct.', 'high', 'open')
) AS sample_data(ticket_number, customer_name, customer_email, subject, description, priority, status)
WHERE NOT EXISTS (SELECT 1 FROM public.support_tickets LIMIT 1);

-- Verify the data
SELECT 
    ticket_number,
    customer_name,
    customer_email,
    subject,
    priority,
    status,
    created_at
FROM public.support_tickets 
ORDER BY created_at DESC;

-- Show final count
SELECT COUNT(*) as final_ticket_count FROM public.support_tickets;
