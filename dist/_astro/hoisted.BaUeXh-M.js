import{supabaseUrl as z,supabase as c,supabaseAnonKey as D}from"./supabase.BGdfjNZd.js";import"./ProductDialog.astro_astro_type_script_index_0_lang.C1LHbjNP.js";import"https://unpkg.com/@supabase/supabase-js@2";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./index.BFAZBQoJ.js";console.log("🔧 Supabase configuration (shared client):");console.log("- URL:",z);console.log("- Key:","Present");let A=null;function G(){return Promise.resolve(c)}document.addEventListener("DOMContentLoaded",async()=>{console.log("📄 DOM Content Loaded - Starting Menu Operator Dashboard initialization"),console.log("🔄 UPDATED: Product Customizations Dashboard Loading..."),Z(),await L()});window.addEventListener("load",()=>{console.log("🔄 Window loaded - Ensuring dashboard is ready"),document.getElementById("customizations-table-body").innerHTML.includes("Loading")&&L()});window.showProductBrowser=function(){console.log("🔄 Showing product browser...");const e=document.getElementById("product-browser-modal"),o=document.getElementById("products-grid"),t=j();o.innerHTML=V(t),e.classList.remove("hidden")};window.closeProductBrowser=function(){document.getElementById("product-browser-modal").classList.add("hidden")};window.selectProduct=function(e){console.log("🔄 Product selected:",e),closeProductBrowser(),showCustomizationForm(e)};window.showCustomizationForm=function(e){console.log("🔄 Showing customization form for product:",e);const o=document.getElementById("customization-form-modal"),t=document.getElementById("customization-form-content"),n=R(e);t.innerHTML=Q(n),o.classList.remove("hidden")};window.closeCustomizationForm=function(){document.getElementById("customization-form-modal").classList.add("hidden")};document.addEventListener("submit",function(e){e.target.id==="customization-form"&&(e.preventDefault(),J(e.target))});function J(e){const o=new FormData(e),t=Object.fromEntries(o.entries());console.log("🔄 Submitting customization form:",t);const n=e.dataset.productId||"unknown",a=R(n),r={...t,product_name:a.name,product_id:n,status:"pending",created_at:new Date().toISOString()};console.log("📝 Customization data to save:",r),alert("Customization request submitted successfully! We will contact you soon."),closeCustomizationForm(),setTimeout(()=>{window.location.reload()},1e3)}function j(){return[{id:"restaurant-menu-system",name:"Restaurant Menu System",description:"Digital menu system with QR code ordering",price:"Starting from $2,500",image:"/images/restaurant-menu.jpg",features:["QR Code Ordering","Real-time Updates","Multi-language Support"]},{id:"android-tv-app",name:"Android TV App",description:"Custom Android TV application for streaming",price:"Starting from $5,500",image:"/images/android-tv.jpg",features:["Custom UI/UX","Content Management","Multi-platform Support"]},{id:"restaurant-website",name:"Restaurant Website",description:"Professional website with online ordering",price:"Starting from $3,000",image:"/images/restaurant-website.jpg",features:["Online Ordering","Menu Management","SEO Optimized"]},{id:"streaming-mobile-app",name:"Streaming Mobile App",description:"Cross-platform mobile app for content streaming",price:"Starting from $4,500",image:"/images/mobile-app.jpg",features:["iOS & Android","Live Streaming","User Management"]},{id:"order-menu-system",name:"Order Menu System",description:"Complete ordering system for restaurants",price:"Starting from $3,500",image:"/images/order-system.jpg",features:["Order Management","Payment Integration","Analytics"]},{id:"e-commerce-platform",name:"E-commerce Platform",description:"Full-featured online store platform",price:"Starting from $6,000",image:"/images/ecommerce.jpg",features:["Product Catalog","Payment Gateway","Inventory Management"]}]}function R(e){const o=j();return o.find(t=>t.id===e)||o[0]}function V(e){return`
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
    `}function Q(e){return`
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
    `}async function L(){try{if(console.log("🔄 Loading real data from Supabase..."),!await G())return;await X();const o=await W(),t=await q();console.log("🔄 Real data fetched - Customizations:",o?.length||0,"Photos:",t?.length||0),window.__all_customizations=o||[],I(window.__all_customizations),T(t||[]),M(o||[],t||[])}catch(e){console.warn("⚠️ Error loading real data:",e.message),I([]),T([]),M([])}}async function W(){try{if(console.log("🔄 Attempting to load from order_customizations table..."),console.log("🔄 Supabase client status:",c?"Available":"Not available"),!c)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");console.log("🔄 Executing Supabase query (order_customizations)...");let{data:e,error:o}=await c.from("order_customizations").select("*").order("created_at",{ascending:!1}).limit(50);if((o||!e)&&(console.warn("⚠️ Supabase query error/empty, trying REST fallback:",o?.message),e=await Y("order_customizations")),console.log("🔄 Supabase query completed. Data:",e,"Error:",o),o)throw console.error("❌ Supabase error:",o),o;return console.log("✅ Loaded customizations from order_customizations:",e?.length||0),console.log("🔄 Sample data:",e?.[0]||"No data"),e||[]}catch(e){throw console.error("❌ Error loading real product customizations from product_customizations:",e),e}}async function q(){try{if(console.log("🔄 Attempting to load from menu_photos table..."),!c)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");const{data:e,error:o}=await c.from("order_customizations").select("id, created_at, menu_photos_urls").order("created_at",{ascending:!1}).limit(50);if(o)return console.warn("⚠️ order_customizations select for photos failed:",o.message),[];const t=[];return(e||[]).forEach(n=>{let a=n.menu_photos_urls;if(a){try{typeof a=="string"&&(a=JSON.parse(a))}catch{a=[]}Array.isArray(a)&&a.forEach(r=>{t.push({id:`${n.id}-${r.path||r.filename||Math.random().toString(36).slice(2)}`,photo_url:r.url||r.publicUrl||null,original_filename:r.filename||"menu-photo",conversion_status:"completed",file_size:r.size||null,created_at:n.created_at})})}}),console.log("✅ Derived photos from order_customizations:",t.length),t}catch(e){throw console.error("❌ Error loading real menu photos:",e),e}}async function Y(e){try{const{data:o}=await c.auth.getSession(),t=o?.session?.access_token||o?.access_token||"",n=`${z}/rest/v1/${e}?select=*`,a=await fetch(n,{headers:{apikey:D,...t?{Authorization:`Bearer ${t}`}:{}}});if(!a.ok){const r=await a.text();return console.warn("REST fallback failed:",a.status,r),[]}return await a.json()}catch(o){return console.warn("REST fallback exception:",o),[]}}async function N(e,o){try{const{data:t}=await c.auth.getSession(),n=t?.session?.access_token||t?.access_token||"",a=`${z}/rest/v1/${e}?id=eq.${encodeURIComponent(o)}&select=*`,r=await fetch(a,{headers:{apikey:D,...n?{Authorization:`Bearer ${n}`}:{}}});if(!r.ok){const i=await r.text();return console.warn("REST by id failed:",r.status,i),null}const s=await r.json();return Array.isArray(s)&&s.length?s[0]:null}catch(t){return console.warn("REST by id exception:",t),null}}function K(e,o){return Promise.race([e,new Promise(t=>setTimeout(()=>t(null),o))])}function I(e){console.log("🔄 Displaying customizations:",e?.length||0);const o=document.getElementById("customizations-table-body");if(!o){console.error("❌ Table body not found! Looking for: customizations-table-body"),console.log("Available elements:",document.querySelectorAll('[id*="table"]'));return}if(!e||e.length===0){console.log("⚠️ No customizations to display - showing empty state"),o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No product customizations found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}o.innerHTML=e.map(t=>`
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
    `).join(""),console.log("✅ Customizations table updated with",e.length,"items")}function T(e){const o=document.getElementById("photos-table-body");if(o){if(!e||e.length===0){console.log("⚠️ No photos to display - showing empty state"),o.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No photos found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}o.innerHTML=e.map(t=>`
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
        `).join("")}}function M(e,o){const t=document.getElementById("total-customizations"),n=document.getElementById("pending-customizations"),a=document.getElementById("in-progress-customizations"),r=document.getElementById("completed-customizations");if(t&&(t.textContent=e.length),n){const s=e.filter(i=>i.status==="pending"||i.status==="new").length;n.textContent=s}if(a){const s=e.filter(i=>i.status==="in_progress"||i.status==="processing").length;a.textContent=s}if(r){const s=e.filter(i=>i.status==="completed"||i.status==="processed").length;r.textContent=s}}async function X(){try{if(typeof window.supabase>"u"){console.error("Supabase client not available");return}const e=window.supabase,{data:{user:o},error:t}=await e.auth.getUser();if(t||!o){console.error("Error getting user:",t),window.location.href="/login";return}A=o,console.log("🔍 Loading profile for user:",o.email);const{data:n,error:a}=await e.from("profiles").select("*").eq("id",o.id).eq("role","menu_operator").single();if(a){console.error("Error loading profile:",a);const{data:r,error:s}=await e.from("profiles").select("*").eq("id",o.id).single();if(s){console.error("Error loading fallback profile:",s),window.location.href="/login";return}if(console.log("🔍 Fallback profile loaded:",r),console.log("🔍 Role value from database:",JSON.stringify(r.role)),!r.role||r.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",r.role),r.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...");return}if(console.log("🔍 Profile loaded:",n),console.log("🔍 Role value from database:",JSON.stringify(n.role)),!n.role||n.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",n.role),n.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...")}catch(e){console.error("Error loading user profile:",e)}}function Z(){const e=document.getElementById("refresh-customizations");e&&e.addEventListener("click",async()=>{console.log("🔄 Manual refresh of product customizations triggered"),await L();const a=document.getElementById("search-email");a&&(a.value="")});const o=document.getElementById("search-email");if(o){const a=()=>{const r=(o.value||"").toLowerCase().trim(),s=window.__all_customizations||[];if(!r){I(s),M(s);return}const i=s.filter(p=>(p.email||"").toLowerCase().includes(r));I(i),M(i)};o.addEventListener("input",a),o.addEventListener("change",a)}const t=document.getElementById("refresh-photos");t&&t.addEventListener("click",async()=>{console.log("🔄 Manual refresh of photos triggered"),await L()});const n=document.getElementById("photo-upload-input");n&&n.addEventListener("change",ee)}async function ee(e){const o=e.target.files[0];if(o){if(!o.type.startsWith("image/")){alert("Please select an image file");return}if(o.size>10*1024*1024){alert("File size must be less than 10MB");return}try{const t=o.name.split(".").pop(),n=`${A.id}/${Date.now()}.${t}`,{data:a,error:r}=await c.storage.from("menu-photos").upload(n,o);if(r)throw r;const{data:{publicUrl:s}}=c.storage.from("menu-photos").getPublicUrl(n),{data:i,error:p}=await c.from("menu_photos").insert({user_id:A.id,photo_url:s,original_filename:o.name,file_size:o.size,mime_type:o.type,conversion_status:"pending"});if(p)throw p;await q(),e.target.value="",alert("Photo uploaded successfully!")}catch(t){console.error("Upload error:",t),alert("Error uploading file: "+t.message)}}}window.viewCustomization=async function(e){document.getElementById("customization-details-modal")?.classList.remove("hidden");const t=document.getElementById("customization-details-content");t&&(t.innerHTML='<p class="text-gray-500">Loading details...</p>'),console.log("🔄 Loading product customization details for:",e);try{let n=null,a=null;const r=(async()=>{try{return(await c.from("order_customizations").select("*").eq("id",e).single()).data||null}catch{return null}})(),s=N("order_customizations",e);if(n=await K(Promise.any([r,s]),2500),n||(n=await N("order_customizations",e)),!n){console.warn("No customization found for id:",e),i&&(i.innerHTML='<p class="text-gray-500">No details found for this customization.</p>');return}const i=document.getElementById("customization-details-content");if(i){const p=n.house_flat_number||n.houseNumber||"",w=n.address_line_1||n.addressLine1||"",S=n.city||"",f=n.state||"",x=n.pincode||"",d=n.country||"",u=n.restaurant_name||n.restaurantName||n.restaurant||n.restaurant_title||n.project_name||"";let m=n.menu_photos_urls||[];try{typeof m=="string"&&(m=JSON.parse(m))}catch{}const b=Array.isArray(m)&&m.length?`<div id="photos-grid" class="grid grid-cols-3 sm:grid-cols-4 gap-3">${m.map(y=>`
                <a href="${y.url||y.publicUrl}" target="_blank" class="block">
                  <img src="${y.url||y.publicUrl}" crossorigin="anonymous" alt="${y.filename||"menu photo"}" class="w-20 h-20 object-cover rounded border"/>
                  <p class="mt-1 text-xs text-gray-500 truncate">${y.filename||""}</p>
                </a>
              `).join("")}</div>`:'<p class="text-gray-500">No menu photos uploaded</p>',v=n.restaurant_logo_url?`<img src="${n.restaurant_logo_url}" alt="Logo" class="w-20 h-20 object-cover rounded border"/>`:'<span class="text-gray-500">Not uploaded</span>';i.innerHTML=`
            <div class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Product</h4>
                  <p class="text-gray-900">${n.product_name||"Order Menu System"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${n.status==="completed"||n.status==="processed"?"bg-green-100 text-green-800":n.status==="in_progress"||n.status==="processing"?"bg-yellow-100 text-yellow-800":n.status==="pending"||n.status==="pending_payment"||n.status==="submitted"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">${n.status||"pending"}</div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Project Name</h4>
                  <p class="text-gray-900">${n.project_name||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Restaurant Name</h4>
                  <p class="text-gray-900">${u||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Amounts</h4>
                  <p class="text-gray-900">Base: ₹${(n.base_package_cost||0).toLocaleString("en-IN")} · GST: ₹${(n.gst_amount||0).toLocaleString("en-IN")} · Total: ₹${(n.total_amount||0).toLocaleString("en-IN")}</p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Owner Name</h4>
                  <p class="text-gray-900">${n.owner_name||"-"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Contact Person</h4>
                  <p class="text-gray-900">${n.contact_person||n.owner_name||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Email</h4>
                  <p class="text-gray-900">${n.email||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                  <p class="text-gray-900">${n.phone_number||n.phone||"Not provided"}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Created</h4>
                  <p class="text-gray-900">${new Date(n.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Address</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500">House / Flat Number</p>
                    <p class="text-gray-900">${p||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Address Line 1</p>
                    <p class="text-gray-900">${w||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">City</p>
                    <p class="text-gray-900">${S||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">State</p>
                    <p class="text-gray-900">${f||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Pincode</p>
                    <p class="text-gray-900">${x||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Country</p>
                    <p class="text-gray-900">${d||"-"}</p>
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
                ${b}
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
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Additional Requirements</h4>
                <p class="text-gray-900 whitespace-pre-wrap">${n.additional_requirements||"None"}</p>
              </div>
            </div>
          `,document.getElementById("customization-details-modal")?.classList.remove("hidden")}}catch(n){console.error("Error viewing product customization details:",n);const a=document.getElementById("customization-details-content");a&&(a.innerHTML='<p class="text-red-600">Error loading details. Please try again.</p>')}};window.closeCustomizationDetails=function(){const e=document.getElementById("customization-details-modal");e&&e.classList.add("hidden")};window.convertImagesToTextAI=async function(){try{const e=document.getElementById("ai-conversion-result"),o=document.getElementById("ai-conversion-text"),t=document.getElementById("ai-conversion-status");e&&e.classList.remove("hidden"),t&&(t.textContent="Converting images to text, please wait..."),o&&(o.textContent="");const n=document.getElementById("ai-action-buttons");n&&n.classList.add("hidden");const a=document.getElementById("photos-grid"),r=a?a.querySelectorAll("img"):[],s=Array.from(r).map(f=>f.src).filter(Boolean);if(s.length===0){o&&(o.textContent="No photos available to convert."),t&&(t.textContent="");return}window.Tesseract||await new Promise((f,x)=>{const d=document.createElement("script");d.src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",d.onload=f,d.onerror=x,document.head.appendChild(d)});const i=[];let p=0;for(let f=0;f<s.length;f++){const x=s[f];try{const d=new Image;d.crossOrigin="anonymous",d.src=x,await new Promise((l,$)=>{d.onload=l,d.onerror=$});const u=document.createElement("canvas");u.width=d.naturalWidth,u.height=d.naturalHeight;const m=u.getContext("2d");m.drawImage(d,0,0);const b=document.createElement("canvas");b.width=u.width,b.height=u.height;const v=b.getContext("2d");v.filter="blur(1.5px)",v.drawImage(u,0,0);const g=m.getImageData(0,0,u.width,u.height),y=v.getImageData(0,0,b.width,b.height),_=m.createImageData(g.width,g.height);for(let l=0;l<g.data.length;l+=4)_.data[l]=Math.min(255,Math.max(0,g.data[l]+1*(g.data[l]-y.data[l]))),_.data[l+1]=Math.min(255,Math.max(0,g.data[l+1]+1*(g.data[l+1]-y.data[l+1]))),_.data[l+2]=Math.min(255,Math.max(0,g.data[l+2]+1*(g.data[l+2]-y.data[l+2]))),_.data[l+3]=g.data[l+3];m.putImageData(_,0,0);const F=u.toDataURL("image/png"),{data:{text:P}}=await window.Tesseract.recognize(F,"eng");if(P&&P.trim()){const $=P.replace(/\r\n/g,`
`).split(`
`).map(E=>E.trim()).filter(E=>E.length>0).map(E=>`• ${E}`).join(`
`);i.push(`Image ${f+1}
${$}`)}}catch(d){console.warn("OCR failed for image:",x,d)}p++,t&&(t.textContent=`Processed ${p}/${s.length} image(s)`)}const w=i.length?i.join(`

`):"No text detected. Try clearer photos or higher contrast images.";o&&(o.textContent=w);const S=document.getElementById("ai-action-buttons");S&&w&&w.trim()&&S.classList.remove("hidden"),t&&(t.textContent="Done")}catch(e){console.error("AI conversion error:",e);const o=document.getElementById("ai-conversion-text"),t=document.getElementById("ai-conversion-status");o&&(o.textContent="Error converting images. Please try again."),t&&(t.textContent="")}};window.copyAIText=function(){const e=document.getElementById("ai-conversion-text");if(!e)return;const o=document.createRange();o.selectNode(e);const t=window.getSelection();t.removeAllRanges(),t.addRange(o);try{document.execCommand("copy")}catch{}t.removeAllRanges()};window.clearAIText=function(){const e=document.getElementById("ai-conversion-text"),o=document.getElementById("ai-conversion-status");e&&(e.textContent=""),o&&(o.textContent="");const t=document.getElementById("ai-action-buttons");t&&t.classList.add("hidden")};window.processCustomization=function(e){console.log("Process product customization:",e),alert("Processing customization: "+e)};window.viewPhoto=function(e){console.log("View photo:",e)};window.downloadText=function(e){console.log("Download text for photo:",e)};console.log("🔄 Script loaded - Loading real data...");L();const te="https://lmrrdcaavwwletcjcpqv.supabase.co",oe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let h=null;function B(){return new Promise(e=>{window.supabase?(h=window.supabase.createClient(te,oe),e(h)):setTimeout(()=>B().then(e),100)})}async function k(){try{console.log("🔒 MenuOperatorGuard: Checking menu operator access..."),h||await B();const{data:{user:e},error:o}=await h.auth.getUser();if(o){console.error("❌ MenuOperatorGuard: Error getting user:",o),C("Authentication error. Please login again.");return}if(!e){console.log("❌ MenuOperatorGuard: No user logged in"),C("Please login to access menu operator panel");return}console.log("✅ MenuOperatorGuard: User found:",e.email);const{data:t,error:n}=await h.from("profiles").select("role").eq("id",e.id).single();if(n){console.error("❌ MenuOperatorGuard: Error getting profile:",n),C("Error checking user permissions");return}if(t.role!=="menu_operator"){console.log("❌ MenuOperatorGuard: User does not have menu_operator role. Role:",t.role),C("Access denied. Menu operator privileges required.");return}console.log("✅ MenuOperatorGuard: Menu operator access granted for user:",e.email),H()}catch(e){console.error("❌ MenuOperatorGuard: Error checking menu operator access:",e),C("Error checking menu operator access. Please try again.")}}function C(e){const o=document.getElementById("menu-operator-guard");o&&(o.innerHTML=`
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
        `)}function H(){const e=document.getElementById("menu-operator-guard");if(e){e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.height="0",e.style.overflow="hidden";const o=document.getElementById("menu-operator-admin-layout");o&&(o.classList.remove("hidden"),o.style.display="block",o.style.visibility="visible",o.style.opacity="1",ne()),window.dispatchEvent(new CustomEvent("menu-operator-access-granted"))}}async function ne(){try{h||await B();const{data:{user:e}}=await h.auth.getUser();if(e){const{data:o}=await h.from("profiles").select("full_name").eq("id",e.id).single(),t=document.getElementById("menu-operator-name");t&&(t.textContent=o?.full_name||e.user_metadata?.full_name||e.email||"Menu Operator");const n=document.getElementById("menu-operator-avatar");if(n){const a=o?.full_name||e.user_metadata?.full_name||e.email||"M";n.textContent=a.charAt(0).toUpperCase()}}}catch(e){console.warn("Could not update menu operator info:",e)}}async function ae(){try{console.log("Menu operator signing out..."),h||await B(),await h.auth.signOut(),sessionStorage.clear(),localStorage.removeItem("supabase-auth-session"),window.location.href="/"}catch(e){console.error("Error during menu operator sign out:",e),window.location.href="/"}}window.handleMenuOperatorSignOut=ae;document.addEventListener("DOMContentLoaded",k);window.addEventListener("auth-state-changed",k);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",k):k();setTimeout(()=>{const e=document.getElementById("menu-operator-guard");e&&e.style.display!=="none"&&(console.warn("⚠️ Menu operator access check timed out, showing content anyway"),H())},1e4);console.log("MenuOperatorAdminLayout loaded successfully");function O(){console.log("🔧 Fixing text visibility..."),document.querySelectorAll(".text-white, .text-light, .text-muted").forEach(t=>{(t.style.color==="white"||t.style.color==="#ffffff"||t.style.color==="#fff")&&(t.style.color="#1f2937",t.style.backgroundColor="#f8fafc",t.style.padding="2px 4px",t.style.borderRadius="4px")}),document.querySelectorAll("input, textarea, select").forEach(t=>{(t.style.color==="white"||t.style.color==="#ffffff")&&(t.style.color="#1f2937",t.style.backgroundColor="#ffffff",t.style.border="2px solid #d1d5db")}),console.log("✅ Text visibility fixed!")}function U(){document.body.classList.add("menu-operator-admin-active"),window.hideUserNavbar&&window.hideUserNavbar(),document.addEventListener("click",function(e){const o=e.target.closest('a[href="/"]');o&&o.textContent.includes("Back to Site")&&(console.log('🔄 Menu Operator clicked "Back to Site" - preparing to show user navbar'),document.body.classList.remove("menu-operator-admin-active"),setTimeout(()=>{window.showUserNavbar&&(window.showUserNavbar(),console.log("✅ User navbar shown after delay"))},50))}),window.addEventListener("beforeunload",function(){window.location.pathname.startsWith("/menu-operator")||(document.body.classList.remove("menu-operator-admin-active"),window.showUserNavbar&&window.showUserNavbar())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",function(){O(),U()}):(O(),U());(function(){document.documentElement.classList.add("menu-operator-admin-active"),document.body.classList.add("menu-operator-admin-active");function e(){const o=document.querySelector("header");o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.height="0",o.style.maxHeight="0",o.style.overflow="hidden",o.style.position="absolute",o.style.top="-9999px",o.style.left="-9999px",o.style.zIndex="-9999",o.style.pointerEvents="none",o.style.transform="translateY(-100vh)",o.style.transition="none",o.style.animation="none")}e(),document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",e),setTimeout(e,0),setTimeout(e,10),setTimeout(e,50)})();
