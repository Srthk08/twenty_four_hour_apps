# Order Menu System (OMS) Implementation Guide

This guide explains how to implement the Order Menu System customization form with Supabase database integration.

## 🗄️ Database Setup

### 1. Run the SQL Schema
Execute the `oms_customization_schema.sql` file in your Supabase SQL editor to create the necessary tables and functions.

### 2. Key Features of the Database Schema

- **Duplicate Prevention**: Prevents exact duplicates based on `user_email`, `project_name`, and `restaurant_name`
- **JSON Storage**: Menu categories and items are stored as JSON for flexibility
- **QR Code Ready**: Data structure optimized for QR code generation
- **User Tracking**: Links to Supabase auth users
- **Audit Trail**: Created and updated timestamps

## 📋 Form Fields Mapping

Based on the image reference, here's how form fields map to database columns:

| Form Field | Database Column | Type | Required |
|------------|----------------|------|----------|
| Project Name | `project_name` | VARCHAR(255) | ✅ |
| Restaurant Name | `restaurant_name` | VARCHAR(255) | ✅ |
| Owner Name | `owner_name` | VARCHAR(255) | ✅ |
| Restaurant Address | `restaurant_address` | TEXT | ✅ |
| Contact Person | `contact_person` | VARCHAR(255) | ✅ |
| Email | `user_email` | VARCHAR(255) | ✅ |
| Phone Number | `phone_number` | VARCHAR(20) | ✅ |
| Logo Upload | `logo_url`, `logo_filename`, `logo_size` | TEXT, VARCHAR(255), INTEGER | ❌ |
| Menu Categories | `menu_categories` | JSONB | ❌ |
| Menu Items | `menu_items` | JSONB | ❌ |
| Primary Color | `primary_color` | VARCHAR(7) | ❌ |
| Secondary Color | `secondary_color` | VARCHAR(7) | ❌ |
| Accent Color | `accent_color` | VARCHAR(7) | ❌ |
| Text Color | `text_color` | VARCHAR(7) | ❌ |
| Additional Requirements | `additional_requirements` | TEXT | ❌ |

## 🔧 Implementation Steps

### 1. Add to Dashboard
Add this script tag to your `dashboard.astro` file:

```html
<script>
  import './oms-integration.js';
</script>
```

### 2. Update Form HTML
Ensure your OMS form has the correct IDs and structure:

```html
<form id="order-menu-customization-form">
  <!-- Project Details -->
  <input name="projectName" required>
  <input name="restaurantName" required>
  <input name="ownerName" required>
  <textarea name="restaurantAddress" required></textarea>
  
  <!-- Contact Information -->
  <input name="contactPerson" required>
  <input name="email" type="email" required>
  <input name="phone" type="tel" required>
  
  <!-- Logo Upload -->
  <input name="restaurantLogo" type="file" accept="image/*">
  
  <!-- Color Customization -->
  <input name="primaryColor" type="color" value="#3B82F6">
  <input name="secondaryColor" type="color" value="#10B981">
  <input name="accentColor" type="color" value="#F59E0B">
  <input name="textColor" type="color" value="#1F2937">
  
  <!-- Additional Requirements -->
  <textarea name="additionalRequirements"></textarea>
  
  <!-- Menu Categories -->
  <div id="category-management">
    <input id="new-category-input" placeholder="e.g., Starters">
    <button id="add-category-btn" type="button">Add Category</button>
    <button id="clear-all-categories-btn" type="button">Clear All</button>
    <div id="current-category-display">Current Category: Uncategorized</div>
  </div>
  
  <!-- Menu Items -->
  <div id="menu-items-container">
    <!-- Dynamic menu items will be added here -->
  </div>
  <button id="add-menu-item-btn" type="button">+ Add Menu Item</button>
  
  <!-- Submit Button -->
  <button type="submit">Submit Customization</button>
</form>
```

### 3. Database Functions

The schema includes these helpful functions:

- `upsert_oms_customization()` - Insert or prevent duplicate data
- `get_oms_customizations_by_user()` - Get all customizations for a user
- `get_oms_customization_for_qr()` - Get data formatted for QR code generation

## 🎯 Key Features

### Duplicate Prevention
- Same email + same project name + same restaurant name = No new record
- Same email + different project/restaurant = New record allowed
- Prevents data overlapping and ensures data integrity

### Auto-Fill Integration
- User details from signup/profile automatically fill the form
- Contact person = User's full name
- Owner name = User's full name
- Restaurant name = User's company name
- Email and phone = User's contact info

### JSON Menu Structure
Categories are stored as:
```json
[
  {
    "id": "cat_1",
    "name": "Starters",
    "description": "Appetizers and starters",
    "sort_order": 1
  }
]
```

Menu items are stored as:
```json
[
  {
    "id": "item_1",
    "name": "Margherita Pizza",
    "description": "Classic tomato and mozzarella pizza",
    "price": 299.00,
    "category_id": "cat_1",
    "category_name": "Starters",
    "is_available": true,
    "sort_order": 1,
    "image_url": ""
  }
]
```

### QR Code Generation
- Data is structured for easy QR code generation
- QR code contains all menu data and restaurant info
- When scanned, displays a complete digital menu

## 🚀 Usage Examples

### Submit OMS Customization
```javascript
// The form automatically handles submission
// Just ensure the form has the correct ID and structure
```

### Get User's Customizations
```javascript
const { data, error } = await supabase.rpc('get_oms_customizations_by_user', {
  p_user_email: 'user@example.com'
});
```

### Generate QR Code Data
```javascript
const { data, error } = await supabase.rpc('get_oms_customization_for_qr', {
  p_customization_id: 'uuid-here'
});
```

## 🔒 Security & Permissions

Make sure to set up proper RLS (Row Level Security) policies in Supabase:

```sql
-- Enable RLS
ALTER TABLE oms_customizations ENABLE ROW LEVEL SECURITY;

-- Policy for users to see their own data
CREATE POLICY "Users can view own customizations" ON oms_customizations
  FOR SELECT USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Policy for users to insert their own data
CREATE POLICY "Users can insert own customizations" ON oms_customizations
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');
```

## 📱 QR Code Integration

The system generates QR codes that contain:
- Restaurant information
- Complete menu with categories and items
- Color scheme
- Contact details
- Generated timestamp

When scanned, the QR code data can be used to display a complete digital menu.

## 🎨 Color Customization

The system supports full color customization:
- Primary Color (default: #3B82F6)
- Secondary Color (default: #10B981)
- Accent Color (default: #F59E0B)
- Text Color (default: #1F2937)

These colors are stored in the database and can be used to theme the generated menu.

## 📊 Admin Panel Integration

The OMS customizations will appear in the admin panel with:
- All form data
- Menu categories and items
- Color schemes
- Status tracking
- Timestamps

This allows admins to view and manage all OMS customizations from a central location.
