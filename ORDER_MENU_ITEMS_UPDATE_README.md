# Order Menu Items Table Update

## Overview
Updated the `order_menu_items` table to include user details and prevent duplicate data for the same email account.

## Changes Made

### 1. Database Schema Updates
- **Added Columns to `order_menu_items` table:**
  - `user_email` (VARCHAR(255)) - Email of the user who created the menu item
  - `restaurant_name` (VARCHAR(255)) - Name of the restaurant
  - `owner_name` (VARCHAR(255)) - Name of the restaurant owner

### 2. Duplicate Prevention
- **Created Trigger Function:** `prevent_duplicate_menu_items()`
- **Prevents:** Same user from creating multiple menu item sets for the same restaurant
- **Error Message:** "Menu items already exist for this user and restaurant combination. Please update existing items instead of creating new ones."

### 3. Security & Access Control
- **Updated RLS Policies:** Users can only access their own menu items
- **Index Added:** `idx_order_menu_items_user_email` for better performance
- **Data Isolation:** Each user can only see/modify their own menu items

### 4. Code Updates
- **Updated `cart.astro`:** Now includes user details when saving menu items
- **Enhanced Data Collection:** Menu items now store user email, restaurant name, and owner name

## Files Created

### 1. `update-order-menu-items-simple.sql`
**Simple version for easy execution in Supabase:**
- Adds the 3 new columns
- Creates duplicate prevention trigger
- Updates existing data
- Sets up RLS policies

### 2. `update-order-menu-items-table.sql`
**Complete version with advanced features:**
- All features from simple version
- Additional views and functions
- Comprehensive documentation
- Advanced querying capabilities

## How to Use

### Step 1: Execute SQL Query
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste contents of `update-order-menu-items-simple.sql`
4. Click "Run" to execute

### Step 2: Test the System
1. Add Order Menu System to cart
2. Fill out the form with menu items
3. Submit the form
4. Check database to verify data is stored with user details

## Database Structure After Update

### `order_menu_items` Table
```sql
- id (UUID, Primary Key)
- customization_id (UUID, Foreign Key)
- user_email (VARCHAR(255)) -- NEW
- restaurant_name (VARCHAR(255)) -- NEW  
- owner_name (VARCHAR(255)) -- NEW
- item_name (VARCHAR(255))
- price (DECIMAL(10,2))
- quantity_available (INTEGER)
- item_description (TEXT)
- item_category (VARCHAR(100))
- is_available (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Features

### ✅ Duplicate Prevention
- Same user cannot create multiple menu sets for same restaurant
- Clear error message when attempting duplicates
- Database-level enforcement

### ✅ User Data Tracking
- Every menu item linked to user email
- Restaurant and owner information stored
- Complete audit trail

### ✅ Security
- Row Level Security (RLS) enabled
- Users can only access their own data
- Proper authentication checks

### ✅ Performance
- Indexed on user_email for fast queries
- Optimized for user-specific data retrieval

## Error Handling

### Duplicate Prevention Error
```
Error: Menu items already exist for this user and restaurant combination. 
Please update existing items instead of creating new ones.
```

### Resolution
- User must update existing menu items instead of creating new ones
- Or use different restaurant name/owner combination

## Testing

### Test Cases
1. **First Time User:** Should be able to create menu items
2. **Same User, Same Restaurant:** Should get duplicate error
3. **Same User, Different Restaurant:** Should be allowed
4. **Different User, Same Restaurant:** Should be allowed

### Verification Queries
```sql
-- Check user's menu items
SELECT * FROM order_menu_items WHERE user_email = 'user@example.com';

-- Check for duplicates
SELECT user_email, restaurant_name, owner_name, COUNT(*) 
FROM order_menu_items 
GROUP BY user_email, restaurant_name, owner_name 
HAVING COUNT(*) > 1;
```

## Build Status
- ✅ **Build:** Successful (no errors)
- ✅ **Code Updates:** Applied
- ✅ **Database Schema:** Ready for execution
- ✅ **Security:** RLS policies configured

## Next Steps
1. Execute the SQL query in Supabase
2. Test the form submission
3. Verify data storage with user details
4. Confirm duplicate prevention works

---
**Status:** Ready for deployment! 🚀
