# Contact Form Setup Guide

## 🚀 Quick Setup Steps

### 1. Create the Database Table
Run this SQL script in your Supabase SQL Editor:

```sql
-- Copy and paste the entire content of create-contact-submissions-table.sql
```

### 2. Test the Contact Form
1. Open `test-contact-form-simple.html` in your browser
2. Fill out the form and click "Send Message"
3. Check if data appears in Supabase

### 3. Verify Your Live Contact Form
1. Go to `/contact` on your website
2. Fill out the form
3. Check browser console for debugging info
4. Verify data is saved in Supabase

## 📋 Table Structure

The `contact_submissions` table includes these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `first_name` | VARCHAR(100) | User's first name |
| `last_name` | VARCHAR(100) | User's last name |
| `email` | VARCHAR(255) | User's email address |
| `phone` | VARCHAR(20) | User's phone number (optional) |
| `company_name` | VARCHAR(255) | User's company name (optional) |
| `project_type` | VARCHAR(50) | Selected project type from dropdown |
| `project_details` | TEXT | Detailed project description |
| `message` | TEXT | Same as project_details (for compatibility) |
| `status` | VARCHAR(20) | Submission status (new, read, replied, closed) |
| `priority` | VARCHAR(10) | Priority level (low, medium, high, urgent) |
| `user_id` | UUID | ID of logged-in user (if any) |
| `created_at` | TIMESTAMP | When submission was created |
| `updated_at` | TIMESTAMP | When submission was last updated |

## 🔧 Features

### ✅ Automatic User Pre-filling
When a user is logged in, the contact form automatically pre-fills:
- **First Name** - From user profile or metadata
- **Last Name** - From user profile or metadata  
- **Email** - From user account
- **Phone** - From user profile or metadata
- **Company Name** - From user profile or metadata

### ✅ Project Type Options
The dropdown includes these options:
- Restaurant Menu System
- Android TV App
- Streaming Mobile App
- Restaurant Website
- Custom Application
- Other

### ✅ URL Parameter Support
The form can be pre-filled via URL parameters:
- `?project_type=android-tv` - Pre-selects project type
- `?project_details=Custom message` - Pre-fills project details
- `?product=Product Name` - Adds product info to message
- `?price=25000` - Adds budget info to message

## 🐛 Troubleshooting

### Issue: "Send Message" button not working
**Solution:**
1. Check browser console for JavaScript errors
2. Verify Supabase client is loaded: `console.log(window.supabase)`
3. Check if table exists in Supabase
4. Verify RLS policies allow inserts

### Issue: Data not saving to Supabase
**Solution:**
1. Run the SQL script to create the table
2. Check RLS policies in Supabase dashboard
3. Verify the table has the correct structure
4. Check browser console for error messages

### Issue: User details not pre-filling
**Solution:**
1. Ensure user is logged in
2. Check if user has a profile in the `profiles` table
3. Verify user metadata is set during signup
4. Check browser console for debugging logs

## 📊 Testing

### Test 1: Basic Functionality
1. Open `test-contact-form-simple.html`
2. Fill out the form
3. Click "Send Message"
4. Verify success message appears
5. Check Supabase for the new record

### Test 2: User Pre-filling
1. Log in to your website
2. Go to `/contact`
3. Verify form fields are pre-filled
4. Submit the form
5. Check that `user_id` is populated

### Test 3: URL Parameters
1. Go to `/contact?project_type=android-tv&project_details=Test message`
2. Verify form is pre-filled
3. Submit and check the data

## 🔍 Debugging

### Console Logs to Look For:
```
✅ Supabase client found: true
🔄 Starting form pre-fill process...
👤 User found: user@example.com
✅ Pre-filled first name: John
✅ Pre-filled email: user@example.com
📝 Form data collected: {...}
🔍 Testing Supabase connection...
✅ Supabase connection test successful
📝 Sending contact data to Supabase: {...}
✅ Contact message saved successfully: [...]
```

### Common Error Messages:
- `❌ Supabase client not found` - Supabase not loaded
- `❌ Connection test failed` - Database connection issue
- `❌ Error saving contact message` - Database insert failed
- `⚠️ Profile not found` - User profile missing

## 📝 SQL Queries for Verification

### Check if table exists:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'contact_submissions';
```

### View all submissions:
```sql
SELECT * FROM contact_submissions 
ORDER BY created_at DESC;
```

### Check table structure:
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'contact_submissions'
ORDER BY ordinal_position;
```

## 🎯 Expected Results

After setup, you should see:
1. ✅ Contact form loads without errors
2. ✅ User details pre-fill when logged in
3. ✅ Form submission shows success message
4. ✅ Data appears in Supabase `contact_submissions` table
5. ✅ Admin panel can view all submissions
6. ✅ Console shows detailed debugging information

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify the SQL script ran successfully
3. Test with the simple test file first
4. Check Supabase logs for database errors
