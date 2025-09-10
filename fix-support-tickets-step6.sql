-- Step 6: Test the table (run this last)
-- Insert a test ticket
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
  'TKT-TEST-001',
  auth.uid(),
  'test@example.com',
  'Test User',
  'test@example.com',
  'Test Ticket',
  'This is a test ticket to verify the table works',
  'medium',
  'open'
);

-- Verify the table was created
SELECT COUNT(*) as total_tickets FROM support_tickets;
