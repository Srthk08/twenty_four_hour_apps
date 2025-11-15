// =====================================================
// CUSTOMIZATION FORMS DATABASE HELPER
// =====================================================
// This file provides helper functions to interact with
// the customization_forms table in Supabase
// =====================================================

import { createClient } from '@supabase/supabase-js';

// Supabase configuration - using the same config as the main supabase.ts file
const SUPABASE_URL = 'https://lmrrdcaavwwletcjcpqv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Map product types to database values
 */
const PRODUCT_TYPE_MAP = {
  'restaurant-website': 'restaurant-website',
  'streaming-mobile-app': 'streaming-mobile-app', 
  'android-tv-app': 'android-tv-app',
  'restaurant-menu-system': 'restaurant-menu-system',
  'order-menu-system': 'restaurant-menu-system' // Alias for order menu system
};

/**
 * Save customization form data to Supabase
 * @param {Object} formData - The form data object
 * @param {string} productType - The type of product
 * @returns {Promise<Object>} - Result object with success status and data
 */
export async function saveCustomizationForm(formData, productType) {
  try {
    console.log('💾 Saving customization form to Supabase...', { formData, productType });

    // Check if this is OMS (Order Menu System) - use separate table
    if (productType === 'order-menu-system') {
      return await saveOMSCustomization(formData);
    }

    // For other 4 products, use the original customization_forms table
    const dbProductType = PRODUCT_TYPE_MAP[productType] || productType;

    // Prepare data for database
    const dbData = {
      product_type: dbProductType,
      // Ensure product name/price are captured
      product_name: formData.productName || formData.product_name || 'Unknown Product',
      product_price: formData.productPrice || formData.product_price || '₹0',
      project_name: formData.projectName || formData.project_name || '',
      contact_person: formData.contactPerson || formData.contact_person || '',
      app_name: formData.appName || formData.app_name || '',
      product_description: formData.productDescription || formData.product_description || '',
      restaurant_name: formData.restaurantName || formData.restaurant_name || null,
      cuisine_type: formData.cuisineType || formData.cuisine_type || null,
      logo_url: formData.logoUrl || formData.logo_url || null,
      logo_filename: formData.logoFilename || formData.logo_filename || null,
      logo_mime_type: formData.logoMimeType || formData.logo_mime_type || null,
      logo_size: formData.logoSize || formData.logo_size || null,
      contact_email: formData.email || formData.contact_email || formData.contactEmail || '',
      contact_phone: formData.phone || formData.contact_phone || formData.contactPhone || '',
      primary_color: formData.primaryColor || formData.primary_color || '#3B82F6',
      secondary_color: formData.secondaryColor || formData.secondary_color || '#10B981',
      accent_color: formData.accentColor || formData.accent_color || '#F59E0B',
      text_color: formData.textColor || formData.text_color || '#1F2937',
      additional_requirements: formData.additionalRequirements || formData.additional_requirements || '',
      menu_items: formData.menuItems || formData.menu_items || [],
      restaurant_address: formData.restaurantAddress || formData.restaurant_address || null,
      owner_name: formData.ownerName || formData.owner_name || null,
      status: 'pending'
    };

    // SIMPLE INSERT for other 4 products - same as working debug page
    console.log('🧩 Inserting customization form for other products...');
    const { data, error } = await supabase
      .from('customization_forms')
      .insert(dbData)
      .select()
      .single();

    if (error) {
      console.error('❌ Error inserting customization form:', error);
      console.error('❌ Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return { success: false, error: error.message, data: null };
    }

    console.log('✅ Customization form inserted successfully:', data);
    return { success: true, error: null, data: data };

  } catch (error) {
    console.error('❌ Unexpected error saving customization form:', error);
    return { success: false, error: error.message, data: null };
  }
}

/**
 * Get customization forms by email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} - Result object with forms data
 */
export async function getCustomizationsByEmail(email) {
  try {
    console.log('📧 Getting customizations for email:', email);

    const { data, error } = await supabase
      .from('customization_forms')
      .select('*')
      .eq('contact_email', email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching customizations:', error);
      return { success: false, error: error.message, data: [] };
    }

    console.log('✅ Customizations fetched successfully:', data);
    return { success: true, error: null, data: data };

  } catch (error) {
    console.error('❌ Unexpected error fetching customizations:', error);
    return { success: false, error: error.message, data: [] };
  }
}

/**
 * Get customization form by ID
 * @param {string} id - Form ID
 * @returns {Promise<Object>} - Result object with form data
 */
export async function getCustomizationById(id) {
  try {
    console.log('🔍 Getting customization by ID:', id);

    const { data, error } = await supabase
      .from('customization_forms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ Error fetching customization:', error);
      return { success: false, error: error.message, data: null };
    }

    console.log('✅ Customization fetched successfully:', data);
    return { success: true, error: null, data: data };

  } catch (error) {
    console.error('❌ Unexpected error fetching customization:', error);
    return { success: false, error: error.message, data: null };
  }
}

