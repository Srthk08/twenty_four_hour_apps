// CHECK USER ROLES
// This script helps you check what role a user has

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check current user's role
export async function checkCurrentUserRole() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { role: 'not_logged_in', message: 'User not logged in' };
    }

    // Check if user has Menu Operator profile
    const { data: menuOperatorProfile, error: menuOperatorError } = await supabase
      .from('menu_operator_profiles')
      .select('role, is_active')
      .eq('user_id', user.id)
      .single();

    if (menuOperatorError && menuOperatorError.code !== 'PGRST116') {
      console.error('Error checking menu operator profile:', menuOperatorError);
    }

    if (menuOperatorProfile) {
      return {
        role: menuOperatorProfile.role,
        isActive: menuOperatorProfile.is_active,
        message: `User has ${menuOperatorProfile.role} role`
      };
    }

    // Check if user has admin profile (if you have admin profiles)
    const { data: adminProfile, error: adminError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('user_id', user.id)
      .single();

    if (adminProfile && adminProfile.is_admin) {
      return {
        role: 'admin',
        isActive: true,
        message: 'User has admin role'
      };
    }

    return {
      role: 'regular_user',
      isActive: true,
      message: 'User has regular user role'
    };

  } catch (error) {
    console.error('Error checking user role:', error);
    return {
      role: 'error',
      message: 'Error checking user role: ' + error.message
    };
  }
}

// Function to check if user can access Menu Operator dashboard
export async function canAccessMenuOperator() {
  const roleInfo = await checkCurrentUserRole();
  return roleInfo.role === 'menu_operator' && roleInfo.isActive;
}

// Function to check if user can access Admin dashboard
export async function canAccessAdmin() {
  const roleInfo = await checkCurrentUserRole();
  return roleInfo.role === 'admin' && roleInfo.isActive;
}

// Function to get all users with their roles (admin only)
export async function getAllUsersWithRoles() {
  try {
    const { data: users, error } = await supabase
      .rpc('list_all_users');

    if (error) {
      throw error;
    }

    return users;
  } catch (error) {
    console.error('Error getting users with roles:', error);
    return [];
  }
}

// Example usage:
// const roleInfo = await checkCurrentUserRole();
// console.log('Current user role:', roleInfo);

// const canAccess = await canAccessMenuOperator();
// console.log('Can access Menu Operator dashboard:', canAccess);
