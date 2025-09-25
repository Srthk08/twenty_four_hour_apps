// OMS Integration Script
// Add this to your dashboard.astro file to integrate OMS functionality

// Import the OMS handler
import './src/lib/oms-customization-handler.js';

// Additional OMS-specific functions for the dashboard

// Function to initialize OMS form with user data
function initializeOMSForm() {
  console.log('🔄 Initializing OMS form with user data...');
  
  // Wait for auth manager to be available
  const waitForAuthManager = () => {
    const authManager = window.globalAuthManager || window.simpleAuthManager;
    if (authManager && authManager.isUserLoggedIn()) {
      const currentUser = authManager.getCurrentUser();
      console.log('👤 Current user for OMS form:', currentUser);
      
      if (currentUser && currentUser.email) {
        // Auto-fill OMS form fields
        const omsForm = document.getElementById('order-menu-customization-form');
        if (omsForm) {
          // Fill contact person
          const contactPersonField = omsForm.querySelector('input[name="contactPerson"]');
          if (contactPersonField && currentUser.full_name) {
            contactPersonField.value = currentUser.full_name;
          }
          
          // Fill email
          const emailField = omsForm.querySelector('input[name="email"]');
          if (emailField) {
            emailField.value = currentUser.email;
          }
          
          // Fill phone
          const phoneField = omsForm.querySelector('input[name="phone"]');
          if (phoneField && currentUser.phone) {
            phoneField.value = currentUser.phone;
          }
          
          // Fill owner name
          const ownerNameField = omsForm.querySelector('input[name="ownerName"]');
          if (ownerNameField && currentUser.full_name) {
            ownerNameField.value = currentUser.full_name;
          }
          
          // Fill restaurant name with company name if available
          const restaurantNameField = omsForm.querySelector('input[name="restaurantName"]');
          if (restaurantNameField && currentUser.company_name) {
            restaurantNameField.value = currentUser.company_name;
          }
          
          console.log('✅ OMS form initialized with user data');
        }
      }
      return true;
    }
    return false;
  };
  
  // Try immediate initialization
  if (!waitForAuthManager()) {
    // If not ready, wait for it
    let attempts = 0;
    const maxAttempts = 50;
    const interval = setInterval(() => {
      attempts++;
      if (waitForAuthManager() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);
  }
}

// Function to handle OMS form visibility
function handleOMSFormVisibility() {
  const omsForm = document.getElementById('order-menu-customization-form');
  if (omsForm) {
    // Initialize form when it becomes visible
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (!omsForm.classList.contains('hidden')) {
            console.log('👁️ OMS form became visible, initializing...');
            setTimeout(() => {
              initializeOMSForm();
              if (window.omsHandler) {
                window.omsHandler.init();
              }
            }, 100);
          }
        }
      });
    });
    
    observer.observe(omsForm, { attributes: true, attributeFilter: ['class'] });
  }
}

// Initialize OMS functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 Initializing OMS functionality...');
  
  // Initialize OMS form
  initializeOMSForm();
  
  // Handle form visibility
  handleOMSFormVisibility();
  
  // Initialize OMS handler if available
  if (window.omsHandler) {
    window.omsHandler.init();
  }
});

// Export functions for global access
window.initializeOMSForm = initializeOMSForm;
window.handleOMSFormVisibility = handleOMSFormVisibility;
