# Cart Customization Setup Guide

## 🚀 Quick Setup Instructions

### Step 1: Create the Table
1. Open **Supabase Dashboard** → **SQL Editor**
2. Copy and paste the content from `cart-customization-complete.sql`
3. Click **"Run"** button

### Step 2: Test the System
1. Copy and paste the content from `test-cart-duplicate-prevention.sql`
2. Click **"Run"** button
3. Check the results to verify duplicate prevention works

## 📋 What This System Does

### ✅ **Prevents Duplicates Based on:**
- **Same Email** + **Same Product** + **Same Images** = **UPDATE existing cart**
- **Different Email** OR **Different Product** OR **Different Images** = **INSERT new cart**

### 📊 **Table Structure:**
- **All form fields** from the Project Requirements form
- **Image storage** for restaurant logo and menu photos
- **Hash-based duplicate detection** using file hashes
- **Automatic timestamps** and status tracking

### 🔧 **Key Features:**
1. **Duplicate Prevention** - No duplicate data for same user + product + images
2. **Image Support** - Stores restaurant logo and multiple menu photos
3. **Hash Detection** - Uses file hashes to detect identical images
4. **Flexible Updates** - Updates existing carts instead of creating duplicates
5. **Multiple Products** - Same user can have different products

## 🎯 **Expected Behavior:**

| Scenario | Action | Result |
|----------|--------|--------|
| Same email + Same product + Same images | UPDATE | Existing cart updated |
| Same email + Same product + Different images | INSERT | New cart created |
| Same email + Different product + Any images | INSERT | New cart created |
| Different email + Any product + Any images | INSERT | New cart created |

## 🔍 **Monitoring:**
- Use `cart_duplicate_monitor` view to check for duplicates
- Check console logs for detailed operation status
- Monitor `duplicate_hash` field for duplicate detection

## 📁 **Files Created:**
1. `cart-customization-complete.sql` - Main table and functions
2. `test-cart-duplicate-prevention.sql` - Test queries
3. Updated `cart.astro` - Frontend integration

## ✅ **Success Indicators:**
- Table created successfully in Supabase
- Test queries run without errors
- Cart form saves data without duplicates
- Admin panel shows cart data correctly

## 🚨 **Troubleshooting:**
- Check Supabase logs for any errors
- Verify RLS policies are working
- Ensure all functions are created successfully
- Check console logs for detailed error messages
