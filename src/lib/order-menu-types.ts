// TypeScript interfaces for Order Menu System data structure

export interface OrderMenuSystemCustomization {
  id?: string;
  user_email: string;
  user_id?: string;
  product_id: string;
  product_name: string;
  base_price: number;
  total_amount: number;
  
  // Restaurant Information
  restaurant_name: string;
  owner_name: string;
  restaurant_address: string;
  
  // Contact Information
  contact_email: string;
  contact_phone: string;
  
  // Brand Colors (Optional)
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  
  // Restaurant Logo
  restaurant_logo_url?: string;
  restaurant_logo_filename?: string;
  restaurant_logo_size?: number;
  restaurant_logo_type?: string;
  restaurant_logo_hash?: string;
  
  // Additional Requirements
  additional_requirements?: string;
  
  // Cart status
  cart_status?: 'active' | 'completed' | 'cancelled' | 'expired';
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
}

export interface OrderMenuItem {
  id?: string;
  customization_id?: string;
  item_name: string;
  price: number;
  quantity_available: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderMenuSystemFormData {
  // Restaurant Information
  restaurant_name: string;
  owner_name: string;
  restaurant_address: string;
  
  // Contact Information (from existing contact form)
  contact_email: string;
  contact_phone: string;
  
  // Brand Colors
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  
  // Restaurant Logo
  restaurant_logo?: File;
  
  // Menu Items
  menu_items: {
    item_name: string;
    price: number;
    quantity_available: number;
  }[];
  
  // Additional Requirements
  additional_requirements?: string;
}

// Database operation types
export interface OrderMenuSystemInsert {
  user_email: string;
  user_id?: string;
  restaurant_name: string;
  owner_name: string;
  restaurant_address: string;
  contact_email: string;
  contact_phone: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  restaurant_logo_url?: string;
  restaurant_logo_filename?: string;
  restaurant_logo_size?: number;
  restaurant_logo_type?: string;
  restaurant_logo_hash?: string;
  additional_requirements?: string;
  cart_status?: string;
}

export interface OrderMenuItemInsert {
  customization_id: string;
  item_name: string;
  price: number;
  quantity_available: number;
}
