import"./ProductDialog.astro_astro_type_script_index_0_lang.BY4S3r1x.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AuthGuard.astro_astro_type_script_index_0_lang.DULNhCHQ.js";document.querySelectorAll(".faq-button").forEach(e=>{e.addEventListener("click",()=>{const o=e.nextElementSibling,t=e.querySelector("svg");o.classList.toggle("hidden"),t.classList.toggle("rotate-180")})});window.redirectToCart=function(e,o){console.log("🛒 redirectToCart called with:",{productId:e,price:o});const t=window.globalAuthManager||window.simpleAuthManager;if(t&&t.isUserLoggedIn()){const i=`/dashboard?product=${e}&price=${o}`;window.location.href=i}else{const i=`/login?redirect=/dashboard?product=${e}&price=${o}`;window.location.href=i}};function c(){console.log("🚫 IMMEDIATELY disabling all plan buttons");const e=document.querySelectorAll('[id^="plan-btn-"]'),o=document.getElementById("oms-btn"),t=document.getElementById("add-to-cart-btn");e.forEach(n=>{n.disabled=!0,n.style.opacity="0.5",n.style.cursor="not-allowed",n.onclick=function(s){s.preventDefault(),a()}}),o&&(o.disabled=!0,o.style.opacity="0.5",o.style.cursor="not-allowed",o.onclick=function(n){n.preventDefault(),a()}),t&&(t.disabled=!0,t.style.opacity="0.5",t.style.cursor="not-allowed",t.onclick=function(n){n.preventDefault(),a()});const i=document.getElementById("login-prompt");i&&i.classList.remove("hidden")}function d(){console.log("Checking authentication status...");const e=()=>{const o=window.globalAuthManager||window.simpleAuthManager;if(o)if(console.log("✅ Auth manager found, checking status..."),o.isUserLoggedIn()){console.log("✅ User is authenticated, enabling plan buttons");const t=document.querySelectorAll('[id^="plan-btn-"]'),i=document.getElementById("oms-btn"),n=document.getElementById("add-to-cart-btn");t.forEach(r=>{r.disabled=!1,r.style.opacity="1",r.style.cursor="pointer",r.onclick=function(){redirectToCart(r.getAttribute("data-product-id")||"${product.id}",r.getAttribute("data-price")||"999")}}),i&&(i.disabled=!1,i.style.opacity="1",i.style.cursor="pointer",i.onclick=function(){redirectToCart("${product.id}",999)}),n&&(n.disabled=!1,n.style.opacity="1",n.style.cursor="pointer",n.onclick=function(){redirectToCart("${product.id}","${isOrderMenuSystem ? 999 : productPlans[0]?.price}")});const s=document.getElementById("login-prompt");s&&s.classList.add("hidden")}else console.log("❌ User is not authenticated, keeping buttons disabled"),c();else console.log("⏳ Auth manager not ready, retrying..."),setTimeout(e,100)};e()}function a(){const e=document.createElement("div");e.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `;const o=document.createElement("div");o.style.cssText=`
      background: white;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      max-width: 400px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `,o.innerHTML=`
      <h3 style="margin-bottom: 20px; color: #333;">Authentication Required</h3>
      <p style="margin-bottom: 30px; color: #666;">Please sign up or login to select plans and add items to cart.</p>
      <div style="display: flex; gap: 15px; justify-content: center;">
        <button id="signup-btn" style="
          background: #3B82F6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        ">Sign Up</button>
        <button id="login-btn" style="
          background: #6B7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        ">Login</button>
      </div>
    `,e.appendChild(o),document.body.appendChild(e),document.getElementById("signup-btn").addEventListener("click",()=>{document.body.removeChild(e),window.location.href="/signup"}),document.getElementById("login-btn").addEventListener("click",()=>{document.body.removeChild(e),window.location.href="/login"}),e.addEventListener("click",t=>{t.target===e&&document.body.removeChild(e)})}(function(){console.log("🚫 IMMEDIATE PLAN BUTTON DISABLING - preventing unauthorized access");function e(){const t=window.globalAuthManager||window.simpleAuthManager;if(t&&t.isUserLoggedIn()){console.log("✅ User already authenticated - skipping immediate disable");return}const i=document.querySelectorAll('[id^="plan-btn-"]'),n=document.getElementById("oms-btn"),s=document.getElementById("add-to-cart-btn");i.forEach(r=>{r.disabled=!0,r.style.opacity="0.5",r.style.cursor="not-allowed",r.onclick=function(l){l.preventDefault(),a()}}),n&&(n.disabled=!0,n.style.opacity="0.5",n.style.cursor="not-allowed",n.onclick=function(r){r.preventDefault(),a()}),s&&(s.disabled=!0,s.style.opacity="0.5",s.style.cursor="not-allowed",s.onclick=function(r){r.preventDefault(),a()})}e(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e(),window.addEventListener("load",e);let o=setInterval(e,50);setTimeout(()=>clearInterval(o),3e3)})();document.addEventListener("DOMContentLoaded",d);document.addEventListener("DOMContentLoaded",function(){const o=window.location.pathname.split("/").pop();if(console.log("Product page loaded:",o),o==="order-menu-system"){console.log("OMS product page - no restrictions applied, ensuring dialog is hidden");const i=document.getElementById("product-dialog");i&&i.classList.add("hidden");return}const t=u();console.log("Is admin:",t),t?console.log("Admin user - no restrictions"):(console.log("Non-admin user - showing dialog"),window.showProductDialog?window.showProductDialog():(console.log("Dialog not available - redirecting to contact"),window.location.href="/contact"))});function u(){try{if(window.globalAuthManager&&window.globalAuthManager.isUserLoggedIn()){const t=window.globalAuthManager.getCurrentUser();if(t&&t.role==="admin")return!0}if(window.simpleAuthManager&&window.simpleAuthManager.isUserLoggedIn()){const t=window.simpleAuthManager.getCurrentUser();if(t&&t.role==="admin")return!0}const e=sessionStorage.getItem("simple-auth-session");if(e)try{const t=JSON.parse(e);if(t.user&&t.user.role==="admin")return!0}catch(t){console.log("Session data parse error:",t)}const o=localStorage.getItem("simple-auth-session");if(o)try{const t=JSON.parse(o);if(t.user&&t.user.role==="admin")return!0}catch(t){console.log("Local session data parse error:",t)}return!1}catch(e){return console.error("Error checking admin status:",e),!1}}window.addEventListener("user-logged-in",e=>{console.log("✅ User logged in event received, updating UI..."),d()});window.addEventListener("user-logged-out",()=>{console.log("❌ User logged out event received, updating UI..."),d()});const g=new IntersectionObserver(e=>{e.forEach(o=>{o.isIntersecting&&o.target.classList.add("animate-fade-in")})});document.querySelectorAll(".animate-fade-in").forEach(e=>{g.observe(e)});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".contact-us-btn").forEach(o=>{o.addEventListener("mouseenter",function(){this.style.color="#000000",this.style.backgroundColor="white"}),o.addEventListener("mouseleave",function(){this.style.color="white",this.style.backgroundColor="transparent"})})});
