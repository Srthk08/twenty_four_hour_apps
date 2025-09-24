# Database Setup for Customization Forms

This document provides instructions for setting up the Supabase database to store customization form data for all 4 products.

## Products Supported
1. **Restaurant Website** (`restaurant-website`)
2. **Streaming Mobile App** (`streaming-mobile-app`)
3. **Android TV App** (`android-tv-app`)
4. **Restaurant Menu System** (`restaurant-menu-system`)

## Quick Setup

### Step 1: Execute SQL Schema
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase_simple_schema.sql`
4. Click **Run** to execute the schema

### Step 2: Verify Table Creation
After running the SQL, you should see:
- ✅ `customization_forms` table created successfully
- ✅ All indexes created
- ✅ Row Level Security enabled
- ✅ Policies created

## Database Schema

### Main Table: `customization_forms`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `created_at` | TIMESTAMP | When the form was created |
| `updated_at` | TIMESTAMP | When the form was last updated |
| `product_type` | TEXT | Type of product (see supported types above) |
| `product_name` | TEXT | Name of the product |
| `product_price` | TEXT | Price of the product |
| `project_name` | TEXT | User's project name |
| `contact_person` | TEXT | Contact person name |
| `app_name` | TEXT | App name |
| `product_description` | TEXT | Product description |
| `restaurant_name` | TEXT | Restaurant name (for restaurant products) |
| `cuisine_type` | TEXT | Cuisine type (for restaurant products) |
| `logo_url` | TEXT | URL to uploaded logo |
| `logo_filename` | TEXT | Original logo filename |
| `logo_mime_type` | TEXT | Logo MIME type |
| `logo_size` | INTEGER | Logo file size in bytes |
| `contact_email` | TEXT | Contact email (required) |
| `contact_phone` | TEXT | Contact phone (required) |
| `primary_color` | TEXT | Primary color hex code |
| `secondary_color` | TEXT | Secondary color hex code |
| `accent_color` | TEXT | Accent color hex code |
| `text_color` | TEXT | Text color hex code |
| `additional_requirements` | TEXT | Additional requirements |
| `user_id` | UUID | User ID (if logged in) |
| `menu_items` | JSONB | Menu items (for Order Menu System) |
| `restaurant_address` | TEXT | Restaurant address (for Order Menu System) |
| `owner_name` | TEXT | Owner name (for Order Menu System) |
| `status` | TEXT | Form status (pending, in_progress, completed, cancelled) |
| `admin_notes` | TEXT | Admin notes |

### Key Features

#### 1. Duplicate Prevention
- **Unique constraint**: `(contact_email, product_type)`
- Same email + product type combination cannot exist twice
- If duplicate is detected, existing record is updated instead of creating new one

#### 2. Row Level Security (RLS)
- Users can only see their own data
- Anonymous users can insert data
- Authenticated users have full CRUD access to their data

#### 3. Indexes for Performance
- Email lookup
- Product type filtering
- User ID filtering
- Status filtering
- Created date sorting

## Usage Examples

### 1. Save a Customization Form

```javascript
import { saveCustomizationForm } from './src/lib/customization-db.js';

const formData = {
  projectName: 'My Restaurant Project',
  contactPerson: 'John Doe',
  appName: 'MyRestaurantApp',
  productDescription: 'Need a modern restaurant website',
  restaurantName: 'Johns Pizza',
  cuisineType: 'Italian',
  email: 'john@example.com',
  phone: '+1234567890',
  primaryColor: '#3B82F6',
  secondaryColor: '#10B981',
  accentColor: '#F59E0B',
  textColor: '#1F2937',
  additionalRequirements: 'Need delivery integration'
};

const result = await saveCustomizationForm(formData, 'restaurant-website');
if (result.success) {
  console.log('Form saved successfully:', result.data);
} else {
  console.error('Error saving form:', result.error);
}
```

### 2. Get User's Customizations

```javascript
import { getCustomizationsByEmail } from './src/lib/customization-db.js';

