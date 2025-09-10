-- Support Ticket System SQL Script for Supabase
-- Based on the "Create Support Ticket" modal fields

-- Step 1: Create the support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number text UNIQUE DEFAULT 'TKT-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0'),
  user_id uuid REFERENCES auth.users(id),
  subject text NOT NULL,
  category text NOT NULL CHECK (category IN ('technical', 'billing', 'general', 'feature_request')),
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  description text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  closed_at timestamptz,
  admin_notes text
);

-- Step 2: Create support_ticket_replies table for admin responses
CREATE TABLE IF NOT EXISTS support_ticket_replies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  is_admin_reply boolean DEFAULT false,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 3: Create support_ticket_notifications table
CREATE TABLE IF NOT EXISTS support_ticket_notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Step 4: Enable Row Level Security on all tables
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_notifications ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for support_tickets
CREATE POLICY "Enable insert for authenticated users" ON support_tickets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Enable select for users based on user_id" ON support_tickets
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Enable update for users based on user_id" ON support_tickets
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admin policies for support_tickets
CREATE POLICY "Enable select for admin users" ON support_tickets
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Enable update for admin users" ON support_tickets
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 6: Create RLS policies for support_ticket_replies
CREATE POLICY "Enable insert for authenticated users" ON support_ticket_replies
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Enable select for users based on ticket ownership" ON support_ticket_replies
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets 
      WHERE support_tickets.id = support_ticket_replies.ticket_id 
      AND support_tickets.user_id = auth.uid()
    )
  );

-- Admin policies for replies
CREATE POLICY "Enable select for admin users" ON support_ticket_replies
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Enable insert for admin users" ON support_ticket_replies
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 7: Create RLS policies for support_ticket_notifications
CREATE POLICY "Enable select for users based on user_id" ON support_ticket_notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Enable update for users based on user_id" ON support_ticket_notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Step 8: Create indexes for better performance
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_support_tickets_category ON support_tickets(category);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX idx_support_tickets_ticket_number ON support_tickets(ticket_number);

CREATE INDEX idx_support_ticket_replies_ticket_id ON support_ticket_replies(ticket_id);
CREATE INDEX idx_support_ticket_replies_created_at ON support_ticket_replies(created_at);

CREATE INDEX idx_support_ticket_notifications_user_id ON support_ticket_notifications(user_id);
CREATE INDEX idx_support_ticket_notifications_is_read ON support_ticket_notifications(is_read);
CREATE INDEX idx_support_ticket_notifications_created_at ON support_ticket_notifications(created_at);

-- Step 9: Create trigger functions for updated_at
CREATE OR REPLACE FUNCTION update_support_tickets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_support_ticket_replies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 10: Create triggers
CREATE TRIGGER update_support_tickets_updated_at 
  BEFORE UPDATE ON support_tickets 
  FOR EACH ROW 
  EXECUTE FUNCTION update_support_tickets_updated_at();

CREATE TRIGGER update_support_ticket_replies_updated_at 
  BEFORE UPDATE ON support_ticket_replies 
  FOR EACH ROW 
  EXECUTE FUNCTION update_support_ticket_replies_updated_at();

-- Step 11: Insert sample data
INSERT INTO support_tickets (
  user_id,
  subject,
  category,
  priority,
  description,
  status
) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Payment issue with my order',
  'billing',
  'high',
  'I made a payment for my restaurant menu system but it shows as pending. The amount was deducted from my account but the order status is still pending.',
  'open'
), (
  (SELECT id FROM auth.users LIMIT 1),
  'Need help with Android TV app customization',
  'technical',
  'medium',
  'I need assistance with customizing the Android TV app interface. The color scheme is not matching my brand requirements.',
  'open'
), (
  (SELECT id FROM auth.users LIMIT 1),
  'Feature request for QR code ordering',
  'feature_request',
  'low',
  'I would like to request a feature for QR code ordering in the restaurant menu system. This would be very helpful for my customers.',
  'open'
);

-- Step 12: Create views for admin dashboard
CREATE OR REPLACE VIEW support_tickets_summary AS
SELECT 
  st.id,
  st.ticket_number,
  st.subject,
  st.category,
  st.priority,
  st.status,
  st.created_at,
  p.full_name as customer_name,
  p.email as customer_email,
  CASE 
    WHEN st.status = 'open' THEN 'Open'
    WHEN st.status = 'in_progress' THEN 'In Progress'
    WHEN st.status = 'resolved' THEN 'Resolved'
    WHEN st.status = 'closed' THEN 'Closed'
    ELSE st.status
  END as status_display,
  CASE 
    WHEN st.priority = 'low' THEN 'Low Priority'
    WHEN st.priority = 'medium' THEN 'Medium Priority'
    WHEN st.priority = 'high' THEN 'High Priority'
    WHEN st.priority = 'urgent' THEN 'Urgent'
    ELSE st.priority
  END as priority_display,
  CASE 
    WHEN st.category = 'technical' THEN 'Technical Issue'
    WHEN st.category = 'billing' THEN 'Billing & Payment'
    WHEN st.category = 'general' THEN 'General Question'
    WHEN st.category = 'feature_request' THEN 'Feature Request'
    ELSE st.category
  END as category_display
FROM support_tickets st
LEFT JOIN profiles p ON st.user_id = p.id
ORDER BY 
  CASE st.priority
    WHEN 'urgent' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
    ELSE 5
  END,
  st.created_at DESC;

-- Step 13: Create view for user tickets
CREATE OR REPLACE VIEW user_tickets_view AS
SELECT 
  st.id,
  st.ticket_number,
  st.subject,
  st.category,
  st.priority,
  st.status,
  st.description,
  st.created_at,
  st.updated_at,
  CASE 
    WHEN st.status = 'open' THEN 'Open'
    WHEN st.status = 'in_progress' THEN 'In Progress'
    WHEN st.status = 'resolved' THEN 'Resolved'
    WHEN st.status = 'closed' THEN 'Closed'
    ELSE st.status
  END as status_display,
  CASE 
    WHEN st.priority = 'low' THEN 'Low Priority'
    WHEN st.priority = 'medium' THEN 'Medium Priority'
    WHEN st.priority = 'high' THEN 'High Priority'
    WHEN st.priority = 'urgent' THEN 'Urgent'
    ELSE st.priority
  END as priority_display,
  CASE 
    WHEN st.category = 'technical' THEN 'Technical Issue'
    WHEN st.category = 'billing' THEN 'Billing & Payment'
    WHEN st.category = 'general' THEN 'General Question'
    WHEN st.category = 'feature_request' THEN 'Feature Request'
    ELSE st.category
  END as category_display,
  (SELECT COUNT(*) FROM support_ticket_replies str WHERE str.ticket_id = st.id AND str.is_admin_reply = true) as admin_replies_count
FROM support_tickets st
ORDER BY st.created_at DESC;

-- Step 14: Verify the tables and data
SELECT 'SUCCESS: Support ticket system created successfully!' as message;
SELECT COUNT(*) as total_tickets FROM support_tickets;
SELECT ticket_number, subject, category, priority, status FROM support_tickets LIMIT 5;

-- Step 15: Show table structures
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name IN ('support_tickets', 'support_ticket_replies', 'support_ticket_notifications')
ORDER BY table_name, ordinal_position;
