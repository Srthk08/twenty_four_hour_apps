-- Final test to verify everything works
-- Run this after the cleanup script

-- Check if table exists and has data
SELECT 
  'Table exists' as status,
  COUNT(*) as total_tickets 
FROM support_tickets;

-- Test inserting a ticket (this should work now)
INSERT INTO support_tickets (
  ticket_number,
  user_id,
  user_email,
  customer_name,
  customer_email,
  subject,
  description,
  priority,
  status
) VALUES (
  'TKT-TEST-' || extract(epoch from now())::text,
  auth.uid(),
  'test@example.com',
  'Test User',
  'test@example.com',
  'Test Ticket - ' || now()::text,
  'This is a test ticket to verify everything works',
  'medium',
  'open'
);

-- Show all tickets
SELECT 
  ticket_number,
  subject,
  status,
  created_at
FROM support_tickets 
ORDER BY created_at DESC;
