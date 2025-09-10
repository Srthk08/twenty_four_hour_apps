-- Authentication System Migration
-- This migration adds enhanced authentication features and user management

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum for user status
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification');

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'developer', 'support');

-- Enhanced profiles table with additional fields
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  company_name text,
  role user_role DEFAULT 'customer',
  status user_status DEFAULT 'pending_verification',
  avatar_url text,
  bio text,
  website text,
  location text,
  timezone text DEFAULT 'UTC',
  language text DEFAULT 'en',
  preferences jsonb DEFAULT '{}',
  last_login_at timestamptz,
  login_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, token_hash)
);

-- Email verification tokens table
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, token_hash)
);

-- User sessions table for better session management
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_token text UNIQUE NOT NULL,
  device_info jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  expires_at timestamptz NOT NULL,
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- User activity log table
CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  details jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company_name text,
  project_type text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  assigned_to uuid REFERENCES user_profiles(id),
  response text,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_created_at ON user_activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for password_reset_tokens
CREATE POLICY "Users can manage own reset tokens" ON password_reset_tokens FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for email_verification_tokens
CREATE POLICY "Users can manage own verification tokens" ON email_verification_tokens FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for user_sessions
CREATE POLICY "Users can manage own sessions" ON user_sessions FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for user_activity_log
CREATE POLICY "Users can view own activity" ON user_activity_log FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON user_activity_log FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all activity" ON user_activity_log FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can view all submissions" ON contact_submissions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update submissions" ON contact_submissions FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Functions for password reset functionality
CREATE OR REPLACE FUNCTION generate_password_reset_token(user_email text)
RETURNS text AS $$
DECLARE
  user_id uuid;
  token text;
  token_hash text;
BEGIN
  -- Get user ID from email
  SELECT id INTO user_id FROM user_profiles WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Generate random token
  token := encode(gen_random_bytes(32), 'hex');
  token_hash := crypt(token, gen_salt('bf'));
  
  -- Store token hash
  INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
  VALUES (user_id, token_hash, now() + interval '1 hour');
  
  RETURN token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to verify password reset token
CREATE OR REPLACE FUNCTION verify_password_reset_token(user_email text, token text)
RETURNS uuid AS $$
DECLARE
  user_id uuid;
  token_record record;
BEGIN
  -- Get user ID from email
  SELECT id INTO user_id FROM user_profiles WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Find valid token
  SELECT * INTO token_record 
  FROM password_reset_tokens 
  WHERE user_id = user_id 
    AND expires_at > now() 
    AND used_at IS NULL
  ORDER BY created_at DESC 
  LIMIT 1;
  
  IF token_record IS NULL THEN
    RAISE EXCEPTION 'No valid reset token found';
  END IF;
  
  -- Verify token
  IF crypt(token, token_record.token_hash) = token_record.token_hash THEN
    -- Mark token as used
    UPDATE password_reset_tokens 
    SET used_at = now() 
    WHERE id = token_record.id;
    
    RETURN user_id;
  ELSE
    RAISE EXCEPTION 'Invalid reset token';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
  user_id uuid,
  action text,
  details jsonb DEFAULT '{}',
  ip_address inet DEFAULT NULL,
  user_agent text DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO user_activity_log (user_id, action, details, ip_address, user_agent)
  VALUES (user_id, action, details, ip_address, user_agent);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user login information
CREATE OR REPLACE FUNCTION update_user_login_info(user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE user_profiles 
  SET last_login_at = now(),
      login_count = login_count + 1,
      updated_at = now()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM password_reset_tokens WHERE expires_at < now();
  DELETE FROM email_verification_tokens WHERE expires_at < now();
  DELETE FROM user_sessions WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a scheduled job to clean up expired tokens (runs every hour)
SELECT cron.schedule(
  'cleanup-expired-tokens',
  '0 * * * *',
  'SELECT cleanup_expired_tokens();'
);

-- Insert default admin user (password: admin123)
INSERT INTO user_profiles (id, email, full_name, role, status, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@devexpress.com',
  'System Administrator',
  'admin',
  'active',
  now(),
  now()
);

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer',
    'pending_verification'
  );
  
  -- Log the signup activity
  PERFORM log_user_activity(NEW.id, 'user_signup', '{"email": NEW.email}');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create trigger to update profile when user is updated
CREATE OR REPLACE FUNCTION handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_profiles 
  SET email = NEW.email,
      updated_at = now()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user updates
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_user_update();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create view for user dashboard data
CREATE VIEW user_dashboard_data AS
SELECT 
  up.id,
  up.email,
  up.full_name,
  up.role,
  up.status,
  up.avatar_url,
  up.company_name,
  up.last_login_at,
  up.login_count,
  up.created_at,
  COUNT(us.id) as active_sessions,
  COUNT(ual.id) as recent_activity_count
FROM user_profiles up
LEFT JOIN user_sessions us ON up.id = us.user_id AND us.expires_at > now()
LEFT JOIN user_activity_log ual ON up.id = ual.user_id AND ual.created_at > now() - interval '7 days'
GROUP BY up.id, up.email, up.full_name, up.role, up.status, up.avatar_url, up.company_name, up.last_login_at, up.login_count, up.created_at;

-- Grant access to the view
GRANT SELECT ON user_dashboard_data TO authenticated;
