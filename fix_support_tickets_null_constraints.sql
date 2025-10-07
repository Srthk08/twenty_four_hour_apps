-- FIX SUPPORT TICKETS NULL CONSTRAINTS
-- This will fix the NOT NULL constraint errors

-- 1. Check current table structure and constraints
SELECT 
    'Current support_tickets constraints:' as info,
    column_name,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Make user_name nullable and set default
ALTER TABLE support_tickets 
ALTER COLUMN user_name DROP NOT NULL;

ALTER TABLE support_tickets 
ALTER COLUMN user_name SET DEFAULT '';

-- 3. Make other columns nullable that might cause issues
ALTER TABLE support_tickets 
ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE support_tickets 
ALTER COLUMN user_email DROP NOT NULL;

ALTER TABLE support_tickets 
ALTER COLUMN user_email SET DEFAULT '';

-- 4. Update existing records with null values
UPDATE support_tickets 
SET 
    user_name = COALESCE(user_name, ''),
    user_email = COALESCE(user_email, ''),
    customer_email = COALESCE(customer_email, ''),
    customer_name = COALESCE(customer_name, ''),
    customer_phone = COALESCE(customer_phone, ''),
    customer_company = COALESCE(customer_company, ''),
    subject = COALESCE(subject, ''),
    description = COALESCE(description, ''),
    priority = COALESCE(priority, 'medium'),
    status = COALESCE(status, 'open'),
    category = COALESCE(category, 'general'),
    ticket_type = COALESCE(ticket_type, 'support'),
    department = COALESCE(department, 'general'),
    tags = COALESCE(tags, ''),
    estimated_time = COALESCE(estimated_time, 0)
WHERE user_name IS NULL 
   OR user_email IS NULL 
   OR customer_email IS NULL 
   OR customer_name IS NULL 
   OR customer_phone IS NULL 
   OR customer_company IS NULL 
   OR subject IS NULL 
   OR description IS NULL 
   OR priority IS NULL 
   OR status IS NULL 
   OR category IS NULL 
   OR ticket_type IS NULL 
   OR department IS NULL 
   OR tags IS NULL 
   OR estimated_time IS NULL;

-- 5. Set default values for all columns
ALTER TABLE support_tickets 
ALTER COLUMN user_id SET DEFAULT gen_random_uuid();

ALTER TABLE support_tickets 
ALTER COLUMN user_email SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN user_name SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN customer_email SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN customer_name SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN customer_phone SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN customer_company SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN subject SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN description SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN priority SET DEFAULT 'medium';

ALTER TABLE support_tickets 
ALTER COLUMN status SET DEFAULT 'open';

ALTER TABLE support_tickets 
ALTER COLUMN category SET DEFAULT 'general';

ALTER TABLE support_tickets 
ALTER COLUMN ticket_type SET DEFAULT 'support';

ALTER TABLE support_tickets 
ALTER COLUMN department SET DEFAULT 'general';

ALTER TABLE support_tickets 
ALTER COLUMN tags SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN estimated_time SET DEFAULT 0;

-- 6. Only keep essential columns as NOT NULL
ALTER TABLE support_tickets 
ALTER COLUMN id SET NOT NULL;

ALTER TABLE support_tickets 
ALTER COLUMN ticket_number SET NOT NULL;

-- 7. Test inserting a record with minimal data
INSERT INTO support_tickets (
    ticket_number,
    subject,
    description
) VALUES (
    'TK000004',
    'Test Ticket',
    'This is a test ticket with minimal data'
) ON CONFLICT DO NOTHING;

-- 8. Test inserting a record with null values (should work now)
INSERT INTO support_tickets (
    ticket_number,
    user_id,
    user_email,
    user_name,
    customer_email,
    customer_name,
    subject,
    description
) VALUES (
    'TK000005',
    NULL,
    NULL,
    NULL,
    'test@example.com',
    'Test Customer',
    'Test Ticket with Nulls',
    'This ticket has null values but should still work'
) ON CONFLICT DO NOTHING;

-- 9. Verify the final table structure
SELECT 
    'Final support_tickets structure:' as info,
    column_name,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 10. Test selecting data
SELECT 
    'Test data selection:' as info,
    id,
    ticket_number,
    user_name,
    user_email,
    customer_name,
    customer_email,
    subject,
    description,
    priority,
    status,
    created_at
FROM support_tickets
ORDER BY created_at DESC
LIMIT 5;

-- 11. Show final status
SELECT 'Support tickets null constraints fixed successfully!' as status;
SELECT 'All columns now have proper defaults and nullable constraints' as message;
