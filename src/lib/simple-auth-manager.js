// handles auth state without page reloads

class SimpleAuthManager {
  constructor() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.init();
  }

  init() {
    this.checkExistingSession();
    
    window.addEventListener('user-logged-in', (e) => {
      this.handleLogin(e.detail);
    });
    
    window.addEventListener('user-logged-out', () => {
      this.handleLogout();
    });
  }

  checkExistingSession() {
    try {
      const sessionData = sessionStorage.getItem('simple-auth-session');
      if (sessionData && sessionData !== 'null' && sessionData !== '{}') {
        try {
          const session = JSON.parse(sessionData);
          if (session && session.user && (session.access_token || session.user.email)) {
            this.isAuthenticated = true;
            this.currentUser = session.user;
            console.log('Session found:', this.currentUser.email);
            this.updateUI();
            return;
          }
        } catch (parseError) {
          console.log('Parse error, trying localStorage');
        }
      }
      
      const localSessionData = localStorage.getItem('simple-auth-session');
      if (localSessionData && localSessionData !== 'null' && localSessionData !== '{}') {
        try {
          const session = JSON.parse(localSessionData);
          if (session && session.user && (session.access_token || session.user.email)) {
            this.isAuthenticated = true;
            this.currentUser = session.user;
            console.log('Session found in localStorage:', this.currentUser.email);
            sessionStorage.setItem('simple-auth-session', localSessionData);
            this.updateUI();
            return;
          }
        } catch (parseError) {
          console.log('LocalStorage parse error');
        }
      }
      
      const storedUser = localStorage.getItem('simple-auth-user');
      if (storedUser && storedUser !== 'null' && storedUser !== '{}') {
        try {
          const user = JSON.parse(storedUser);
          if (user && user.email) {
            this.isAuthenticated = true;
            this.currentUser = user;
            console.log('User found:', this.currentUser.email);
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
          console.log('User parse error');
        }
      }
      
      console.log('No session found');
    } catch (error) {
      console.error('Error checking session:', error);
    }
  }

  handleLogin(userData) {
    this.isAuthenticated = true;
    this.currentUser = userData;
    
    if (!userData.role) {
      userData.role = 'user';
    }
    
    const sessionData = {
      user: userData,
      access_token: 'simple-token-' + Date.now(),
      timestamp: Date.now()
    };
    
    sessionStorage.setItem('simple-auth-session', JSON.stringify(sessionData));
    localStorage.setItem('simple-auth-user', JSON.stringify(userData));
    localStorage.setItem('simple-auth-session', JSON.stringify(sessionData));
    
    if (window.clearCartForNewUser) {
      window.clearCartForNewUser();
    }
    
    localStorage.removeItem('cart-items');
    localStorage.removeItem('cart-requirements');
    localStorage.removeItem('user-cart-data');
    
    console.log('User logged in:', userData.email);
    this.updateUI();
  }

  handleLogout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    
    sessionStorage.removeItem('simple-auth-session');
    localStorage.removeItem('simple-auth-user');
    
    if (window.clearCartOnUserChange) {
      window.clearCartOnUserChange();
    }
    
    localStorage.removeItem('cart-items');
    localStorage.removeItem('cart-requirements');
    localStorage.removeItem('user-cart-data');
    
    console.log('User logged out');
    this.updateUI();
  }

  updateUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const mobileAuthButtons = document.getElementById('mobile-auth-buttons');
    const mobileUserMenu = document.getElementById('mobile-user-menu');

    if (this.isAuthenticated && this.currentUser) {
      if (authButtons) authButtons.classList.add('hidden');
      if (userMenu) userMenu.classList.remove('hidden');
      if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');
      if (mobileUserMenu) mobileUserMenu.classList.remove('hidden');

      this.updateUserInfo();
    } else {
      if (authButtons) authButtons.classList.remove('hidden');
      if (userMenu) userMenu.classList.add('hidden');
      if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
      if (mobileUserMenu) mobileUserMenu.classList.add('hidden');
    }
  }

  updateUserInfo() {
    if (!this.isAuthenticated || !this.currentUser) {
      console.log('User not authenticated');
      this.clearUserInfo();
      return;
    }

    const userEmail = document.getElementById('user-email');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const mobileUserEmail = document.getElementById('mobile-user-email');

    if (userEmail) userEmail.textContent = this.currentUser.email || '';
    if (userName) userName.textContent = this.currentUser.full_name || this.currentUser.email?.split('@')[0] || 'User';
    if (userAvatar) userAvatar.textContent = (this.currentUser.full_name || this.currentUser.email || 'U').charAt(0).toUpperCase();
    if (mobileUserEmail) mobileUserEmail.textContent = this.currentUser.email || '';

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

window.simpleAuthManager = new SimpleAuthManager();

export default window.simpleAuthManager;
