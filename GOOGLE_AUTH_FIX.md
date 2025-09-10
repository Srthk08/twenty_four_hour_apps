# 🚨 Google Authentication 404 Error Fix

## Problem
You're getting a 404 error when clicking the Google sign-in/sign-up button. This is because the Google OAuth provider isn't properly configured in Supabase.

## 🔧 Quick Fix Steps

### Step 1: Configure Google Provider in Supabase
1. **Go to your Supabase Dashboard**
2. **Navigate to**: Authentication → Providers
3. **Find "Google"** and click **"Enable"**
4. **You'll need Google OAuth credentials** (see Step 2)

### Step 2: Get Google OAuth Credentials
1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URI: `https://lmrrdcaavwwletcjcpqv.supabase.co/auth/v1/callback`
   - Save the **Client ID** and **Client Secret**

### Step 3: Configure Supabase
1. **Back in Supabase Dashboard**:
   - Enter the **Client ID** from Google Cloud Console
   - Enter the **Client Secret** from Google Cloud Console
   - Click **"Save"**

### Step 4: Update Site URLs
1. **In Supabase Dashboard**:
   - Go to Authentication → URL Configuration
   - Set **Site URL**: `http://localhost:4321`
   - Add **Redirect URLs**:
     - `http://localhost:4321/auth/callback`
     - `http://localhost:4321/`

### Step 5: Run Database Setup
1. **Go to Supabase SQL Editor**
2. **Copy and paste** the contents of `google_auth_setup.sql`
3. **Run the script** to create necessary database functions

### Step 6: Test the Fix
1. **Open** `debug_google_auth.html` in your browser
2. **Click "Test Google Sign In"**
3. **Complete the OAuth flow**
4. **Verify** user is created in database

## 🧪 Debug Tool
Use the `debug_google_auth.html` file to test and diagnose issues:
- Tests Supabase connection
- Checks Google provider configuration
- Tests database functions
- Provides specific error messages and solutions

## 🚨 Common Issues & Solutions

### Issue 1: "Provider not found"
**Solution**: Enable Google provider in Supabase Dashboard

### Issue 2: "Invalid redirect URI"
**Solution**: Add exact redirect URI to Google Cloud Console

### Issue 3: "Function does not exist"
**Solution**: Run the `google_auth_setup.sql` script

### Issue 4: "Access blocked"
**Solution**: Configure OAuth consent screen in Google Cloud Console

## 📋 Checklist
- [ ] Google provider enabled in Supabase
- [ ] Google OAuth credentials configured
- [ ] Redirect URIs set correctly
- [ ] Database functions created
- [ ] Site URLs configured
- [ ] Test with debug tool

## 🎯 Expected Result
After completing these steps:
1. Google sign-in button should work without 404 errors
2. Users can authenticate with Google
3. User data is synced to database
4. Users are redirected to dashboard

## 📞 Need Help?
If you're still having issues:
1. Check the browser console for specific error messages
2. Use the debug tool to identify the exact problem
3. Verify all configuration steps were completed
4. Check Supabase logs in the dashboard
