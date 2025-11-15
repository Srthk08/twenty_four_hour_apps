// =====================================================
// SUPABASE DATA INSERTION SCRIPT
// Directly inserts demo data into Supabase
// =====================================================

import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Demo OMS Customization Data
const demoOMSCustomizations = [
  {
    user_email: 'maria@bellavista.com',
    project_name: 'Bella Vista Restaurant',
    owner_name: 'Maria Rodriguez',
    restaurant_name: 'Bella Vista',
    restaurant_address: '123 Main Street, New York, NY',
    phone_number: '+1 (555) 123-4567',
    logo_url: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=BV',
    menu_photo_url: 'https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=Bella+Vista+Menu',
    status: 'pending'
  },
  {
    user_email: 'david@goldendragon.com',
    project_name: 'Golden Dragon Chinese',
    owner_name: 'David Chen',
    restaurant_name: 'Golden Dragon',
    restaurant_address: '456 Oak Avenue, Los Angeles, CA',
    phone_number: '+1 (555) 987-6543',
    logo_url: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=GD',
    menu_photo_url: 'https://via.placeholder.com/200x200/DC2626/FFFFFF?text=Golden+Dragon+Menu',
    status: 'completed'
  },
  {
    user_email: 'sophie@cafedelsol.com',
    project_name: 'Café Del Sol',
    owner_name: 'Sophie Martin',
    restaurant_name: 'Café Del Sol',
    restaurant_address: '789 Pine Street, Miami, FL',
    phone_number: '+1 (555) 456-7890',
    logo_url: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=CD',
    menu_photo_url: 'https://via.placeholder.com/200x200/059669/FFFFFF?text=Cafe+Del+Sol+Menu',
    status: 'pending'
  },
  {
    user_email: 'tony@pizzapalace.com',
    project_name: 'Pizza Palace',
    owner_name: 'Tony Romano',
    restaurant_name: 'Pizza Palace',
    restaurant_address: '321 Elm Street, Chicago, IL',
    phone_number: '+1 (555) 321-9876',
    logo_url: 'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=PP',
    menu_photo_url: 'https://via.placeholder.com/200x200/7C3AED/FFFFFF?text=Pizza+Palace+Menu',
    status: 'completed'
  },
  {
    user_email: 'yuki@sushimaster.com',
    project_name: 'Sushi Master',
    owner_name: 'Yuki Tanaka',
    restaurant_name: 'Sushi Master',
    restaurant_address: '654 Maple Drive, Seattle, WA',
    phone_number: '+1 (555) 654-3210',
    logo_url: 'https://via.placeholder.com/100x100/EA580C/FFFFFF?text=SM',
    menu_photo_url: 'https://via.placeholder.com/200x200/EA580C/FFFFFF?text=Sushi+Master+Menu',
    status: 'pending'
  }
];

// Demo Menu Photos Data
const demoMenuPhotos = [
  {
    original_filename: 'bella-vista-menu.jpg',
    photo_url: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=BV',
    conversion_status: 'completed',
    file_size: 2400000,
    restaurant_name: 'Bella Vista'
  },
  {
    original_filename: 'golden-dragon-menu.jpg',
    photo_url: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=GD',
    conversion_status: 'processing',
    file_size: 1800000,
    restaurant_name: 'Golden Dragon'
  },
  {
    original_filename: 'cafe-del-sol-menu.jpg',
    photo_url: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=CD',
    conversion_status: 'completed',
    file_size: 3100000,
    restaurant_name: 'Café Del Sol'
  },
  {
    original_filename: 'pizza-palace-menu.jpg',
    photo_url: 'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=PP',
    conversion_status: 'pending',
    file_size: 2700000,
    restaurant_name: 'Pizza Palace'
  },
  {
    original_filename: 'sushi-master-menu.jpg',
    photo_url: 'https://via.placeholder.com/100x100/EA580C/FFFFFF?text=SM',
    conversion_status: 'completed',
    file_size: 2200000,
    restaurant_name: 'Sushi Master'
  },
  {
    original_filename: 'thai-garden-menu.jpg',
    photo_url: 'https://via.placeholder.com/100x100/0891B2/FFFFFF?text=TG',
    conversion_status: 'pending',
    file_size: 1900000,
    restaurant_name: 'Thai Garden'
  }
];

// Function to insert OMS customizations
async function insertOMSCustomizations() {
  console.log('🚀 Inserting OMS customizations...');
  
  for (const oms of demoOMSCustomizations) {
    try {
      const { data, error } = await supabase
        .from('oms_customizations')
        .insert(oms);
      
      if (error) {
        console.error('❌ Error inserting OMS:', oms.project_name, error);
      } else {
        console.log('✅ Inserted OMS:', oms.project_name);
      }
    } catch (err) {
      console.error('❌ Exception inserting OMS:', oms.project_name, err);
    }
  }
}

// Function to insert menu photos
async function insertMenuPhotos() {
  console.log('📸 Inserting menu photos...');
  
  for (const photo of demoMenuPhotos) {
    try {
      const { data, error } = await supabase
        .from('menu_photos')
        .insert(photo);
      
      if (error) {
        console.error('❌ Error inserting photo:', photo.original_filename, error);
      } else {
        console.log('✅ Inserted photo:', photo.original_filename);
      }
    } catch (err) {
      console.error('❌ Exception inserting photo:', photo.original_filename, err);
    }
  }
}

// Function to clear existing data first
async function clearExistingData() {
  console.log('🧹 Clearing existing data...');
  
  try {
    // Clear OMS customizations
    const { error: omsError } = await supabase
      .from('oms_customizations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (omsError) {
      console.error('❌ Error clearing OMS data:', omsError);
    } else {
      console.log('✅ Cleared OMS data');
    }
    
    // Clear menu photos
    const { error: photosError } = await supabase
      .from('menu_photos')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (photosError) {
      console.error('❌ Error clearing photos data:', photosError);
    } else {
      console.log('✅ Cleared photos data');
    }
    
  } catch (err) {
    console.error('❌ Exception clearing data:', err);
  }
}

// Main function to run everything
async function setupDemoData() {
  console.log('🎭 Setting up demo data in Supabase...');
  
  try {
    // Step 1: Clear existing data
    await clearExistingData();
    
    // Step 2: Insert OMS customizations
    await insertOMSCustomizations();
    
    // Step 3: Insert menu photos
    await insertMenuPhotos();
    
    console.log('✅ Demo data setup complete!');
    
    // Step 4: Verify data was inserted
    const { data: omsData } = await supabase
      .from('oms_customizations')
      .select('*');
    
    const { data: photosData } = await supabase
      .from('menu_photos')
      .select('*');
    
    console.log('📊 Verification:');
    console.log('- OMS customizations:', omsData?.length || 0);
    console.log('- Menu photos:', photosData?.length || 0);
    
  } catch (error) {
    console.error('❌ Error setting up demo data:', error);
  }
}

// Export functions for use
export { setupDemoData, insertOMSCustomizations, insertMenuPhotos };

// If running directly, execute setup
if (typeof window !== 'undefined') {
  // Run in browser
  window.setupDemoData = setupDemoData;
  console.log('🎭 Demo data setup function available as window.setupDemoData()');
  console.log('💡 Run: setupDemoData() in browser console to insert demo data');
}
