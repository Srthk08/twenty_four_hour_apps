-- Simple Support Tickets Fix
-- Run this in Supabase SQL Editor

-- Drop existing table if it exists (to avoid conflicts)
DROP TABLE IF EXISTS support_tickets CASCADE;

-- Create the support_tickets table
CREATE TABLE support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  user_email text NOT NULL,
  customer_name text,
  customer_email text,
  subject text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'general',
  priority text DEFAULT 'medium',
  status text DEFAULT 'open',
  admin_replies jsonb DEFAULT '[]'::jsonb,
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
-- Policy for users to insert their own tickets
CREATE POLICY "Users can insert their own tickets" ON support_tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to view their own tickets
CREATE POLICY "Users can view their own tickets" ON support_tickets
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to update their own tickets
CREATE POLICY "Users can update their own tickets" ON support_tickets
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for admins to view all tickets
CREATE POLICY "Admins can view all tickets" ON support_tickets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Policy for admins to update all tickets
CREATE POLICY "Admins can update all tickets" ON support_tickets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_user_email ON support_tickets(user_email);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);

-- Insert a test ticket
INSERT INTO support_tickets (
  ticket_number,
  user_id,
  user_email,
  customer_name,
  customer_email,
  subject,
  description,
  priority,
  status
) VALUES (
  'TKT-TEST-001',
  auth.uid(),
  'test@example.com',
  'Test User',
  'test@example.com',
  'Test Ticket',
  'This is a test ticket to verify the table works',
  'medium',
  'open'
);

-- Verify the table was created
SELECT COUNT(*) as total_tickets FROM support_tickets;

-- Show table structure
\d support_tickets;
