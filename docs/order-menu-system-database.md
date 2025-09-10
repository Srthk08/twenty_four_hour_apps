# Order Menu System Database Structure

This document describes the database structure for storing Order Menu System customization data, separate from the existing cart customizations system.

## Overview

The Order Menu System uses dedicated tables to store restaurant-specific data while maintaining the existing data structure for other products. This ensures clean separation and optimized storage for restaurant order management systems.

## Database Tables

### 1. `order_menu_system_customizations`

Main table storing Order Menu System customization data.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_email` | VARCHAR(255) | User's email address |
| `user_id` | UUID | Reference to auth.users |
| `product_id` | VARCHAR(50) | Product identifier (default: 'order-menu-system') |
| `product_name` | VARCHAR(255) | Product name (default: 'Order Menu System') |
| `base_price` | DECIMAL(10,2) | Base price of the product |
| `total_amount` | DECIMAL(10,2) | Total amount for the customization |
| `restaurant_name` | VARCHAR(255) | Name of the restaurant |
| `owner_name` | VARCHAR(255) | Name of the restaurant owner |
| `restaurant_address` | TEXT | Complete restaurant address |
| `contact_email` | VARCHAR(255) | Contact email for the restaurant |
| `contact_phone` | VARCHAR(20) | Contact phone number |
| `primary_color` | VARCHAR(7) | Primary brand color (hex code) |
| `secondary_color` | VARCHAR(7) | Secondary brand color (hex code) |
| `accent_color` | VARCHAR(7) | Accent brand color (hex code) |
| `text_color` | VARCHAR(7) | Text color (hex code) |
| `restaurant_logo_url` | TEXT | URL of the uploaded restaurant logo |
| `restaurant_logo_filename` | VARCHAR(255) | Original filename of the logo |
| `restaurant_logo_size` | INTEGER | Size of the logo file in bytes |
| `restaurant_logo_type` | VARCHAR(100) | MIME type of the logo file |
| `restaurant_logo_hash` | VARCHAR(64) | Hash for duplicate detection |
| `additional_requirements` | TEXT | Additional requirements or special requests |
| `cart_status` | VARCHAR(20) | Cart status (active, completed, cancelled, expired) |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

### 2. `order_menu_items`

Table storing individual menu items for each Order Menu System customization.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `customization_id` | UUID | Foreign key to order_menu_system_customizations |
| `item_name` | VARCHAR(255) | Name of the menu item |
| `price` | DECIMAL(10,2) | Price of the menu item |
| `quantity_available` | INTEGER | Available quantity of the item |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

## Data Flow

### For Order Menu System Products:
1. User selects Order Menu System product
2. Data is stored in `order_menu_system_customizations` table
3. Menu items are stored in `order_menu_items` table
4. Logo is uploaded to Supabase Storage

### For Other Products:
1. User selects any other product
2. Data continues to be stored in existing `cart_customizations` table
3. No changes to existing functionality

## API Endpoints

The system uses the following service methods:

- `OrderMenuSystemService.saveCustomization()` - Save new customization
- `OrderMenuSystemService.getCustomizationByUser()` - Get user's customization
- `OrderMenuSystemService.updateCustomization()` - Update existing customization
- `OrderMenuSystemService.deleteCustomization()` - Delete customization
- `OrderMenuSystemService.getCompleteCustomization()` - Get customization with menu items

## File Storage

Restaurant logos are stored in Supabase Storage under:
- Bucket: `restaurant-assets`
- Path: `order-menu-logos/{userEmail}/{filename}`

## Sample Data

The migration includes sample data for testing:
- Restaurant: "Sample Restaurant"
- Owner: "John Doe"
- Sample menu items: Margherita Pizza, Chicken Burger, Caesar Salad, Chocolate Cake

## Indexes

For optimal performance, the following indexes are created:
- `idx_order_menu_customizations_user_email` - On user_email
- `idx_order_menu_customizations_product_id` - On product_id
- `idx_order_menu_customizations_cart_status` - On cart_status
- `idx_order_menu_items_customization_id` - On customization_id

## Triggers

Automatic timestamp updates are handled by triggers:
- `update_order_menu_customizations_updated_at` - Updates updated_at on customization changes
- `update_order_menu_items_updated_at` - Updates updated_at on menu item changes

## Migration

To apply this database structure:

1. Run the migration file: `supabase/migrations/20250120000000_order_menu_system.sql`
2. Ensure Supabase Storage bucket `restaurant-assets` exists
3. Update your application to use the new service methods

## TypeScript Support

Type definitions are available in:
- `src/lib/order-menu-types.ts` - Interface definitions
- `src/lib/order-menu-service.ts` - Service implementation

This ensures type safety when working with Order Menu System data in your application.
