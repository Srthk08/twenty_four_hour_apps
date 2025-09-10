-- Step 3: Create basic RLS policies
-- Policy for users to insert their own tickets
CREATE POLICY "Users can insert their own tickets" ON support_tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to view their own tickets
CREATE POLICY "Users can view their own tickets" ON support_tickets
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to update their own tickets
CREATE POLICY "Users can update their own tickets" ON support_tickets
  FOR UPDATE USING (auth.uid() = user_id);
