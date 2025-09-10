-- Complete User System Migration
-- This migration adds comprehensive user management, admin panel support, and enhanced data storage
-- Updated to work with existing 'profiles' table

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Update existing profiles table to support enhanced roles and admin features
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS username text UNIQUE,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending_verification' CHECK (status IN ('active', 'inactive', 'suspended', 'pending_verification', 'email_verified')),
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC',
ADD COLUMN IF NOT EXISTS language text DEFAULT 'en',
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_login_at timestamptz,
ADD COLUMN IF NOT EXISTS login_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS failed_login_attempts integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_failed_login_at timestamptz,
ADD COLUMN IF NOT EXISTS account_locked_until timestamptz,
ADD COLUMN IF NOT EXISTS email_verified_at timestamptz,
ADD COLUMN IF NOT EXISTS phone_verified_at timestamptz,
ADD COLUMN IF NOT EXISTS two_factor_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS two_factor_secret text,
ADD COLUMN IF NOT EXISTS backup_codes text[];

-- Update role enum to support more roles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('customer', 'admin', 'developer', 'support', 'moderator'));

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

-- Create admin_users table for enhanced admin management
CREATE TABLE IF NOT EXISTS admin_users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    admin_level text DEFAULT 'standard' CHECK (admin_level IN ('standard', 'senior', 'super')),
    permissions jsonb DEFAULT '{}',
    last_admin_action timestamptz,
    admin_notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create user_preferences table for user settings
CREATE TABLE IF NOT EXISTS user_preferences (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    theme text DEFAULT 'light',
    language text DEFAULT 'en',
    notifications jsonb DEFAULT '{}',
    privacy_settings jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create user_verification table for email/phone verification
CREATE TABLE IF NOT EXISTS user_verification (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    verification_type text NOT NULL CHECK (verification_type IN ('email', 'phone', 'identity')),
    verification_code text NOT NULL,
    expires_at timestamptz NOT NULL,
    verified_at timestamptz,
    attempts integer DEFAULT 0,
    max_attempts integer DEFAULT 3,
    created_at timestamptz DEFAULT now()
);

-- Create admin_audit_log table for admin actions
CREATE TABLE IF NOT EXISTS admin_audit_log (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id uuid REFERENCES admin_users(id) ON DELETE SET NULL,
    action text NOT NULL,
    target_type text,
    target_id uuid,
    details jsonb DEFAULT '{}',
    ip_address inet,
    user_agent text,
    created_at timestamptz DEFAULT now()
);

-- Create user_sessions_enhanced table for better session management
CREATE TABLE IF NOT EXISTS user_sessions_enhanced (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    session_id text UNIQUE NOT NULL,
    device_type text,
    device_name text,
    browser text,
    os text,
    ip_address inet,
    location_data jsonb DEFAULT '{}',
    is_active boolean DEFAULT true,
    last_activity timestamptz DEFAULT now(),
    expires_at timestamptz NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create user_security_events table for security monitoring
CREATE TABLE IF NOT EXISTS user_security_events (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    event_type text NOT NULL CHECK (event_type IN ('login_attempt', 'password_change', 'profile_update', 'security_alert', 'suspicious_activity')),
    severity text DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    details jsonb DEFAULT '{}',
    ip_address inet,
    user_agent text,
    resolved boolean DEFAULT false,
    resolved_by uuid REFERENCES profiles(id),
    resolved_at timestamptz,
    created_at timestamptz DEFAULT now()
);

-- Create user_activity_log table for comprehensive activity tracking
CREATE TABLE IF NOT EXISTS user_activity_log (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    action text NOT NULL,
    details jsonb DEFAULT '{}',
    ip_address inet,
    user_agent text,
    created_at timestamptz DEFAULT now()
);

-- Insert default admin user if admin user exists
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Check if admin user exists
    SELECT id INTO admin_user_id 
    FROM profiles 
    WHERE role = 'admin' 
    LIMIT 1;
    
    -- If admin user exists, create admin_users entry
    IF admin_user_id IS NOT NULL THEN
        INSERT INTO admin_users (user_id, admin_level, permissions, admin_notes)
        VALUES (
            admin_user_id,
            'super',
            '{"users": "full", "orders": "full", "analytics": "full", "settings": "full"}',
            'Default super admin user'
        )
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Create functions for user management

-- Function to get user with complete profile
CREATE OR REPLACE FUNCTION get_user_complete_profile(user_uuid uuid)
RETURNS TABLE (
    id uuid,
    email text,
    full_name text,
    phone text,
    company_name text,
    role text,
    status text,
    username text,
    avatar_url text,
    bio text,
    website text,
    location text,
    timezone text,
    language text,
    preferences jsonb,
    last_login_at timestamptz,
    login_count integer,
    created_at timestamptz,
    updated_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.email,
        p.full_name,
        p.phone,
        p.company_name,
        p.role::text,
        p.status::text,
        p.username,
        p.avatar_url,
        p.bio,
        p.website,
        p.location,
        p.timezone,
        p.language,
        p.preferences,
        p.last_login_at,
        p.login_count,
        p.created_at,
        p.updated_at
    FROM profiles p
    WHERE p.id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user login info
CREATE OR REPLACE FUNCTION update_user_login_info(user_uuid uuid)
RETURNS void AS $$
BEGIN
    UPDATE profiles 
    SET 
        last_login_at = now(),
        login_count = login_count + 1,
        updated_at = now()
    WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get admin users
CREATE OR REPLACE FUNCTION get_admin_users()
RETURNS TABLE (
    user_id uuid,
    email text,
    full_name text,
    role text,
    admin_level text,
    permissions jsonb,
    last_admin_action timestamptz,
    created_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.email,
        p.full_name,
        p.role::text,
        au.admin_level,
        au.permissions,
        au.last_admin_action,
        au.created_at
    FROM profiles p
    JOIN admin_users au ON p.id = au.user_id
    WHERE p.role IN ('admin', 'developer', 'support')
    ORDER BY au.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for new tables

-- Admin users table policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can view all admin users" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'developer', 'support')
        )
    );

CREATE POLICY "Only super admins can modify admin users" ON admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN admin_users au ON p.id = au.user_id
            WHERE p.id = auth.uid() AND au.admin_level = 'super'
        )
    );

