// =====================================================
// OMS CUSTOMIZATION FORM - JAVASCRIPT INTEGRATION
// Handles duplicate prevention and file storage
// =====================================================

// Supabase client setup
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// =====================================================
// OMS CUSTOMIZATION FUNCTIONS
// =====================================================

/**
 * Submit OMS customization form with duplicate check
 * @param {Object} formData - Form data object
 * @param {File} logoFile - Logo file (optional)
 * @param {File} menuPhotoFile - Menu photo file (optional)
 * @returns {Promise<Object>} - Result object with success/error
 */
export async function submitOMSCustomization(formData, logoFile = null, menuPhotoFile = null) {
  try {
    console.log('🚀 Submitting OMS customization form...', formData);
    
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
    
    // Step 2: Insert OMS customization using SQL function
    const { data, error } = await supabase.rpc('insert_oms_customization', {
      p_user_email: formData.user_email,
      p_project_name: formData.project_name,
      p_owner_name: formData.owner_name,
      p_restaurant_name: formData.restaurant_name,
      p_restaurant_address: formData.restaurant_address,
      p_phone_number: formData.phone_number,
      p_logo_url: logoUrl,
      p_logo_storage_path: logoStoragePath,
      p_menu_photo_url: menuPhotoUrl,
      p_menu_photo_storage_path: menuPhotoStoragePath
    });
    
    if (error) {
      console.error('❌ Error submitting OMS form:', error);
      return { success: false, error: error.message };
    }
    
    const omsId = data;
    console.log('✅ OMS customization submitted successfully:', omsId);
    
    // Step 3: Insert file metadata (if files were uploaded)
    if (logoFile && omsId) {
      await insertFileMetadata(omsId, 'logo', logoFile, logoUrl, logoStoragePath);
    }
    
    if (menuPhotoFile && omsId) {
      await insertFileMetadata(omsId, 'menu_photo', menuPhotoFile, menuPhotoUrl, menuPhotoStoragePath);
    }
    
    return { success: true, omsId: omsId };
    
  } catch (error) {
    console.error('❌ Error in submitOMSCustomization:', error);
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
      .from('oms-files')
      .upload(filePath, file);
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('oms-files')
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
 * Insert file metadata into database
 * @param {string} omsId - OMS customization ID
 * @param {string} fileType - 'logo' or 'menu_photo'
 * @param {File} file - File object
 * @param {string} publicUrl - Public URL of uploaded file
 * @param {string} storagePath - Storage path of uploaded file
 */
async function insertFileMetadata(omsId, fileType, file, publicUrl, storagePath) {
  try {
    const { data, error } = await supabase.rpc('insert_oms_file', {
      p_oms_customization_id: omsId,
      p_file_type: fileType,
      p_original_filename: file.name,
      p_file_size: file.size,
      p_mime_type: file.type,
      p_storage_path: storagePath,
      p_public_url: publicUrl
    });
    
    if (error) {
      console.error('❌ Error inserting file metadata:', error);
      throw error;
    }
    
    console.log('✅ File metadata inserted:', data);
    
  } catch (error) {
    console.error('❌ Error in insertFileMetadata:', error);
    throw error;
  }
}

/**
 * Get all OMS customizations with file info
 * @returns {Promise<Array>} - Array of OMS customizations
 */
export async function getAllOMSCustomizations() {
  try {
    const { data, error } = await supabase
      .from('oms_customizations')
      .select(`
        *,
        logo_file:oms_file_storage!oms_customization_id(file_type, original_filename, file_size, public_url),
        menu_file:oms_file_storage!oms_customization_id(file_type, original_filename, file_size, public_url)
      `)
      .eq('logo_file.file_type', 'logo')
      .eq('menu_file.file_type', 'menu_photo')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching OMS customizations:', error);
    throw error;
  }
}

/**
 * Get OMS customizations by email (same email, different projects)
 * @param {string} email - User email
 * @returns {Promise<Array>} - Array of OMS customizations for the email
 */
export async function getOMSCustomizationsByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('oms_customizations')
      .select(`
        *,
        logo_file:oms_file_storage!oms_customization_id(file_type, original_filename, file_size, public_url),
        menu_file:oms_file_storage!oms_customization_id(file_type, original_filename, file_size, public_url)
      `)
      .eq('user_email', email)
      .eq('logo_file.file_type', 'logo')
      .eq('menu_file.file_type', 'menu_photo')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching OMS customizations by email:', error);
    throw error;
  }
}

