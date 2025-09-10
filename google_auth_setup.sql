-- Google Authentication Setup
-- This script sets up the database for Google OAuth integration

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Update profiles table to support Google authentication
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS provider text DEFAULT 'email' CHECK (provider IN ('email', 'google', 'facebook', 'github'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS provider_id text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS google_id text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS google_email text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS google_name text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS google_picture text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false;

-- Create unique index for provider_id to prevent duplicate accounts
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_provider_id ON profiles(provider, provider_id) WHERE provider_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_google_id ON profiles(google_id) WHERE google_id IS NOT NULL;

-- Create function to handle Google user creation/update
CREATE OR REPLACE FUNCTION handle_google_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user already exists with this email
  IF EXISTS (SELECT 1 FROM profiles WHERE email = NEW.email) THEN
    -- Update existing user with Google info
    UPDATE profiles SET
      provider = 'google',
      provider_id = NEW.provider_id,
      google_id = NEW.google_id,
      google_email = NEW.google_email,
      google_name = NEW.google_name,
      google_picture = NEW.google_picture,
      avatar_url = COALESCE(avatar_url, NEW.google_picture),
      full_name = COALESCE(full_name, NEW.google_name),
      email_verified = true,
      updated_at = now()
    WHERE email = NEW.email;
    
    -- Return the updated user
    RETURN (SELECT * FROM profiles WHERE email = NEW.email);
  ELSE
    -- Create new user
    INSERT INTO profiles (
      id, email, full_name, provider, provider_id, 
      google_id, google_email, google_name, google_picture,
      avatar_url, email_verified, role, status, created_at, updated_at
    ) VALUES (
      NEW.id, NEW.email, NEW.google_name, 'google', NEW.provider_id,
      NEW.google_id, NEW.google_email, NEW.google_name, NEW.google_picture,
      NEW.google_picture, true, 'customer', 'active', now(), now()
    );
    
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for Google user handling
DROP TRIGGER IF EXISTS on_google_user_created ON profiles;
CREATE TRIGGER on_google_user_created
  BEFORE INSERT ON profiles
  FOR EACH ROW
  WHEN (NEW.provider = 'google')
  EXECUTE FUNCTION handle_google_user();

-- Create function to sync Google user data
CREATE OR REPLACE FUNCTION sync_google_user(
  p_google_id text,
  p_email text,
  p_name text,
  p_picture text,
  p_provider_id text
) RETURNS profiles AS $$
DECLARE
  user_record profiles%ROWTYPE;
BEGIN
  -- Check if user exists with Google ID
  SELECT * INTO user_record FROM profiles WHERE google_id = p_google_id;
  
  IF FOUND THEN
    -- Update existing Google user
    UPDATE profiles SET
      email = p_email,
      full_name = p_name,
      google_email = p_email,
      google_name = p_name,
      google_picture = p_picture,
      avatar_url = COALESCE(avatar_url, p_picture),
      email_verified = true,
      updated_at = now()
    WHERE google_id = p_google_id
    RETURNING * INTO user_record;
  ELSE
    -- Check if user exists with email
    SELECT * INTO user_record FROM profiles WHERE email = p_email;
    
    IF FOUND THEN
      -- Update existing user to Google
      UPDATE profiles SET
        provider = 'google',
        provider_id = p_provider_id,
        google_id = p_google_id,
        google_email = p_email,
        google_name = p_name,
        google_picture = p_picture,
        avatar_url = COALESCE(avatar_url, p_picture),
        full_name = COALESCE(full_name, p_name),
        email_verified = true,
        updated_at = now()
      WHERE email = p_email
      RETURNING * INTO user_record;
    ELSE
      -- Create new Google user
      INSERT INTO profiles (
        email, full_name, provider, provider_id,
        google_id, google_email, google_name, google_picture,
        avatar_url, email_verified, role, status, created_at, updated_at
      ) VALUES (
        p_email, p_name, 'google', p_provider_id,
        p_google_id, p_email, p_name, p_picture,
        p_picture, true, 'customer', 'active', now(), now()
      ) RETURNING * INTO user_record;
    END IF;
  END IF;
  
  RETURN user_record;
END;
$$ LANGUAGE plpgsql;

-- Create view for Google users
CREATE OR REPLACE VIEW google_users AS
SELECT 
  id,
  email,
  full_name,
  google_id,
  google_email,
  google_name,
  google_picture,
  avatar_url,
  provider,
  provider_id,
  email_verified,
  role,
  status,
  created_at,
  updated_at
FROM profiles 
WHERE provider = 'google' OR google_id IS NOT NULL;

-- Update RLS policies for Google authentication
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (
  auth.uid() = id OR 
  (provider = 'google' AND provider_id = auth.jwt() ->> 'sub')
);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (
  auth.uid() = id OR 
  (provider = 'google' AND provider_id = auth.jwt() ->> 'sub')
);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = id OR 
  (provider = 'google' AND provider_id = auth.jwt() ->> 'sub')
);

-- Allow Google users to insert their profile
DROP POLICY IF EXISTS "Google users can create profile" ON profiles;
CREATE POLICY "Google users can create profile" ON profiles FOR INSERT TO authenticated WITH CHECK (
  provider = 'google' AND provider_id = auth.jwt() ->> 'sub'
);

-- Grant permissions
GRANT ALL ON profiles TO anon, authenticated;
GRANT EXECUTE ON FUNCTION sync_google_user TO anon, authenticated;
GRANT SELECT ON google_users TO authenticated;

-- Insert test Google user (optional)
INSERT INTO profiles (
  email, full_name, provider, provider_id, google_id, 
  google_email, google_name, google_picture, avatar_url, 
  email_verified, role, status
) VALUES (
  'test.google@example.com', 'Google Test User', 'google', 'google_123456789',
  'google_123456789', 'test.google@example.com', 'Google Test User', 
  'https://via.placeholder.com/150', 'https://via.placeholder.com/150',
  true, 'customer', 'active'
) ON CONFLICT (google_id) DO NOTHING;

-- Show success message
DO $$
BEGIN
  RAISE NOTICE 'Google authentication setup completed successfully!';
  RAISE NOTICE 'Database schema updated for Google OAuth integration.';
  RAISE NOTICE 'Functions and triggers created for Google user management.';
  RAISE NOTICE 'RLS policies updated for Google authentication.';
END $$;
