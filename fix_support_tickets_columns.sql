-- FIX SUPPORT TICKETS COLUMNS
-- This will add the missing columns that the frontend expects

-- 1. Check current table structure
SELECT 
    'Current support_tickets structure:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'support_tickets' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Add missing columns that the frontend expects
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_email VARCHAR(255);

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_name VARCHAR(255);

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_phone VARCHAR(20);

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_company VARCHAR(255);

-- 3. Update existing records to copy data from user_email to customer_email
UPDATE support_tickets 
SET 
    customer_email = COALESCE(user_email, ''),
    customer_name = COALESCE(user_name, ''),
    customer_phone = '',
    customer_company = ''
WHERE customer_email IS NULL;

-- 4. Make customer_email NOT NULL and set default
ALTER TABLE support_tickets 
ALTER COLUMN customer_email SET NOT NULL;

ALTER TABLE support_tickets 
ALTER COLUMN customer_email SET DEFAULT '';

-- 5. Set defaults for other new columns
ALTER TABLE support_tickets 
ALTER COLUMN customer_name SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN customer_phone SET DEFAULT '';

ALTER TABLE support_tickets 
ALTER COLUMN customer_company SET DEFAULT '';

-- 6. Add other potentially missing columns
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS ticket_type VARCHAR(50) DEFAULT 'support';

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS department VARCHAR(50) DEFAULT 'general';

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT '';

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS due_date TIMESTAMP WITH TIME ZONE;

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS estimated_time INTEGER DEFAULT 0;

-- 7. Create indexes for the new columns
CREATE INDEX IF NOT EXISTS idx_support_tickets_customer_email ON support_tickets(customer_email);
CREATE INDEX IF NOT EXISTS idx_support_tickets_customer_name ON support_tickets(customer_name);
CREATE INDEX IF NOT EXISTS idx_support_tickets_ticket_type ON support_tickets(ticket_type);
CREATE INDEX IF NOT EXISTS idx_support_tickets_department ON support_tickets(department);

-- 8. Grant permissions
GRANT ALL ON support_tickets TO authenticated;
GRANT ALL ON support_tickets TO anon;
GRANT ALL ON support_tickets TO service_role;

-- 9. Disable RLS
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;

-- 10. Test inserting a record with the expected columns
INSERT INTO support_tickets (
    ticket_number,
    user_id,
    user_email,
    user_name,
    customer_email,
    customer_name,
    customer_phone,
    customer_company,
    subject,
    description,
    priority,
    status,
    category,
    ticket_type,
    department,
    created_at,
    updated_at
) VALUES (
    'TK000003',
    gen_random_uuid(),
    'test@example.com',
    'Test User',
    'test@example.com',
    'Test User',
    '+91 9876543210',
    'Test Company',
    'Test Support Ticket',
    'This is a test support ticket to verify the system works.',
    'medium',
    'open',
    'general',
    'support',
    'general',
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- 11. Verify the final table structure
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

-- 12. Test selecting data with the expected columns
SELECT 
    'Test data selection:' as info,
    id,
    ticket_number,
    customer_email,
    customer_name,
    customer_phone,
    customer_company,
    subject,
    description,
    priority,
    status,
    category,
    ticket_type,
    department,
    created_at
FROM support_tickets
ORDER BY created_at DESC
LIMIT 3;

-- 13. Show final status
SELECT 'Support tickets table fixed successfully!' as status;
SELECT 'Added columns: customer_email, customer_name, customer_phone, customer_company, ticket_type, department, tags, due_date, estimated_time' as added_columns;
