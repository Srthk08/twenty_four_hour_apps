-- Complete Fix for Support Tickets Table
-- Run this in Supabase SQL Editor

-- First, check if the table exists and what columns it has
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets'
ORDER BY ordinal_position;

-- Drop the table if it exists (to start fresh)
DROP TABLE IF EXISTS support_tickets CASCADE;

-- Create the support_tickets table with the correct schema
CREATE TABLE support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  user_email text NOT NULL,
  customer_name text,
  customer_email text,
  subject text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'general' CHECK (category IN ('technical', 'billing', 'general', 'feature_request')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  admin_replies jsonb DEFAULT '[]'::jsonb,
  assigned_to uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  closed_at timestamptz,
  admin_notes text
);

-- Create indexes for better performance
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_user_email ON support_tickets(user_email);
CREATE INDEX idx_support_tickets_customer_email ON support_tickets(customer_email);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);

-- Enable Row Level Security
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can create tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can update their own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can view all tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can update all tickets" ON support_tickets;

-- Create RLS policies
-- Users can view their own tickets
CREATE POLICY "Users can view their own tickets" ON support_tickets
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR 
    user_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Users can create tickets
CREATE POLICY "Users can create tickets" ON support_tickets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own tickets
CREATE POLICY "Users can update their own tickets" ON support_tickets
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Admins can view all tickets
CREATE POLICY "Admins can view all tickets" ON support_tickets
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all tickets
CREATE POLICY "Admins can update all tickets" ON support_tickets
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Grant permissions
GRANT ALL ON support_tickets TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Insert some sample tickets for testing
INSERT INTO support_tickets (ticket_number, user_id, user_email, customer_name, customer_email, subject, description, priority, status) VALUES
('TKT-20250106-0001', (SELECT id FROM auth.users LIMIT 1), 'test@example.com', 'Test User', 'test@example.com', 'Test Ticket 1', 'This is a test ticket for testing purposes', 'medium', 'open'),
('TKT-20250106-0002', (SELECT id FROM auth.users LIMIT 1), 'test@example.com', 'Test User', 'test@example.com', 'Test Ticket 2', 'Another test ticket for testing purposes', 'high', 'in_progress');

-- Verify the table was created correctly
SELECT 
  'support_tickets' as table_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_tickets') as exists;

-- Show the final table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets'
ORDER BY ordinal_position;

-- Test the policies by checking if we can select from the table
SELECT COUNT(*) as total_tickets FROM support_tickets;