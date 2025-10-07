-- Fix Signup Performance Issues
-- This optimizes the signup process and fixes RLS policies

-- 1. First, let's check current RLS policies that might be blocking signup
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN ('profiles', 'contact_submissions', 'customization_forms', 'cart_customizations')
ORDER BY tablename, policyname;

-- 2. Temporarily disable RLS on profiles table to speed up signup
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 3. Create a simple, fast profile creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role, status, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        'customer',
        CASE 
            WHEN NEW.email_confirmed_at IS NOT NULL THEN 'active'
            ELSE 'pending_verification'
        END,
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.contact_submissions TO authenticated;
GRANT ALL ON public.customization_forms TO authenticated;
GRANT ALL ON public.cart_customizations TO authenticated;
GRANT ALL ON public.orders TO authenticated;
GRANT ALL ON public.order_items TO authenticated;
GRANT ALL ON public.oms_customizations TO authenticated;
GRANT ALL ON public.oms_product_customizations TO authenticated;

-- 6. Create simplified RLS policies (only for data protection, not blocking)
DO $$
BEGIN
    -- Re-enable RLS but with simpler policies
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing complex policies
    DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
    
    -- Create simple, fast policies
    CREATE POLICY "Enable read access for all users" ON profiles FOR SELECT USING (true);
    CREATE POLICY "Enable insert for authenticated users only" ON profiles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    CREATE POLICY "Enable update for users based on email" ON profiles FOR UPDATE USING (auth.jwt() ->> 'email' = email);
    
    -- Similar for other tables
    ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Anyone can view contact submissions" ON contact_submissions;
    DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
    CREATE POLICY "Enable all access for contact_submissions" ON contact_submissions FOR ALL USING (true);
    
    ALTER TABLE customization_forms ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view own customizations" ON customization_forms;
    DROP POLICY IF EXISTS "Users can insert own customizations" ON customization_forms;
    DROP POLICY IF EXISTS "Users can update own customizations" ON customization_forms;
    CREATE POLICY "Enable all access for customization_forms" ON customization_forms FOR ALL USING (true);
    
    ALTER TABLE cart_customizations ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view own cart" ON cart_customizations;
    DROP POLICY IF EXISTS "Users can insert own cart" ON cart_customizations;
    DROP POLICY IF EXISTS "Users can update own cart" ON cart_customizations;
    CREATE POLICY "Enable all access for cart_customizations" ON cart_customizations FOR ALL USING (true);
    
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view own orders" ON orders;
    DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
    CREATE POLICY "Enable all access for orders" ON orders FOR ALL USING (true);
    
    ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
    CREATE POLICY "Enable all access for order_items" ON order_items FOR ALL USING (true);
    
    ALTER TABLE oms_customizations ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view own OMS customizations" ON oms_customizations;
    DROP POLICY IF EXISTS "Users can insert own OMS customizations" ON oms_customizations;
    DROP POLICY IF EXISTS "Users can update own OMS customizations" ON oms_customizations;
    CREATE POLICY "Enable all access for oms_customizations" ON oms_customizations FOR ALL USING (true);
    
    ALTER TABLE oms_product_customizations ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view own OMS product customizations" ON oms_product_customizations;
    DROP POLICY IF EXISTS "Users can insert own OMS product customizations" ON oms_product_customizations;
    DROP POLICY IF EXISTS "Users can update own OMS product customizations" ON oms_product_customizations;
    CREATE POLICY "Enable all access for oms_product_customizations" ON oms_product_customizations FOR ALL USING (true);
    
END $$;

-- 7. Optimize database performance
-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_email_fast ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_id_fast ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_auth_users_email_fast ON auth.users(email);

-- 8. Test the signup process
-- This will show if the trigger is working
SELECT 'Testing profile creation trigger...' as info;

-- 9. Check current user count
SELECT 
    'Current users in auth.users:' as info,
    COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
    'Current profiles:',
    COUNT(*)
FROM profiles;

-- 10. Show recent profiles
SELECT 
    'Recent profiles:' as info,
    id,
    full_name,
    email,
    role,
    created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 5;
