-- CREATE SUPPORT TICKETS SIMPLE VERSION
-- This creates a simplified support ticket system without complex functions

-- 1. Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(20) DEFAULT 'open',
    category VARCHAR(50) DEFAULT 'general',
    assigned_to UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE
);

-- 2. Create support_ticket_responses table
CREATE TABLE IF NOT EXISTS support_ticket_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL,
    responder_id UUID,
    responder_name VARCHAR(255) NOT NULL,
    responder_email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    response_type VARCHAR(20) DEFAULT 'reply',
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add foreign key constraints
ALTER TABLE support_ticket_responses 
ADD CONSTRAINT fk_support_ticket_responses_ticket_id 
FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE;

-- 4. Create indexes
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_ticket_number ON support_tickets(ticket_number);

CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_ticket_id ON support_ticket_responses(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_responder_id ON support_ticket_responses(responder_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_created_at ON support_ticket_responses(created_at);

-- 5. Grant permissions
GRANT ALL ON support_tickets TO authenticated;
GRANT ALL ON support_tickets TO anon;
GRANT ALL ON support_tickets TO service_role;

GRANT ALL ON support_ticket_responses TO authenticated;
GRANT ALL ON support_ticket_responses TO anon;
GRANT ALL ON support_ticket_responses TO service_role;

-- 6. Disable RLS
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_responses DISABLE ROW LEVEL SECURITY;

-- 7. Insert sample data
INSERT INTO support_tickets (
    ticket_number,
    user_id,
    user_email,
    user_name,
    subject,
    description,
    priority,
    category,
    status,
    created_at,
    updated_at
) VALUES 
(
    'TK000001',
    gen_random_uuid(),
    'user1@example.com',
    'John Doe',
    'Login Issue',
    'I am unable to login to my account. Getting error message "Invalid credentials" even though I am using the correct password.',
    'high',
    'technical',
    'open',
    NOW(),
    NOW()
),
(
    'TK000002',
    gen_random_uuid(),
    'user2@example.com',
    'Jane Smith',
    'Billing Question',
    'I was charged twice for my subscription this month. Can you please check and refund the duplicate charge?',
    'medium',
    'billing',
    'in_progress',
    NOW() - INTERVAL '2 days',
    NOW()
);

-- 8. Insert sample responses
INSERT INTO support_ticket_responses (
    ticket_id,
    responder_id,
    responder_name,
    responder_email,
    message,
    response_type,
    is_internal,
    created_at
) VALUES 
(
    (SELECT id FROM support_tickets WHERE ticket_number = 'TK000001'),
    gen_random_uuid(),
    'Support Admin',
    'admin@example.com',
    'Thank you for contacting support. I have reset your password and sent you a new temporary password via email. Please check your inbox and login with the new credentials.',
    'reply',
    false,
    NOW() - INTERVAL '1 hour'
),
(
    (SELECT id FROM support_tickets WHERE ticket_number = 'TK000002'),
    gen_random_uuid(),
    'Billing Team',
    'billing@example.com',
    'I have reviewed your account and confirmed the duplicate charge. I have processed a refund for the second charge, which should appear in your account within 3-5 business days.',
    'reply',
    false,
    NOW() - INTERVAL '30 minutes'
);

-- 9. Show final status
SELECT 'Support tickets system created successfully!' as status;
SELECT 'Tables created: support_tickets, support_ticket_responses' as tables;
SELECT 'Sample data inserted for testing' as sample_data;
