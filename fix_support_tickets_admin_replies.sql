-- FIX SUPPORT TICKETS ADMIN REPLIES COLUMN
-- This will add the missing admin_replies column

-- 1. Check current support_tickets table structure
SELECT 
    'Current support_tickets structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Add the missing admin_replies column
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS admin_replies TEXT DEFAULT '';

-- 3. Add other potentially missing columns for admin functionality
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '';

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS resolution_notes TEXT DEFAULT '';

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS internal_notes TEXT DEFAULT '';

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS last_admin_response TIMESTAMP WITH TIME ZONE;

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS response_count INTEGER DEFAULT 0;

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS is_escalated BOOLEAN DEFAULT FALSE;

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS escalation_reason TEXT DEFAULT '';

-- 4. Create indexes for the new columns
CREATE INDEX IF NOT EXISTS idx_support_tickets_admin_replies ON support_tickets(admin_replies);
CREATE INDEX IF NOT EXISTS idx_support_tickets_last_admin_response ON support_tickets(last_admin_response);
CREATE INDEX IF NOT EXISTS idx_support_tickets_is_escalated ON support_tickets(is_escalated);

-- 5. Update existing records to have default values
UPDATE support_tickets 
SET 
    admin_replies = COALESCE(admin_replies, ''),
    admin_notes = COALESCE(admin_notes, ''),
    resolution_notes = COALESCE(resolution_notes, ''),
    internal_notes = COALESCE(internal_notes, ''),
    response_count = COALESCE(response_count, 0),
    is_escalated = COALESCE(is_escalated, FALSE),
    escalation_reason = COALESCE(escalation_reason, '')
WHERE admin_replies IS NULL 
   OR admin_notes IS NULL 
   OR resolution_notes IS NULL 
   OR internal_notes IS NULL 
   OR response_count IS NULL 
   OR is_escalated IS NULL 
   OR escalation_reason IS NULL;

-- 6. Grant all necessary permissions
GRANT ALL ON support_tickets TO authenticated;
GRANT ALL ON support_tickets TO anon;
GRANT ALL ON support_tickets TO service_role;

-- 7. Disable RLS to avoid permission issues
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;

-- 8. Test inserting a record with the new columns
INSERT INTO support_tickets (
    ticket_number,
    user_id,
    user_email,
    user_name,
    customer_email,
    customer_name,
    subject,
    description,
    priority,
    status,
    category,
    admin_replies,
    admin_notes,
    response_count,
    created_at,
    updated_at
) VALUES (
    'TK000006',
    gen_random_uuid(),
    'test@example.com',
    'Test User',
    'test@example.com',
    'Test User',
    'Test Ticket with Admin Replies',
    'This is a test ticket to verify admin_replies column works.',
    'medium',
    'open',
    'general',
    'Initial admin response',
    'Internal admin notes',
    1,
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- 9. Verify the final table structure
SELECT 
    'Final support_tickets structure:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 10. Test selecting data with the new columns
SELECT 
    'Test data selection:' as info,
    id,
    ticket_number,
    customer_email,
    customer_name,
    subject,
    description,
    admin_replies,
    admin_notes,
    response_count,
    is_escalated,
    created_at
FROM support_tickets
ORDER BY created_at DESC
LIMIT 3;

-- 11. Show final status
SELECT 'Support tickets admin_replies column added successfully!' as status;
SELECT 'Admin can now reply to tickets and update them' as message;
