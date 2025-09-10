-- Preview Support Ticket Tables for Deletion
-- Run this first to see what will be deleted

-- Check which tables exist
SELECT 
  'support_tickets' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') as exists,
  CASE 
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') 
    THEN (SELECT COUNT(*) FROM support_tickets)::text
    ELSE 'N/A'
  END as record_count
UNION ALL
SELECT 
  'support_ticket_replies' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_replies') as exists,
  CASE 
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_replies') 
    THEN (SELECT COUNT(*) FROM support_ticket_replies)::text
    ELSE 'N/A'
  END as record_count
UNION ALL
SELECT 
  'support_ticket_notifications' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_notifications') as exists,
  CASE 
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_notifications') 
    THEN (SELECT COUNT(*) FROM support_ticket_notifications)::text
    ELSE 'N/A'
  END as record_count;

-- Show table structures (if they exist)
SELECT 'support_tickets structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets'
ORDER BY ordinal_position;

SELECT 'support_ticket_replies structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_ticket_replies'
ORDER BY ordinal_position;

SELECT 'support_ticket_notifications structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_ticket_notifications'
ORDER BY ordinal_position;

-- Show RLS policies that will be deleted
SELECT 'RLS Policies that will be deleted:' as info;
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename IN ('support_tickets', 'support_ticket_replies', 'support_ticket_notifications');
