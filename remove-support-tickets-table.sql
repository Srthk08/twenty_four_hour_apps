-- Completely remove the support_tickets table from Supabase
-- Run this in your Supabase SQL Editor to remove the entire table

-- First, check if the table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'support_tickets'
) as table_exists;

-- Drop the support_tickets table completely
DROP TABLE IF EXISTS public.support_tickets CASCADE;

-- Verify the table has been removed
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'support_tickets'
) as table_still_exists;

-- Show confirmation message
SELECT 'Support tickets table has been completely removed. The admin panel will now show an error message asking you to create the table.' as message;
