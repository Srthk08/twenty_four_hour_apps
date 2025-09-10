# DevExpress Authentication System

This document describes the comprehensive authentication system built for the DevExpress 24-hour development platform using Astro and Supabase.

## 🚀 Features

### Authentication Pages
- **Login Page** (`/login`) - User sign-in with email/password
- **Signup Page** (`/signup`) - New user registration
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password`) - Set new password after reset

### User Management
- User registration and profile creation
- Email verification system
- Password reset functionality
- Session management
- Activity logging
- Role-based access control (Customer, Admin, Developer, Support)

### Security Features
- Row Level Security (RLS) policies
- Secure password hashing
- JWT token management
- Session expiration
- Activity monitoring
- IP address tracking

## 🏗️ Architecture

### Frontend (Astro)
- **Pages**: Authentication forms with consistent UI/UX
- **Components**: Reusable form components
- **Styling**: Tailwind CSS with project color scheme
- **JavaScript**: Client-side validation and API calls

### Backend (Supabase)
- **Database**: PostgreSQL with advanced schemas
- **Auth**: Built-in Supabase authentication
- **API**: RESTful endpoints for user management
- **Security**: RLS policies and secure functions

## 📁 File Structure

```
src/
├── pages/
│   ├── login.astro          # Login page
│   ├── signup.astro         # Registration page
│   ├── forgot-password.astro # Password reset request
│   ├── reset-password.astro # Password reset form
│   ├── about.astro          # About page
│   ├── contact.astro        # Contact page
│   ├── faq.astro           # FAQ page
│   ├── privacy.astro        # Privacy policy
│   └── terms.astro          # Terms of service
├── components/
│   └── Footer.astro         # Navigation footer
├── lib/
│   └── supabase.ts          # Supabase client and helpers
└── layouts/
    └── Layout.astro         # Page layout wrapper

supabase/
└── migrations/
    ├── 20250818064857_blue_villa.sql      # Main schema
    └── 20241201000000_auth_system.sql     # Authentication system
```

## 🗄️ Database Schema

### Core Tables

#### `user_profiles`
- User account information
- Role-based access control
- Profile customization options
- Activity tracking

#### `password_reset_tokens`
- Secure password reset functionality
- Time-limited tokens
- One-time use validation

#### `user_sessions`
- Session management
- Device tracking
- Security monitoring

#### `user_activity_log`
- Comprehensive activity logging
- Audit trail
- Security monitoring

#### `contact_submissions`
- Contact form storage
- Support ticket management
- Admin response tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Supabase account and project
- Astro project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd twenty_four_hour_apps-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   Run the Supabase migrations:
   ```bash
   # Apply main schema
   supabase db push --file=supabase/migrations/20250818064857_blue_villa.sql
   
   # Apply authentication system
   supabase db push --file=supabase/migrations/20241201000000_auth_system.sql
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Authentication Flow

### User Registration
1. User visits `/signup`
2. Fills out registration form
3. Account created in Supabase Auth
4. Profile automatically created in `user_profiles`
5. Email verification sent (if enabled)
6. Redirected to login page

### User Login
1. User visits `/login`
2. Enters credentials
3. Supabase validates authentication
4. Session tokens stored in cookies
5. User redirected to dashboard/home

### Password Reset
1. User visits `/forgot-password`
2. Enters email address
3. Reset link sent to email
4. User clicks link and visits `/reset-password`
5. New password set and user logged in

## 🎨 UI/UX Features

### Design Consistency
- **Color Scheme**: Primary (blue) and Secondary (purple) gradients
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Reusable form elements and buttons
- **Responsiveness**: Mobile-first design approach

### User Experience
- **Form Validation**: Real-time client-side validation
- **Loading States**: Visual feedback during operations
- **Error Handling**: Clear error messages and recovery options
- **Success Feedback**: Confirmation messages and redirects

## 🔒 Security Features

### Row Level Security (RLS)
- Users can only access their own data
- Admin users have broader access
- Anonymous users limited to public content

### Data Protection
- Passwords never stored in plain text
- Sensitive data encrypted at rest
- Secure token generation and validation
- Session timeout and cleanup

### Monitoring
- User activity logging
- Login attempt tracking
- Session management
- Security event monitoring

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/reset-password` - Password reset

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/activity` - Get user activity log

### Contact
- `POST /api/contact/submit` - Submit contact form

## 🧪 Testing

### Manual Testing
1. **Registration Flow**
   - Test user signup with valid data
   - Verify profile creation
   - Check email verification

2. **Login Flow**
   - Test valid credentials
   - Test invalid credentials
   - Verify session creation

3. **Password Reset**
   - Test reset request
   - Verify email delivery
   - Test password update

### Automated Testing
```bash
# Run tests (when implemented)
npm test

# Run specific test suites
npm run test:auth
npm run test:api
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure these are set in production:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin functions)

### Supabase Production
1. Create production project
2. Apply migrations
3. Configure authentication settings
4. Set up email providers
5. Configure security policies

## 🔧 Configuration

### Supabase Settings
- **Authentication**: Enable email/password, social providers
- **Email Templates**: Customize verification and reset emails
- **Security**: Configure password policies, session timeouts
- **Storage**: Set up file upload policies

### Customization
- **Branding**: Update colors, logos, and company information
- **Email Templates**: Modify email content and styling
- **Validation Rules**: Adjust form validation requirements
- **UI Components**: Customize form layouts and styling

## 📊 Monitoring and Analytics

### User Metrics
- Registration rates
- Login frequency
- Password reset requests
- Session duration

### Security Monitoring
- Failed login attempts
- Suspicious activity
- Token usage patterns
- Security policy violations

## 🆘 Troubleshooting

### Common Issues

#### Authentication Errors
- Check Supabase credentials
- Verify environment variables
- Check database connection
- Review RLS policies

#### Form Submission Issues
- Validate form data
- Check API endpoints
- Review error logs
- Test database connectivity

#### Email Delivery Problems
- Verify email provider settings
- Check spam filters
- Review email templates
- Test email configuration

### Debug Mode
Enable debug logging in development:
```typescript
// In supabase.ts
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
});
```

## 🤝 Contributing

### Development Guidelines
1. Follow existing code patterns
2. Maintain consistent styling
3. Add appropriate error handling
4. Include form validation
5. Test all user flows

### Code Review Checklist
- [ ] Authentication security
- [ ] Form validation
- [ ] Error handling
- [ ] UI consistency
- [ ] Performance impact
- [ ] Security implications

## 📚 Additional Resources

### Documentation
- [Astro Documentation](https://docs.astro.build/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Security Best Practices
- [OWASP Authentication Guidelines](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/)
- [Supabase Security](https://supabase.com/docs/guides/security)

### UI/UX Resources
- [Material Design Guidelines](https://material.io/design)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📄 License

This authentication system is part of the DevExpress project and follows the same licensing terms.

## 🆘 Support

For technical support or questions:
- **Email**: support@devexpress.com
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs through the project issue tracker

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: DevExpress Development Team
