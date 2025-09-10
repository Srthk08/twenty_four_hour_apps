# Google OAuth Setup Guide

## Overview
This guide will help you set up Google OAuth authentication for your application using Supabase.

## Prerequisites
- Supabase project set up
- Google Cloud Console access
- Domain name (for production)

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Your App Name OAuth"
4. Click "Create"

### 1.2 Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### 1.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Enter name: "Your App OAuth Client"
5. Add authorized redirect URIs:
   - **Development**: `https://lmrrdcaavwwletcjcpqv.supabase.co/auth/v1/callback`
   - **Production**: `https://yourdomain.com/auth/callback`
6. Click "Create"
7. **Save the Client ID and Client Secret** - you'll need these for Supabase

## Step 2: Supabase Configuration

### 2.1 Configure Google Provider in Supabase
1. Go to your Supabase Dashboard
2. Navigate to "Authentication" → "Providers"
3. Find "Google" and click "Enable"
4. Enter your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
5. Set redirect URL: `https://lmrrdcaavwwletcjcpqv.supabase.co/auth/v1/callback`
6. Click "Save"

### 2.2 Configure Site URL
1. In Supabase Dashboard, go to "Authentication" → "URL Configuration"
2. Set **Site URL**: `http://localhost:4321` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:4321/auth/callback`
   - `https://yourdomain.com/auth/callback` (for production)

## Step 3: Database Setup

### 3.1 Run the Database Migration
Execute the SQL script to set up Google authentication:

```sql
-- Run the google_auth_setup.sql file in your Supabase SQL Editor
-- This will create the necessary tables and functions for Google OAuth
```

### 3.2 Verify Database Schema
The following tables and columns should be created:
- `profiles` table with Google-specific columns
- `sync_google_user` function
- Proper RLS policies for Google authentication

## Step 4: Frontend Integration

### 4.1 Google Auth Buttons
The login and signup pages now include Google authentication buttons:
- **Login Page**: `/login` - "Continue with Google" button
- **Signup Page**: `/signup` - "Sign up with Google" button

### 4.2 Authentication Flow
1. User clicks Google auth button
2. Redirects to Google OAuth consent screen
3. User grants permissions
4. Google redirects back to `/auth/callback`
5. Supabase processes the OAuth response
6. User data is synced to the `profiles` table
7. User is redirected to dashboard

## Step 5: Testing

### 5.1 Test Google Authentication
1. Start your development server: `npm run dev`
2. Go to `/login` or `/signup`
3. Click the Google authentication button
4. Complete the Google OAuth flow
5. Verify user is created in the `profiles` table
6. Check that user can access the dashboard

### 5.2 Verify Database Integration
1. Check the `profiles` table for new Google users
2. Verify Google-specific fields are populated:
   - `provider`: 'google'
   - `google_id`: Google user ID
   - `google_email`: Google email
   - `google_name`: Google display name
   - `google_picture`: Google profile picture URL

## Step 6: Production Deployment

### 6.1 Update Google Cloud Console
1. Add your production domain to authorized redirect URIs
2. Update OAuth consent screen with production domain

### 6.2 Update Supabase Configuration
1. Update Site URL to your production domain
2. Add production redirect URLs
3. Test the complete flow in production

## Troubleshooting

### Common Issues

#### 1. "Invalid redirect URI" Error
- **Cause**: Redirect URI not configured in Google Cloud Console
- **Solution**: Add the exact redirect URI to Google Cloud Console

#### 2. "Access blocked" Error
- **Cause**: OAuth consent screen not configured
- **Solution**: Configure OAuth consent screen in Google Cloud Console

#### 3. User not created in database
- **Cause**: Database function not working
- **Solution**: Check if `sync_google_user` function exists and is working

#### 4. RLS policies blocking access
- **Cause**: Row Level Security policies not configured for Google users
- **Solution**: Verify RLS policies include Google provider checks

### Debug Steps
1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify Google Cloud Console configuration
4. Test with different Google accounts
5. Check database for user creation

## Security Considerations

### 1. Environment Variables
- Never commit OAuth credentials to version control
- Use environment variables for production

### 2. Domain Validation
- Only allow authorized domains in Google Cloud Console
- Use HTTPS in production

### 3. User Data Protection
- Implement proper RLS policies
- Validate user data before storing
- Regular security audits

## Files Created/Modified

### New Files
- `google_auth_setup.sql` - Database schema for Google OAuth
- `src/components/GoogleAuth.astro` - Reusable Google auth component
- `src/pages/auth/callback.astro` - OAuth callback handler
- `GOOGLE_OAUTH_SETUP_GUIDE.md` - This setup guide

### Modified Files
- `src/pages/login.astro` - Added Google login button
- `src/pages/signup.astro` - Added Google signup button

## Next Steps

1. **Test the complete flow** in development
2. **Configure production domains** in Google Cloud Console
3. **Deploy to production** and test
4. **Monitor user registrations** and authentication logs
5. **Consider adding other OAuth providers** (Facebook, GitHub, etc.)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Supabase and Google Cloud Console documentation
3. Check the browser console and Supabase logs
4. Verify all configuration steps were completed correctly
