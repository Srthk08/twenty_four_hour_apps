// FIX CONTACT FORM PRE-FILL "NOT SET" ISSUE
// This JavaScript code will fix the contact form pre-fill logic

// Enhanced pre-fill function that handles "Not set" values
window.fixContactFormPrefill = async function fixContactFormPrefill() {
  try {
    console.log('🔄 Starting enhanced contact form pre-fill...');
    
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
        
        // Pre-fill phone (handle "Not set" values)
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
    
    console.log('✅ Enhanced contact form pre-fill completed');
  } catch (error) {
    console.error('❌ Error in enhanced contact form pre-fill:', error);
  }
};

// Function to clear "Not set" values from form fields
window.clearNotSetValues = function clearNotSetValues() {
  const phoneInput = document.getElementById('phone');
  const companyInput = document.getElementById('company');
  const firstNameInput = document.getElementById('first_name');
  const lastNameInput = document.getElementById('last_name');
  
  if (phoneInput && (phoneInput.value === 'Not set' || phoneInput.value === 'not set')) {
    phoneInput.value = '';
  }
  if (companyInput && (companyInput.value === 'Not set' || companyInput.value === 'not set')) {
    companyInput.value = '';
  }
  if (firstNameInput && (firstNameInput.value === 'Not set' || firstNameInput.value === 'not set')) {
    firstNameInput.value = '';
  }
  if (lastNameInput && (lastNameInput.value === 'Not set' || lastNameInput.value === 'not set')) {
    lastNameInput.value = '';
  }
};

// Function to update user profile data in session storage
window.updateUserProfileData = function updateUserProfileData(profileData) {
  try {
    const sessionData = JSON.parse(sessionStorage.getItem('simple-auth-session') || '{}');
    if (sessionData.user) {
      // Clean the profile data
      const cleanedData = {
        ...profileData,
        phone: profileData.phone === 'Not set' ? '' : profileData.phone,
        company_name: profileData.company_name === 'Not set' ? '' : profileData.company_name,
        full_name: profileData.full_name === 'Not set' ? '' : profileData.full_name
      };
      
      sessionData.user = { ...sessionData.user, ...cleanedData };
      sessionStorage.setItem('simple-auth-session', JSON.stringify(sessionData));
      console.log('✅ Updated user profile data in session storage');
    }
  } catch (error) {
    console.error('❌ Error updating user profile data:', error);
  }
};

// Override the existing prefillForm function
if (window.prefillForm) {
  window.originalPrefillForm = window.prefillForm;
}

window.prefillForm = async function prefillForm() {
  // Clear any "Not set" values first
  window.clearNotSetValues();
  
  // Call the enhanced pre-fill function
  await window.fixContactFormPrefill();
  
  // Call the original function if it exists
  if (window.originalPrefillForm) {
    await window.originalPrefillForm();
  }
};

console.log('✅ Enhanced contact form pre-fill functions loaded');
