# Duplicate Data Cleanup Guide

## Overview
This guide provides SQL queries to clean up duplicate data from the `order_menu_items` table based on the same email, user name, and restaurant name.

## Files Created

### 1. `update-order-menu-items-simple.sql` ⭐ **MAIN FILE**
**Updated with duplicate cleanup functionality:**
- Adds user details columns to `order_menu_items` table
- Creates duplicate prevention trigger
- **NEW: Automatically deletes existing duplicates**
- Sets up RLS policies
- Shows count of deleted duplicates

### 2. `preview-duplicate-cleanup.sql` 🔍 **SAFE PREVIEW**
**Shows what will be deleted BEFORE actually deleting:**
- Lists all duplicate records that will be deleted
- Shows records that will be kept
- Provides summary statistics
- **SAFE TO RUN** - No data is actually deleted

### 3. `cleanup-duplicate-menu-items.sql` 🧹 **STANDALONE CLEANUP**
**Independent cleanup script:**
- Shows duplicate count before cleanup
- Deletes duplicates (keeps most recent)
- Shows final statistics
- Verifies no duplicates remain

## How the Duplicate Cleanup Works

### Logic
```sql
-- Groups records by: user_email + restaurant_name + owner_name
-- Keeps: Most recent record (by created_at DESC, then id DESC)
-- Deletes: All older duplicate records
```

### Example
**Before Cleanup:**
```
user@example.com | Pizza Palace | John Doe | Margherita Pizza | 2024-01-01
user@example.com | Pizza Palace | John Doe | Pepperoni Pizza  | 2024-01-02  ← KEPT (most recent)
user@example.com | Pizza Palace | John Doe | Margherita Pizza | 2024-01-03  ← DELETED (duplicate)
```

**After Cleanup:**
```
user@example.com | Pizza Palace | John Doe | Pepperoni Pizza  | 2024-01-02  ← Only this remains
```

## Usage Instructions

### Option 1: Complete Setup (Recommended)
1. Run `update-order-menu-items-simple.sql` in Supabase
2. This will:
   - Add new columns
   - Delete existing duplicates
   - Set up prevention for future duplicates
   - Configure security policies

### Option 2: Safe Preview First
1. Run `preview-duplicate-cleanup.sql` to see what will be deleted
2. Review the results
3. If satisfied, run `cleanup-duplicate-menu-items.sql`

### Option 3: Just Cleanup Existing Duplicates
1. Run `cleanup-duplicate-menu-items.sql` to clean up existing duplicates
2. This won't add new columns or triggers

## SQL Query Breakdown

### Duplicate Detection Query
```sql
WITH duplicates AS (
  SELECT 
    id,
    user_email,
    restaurant_name,
    owner_name,
    ROW_NUMBER() OVER (
      PARTITION BY user_email, restaurant_name, owner_name 
      ORDER BY created_at DESC, id DESC
    ) as rn
  FROM order_menu_items
  WHERE user_email IS NOT NULL 
    AND restaurant_name IS NOT NULL 
    AND owner_name IS NOT NULL
)
```

### Deletion Query
```sql
DELETE FROM order_menu_items 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);
```

## Safety Features

### ✅ Data Protection
- Only deletes records with complete user information
- Keeps the most recent record for each combination
- Uses `ROW_NUMBER()` for precise duplicate identification

### ✅ Preview Capability
- `preview-duplicate-cleanup.sql` shows exactly what will be deleted
- No data is modified in preview mode
- Full transparency before deletion

### ✅ Verification
- Shows count of deleted records
- Verifies no duplicates remain after cleanup
- Provides summary statistics

## Expected Results

### Before Cleanup
- Multiple records for same user + restaurant + owner combination
- Potential data inconsistency
- Storage waste

### After Cleanup
- One record per user + restaurant + owner combination
- Most recent data preserved
- Clean, consistent database

## Error Handling

### Common Issues
1. **No duplicates found**: Query will show "0 records deleted"
2. **Permission errors**: Ensure proper database permissions
3. **Constraint violations**: Check foreign key relationships

### Troubleshooting
```sql
-- Check if duplicates exist
SELECT user_email, restaurant_name, owner_name, COUNT(*) 
FROM order_menu_items 
GROUP BY user_email, restaurant_name, owner_name 
HAVING COUNT(*) > 1;

-- Check total records
SELECT COUNT(*) FROM order_menu_items;
```

## Build Status
- ✅ **Build**: Successful
- ✅ **SQL Queries**: Ready for execution
- ✅ **Safety**: Preview mode available
- ✅ **Documentation**: Complete

## Next Steps
1. **Preview**: Run `preview-duplicate-cleanup.sql` to see what will be deleted
2. **Execute**: Run `update-order-menu-items-simple.sql` for complete setup
3. **Verify**: Check that duplicates are removed and new prevention is working
4. **Test**: Submit new forms to ensure no duplicates are created

---
**Status**: Ready for execution! 🚀
