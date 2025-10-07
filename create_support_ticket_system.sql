-- CREATE SUPPORT TICKET SYSTEM
-- This creates tables for support tickets and admin responses

-- 1. Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed', 'cancelled')),
    category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('general', 'technical', 'billing', 'feature_request', 'bug_report', 'account')),
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE
);

-- 2. Create support_ticket_responses table
CREATE TABLE IF NOT EXISTS support_ticket_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    responder_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    responder_name VARCHAR(255) NOT NULL,
    responder_email VARCHAR(255) NOT NULL,
    response_type VARCHAR(20) DEFAULT 'reply' CHECK (response_type IN ('reply', 'internal_note', 'status_change', 'assignment')),
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    attachments JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create support_ticket_attachments table
CREATE TABLE IF NOT EXISTS support_ticket_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
    response_id UUID REFERENCES support_ticket_responses(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create support_ticket_status_history table
CREATE TABLE IF NOT EXISTS support_ticket_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    changed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    change_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_category ON support_tickets(category);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to ON support_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_ticket_number ON support_tickets(ticket_number);

CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_ticket_id ON support_ticket_responses(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_responder_id ON support_ticket_responses(responder_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_created_at ON support_ticket_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_is_internal ON support_ticket_responses(is_internal);

CREATE INDEX IF NOT EXISTS idx_support_ticket_attachments_ticket_id ON support_ticket_attachments(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_attachments_response_id ON support_ticket_attachments(response_id);

CREATE INDEX IF NOT EXISTS idx_support_ticket_status_history_ticket_id ON support_ticket_status_history(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_status_history_created_at ON support_ticket_status_history(created_at);

-- 6. Create function to generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS VARCHAR(20) AS $$
DECLARE
    ticket_number VARCHAR(20);
    counter INTEGER;
BEGIN
    -- Get the next counter value
    SELECT COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 3) AS INTEGER)), 0) + 1
    INTO counter
    FROM support_tickets
    WHERE ticket_number ~ '^TK[0-9]+$';
    
    -- Format as TK + 6-digit number
    ticket_number := 'TK' || LPAD(counter::TEXT, 6, '0');
    
    RETURN ticket_number;
END;
$$ LANGUAGE plpgsql;

-- 7. Create function to create a new support ticket
CREATE OR REPLACE FUNCTION create_support_ticket(
    p_user_id UUID,
    p_user_email VARCHAR(255),
    p_user_name VARCHAR(255),
    p_subject VARCHAR(500),
    p_description TEXT,
    p_priority VARCHAR(20) DEFAULT 'medium',
    p_category VARCHAR(50) DEFAULT 'general'
)
RETURNS JSON AS $$
DECLARE
    ticket_id UUID;
    ticket_number VARCHAR(20);
    result JSON;
BEGIN
    -- Generate ticket number
    ticket_number := generate_ticket_number();
    
    -- Insert the ticket
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
    ) VALUES (
        ticket_number,
        p_user_id,
        p_user_email,
        p_user_name,
        p_subject,
        p_description,
        p_priority,
        p_category,
        'open',
        NOW(),
        NOW()
    ) RETURNING id INTO ticket_id;
    
    -- Log status change
    INSERT INTO support_ticket_status_history (
        ticket_id,
        old_status,
        new_status,
        changed_by,
        change_reason
    ) VALUES (
        ticket_id,
        NULL,
        'open',
        p_user_id,
        'Ticket created'
    );
    
    result := json_build_object(
        'success', true,
        'ticket_id', ticket_id,
        'ticket_number', ticket_number,
        'message', 'Support ticket created successfully'
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'message', 'Error creating support ticket: ' || SQLERRM
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 8. Create function to add response to ticket
CREATE OR REPLACE FUNCTION add_ticket_response(
    p_ticket_id UUID,
    p_responder_id UUID,
    p_responder_name VARCHAR(255),
    p_responder_email VARCHAR(255),
    p_message TEXT,
    p_response_type VARCHAR(20) DEFAULT 'reply',
    p_is_internal BOOLEAN DEFAULT FALSE
)
RETURNS JSON AS $$
DECLARE
    response_id UUID;
    result JSON;
BEGIN
    -- Insert the response
    INSERT INTO support_ticket_responses (
        ticket_id,
        responder_id,
        responder_name,
        responder_email,
        message,
        response_type,
        is_internal,
        created_at,
        updated_at
    ) VALUES (
        p_ticket_id,
        p_responder_id,
        p_responder_name,
        p_responder_email,
        p_message,
        p_response_type,
        p_is_internal,
        NOW(),
        NOW()
    ) RETURNING id INTO response_id;
    
    -- Update ticket's updated_at timestamp
    UPDATE support_tickets 
    SET updated_at = NOW()
    WHERE id = p_ticket_id;
    
    result := json_build_object(
        'success', true,
        'response_id', response_id,
        'message', 'Response added successfully'
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'message', 'Error adding response: ' || SQLERRM
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 9. Create function to update ticket status
CREATE OR REPLACE FUNCTION update_ticket_status(
    p_ticket_id UUID,
    p_new_status VARCHAR(20),
    p_changed_by UUID,
    p_change_reason TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    old_status VARCHAR(20);
    result JSON;
BEGIN
    -- Get current status
    SELECT status INTO old_status
    FROM support_tickets
    WHERE id = p_ticket_id;
    
    -- Update ticket status
    UPDATE support_tickets 
    SET 
        status = p_new_status,
        updated_at = NOW(),
        resolved_at = CASE WHEN p_new_status = 'resolved' THEN NOW() ELSE resolved_at END,
        closed_at = CASE WHEN p_new_status = 'closed' THEN NOW() ELSE closed_at END
    WHERE id = p_ticket_id;
    
    -- Log status change
    INSERT INTO support_ticket_status_history (
        ticket_id,
        old_status,
        new_status,
        changed_by,
        change_reason
    ) VALUES (
        p_ticket_id,
        old_status,
        p_new_status,
        p_changed_by,
        p_change_reason
    );
    
    result := json_build_object(
        'success', true,
        'old_status', old_status,
        'new_status', p_new_status,
        'message', 'Ticket status updated successfully'
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'message', 'Error updating ticket status: ' || SQLERRM
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 10. Create function to get ticket with responses
CREATE OR REPLACE FUNCTION get_ticket_with_responses(p_ticket_id UUID)
RETURNS JSON AS $$
DECLARE
    ticket_data JSON;
    responses_data JSON;
    result JSON;
BEGIN
    -- Get ticket data
    SELECT json_build_object(
        'id', id,
        'ticket_number', ticket_number,
        'user_id', user_id,
        'user_email', user_email,
        'user_name', user_name,
        'subject', subject,
        'description', description,
        'priority', priority,
        'status', status,
        'category', category,
        'assigned_to', assigned_to,
        'created_at', created_at,
        'updated_at', updated_at,
        'resolved_at', resolved_at,
        'closed_at', closed_at
    ) INTO ticket_data
    FROM support_tickets
    WHERE id = p_ticket_id;
    
    -- Get responses data
    SELECT json_agg(
        json_build_object(
            'id', id,
            'responder_name', responder_name,
            'responder_email', responder_email,
            'message', message,
            'response_type', response_type,
            'is_internal', is_internal,
            'created_at', created_at
        ) ORDER BY created_at ASC
    ) INTO responses_data
    FROM support_ticket_responses
    WHERE ticket_id = p_ticket_id;
    
    result := json_build_object(
        'ticket', ticket_data,
        'responses', COALESCE(responses_data, '[]'::JSON)
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'message', 'Error fetching ticket data: ' || SQLERRM
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 11. Grant permissions
GRANT ALL ON support_tickets TO authenticated, anon, service_role;
GRANT ALL ON support_ticket_responses TO authenticated, anon, service_role;
GRANT ALL ON support_ticket_attachments TO authenticated, anon, service_role;
GRANT ALL ON support_ticket_status_history TO authenticated, anon, service_role;

GRANT EXECUTE ON FUNCTION create_support_ticket TO authenticated, anon;
GRANT EXECUTE ON FUNCTION add_ticket_response TO authenticated, anon;
GRANT EXECUTE ON FUNCTION update_ticket_status TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_ticket_with_responses TO authenticated, anon;
GRANT EXECUTE ON FUNCTION generate_ticket_number TO authenticated, anon;

-- 12. Disable RLS for now (can be enabled later with proper policies)
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_attachments DISABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_status_history DISABLE ROW LEVEL SECURITY;

-- 13. Insert sample data for testing
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

-- 14. Insert sample responses
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

-- 15. Show final status
SELECT 'Support ticket system created successfully!' as status;
SELECT 'Tables created: support_tickets, support_ticket_responses, support_ticket_attachments, support_ticket_status_history' as tables;
SELECT 'Functions created: create_support_ticket, add_ticket_response, update_ticket_status, get_ticket_with_responses' as functions;
