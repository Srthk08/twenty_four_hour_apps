-- Create support_tickets table in Supabase
-- Run this in your Supabase SQL Editor

-- Create support_tickets table
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

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON public.support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON public.support_tickets(created_at);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow authenticated users to read all tickets (for admin panel)
CREATE POLICY "Allow authenticated users to read all tickets" ON public.support_tickets
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users to insert tickets
CREATE POLICY "Allow authenticated users to insert tickets" ON public.support_tickets
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow authenticated users to update tickets
CREATE POLICY "Allow authenticated users to update tickets" ON public.support_tickets
    FOR UPDATE
    TO authenticated
    USING (true);

-- Grant permissions
GRANT ALL ON public.support_tickets TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Insert some sample tickets for testing
INSERT INTO public.support_tickets (ticket_number, customer_name, customer_email, subject, description, priority, status) VALUES
('TKT-2024-001', 'John Doe', 'john.doe@example.com', 'App not loading properly', 'The app keeps showing a loading screen and never loads the main content. I have tried refreshing multiple times and restarting the app, but the issue persists.', 'high', 'open'),
('TKT-2024-002', 'Jane Smith', 'jane.smith@example.com', 'Password reset not working', 'I tried to reset my password but I am not receiving the reset email. I checked my spam folder as well.', 'medium', 'in_progress'),
('TKT-2024-003', 'Mike Johnson', 'mike.johnson@example.com', 'Feature request: Dark mode', 'It would be great to have a dark mode option in the app. The current light theme is too bright for night usage.', 'low', 'open'),
('TKT-2024-004', 'Sarah Wilson', 'sarah.wilson@example.com', 'Payment issue', 'I was charged twice for the same subscription. Please help me get a refund for the duplicate charge.', 'urgent', 'resolved');

-- Verify the table was created
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check sample data
SELECT 
    id,
    ticket_number,
    customer_name,
    customer_email,
    subject,
    priority,
    status,
    created_at
FROM public.support_tickets 
ORDER BY created_at DESC;