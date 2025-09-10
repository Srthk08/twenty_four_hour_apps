-- Enhanced Authentication System Migration
-- This migration adds comprehensive authentication features, user management, and activity logging

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "cron";

-- Create enum for user status
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification', 'email_verified');

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'developer', 'support', 'moderator');

-- Create enum for activity types
CREATE TYPE activity_type AS ENUM (
  'user_signup', 'user_login', 'user_logout', 'profile_updated', 'password_changed',
  'password_reset_requested', 'email_verified', 'session_created', 'session_expired',
  'admin_action', 'security_event', 'data_access', 'payment_event'
);

-- Enhanced user_profiles table with comprehensive fields
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
  failed_login_attempts integer DEFAULT 0,
  last_failed_login_at timestamptz,
  account_locked_until timestamptz,
  email_verified_at timestamptz,
  phone_verified_at timestamptz,
  two_factor_enabled boolean DEFAULT false,
  two_factor_secret text,
  backup_codes text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, token_hash)
);

-- Enhanced email verification tokens table
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified_at timestamptz,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, token_hash)
);

-- Enhanced user sessions table for comprehensive session management
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_token text UNIQUE NOT NULL,
  refresh_token text UNIQUE NOT NULL,
  device_info jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  expires_at timestamptz NOT NULL,
  last_activity timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Comprehensive user activity log table
CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action activity_type NOT NULL,
  details jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  session_id uuid REFERENCES user_sessions(id),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- User security events table for tracking security-related activities
CREATE TABLE IF NOT EXISTS user_security_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  severity text DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  description text,
  ip_address inet,
  user_agent text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- User preferences table for storing user-specific settings
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  key text NOT NULL,
  value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category, key)
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
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to uuid REFERENCES profiles(id),
  response text,
  responded_at timestamptz,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_login_at ON user_profiles(last_login_at);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_used_at ON password_reset_tokens(used_at);

CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_expires_at ON email_verification_tokens(expires_at);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_is_active ON user_sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_token ON user_sessions(session_token);

CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_action ON user_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_created_at ON user_activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_session_id ON user_activity_log(session_id);

CREATE INDEX IF NOT EXISTS idx_user_security_events_user_id ON user_security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_security_events_event_type ON user_security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_user_security_events_severity ON user_security_events(severity);
CREATE INDEX IF NOT EXISTS idx_user_security_events_created_at ON user_security_events(created_at);

CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_category ON user_preferences(category);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_priority ON contact_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);
CREATE POLICY "Admins can update all profiles" ON user_profiles FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- RLS Policies for password_reset_tokens
CREATE POLICY "Users can manage own reset tokens" ON password_reset_tokens FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create reset tokens" ON password_reset_tokens FOR INSERT TO anon WITH CHECK (true);

-- RLS Policies for email_verification_tokens
CREATE POLICY "Users can manage own verification tokens" ON email_verification_tokens FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create verification tokens" ON email_verification_tokens FOR INSERT TO anon WITH CHECK (true);

-- RLS Policies for user_sessions
CREATE POLICY "Users can manage own sessions" ON user_sessions FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all sessions" ON user_sessions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- RLS Policies for user_activity_log
CREATE POLICY "Users can view own activity" ON user_activity_log FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON user_activity_log FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all activity" ON user_activity_log FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- RLS Policies for user_security_events
CREATE POLICY "Users can view own security events" ON user_security_events FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own security events" ON user_security_events FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all security events" ON user_security_events FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- RLS Policies for user_preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can view all submissions" ON contact_submissions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);
CREATE POLICY "Admins can update submissions" ON contact_submissions FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Enhanced Functions for authentication and user management

