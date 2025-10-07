// UPDATE CONTACT FORM PRE-FILL LOGIC
// This JavaScript code should be added to the contact form to improve pre-filling

// Enhanced pre-fill function for contact form
window.enhancedPrefillForm = async function enhancedPrefillForm() {
  try {
    console.log('🔄 Starting enhanced form pre-fill process...');
    
    // Wait for auth manager if not available
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
    
    // Clear form first
    console.log('🧹 Clearing form first...');
    window.clearForm();
    
    const isLoggedIn = authManager && authManager.isUserLoggedIn();
    
    if (isLoggedIn) {
      console.log('👤 User is logged in, pre-filling form...');
      
      // Get current user data
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
        if (currentUser.full_name) {
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
        
        // Pre-fill phone
        if (phoneInput && currentUser.phone) {
          // Remove +91 prefix if present for display
          let phoneValue = currentUser.phone;
          if (phoneValue.startsWith('+91')) {
            phoneValue = phoneValue.substring(3);
          }
          phoneInput.value = phoneValue;
          phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
          phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ Pre-filled phone:', phoneValue);
        }
        
        // Pre-fill company
        if (companyInput && currentUser.company_name) {
          companyInput.value = currentUser.company_name;
          companyInput.dispatchEvent(new Event('input', { bubbles: true }));
          companyInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ Pre-filled company:', currentUser.company_name);
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
              
              // Update phone if not already filled or if profile has better data
              if (phoneInput && profile.phone && (!currentUser.phone || currentUser.phone === '')) {
                let phoneValue = profile.phone;
                if (phoneValue.startsWith('+91')) {
                  phoneValue = phoneValue.substring(3);
                }
                phoneInput.value = phoneValue;
                phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
                phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('✅ Updated phone from profile:', phoneValue);
              }
              
              // Update company if not already filled or if profile has better data
              if (companyInput && profile.company_name && (!currentUser.company_name || currentUser.company_name === '')) {
                companyInput.value = profile.company_name;
                companyInput.dispatchEvent(new Event('input', { bubbles: true }));
                companyInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('✅ Updated company from profile:', profile.company_name);
              }
              
              // Update name if not already filled or if profile has better data
              if (profile.full_name && (!currentUser.full_name || currentUser.full_name === '')) {
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
    
    console.log('✅ Enhanced form pre-fill completed');
  } catch (error) {
    console.error('❌ Error in enhanced form pre-fill:', error);
  }
};

// Function to update user profile data in session storage
window.updateUserProfileData = function updateUserProfileData(profileData) {
  try {
    const sessionData = JSON.parse(sessionStorage.getItem('simple-auth-session') || '{}');
    if (sessionData.user) {
      sessionData.user = { ...sessionData.user, ...profileData };
      sessionStorage.setItem('simple-auth-session', JSON.stringify(sessionData));
      console.log('✅ Updated user profile data in session storage');
    }
  } catch (error) {
    console.error('❌ Error updating user profile data:', error);
  }
};

// Function to refresh user data from Supabase
window.refreshUserData = async function refreshUserData() {
  try {
    if (window.supabase) {
      const { data: { user } } = await window.supabase.auth.getUser();
      if (user) {
        const { data: profile } = await window.supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          window.updateUserProfileData(profile);
          return profile;
        }
      }
    }
  } catch (error) {
    console.error('❌ Error refreshing user data:', error);
  }
  return null;
};

console.log('✅ Enhanced contact form pre-fill functions loaded');
