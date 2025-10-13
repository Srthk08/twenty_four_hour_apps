// =====================================================
// ORDER MENU CUSTOMIZATION FORM - JAVASCRIPT INTEGRATION
// Handles duplicate prevention and file storage
// =====================================================

// Supabase client setup
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// =====================================================
// ORDER MENU CUSTOMIZATION FUNCTIONS
// =====================================================

/**
 * Submit Order Menu Customization form with duplicate check
 * @param {Object} formData - Form data object
 * @param {File} logoFile - Logo file (optional)
 * @param {File} menuPhotoFile - Menu photo file (optional)
 * @returns {Promise<Object>} - Result object with success/error
 */
export async function submitOrderMenuCustomization(formData, logoFile = null, menuPhotoFile = null) {
  try {
    console.log('🚀 Submitting Order Menu Customization form...', formData);
    
    // Step 1: Upload files to Supabase Storage (if provided)
    let logoUrl = null;
    let logoStoragePath = null;
    let menuPhotoUrl = null;
    let menuPhotoStoragePath = null;
    
    if (logoFile) {
      const logoResult = await uploadFileToStorage(logoFile, 'logos');
      logoUrl = logoResult.publicUrl;
      logoStoragePath = logoResult.storagePath;
    }
    
    if (menuPhotoFile) {
      const menuResult = await uploadFileToStorage(menuPhotoFile, 'menus');
      menuPhotoUrl = menuResult.publicUrl;
      menuPhotoStoragePath = menuResult.storagePath;
    }
    
    // Step 2: Insert order menu customization using SQL function
    const { data, error } = await supabase.rpc('insert_order_menu_customization', {
      p_project_name: formData.project_name,
      p_restaurant_name: formData.restaurant_name,
      p_owner_name: formData.owner_name,
      p_contact_person: formData.contact_person,
      p_user_email: formData.user_email,
      p_phone_number: formData.phone_number,
      p_house_flat_number: formData.house_flat_number,
      p_address_line_1: formData.address_line_1,
      p_city: formData.city,
      p_state: formData.state,
      p_pincode: formData.pincode,
      p_country: formData.country || 'India',
      p_logo_url: logoUrl,
      p_logo_storage_path: logoStoragePath,
      p_menu_photo_url: menuPhotoUrl,
      p_menu_photo_storage_path: menuPhotoStoragePath,
      p_additional_requirements: formData.additional_requirements,
      p_base_package_price: formData.base_package_price || 999.00,
      p_gst_amount: formData.gst_amount || 180.00,
      p_total_amount: formData.total_amount || 1179.00
    });
    
    if (error) {
      console.error('❌ Error submitting order menu customization:', error);
      return { success: false, error: error.message };
    }
    
    const orderId = data;
    console.log('✅ Order menu customization submitted successfully:', orderId);
    
    return { success: true, orderId: orderId };
    
  } catch (error) {
    console.error('❌ Error in submitOrderMenuCustomization:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Upload file to Supabase Storage
 * @param {File} file - File to upload
 * @param {string} folder - Storage folder (logos or menus)
 * @returns {Promise<Object>} - Upload result with URL and path
 */
async function uploadFileToStorage(file, folder) {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('order-menu-files')
      .upload(filePath, file);
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('order-menu-files')
      .getPublicUrl(filePath);
    
    return {
      publicUrl: urlData.publicUrl,
      storagePath: filePath
    };
    
  } catch (error) {
    console.error('❌ Error uploading file:', error);
    throw error;
  }
}

/**
 * Get all order menu customizations
 * @returns {Promise<Array>} - Array of order menu customizations
 */
export async function getAllOrderMenuCustomizations() {
  try {
    const { data, error } = await supabase
      .from('order_menu_customizations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching order menu customizations:', error);
    throw error;
  }
}

/**
 * Get order menu customizations by email (same email, different restaurants)
 * @param {string} email - User email
 * @returns {Promise<Array>} - Array of order menu customizations for the email
 */
export async function getOrderMenuCustomizationsByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('order_menu_customizations')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching order menu customizations by email:', error);
    throw error;
  }
}

/**
 * Get pending order menu customizations
 * @returns {Promise<Array>} - Array of pending order menu customizations
 */
export async function getPendingOrderMenuCustomizations() {
  try {
    const { data, error } = await supabase
      .from('order_menu_customizations')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching pending order menu customizations:', error);
    throw error;
  }
}

