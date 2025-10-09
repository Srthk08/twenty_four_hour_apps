// DEBUG ROLE SCRIPT
// Run this in the browser console to check what role a user has

import { createClient } from '@supabase/supabase-js';

// Supabase configuration - Replace with your actual values
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check current user's role
async function debugUserRole() {
  try {
    console.log('🔍 Starting role debug...');
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('❌ Error getting user:', userError);
      return;
    }
    
    if (!user) {
      console.log('❌ No user logged in');
      return;
    }
    
    console.log('✅ User found:', user.email);
    console.log('🆔 User ID:', user.id);
    
    // Check profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (profileError) {
      console.error('❌ Error getting profile:', profileError);
      return;
    }
    
    if (!profile) {
      console.log('❌ No profile found');
      return;
    }
    
    console.log('✅ Profile found:');
    console.log('📋 Full profile data:', profile);
    console.log('🎭 Role value:', JSON.stringify(profile.role));
    console.log('📊 Role type:', typeof profile.role);
    console.log('📏 Role length:', profile.role ? profile.role.length : 'null');
    console.log('🔤 Role characters:', profile.role ? profile.role.split('').map(c => c.charCodeAt(0)) : 'null');
    
    // Test role matching
    console.log('\n🧪 Testing role matching:');
    console.log('profile.role === "menu_operator":', profile.role === 'menu_operator');
    console.log('profile.role === "MENU_OPERATOR":', profile.role === 'MENU_OPERATOR');
    console.log('profile.role.toLowerCase() === "menu_operator":', profile.role ? profile.role.toLowerCase() === 'menu_operator' : false);
    console.log('profile.role.toLowerCase().trim() === "menu_operator":', profile.role ? profile.role.toLowerCase().trim() === 'menu_operator' : false);
    
    // Check user_roles table too
    const { data: userRole, error: userRoleError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_email', user.email)
      .single();
    
    if (userRoleError && userRoleError.code !== 'PGRST116') {
      console.error('❌ Error getting user role:', userRoleError);
    } else if (userRole) {
      console.log('✅ User role found in user_roles table:', userRole);
    } else {
      console.log('ℹ️ No user role found in user_roles table');
    }
    
  } catch (error) {
    console.error('❌ Error in debug script:', error);
  }
}

// Export for use
export { debugUserRole };

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log('🚀 Role debug script loaded. Run debugUserRole() to check your role.');
  window.debugUserRole = debugUserRole;
}
