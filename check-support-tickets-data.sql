-- Check the current structure and data of support_tickets table
-- Run this in your Supabase SQL Editor

-- First, check if the table exists and its structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if there's any data in the table
SELECT COUNT(*) as total_tickets FROM public.support_tickets;

-- Check the actual data structure
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
ORDER BY created_at DESC
LIMIT 5;

-- Check if there are any tickets with different field names
SELECT * FROM public.support_tickets LIMIT 1;
