// COMPLETE CONTACT FORM FIX
// This single JavaScript file fixes all contact form issues

// Enhanced pre-fill function that handles all issues
window.fixContactForm = async function fixContactForm() {
  try {
    console.log('🔄 Starting complete contact form fix...');
    
    // Wait for auth manager
    let authManager = window.globalAuthManager || window.simpleAuthManager;
    if (!authManager) {
      console.log('⏳ Auth manager not available, waiting...');
      let attempts = 0;
      while (!authManager && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        authManager = window.globalAuthManager || window.simpleAuthManager;
        attempts++;
      }
    }
    
    const isLoggedIn = authManager && authManager.isUserLoggedIn();
    
    if (isLoggedIn) {
      console.log('👤 User is logged in, pre-filling form...');
      
      const currentUser = authManager.getCurrentUser();
      console.log('👤 Current user data:', currentUser);
      
      if (currentUser && currentUser.email) {
        // Get form elements
        const firstNameInput = document.getElementById('first_name');
        const lastNameInput = document.getElementById('last_name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const companyInput = document.getElementById('company');
        
        // Enable fields
        [firstNameInput, lastNameInput, emailInput, phoneInput, companyInput].forEach((el) => {
          if (el) el.disabled = false;
        });
        
        // Pre-fill email
        if (emailInput && currentUser.email) {
          emailInput.value = currentUser.email;
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
          emailInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ Pre-filled email:', currentUser.email);
        }
        
        // Pre-fill name
        if (currentUser.full_name && currentUser.full_name !== 'Not set') {
          const names = currentUser.full_name.split(' ');
          if (firstNameInput) {
            firstNameInput.value = names[0] || '';
            firstNameInput.dispatchEvent(new Event('input', { bubbles: true }));
            firstNameInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ Pre-filled first name:', names[0]);
          }
          if (lastNameInput && names.length > 1) {
            lastNameInput.value = names.slice(1).join(' ');
            lastNameInput.dispatchEvent(new Event('input', { bubbles: true }));
            lastNameInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ Pre-filled last name:', names.slice(1).join(' '));
          }
        }
        
        // Pre-fill phone (handle "Not set" values and format)
        if (phoneInput) {
          let phoneValue = currentUser.phone || '';
          if (phoneValue === 'Not set' || phoneValue === 'not set') {
            phoneValue = '';
          }
          // Remove +91 prefix for display
          if (phoneValue.startsWith('+91')) {
            phoneValue = phoneValue.substring(3);
          }
          phoneInput.value = phoneValue;
          phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
          phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ Pre-filled phone:', phoneValue);
        }
        
        // Pre-fill company (handle "Not set" values)
        if (companyInput) {
          let companyValue = currentUser.company_name || '';
          if (companyValue === 'Not set' || companyValue === 'not set') {
            companyValue = '';
          }
          companyInput.value = companyValue;
          companyInput.dispatchEvent(new Event('input', { bubbles: true }));
          companyInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ Pre-filled company:', companyValue);
        }
        
        // Try to get additional data from Supabase profiles table
        if (window.supabase) {
          try {
            console.log('🔍 Fetching additional profile data from Supabase...');
            const { data: profile, error } = await window.supabase
              .from('profiles')
              .select('*')
              .eq('id', currentUser.id)
              .single();
            
            if (profile && !error) {
              console.log('📋 Profile data from Supabase:', profile);
              
              // Update phone if profile has better data
              if (phoneInput && profile.phone && profile.phone !== 'Not set') {
                let phoneValue = profile.phone;
                if (phoneValue.startsWith('+91')) {
                  phoneValue = phoneValue.substring(3);
                }
                phoneInput.value = phoneValue;
                phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
                phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('✅ Updated phone from profile:', phoneValue);
              }
              
              // Update company if profile has better data
              if (companyInput && profile.company_name && profile.company_name !== 'Not set') {
                companyInput.value = profile.company_name;
                companyInput.dispatchEvent(new Event('input', { bubbles: true }));
                companyInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('✅ Updated company from profile:', profile.company_name);
              }
              
              // Update name if profile has better data
              if (profile.full_name && profile.full_name !== 'Not set') {
                const names = profile.full_name.split(' ');
                if (firstNameInput && names[0]) {
                  firstNameInput.value = names[0];
                  firstNameInput.dispatchEvent(new Event('input', { bubbles: true }));
                  firstNameInput.dispatchEvent(new Event('change', { bubbles: true }));
                  console.log('✅ Updated first name from profile:', names[0]);
                }
                if (lastNameInput && names.length > 1) {
                  lastNameInput.value = names.slice(1).join(' ');
                  lastNameInput.dispatchEvent(new Event('input', { bubbles: true }));
                  lastNameInput.dispatchEvent(new Event('change', { bubbles: true }));
                  console.log('✅ Updated last name from profile:', names.slice(1).join(' '));
                }
              }
            } else {
              console.log('⚠️ No profile data found in Supabase:', error);
            }
          } catch (profileError) {
            console.log('⚠️ Error fetching profile data:', profileError);
          }
        }
      }
    } else {
      console.log('👤 User not logged in, clearing form...');
      // Clear and disable personal fields for non-logged-in users
      const firstNameInput = document.getElementById('first_name');
      const lastNameInput = document.getElementById('last_name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const companyInput = document.getElementById('company');
      
      [firstNameInput, lastNameInput, emailInput, phoneInput, companyInput].forEach((el) => {
        if (el) {
          el.value = '';
          el.disabled = true;
        }
      });
    }
    
    console.log('✅ Complete contact form fix completed');
  } catch (error) {
    console.error('❌ Error in complete contact form fix:', error);
  }
};

// Enhanced form submission function
window.submitContactForm = async function submitContactForm(formData) {
  try {
    console.log('📝 Submitting contact form...');
    
    // Prepare data for submission
    const contactData = {
      first_name: formData.first_name || '',
      last_name: formData.last_name || '',
      email: formData.email || '',
      phone: formData.phone || null,
      company_name: formData.company || null,
      project_type: formData.project_type || 'general',
      project_details: formData.message || '',
      message: formData.message || '',
      user_id: formData.user_id || null
    };
    
    console.log('📝 Contact data prepared:', contactData);
    
    // Submit to Supabase
    const { data: savedMessage, error } = await window.supabase
      .from('contact_submissions')
      .insert([contactData])
      .select();
    
    if (error) {
      console.error('❌ Error saving contact message:', error);
      throw new Error('Failed to save your message: ' + error.message);
    }
    
    console.log('✅ Contact form submitted successfully:', savedMessage);
    return { success: true, data: savedMessage };
    
  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    return { success: false, error: error.message };
  }
};

// Override existing functions
if (window.prefillForm) {
  window.originalPrefillForm = window.prefillForm;
}

window.prefillForm = async function prefillForm() {
  await window.fixContactForm();
  if (window.originalPrefillForm) {
    await window.originalPrefillForm();
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Contact form fix initialized');
  // Run the fix after a short delay to ensure all elements are loaded
  setTimeout(() => {
    window.fixContactForm();
  }, 500);
});

console.log('✅ Complete contact form fix loaded');
