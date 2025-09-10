-- Test Support Ticket System
-- Run this in Supabase SQL Editor to verify everything is working

-- Test 1: Check if tables exist
SELECT 'support_tickets' as table_name, 
       EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') as exists
UNION ALL
SELECT 'support_ticket_replies' as table_name,
       EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_replies') as exists
UNION ALL
SELECT 'support_ticket_notifications' as table_name,
       EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_notifications') as exists;

-- Test 2: Check table structures
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'support_tickets'
ORDER BY ordinal_position;

-- Test 3: Check if there are any existing tickets
SELECT COUNT(*) as total_tickets FROM support_tickets;

-- Test 4: Show sample tickets if any exist
SELECT 
  ticket_number,
  subject,
  category,
  priority,
  status,
  created_at
FROM support_tickets 
ORDER BY created_at DESC 
LIMIT 5;

-- Test 5: Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'support_tickets';

-- Test 6: Verify indexes exist
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes 
WHERE tablename = 'support_tickets';
