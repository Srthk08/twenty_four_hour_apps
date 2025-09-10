-- Update Support Tickets Table to Include Email
-- Run this in Supabase SQL Editor to add email field

-- Add user_email column to support_tickets table
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS user_email text;

-- Update existing records to use user's email from auth.users
UPDATE support_tickets 
SET user_email = (
  SELECT email 
  FROM auth.users 
  WHERE auth.users.id = support_tickets.user_id
)
WHERE user_email IS NULL;

-- Make user_email required for new records
ALTER TABLE support_tickets 
ALTER COLUMN user_email SET NOT NULL;

-- Add comment to the column
COMMENT ON COLUMN support_tickets.user_email IS 'Email address of the user who created the ticket';

-- Verify the changes
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND column_name = 'user_email';

-- Show sample data with email
SELECT 
  ticket_number,
  subject,
  user_email,
  priority,
  status,
  created_at
FROM support_tickets 
ORDER BY created_at DESC 
LIMIT 5;
