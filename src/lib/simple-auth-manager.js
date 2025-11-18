// Simple Authentication State Manager
// This prevents reloads while maintaining login state

class SimpleAuthManager {
  constructor() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.init();
  }

  init() {
    // Check if user is already logged in
    this.checkExistingSession();
    
    // Listen for login events
    window.addEventListener('user-logged-in', (e) => {
      this.handleLogin(e.detail);
    });
    
    window.addEventListener('user-logged-out', () => {
      this.handleLogout();
    });
  }

  checkExistingSession() {
    try {
      // Check sessionStorage first (most recent)
      const sessionData = sessionStorage.getItem('simple-auth-session');
      if (sessionData && sessionData !== 'null' && sessionData !== '{}') {
        try {
          const session = JSON.parse(sessionData);
          if (session && session.user && (session.access_token || session.user.email)) {
            this.isAuthenticated = true;
            this.currentUser = session.user;
            console.log('✅ Existing session found in sessionStorage:', this.currentUser.email);
            this.updateUI();
            return;
          }
        } catch (parseError) {
          console.log('SessionStorage parse error, checking localStorage:', parseError);
        }
      }
      
      // Check localStorage as fallback (for deployment reliability)
      const localSessionData = localStorage.getItem('simple-auth-session');
      if (localSessionData && localSessionData !== 'null' && localSessionData !== '{}') {
        try {
          const session = JSON.parse(localSessionData);
          if (session && session.user && (session.access_token || session.user.email)) {
            this.isAuthenticated = true;
            this.currentUser = session.user;
            console.log('✅ Existing session found in localStorage:', this.currentUser.email);
            // Sync to sessionStorage for consistency
            sessionStorage.setItem('simple-auth-session', localSessionData);
            this.updateUI();
            return;
          }
        } catch (parseError) {
          console.log('LocalStorage session parse error, checking user data:', parseError);
        }
      }
      
      // Check localStorage user data as final fallback
      const storedUser = localStorage.getItem('simple-auth-user');
      if (storedUser && storedUser !== 'null' && storedUser !== '{}') {
        try {
          const user = JSON.parse(storedUser);
          if (user && user.email) {
            this.isAuthenticated = true;
            this.currentUser = user;
            console.log('✅ Existing user found in localStorage:', this.currentUser.email);
            // Create session data and sync to sessionStorage
            const sessionData = {
              user: user,
              access_token: 'simple-token-' + Date.now(),
              timestamp: Date.now()
            };
            sessionStorage.setItem('simple-auth-session', JSON.stringify(sessionData));
            this.updateUI();
            return;
          }
        } catch (parseError) {
          console.log('LocalStorage user parse error:', parseError);
        }
      }
      
      console.log('ℹ️ No existing session found');
    } catch (error) {
      console.error('Error checking existing session:', error);
    }
  }

  handleLogin(userData) {
    this.isAuthenticated = true;
    this.currentUser = userData;
    
    // Add default role if not present
    if (!userData.role) {
      userData.role = 'user'; // Default role for regular users
    }
    
    // Store session in BOTH sessionStorage AND localStorage for deployment reliability
    const sessionData = {
      user: userData,
      access_token: 'simple-token-' + Date.now(),
      timestamp: Date.now()
    };
    
    // Store in both storages to ensure persistence across redirects
    sessionStorage.setItem('simple-auth-session', JSON.stringify(sessionData));
    localStorage.setItem('simple-auth-user', JSON.stringify(userData));
    localStorage.setItem('simple-auth-session', JSON.stringify(sessionData));
    
    // Clear cart data for new user to prevent cross-user contamination
    if (window.clearCartForNewUser) {
      window.clearCartForNewUser();
    }
    
    // Also clear localStorage cart data
    localStorage.removeItem('cart-items');
    localStorage.removeItem('cart-requirements');
    localStorage.removeItem('user-cart-data');
    
    console.log('✅ User logged in:', userData.email, 'and cart cleared');
    this.updateUI();
  }

  handleLogout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    
    // Clear session from both storages
    sessionStorage.removeItem('simple-auth-session');
    localStorage.removeItem('simple-auth-user');
    
    // Clear cart data to prevent cross-user contamination
    if (window.clearCartOnUserChange) {
      window.clearCartOnUserChange();
    }
    
    // Also clear localStorage cart data
    localStorage.removeItem('cart-items');
    localStorage.removeItem('cart-requirements');
    localStorage.removeItem('user-cart-data');
    
    console.log('✅ User logged out and cart cleared');
    this.updateUI();
  }

  updateUI() {
    // Update header
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const mobileAuthButtons = document.getElementById('mobile-auth-buttons');
    const mobileUserMenu = document.getElementById('mobile-user-menu');

    if (this.isAuthenticated && this.currentUser) {
      // User is logged in
      if (authButtons) authButtons.classList.add('hidden');
      if (userMenu) userMenu.classList.remove('hidden');
      if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');
      if (mobileUserMenu) mobileUserMenu.classList.remove('hidden');

      // Update user info
      this.updateUserInfo();
    } else {
      // User is not logged in
      if (authButtons) authButtons.classList.remove('hidden');
      if (userMenu) userMenu.classList.add('hidden');
      if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
      if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
    }
  }

  updateUserInfo() {
    // CRITICAL: Only update UI if user is properly authenticated
    if (!this.isAuthenticated || !this.currentUser) {
      console.log('❌ User not authenticated - clearing UI elements');
      this.clearUserInfo();
      return;
    }

    // Update header user info
    const userEmail = document.getElementById('user-email');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const mobileUserEmail = document.getElementById('mobile-user-email');

    if (userEmail) userEmail.textContent = this.currentUser.email || '';
    if (userName) userName.textContent = this.currentUser.full_name || this.currentUser.email?.split('@')[0] || 'User';
    if (userAvatar) userAvatar.textContent = (this.currentUser.full_name || this.currentUser.email || 'U').charAt(0).toUpperCase();
    if (mobileUserEmail) mobileUserEmail.textContent = this.currentUser.email || '';

    // Update dashboard user info
    const userWelcome = document.getElementById('user-welcome');
    const userFullName = document.getElementById('user-full-name');
    const userEmailDashboard = document.getElementById('user-email');
    const userPhone = document.getElementById('user-phone');
    const userCompany = document.getElementById('user-company');

    if (userWelcome) userWelcome.textContent = this.currentUser.full_name || this.currentUser.email?.split('@')[0] || 'User';
    if (userFullName) userFullName.textContent = this.currentUser.full_name || 'Not set';
    if (userEmailDashboard) userEmailDashboard.textContent = this.currentUser.email || 'Not set';
    if (userPhone) userPhone.textContent = this.currentUser.phone || 'Not set';
    if (userCompany) userCompany.textContent = this.currentUser.company_name || 'Not set';
  }

  clearUserInfo() {
    // Clear all user info elements when not authenticated
    const userEmail = document.getElementById('user-email');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const mobileUserEmail = document.getElementById('mobile-user-email');
    const userWelcome = document.getElementById('user-welcome');
    const userFullName = document.getElementById('user-full-name');
    const userEmailDashboard = document.getElementById('user-email');
    const userPhone = document.getElementById('user-phone');
    const userCompany = document.getElementById('user-company');

    if (userEmail) userEmail.textContent = '';
    if (userName) userName.textContent = 'Guest';
    if (userAvatar) userAvatar.textContent = 'G';
    if (mobileUserEmail) mobileUserEmail.textContent = '';
    if (userWelcome) userWelcome.textContent = 'Guest';
    if (userFullName) userFullName.textContent = 'Not logged in';
    if (userEmailDashboard) userEmailDashboard.textContent = 'Not logged in';
    if (userPhone) userPhone.textContent = 'Not logged in';
    if (userCompany) userCompany.textContent = 'Not logged in';
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isUserLoggedIn() {
    return this.isAuthenticated;
  }

  logout() {
    this.handleLogout();
    window.location.href = '/';
  }
}

// Create global instance
window.simpleAuthManager = new SimpleAuthManager();

// Export for use in other files
export default window.simpleAuthManager;
