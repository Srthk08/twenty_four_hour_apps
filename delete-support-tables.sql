-- Delete Support Ticket Tables
-- Run this in Supabase SQL Editor to remove all support ticket related tables

-- Step 1: Drop support_ticket_notifications table (if exists)
DROP TABLE IF EXISTS support_ticket_notifications CASCADE;

-- Step 2: Drop support_ticket_replies table (if exists)
DROP TABLE IF EXISTS support_ticket_replies CASCADE;

-- Step 3: Drop support_tickets table (if exists)
DROP TABLE IF EXISTS support_tickets CASCADE;

-- Step 4: Verify tables are deleted
SELECT 
  'support_tickets' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') as exists
UNION ALL
SELECT 
  'support_ticket_replies' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_replies') as exists
UNION ALL
SELECT 
  'support_ticket_notifications' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_notifications') as exists;

-- Step 5: Show confirmation message
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') AND
     NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_replies') AND
     NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_notifications') THEN
    RAISE NOTICE '✅ All support ticket tables have been successfully deleted!';
  ELSE
    RAISE NOTICE '⚠️ Some tables may still exist. Please check the results above.';
  END IF;
END $$;
