// =====================================================
// FIXED SUPABASE STORAGE - SIMPLIFIED VERSION
// =====================================================
// This version removes complex constraints and uses simple INSERT
// =====================================================

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://lmrrdcaavwwletcjcpqv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * SIMPLIFIED: Save customization form data to Supabase
 * This version uses simple INSERT without complex constraints
 */
export async function saveCustomizationForm(formData, productType) {
  try {
    console.log('💾 [FIXED] Saving customization form to Supabase...', { formData, productType });

    // Map product type
    const PRODUCT_TYPE_MAP = {
      'restaurant-website': 'restaurant-website',
      'streaming-mobile-app': 'streaming-mobile-app', 
      'android-tv-app': 'android-tv-app',
      'restaurant-menu-system': 'restaurant-menu-system',
      'order-menu-system': 'restaurant-menu-system'
    };
    
    const dbProductType = PRODUCT_TYPE_MAP[productType] || productType;

    // Prepare data for database - SIMPLIFIED VERSION
    const dbData = {
      // Required fields
      product_type: dbProductType,
      product_name: formData.productName || formData.product_name || 'Unknown Product',
      product_price: formData.productPrice || formData.product_price || '₹0',
      project_name: formData.projectName || formData.project_name || '',
      contact_person: formData.contactPerson || formData.contact_person || '',
      app_name: formData.appName || formData.app_name || '',
      contact_email: formData.email || formData.contact_email || formData.contactEmail || '',
      contact_phone: formData.phone || formData.contact_phone || formData.contactPhone || '',
      
      // Optional fields
      product_description: formData.productDescription || formData.product_description || '',
      restaurant_name: formData.restaurantName || formData.restaurant_name || null,
      cuisine_type: formData.cuisineType || formData.cuisine_type || null,
      logo_url: formData.logoUrl || formData.logo_url || null,
      logo_filename: formData.logoFilename || formData.logo_filename || null,
      logo_mime_type: formData.logoMimeType || formData.logo_mime_type || null,
      logo_size: formData.logoSize || formData.logo_size || null,
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

    console.log('🧩 [FIXED] Prepared data for insert:', dbData);

    // SIMPLE INSERT - no complex constraints
    const { data, error } = await supabase
      .from('customization_forms')
      .insert(dbData)
      .select()
      .single();

    if (error) {
      console.error('❌ [FIXED] Error inserting customization form:', error);
      console.error('❌ [FIXED] Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return { success: false, error: error.message, data: null };
    }

    console.log('✅ [FIXED] Customization form inserted successfully:', data);
    return { success: true, error: null, data: data };

  } catch (error) {
    console.error('❌ [FIXED] Unexpected error saving customization form:', error);
    return { success: false, error: error.message, data: null };
  }
}

/**
 * SIMPLIFIED: Get all customizations (for testing)
 */
export async function getAllCustomizations() {
  try {
    console.log('📊 [FIXED] Getting all customizations...');

    const { data, error } = await supabase
      .from('customization_forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ [FIXED] Error fetching customizations:', error);
      return { success: false, error: error.message, data: [] };
    }

    console.log('✅ [FIXED] Customizations fetched successfully:', data);
    return { success: true, error: null, data: data };

  } catch (error) {
    console.error('❌ [FIXED] Unexpected error fetching customizations:', error);
    return { success: false, error: error.message, data: [] };
  }
}

/**
 * SIMPLIFIED: Test database connection
 */
export async function testDatabaseConnection() {
  try {
    console.log('🔌 [FIXED] Testing database connection...');

    const { data, error } = await supabase
      .from('customization_forms')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ [FIXED] Database connection failed:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ [FIXED] Database connection successful!');
    return { success: true, error: null };

  } catch (error) {
    console.error('❌ [FIXED] Database connection exception:', error);
    return { success: false, error: error.message };
  }
}

export default {
  saveCustomizationForm,
  getAllCustomizations,
  testDatabaseConnection
};
