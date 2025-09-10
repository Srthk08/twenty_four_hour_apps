-- Step 1: Create the support_tickets table (run this first)
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  user_id uuid,
  user_email text NOT NULL,
  customer_name text,
  customer_email text,
  subject text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'general',
  priority text DEFAULT 'medium',
  status text DEFAULT 'open',
  admin_replies jsonb DEFAULT '[]'::jsonb,
  assigned_to uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  closed_at timestamptz,
  admin_notes text
);