/**
 * Get pending OMS customizations
 * @returns {Promise<Array>} - Array of pending OMS customizations
 */
export async function getPendingOMSCustomizations() {
  try {
    const { data, error } = await supabase
      .from('oms_customizations')
      .select(`
        *,
        logo_file:oms_file_storage!oms_customization_id(file_type, original_filename, file_size, public_url),
        menu_file:oms_file_storage!oms_customization_id(file_type, original_filename, file_size, public_url)
      `)
      .eq('status', 'pending')
      .eq('logo_file.file_type', 'logo')
      .eq('menu_file.file_type', 'menu_photo')
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching pending OMS customizations:', error);
    throw error;
  }
}

/**
 * Update OMS customization status
 * @param {string} omsId - OMS customization ID
 * @param {string} status - New status ('pending', 'processing', 'completed', 'failed')
 * @returns {Promise<boolean>} - Success status
 */
export async function updateOMSStatus(omsId, status) {
  try {
    const { error } = await supabase
      .from('oms_customizations')
      .update({ 
        status: status,
        updated_at: new Date().toISOString(),
        processed_at: status === 'completed' ? new Date().toISOString() : null
      })
      .eq('id', omsId);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ OMS status updated:', omsId, status);
    return true;
    
  } catch (error) {
    console.error('❌ Error updating OMS status:', error);
    throw error;
  }
}

/**
 * Check for duplicate OMS customization
 * @param {string} email - User email
 * @param {string} projectName - Project name
 * @param {string} restaurantName - Restaurant name
 * @returns {Promise<boolean>} - True if duplicate exists
 */
export async function checkOMSDuplicate(email, projectName, restaurantName) {
  try {
    const { data, error } = await supabase.rpc('check_oms_duplicate', {
      p_user_email: email,
      p_project_name: projectName,
      p_restaurant_name: restaurantName
    });
    
    if (error) {
      throw error;
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error checking OMS duplicate:', error);
    throw error;
  }
}

// =====================================================
// EXAMPLE USAGE
// =====================================================

// Example: Submit OMS form with files
/*
const formData = {
  user_email: 'john@restaurant.com',
  project_name: 'Pizza Palace Downtown',
  owner_name: 'John Smith',
  restaurant_name: 'Pizza Palace',
  restaurant_address: '123 Main St, New York, NY',
  phone_number: '+1-555-123-4567'
};

const logoFile = document.getElementById('logo-input').files[0];
const menuPhotoFile = document.getElementById('menu-photo-input').files[0];

const result = await submitOMSCustomization(formData, logoFile, menuPhotoFile);
if (result.success) {
  console.log('Form submitted successfully:', result.omsId);
} else {
  console.error('Form submission failed:', result.error);
}
*/

// Example: Get all OMS customizations
/*
const omsData = await getAllOMSCustomizations();
console.log('All OMS customizations:', omsData);
*/

// Example: Get OMS customizations by email
/*
const userOMSCustomizations = await getOMSCustomizationsByEmail('john@restaurant.com');
console.log('User OMS customizations:', userOMSCustomizations);
*/

// Example: Check for duplicate before submitting
/*
const isDuplicate = await checkOMSDuplicate(
  'john@restaurant.com',
  'Pizza Palace Downtown',
  'Pizza Palace'
);

if (isDuplicate) {
  alert('This exact combination already exists!');
} else {
  // Proceed with form submission
}
*/