/**
 * Update customization form status
 * @param {string} id - Form ID
 * @param {string} status - New status
 * @param {string} adminNotes - Optional admin notes
 * @returns {Promise<Object>} - Result object
 */
export async function updateCustomizationStatus(id, status, adminNotes = null) {
  try {
    console.log('📝 Updating customization status:', { id, status, adminNotes });

    const updateData = { status };
    if (adminNotes) {
      updateData.admin_notes = adminNotes;
    }

    const { data, error } = await supabase
      .from('customization_forms')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Error updating status:', error);
      return { success: false, error: error.message, data: null };
    }

    console.log('✅ Status updated successfully:', data);
    return { success: true, error: null, data: data };

  } catch (error) {
    console.error('❌ Unexpected error updating status:', error);
    return { success: false, error: error.message, data: null };
  }
}

/**
 * Delete customization form
 * @param {string} id - Form ID
 * @returns {Promise<Object>} - Result object
 */
export async function deleteCustomization(id) {
  try {
    console.log('🗑️ Deleting customization:', id);

    const { error } = await supabase
      .from('customization_forms')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Error deleting customization:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Customization deleted successfully');
    return { success: true, error: null };

  } catch (error) {
    console.error('❌ Unexpected error deleting customization:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Check if duplicate exists
 * @param {string} email - User's email
 * @param {string} productType - Product type
 * @returns {Promise<Object>} - Result object with duplicate status
 */
export async function checkDuplicate(email, productType) {
  try {
    console.log('🔍 Checking for duplicate:', { email, productType });

    const dbProductType = PRODUCT_TYPE_MAP[productType] || productType;

    const { data, error } = await supabase
      .from('customization_forms')
      .select('id, created_at')
      .eq('contact_email', email)
      .eq('product_type', dbProductType)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('❌ Error checking duplicate:', error);
      return { success: false, error: error.message, isDuplicate: false };
    }

    const isDuplicate = !!data;
    console.log('✅ Duplicate check completed:', { isDuplicate, data });
    return { success: true, error: null, isDuplicate: isDuplicate, data: data };

  } catch (error) {
    console.error('❌ Unexpected error checking duplicate:', error);
    return { success: false, error: error.message, isDuplicate: false };
  }
}

/**
 * Get all customizations (admin function)
 * @param {Object} filters - Optional filters
 * @returns {Promise<Object>} - Result object with all customizations
 */
export async function getAllCustomizations(filters = {}) {
  try {
    console.log('📊 Getting all customizations with filters:', filters);

    let query = supabase
      .from('customization_forms')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.product_type) {
      query = query.eq('product_type', filters.product_type);
    }
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Error fetching all customizations:', error);
      return { success: false, error: error.message, data: [] };
    }

    console.log('✅ All customizations fetched successfully:', data);
    return { success: true, error: null, data: data };

  } catch (error) {
    console.error('❌ Unexpected error fetching all customizations:', error);
    return { success: false, error: error.message, data: [] };
  }
}

