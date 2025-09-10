-- Contact Form SQL Script for Supabase
-- This will create the table and allow data storage from contact page

-- Step 1: Create the contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  project_type text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  replied_at timestamptz,
  notes text
);

-- Step 2: Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies for authenticated users
CREATE POLICY "Enable insert for authenticated users" ON contact_messages
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable select for users based on user_id" ON contact_messages
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Enable update for users based on user_id" ON contact_messages
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Step 4: Create RLS policies for admin users (to view all messages)
CREATE POLICY "Enable select for admin users" ON contact_messages
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Enable update for admin users" ON contact_messages
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 5: Create indexes for better performance
CREATE INDEX idx_contact_messages_user_id ON contact_messages(user_id);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_project_type ON contact_messages(project_type);

-- Step 6: Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 7: Create trigger
CREATE TRIGGER update_contact_messages_updated_at 
  BEFORE UPDATE ON contact_messages 
  FOR EACH ROW 
  EXECUTE FUNCTION update_contact_messages_updated_at();

-- Step 8: Insert sample data to verify everything works
INSERT INTO contact_messages (
  first_name,
  last_name,
  email,
  phone,
  company,
  project_type,
  message,
  status,
  priority
) VALUES (
  'John',
  'Doe',
  'john.doe@example.com',
  '+1 (555) 123-4567',
  'Tech Solutions Inc',
  'restaurant-menu',
  'I need a restaurant menu system for my new restaurant. Looking for QR code ordering and real-time updates.',
  'new',
  'normal'
), (
  'Jane',
  'Smith',
  'jane.smith@example.com',
  '+1 (555) 987-6543',
  'Streaming Corp',
  'streaming-app',
  'We need a mobile streaming app for our content platform. Should support live streaming and VOD.',
  'new',
  'high'
);

-- Step 9: Create a view for admin dashboard
CREATE OR REPLACE VIEW contact_messages_summary AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  project_type,
  status,
  priority,
  created_at,
  CASE 
    WHEN status = 'new' THEN 'New Message'
    WHEN status = 'read' THEN 'Read'
    WHEN status = 'replied' THEN 'Replied'
    WHEN status = 'closed' THEN 'Closed'
    ELSE status
  END as status_display,
  CASE 
    WHEN priority = 'low' THEN 'Low Priority'
    WHEN priority = 'normal' THEN 'Normal Priority'
    WHEN priority = 'high' THEN 'High Priority'
    WHEN priority = 'urgent' THEN 'Urgent'
    ELSE priority
  END as priority_display
FROM contact_messages
ORDER BY 
  CASE priority
    WHEN 'urgent' THEN 1
    WHEN 'high' THEN 2
    WHEN 'normal' THEN 3
    WHEN 'low' THEN 4
    ELSE 5
  END,
  created_at DESC;

-- Step 10: Verify the table and data
SELECT 'SUCCESS: contact_messages table created successfully!' as message;
SELECT COUNT(*) as total_messages FROM contact_messages;
SELECT first_name, last_name, project_type, status FROM contact_messages LIMIT 5;

-- Step 11: Show table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'contact_messages' 
ORDER BY ordinal_position;
