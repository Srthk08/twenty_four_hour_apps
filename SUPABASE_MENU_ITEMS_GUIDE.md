# How to View Menu Items in Supabase

## 📍 Where to Find Menu Items in Supabase

### **1. Table Location**
- **Database**: Your Supabase project database
- **Schema**: `public`
- **Table**: `order_menu_system_customizations`

### **2. New Columns Added**
After running the update SQL, you'll see these new columns:

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| `menu_items` | JSONB | Array of menu items as JSON |
| `menu_items_count` | INTEGER | Number of menu items |

## 🔍 How to View Menu Items

### **Method 1: Supabase Dashboard (Table Editor)**

#### **Step 1: Navigate to Table Editor**
1. Go to your Supabase project dashboard
2. Click on **"Table Editor"** in the left sidebar
3. Select **"order_menu_system_customizations"** table

#### **Step 2: View the Data**
- You'll see all records with the new columns
- Click on any row to see the full data
- The `menu_items` column will show JSON data
- The `menu_items_count` column shows the number of items

#### **Step 3: Expand JSON Data**
- Click on the `menu_items` column
- The JSON will expand to show the menu items
- You can see item names, prices, quantities, etc.

### **Method 2: SQL Editor (Recommended)**

#### **Step 1: Open SQL Editor**
1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New query"**

#### **Step 2: Run Viewing Queries**
Copy and paste any of these queries:

```sql
-- Basic view - see all customizations with menu items
SELECT 
  id,
  user_email,
  restaurant_name,
  owner_name,
  menu_items_count,
  created_at
FROM order_menu_system_customizations
WHERE menu_items_count > 0
ORDER BY created_at DESC;
```

```sql
-- Detailed view - see menu items in readable format
SELECT 
  id,
  user_email,
  restaurant_name,
  owner_name,
  menu_items_count,
  jsonb_pretty(menu_items) as menu_items_formatted
FROM order_menu_system_customizations
WHERE menu_items_count > 0
ORDER BY created_at DESC;
```

```sql
-- Expanded view - each menu item on separate row
SELECT 
  omc.id as customization_id,
  omc.user_email,
  omc.restaurant_name,
  omc.owner_name,
  (item->>'item_name') as item_name,
  (item->>'price')::DECIMAL as price,
  (item->>'quantity_available')::INTEGER as quantity_available,
  (item->>'item_description') as item_description,
  (item->>'item_category') as item_category,
  (item->>'is_available')::BOOLEAN as is_available
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
ORDER BY omc.created_at DESC, (item->>'item_name');
```

## 📊 What You'll See

### **Before Update (Old Structure):**
```
order_menu_system_customizations table:
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ id              │ user_email      │ restaurant_name │ owner_name      │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ uuid-123        │ john@example.com│ Pizza Palace    │ John Doe        │
│ uuid-456        │ jane@example.com│ Burger King     │ Jane Smith      │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### **After Update (New Structure):**
```
order_menu_system_customizations table:
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ id              │ user_email      │ restaurant_name │ owner_name      │ menu_items      │ menu_items_count│
├─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ uuid-123        │ john@example.com│ Pizza Palace    │ John Doe        │ [{"item_name":  │ 2               │
│                 │                 │                 │                 │  "Pizza Margherita",│                │
│                 │                 │                 │                 │  "price": 299,  │                │
│                 │                 │                 │                 │  "quantity_available": 50}...]│
├─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ uuid-456        │ jane@example.com│ Burger King     │ Jane Smith      │ [{"item_name":  │ 3               │
│                 │                 │                 │                 │  "Burger Deluxe",│                │
│                 │                 │                 │                 │  "price": 199,  │                │
│                 │                 │                 │                 │  "quantity_available": 30}...]│
└─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

## 🎯 Sample Menu Items JSON Structure

### **What the `menu_items` column contains:**
```json
[
  {
    "item_name": "Pizza Margherita",
    "price": 299.00,
    "quantity_available": 50,
    "item_description": "Classic Italian pizza with fresh mozzarella",
    "item_category": "Pizza",
    "is_available": true,
    "created_at": "2024-01-20T10:30:00Z"
  },
  {
    "item_name": "Burger Deluxe",
    "price": 199.00,
    "quantity_available": 30,
    "item_description": "Juicy beef burger with special sauce",
    "item_category": "Burgers",
    "is_available": true,
    "created_at": "2024-01-20T10:31:00Z"
  },
  {
    "item_name": "Chicken Wings",
    "price": 149.00,
    "quantity_available": 25,
    "item_description": "Spicy buffalo wings",
    "item_category": "Appetizers",
    "is_available": true,
    "created_at": "2024-01-20T10:32:00Z"
  }
]
```

## 🔍 Different Ways to View the Data

### **1. Quick Overview**
```sql
SELECT 
  user_email,
  restaurant_name,
  menu_items_count
FROM order_menu_system_customizations
WHERE menu_items_count > 0;
```

### **2. Detailed Menu Items**
```sql
SELECT 
  user_email,
  restaurant_name,
  jsonb_pretty(menu_items) as menu_items
FROM order_menu_system_customizations
WHERE menu_items_count > 0;
```

### **3. Individual Items (One per row)**
```sql
SELECT 
  omc.user_email,
  omc.restaurant_name,
  (item->>'item_name') as item_name,
  (item->>'price')::DECIMAL as price,
  (item->>'quantity_available')::INTEGER as quantity_available
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0;
```

### **4. Search Specific Items**
```sql
SELECT 
  omc.user_email,
  omc.restaurant_name,
  (item->>'item_name') as item_name,
  (item->>'price')::DECIMAL as price
FROM order_menu_system_customizations omc,
     jsonb_array_elements(omc.menu_items) AS item
WHERE omc.menu_items_count > 0
AND LOWER(item->>'item_name') LIKE LOWER('%pizza%');
```

## 📱 Supabase Dashboard Navigation

### **Step-by-Step Guide:**

1. **Login to Supabase**
   - Go to https://supabase.com
   - Login to your account
   - Select your project

2. **Navigate to Table Editor**
   - Click "Table Editor" in left sidebar
   - Find "order_menu_system_customizations" table
   - Click on it

3. **View the Data**
   - You'll see all records
   - Look for `menu_items` and `menu_items_count` columns
   - Click on any row to see full details

4. **Use SQL Editor for Better Viewing**
   - Click "SQL Editor" in left sidebar
   - Copy and paste the viewing queries
   - Click "Run" to execute

## 🚨 Important Notes

### **Before Running the Update:**
- Make sure you have data in `order_menu_system_customizations` table
- The table should exist and have some records

### **After Running the Update:**
- New columns will be added
- Existing records will have empty `menu_items` arrays
- New records will have menu items data

### **If You Don't See Data:**
1. Check if the update SQL ran successfully
2. Verify the table structure has the new columns
3. Check if there are any records in the table
4. Run the test queries to verify functionality

## 🎉 Success Indicators

### **You'll know it's working when:**
- ✅ You see `menu_items` and `menu_items_count` columns
- ✅ You can run the viewing queries without errors
- ✅ Menu items are displayed in JSON format
- ✅ The count matches the number of items in the JSON array

---
**Ready to view your menu items!** 🚀
