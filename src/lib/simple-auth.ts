// Simple authentication system for testing
// This simulates authentication without external dependencies

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  companyName?: string;
  password: string; // Store password for validation
}

interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// In-memory storage for demo purposes
let currentUser: User | null = null;
let currentSession: AuthSession | null = null;

// Mock users for testing (with passwords) - Start with multiple test users
let mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    fullName: 'Test User',
    phone: '+1234567890',
    companyName: 'Test Company',
    password: 'password123' // Store actual password
  },
  {
    id: '2',
    email: 'admin@example.com',
    fullName: 'Admin User',
    phone: '+9876543210',
    companyName: 'Admin Company',
    password: 'admin123'
  },
  {
    id: '3',
    email: 'demo@example.com',
    fullName: 'Demo User',
    phone: '+5555555555',
    companyName: 'Demo Company',
    password: 'demo123'
  }
];

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        console.warn('localStorage access failed:', e);
        return null;
      }
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        console.warn('localStorage set failed:', e);
      }
    }
  },
  
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
        console.warn('localStorage remove failed:', e);
      }
    }
  }
};

// Function to initialize authentication state
const initializeAuth = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Load stored users from localStorage
    const storedUsers = safeLocalStorage.getItem('simple-auth-users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        // Merge stored users with mock users, avoiding duplicates
        const existingEmails = new Set(mockUsers.map(u => u.email));
        parsedUsers.forEach((user: User) => {
          if (!existingEmails.has(user.email)) {
            mockUsers.push(user);
            existingEmails.add(user.email);
          }
        });
      } catch (e) {
        console.warn('Failed to parse stored users:', e);
      }
    }

    const storedUser = safeLocalStorage.getItem('simple-auth-user');
    const storedSession = safeLocalStorage.getItem('simple-auth-session');
    
    if (storedUser && storedSession) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const parsedSession = JSON.parse(storedSession);
        
        // First try to find the user in mockUsers to get the full user data
        let fullUser = mockUsers.find(u => u.id === parsedUser.id);
        
        // If not found in mockUsers, try to find by email
        if (!fullUser && parsedUser.email) {
          fullUser = mockUsers.find(u => u.email === parsedUser.email);
        }
        
        // If still not found, create a user object from stored data (this handles newly registered users)
        if (!fullUser) {
          console.log('User not found in mockUsers, creating from stored data:', parsedUser.email);
          fullUser = {
            id: parsedUser.id,
            email: parsedUser.email,
            fullName: parsedUser.fullName || '',
            phone: parsedUser.phone || '',
            companyName: parsedUser.companyName || '',
            password: 'stored_user' // Default password for stored users
          };
          
          // Add to mockUsers for future reference
          mockUsers.push(fullUser);
          // Update localStorage
          safeLocalStorage.setItem('simple-auth-users', JSON.stringify(mockUsers));
          console.log('Added user to mockUsers:', fullUser.email);
        }
        
        if (fullUser) {
          currentUser = fullUser;
          currentSession = parsedSession;
          console.log('Restored user session:', fullUser.email);
        }
      } catch (e) {
        console.warn('Failed to parse stored user/session:', e);
        // Clear invalid data
        safeLocalStorage.removeItem('simple-auth-user');
        safeLocalStorage.removeItem('simple-auth-session');
      }
    }
  } catch (e) {
    console.warn('Failed to initialize auth from localStorage:', e);
  }
};