// =====================================================
// USAGE EXAMPLES
// =====================================================

/*
// Example 1: Save a restaurant website customization
const restaurantData = {
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

const result = await saveCustomizationForm(restaurantData, 'restaurant-website');
console.log('Save result:', result);

// Example 2: Get user's customizations
const userCustomizations = await getCustomizationsByEmail('john@example.com');
console.log('User customizations:', userCustomizations);

// Example 3: Check for duplicates
const duplicateCheck = await checkDuplicate('john@example.com', 'restaurant-website');
console.log('Is duplicate:', duplicateCheck.isDuplicate);
*/

export default {
  saveCustomizationForm,
  saveOMSCustomization,
  getCustomizationsByEmail,
  getCustomizationById,
  updateCustomizationStatus,
  deleteCustomization,
  checkDuplicate,
  getAllCustomizations
};

/**
 * Save OMS (Order Menu System) customization form data to Supabase
 * This uses a separate table from the other 4 products
 * @param {Object} formData - The form data object
 * @returns {Promise<Object>} - Result object with success status and data
 */
export async function saveOMSCustomization(formData) {
  try {
    console.log('💾 Saving OMS customization form to Supabase...', { formData });

    // Call the upsert_oms_customization function
    const { data, error } = await supabase.rpc('upsert_oms_customization', {
      p_user_email: formData.email || formData.contact_email || formData.contactEmail || '',
      p_project_name: formData.projectName || formData.project_name || '',
      p_restaurant_name: formData.restaurantName || formData.restaurant_name || 'Default Restaurant',
      p_owner_name: formData.ownerName || formData.owner_name || formData.contactPerson || formData.contact_person || '',
      p_restaurant_address: formData.restaurantAddress || formData.restaurant_address || 'Not provided',
      p_contact_person: formData.contactPerson || formData.contact_person || '',
      p_phone_number: formData.phone || formData.contact_phone || formData.contactPhone || '',
      p_user_id: null, // Will be set to null for now
      p_logo_url: formData.logoUrl || formData.logo_url || null,
      p_logo_filename: formData.logoFilename || formData.logo_filename || null,
      p_logo_size: formData.logoSize || formData.logo_size || null,
      p_menu_categories: formData.menuCategories || formData.menu_categories || [],
      p_menu_items: formData.menuItems || formData.menu_items || [],
      p_primary_color: formData.primaryColor || formData.primary_color || '#3B82F6',
      p_secondary_color: formData.secondaryColor || formData.secondary_color || '#10B981',
      p_accent_color: formData.accentColor || formData.accent_color || '#F59E0B',
      p_text_color: formData.textColor || formData.text_color || '#1F2937',
      p_additional_requirements: formData.additionalRequirements || formData.additional_requirements || ''
    });

    if (error) {
      console.error('❌ Error inserting OMS customization:', error);
      console.error('❌ Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return { success: false, error: error.message, data: null };
    }

    // Handle the new function response format
    if (data && data.length > 0) {
      const result = data[0];
      console.log('✅ OMS customization result:', result);
      
      if (result.is_duplicate) {
        console.log('⚠️ Duplicate data detected:', result.message);
        return { 
          success: true, 
          error: null, 
          data: { id: result.data_id },
          isUpdate: false,
          isDuplicate: true,
          message: result.message
        };
      } else {
        console.log('✅ OMS customization saved successfully, ID:', result.data_id);
        return { 
          success: true, 
          error: null, 
          data: { id: result.data_id },
          isUpdate: false,
          isDuplicate: false,
          message: result.message
        };
      }
    } else {
      console.error('❌ No data returned from OMS function');
      return { success: false, error: 'No data returned from OMS function', data: null };
    }

  } catch (error) {
    console.error('❌ Unexpected error saving OMS customization form:', error);
    return { success: false, error: error.message, data: null };
  }
}
