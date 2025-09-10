-- Create an empty support_tickets table without any sample data
-- Run this in your Supabase SQL Editor to create a clean table

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.support_tickets CASCADE;

-- Create the support_tickets table with correct structure
CREATE TABLE public.support_tickets (
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

-- Create indexes for better performance
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON public.support_tickets(priority);
CREATE INDEX idx_support_tickets_created_at ON public.support_tickets(created_at);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

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

-- Check that the table is empty
SELECT COUNT(*) as ticket_count FROM public.support_tickets;

-- Show confirmation message
SELECT 'Empty support tickets table created successfully. The admin panel will now show "No support tickets found" message.' as message;
