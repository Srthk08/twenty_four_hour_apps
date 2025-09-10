-- Check Support Tickets Table
-- Run this in Supabase SQL Editor to verify the table exists

-- Check if table exists
SELECT 
  'support_tickets' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') as exists;

-- If table exists, show its structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets'
ORDER BY ordinal_position;

-- Check RLS policies
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

-- Try to insert a test record (this will fail if table doesn't exist)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') THEN
    RAISE NOTICE 'Table support_tickets exists';
  ELSE
    RAISE NOTICE 'Table support_tickets does NOT exist - please run create-support-tickets-table.sql';
  END IF;
END $$;
