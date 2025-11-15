// TypeScript interfaces for Order Menu System database schema
// This matches the SQL schema created in order-menu-system-simple.sql

export interface OrderMenuSystemCustomization {
  id?: string;
  
  // User identification
  user_email: string;
  user_id?: string;
  
  // Product information
  product_id: string;
  product_name: string;
  base_price: number;
  total_amount: number;
  
  // 1. Project Name
  project_name?: string;
  
  // 2. Contact Person
  contact_person?: string;
  
  // 3. Restaurant Name
  restaurant_name: string;
  
  
  // 5. App Icon
  app_icon_url?: string;
  app_icon_filename?: string;
  app_icon_size?: number;
  app_icon_type?: string;
  
  // 6. Restaurant Address
  restaurant_address: string;
  
  // 7. Restaurant Logo
  restaurant_logo_url?: string;
  restaurant_logo_filename?: string;
  restaurant_logo_size?: number;
  restaurant_logo_type?: string;
  
  // 9. Contact Information
  // 9.1. Email
  contact_email: string;
  // 9.2. Phone Number
  contact_phone: string;
  
  // 10. App Screenshots
  app_screenshots?: string[];
  
  // 11. Brand Colors
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  
  // 12. Additional Requirements
  additional_requirements?: string;
  
  // Status and timestamps
  cart_status?: 'active' | 'completed' | 'cancelled' | 'expired';
  created_at?: string;
  updated_at?: string;
}

export interface OrderMenuItem {
  id?: string;
  customization_id?: string;
  
  // 8.1. Item Name
  item_name: string;
  
  // 8.2. Price
  price: number;
  
  // 8.3. Quantity Available
  quantity_available: number;
  
  // Additional fields
  item_description?: string;
  item_category?: string;
  is_available?: boolean;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
}

// Form data interface for easy form handling
export interface OrderMenuSystemFormData {
  // 1. Project Name
  project_name?: string;
  
  // 2. Contact Person
  contact_person?: string;
  
  // 3. Restaurant Name
  restaurant_name: string;
  
  
  // 5. App Icon
  app_icon?: File;
  
  // 6. Restaurant Address
  restaurant_address: string;
  
  // 7. Restaurant Logo
  restaurant_logo?: File;
  
  // 8. Menu Items
  menu_items: {
    item_name: string;
    price: number;
    quantity_available: number;
    item_description?: string;
    item_category?: string;
  }[];
  
  // 9. Contact Information
  // 9.1. Email
  contact_email: string;
  // 9.2. Phone Number
  contact_phone: string;
  
  // 10. App Screenshots
  app_screenshots?: File[];
  
  // 11. Brand Colors
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  
  // 12. Additional Requirements
  additional_requirements?: string;
}

// Database insert interface
export interface OrderMenuSystemInsert {
  user_email: string;
  user_id?: string;
  product_id?: string;
  product_name?: string;
  base_price?: number;
  total_amount?: number;
  project_name?: string;
  contact_person?: string;
  restaurant_name: string;
  owner_name: string;
  app_icon_url?: string;
  app_icon_filename?: string;
  app_icon_size?: number;
  app_icon_type?: string;
  restaurant_address: string;
  restaurant_logo_url?: string;
  restaurant_logo_filename?: string;
  restaurant_logo_size?: number;
  restaurant_logo_type?: string;
  contact_email: string;
  contact_phone: string;
  app_screenshots?: string[];
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  additional_requirements?: string;
  cart_status?: string;
}

// Menu item insert interface
export interface OrderMenuItemInsert {
  customization_id: string;
  item_name: string;
  price: number;
  quantity_available: number;
  item_description?: string;
  item_category?: string;
  is_available?: boolean;
}

// Complete order with menu items
export interface OrderMenuSystemComplete extends OrderMenuSystemCustomization {
  menu_items: OrderMenuItem[];
}
