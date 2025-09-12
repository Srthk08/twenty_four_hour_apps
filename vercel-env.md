# Vercel Environment Variables Setup

## Required Environment Variables for Vercel Deployment

Add these environment variables in your Vercel dashboard:

### 1. Supabase Configuration
```
VITE_SUPABASE_URL = https://lmrrdcaavwwletcjcpqv.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ
```

### 2. Google OAuth Configuration (if using Google login)
```
GOOGLE_CLIENT_ID = your_google_client_id_here
GOOGLE_CLIENT_SECRET = your_google_client_secret_here
```

### 3. Site Configuration
```
SITE_URL = https://your-domain.vercel.app
```

## How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable above
5. Redeploy your project

## Important Notes:

- Make sure to add these variables for all environments (Production, Preview, Development)
- The VITE_ prefix is important for client-side access
- After adding variables, redeploy your project
- Check the build logs to ensure variables are loaded correctly
