-- Fix undefined emails in support tickets
-- Run this in Supabase SQL Editor

-- Update tickets with undefined emails to use the user's actual email
UPDATE support_tickets 
SET user_email = (
  SELECT email 
  FROM auth.users 
  WHERE auth.users.id = support_tickets.user_id
)
WHERE user_email = 'undefined' OR user_email IS NULL;

-- Also update customer_email field for backward compatibility
UPDATE support_tickets 
SET customer_email = user_email
WHERE customer_email = 'undefined' OR customer_email IS NULL;

-- Show the results
SELECT 
  id,
  ticket_number,
  user_email,
  customer_email,
  subject,
  created_at
FROM support_tickets 
WHERE user_email IS NOT NULL
ORDER BY created_at DESC 
LIMIT 10;