-- Function to generate password reset token
CREATE OR REPLACE FUNCTION generate_password_reset_token(user_email text, client_ip inet DEFAULT NULL, user_agent text DEFAULT NULL)
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
  
  -- Store token hash with client info
  INSERT INTO password_reset_tokens (user_id, token_hash, expires_at, ip_address, user_agent)
  VALUES (user_id, token_hash, now() + interval '1 hour', client_ip, user_agent);
  
  -- Log security event
  INSERT INTO user_security_events (user_id, event_type, severity, description, ip_address, user_agent)
  VALUES (user_id, 'password_reset_requested', 'info', 'Password reset token generated', client_ip, user_agent);
  
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
    
    -- Log security event
    INSERT INTO user_security_events (user_id, event_type, severity, description, ip_address, user_agent)
    VALUES (user_id, 'password_reset_verified', 'info', 'Password reset token verified', token_record.ip_address, token_record.user_agent);
    
    RETURN user_id;
  ELSE
    -- Log failed attempt
    INSERT INTO user_security_events (user_id, event_type, severity, description, ip_address, user_agent)
    VALUES (user_id, 'password_reset_failed', 'warning', 'Invalid password reset token used', token_record.ip_address, token_record.user_agent);
    
    RAISE EXCEPTION 'Invalid reset token';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
  user_id uuid,
  action activity_type,
  details jsonb DEFAULT '{}',
  ip_address inet DEFAULT NULL,
  user_agent text DEFAULT NULL,
  session_id uuid DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO user_activity_log (user_id, action, details, ip_address, user_agent, session_id)
  VALUES (user_id, action, details, ip_address, user_agent, session_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user login information
CREATE OR REPLACE FUNCTION update_user_login_info(user_id uuid, client_ip inet DEFAULT NULL, user_agent text DEFAULT NULL)
RETURNS void AS $$
BEGIN
  UPDATE user_profiles 
  SET last_login_at = now(),
      login_count = login_count + 1,
      failed_login_attempts = 0,
      account_locked_until = NULL,
      updated_at = now()
  WHERE id = user_id;
  
  -- Log successful login
  PERFORM log_user_activity(user_id, 'user_login', 
    jsonb_build_object('ip_address', client_ip, 'user_agent', user_agent),
    client_ip, user_agent);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record failed login attempt
CREATE OR REPLACE FUNCTION record_failed_login(user_email text, client_ip inet DEFAULT NULL, user_agent text DEFAULT NULL)
RETURNS void AS $$
DECLARE
  user_id uuid;
  failed_attempts integer;
BEGIN
  -- Get user ID from email
  SELECT id INTO user_id FROM user_profiles WHERE email = user_email;
  
  IF user_id IS NOT NULL THEN
    -- Update failed login count
    UPDATE user_profiles 
    SET failed_login_attempts = failed_login_attempts + 1,
        last_failed_login_at = now(),
        updated_at = now()
    WHERE id = user_id
    RETURNING failed_login_attempts INTO failed_attempts;
    
    -- Log failed login attempt
    PERFORM log_user_activity(user_id, 'security_event', 
      jsonb_build_object('event', 'failed_login', 'attempts', failed_attempts),
      client_ip, user_agent);
    
    -- Lock account after 5 failed attempts for 15 minutes
    IF failed_attempts >= 5 THEN
      UPDATE user_profiles 
      SET account_locked_until = now() + interval '15 minutes',
          updated_at = now()
      WHERE id = user_id;
      
      -- Log account lock
      PERFORM log_user_activity(user_id, 'security_event', 
        jsonb_build_object('event', 'account_locked', 'duration', '15 minutes'),
        client_ip, user_agent);
    END IF;
  END IF;
  
  -- Log security event
  INSERT INTO user_security_events (user_id, event_type, severity, description, ip_address, user_agent)
  VALUES (user_id, 'failed_login_attempt', 'warning', 'Failed login attempt', client_ip, user_agent);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired tokens and sessions
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void AS $$
BEGIN
  -- Clean up expired tokens
  DELETE FROM password_reset_tokens WHERE expires_at < now();
  DELETE FROM email_verification_tokens WHERE expires_at < now();
  
  -- Clean up expired sessions
  UPDATE user_sessions SET is_active = false WHERE expires_at < now();
  
  -- Clean up old activity logs (keep last 90 days)
  DELETE FROM user_activity_log WHERE created_at < now() - interval '90 days';
  
  -- Clean up old security events (keep last 180 days)
  DELETE FROM user_security_events WHERE created_at < now() - interval '180 days';
  
  -- Clean up old contact submissions (keep last 2 years)
  DELETE FROM contact_submissions WHERE created_at < now() - interval '2 years';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user dashboard data
CREATE OR REPLACE FUNCTION get_user_dashboard_data(user_uuid uuid)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'profile', row_to_json(up.*),
    'stats', json_build_object(
      'total_sessions', (SELECT COUNT(*) FROM user_sessions WHERE user_id = user_uuid AND is_active = true),
      'recent_activity', (SELECT COUNT(*) FROM user_activity_log WHERE user_id = user_uuid AND created_at > now() - interval '7 days'),
      'security_events', (SELECT COUNT(*) FROM user_security_events WHERE user_id = user_uuid AND created_at > now() - interval '30 days')
    ),
    'recent_activity', (
      SELECT json_agg(row_to_json(ual.*))
      FROM user_activity_log ual
      WHERE ual.user_id = user_uuid
      ORDER BY ual.created_at DESC
      LIMIT 10
    )
  ) INTO result
  FROM user_profiles up
  WHERE up.id = user_uuid;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a scheduled job to clean up expired data (runs every hour)
SELECT cron.schedule(
  'cleanup-expired-data',
  '0 * * * *',
  'SELECT cleanup_expired_data();'
);

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name, role, status, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer',
    'pending_verification',
    now(),
    now()
  );
  
  -- Log the signup activity
  PERFORM log_user_activity(NEW.id, 'user_signup', 
    jsonb_build_object('email', NEW.email, 'provider', COALESCE(NEW.raw_user_meta_data->>'provider', 'email')));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
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
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_user_update();

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create view for user dashboard data
CREATE OR REPLACE VIEW user_dashboard_data AS
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
  up.updated_at,
  COUNT(DISTINCT us.id) as active_sessions,
  COUNT(DISTINCT ual.id) as recent_activity_count,
  COUNT(DISTINCT use.id) as security_events_count
