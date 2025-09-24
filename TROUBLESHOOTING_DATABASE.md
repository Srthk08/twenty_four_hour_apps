# Database Storage Troubleshooting Guide

## 🚨 **ISSUE: Customization forms not saving to Supabase database**

## 🔍 **Root Cause Analysis**

The most likely reasons why data is not saving:

1. **❌ Database table doesn't exist** (Most Common)
2. **❌ Wrong API key configuration** (Fixed)
3. **❌ Row Level Security blocking inserts**
4. **❌ Network/connection issues**

## ✅ **SOLUTION STEPS**

### **Step 1: Verify Database Table Exists**

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project: `lmrrdcaavwwletcjcpqv`

2. **Check if table exists:**
   - Go to **Table Editor**
   - Look for `customization_forms` table
   - If NOT found → Go to Step 2
   - If found → Go to Step 3

### **Step 2: Create the Database Table**

1. **Go to SQL Editor:**
   - In Supabase Dashboard → **SQL Editor**

2. **Execute the Schema:**
   - Copy the entire contents of `supabase_simple_schema.sql`
   - Paste into SQL Editor
   - Click **"Run"** button

3. **Verify Table Creation:**
   - Go to **Table Editor**
   - You should see `customization_forms` table
   - Check that it has all the required columns

### **Step 3: Test Database Connection**

1. **Use Debug Tool:**
   - Visit: `http://localhost:4322/debug-database`
   - Click **"Test Supabase Connection"**
   - Click **"Check if customization_forms table exists"**

2. **Expected Results:**
   - ✅ Connection should succeed
   - ✅ Table should exist
   - If either fails, check the error messages

### **Step 4: Test Data Insertion**

1. **Use Debug Tool:**
   - Click **"Test Insert Data"**
   - This will try to insert a test record

2. **Expected Results:**
   - ✅ Should show "Insert Successful"
   - ✅ Should show a record ID
   - If fails, check the error message

### **Step 5: Verify Data in Supabase**

1. **Check Table Data:**
   - Go to Supabase Dashboard → **Table Editor**
   - Select `customization_forms` table
   - You should see the test data

2. **Use Debug Tool:**
   - Click **"View All Data in Table"**
   - Should show all records

## 🐛 **Common Error Messages & Solutions**

### **Error: "relation 'customization_forms' does not exist"**
**Solution:** The table doesn't exist. Execute the SQL schema.

### **Error: "permission denied for table customization_forms"**
**Solution:** Row Level Security issue. Check RLS policies.

### **Error: "duplicate key value violates unique constraint"**
**Solution:** This is actually good! It means duplicate prevention is working.

### **Error: "Failed to fetch" or Network Error**
**Solution:** Check internet connection and Supabase URL.

### **Error: "Invalid API key"**
**Solution:** API key mismatch. Check the configuration.

## 🔧 **Manual Database Setup (If SQL Editor Fails)**

If the SQL editor doesn't work, create the table manually:

1. **Go to Table Editor**
2. **Click "New Table"**
3. **Table Name:** `customization_forms`
4. **Add these columns:**

| Column Name | Type | Default | Nullable |
|-------------|------|---------|----------|
| id | uuid | uuid_generate_v4() | No (Primary Key) |
| created_at | timestamptz | now() | No |
| updated_at | timestamptz | now() | No |
| product_type | text | - | No |
| product_name | text | - | No |
| product_price | text | - | No |
| project_name | text | - | No |
| contact_person | text | - | No |
| app_name | text | - | No |
| product_description | text | - | Yes |
| restaurant_name | text | - | Yes |
| cuisine_type | text | - | Yes |
| logo_url | text | - | Yes |
| logo_filename | text | - | Yes |
| logo_mime_type | text | - | Yes |
| logo_size | integer | - | Yes |
| contact_email | text | - | No |
| contact_phone | text | - | No |
| primary_color | text | '#3B82F6' | Yes |
| secondary_color | text | '#10B981' | Yes |
| accent_color | text | '#F59E0B' | Yes |
| text_color | text | '#1F2937' | Yes |
| additional_requirements | text | - | Yes |
| user_id | uuid | - | Yes |
| menu_items | jsonb | '[]' | Yes |
| restaurant_address | text | - | Yes |
| owner_name | text | - | Yes |
| status | text | 'pending' | Yes |
| admin_notes | text | - | Yes |

5. **Add Unique Constraint:**
   - Go to **Database** → **Constraints**
   - Add unique constraint on `(contact_email, product_type)`

6. **Enable RLS:**
   - Go to **Authentication** → **Policies**
   - Enable Row Level Security for `customization_forms`

## 🧪 **Testing Steps**

### **Test 1: Debug Page**
1. Visit `/debug-database`
2. Run all tests
3. Check results

### **Test 2: Real Form**
1. Go to dashboard
2. Select any product
3. Fill out form
4. Submit
5. Check browser console for logs
6. Check Supabase table for data

### **Test 3: Duplicate Prevention**
1. Submit same form twice with same email
2. Should update existing record, not create new one

## 📊 **Expected Console Logs**

When working correctly, you should see:

```
💾 Saving project form to database...
✅ Project form saved to database: [data object]
```

When failing, you'll see:

```
❌ Error saving to database: [error message]
```

## 🆘 **If Still Not Working**

1. **Check Supabase Logs:**
   - Go to Supabase Dashboard → **Logs**
   - Look for error messages

2. **Check Browser Console:**
   - Open Developer Tools → Console
   - Look for error messages

3. **Check Network Tab:**
   - Open Developer Tools → Network
   - Look for failed API calls

4. **Verify API Key:**
   - Make sure the API key in `customization-db.js` matches your Supabase project

## ✅ **Success Indicators**

You'll know it's working when:
- ✅ Debug page shows all green checkmarks
- ✅ Form submissions show success messages
- ✅ Data appears in Supabase table
- ✅ Console shows success logs
- ✅ Duplicate prevention works

## 📞 **Need Help?**

If you're still having issues:
1. Check the browser console for specific error messages
2. Check the Supabase dashboard for any errors
3. Try the debug page at `/debug-database`
4. Verify the table exists and has the correct structure

The most common issue is that the database table doesn't exist yet. Execute the SQL schema and it should work! 🎉