/**
 * Update order menu customization status
 * @param {string} orderId - Order menu customization ID
 * @param {string} status - New status ('pending', 'processing', 'completed', 'failed')
 * @returns {Promise<boolean>} - Success status
 */
export async function updateOrderMenuStatus(orderId, status) {
  try {
    const { error } = await supabase
      .from('order_menu_customizations')
      .update({ 
        status: status,
        updated_at: new Date().toISOString(),
        processed_at: status === 'completed' ? new Date().toISOString() : null
      })
      .eq('id', orderId);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Order menu status updated:', orderId, status);
    return true;
    
  } catch (error) {
    console.error('❌ Error updating order menu status:', error);
    throw error;
  }
}

/**
 * Check for duplicate order menu customization
 * @param {string} email - User email
 * @param {string} restaurantName - Restaurant name
 * @param {string} houseFlatNumber - House/Flat number
 * @param {string} addressLine1 - Address line 1
 * @param {string} city - City
 * @param {string} state - State
 * @param {string} pincode - Pincode
 * @returns {Promise<boolean>} - True if duplicate exists
 */
export async function checkOrderMenuDuplicate(email, restaurantName, houseFlatNumber, addressLine1, city, state, pincode) {
  try {
    const { data, error } = await supabase.rpc('check_order_menu_duplicate', {
      p_user_email: email,
      p_restaurant_name: restaurantName,
      p_house_flat_number: houseFlatNumber,
      p_address_line_1: addressLine1,
      p_city: city,
      p_state: state,
      p_pincode: pincode
    });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error checking order menu duplicate:', error);
    throw error;
  }
}

// =====================================================
// FORM VALIDATION FUNCTIONS
// =====================================================

/**
 * Validate order menu customization form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result
 */
export function validateOrderMenuForm(formData) {
  const errors = {};
  
  // Required fields validation
  if (!formData.project_name?.trim()) {
    errors.project_name = 'Project name is required';
  }
  
  if (!formData.restaurant_name?.trim()) {
    errors.restaurant_name = 'Restaurant name is required';
  }
  
  if (!formData.owner_name?.trim()) {
    errors.owner_name = 'Owner name is required';
  }
  
  if (!formData.contact_person?.trim()) {
    errors.contact_person = 'Contact person is required';
  }
  
  if (!formData.user_email?.trim()) {
    errors.user_email = 'Email is required';
  } else if (!isValidEmail(formData.user_email)) {
    errors.user_email = 'Please enter a valid email address';
  }
  
  if (!formData.phone_number?.trim()) {
    errors.phone_number = 'Phone number is required';
  }
  
  if (!formData.house_flat_number?.trim()) {
    errors.house_flat_number = 'House/Flat number is required';
  }
  
  if (!formData.address_line_1?.trim()) {
    errors.address_line_1 = 'Address line 1 is required';
  }
  
  if (!formData.city?.trim()) {
    errors.city = 'City is required';
  }
  
  if (!formData.state?.trim()) {
    errors.state = 'State is required';
  }
  
  if (!formData.pincode?.trim()) {
    errors.pincode = 'Pincode is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// =====================================================
// EXAMPLE USAGE
// =====================================================

// Example: Submit order menu customization form with files
/*
const formData = {
  project_name: 'Pizza Palace Downtown Project',
  restaurant_name: 'Pizza Palace',
  owner_name: 'Tony Romano',
  contact_person: 'Tony Romano',
  user_email: 'arun@gmail.com',
  phone_number: '74185296',
  house_flat_number: '123',
  address_line_1: 'Main Street, Sector 15',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  country: 'India',
  additional_requirements: 'Need custom pizza ordering system with delivery tracking',
  base_package_price: 999.00,
  gst_amount: 180.00,
  total_amount: 1179.00
};

const logoFile = document.getElementById('logo-input').files[0];
const menuPhotoFile = document.getElementById('menu-photo-input').files[0];

const result = await submitOrderMenuCustomization(formData, logoFile, menuPhotoFile);
if (result.success) {
  console.log('Form submitted successfully:', result.orderId);
} else {
  console.error('Form submission failed:', result.error);
}
*/

// Example: Check for duplicate before submitting
/*
const isDuplicate = await checkOrderMenuDuplicate(
  'arun@gmail.com',
  'Pizza Palace',
  '123',
  'Main Street, Sector 15',
  'Mumbai',
  'Maharashtra',
  '400001'
);

if (isDuplicate) {
  alert('This exact combination already exists!');
} else {
  // Proceed with form submission
}
*/