-- User preferences table policies
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences" ON user_preferences
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can modify their own preferences" ON user_preferences
    FOR ALL USING (user_id = auth.uid());

-- User verification table policies
ALTER TABLE user_verification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own verification records" ON user_verification
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create verification records" ON user_verification
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin audit log table policies
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can view audit logs" ON admin_audit_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'developer', 'support')
        )
    );

CREATE POLICY "Admin users can create audit logs" ON admin_audit_log
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'developer', 'support')
        )
    );

-- User sessions enhanced table policies
ALTER TABLE user_sessions_enhanced ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions" ON user_sessions_enhanced
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own sessions" ON user_sessions_enhanced
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own sessions" ON user_sessions_enhanced
    FOR UPDATE USING (user_id = auth.uid());

-- User security events table policies
ALTER TABLE user_security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own security events" ON user_security_events
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create security events" ON user_security_events
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- User activity log table policies
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity logs" ON user_activity_log
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create activity logs" ON user_activity_log
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create triggers for automatic updates

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables that need it
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_sessions_enhanced_updated_at BEFORE UPDATE ON user_sessions_enhanced
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_verification_user_id ON user_verification(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_admin_user_id ON admin_audit_log(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_enhanced_user_id ON user_sessions_enhanced(user_id);
CREATE INDEX IF NOT EXISTS idx_user_security_events_user_id ON user_security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON user_activity_log(user_id);

-- Create views for easier data access

-- View for complete user profiles
CREATE OR REPLACE VIEW profiles_complete AS
SELECT 
    p.*,
    au.admin_level,
    au.permissions as admin_permissions,
    upref.theme,
    upref.language,
    upref.notifications,
    upref.privacy_settings
FROM profiles p
LEFT JOIN admin_users au ON p.id = au.user_id
LEFT JOIN user_preferences upref ON p.id = upref.user_id;

-- View for admin dashboard data
CREATE OR REPLACE VIEW admin_dashboard_data AS
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN status = 'pending_verification' THEN 1 END) as pending_users,
    COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
    COUNT(CASE WHEN role = 'customer' THEN 1 END) as customer_users,
    COUNT(CASE WHEN created_at >= now() - interval '24 hours' THEN 1 END) as new_users_today,
    COUNT(CASE WHEN last_login_at >= now() - interval '24 hours' THEN 1 END) as active_users_today
FROM profiles;

-- Grant necessary permissions
GRANT SELECT ON profiles_complete TO authenticated;
GRANT SELECT ON admin_dashboard_data TO authenticated;

-- Final message
DO $$
BEGIN
    RAISE NOTICE 'Complete User System migration completed successfully!';
    RAISE NOTICE 'Updated existing profiles table with new fields';
    RAISE NOTICE 'New tables created: admin_users, user_preferences, user_verification, admin_audit_log, user_sessions_enhanced, user_security_events, user_activity_log';
    RAISE NOTICE 'New functions created: get_user_complete_profile, update_user_login_info, get_admin_users';
    RAISE NOTICE 'New views created: profiles_complete, admin_dashboard_data';
    RAISE NOTICE 'RLS policies and triggers configured for security';
END $$;
