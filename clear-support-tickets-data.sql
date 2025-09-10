-- Clear all support tickets data from Supabase
-- Run this in your Supabase SQL Editor to remove all sample data

-- First, check how many tickets exist
SELECT COUNT(*) as current_ticket_count FROM public.support_tickets;

-- Show current data before clearing
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

-- Clear all data from support_tickets table
DELETE FROM public.support_tickets;

-- Verify all data is cleared
SELECT COUNT(*) as remaining_tickets FROM public.support_tickets;

-- Show empty state message
SELECT 'All support tickets data has been cleared. The admin panel will now show an empty state.' as message;