const result = await getCustomizationsByEmail('john@example.com');
if (result.success) {
  console.log('User customizations:', result.data);
} else {
  console.error('Error fetching customizations:', result.error);
}
```

### 3. Check for Duplicates

```javascript
import { checkDuplicate } from './src/lib/customization-db.js';

const result = await checkDuplicate('john@example.com', 'restaurant-website');
if (result.isDuplicate) {
  console.log('Duplicate found, will update existing record');
} else {
  console.log('No duplicate, will create new record');
}
```

### 4. Update Form Status (Admin)

```javascript
import { updateCustomizationStatus } from './src/lib/customization-db.js';

const result = await updateCustomizationStatus(
  'form-uuid-here', 
  'in_progress', 
  'Started working on this project'
);
```

## Integration with Existing Code

### Update Dashboard Form Submission

Replace the existing localStorage saving with database saving:

```javascript
// In dashboard.astro, replace localStorage saving with:
import { saveCustomizationForm } from '../lib/customization-db.js';

// In form submission handler:
const result = await saveCustomizationForm(formData, selectedProduct.type);
if (result.success) {
  console.log('Form saved to database:', result.data);
  // Clear URL parameters and show browse products section
  window.history.replaceState({}, document.title, window.location.pathname);
  showBrowseProductsSection();
} else {
  console.error('Error saving to database:', result.error);
  // Fallback to localStorage
  localStorage.setItem('project-requirements', JSON.stringify([formData]));
}
```

### Update Orders Page

Replace localStorage reading with database queries:

```javascript
// In orders.astro, replace localStorage reading with:
import { getCustomizationsByEmail } from '../lib/customization-db.js';

// In loadOrders function:
const currentUser = window.globalAuthManager?.getCurrentUser() || window.simpleAuthManager?.getCurrentUser();
if (currentUser) {
  const result = await getCustomizationsByEmail(currentUser.email);
  if (result.success) {
    this.orders = result.data.map(item => ({
      ...item,
      orderId: item.id,
      orderDate: item.created_at,
      total: this.extractPrice(item.product_price) || 0,
      projectName: item.project_name,
      description: item.product_description,
      requirements: item,
      status: item.status
    }));
  }
}
```

## Testing

### Test Data Insertion

```sql
-- Insert test data
INSERT INTO customization_forms (
    product_type,
    product_name,
    product_price,
    project_name,
    contact_person,
    app_name,
    product_description,
    restaurant_name,
    cuisine_type,
    contact_email,
    contact_phone,
    primary_color,
    secondary_color,
    accent_color,
    text_color,
    additional_requirements
) VALUES (
    'restaurant-website',
    'Restaurant Website',
    '₹15,000',
    'Test Restaurant Project',
    'Test User',
    'TestApp',
    'Test description',
    'Test Restaurant',
    'Indian',
    'test@example.com',
    '+1234567890',
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#1F2937',
    'Test requirements'
);
```

### Verify Duplicate Prevention

```sql
-- Try to insert duplicate (should update instead of insert)
INSERT INTO customization_forms (
    product_type,
    product_name,
    product_price,
    project_name,
    contact_person,
    app_name,
    contact_email,
    contact_phone
) VALUES (
    'restaurant-website',
    'Restaurant Website',
    '₹15,000',
    'Updated Project Name',
    'Test User',
    'TestApp',
    'test@example.com',
    '+1234567890'
);
```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check RLS policies
2. **Duplicate Key Error**: Check unique constraint
3. **Invalid Product Type**: Use correct product type values
4. **Missing Required Fields**: Ensure all required fields are provided

### Debug Queries

```sql
-- Check table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'customization_forms';

-- Check constraints
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'customization_forms';

-- Check data
SELECT * FROM customization_forms LIMIT 10;
```

## Security Notes

- All data is protected by Row Level Security
- Users can only access their own data
- Anonymous users can insert but not view others' data
- Admin functions require proper authentication
- All inputs are sanitized by Supabase

## Performance Notes

- Indexes are created for common query patterns
- JSONB is used for flexible data storage
- Timestamps are automatically managed
- Queries are optimized for the expected data volume
