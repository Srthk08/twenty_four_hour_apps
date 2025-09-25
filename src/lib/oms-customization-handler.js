// Order Menu System (OMS) Customization Handler
// Handles form submission and data storage for OMS customization

import { supabase } from './supabase.js';

export class OMSCustomizationHandler {
  constructor() {
    this.formData = null;
    this.menuCategories = [];
    this.menuItems = [];
  }

  // Initialize the handler
  init() {
    this.setupFormListeners();
    this.setupCategoryHandlers();
    this.setupMenuItemHandlers();
  }

  // Setup form submission listener
  setupFormListeners() {
    const omsForm = document.getElementById('order-menu-customization-form');
    if (omsForm) {
      omsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission();
      });
    }
  }

  // Setup category management
  setupCategoryHandlers() {
    const addCategoryBtn = document.getElementById('add-category-btn');
    const clearAllBtn = document.getElementById('clear-all-categories-btn');
    const categoryInput = document.getElementById('new-category-input');

    if (addCategoryBtn) {
      addCategoryBtn.addEventListener('click', () => {
        this.addCategory();
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        this.clearAllCategories();
      });
    }

    if (categoryInput) {
      categoryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.addCategory();
        }
      });
    }
  }

  // Setup menu item management
  setupMenuItemHandlers() {
    const addMenuItemBtn = document.getElementById('add-menu-item-btn');
    if (addMenuItemBtn) {
      addMenuItemBtn.addEventListener('click', () => {
        this.addMenuItem();
      });
    }
  }

  // Add a new category
  addCategory() {
    const categoryInput = document.getElementById('new-category-input');
    const categoryName = categoryInput.value.trim();

    if (!categoryName) {
      alert('Please enter a category name');
      return;
    }

    // Check if category already exists
    if (this.menuCategories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())) {
      alert('Category already exists');
      return;
    }

    const newCategory = {
      id: `cat_${Date.now()}`,
      name: categoryName,
      description: `${categoryName} items`,
      sort_order: this.menuCategories.length + 1
    };

    this.menuCategories.push(newCategory);
    this.updateCategoryDisplay();
    categoryInput.value = '';
  }

  // Clear all categories
  clearAllCategories() {
    if (confirm('Are you sure you want to clear all categories?')) {
      this.menuCategories = [];
      this.menuItems = [];
      this.updateCategoryDisplay();
      this.updateMenuItemDisplay();
    }
  }

  // Update category display
  updateCategoryDisplay() {
    const categoryDisplay = document.getElementById('current-category-display');
    if (categoryDisplay) {
      if (this.menuCategories.length === 0) {
        categoryDisplay.textContent = 'Current Category: Uncategorized';
      } else {
        const categoryNames = this.menuCategories.map(cat => cat.name).join(', ');
        categoryDisplay.textContent = `Current Categories: ${categoryNames}`;
      }
    }
  }

  // Add a new menu item
  addMenuItem() {
    const menuItemsContainer = document.getElementById('menu-items-container');
    if (!menuItemsContainer) return;

    const menuItemCount = menuItemsContainer.children.length;
    const newMenuItem = {
      id: `item_${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      category_id: this.menuCategories.length > 0 ? this.menuCategories[0].id : 'uncategorized',
      category_name: this.menuCategories.length > 0 ? this.menuCategories[0].name : 'Uncategorized',
      is_available: true,
      sort_order: menuItemCount + 1,
      image_url: ''
    };

    this.menuItems.push(newMenuItem);
    this.createMenuItemRow(newMenuItem, menuItemCount);
  }

  // Create a menu item row
  createMenuItemRow(item, index) {
    const menuItemsContainer = document.getElementById('menu-items-container');
    if (!menuItemsContainer) return;

    const row = document.createElement('div');
    row.className = 'menu-item-row grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4 p-4 border border-gray-200 rounded-lg';
    row.setAttribute('data-item-id', item.id);

    row.innerHTML = `
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
        <input type="text" name="menuItems[${index}][item_name]" 
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" 
               placeholder="e.g., Margherita Pizza" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
        <input type="number" name="menuItems[${index}][price]" 
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" 
               placeholder="299" step="0.01" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select name="menuItems[${index}][category]" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required>
          <option value="uncategorized">Uncategorized</option>
          ${this.menuCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
        </select>
      </div>
      <div>
        <button type="button" onclick="omsHandler.removeMenuItem('${item.id}')" 
                class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          Remove
        </button>
      </div>
    `;

    menuItemsContainer.appendChild(row);
  }

  // Remove a menu item
  removeMenuItem(itemId) {
    this.menuItems = this.menuItems.filter(item => item.id !== itemId);
    const row = document.querySelector(`[data-item-id="${itemId}"]`);
    if (row) {
      row.remove();
    }
  }

  // Update menu item display
  updateMenuItemDisplay() {
    const menuItemsContainer = document.getElementById('menu-items-container');
    if (!menuItemsContainer) return;

    menuItemsContainer.innerHTML = '';
    this.menuItems.forEach((item, index) => {
      this.createMenuItemRow(item, index);
    });
  }

  // Handle form submission
  async handleFormSubmission() {
    try {
      console.log('🔄 Starting OMS form submission...');
      
      // Collect form data
      const formData = this.collectFormData();
      
      // Validate form data
      if (!this.validateFormData(formData)) {
        return;
      }

      // Prepare data for database
      const omsData = this.prepareOMSData(formData);
      
      // Submit to database
      const result = await this.submitToDatabase(omsData);
      
      if (result.success) {
        console.log('✅ OMS customization saved successfully:', result.id);
        this.showSuccessMessage('Order Menu System customization saved successfully!');
        
        // Redirect or show next steps
        this.handleSuccess(result.id);
      } else {
        throw new Error(result.error || 'Failed to save customization');
      }
      
    } catch (error) {
      console.error('❌ Error submitting OMS form:', error);
      this.showErrorMessage('Failed to save customization. Please try again.');
    }
  }

  // Collect form data
  collectFormData() {
    const form = document.getElementById('order-menu-customization-form');
    const formData = new FormData(form);
    
    return {
      projectName: formData.get('projectName'),
      restaurantName: formData.get('restaurantName'),
      ownerName: formData.get('ownerName'),
      restaurantAddress: formData.get('restaurantAddress'),
      contactPerson: formData.get('contactPerson'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      logoFile: formData.get('restaurantLogo'),
      primaryColor: formData.get('primaryColor'),
      secondaryColor: formData.get('secondaryColor'),
      accentColor: formData.get('accentColor'),
      textColor: formData.get('textColor'),
      additionalRequirements: formData.get('additionalRequirements'),
      menuItems: this.collectMenuItems()
    };
  }

  // Collect menu items from form
  collectMenuItems() {
    const menuItems = [];
    const menuItemRows = document.querySelectorAll('.menu-item-row');
    
    menuItemRows.forEach((row, index) => {
      const itemName = row.querySelector(`input[name="menuItems[${index}][item_name]"]`)?.value;
      const price = row.querySelector(`input[name="menuItems[${index}][price]"]`)?.value;
      const categoryId = row.querySelector(`select[name="menuItems[${index}][category]"]`)?.value;
      
      if (itemName && price) {
        const category = this.menuCategories.find(cat => cat.id === categoryId);
        menuItems.push({
          id: `item_${Date.now()}_${index}`,
          name: itemName,
          description: `${itemName} - Delicious and fresh`,
          price: parseFloat(price),
          category_id: categoryId,
          category_name: category ? category.name : 'Uncategorized',
          is_available: true,
          sort_order: index + 1,
          image_url: ''
        });
      }
    });
    
    return menuItems;
  }

  // Validate form data
  validateFormData(data) {
    const requiredFields = [
      'projectName', 'restaurantName', 'ownerName', 'restaurantAddress',
      'contactPerson', 'email', 'phone'
    ];
    
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        alert(`Please fill in the ${field} field`);
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    // Validate phone format
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
      alert('Please enter a valid phone number');
      return false;
    }
    
    return true;
  }

  // Prepare OMS data for database
  prepareOMSData(formData) {
    // Get current user
    const currentUser = this.getCurrentUser();
    
    return {
      user_email: formData.email,
      user_id: currentUser?.id || null,
      project_name: formData.projectName,
      restaurant_name: formData.restaurantName,
      owner_name: formData.ownerName,
      restaurant_address: formData.restaurantAddress,
      contact_person: formData.contactPerson,
      phone_number: formData.phone,
      logo_url: null, // Will be set after file upload
      logo_filename: formData.logoFile?.name || null,
      logo_size: formData.logoFile?.size || null,
      menu_categories: this.menuCategories,
      menu_items: formData.menuItems,
      primary_color: formData.primaryColor || '#3B82F6',
      secondary_color: formData.secondaryColor || '#10B981',
      accent_color: formData.accentColor || '#F59E0B',
      text_color: formData.textColor || '#1F2937',
      additional_requirements: formData.additionalRequirements || null
    };
  }

  // Get current user
  getCurrentUser() {
    try {
      const sessionData = sessionStorage.getItem('simple-auth-session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        return session.user;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
    return null;
  }

  // Submit to database
  async submitToDatabase(omsData) {
    try {
      console.log('📤 Submitting OMS data to database:', omsData);
      
      const { data, error } = await supabase.rpc('upsert_oms_customization', {
        p_user_email: omsData.user_email,
        p_user_id: omsData.user_id,
        p_project_name: omsData.project_name,
        p_restaurant_name: omsData.restaurant_name,
        p_owner_name: omsData.owner_name,
        p_restaurant_address: omsData.restaurant_address,
        p_contact_person: omsData.contact_person,
        p_phone_number: omsData.phone_number,
        p_logo_url: omsData.logo_url,
        p_logo_filename: omsData.logo_filename,
        p_logo_size: omsData.logo_size,
        p_menu_categories: omsData.menu_categories,
        p_menu_items: omsData.menu_items,
        p_primary_color: omsData.primary_color,
        p_secondary_color: omsData.secondary_color,
        p_accent_color: omsData.accent_color,
        p_text_color: omsData.text_color,
        p_additional_requirements: omsData.additional_requirements
      });

      if (error) {
        console.error('Database error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, id: data };
      
    } catch (error) {
      console.error('Error submitting to database:', error);
      return { success: false, error: error.message };
    }
  }

  // Handle success
  handleSuccess(customizationId) {
    // Store customization ID for QR code generation
    sessionStorage.setItem('last-oms-customization-id', customizationId);
    
    // Show success message with next steps
    const successMessage = `
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold text-green-800 mb-2">Customization Saved Successfully!</h3>
        <p class="text-green-700 mb-4">Your Order Menu System customization has been saved.</p>
        <div class="space-y-2">
          <p class="text-sm text-green-600">• Customization ID: ${customizationId}</p>
          <p class="text-sm text-green-600">• QR code will be generated for your menu</p>
          <p class="text-sm text-green-600">• You can view your customizations in the admin panel</p>
        </div>
        <div class="mt-4 space-x-3">
          <button onclick="omsHandler.generateQRCode('${customizationId}')" 
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Generate QR Code
          </button>
          <button onclick="omsHandler.viewCustomization('${customizationId}')" 
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            View Details
          </button>
        </div>
      </div>
    `;
    
    const form = document.getElementById('order-menu-customization-form');
    if (form) {
      form.insertAdjacentHTML('beforebegin', successMessage);
    }
  }

  // Generate QR code
  async generateQRCode(customizationId) {
    try {
      console.log('🔗 Generating QR code for customization:', customizationId);
      
      // Get customization data for QR code
      const { data, error } = await supabase.rpc('get_oms_customization_for_qr', {
        p_customization_id: customizationId
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.length > 0) {
        const customization = data[0];
        
        // Create QR code data
        const qrData = {
          type: 'oms_menu',
          id: customization.id,
          restaurant_name: customization.restaurant_name,
          project_name: customization.project_name,
          menu_categories: customization.menu_categories,
          menu_items: customization.menu_items,
          colors: {
            primary: customization.primary_color,
            secondary: customization.secondary_color,
            accent: customization.accent_color,
            text: customization.text_color
          },
          contact: {
            phone: customization.phone_number,
            address: customization.restaurant_address
          },
          generated_at: new Date().toISOString()
        };

        // Generate QR code URL (you can use any QR code service)
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(JSON.stringify(qrData))}`;
        
        // Show QR code
        this.showQRCode(qrCodeUrl, customization);
      }
      
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  }

  // Show QR code
  showQRCode(qrCodeUrl, customization) {
    const qrModal = document.createElement('div');
    qrModal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
    qrModal.innerHTML = `
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">QR Code Generated</h3>
          <div class="mb-4">
            <img src="${qrCodeUrl}" alt="QR Code" class="mx-auto border border-gray-300 rounded-lg">
          </div>
          <div class="text-sm text-gray-600 mb-4">
            <p><strong>Restaurant:</strong> ${customization.restaurant_name}</p>
            <p><strong>Project:</strong> ${customization.project_name}</p>
          </div>
          <div class="space-x-3">
            <button onclick="omsHandler.downloadQRCode('${qrCodeUrl}', '${customization.restaurant_name}')" 
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Download QR Code
            </button>
            <button onclick="omsHandler.closeQRModal()" 
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(qrModal);
  }

  // Download QR code
  downloadQRCode(qrCodeUrl, restaurantName) {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${restaurantName.replace(/\s+/g, '_')}_menu_qr.png`;
    link.click();
  }

  // Close QR modal
  closeQRModal() {
    const modal = document.querySelector('.fixed.inset-0.bg-gray-600');
    if (modal) {
      modal.remove();
    }
  }

  // View customization
  viewCustomization(customizationId) {
    // Redirect to admin panel or show details
    window.open(`/admin/data#customization-${customizationId}`, '_blank');
  }

  // Show success message
  showSuccessMessage(message) {
    // You can integrate with your existing toast system
    if (window.showToast) {
      window.showToast(message, 'success');
    } else {
      alert(message);
    }
  }

  // Show error message
  showErrorMessage(message) {
    // You can integrate with your existing toast system
    if (window.showToast) {
      window.showToast(message, 'error');
    } else {
      alert(message);
    }
  }
}

// Create global instance
window.omsHandler = new OMSCustomizationHandler();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.omsHandler.init();
});

export default window.omsHandler;
