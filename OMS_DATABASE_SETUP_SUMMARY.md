# OMS Database Setup Summary

## Overview
This document summarizes the complete database setup for the Order Menu System (OMS) form data storage with duplicate prevention functionality.

## Files Created/Modified

### 1. SQL Files Created
- `oms_complete_setup.sql` - Complete database setup with all tables and functions
- `oms_updated_queries.sql` - Updated OMS form queries with duplicate prevention
- `oms_product_customization_queries.sql` - Separate queries for OMS product customization

### 2. Frontend Files Modified
- `src/pages/dashboard.astro` - Added Owner Name field and updated duplicate handling

## Database Structure

### Tables Created

#### 1. `oms_customizations` (Main OMS Form Data)
- **Purpose**: Stores data from the main OMS form
- **Key Fields**:
  - `user_email`, `project_name`, `restaurant_name` (unique constraint)
  - `owner_name`, `contact_person`, `phone_number`
  - `restaurant_address`, `house_number`, `address_line1`, `city`, `state`, `pincode`, `country`
  - `logo_url`, `logo_filename`, `logo_size`
  - `menu_categories`, `menu_items` (JSONB)
  - `primary_color`, `secondary_color`, `accent_color`, `text_color`
  - `product_type`, `product_name`, `product_price`
  - `additional_requirements`
  - `status`, `created_at`, `updated_at`

#### 2. `oms_product_customizations` (OMS Product Customization)
- **Purpose**: Stores data from OMS product customization form
- **Key Fields**: Same as `oms_customizations` but separate table for product-specific data

### Functions Created

#### 1. Duplicate Detection Functions
- `check_oms_duplicate()` - Checks for duplicates in OMS customizations
- `check_oms_product_duplicate()` - Checks for duplicates in OMS product customizations

#### 2. Data Management Functions
- `upsert_oms_customization()` - Inserts/updates OMS customization data
- `upsert_oms_product_customization()` - Inserts/updates OMS product customization data
- `get_oms_customizations_by_user()` - Retrieves OMS customizations by user
- `get_oms_product_customizations_by_user()` - Retrieves OMS product customizations by user
- `get_oms_customization_for_qr()` - Retrieves OMS customization for QR code generation

## Duplicate Prevention Logic

### Duplicate Types Detected
1. **Exact Duplicate**: Same email + project name + restaurant name
   - **Action**: Return existing record with duplicate flag
   - **Message**: "Data already exists with identical information"

2. **Contact Duplicate**: Same contact person + phone number
   - **Action**: Update existing record with new project information
   - **Message**: "Existing record updated with new project information"

3. **Restaurant Duplicate**: Same restaurant name
   - **Action**: Create new record (different project name allowed)
   - **Message**: "New record created. Restaurant name was already in use"

### Frontend Handling
- **Success Messages**: Different messages based on duplicate type
- **Warning Messages**: Specific popup messages for each duplicate scenario
- **Form Validation**: Added Owner Name field as required

## Key Features

### 1. Comprehensive Duplicate Prevention
- Prevents exact duplicates
- Handles partial duplicates intelligently
- Updates existing records when appropriate
- Creates new records when project names differ

### 2. Flexible Data Storage
- JSONB fields for menu categories and items
- Separate tables for different form types
- Comprehensive address storage
- Logo and media file support

### 3. User-Friendly Messages
- Clear duplicate detection messages
- Specific actions taken for each duplicate type
- Success confirmations for new records

### 4. Performance Optimized
- Proper indexing on frequently queried fields
- Efficient duplicate checking functions
- Optimized data retrieval functions

## Usage Instructions

### 1. Database Setup
```sql
-- Run the complete setup
\i oms_complete_setup.sql
```

### 2. Frontend Integration
- The dashboard form now includes the Owner Name field
- Duplicate detection is handled automatically
- User-friendly messages are displayed based on duplicate type

### 3. Testing
The SQL files include comprehensive test cases:
- New record creation
- Duplicate detection scenarios
- Data retrieval functions
- Update operations

## Form Fields Structure

### OMS Form Fields
1. **Project Name** (required)
2. **Restaurant Name** (required)
3. **Owner Name** (required) - *Added*
4. **Contact Person** (required)
5. **Email** (required)
6. **Phone Number** (required)
7. **Restaurant Address** (required)
   - House/Flat Number
   - Address Line 1
   - City
   - State
   - Pincode
   - Country
8. **Additional Requirements** (optional)

### Color Customization
- Primary Color
- Secondary Color
- Accent Color
- Text Color

### Menu Data (JSONB)
- Menu Categories
- Menu Items

## Error Handling

### Database Level
- Unique constraints prevent exact duplicates
- Proper error messages for different scenarios
- Transaction safety for data integrity

### Frontend Level
- Form validation for required fields
- Clear error messages for users
- Graceful handling of duplicate scenarios

## Security Considerations

### Data Protection
- User authentication required
- Proper permissions on tables and functions
- Data validation at database level

### Access Control
- Authenticated users only
- User-specific data retrieval
- Secure function execution

## Maintenance

### Regular Tasks
- Monitor duplicate detection accuracy
- Review user feedback on messages
- Optimize queries based on usage patterns

### Updates
- Add new fields as needed
- Modify duplicate detection logic
- Update frontend messages

## Conclusion

This setup provides a robust, user-friendly system for storing OMS form data with intelligent duplicate prevention. The system handles various duplicate scenarios gracefully while maintaining data integrity and providing clear feedback to users.

The separate tables for different form types ensure data organization while the comprehensive duplicate detection prevents data redundancy and provides appropriate user guidance.