export const simpleAuth = {
  // Initialize authentication
  init: () => {
    initializeAuth();
  },

  // Sign up
  signUp: async (email: string, password: string, userData: Partial<User>): Promise<{ user: User; session: AuthSession }> => {
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      fullName: userData.fullName || '',
      phone: userData.phone,
      companyName: userData.companyName,
      password: password // Store the actual password
    };

    // Add to mockUsers array
    mockUsers.push(newUser);

    // Store all users in localStorage for persistence
    safeLocalStorage.setItem('simple-auth-users', JSON.stringify(mockUsers));

    // Create session
    const session: AuthSession = {
      user: newUser,
      accessToken: `token_${Date.now()}`,
      refreshToken: `refresh_${Date.now()}`
    };

    currentUser = newUser;
    currentSession = session;

    // Store in localStorage safely (but don't store password in localStorage for security)
    const { password: userPassword, ...userWithoutPassword } = newUser; // Remove password before storing
    
    safeLocalStorage.setItem('simple-auth-user', JSON.stringify(userWithoutPassword));
    safeLocalStorage.setItem('simple-auth-session', JSON.stringify(session));

    console.log('User created successfully:', { email: newUser.email, id: newUser.id });
    console.log('Total users in system:', mockUsers.length);

    return { user: newUser, session };
  },

  // Sign in
  signIn: async (email: string, password: string): Promise<{ user: User; session: AuthSession }> => {
    console.log('Attempting to sign in with:', email);
    console.log('Available users:', mockUsers.map(u => ({ email: u.email, id: u.id })));
    
    // Find user
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      console.log('User not found:', email);
      throw new Error('Invalid credentials');
    }

    console.log('User found:', { email: user.email, id: user.id });

    // Verify password
    if (user.password !== password) {
      console.log('Password mismatch for user:', email);
      console.log('Expected:', user.password, 'Got:', password);
      throw new Error('Invalid credentials');
    }

    console.log('Password verified successfully for user:', email);

    // Create session
    const session: AuthSession = {
      user,
      accessToken: `token_${Date.now()}`,
      refreshToken: `refresh_${Date.now()}`
    };

    currentUser = user;
    currentSession = session;

    // Store in localStorage safely (but don't store password in localStorage for security)
    const { password: userPassword, ...userWithoutPassword } = user; // Remove password before storing
    
    safeLocalStorage.setItem('simple-auth-user', JSON.stringify(userWithoutPassword));
    safeLocalStorage.setItem('simple-auth-session', JSON.stringify(session));

    console.log('Login successful for user:', email);
    console.log('Session created:', { accessToken: session.accessToken, refreshToken: session.refreshToken });

    return { user, session };
  },

  // Sign out
  signOut: async (): Promise<void> => {
    currentUser = null;
    currentSession = null;
    safeLocalStorage.removeItem('simple-auth-user');
    safeLocalStorage.removeItem('simple-auth-session');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    // Try to restore from localStorage safely
    const storedUser = safeLocalStorage.getItem('simple-auth-user');
    const storedSession = safeLocalStorage.getItem('simple-auth-session');
    
    if (storedUser && storedSession) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const parsedSession = JSON.parse(storedSession);
        
        // First try to find the user in mockUsers to get the full user data
        let fullUser = mockUsers.find(u => u.id === parsedUser.id);
        
        // If not found in mockUsers, try to find by email
        if (!fullUser && parsedUser.email) {
          fullUser = mockUsers.find(u => u.email === parsedUser.email);
        }
        
        // If still not found, use the stored user data (this handles newly registered users)
        if (!fullUser) {
          // Create a user object from stored data, with a default password
          fullUser = {
            id: parsedUser.id,
            email: parsedUser.email,
            fullName: parsedUser.fullName || '',
            phone: parsedUser.phone || '',
            companyName: parsedUser.companyName || '',
            password: 'stored_user' // Default password for stored users
          };
          
          // Add to mockUsers for future reference
          mockUsers.push(fullUser);
          // Update localStorage
          safeLocalStorage.setItem('simple-auth-users', JSON.stringify(mockUsers));
        }
        
        if (fullUser) {
          currentUser = fullUser;
          currentSession = parsedSession;
          return currentUser;
        }
      } catch (e) {
        console.warn('Failed to restore user from localStorage:', e);
        // Clear invalid data
        safeLocalStorage.removeItem('simple-auth-user');
        safeLocalStorage.removeItem('simple-auth-session');
      }
    }
    
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    console.log('Checking authentication status...');
    
    // First check in-memory
    if (currentUser) {
      console.log('User authenticated from memory:', currentUser.email);
      return true;
    }
    
    // Then check localStorage
    const storedUser = safeLocalStorage.getItem('simple-auth-user');
    const storedSession = safeLocalStorage.getItem('simple-auth-session');
    
    console.log('Stored user:', storedUser ? 'exists' : 'none');
    console.log('Stored session:', storedSession ? 'exists' : 'none');
    
    if (storedUser && storedSession) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const parsedSession = JSON.parse(storedSession);
        
        console.log('Parsed user ID:', parsedUser.id);
        
        // Verify the user exists in mockUsers
        const fullUser = mockUsers.find(u => u.id === parsedUser.id);
        if (fullUser) {
          // Restore the session
          currentUser = fullUser;
          currentSession = parsedSession;
          console.log('User authenticated from localStorage:', fullUser.email);
          return true;
        } else {
          console.log('User not found in mockUsers, clearing invalid data');
          // User not found, clear invalid data
          safeLocalStorage.removeItem('simple-auth-user');
          safeLocalStorage.removeItem('simple-auth-session');
          return false;
        }
      } catch (e) {
        console.warn('Failed to parse stored user/session:', e);
        // Clear invalid data
        safeLocalStorage.removeItem('simple-auth-user');
        safeLocalStorage.removeItem('simple-auth-session');
        return false;
      }
    }
    
    console.log('No valid authentication found');
    return false;
  },

  // Get current session
  getCurrentSession: (): AuthSession | null => {
    if (currentSession) return currentSession;
    
    // Try to restore from localStorage safely
    const storedSession = safeLocalStorage.getItem('simple-auth-session');
    if (storedSession) {
      try {
        currentSession = JSON.parse(storedSession);
        return currentSession;
      } catch (e) {
        safeLocalStorage.removeItem('simple-auth-session');
      }
    }
    
    return null;
  },

  // Debug function to see all users
  debugUsers: () => {
    console.log('All users in system:', mockUsers);
    return mockUsers;
  },

  // Check if user exists
  checkUserExists: (email: string): boolean => {
    return mockUsers.some(user => user.email === email);
  },

  // Update user profile
  updateProfile: async (updates: Partial<User>): Promise<User> => {
    if (!currentUser) {
      throw new Error('No user is currently authenticated');
    }

    // Update user data
    Object.assign(currentUser, updates);

    // Update localStorage
    const { password, ...userWithoutPassword } = currentUser;
    safeLocalStorage.setItem('simple-auth-user', JSON.stringify(userWithoutPassword));

    // Update in mockUsers array
    const userIndex = mockUsers.findIndex(u => u.id === currentUser!.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...currentUser! };
    }

    // Update stored users in localStorage
    safeLocalStorage.setItem('simple-auth-users', JSON.stringify(mockUsers));

    console.log('Profile updated successfully for user:', currentUser!.email);
    return currentUser;
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!currentUser) {
      throw new Error('No user is currently authenticated');
    }

    // Verify current password
    if (currentUser.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    currentUser.password = newPassword;

    // Update in mockUsers array
    const userIndex = mockUsers.findIndex(u => u.id === currentUser!.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...currentUser! };
    }

    // Update stored users in localStorage
    safeLocalStorage.setItem('simple-auth-users', JSON.stringify(mockUsers));

    console.log('Password changed successfully for user:', currentUser!.email);
  },

  // Reset password using reset token and email
  resetPassword: async (email: string, resetToken: string, newPassword: string): Promise<void> => {
    // In a real app, you would verify the reset token
    // For now, we'll find the user by email
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // Update password
    user.password = newPassword;

    // Update in mockUsers array
    const userIndex = mockUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...user };
    }

    // Update stored users in localStorage
    safeLocalStorage.setItem('simple-auth-users', JSON.stringify(mockUsers));

    // Update in localStorage if user is currently logged in
    if (currentUser && currentUser.email === email) {
      currentUser.password = newPassword;
      const { password, ...userWithoutPassword } = currentUser;
      safeLocalStorage.setItem('simple-auth-user', JSON.stringify(userWithoutPassword));
    }

    console.log('Password reset successfully for user:', user.email);
  }
};

// Initialize authentication when the module loads
if (typeof window !== 'undefined') {
  // Initialize immediately
  initializeAuth();
  
  // Also initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
  }
}


