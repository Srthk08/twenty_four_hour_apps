-- Support Ticket System Test Script
-- Run this to test the support ticket functionality

-- Test 1: Check if tables exist
SELECT 'support_tickets' as table_name, 
       EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') as exists
UNION ALL
SELECT 'support_ticket_replies' as table_name,
       EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_replies') as exists
UNION ALL
SELECT 'support_ticket_notifications' as table_name,
       EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_ticket_notifications') as exists;

-- Test 2: Insert test ticket
INSERT INTO support_tickets (
  user_id,
  subject,
  category,
  priority,
  description,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Test Support Ticket',
  'technical',
  'medium',
  'This is a test support ticket to verify the system is working correctly.',
  'open'
);

-- Test 3: Verify ticket was created
SELECT 
  ticket_number,
  subject,
  category,
  priority,
  status,
  created_at
FROM support_tickets 
WHERE subject = 'Test Support Ticket'
ORDER BY created_at DESC
LIMIT 1;

-- Test 4: Insert test reply
INSERT INTO support_ticket_replies (
  ticket_id,
  user_id,
  is_admin_reply,
  message
) VALUES (
  (SELECT id FROM support_tickets WHERE subject = 'Test Support Ticket' LIMIT 1),
  (SELECT id FROM auth.users LIMIT 1),
  true,
  'Thank you for your support ticket. We are looking into this issue and will get back to you soon.'
);

-- Test 5: Show all tickets with replies count
SELECT 
  st.ticket_number,
  st.subject,
  st.category,
  st.priority,
  st.status,
  st.created_at,
  COUNT(str.id) as replies_count
FROM support_tickets st
LEFT JOIN support_ticket_replies str ON st.id = str.ticket_id
GROUP BY st.id, st.ticket_number, st.subject, st.category, st.priority, st.status, st.created_at
ORDER BY st.created_at DESC;

-- Test 6: Test the views
SELECT 'Testing support_tickets_summary view:' as test;
SELECT ticket_number, subject, category_display, priority_display, status_display 
FROM support_tickets_summary 
LIMIT 3;

SELECT 'Testing user_tickets_view:' as test;
SELECT ticket_number, subject, category_display, priority_display, status_display, admin_replies_count
FROM user_tickets_view 
LIMIT 3;
