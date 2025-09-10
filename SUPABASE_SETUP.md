# Supabase Integration Setup Guide

This guide will help you set up Supabase authentication and data storage for your 24-hour apps project.

## 🚀 Quick Start

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `24hour-apps` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
6. Click "Create new project"
7. Wait for the project to be created (this may take a few minutes)

### 2. Get Your Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add your Supabase credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Important**: Never commit your `.env` file to version control!

### 4. Run Database Migrations

The project includes pre-configured database migrations. To apply them:

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of each migration file from `supabase/migrations/`
3. Run them in order:
   - `20241201000000_auth_system.sql`
   - `20250101000000_enhanced_auth_system.sql`
   - `20250818064857_blue_villa.sql`

### 5. Configure Authentication Settings

1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Configure the following:

#### Email Templates
- **Confirm signup**: Customize the email template for account confirmation
- **Reset password**: Customize the password reset email template

#### Site URL
- Set your site URL (e.g., `http://localhost:3000` for development)
- Add any additional redirect URLs you need

#### Email Provider
- Ensure your email provider is configured (Supabase provides a default one)

## 🔐 Authentication Features

### User Registration
- Users can sign up with email and password
- Profile information is automatically stored in the `user_profiles` table
- Email confirmation is required by default

### User Login
- Secure password-based authentication
- Session management with automatic token refresh
- Role-based access control (customer, admin, developer, support)

### Password Management
- Password reset via email
- Password change for authenticated users
- Secure password hashing using bcrypt

### Session Management
- Automatic session refresh
- Secure token storage
- Logout functionality

## 🗄️ Database Schema

The project includes a comprehensive database schema with the following main tables:

### Core Tables
- `user_profiles` - User account information and preferences
- `products` - Product catalog
- `product_plans` - Pricing plans for products
- `orders` - Customer orders
- `cart_items` - Shopping cart items

### Authentication Tables
- `user_sessions` - User session management
- `user_activity_log` - User activity tracking
- `user_security_events` - Security event logging
- `password_reset_tokens` - Password reset functionality

### Additional Tables
- `contact_submissions` - Contact form submissions
- `user_preferences` - User-specific settings

## 🛡️ Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- Admins have access to all data
- Secure policies prevent unauthorized access

### Data Validation
- Input validation on all forms
- SQL injection prevention
- XSS protection
- CSRF protection

### Audit Logging
- All user actions are logged
- Security events are tracked
- Failed login attempts are monitored
- Account lockout after multiple failed attempts

## 🔧 Configuration Options

### Environment Variables

```env
# Required
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (for advanced features)
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_SITE_URL=http://localhost:3000
```

### Supabase Client Configuration

The Supabase client is configured in `src/lib/supabase.ts` with:
- Automatic session refresh
- Error handling
- TypeScript support
- Row Level Security

## 📱 Frontend Integration

### Authentication Components
- `login.astro` - User login form
- `signup.astro` - User registration form
- `Header.astro` - Navigation with auth state
- `AuthGuard.astro` - Route protection component

### Auth Utilities
- `auth-utils.ts` - Authentication helper functions
- Session management
- User profile management
- Logout functionality

### State Management
- Real-time auth state updates
- Session persistence
- User role checking
- Admin panel access control

## 🚀 Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Authentication
1. Visit `/signup` to create a new account
2. Check your email for confirmation
3. Visit `/login` to sign in
4. Test protected routes

### 3. Monitor Database
- Use Supabase dashboard to monitor user registrations
- Check authentication logs
- Monitor database performance

### 4. Debug Issues
- Check browser console for errors
- Monitor Supabase logs
- Verify environment variables
- Check database permissions

## 🔍 Troubleshooting

### Common Issues

#### "Missing Supabase environment variables"
- Ensure `.env` file exists in project root
- Check that variables are named correctly
- Restart development server after changes

#### "User not found" errors
- Check if user exists in `auth.users` table
- Verify user profile was created in `user_profiles`
- Check RLS policies

#### Authentication not working
- Verify Supabase URL and key
- Check email confirmation settings
- Monitor browser console for errors
- Check Supabase logs

#### Database connection issues
- Verify database is running
- Check connection string
- Verify RLS policies
- Check user permissions

### Debug Commands

```bash
# Check environment variables
echo $VITE_SUPABASE_URL

# Test Supabase connection
curl -X GET "https://your-project.supabase.co/rest/v1/" \
  -H "apikey: your-anon-key"

# Check database status
# Go to Supabase dashboard → Database → Status
```

## 📚 Additional Resources

### Documentation
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
- [Community Forum](https://github.com/supabase/supabase/discussions)

### Examples
- [Supabase Examples](https://github.com/supabase/examples)
- [Auth Examples](https://supabase.com/docs/guides/auth/examples)
- [Database Examples](https://supabase.com/docs/guides/database/examples)

## 🎯 Next Steps

After setting up Supabase:

1. **Customize Email Templates** - Brand your confirmation and reset emails
2. **Set Up Webhooks** - Integrate with external services
3. **Configure Analytics** - Track user behavior and app performance
4. **Set Up Monitoring** - Monitor database performance and errors
5. **Implement Advanced Features** - Add social login, 2FA, etc.

## 🆘 Support

If you encounter issues:

1. Check this guide first
2. Review Supabase documentation
3. Check browser console for errors
4. Monitor Supabase logs
5. Ask in the Supabase community
6. Create an issue in the project repository

---

**Happy coding! 🚀**

Your project is now fully integrated with Supabase for secure, scalable authentication and data storage.
