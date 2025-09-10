-- Create Support Tickets Table with Email Field
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number text UNIQUE DEFAULT 'TKT-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0'),
  user_id uuid REFERENCES auth.users(id),
  user_email text NOT NULL,
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

-- Enable Row Level Security
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY IF NOT EXISTS "Enable insert for authenticated users" ON support_tickets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Enable select for users based on user_id" ON support_tickets
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Enable update for users based on user_id" ON support_tickets
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Admin can view all tickets
CREATE POLICY IF NOT EXISTS "Admins can view all support tickets" ON support_tickets
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Verify table creation
SELECT 
  'support_tickets' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') as exists;

-- Show table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets'
ORDER BY ordinal_position;