FROM user_profiles up
LEFT JOIN user_sessions us ON up.id = us.user_id AND us.is_active = true AND us.expires_at > now()
LEFT JOIN user_activity_log ual ON up.id = ual.user_id AND ual.created_at > now() - interval '7 days'
LEFT JOIN user_security_events use ON up.id = use.user_id AND use.created_at > now() - interval '30 days'
GROUP BY up.id, up.email, up.full_name, up.role, up.status, up.avatar_url, up.company_name, 
         up.last_login_at, up.login_count, up.created_at, up.updated_at;

-- Grant access to the view
GRANT SELECT ON user_dashboard_data TO authenticated;

-- Insert default admin user (password: admin123)
INSERT INTO user_profiles (id, email, full_name, role, status, email_verified_at, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@devexpress.com',
  'System Administrator',
  'admin',
  'active',
  now(),
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Create initial admin user in auth.users if it doesn't exist
-- Note: This requires admin privileges and should be done manually in production
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES (
--   '00000000-0000-0000-0000-000000000001',
--   'admin@devexpress.com',
--   crypt('admin123', gen_salt('bf')),
--   now(),
--   now(),
--   now()
-- ) ON CONFLICT (id) DO NOTHING;

-- Create indexes for full-text search on user profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_full_name_gin ON user_profiles USING gin(to_tsvector('english', full_name));
CREATE INDEX IF NOT EXISTS idx_user_profiles_company_name_gin ON user_profiles USING gin(to_tsvector('english', company_name));

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_role_status ON user_profiles(role, status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email_status ON user_profiles(email, status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at_status ON user_profiles(created_at, status);

-- Create partial indexes for active users
CREATE INDEX IF NOT EXISTS idx_user_profiles_active_users ON user_profiles(id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_user_profiles_pending_verification ON user_profiles(id) WHERE status = 'pending_verification';

-- Create function to search users
CREATE OR REPLACE FUNCTION search_users(
  search_term text DEFAULT '',
  user_role user_role DEFAULT NULL,
  user_status user_status DEFAULT NULL,
  limit_count integer DEFAULT 50
)
RETURNS TABLE(
  id uuid,
  email text,
  full_name text,
  company_name text,
  role user_role,
  status user_status,
  last_login_at timestamptz,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.id,
    up.email,
    up.full_name,
    up.company_name,
    up.role,
    up.status,
    up.last_login_at,
    up.created_at
  FROM user_profiles up
  WHERE 
    (search_term = '' OR 
     to_tsvector('english', COALESCE(up.full_name, '') || ' ' || COALESCE(up.company_name, '') || ' ' || up.email) @@ plainto_tsquery('english', search_term))
    AND (user_role IS NULL OR up.role = user_role)
    AND (user_status IS NULL OR up.status = user_status)
  ORDER BY up.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on search function
GRANT EXECUTE ON FUNCTION search_users TO authenticated;

-- Create function to get user statistics for admins
CREATE OR REPLACE FUNCTION get_user_statistics()
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM user_profiles),
    'active_users', (SELECT COUNT(*) FROM user_profiles WHERE status = 'active'),
    'pending_verification', (SELECT COUNT(*) FROM user_profiles WHERE status = 'pending_verification'),
    'suspended_users', (SELECT COUNT(*) FROM user_profiles WHERE status = 'suspended'),
    'users_by_role', (
      SELECT json_object_agg(role, count)
      FROM (
        SELECT role, COUNT(*) as count
        FROM user_profiles
        GROUP BY role
      ) role_counts
    ),
    'recent_signups', (
      SELECT COUNT(*)
      FROM user_profiles
      WHERE created_at > now() - interval '7 days'
    ),
    'recent_logins', (
      SELECT COUNT(*)
      FROM user_profiles
      WHERE last_login_at > now() - interval '7 days'
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on statistics function (admin only)
GRANT EXECUTE ON FUNCTION get_user_statistics TO authenticated;

-- Create RLS policy for statistics function (admin only)
CREATE POLICY "Only admins can get user statistics" ON user_profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Final setup message
DO $$
BEGIN
  RAISE NOTICE 'Enhanced authentication system migration completed successfully!';
  RAISE NOTICE 'Features enabled:';
  RAISE NOTICE '- Comprehensive user profiles with enhanced fields';
  RAISE NOTICE '- Advanced session management';
  RAISE NOTICE '- Activity logging and security event tracking';
  RAISE NOTICE '- Password reset and email verification';
  RAISE NOTICE '- User preferences and settings';
  RAISE NOTICE '- Admin tools and user management';
  RAISE NOTICE '- Automated cleanup and maintenance';
  RAISE NOTICE '- Full-text search capabilities';
  RAISE NOTICE '- Row-level security policies';
END $$;
