# 🚀 Google Authentication - Step by Step Fix

## Current Status
- ✅ Development server is running on http://localhost:4321
- ❌ Google OAuth provider not configured in Supabase
- ❌ Google authentication showing black screen/404 errors

## 🔧 STEP 1: Run Database Setup (REQUIRED FIRST)

### 1.1 Go to Supabase SQL Editor
1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Go to your project: `lmrrdcaavwwletcjcpqv`
3. Click on **"SQL Editor"** in the left sidebar

### 1.2 Run the Database Setup Script
1. Copy the entire contents of `google_auth_setup.sql` file
2. Paste it into the SQL Editor
3. Click **"Run"** to execute the script
4. This creates the necessary database functions and tables

## 🔧 STEP 2: Configure Google OAuth in Supabase

### 2.1 Enable Google Provider
1. In Supabase Dashboard, go to **Authentication → Providers**
2. Find **"Google"** in the list
3. Click the **toggle switch** to enable it
4. You'll see fields for Client ID and Client Secret

### 2.2 Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URI: `https://lmrrdcaavwwletcjcpqv.supabase.co/auth/v1/callback`
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**

### 2.3 Configure Supabase with Google Credentials
1. Back in Supabase Dashboard → Authentication → Providers → Google
2. Paste the **Client ID** from Google Cloud Console
3. Paste the **Client Secret** from Google Cloud Console
4. Click **"Save"**

## 🔧 STEP 3: Configure Site URLs

### 3.1 Set Site URLs in Supabase
1. In Supabase Dashboard, go to **Authentication → URL Configuration**
2. Set **Site URL**: `http://localhost:4321`
3. Add **Redirect URLs**:
   - `http://localhost:4321/auth/callback`
   - `http://localhost:4321/`
   - `http://localhost:4321/dashboard`
4. Click **"Save"**

## 🔧 STEP 4: Test the Configuration

### 4.1 Test with Debug Tool
1. Open: `http://localhost:4321/debug_google_auth.html`
2. Click **"Check Google Provider"**
3. Click **"Test Google Sign In"**
4. Follow the OAuth flow

### 4.2 Test on Login Page
1. Go to: `http://localhost:4321/login`
2. Click **"Continue with Google"**
3. Complete the Google OAuth flow
4. You should be redirected to dashboard

## 🚨 Common Issues & Solutions

### Issue 1: "Provider not found"
**Solution**: Make sure Google provider is enabled in Supabase Dashboard

### Issue 2: "Invalid redirect URI"
**Solution**: Check that redirect URI in Google Cloud Console matches exactly:
`https://lmrrdcaavwwletcjcpqv.supabase.co/auth/v1/callback`

### Issue 3: "Function does not exist"
**Solution**: Run the `google_auth_setup.sql` script in Supabase SQL Editor

### Issue 4: "Access blocked"
**Solution**: Configure OAuth consent screen in Google Cloud Console

## 📋 Checklist
- [ ] Run `google_auth_setup.sql` in Supabase SQL Editor
- [ ] Enable Google provider in Supabase
- [ ] Create Google OAuth credentials
- [ ] Configure Supabase with Google credentials
- [ ] Set Site URLs in Supabase
- [ ] Test with debug tool
- [ ] Test on login page

## 🎯 Expected Result
After completing these steps:
1. Google sign-in button should work without black screen
2. Users can authenticate with Google
3. User data is synced to database
4. Users are redirected to dashboard

## 📞 Need Help?
If you're still having issues:
1. Check the browser console for specific error messages
2. Use the debug tool to identify the exact problem
3. Verify all configuration steps were completed
4. Check Supabase logs in the dashboard
