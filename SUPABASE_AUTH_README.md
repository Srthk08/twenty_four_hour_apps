# 🔐 Supabase Authentication System

This project now includes a comprehensive Supabase authentication system that provides enterprise-grade user management, security, and data storage capabilities.

## 🚀 Features

### ✅ **Core Authentication**
- **User Registration & Login** with email/password
- **Password Reset** with secure token system
- **Email Verification** workflow
- **Session Management** with refresh tokens
- **Secure Logout** with cleanup

### ✅ **User Management**
- **Comprehensive User Profiles** with extended fields
- **Role-Based Access Control** (Customer, Admin, Developer, Support, Moderator)
- **User Status Management** (Active, Inactive, Suspended, Pending Verification)
- **Profile Updates** with validation
- **User Preferences** storage

### ✅ **Security Features**
- **Failed Login Protection** (Account lockout after 5 attempts)
- **Activity Logging** for all user actions
- **Security Event Tracking** with severity levels
- **IP Address & User Agent** logging
- **Session Expiration** management
- **Row-Level Security (RLS)** policies

### ✅ **Data Storage**
- **PostgreSQL Database** with Supabase
- **Automated Cleanup** of expired data
- **Full-Text Search** capabilities
- **Performance Indexes** for fast queries
- **Data Retention** policies

## 🛠️ Setup Instructions

### 1. **Environment Variables**

Create a `.env` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Additional security
VITE_JWT_SECRET=your_jwt_secret_key
VITE_ENCRYPTION_KEY=your_encryption_key
```

### 2. **Database Migration**

Run the enhanced authentication migration:

```bash
# Connect to your Supabase database
psql -h your_host -U your_user -d your_database

# Run the migration
\i supabase/migrations/20250101000000_enhanced_auth_system.sql
```

### 3. **Install Dependencies**

```bash
npm install @supabase/supabase-js
```

## 📊 Database Schema

### **Core Tables**

#### `user_profiles`
- **id**: UUID (Primary Key, references auth.users)
- **email**: Text (Unique)
- **full_name**: Text
- **phone**: Text
- **company_name**: Text
- **role**: Enum (customer, admin, developer, support, moderator)
- **status**: Enum (active, inactive, suspended, pending_verification, email_verified)
- **avatar_url**: Text
- **bio**: Text
- **website**: Text
- **location**: Text
- **timezone**: Text (default: UTC)
- **language**: Text (default: en)
- **preferences**: JSONB
- **last_login_at**: Timestamp
- **login_count**: Integer
- **failed_login_attempts**: Integer
- **account_locked_until**: Timestamp
- **email_verified_at**: Timestamp
- **phone_verified_at**: Timestamp
- **two_factor_enabled**: Boolean
- **two_factor_secret**: Text
- **backup_codes**: Text array
- **created_at**: Timestamp
- **updated_at**: Timestamp

#### `user_sessions`
- **id**: UUID (Primary Key)
- **user_id**: UUID (references user_profiles)
- **session_token**: Text (Unique)
- **refresh_token**: Text (Unique)
- **device_info**: JSONB
- **ip_address**: Inet
- **user_agent**: Text
- **expires_at**: Timestamp
- **last_activity**: Timestamp
- **is_active**: Boolean
- **created_at**: Timestamp

#### `user_activity_log`
- **id**: UUID (Primary Key)
- **user_id**: UUID (references user_profiles)
- **action**: Enum (user_signup, user_login, user_logout, profile_updated, etc.)
- **details**: JSONB
- **ip_address**: Inet
- **user_agent**: Text
- **session_id**: UUID (references user_sessions)
- **metadata**: JSONB
- **created_at**: Timestamp

#### `user_security_events`
- **id**: UUID (Primary Key)
- **user_id**: UUID (references user_profiles)
- **event_type**: Text
- **severity**: Enum (info, warning, error, critical)
- **description**: Text
- **ip_address**: Inet
- **user_agent**: Text
- **metadata**: JSONB
- **created_at**: Timestamp

## 🔧 Usage Examples

### **Basic Authentication**

```typescript
import { supabaseAuth } from '../lib/supabase';

// Sign Up
try {
  const { user, session } = await supabaseAuth.signUp('user@example.com', 'password123', {
    full_name: 'John Doe',
    company_name: 'Example Corp'
  });
  console.log('User created:', user.email);
} catch (error) {
  console.error('Signup failed:', error.message);
}

