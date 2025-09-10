-- Fix support_tickets table by adding the missing 'category' column
-- Run this in your Supabase SQL Editor

-- First, check the current table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add the missing 'category' column
ALTER TABLE public.support_tickets 
ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'general';

-- Update the column to have a proper constraint
ALTER TABLE public.support_tickets 
ADD CONSTRAINT support_tickets_category_check 
CHECK (category IN ('general', 'technical', 'billing', 'feature_request', 'bug_report', 'other'));

-- Set a default value for existing records
UPDATE public.support_tickets 
SET category = 'general' 
WHERE category IS NULL;

-- Verify the column was added
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test inserting a record with the category column
INSERT INTO public.support_tickets (
    ticket_number, 
    customer_name, 
    customer_email, 
    subject, 
    description, 
    priority, 
    status,
    category
) VALUES (
    'TKT-TEST-001',
    'Test User',
    'test@example.com',
    'Test Ticket',
    'This is a test ticket to verify the category column works',
    'medium',
    'open',
    'general'
);

-- Verify the test record was inserted
SELECT 
    ticket_number,
    customer_name,
    customer_email,
    subject,
    category,
    priority,
    status
FROM public.support_tickets 
WHERE ticket_number = 'TKT-TEST-001';

-- Clean up test record
DELETE FROM public.support_tickets 
WHERE ticket_number = 'TKT-TEST-001';

-- Show success message
SELECT 'Category column added successfully to support_tickets table!' as message;
