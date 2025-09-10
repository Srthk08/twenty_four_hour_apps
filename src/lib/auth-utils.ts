// Enhanced authentication utilities for Supabase
import { supabase } from './supabase';

// Session persistence key
const SESSION_PERSISTENCE_KEY = 'supabase-auth-session';

// Enhanced logout function
export async function logout(): Promise<void> {
  try {
    // Clear all cached data
    sessionStorage.removeItem('supabase-auth-cache');
    sessionStorage.removeItem('supabase-auth-token');
    sessionStorage.removeItem('login-redirect-url');
    localStorage.removeItem(SESSION_PERSISTENCE_KEY);
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during logout:', error);
    }
    
    // Dispatch auth state change event
    window.dispatchEvent(new CustomEvent('auth-state-changed'));
    
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error in logout:', error);
    throw error;
  }
}

// Enhanced isAuthenticated function
export async function isAuthenticated(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

// Enhanced getCurrentUser function
export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Enhanced getUserProfile function
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

// Enhanced updateUserProfile function
export async function updateUserProfile(updates: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Profile update error:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

// Enhanced changePassword function
export async function changePassword(newPassword: string): Promise<void> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      console.error('Password change error:', error);
      throw error;
    }
    
    console.log('Password changed successfully');
  } catch (error) {
    console.error('Error in changePassword:', error);
    throw error;
  }
}

// Enhanced resetPassword function
export async function resetPassword(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) {
      console.error('Password reset error:', error);
      throw error;
    }
    
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error in resetPassword:', error);
    throw error;
  }
}

// Enhanced session persistence
export function persistSession(session: any): void {
  try {
    if (session) {
      localStorage.setItem(SESSION_PERSISTENCE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_PERSISTENCE_KEY);
    }
  } catch (error) {
    console.error('Error persisting session:', error);
  }
}

// Enhanced session restoration
export function restoreSession(): any {
  try {
    const sessionData = localStorage.getItem(SESSION_PERSISTENCE_KEY);
    if (sessionData) {
      return JSON.parse(sessionData);
    }
  } catch (error) {
    console.error('Error restoring session:', error);
    localStorage.removeItem(SESSION_PERSISTENCE_KEY);
  }
  return null;
}

// Enhanced subscribeToAuthChanges function
export function subscribeToAuthChanges(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session?.user?.email);
    
    // Persist session for better persistence
    if (event === 'SIGNED_IN' && session) {
      persistSession(session);
    } else if (event === 'SIGNED_OUT') {
      persistSession(null);
    }
    
    // Call the callback
    callback(event, session);
  });
}

// Enhanced initializeAuth function
export async function initializeAuth(): Promise<void> {
  try {
    // Check for existing session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      console.log('Existing session found, user is authenticated');
      persistSession(session);
      
      // Dispatch auth ready event
      window.dispatchEvent(new CustomEvent('auth-ready'));
    } else {
      console.log('No existing session found');
      // Try to restore from localStorage
      const restoredSession = restoreSession();
      if (restoredSession) {
        console.log('Restored session from localStorage');
        // Validate the restored session
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            persistSession({ user, access_token: restoredSession.access_token });
            window.dispatchEvent(new CustomEvent('auth-ready'));
          } else {
            // Invalid restored session, clear it
            persistSession(null);
          }
        } catch (error) {
          console.error('Error validating restored session:', error);
          persistSession(null);
        }
      }
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
  }
}

// Function to check if user should be redirected after login
export function shouldRedirectAfterLogin(): boolean {
  const currentPath = window.location.pathname;
  return currentPath === '/login' || currentPath === '/signup';
}

// Function to get redirect URL after login
export function getRedirectUrlAfterLogin(): string {
  const storedRedirect = sessionStorage.getItem('login-redirect-url');
  if (storedRedirect && storedRedirect !== '/login' && storedRedirect !== '/signup') {
    return storedRedirect;
  }
  
  // Default redirect based on user role (will be updated after profile fetch)
  return '/dashboard';
}

// Function to clear redirect URL
export function clearRedirectUrl(): void {
  sessionStorage.removeItem('login-redirect-url');
}
