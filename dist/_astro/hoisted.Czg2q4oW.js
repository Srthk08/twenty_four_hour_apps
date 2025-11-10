import{supabaseUrl as V,supabaseAnonKey as oe,supabase as H}from"./supabase.B9-RI-CL.js";import"./ProductDialog.astro_astro_type_script_index_0_lang.85w2jD1L.js";import"https://unpkg.com/@supabase/supabase-js@2";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./index.BymsOcZI.js";import"./preload-helper.CLcXU_4U.js";console.log("🔧 Supabase configuration (shared client):");console.log("- URL:",V);console.log("- Key:","Present");let G=null,T=null;async function k(e=20,o=100){if(T)return T;for(let t=0;t<e;t++){if(window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function")return T=window.supabase,T;await new Promise(n=>setTimeout(n,o))}return H&&H.auth?(T=H,T):(console.error("Supabase client not available after waiting"),null)}document.addEventListener("DOMContentLoaded",async()=>{console.log("📄 DOM Content Loaded - Starting Menu Operator Dashboard initialization"),console.log("🔄 UPDATED: Product Customizations Dashboard Loading..."),k().then(e=>{e&&console.log("✅ Supabase client pre-loaded and cached")}),fe(),await U()});window.addEventListener("load",()=>{console.log("🔄 Window loaded - Ensuring dashboard is ready"),document.getElementById("customizations-table-body").innerHTML.includes("Loading")&&U()});window.showProductBrowser=function(){console.log("🔄 Showing product browser...");const e=document.getElementById("product-browser-modal"),o=document.getElementById("products-grid"),t=ne();o.innerHTML=de(t),document.body.style.overflow="hidden",e.classList.remove("hidden")};window.closeProductBrowser=function(){document.getElementById("product-browser-modal").classList.add("hidden"),document.body.style.overflow=""};window.selectProduct=function(e){console.log("🔄 Product selected:",e),closeProductBrowser(),showCustomizationForm(e)};window.showCustomizationForm=function(e){console.log("🔄 Showing customization form for product:",e);const o=document.getElementById("customization-form-modal"),t=document.getElementById("customization-form-content"),n=ae(e);t.innerHTML=ue(n),document.body.style.overflow="hidden",o.classList.remove("hidden")};window.closeCustomizationForm=function(){document.getElementById("customization-form-modal").classList.add("hidden"),document.body.style.overflow=""};document.addEventListener("submit",function(e){e.target.id==="customization-form"&&(e.preventDefault(),ce(e.target))});function ce(e){const o=new FormData(e),t=Object.fromEntries(o.entries());console.log("🔄 Submitting customization form:",t);const n=e.dataset.productId||"unknown",a=ae(n),l={...t,product_name:a.name,product_id:n,status:"pending",created_at:new Date().toISOString()};console.log("📝 Customization data to save:",l),alert("Customization request submitted successfully! We will contact you soon."),closeCustomizationForm(),setTimeout(()=>{window.location.reload()},1e3)}function ne(){return[{id:"restaurant-menu-system",name:"Restaurant Menu System",description:"Digital menu system with QR code ordering",price:"Starting from $2,500",image:"/images/restaurant-menu.jpg",features:["QR Code Ordering","Real-time Updates","Multi-language Support"]},{id:"android-tv-app",name:"Android TV App",description:"Custom Android TV application for streaming",price:"Starting from $5,500",image:"/images/android-tv.jpg",features:["Custom UI/UX","Content Management","Multi-platform Support"]},{id:"restaurant-website",name:"Restaurant Website",description:"Professional website with online ordering",price:"Starting from $3,000",image:"/images/restaurant-website.jpg",features:["Online Ordering","Menu Management","SEO Optimized"]},{id:"streaming-mobile-app",name:"Streaming Mobile App",description:"Cross-platform mobile app for content streaming",price:"Starting from $4,500",image:"/images/mobile-app.jpg",features:["iOS & Android","Live Streaming","User Management"]},{id:"order-menu-system",name:"Order Menu System",description:"Complete ordering system for restaurants",price:"Starting from $3,500",image:"/images/order-system.jpg",features:["Order Management","Payment Integration","Analytics"]},{id:"e-commerce-platform",name:"E-commerce Platform",description:"Full-featured online store platform",price:"Starting from $6,000",image:"/images/ecommerce.jpg",features:["Product Catalog","Payment Gateway","Inventory Management"]}]}function ae(e){const o=ne();return o.find(t=>t.id===e)||o[0]}function de(e){return`
      ${e.map(o=>`
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="aspect-w-16 aspect-h-9 mb-4">
              <div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${o.name}</h3>
            <p class="text-gray-600 mb-4">${o.description}</p>
            <div class="mb-4">
              <p class="text-lg font-bold text-green-600">${o.price}</p>
            </div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">Features:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                ${o.features.map(t=>`<li>• ${t}</li>`).join("")}
              </ul>
            </div>
            <button onclick="selectProduct('${o.id}')" class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Select Product
            </button>
          </div>
        </div>
      `).join("")}
    `}function ue(e){return`
      <div class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-lg font-semibold text-gray-900 mb-2">Selected Product: ${e.name}</h4>
          <p class="text-gray-600">${e.description}</p>
        </div>
        
        <form id="customization-form" data-product-id="${e.id}" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
              <input type="text" name="customer_name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input type="text" name="company_name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input type="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="tel" name="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
            <input type="text" name="project_name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
            <textarea name="requirements" rows="4" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Describe your specific requirements..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
            <select name="budget_range" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Select Budget Range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="over-50k">Over $50,000</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
            <select name="timeline" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Select Timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-month">1 Month</option>
              <option value="2-3-months">2-3 Months</option>
              <option value="3-6-months">3-6 Months</option>
              <option value="6-months-plus">6+ Months</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea name="notes" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Any additional information..."></textarea>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button type="button" onclick="closeCustomizationForm()" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Submit Customization Request
            </button>
          </div>
        </form>
      </div>
    `}async function U(){try{console.log("🔄 Loading real data from Supabase...");const e=await k();if(!e){console.warn("⚠️ Supabase not ready, skipping real data load");return}await pe();const o=await me(e),t=await re(e);console.log("🔄 Real data fetched - Customizations:",o?.length||0,"Photos:",t?.length||0),window.__all_customizations=o||[],D(window.__all_customizations),K(t||[]),N(o||[],t||[])}catch(e){console.warn("⚠️ Error loading real data:",e.message),D([]),K([]),N([])}}async function me(e=null){try{console.log("🔄 Attempting to load from order_customizations table...");const o=e||await k();if(!o)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");console.log("🔄 Supabase client status: Available"),console.log("🔄 Executing Supabase query (order_customizations)...");let{data:t,error:n}=await o.from("order_customizations").select("*").order("created_at",{ascending:!1}).limit(50);if((n||!t)&&(console.warn("⚠️ Supabase query error/empty, trying REST fallback:",n?.message),t=await ge("order_customizations",o)),console.log("🔄 Supabase query completed. Data:",t,"Error:",n),n)throw console.error("❌ Supabase error:",n),n;return console.log("✅ Loaded customizations from order_customizations:",t?.length||0),console.log("🔄 Sample data:",t?.[0]||"No data"),t||[]}catch(o){throw console.error("❌ Error loading real product customizations from product_customizations:",o),o}}async function re(e=null){try{console.log("🔄 Attempting to load from menu_photos table...");const o=e||await k();if(!o)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");const{data:t,error:n}=await o.from("order_customizations").select("id, created_at, menu_photos_urls").order("created_at",{ascending:!1}).limit(50);if(n)return console.warn("⚠️ order_customizations select for photos failed:",n.message),[];const a=[];return(t||[]).forEach(l=>{let s=l.menu_photos_urls;if(s){try{typeof s=="string"&&(s=JSON.parse(s))}catch{s=[]}Array.isArray(s)&&s.forEach(i=>{a.push({id:`${l.id}-${i.path||i.filename||Math.random().toString(36).slice(2)}`,photo_url:i.url||i.publicUrl||null,original_filename:i.filename||"menu-photo",conversion_status:"completed",file_size:i.size||null,created_at:l.created_at})})}}),console.log("✅ Derived photos from order_customizations:",a.length),a}catch(o){throw console.error("❌ Error loading real menu photos:",o),o}}async function ge(e,o=null){try{const t=o||await k();if(!t||!t.auth)throw new Error("Supabase client not available");const{data:n}=await t.auth.getSession(),a=n?.session?.access_token||n?.access_token||"",l=`${V}/rest/v1/${e}?select=*`,s=await fetch(l,{headers:{apikey:oe,...a?{Authorization:`Bearer ${a}`}:{}}});if(!s.ok){const i=await s.text();return console.warn("REST fallback failed:",s.status,i),[]}return await s.json()}catch(t){return console.warn("REST fallback exception:",t),[]}}async function Y(e,o,t=null){try{const n=t||await k();if(!n||!n.auth)throw new Error("Supabase client not available");const{data:a}=await n.auth.getSession(),l=a?.session?.access_token||a?.access_token||"",s=`${V}/rest/v1/${e}?id=eq.${encodeURIComponent(o)}&select=*`,i=await fetch(s,{headers:{apikey:oe,...l?{Authorization:`Bearer ${l}`}:{}}});if(!i.ok){const A=await i.text();return console.warn("REST by id failed:",i.status,A),null}const h=await i.json();return Array.isArray(h)&&h.length?h[0]:null}catch(n){return console.warn("REST by id exception:",n),null}}function D(e){console.log("🔄 Displaying customizations:",e?.length||0);const o=document.getElementById("customizations-table-body");if(!o){console.error("❌ Table body not found! Looking for: customizations-table-body"),console.log("Available elements:",document.querySelectorAll('[id*="table"]'));return}if(!e||e.length===0){console.log("⚠️ No customizations to display - showing empty state"),o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No product customizations found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}o.innerHTML=e.map(t=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">${t.product_name||"Order Menu System"}</div>
          <div class="text-sm text-gray-500">${t.project_name||t.restaurant_name||"No project name"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${t.contact_person||t.owner_name||"Not specified"}</div>
          <div class="text-sm text-gray-500">${t.restaurant_name||t.company_name||""}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${t.email||"No email"}</div>
          <div class="text-sm text-gray-500">${t.phone_number||t.phone||"No phone"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status==="completed"||t.status==="processed"?"bg-green-100 text-green-800":t.status==="in_progress"||t.status==="processing"?"bg-yellow-100 text-yellow-800":t.status==="pending"||t.status==="pending_payment"||t.status==="submitted"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
            ${t.status||"pending"}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ₹${(t.total_amount||t.price||0).toLocaleString("en-IN")}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${t.created_at?new Date(t.created_at).toLocaleDateString():"Unknown"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button type="button" class="text-blue-600 hover:text-blue-900" onclick="viewCustomization('${t.id}')">View</button>
        </td>
      </tr>
    `).join(""),console.log("✅ Customizations table updated with",e.length,"items")}function K(e){const o=document.getElementById("photos-table-body");if(o){if(!e||e.length===0){console.log("⚠️ No photos to display - showing empty state"),o.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No photos found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}o.innerHTML=e.map(t=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          ${t.photo_url?`<img src="${t.photo_url}" alt="Menu photo" class="w-12 h-12 rounded object-cover">`:'<div class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${t.original_filename||"Unknown"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.conversion_status==="completed"?"bg-green-100 text-green-800":t.conversion_status==="processing"?"bg-yellow-100 text-yellow-800":t.conversion_status==="failed"?"bg-red-100 text-red-800":"bg-gray-100 text-gray-800"}">
            ${t.conversion_status||"pending"}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${t.file_size?(t.file_size/1024).toFixed(1)+" KB":"Unknown size"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${t.created_at?new Date(t.created_at).toLocaleDateString():"Unknown"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
          </tr>
        `).join("")}}function N(e,o){const t=document.getElementById("total-customizations"),n=document.getElementById("pending-customizations"),a=document.getElementById("in-progress-customizations"),l=document.getElementById("completed-customizations");if(t&&(t.textContent=e.length),n){const s=e.filter(i=>i.status==="pending"||i.status==="new").length;n.textContent=s}if(a){const s=e.filter(i=>i.status==="in_progress"||i.status==="processing").length;a.textContent=s}if(l){const s=e.filter(i=>i.status==="completed"||i.status==="processed").length;l.textContent=s}}async function pe(){try{const e=await k();if(!e||!e.auth||typeof e.auth.getUser!="function"){console.error("Supabase client not available");return}const{data:{user:o},error:t}=await e.auth.getUser();if(t||!o){console.error("Error getting user:",t),window.location.href="/login";return}G=o,console.log("🔍 Loading profile for user:",o.email);const{data:n,error:a}=await e.from("profiles").select("*").eq("id",o.id).eq("role","menu_operator").single();if(a){console.error("Error loading profile:",a);const{data:l,error:s}=await e.from("profiles").select("*").eq("id",o.id).single();if(s){console.error("Error loading fallback profile:",s),window.location.href="/login";return}if(console.log("🔍 Fallback profile loaded:",l),console.log("🔍 Role value from database:",JSON.stringify(l.role)),!l.role||l.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",l.role),l.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...");return}if(console.log("🔍 Profile loaded:",n),console.log("🔍 Role value from database:",JSON.stringify(n.role)),!n.role||n.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",n.role),n.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...")}catch(e){console.error("Error loading user profile:",e)}}function fe(){const e=document.getElementById("refresh-customizations");e&&e.addEventListener("click",async()=>{console.log("🔄 Manual refresh of product customizations triggered"),await U();const a=document.getElementById("search-email");a&&(a.value="")});const o=document.getElementById("search-email");if(o){const a=()=>{const l=(o.value||"").toLowerCase().trim(),s=window.__all_customizations||[];if(!l){D(s),N(s);return}const i=s.filter(h=>(h.email||"").toLowerCase().includes(l));D(i),N(i)};o.addEventListener("input",a),o.addEventListener("change",a)}const t=document.getElementById("refresh-photos");t&&t.addEventListener("click",async()=>{console.log("🔄 Manual refresh of photos triggered"),await U()});const n=document.getElementById("photo-upload-input");n&&n.addEventListener("change",ye)}async function ye(e){const o=e.target.files[0];if(o){if(!o.type.startsWith("image/")){alert("Please select an image file");return}if(o.size>10*1024*1024){alert("File size must be less than 10MB");return}try{const t=o.name.split(".").pop(),n=`${G.id}/${Date.now()}.${t}`,a=await k();if(!a||!a.storage)throw new Error("Supabase client not available");const{data:l,error:s}=await a.storage.from("menu-photos").upload(n,o);if(s)throw s;const{data:{publicUrl:i}}=a.storage.from("menu-photos").getPublicUrl(n),{data:h,error:A}=await a.from("menu_photos").insert({user_id:G.id,photo_url:i,original_filename:o.name,file_size:o.size,mime_type:o.type,conversion_status:"pending"});if(A)throw A;const w=await k();await re(w),e.target.value="",alert("Photo uploaded successfully!")}catch(t){console.error("Upload error:",t),alert("Error uploading file: "+t.message)}}}window.viewCustomization=async function(e){const o=document.getElementById("customization-details-modal");document.body.style.overflow="hidden",o?.classList.remove("hidden");const t=document.getElementById("customization-details-content");t&&(t.innerHTML='<p class="text-gray-500">Loading details...</p>'),console.log("🔄 Loading product customization details for:",e);try{let n=null;if(window.__all_customizations&&Array.isArray(window.__all_customizations)&&(n=window.__all_customizations.find(i=>i.id===e),n)){console.log("✅ Found customization in cache, using cached data"),X(n,t,o);return}console.log("📡 Customization not in cache, fetching from database...");const a=T||await k(),l=(async()=>{try{return a&&(await a.from("order_customizations").select("*").eq("id",e).single()).data||null}catch{return null}})(),s=Y("order_customizations",e,a);if(n=await Promise.race([Promise.any([l,s]),new Promise((i,h)=>setTimeout(()=>h(new Error("Timeout")),1500))]).catch(()=>null),n||(n=await Y("order_customizations",e,a)),!n){console.warn("No customization found for id:",e),t&&(t.innerHTML='<p class="text-gray-500">No details found for this customization.</p>');return}X(n,t,o)}catch(n){console.error("Error viewing product customization details:",n);const a=document.getElementById("customization-details-content");a&&(a.innerHTML='<p class="text-red-600">Error loading details. Please try again.</p>')}};function X(e,o,t){if(o){const n=e.house_flat_number||e.houseNumber||"",a=e.address_line_1||e.addressLine1||"",l=e.city||"",s=e.state||"",i=e.pincode||"",h=e.country||"",A=e.restaurant_name||e.restaurantName||e.restaurant||e.restaurant_title||e.project_name||"";let w=e.menu_photos_urls||[];try{typeof w=="string"&&(w=JSON.parse(w))}catch{}const Q=Array.isArray(w)&&w.length?`<div id="photos-grid" class="grid grid-cols-3 sm:grid-cols-4 gap-3">${w.map(_=>`
                <a href="${_.url||_.publicUrl}" target="_blank" class="block">
                  <img src="${_.url||_.publicUrl}" crossorigin="anonymous" alt="${_.filename||"menu photo"}" class="w-20 h-20 object-cover rounded border"/>
                  <p class="mt-1 text-xs text-gray-500 truncate">${_.filename||""}</p>
                </a>
              `).join("")}</div>`:'<p class="text-gray-500">No menu photos uploaded</p>',v=e.restaurant_logo_url?`<img src="${e.restaurant_logo_url}" alt="Logo" class="w-20 h-20 object-cover rounded border"/>`:'<span class="text-gray-500">Not uploaded</span>';o.innerHTML=`
            <div class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Product</h4>
                  <p class="text-gray-900">${e.product_name||"Order Menu System"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${e.status==="completed"||e.status==="processed"?"bg-green-100 text-green-800":e.status==="in_progress"||e.status==="processing"?"bg-yellow-100 text-yellow-800":e.status==="pending"||e.status==="pending_payment"||e.status==="submitted"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">${e.status||"pending"}</div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Project Name</h4>
                  <p class="text-gray-900">${e.project_name||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Restaurant Name</h4>
                  <p class="text-gray-900">${A||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Amounts</h4>
                  <p class="text-gray-900">Base: ₹${(e.base_package_cost||0).toLocaleString("en-IN")} · GST: ₹${(e.gst_amount||0).toLocaleString("en-IN")} · Total: ₹${(e.total_amount||0).toLocaleString("en-IN")}</p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Owner Name</h4>
                  <p class="text-gray-900">${e.owner_name||"-"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Contact Person</h4>
                  <p class="text-gray-900">${e.contact_person||e.owner_name||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Email</h4>
                  <p class="text-gray-900">${e.email||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                  <p class="text-gray-900">${e.phone_number||e.phone||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Created</h4>
                  <p class="text-gray-900">${new Date(e.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Address</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500">House / Flat Number</p>
                    <p class="text-gray-900">${n||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Address Line 1</p>
                    <p class="text-gray-900">${a||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">City</p>
                    <p class="text-gray-900">${l||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">State</p>
                    <p class="text-gray-900">${s||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Pincode</p>
                    <p class="text-gray-900">${i||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Country</p>
                    <p class="text-gray-900">${h||"-"}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Restaurant Logo</h4>
                ${v}
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-500">Menu Photos</h4>
                  <button type="button" onclick="convertImagesToTextAI()" class="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">Convert with AI</button>
                </div>
                ${Q}
                <div id="ai-conversion-result" class="mt-4 hidden">
                  <div class="flex items-center justify-between mb-2">
                    <h5 class="text-sm font-semibold text-gray-900">Extracted Menu Text</h5>
                    <div id="ai-action-buttons" class="space-x-2 hidden">
                      <button type="button" onclick="copyAIText()" class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200">Copy</button>
                      <button type="button" onclick="clearAIText()" class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200" title="Clear">Clear</button>
                    </div>
                  </div>
                  <pre id="ai-conversion-text" class="w-full p-3 border border-gray-300 rounded-md text-sm whitespace-pre-wrap bg-gray-50"></pre>
                  <div id="ai-conversion-status" class="mt-2 text-xs text-gray-500"></div>
                  <div id="ai-qr" class="mt-4 hidden">
                    <div class="flex items-center justify-between mb-2">
                      <h5 class="text-sm font-semibold text-gray-900">QR Code (scan to view)</h5>
                      <div class="flex space-x-2">
                        <button type="button" onclick="downloadAIQr()" class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200">Download</button>
                        <button type="button" onclick="clearAIQr()" class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200" title="Clear">Clear</button>
                      </div>
                    </div>
                    <img id="ai-qr-image" alt="QR Code" class="border rounded p-2 bg-white max-w-full" />
                    <div id="ai-qr-note" class="mt-2 text-[11px] text-gray-500"></div>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Additional Requirements</h4>
                <p class="text-gray-900 whitespace-pre-wrap">${e.additional_requirements||"None"}</p>
              </div>
            </div>
          `,t&&(t.classList.remove("hidden"),document.body.style.overflow="hidden")}}window.closeCustomizationDetails=function(){const e=document.getElementById("customization-details-modal");e&&(e.classList.add("hidden"),document.body.style.overflow="")};window.convertImagesToTextAI=async function(){try{const e=document.getElementById("customization-details-modal");if(!e||e.classList.contains("hidden")){alert("Please open a customization details modal first to view photos.");return}const o=document.getElementById("ai-conversion-result"),t=document.getElementById("ai-conversion-text"),n=document.getElementById("ai-conversion-status");o&&o.classList.remove("hidden"),n&&(n.textContent="Converting images to text, please wait..."),t&&(t.textContent="");const a=document.getElementById("ai-action-buttons");a&&a.classList.add("hidden");const l=document.getElementById("ai-qr"),s=document.getElementById("ai-qr-image"),i=document.getElementById("ai-qr-note");l&&l.classList.add("hidden"),s&&s.removeAttribute("src"),i&&(i.textContent="");const h=e.querySelector("#photos-grid")||document.getElementById("photos-grid");if(!h){t&&(t.textContent="No photos grid found. Please ensure the customization details modal is open."),n&&(n.textContent="");return}const A=h.querySelectorAll("img"),w=Array.from(A).map(r=>{const u=r.src||r.getAttribute("src")||r.getAttribute("data-src"),g=r.closest("a");return g&&g.href&&!u?g.href:u}).filter(r=>r&&r!=="undefined"&&r!=="null"&&r.trim()!=="");if(w.length===0){t&&(t.textContent="No photos available to convert. Make sure photos are loaded in the modal."),n&&(n.textContent="");return}console.log("Found",w.length,"images to convert:",w),window.Tesseract||(n&&(n.textContent="Loading OCR engine..."),await new Promise((r,u)=>{const g=document.createElement("script");g.src="https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/dist/tesseract.min.js",g.onload=r,g.onerror=u,document.head.appendChild(g)}));const Q=typeof Worker<"u";let v=!1;if(Q&&!window.__tessWorker){n&&(n.textContent="Starting OCR worker...");try{if(window.Tesseract&&window.Tesseract.createWorker&&typeof window.Tesseract.createWorker=="function"){const r=window.Tesseract.createWorker({logger:u=>{n&&(n.textContent=`${u.status}${u.progress?` ${(u.progress*100).toFixed(0)}%`:""}`)},workerPath:"https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/dist/worker.min.js",corePath:"https://cdn.jsdelivr.net/npm/tesseract.js-core@4.0.2/tesseract-core.wasm.js",langPath:"https://tessdata.projectnaptha.com/4.0.0"});if(r&&typeof r.then=="function"){const u=await r;u&&typeof u.loadLanguage=="function"&&(await u.loadLanguage("eng"),await u.initialize("eng"),window.__tessWorker=u,v=!0)}else r&&typeof r.load=="function"?(await r.load(),await r.loadLanguage("eng"),await r.initialize("eng"),window.__tessWorker=r,v=!0):r&&typeof r.loadLanguage=="function"&&(await r.loadLanguage("eng"),await r.initialize("eng"),window.__tessWorker=r,v=!0)}}catch(r){console.warn("Failed to create Tesseract worker, will use recognize API instead:",r),v=!1}}else window.__tessWorker&&(v=!0);if(!v&&(!window.Tesseract||!window.Tesseract.recognize))throw new Error("Tesseract.js not available. Please refresh the page.");const _=[];let J=0;for(let r=0;r<w.length;r++){const u=w[r];try{const g=new Image;g.crossOrigin="anonymous",g.src=u,await new Promise((d,y)=>{g.onload=d,g.onerror=y});const m=Math.min(2e3/Math.max(g.naturalWidth,g.naturalHeight),2.5),F=Math.max(1,Math.round(g.naturalWidth*(m>1?m:1))),P=Math.max(1,Math.round(g.naturalHeight*(m>1?m:1))),p=document.createElement("canvas");p.width=F,p.height=P;const c=p.getContext("2d");c.drawImage(g,0,0,F,P);let x=c.getImageData(0,0,p.width,p.height);const b=x.data;for(let d=0;d<b.length;d+=4){const y=b[d],I=b[d+1],O=b[d+2];let L=.299*y+.587*I+.114*O;L=(L-128)*1.25+128,L=Math.max(0,Math.min(255,L)),b[d]=b[d+1]=b[d+2]=L}c.putImageData(x,0,0);const E=document.createElement("canvas");E.width=p.width,E.height=p.height;const $=E.getContext("2d");$.filter="blur(1.5px)",$.drawImage(p,0,0);const f=c.getImageData(0,0,p.width,p.height),M=$.getImageData(0,0,E.width,E.height),B=c.createImageData(f.width,f.height);for(let d=0;d<f.data.length;d+=4)B.data[d]=Math.min(255,Math.max(0,f.data[d]+1*(f.data[d]-M.data[d]))),B.data[d+1]=Math.min(255,Math.max(0,f.data[d+1]+1*(f.data[d+1]-M.data[d+1]))),B.data[d+2]=Math.min(255,Math.max(0,f.data[d+2]+1*(f.data[d+2]-M.data[d+2]))),B.data[d+3]=f.data[d+3];c.putImageData(B,0,0);let R="";try{const d=p.toDataURL("image/png");if(n&&(n.textContent=`Image ${r+1}: recognizing (preprocessed)...`),v&&window.__tessWorker){const{data:{text:y}}=await window.__tessWorker.recognize(d);R=y||""}else{const{data:{text:y}}=await window.Tesseract.recognize(d,"eng");R=y||""}}catch(d){console.warn("Preprocessed OCR failed, falling back to original URL:",d);try{if(n&&(n.textContent=`Image ${r+1}: recognizing (original URL)...`),v&&window.__tessWorker){const{data:{text:y}}=await window.__tessWorker.recognize(u);R=y||""}else{const{data:{text:y}}=await window.Tesseract.recognize(u,"eng");R=y||""}}catch(y){console.warn("OCR failed on original URL, trying blob fallback:",y);try{const O=await(await fetch(u,{mode:"cors",credentials:"omit"})).blob();if(n&&(n.textContent=`Image ${r+1}: recognizing (blob)...`),v&&window.__tessWorker){const{data:{text:L}}=await window.__tessWorker.recognize(O);R=L||""}else{const{data:{text:L}}=await window.Tesseract.recognize(O,"eng");R=L||""}}catch(I){console.warn("OCR failed on blob fallback:",I),R=""}}}const W=R;if(W&&W.trim()){const y=W.replace(/\r\n/g,`
`).split(`
`).map(I=>I.trim()).filter(I=>I.length>0).map(I=>`• ${I}`).join(`
`);_.push(`Image ${r+1}
${y}`)}}catch(g){console.warn("OCR failed for image:",u,g)}J++,n&&(n.textContent=`Processed ${J}/${w.length} image(s)`)}const S=_.length?_.join(`

`):"";if(console.log("OCR completed. Sections:",_.length,"Combined text length:",S.length),t){t.classList.remove("hidden"),t.style.display="block",t.style.whiteSpace="pre-wrap";const r=S&&S.trim()?S:"No text detected. Try clearer photos or higher contrast images.";t.textContent=r,console.log("Result displayed in area:",r.substring(0,100)+"...")}const Z=document.getElementById("ai-action-buttons");if(Z&&S&&S.trim()&&Z.classList.remove("hidden"),t&&setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"nearest"})},100),S&&S.trim())try{n&&(n.textContent="Generating QR...");let r=e.querySelector("#ai-qr")||document.getElementById("ai-qr"),u=e.querySelector("#ai-qr-image")||document.getElementById("ai-qr-image");const g=e.querySelector("#ai-qr-note")||document.getElementById("ai-qr-note");if((!r||!u)&&(console.warn("QR elements not found in DOM, retrying..."),await new Promise(c=>setTimeout(c,200)),r=e.querySelector("#ai-qr")||document.getElementById("ai-qr"),u=e.querySelector("#ai-qr-image")||document.getElementById("ai-qr-image"),!r||!u)){console.warn("QR elements still not found after retry"),n&&(n.textContent="Done (QR elements not found)");return}let m=S||"";m=m.replace(/https?:\/\/[^\s]+/gi,""),m=m.replace(/www\.[^\s]+/gi,""),m=m.replace(/[^\s]+\.[a-z]{2,}(\/[^\s]*)?/gi,function(c){return c.includes("menu")||c.includes("restaurant")||c.includes("food")?c:""}),[/arun\s+pattnaik/gi,/ux\s+design\s+consultant/gi,/portfolio/gi,/design\s+consultant/gi,/from\s+india/gi,/consultant\s+from/gi,/portfolio\s+website/gi,/visit\s+my\s+website/gi,/check\s+out\s+my\s+portfolio/gi].forEach(c=>{m=m.replace(c,"")}),m=m.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,function(c){return c.includes("restaurant")||c.includes("menu")||c.includes("food")||c.includes("cafe")||c.includes("dining")||c.includes("order")?c:""}),m=m.replace(/@[a-zA-Z0-9_]+/g,""),m=m.replace(/facebook|instagram|twitter|linkedin|youtube/gi,""),m=m.replace(/\n{3,}/g,`

`),m=m.split(`
`).map(c=>c.trim()).filter(c=>{const x=c.toLowerCase();return c.length>0&&!x.includes("portfolio")&&!x.includes("design consultant")&&!x.includes("ux design")&&!x.match(/^[a-z\s]+\s+from\s+[a-z]+$/i)}).join(`
`).trim();const P=m.slice(0,1200);console.log("Cleaned QR text (removed URLs and promotional content):",P.substring(0,100)+"...");let p=null;try{console.log("Generating QR code using online API service...");const x=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(P)}&margin=1&format=png`,b=await fetch(x,{method:"GET",mode:"cors",cache:"no-cache"});if(b.ok){const E=await b.blob();p=await new Promise($=>{const f=new FileReader;f.onloadend=()=>$(f.result),f.onerror=()=>$(null),f.readAsDataURL(E)}),console.log("QR code generated successfully using QR Server API")}else throw new Error("QR API returned error: "+b.status)}catch(c){console.warn("QR Server API failed, trying alternative method:",c);try{const b=`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(P)}`,E=await fetch(b,{method:"GET",mode:"cors",cache:"no-cache"});if(E.ok){const $=await E.blob();p=await new Promise(f=>{const M=new FileReader;M.onloadend=()=>f(M.result),M.onerror=()=>f(null),M.readAsDataURL($)}),console.log("QR code generated successfully using Google Charts API")}else throw new Error("Google Charts API returned error: "+E.status)}catch(x){console.error("All QR generation methods failed:",x),n&&(n.textContent="Done (QR generation failed)");return}}p?(console.log("QR code generated successfully, data URL length:",p.length),console.log("QR elements found:",{qrWrapElement:!!r,qrImgElement:!!u,qrNoteElement:!!g}),u?(u.src=p,u.style.display="block",u.onload=()=>{console.log("QR image loaded successfully"),console.log("QR image dimensions:",u.width,"x",u.height)},u.onerror=c=>{console.error("QR image failed to load:",c)}):console.error("qrImgElement not found!"),r?(r.classList.remove("hidden"),r.style.display="block",console.log("QR wrapper made visible")):console.error("qrWrapElement not found!"),g&&(g.textContent=m.length>P.length?"Note: Text truncated to fit QR capacity.":""),window.__lastAIQrDataUrl=p,console.log("QR code generation and display completed successfully"),r&&r.offsetHeight):(console.error("Failed to generate QR code using all methods"),n&&(n.textContent="Done (QR generation failed)")),n&&(n.textContent="Done")}catch(r){console.error("QR generation failed (but text extraction succeeded):",r),console.error("QR error details:",r.message,r.stack),n&&(n.textContent="Done (QR generation failed)")}else n&&(n.textContent="Done")}catch(e){console.error("AI conversion error:",e),console.error("Error stack:",e.stack);const o=document.getElementById("ai-conversion-text"),t=document.getElementById("ai-conversion-status");o&&(!o.textContent||o.textContent.trim()===""||o.textContent.includes("Error"))?o.textContent="Error converting images: "+(e.message||"Unknown error. Please try again."):o&&o.textContent&&!o.textContent.includes("Error")?(console.log("Results were already displayed, error occurred during QR generation"),t&&(t.textContent="Error during QR generation (but text extracted successfully)")):(o&&(o.textContent="Error converting images. Please try again."),t&&(t.textContent=""))}};window.downloadAIQr=function(){const e=window.__lastAIQrDataUrl;if(!e)return;const o=document.createElement("a");o.href=e,o.download="menu-text-qr.png",document.body.appendChild(o),o.click(),document.body.removeChild(o)};window.copyAIText=function(){const e=document.getElementById("ai-conversion-text");if(!e)return;const o=document.createRange();o.selectNode(e);const t=window.getSelection();t.removeAllRanges(),t.addRange(o);try{document.execCommand("copy")}catch{}t.removeAllRanges()};window.clearAIText=function(){const e=document.getElementById("ai-conversion-text"),o=document.getElementById("ai-conversion-status");e&&(e.textContent=""),o&&(o.textContent="");const t=document.getElementById("ai-action-buttons");t&&t.classList.add("hidden")};window.clearAIQr=function(){const e=document.getElementById("ai-qr"),o=document.getElementById("ai-qr-image"),t=document.getElementById("ai-qr-note");e&&(e.classList.add("hidden"),e.style.display="none"),o&&(o.removeAttribute("src"),o.style.display="none"),t&&(t.textContent=""),window.__lastAIQrDataUrl=null,console.log("QR code cleared")};window.processCustomization=function(e){console.log("Process product customization:",e),alert("Processing customization: "+e)};window.viewPhoto=function(e){console.log("View photo:",e)};window.downloadText=function(e){console.log("Download text for photo:",e)};console.log("🔄 Script loaded - Loading real data...");U();const se="https://lmrrdcaavwwletcjcpqv.supabase.co",ie="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let C=null;function j(){return new Promise(e=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(C=window.supabase,e(C)):window.supabase&&typeof window.supabase.createClient=="function"?(C=window.supabase.createClient(se,ie),e(C)):setTimeout(()=>j().then(e),100)})}async function z(){try{console.log("🔒 MenuOperatorGuard: Checking menu operator access..."),C||await j();const{data:{user:e},error:o}=await C.auth.getUser();if(o){console.error("❌ MenuOperatorGuard: Error getting user:",o),q("Authentication error. Please login again.");return}if(!e){console.log("❌ MenuOperatorGuard: No user logged in"),q("Please login to access menu operator panel");return}console.log("✅ MenuOperatorGuard: User found:",e.email);const{data:t,error:n}=await C.from("profiles").select("role").eq("id",e.id).single();if(n){console.error("❌ MenuOperatorGuard: Error getting profile:",n),q("Error checking user permissions");return}if(t.role!=="menu_operator"){console.log("❌ MenuOperatorGuard: User does not have menu_operator role. Role:",t.role),q("Access denied. Menu operator privileges required.");return}console.log("✅ MenuOperatorGuard: Menu operator access granted for user:",e.email),le()}catch(e){console.error("❌ MenuOperatorGuard: Error checking menu operator access:",e),q("Error checking menu operator access. Please try again.")}}function q(e){const o=document.getElementById("menu-operator-guard");o&&(o.innerHTML=`
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p class="text-gray-600 mb-6">${e}</p>
            <div class="space-x-3">
              <a href="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Go to Login
              </a>
              <a href="/" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Back to Home
              </a>
            </div>
          </div>
        `)}function le(){const e=document.getElementById("menu-operator-guard");if(e){e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.height="0",e.style.overflow="hidden";const o=document.getElementById("menu-operator-admin-layout");o&&(o.classList.remove("hidden"),o.style.display="block",o.style.visibility="visible",o.style.opacity="1",we()),window.dispatchEvent(new CustomEvent("menu-operator-access-granted"))}}async function we(){try{C||await j();const{data:{user:e}}=await C.auth.getUser();if(e){const{data:o}=await C.from("profiles").select("full_name").eq("id",e.id).single(),t=document.getElementById("menu-operator-name");t&&(t.textContent=o?.full_name||e.user_metadata?.full_name||e.email||"Menu Operator");const n=document.getElementById("menu-operator-avatar");if(n){const a=o?.full_name||e.user_metadata?.full_name||e.email||"M";n.textContent=a.charAt(0).toUpperCase()}}}catch(e){console.warn("Could not update menu operator info:",e)}}async function he(e){e&&(e.preventDefault(),e.stopPropagation());try{const t=document.querySelector('[x-data*="open"]');t&&t.__x&&(t.__x.$data.open=!1);const n=document.querySelector("[x-data]");n&&n.__x&&n.__x.$data&&typeof n.__x.$data.open<"u"&&(n.__x.$data.open=!1)}catch(t){console.log("Could not close dropdown programmatically:",t)}if(confirm("Are you sure you want to sign out?"))try{console.log("🚪 Menu operator signing out...");const t=document.getElementById("menu-operator-name"),n=document.getElementById("menu-operator-avatar");t&&(t.textContent="Signing out..."),n&&(n.textContent="...");let a=C;if(a||(a=await j()),!a&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.signOut=="function"?a=window.supabase:typeof window.supabase.createClient=="function"&&(a=window.supabase.createClient(se,ie))),a&&a.auth&&typeof a.auth.signOut=="function")try{await a.auth.signOut(),console.log("✅ Supabase sign out successful")}catch(l){console.warn("⚠️ Supabase sign out error (continuing anyway):",l)}else console.warn("⚠️ Supabase client not available for sign out");sessionStorage.clear(),localStorage.clear(),localStorage.removeItem("supabase-auth-session"),localStorage.removeItem("simple-auth-user"),localStorage.removeItem("simple-auth-session"),sessionStorage.removeItem("simple-auth-session"),sessionStorage.removeItem("simple-auth-user"),window.globalAuthManager&&(window.globalAuthManager.isAuthenticated=!1,window.globalAuthManager.currentUser=null),window.simpleAuthManager&&(window.simpleAuthManager.isAuthenticated=!1,window.simpleAuthManager.currentUser=null),console.log("✅ All storage cleared"),window.dispatchEvent(new CustomEvent("user-logged-out")),await new Promise(l=>setTimeout(l,200)),window.location.href="/login",console.log("✅ Redirecting to login page")}catch(t){console.error("❌ Error during menu operator sign out:",t);try{sessionStorage.clear(),localStorage.clear()}catch(n){console.warn("Error clearing storage:",n)}window.location.href="/login"}}window.handleMenuOperatorSignOut=he;document.addEventListener("DOMContentLoaded",()=>{z()});window.addEventListener("auth-state-changed",z);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",z):z();setTimeout(()=>{const e=document.getElementById("menu-operator-guard");e&&e.style.display!=="none"&&(console.warn("⚠️ Menu operator access check timed out, showing content anyway"),le())},1e4);console.log("MenuOperatorAdminLayout loaded successfully");function ee(){console.log("🔧 Fixing text visibility..."),document.querySelectorAll(".text-white, .text-light, .text-muted").forEach(t=>{(t.style.color==="white"||t.style.color==="#ffffff"||t.style.color==="#fff")&&(t.style.color="#1f2937",t.style.backgroundColor="#f8fafc",t.style.padding="2px 4px",t.style.borderRadius="4px")}),document.querySelectorAll("input, textarea, select").forEach(t=>{(t.style.color==="white"||t.style.color==="#ffffff")&&(t.style.color="#1f2937",t.style.backgroundColor="#ffffff",t.style.border="2px solid #d1d5db")}),console.log("✅ Text visibility fixed!")}function te(){document.body.classList.add("menu-operator-admin-active"),window.hideUserNavbar&&window.hideUserNavbar(),document.addEventListener("click",function(e){const o=e.target.closest('a[href="/"]');o&&o.textContent.includes("Back to Site")&&(console.log('🔄 Menu Operator clicked "Back to Site" - preparing to show user navbar'),document.body.classList.remove("menu-operator-admin-active"),setTimeout(()=>{window.showUserNavbar&&(window.showUserNavbar(),console.log("✅ User navbar shown after delay"))},50))}),window.addEventListener("beforeunload",function(){window.location.pathname.startsWith("/menu-operator")||(document.body.classList.remove("menu-operator-admin-active"),window.showUserNavbar&&window.showUserNavbar())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",function(){ee(),te()}):(ee(),te());(function(){document.documentElement.classList.add("menu-operator-admin-active"),document.body.classList.add("menu-operator-admin-active");function e(){const o=document.querySelector("header");o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.height="0",o.style.maxHeight="0",o.style.overflow="hidden",o.style.position="absolute",o.style.top="-9999px",o.style.left="-9999px",o.style.zIndex="-9999",o.style.pointerEvents="none",o.style.transform="translateY(-100vh)",o.style.transition="none",o.style.animation="none")}e(),document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",e),setTimeout(e,0),setTimeout(e,10),setTimeout(e,50)})();