// Sign In
try {
  const { user, session } = await supabaseAuth.signIn('user@example.com', 'password123');
  console.log('User signed in:', user.email);
} catch (error) {
  console.error('Sign in failed:', error.message);
}

// Sign Out
try {
  await supabaseAuth.signOut();
  console.log('User signed out');
} catch (error) {
  console.error('Sign out failed:', error.message);
}
```

### **User Profile Management**

```typescript
// Get current user
const currentUser = await supabaseAuth.getCurrentUser();
if (currentUser) {
  console.log('Current user:', currentUser.email);
  console.log('Role:', currentUser.role);
  console.log('Status:', currentUser.status);
}

// Update profile
try {
  const updatedProfile = await supabaseAuth.updateProfile({
    full_name: 'John Smith',
    phone: '+1234567890',
    company_name: 'New Company'
  });
  console.log('Profile updated:', updatedProfile);
} catch (error) {
  console.error('Profile update failed:', error.message);
}

// Change password
try {
  await supabaseAuth.changePassword('oldpassword', 'newpassword123');
  console.log('Password changed successfully');
} catch (error) {
  console.error('Password change failed:', error.message);
}
```

### **Password Reset**

```typescript
// Request password reset
try {
  await supabaseAuth.resetPassword('user@example.com');
  console.log('Password reset email sent');
} catch (error) {
  console.error('Password reset failed:', error.message);
}
```

### **User Management (Admin)**

```typescript
// Get all users (admin only)
try {
  const allUsers = await supabaseAuth.getAllUsers();
  console.log('Total users:', allUsers.length);
} catch (error) {
  console.error('Failed to get users:', error.message);
}

// Get user profile by ID
try {
  const userProfile = await supabaseAuth.getUserProfile('user-uuid');
  if (userProfile) {
    console.log('User profile:', userProfile);
  }
} catch (error) {
  console.error('Failed to get user profile:', error.message);
}

// Get user dashboard data
try {
  const dashboardData = await supabaseAuth.getUserDashboardData();
  console.log('Dashboard data:', dashboardData);
} catch (error) {
  console.error('Failed to get dashboard data:', error.message);
}
```

### **Activity Logging**

```typescript
// Get user activity log
try {
  const activityLog = await supabaseAuth.getUserActivityLog(50);
  console.log('Recent activity:', activityLog);
} catch (error) {
  console.error('Failed to get activity log:', error.message);
}

// Get user sessions
try {
  const userSessions = await supabaseAuth.getUserSessions();
  console.log('Active sessions:', userSessions);
} catch (error) {
  console.error('Failed to get sessions:', error.message);
}
```

## 🔒 Security Features

### **Row-Level Security (RLS)**

All tables have RLS policies that ensure:
- Users can only access their own data
- Admins can access all data
- Anonymous users have limited access
- Data is protected at the database level

### **Password Security**

- **bcrypt** hashing for password storage
- **Account lockout** after 5 failed attempts
- **Secure token generation** for password reset
- **Token expiration** (1 hour for password reset)

### **Session Security**

- **Secure session tokens**
- **Refresh token rotation**
- **Session expiration**
- **Device tracking**
- **IP address logging**

### **Activity Monitoring**

- **Comprehensive logging** of all user actions
- **Security event tracking** with severity levels
- **Failed login attempt** monitoring
- **Account lockout** notifications

## 📈 Performance Features

### **Database Indexes**

- **Primary key indexes** on all tables
- **Composite indexes** for common queries
- **Full-text search indexes** for user profiles
- **Partial indexes** for active users

### **Data Cleanup**

- **Automated cleanup** of expired data
- **Data retention policies** (90 days for activity logs, 180 days for security events)
- **Scheduled maintenance** using cron jobs

### **Query Optimization**

- **Efficient joins** for dashboard data
- **Materialized views** for complex queries
- **Optimized search functions** with full-text search

## 🚨 Error Handling

### **Common Error Types**

```typescript
// Authentication errors
if (error.message.includes('Invalid credentials')) {
  // Handle invalid login
}

// Permission errors
if (error.message.includes('permission denied')) {
  // Handle insufficient permissions
}

// Validation errors
if (error.message.includes('validation failed')) {
  // Handle form validation errors
}

// Network errors
if (error.message.includes('network error')) {
  // Handle connection issues
}
```

### **Error Recovery**

```typescript
// Retry mechanism for network errors
const retryOperation = async (operation: Function, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (error.message.includes('network error')) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
};
```

## 🔄 Migration from Simple Auth

### **Step 1: Update Imports**

```typescript
// Old
import { simpleAuth } from '../lib/simple-auth';

// New
import { supabaseAuth } from '../lib/supabase';
```

### **Step 2: Update Function Calls**

```typescript
// Old
const user = simpleAuth.getCurrentUser();

// New
const user = await supabaseAuth.getCurrentUser();
```

### **Step 3: Handle Async Operations**

```typescript
// Old (synchronous)
if (simpleAuth.isAuthenticated()) {
  // Do something
}

// New (asynchronous)
if (await supabaseAuth.isAuthenticated()) {
  // Do something
}
```

### **Step 4: Update Event Listeners**

```typescript
// Old
window.addEventListener('auth-state-changed', () => {
  // Handle auth state change
});

// New (same event, but now properly dispatched)
window.addEventListener('auth-state-changed', () => {
  // Handle auth state change
});
```

## 📱 Frontend Integration

### **React Hook Example**

```typescript
import { useState, useEffect } from 'react';
import { supabaseAuth } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await supabaseAuth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-state-changed', handleAuthChange);
    return () => window.removeEventListener('auth-state-changed', handleAuthChange);
  }, []);

  return { user, loading };
};
```

### **Vue Composition API Example**

```typescript
import { ref, onMounted, onUnmounted } from 'vue';
import { supabaseAuth } from '../lib/supabase';

export const useAuth = () => {
  const user = ref(null);
  const loading = ref(true);

  const checkAuth = async () => {
    try {
      const currentUser = await supabaseAuth.getCurrentUser();
      user.value = currentUser;
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      loading.value = false;
    }
  };

  const handleAuthChange = () => {
    checkAuth();
  };

  onMounted(() => {
    checkAuth();
    window.addEventListener('auth-state-changed', handleAuthChange);
  });

  onUnmounted(() => {
    window.removeEventListener('auth-state-changed', handleAuthChange);
  });

  return { user, loading };
};
```

## 🧪 Testing

### **Unit Tests**

```typescript
import { supabaseAuth } from '../lib/supabase';

describe('SupabaseAuth', () => {
  test('should sign up new user', async () => {
    const result = await supabaseAuth.signUp('test@example.com', 'password123', {
      full_name: 'Test User'
    });
    
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe('test@example.com');
  });

  test('should sign in existing user', async () => {
    const result = await supabaseAuth.signIn('test@example.com', 'password123');
    
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe('test@example.com');
  });
});
```

### **Integration Tests**

```typescript
describe('Authentication Flow', () => {
  test('complete user journey', async () => {
    // 1. Sign up
    const signupResult = await supabaseAuth.signUp('user@example.com', 'password123', {
      full_name: 'John Doe'
    });
    expect(signupResult.user).toBeDefined();

    // 2. Sign out
    await supabaseAuth.signOut();
    let currentUser = await supabaseAuth.getCurrentUser();
    expect(currentUser).toBeNull();

    // 3. Sign in
    const signinResult = await supabaseAuth.signIn('user@example.com', 'password123');
    expect(signinResult.user).toBeDefined();

    // 4. Update profile
    const updatedProfile = await supabaseAuth.updateProfile({
      company_name: 'New Company'
    });
    expect(updatedProfile.company_name).toBe('New Company');
  });
});
```

## 🚀 Deployment

### **Supabase Setup**

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and anon key

2. **Run Migrations**
   - Connect to your Supabase database
   - Run the authentication migration
   - Verify all tables are created

3. **Configure Environment**
   - Set environment variables
   - Test authentication flow

4. **Enable Email Auth**
   - Configure email templates
   - Set up SMTP settings
   - Test email delivery

### **Production Considerations**

- **Enable SSL** for all connections
- **Set up monitoring** and alerting
- **Configure backup** strategies
- **Implement rate limiting**
- **Set up logging** aggregation
- **Monitor performance** metrics

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row-Level Security Guide](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Authentication Best Practices](https://owasp.org/www-project-authentication-cheat-sheet/)

## 🤝 Support

For issues or questions:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the error logs in your database
3. Check the browser console for client-side errors
4. Verify your environment variables are correct

---

**🎉 Congratulations!** You now have a production-ready authentication system with enterprise-grade security and performance features.
