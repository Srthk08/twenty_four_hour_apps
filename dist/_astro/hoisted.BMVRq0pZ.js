import{supabaseUrl as k,supabaseAnonKey as T,supabase as $}from"./supabase.DFVW9e3y.js";import"./ProductDialog.astro_astro_type_script_index_0_lang.CpUg5vNK.js";import"https://unpkg.com/@supabase/supabase-js@2";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./index.BymsOcZI.js";import"./preload-helper.CLcXU_4U.js";console.log("🔧 Supabase configuration (shared client):");console.log("- URL:",k);console.log("- Key:","Present");let C=null,g=null;async function m(e=20,o=100){if(g)return g;for(let t=0;t<e;t++){if(window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function")return g=window.supabase,g;await new Promise(n=>setTimeout(n,o))}return $&&$.auth?(g=$,g):(console.error("Supabase client not available after waiting"),null)}document.addEventListener("DOMContentLoaded",async()=>{console.log("📄 DOM Content Loaded - Starting Menu Operator Dashboard initialization"),console.log("🔄 UPDATED: Product Customizations Dashboard Loading..."),m().then(e=>{e&&console.log("✅ Supabase client pre-loaded and cached")}),K(),await b()});window.addEventListener("load",()=>{console.log("🔄 Window loaded - Ensuring dashboard is ready"),document.getElementById("customizations-table-body").innerHTML.includes("Loading")&&b()});window.showProductBrowser=function(){console.log("🔄 Showing product browser...");const e=document.getElementById("product-browser-modal"),o=document.getElementById("products-grid"),t=q();o.innerHTML=J(t),document.body.style.overflow="hidden",e.classList.remove("hidden")};window.closeProductBrowser=function(){document.getElementById("product-browser-modal").classList.add("hidden"),document.body.style.overflow=""};window.selectProduct=function(e){console.log("🔄 Product selected:",e),closeProductBrowser(),showCustomizationForm(e)};window.showCustomizationForm=function(e){console.log("🔄 Showing customization form for product:",e);const o=document.getElementById("customization-form-modal"),t=document.getElementById("customization-form-content"),n=U(e);t.innerHTML=G(n),document.body.style.overflow="hidden",o.classList.remove("hidden")};window.closeCustomizationForm=function(){document.getElementById("customization-form-modal").classList.add("hidden"),document.body.style.overflow=""};document.addEventListener("submit",function(e){e.target.id==="customization-form"&&(e.preventDefault(),F(e.target))});function F(e){const o=new FormData(e),t=Object.fromEntries(o.entries());console.log("🔄 Submitting customization form:",t);const n=e.dataset.productId||"unknown",r=U(n),a={...t,product_name:r.name,product_id:n,status:"pending",created_at:new Date().toISOString()};console.log("📝 Customization data to save:",a),alert("Customization request submitted successfully! We will contact you soon."),closeCustomizationForm(),setTimeout(()=>{window.location.reload()},1e3)}function q(){return[{id:"restaurant-menu-system",name:"Restaurant Menu System",description:"Digital menu system with QR code ordering",price:"Starting from $2,500",image:"/images/restaurant-menu.jpg",features:["QR Code Ordering","Real-time Updates","Multi-language Support"]},{id:"android-tv-app",name:"Android TV App",description:"Custom Android TV application for streaming",price:"Starting from $5,500",image:"/images/android-tv.jpg",features:["Custom UI/UX","Content Management","Multi-platform Support"]},{id:"restaurant-website",name:"Restaurant Website",description:"Professional website with online ordering",price:"Starting from $3,000",image:"/images/restaurant-website.jpg",features:["Online Ordering","Menu Management","SEO Optimized"]},{id:"streaming-mobile-app",name:"Streaming Mobile App",description:"Cross-platform mobile app for content streaming",price:"Starting from $4,500",image:"/images/mobile-app.jpg",features:["iOS & Android","Live Streaming","User Management"]},{id:"order-menu-system",name:"Order Menu System",description:"Complete ordering system for restaurants",price:"Starting from $3,500",image:"/images/order-system.jpg",features:["Order Management","Payment Integration","Analytics"]},{id:"e-commerce-platform",name:"E-commerce Platform",description:"Full-featured online store platform",price:"Starting from $6,000",image:"/images/ecommerce.jpg",features:["Product Catalog","Payment Gateway","Inventory Management"]}]}function U(e){const o=q();return o.find(t=>t.id===e)||o[0]}function J(e){return`
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
    `}function G(e){return`
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
    `}async function b(){try{console.log("🔄 Loading real data from Supabase...");const e=await m();if(!e){console.warn("⚠️ Supabase not ready, skipping real data load");return}await Y();const o=await V(e),t=await R(e);console.log("🔄 Real data fetched - Customizations:",o?.length||0,"Photos:",t?.length||0),window.__all_customizations=o||[],v(window.__all_customizations),B(t||[]),_(o||[],t||[])}catch(e){console.warn("⚠️ Error loading real data:",e.message),v([]),B([]),_([])}}async function V(e=null){try{console.log("🔄 Attempting to load from order_customizations table...");const o=e||await m();if(!o)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");console.log("🔄 Supabase client status: Available"),console.log("🔄 Executing Supabase query (order_customizations)...");let{data:t,error:n}=await o.from("order_customizations").select("*").order("created_at",{ascending:!1}).limit(50);if((n||!t)&&(console.warn("⚠️ Supabase query error/empty, trying REST fallback:",n?.message),t=await Q("order_customizations",o)),console.log("🔄 Supabase query completed. Data:",t,"Error:",n),n)throw console.error("❌ Supabase error:",n),n;return console.log("✅ Loaded customizations from order_customizations:",t?.length||0),console.log("🔄 Sample data:",t?.[0]||"No data"),t||[]}catch(o){throw console.error("❌ Error loading real product customizations from product_customizations:",o),o}}async function R(e=null){try{console.log("🔄 Attempting to load from menu_photos table...");const o=e||await m();if(!o)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");const{data:t,error:n}=await o.from("order_customizations").select("id, created_at, menu_photos_urls").order("created_at",{ascending:!1}).limit(50);if(n)return console.warn("⚠️ order_customizations select for photos failed:",n.message),[];const r=[];return(t||[]).forEach(a=>{let s=a.menu_photos_urls;if(console.log("🔍 Processing row:",a.id,"menu_photos_urls type:",typeof s,"value:",s),!s){console.log("⚠️ No menu_photos_urls for row:",a.id);return}try{typeof s=="string"&&(console.log("📝 Parsing JSON string for row:",a.id),s=JSON.parse(s))}catch(i){console.error("❌ Failed to parse JSON for row:",a.id,i),s=[]}console.log("🔍 Parsed items for row:",a.id,"type:",typeof s,"isArray:",Array.isArray(s),"length:",Array.isArray(s)?s.length:"N/A"),Array.isArray(s)?s.forEach((i,l)=>{console.log(`🔍 Processing photo ${l+1} for row ${a.id}:`,i,"type:",typeof i);const c=typeof i=="string"?i:i.url||i.publicUrl||null,d=typeof i=="string"?"menu-photo":i.filename||"menu-photo",L=typeof i=="object"&&i.path||null,x=typeof i=="object"&&i.size||null;console.log(`🔍 Extracted photo data: url=${c}, filename=${d}`),c?(r.push({id:`${a.id}-${L||d||Math.random().toString(36).slice(2)}`,photo_url:c,original_filename:d,conversion_status:"completed",file_size:x,created_at:a.created_at}),console.log(`✅ Added photo to array: ${c}`)):console.warn("⚠️ Skipped photo (no URL):",i)}):console.warn("⚠️ menu_photos_urls is not an array for row:",a.id,"type:",typeof s)}),console.log("✅ Derived photos from order_customizations:",r.length),console.log("📸 Photos array:",r),r}catch(o){throw console.error("❌ Error loading real menu photos:",o),o}}async function Q(e,o=null){try{const t=o||await m();if(!t||!t.auth)throw new Error("Supabase client not available");const{data:n}=await t.auth.getSession(),r=n?.session?.access_token||n?.access_token||"",a=`${k}/rest/v1/${e}?select=*`,s=await fetch(a,{headers:{apikey:T,...r?{Authorization:`Bearer ${r}`}:{}}});if(!s.ok){const i=await s.text();return console.warn("REST fallback failed:",s.status,i),[]}return await s.json()}catch(t){return console.warn("REST fallback exception:",t),[]}}async function A(e,o,t=null){try{const n=t||await m();if(!n||!n.auth)throw new Error("Supabase client not available");const{data:r}=await n.auth.getSession(),a=r?.session?.access_token||r?.access_token||"",s=`${k}/rest/v1/${e}?id=eq.${encodeURIComponent(o)}&select=*`,i=await fetch(s,{headers:{apikey:T,...a?{Authorization:`Bearer ${a}`}:{}}});if(!i.ok){const c=await i.text();return console.warn("REST by id failed:",i.status,c),null}const l=await i.json();return Array.isArray(l)&&l.length?l[0]:null}catch(n){return console.warn("REST by id exception:",n),null}}function v(e){console.log("🔄 Displaying customizations:",e?.length||0);const o=document.getElementById("customizations-table-body");if(!o){console.error("❌ Table body not found! Looking for: customizations-table-body"),console.log("Available elements:",document.querySelectorAll('[id*="table"]'));return}if(!e||e.length===0){console.log("⚠️ No customizations to display - showing empty state"),o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No product customizations found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}o.innerHTML=e.map(t=>`
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
    `).join(""),console.log("✅ Customizations table updated with",e.length,"items")}function B(e){const o=document.getElementById("photos-table-body");if(o){if(!e||e.length===0){console.log("⚠️ No photos to display - showing empty state"),o.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No photos found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}o.innerHTML=e.map(t=>`
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
        `).join("")}}function _(e,o){const t=document.getElementById("total-customizations"),n=document.getElementById("pending-customizations"),r=document.getElementById("in-progress-customizations"),a=document.getElementById("completed-customizations");if(t&&(t.textContent=e.length),n){const s=e.filter(i=>i.status==="pending"||i.status==="new").length;n.textContent=s}if(r){const s=e.filter(i=>i.status==="in_progress"||i.status==="processing").length;r.textContent=s}if(a){const s=e.filter(i=>i.status==="completed"||i.status==="processed").length;a.textContent=s}}async function Y(){try{const e=await m();if(!e||!e.auth||typeof e.auth.getUser!="function"){console.error("Supabase client not available");return}const{data:{user:o},error:t}=await e.auth.getUser();if(t||!o){console.error("Error getting user:",t),window.location.href="/login";return}C=o,console.log("🔍 Loading profile for user:",o.email);const{data:n,error:r}=await e.from("profiles").select("*").eq("id",o.id).eq("role","menu_operator").single();if(r){console.error("Error loading profile:",r);const{data:a,error:s}=await e.from("profiles").select("*").eq("id",o.id).single();if(s){console.error("Error loading fallback profile:",s),window.location.href="/login";return}if(console.log("🔍 Fallback profile loaded:",a),console.log("🔍 Role value from database:",JSON.stringify(a.role)),!a.role||a.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",a.role),a.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...");return}if(console.log("🔍 Profile loaded:",n),console.log("🔍 Role value from database:",JSON.stringify(n.role)),!n.role||n.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",n.role),n.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...")}catch(e){console.error("Error loading user profile:",e)}}function K(){const e=document.getElementById("refresh-customizations");e&&e.addEventListener("click",async()=>{console.log("🔄 Manual refresh of product customizations triggered"),await b();const r=document.getElementById("search-email");r&&(r.value="")});const o=document.getElementById("search-email");if(o){const r=()=>{const a=(o.value||"").toLowerCase().trim(),s=window.__all_customizations||[];if(!a){v(s),_(s);return}const i=s.filter(l=>(l.email||"").toLowerCase().includes(a));v(i),_(i)};o.addEventListener("input",r),o.addEventListener("change",r)}const t=document.getElementById("refresh-photos");t&&t.addEventListener("click",async()=>{console.log("🔄 Manual refresh of photos triggered"),await b()});const n=document.getElementById("photo-upload-input");n&&n.addEventListener("change",W)}async function W(e){const o=e.target.files[0];if(o){if(!o.type.startsWith("image/")){alert("Please select an image file");return}if(o.size>10*1024*1024){alert("File size must be less than 10MB");return}try{const t=o.name.split(".").pop(),n=`${C.id}/${Date.now()}.${t}`,r=await m();if(!r||!r.storage)throw new Error("Supabase client not available");const{data:a,error:s}=await r.storage.from("menu-photos").upload(n,o);if(s)throw s;const{data:{publicUrl:i}}=r.storage.from("menu-photos").getPublicUrl(n),{data:l,error:c}=await r.from("menu_photos").insert({user_id:C.id,photo_url:i,original_filename:o.name,file_size:o.size,mime_type:o.type,conversion_status:"pending"});if(c)throw c;const d=await m();await R(d),e.target.value="",alert("Photo uploaded successfully!")}catch(t){console.error("Upload error:",t),alert("Error uploading file: "+t.message)}}}window.viewCustomization=async function(e){const o=document.getElementById("customization-details-modal");document.body.style.overflow="hidden",o?.classList.remove("hidden");const t=document.getElementById("customization-details-content");t&&(t.innerHTML='<p class="text-gray-500">Loading details...</p>'),console.log("🔄 Loading product customization details for:",e);try{let n=null;if(window.__all_customizations&&Array.isArray(window.__all_customizations)&&(n=window.__all_customizations.find(i=>i.id===e),n)){console.log("✅ Found customization in cache, using cached data"),P(n,t,o);return}console.log("📡 Customization not in cache, fetching from database...");const r=g||await m(),a=(async()=>{try{return r&&(await r.from("order_customizations").select("*").eq("id",e).single()).data||null}catch{return null}})(),s=A("order_customizations",e,r);if(n=await Promise.race([Promise.any([a,s]),new Promise((i,l)=>setTimeout(()=>l(new Error("Timeout")),1500))]).catch(()=>null),n||(n=await A("order_customizations",e,r)),!n){console.warn("No customization found for id:",e),t&&(t.innerHTML='<p class="text-gray-500">No details found for this customization.</p>');return}P(n,t,o)}catch(n){console.error("Error viewing product customization details:",n);const r=document.getElementById("customization-details-content");r&&(r.innerHTML='<p class="text-red-600">Error loading details. Please try again.</p>')}};function P(e,o,t){if(o){const n=e.house_flat_number||e.houseNumber||"",r=e.address_line_1||e.addressLine1||"",a=e.city||"",s=e.state||"",i=e.pincode||"",l=e.country||"",c=e.restaurant_name||e.restaurantName||e.restaurant||e.restaurant_title||e.project_name||"";let d=e.menu_photos_urls||[];try{typeof d=="string"&&(d=JSON.parse(d))}catch{}const L=Array.isArray(d)&&d.length?`<div id="photos-grid" class="grid grid-cols-3 sm:grid-cols-4 gap-3">${d.map((f,I)=>{const y=typeof f=="string"?f:f.url||f.publicUrl||"",h=typeof f=="string"?"menu-photo":(f.filename||"").replace(/"/g,"&quot;");return y?`
                <div data-image-url="${y.replace(/"/g,"&quot;")}" class="image-view-trigger block cursor-pointer hover:opacity-80 transition-opacity">
                  <img src="${y}" crossorigin="anonymous" alt="${h||"menu photo"}" class="w-20 h-20 object-cover rounded border"/>
                  <p class="mt-1 text-xs text-gray-500 truncate">${h}</p>
                </div>
              `:""}).filter(Boolean).join("")}</div>`:'<p class="text-gray-500">No menu photos uploaded</p>',x=e.restaurant_logo_url||"",H=e.restaurant_logo_url?`<div data-image-url="${x.replace(/"/g,"&quot;")}" class="image-view-trigger inline-block cursor-pointer hover:opacity-80 transition-opacity">
                <img src="${x}" alt="Logo" class="w-20 h-20 object-cover rounded border"/>
              </div>`:'<span class="text-gray-500">Not uploaded</span>';o.innerHTML=`
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
                  <p class="text-gray-900">${c||"Not provided"}</p>
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
                    <p class="text-gray-900">${r||"-"}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">City</p>
                    <p class="text-gray-900">${a||"-"}</p>
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
                    <p class="text-gray-900">${l||"-"}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Restaurant Logo</h4>
                ${H}
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-500">Menu Photos</h4>
                </div>
                ${L}
                
                <!-- Manual Menu Conversion Form -->
                <div class="mt-6 border-t pt-6">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-sm font-medium text-gray-500">Manual Menu Conversion</h4>
                    <button type="button" onclick="addMenuRow()" class="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
                      + Add Item
                    </button>
                  </div>
                  
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 border border-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase w-16">SR.NO</th>
                          <th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">CATEGORIES</th>
                          <th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">NAME</th>
                          <th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase w-32">PRICE</th>
                          <th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase w-24">QUANTITY</th>
                          <th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase w-20">ACTION</th>
                        </tr>
                      </thead>
                      <tbody id="menu-items-table-body" class="bg-white divide-y divide-gray-200">
                        <!-- Menu items will be added here dynamically -->
                      </tbody>
                    </table>
                  </div>
                  
                  <div class="mt-4 flex justify-end space-x-3">
                    <button type="button" onclick="saveMenuItems('${e.id}')" class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      Save Menu Items
                    </button>
                    <button type="button" onclick="clearMenuItems()" class="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors">
                      Clear All
                    </button>
                  </div>
                  
                  <div id="menu-save-status" class="mt-2 text-sm"></div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Additional Requirements</h4>
                <p class="text-gray-900 whitespace-pre-wrap break-words overflow-wrap-anywhere">${e.additional_requirements||"None"}</p>
              </div>
            </div>
          `,t&&(t.classList.remove("hidden"),document.body.style.overflow="hidden"),setTimeout(()=>{o.querySelectorAll(".image-view-trigger").forEach(I=>{I.addEventListener("click",function(y){y.preventDefault(),y.stopPropagation();const h=this.getAttribute("data-image-url")||this.getAttribute("href");h&&openImageModal(h)})}),X(e.id)},100)}}window.closeCustomizationDetails=function(){const e=document.getElementById("customization-details-modal");e&&(e.classList.add("hidden"),document.body.style.overflow="")};window.openImageModal=function(e){console.log("🖼️ Opening image modal for:",e);const o=document.getElementById("image-modal"),t=document.getElementById("image-modal-img");o&&t&&e?(t.src=e,t.onerror=function(){console.error("❌ Failed to load image:",e),closeImageModal()},document.body.style.overflow="hidden",o.classList.remove("hidden")):console.error("❌ Image modal elements not found or invalid URL")};window.closeImageModal=function(){const e=document.getElementById("image-modal");if(e){e.classList.add("hidden"),document.body.style.overflow="";const o=document.getElementById("image-modal-img");o&&(o.src="")}};document.addEventListener("keydown",function(e){if(e.key==="Escape"){const o=document.getElementById("image-modal");o&&!o.classList.contains("hidden")&&closeImageModal()}});document.addEventListener("click",function(e){const o=document.getElementById("image-modal");o&&!o.classList.contains("hidden")&&e.target===o&&closeImageModal()});let u=0;window.addMenuRow=function(){const e=document.getElementById("menu-items-table-body");if(!e)return;u++;const o=document.createElement("tr");o.className="hover:bg-gray-50",o.id=`menu-row-${u}`,o.innerHTML=`
        <td class="px-3 py-2 text-sm text-gray-900">${u}</td>
        <td class="px-3 py-2">
          <input type="text" class="menu-category w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Appetizers" />
        </td>
        <td class="px-3 py-2">
          <input type="text" class="menu-name w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Item name" />
        </td>
        <td class="px-3 py-2">
          <input type="number" step="0.01" min="0" class="menu-price w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
        </td>
        <td class="px-3 py-2">
          <input type="number" min="0" class="menu-quantity w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
        </td>
        <td class="px-3 py-2">
          <button type="button" onclick="removeMenuRow('menu-row-${u}')" class="text-red-600 hover:text-red-800 text-sm">
            Remove
          </button>
        </td>
      `,e.appendChild(o),E()};window.removeMenuRow=function(e){const o=document.getElementById(e);o&&(o.remove(),E())};function E(){const e=document.getElementById("menu-items-table-body");if(!e)return;e.querySelectorAll("tr").forEach((t,n)=>{const r=t.querySelector("td:first-child");r&&(r.textContent=n+1)})}window.clearMenuItems=function(){const e=document.getElementById("menu-items-table-body");e&&(e.innerHTML="",u=0);const o=document.getElementById("menu-save-status");o&&(o.textContent="")};window.saveMenuItems=async function(e){const o=document.getElementById("menu-items-table-body"),t=document.getElementById("menu-save-status");if(!o||!e){t&&(t.innerHTML='<span class="text-red-600">Error: Missing customization ID</span>');return}const n=o.querySelectorAll("tr");if(n.length===0){t&&(t.innerHTML='<span class="text-yellow-600">No menu items to save. Add items first.</span>');return}const r=[];if(n.forEach((a,s)=>{const i=a.querySelector(".menu-category")?.value?.trim()||"",l=a.querySelector(".menu-name")?.value?.trim()||"",c=parseFloat(a.querySelector(".menu-price")?.value)||0,d=parseInt(a.querySelector(".menu-quantity")?.value)||0;l&&r.push({sr_no:s+1,category:i,name:l,price:c,quantity:d})}),r.length===0){t&&(t.innerHTML='<span class="text-yellow-600">Please enter at least one menu item with a name.</span>');return}try{t&&(t.innerHTML='<span class="text-blue-600">Saving menu items...</span>');const a=g||await m();if(!a)throw new Error("Supabase client not available");const{data:s,error:i}=await a.from("order_customizations").update({menu_items:JSON.stringify(r),updated_at:new Date().toISOString()}).eq("id",e).select();if(i)throw i;t&&(t.innerHTML=`<span class="text-green-600">✓ Menu items saved successfully! (${r.length} items)</span>`),console.log("Menu items saved:",r),setTimeout(()=>{t&&(t.textContent="")},3e3)}catch(a){console.error("Error saving menu items:",a),t&&(t.innerHTML=`<span class="text-red-600">Error saving menu items: ${a.message}</span>`)}};function X(e){if(!e)return;const o=document.getElementById("menu-items-table-body");if(o){if(o.innerHTML="",u=0,window.__all_customizations&&Array.isArray(window.__all_customizations)){const t=window.__all_customizations.find(n=>n.id===e);if(t&&t.menu_items)try{const n=typeof t.menu_items=="string"?JSON.parse(t.menu_items):t.menu_items;if(Array.isArray(n)&&n.length>0){n.forEach((r,a)=>{u++;const s=document.createElement("tr");s.className="hover:bg-gray-50",s.id=`menu-row-${u}`,s.innerHTML=`
                  <td class="px-3 py-2 text-sm text-gray-900">${r.sr_no||a+1}</td>
                  <td class="px-3 py-2">
                    <input type="text" class="menu-category w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${(r.category||"").replace(/"/g,"&quot;")}" placeholder="e.g., Appetizers" />
                  </td>
                  <td class="px-3 py-2">
                    <input type="text" class="menu-name w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${(r.name||"").replace(/"/g,"&quot;")}" placeholder="Item name" />
                  </td>
                  <td class="px-3 py-2">
                    <input type="number" step="0.01" min="0" class="menu-price w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${r.price||0}" placeholder="0.00" />
                  </td>
                  <td class="px-3 py-2">
                    <input type="number" min="0" class="menu-quantity w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${r.quantity||0}" placeholder="0" />
                  </td>
                  <td class="px-3 py-2">
                    <button type="button" onclick="removeMenuRow('menu-row-${u}')" class="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </td>
                `,o.appendChild(s)}),E();return}}catch(n){console.warn("Error parsing menu items from cache:",n)}}(async()=>{try{const t=g||await m();if(!t)return;const{data:n,error:r}=await t.from("order_customizations").select("menu_items").eq("id",e).single();if(r||!n||!n.menu_items)return;const a=typeof n.menu_items=="string"?JSON.parse(n.menu_items):n.menu_items;Array.isArray(a)&&a.length>0&&(a.forEach((s,i)=>{u++;const l=document.createElement("tr");l.className="hover:bg-gray-50",l.id=`menu-row-${u}`,l.innerHTML=`
                <td class="px-3 py-2 text-sm text-gray-900">${s.sr_no||i+1}</td>
                <td class="px-3 py-2">
                  <input type="text" class="menu-category w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${(s.category||"").replace(/"/g,"&quot;")}" placeholder="e.g., Appetizers" />
                </td>
                <td class="px-3 py-2">
                  <input type="text" class="menu-name w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${(s.name||"").replace(/"/g,"&quot;")}" placeholder="Item name" />
                </td>
                <td class="px-3 py-2">
                  <input type="number" step="0.01" min="0" class="menu-price w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${s.price||0}" placeholder="0.00" />
                </td>
                <td class="px-3 py-2">
                  <input type="number" min="0" class="menu-quantity w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${s.quantity||0}" placeholder="0" />
                </td>
                <td class="px-3 py-2">
                  <button type="button" onclick="removeMenuRow('menu-row-${u}')" class="text-red-600 hover:text-red-800 text-sm">
                    Remove
                  </button>
                </td>
              `,o.appendChild(l)}),E())}catch(t){console.warn("Error loading menu items from database:",t)}})()}}window.processCustomization=function(e){console.log("Process product customization:",e),alert("Processing customization: "+e)};window.viewPhoto=function(e){console.log("View photo:",e)};window.downloadText=function(e){console.log("Download text for photo:",e)};console.log("🔄 Script loaded - Loading real data...");b();const D="https://lmrrdcaavwwletcjcpqv.supabase.co",j="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let p=null;function M(){return new Promise(e=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(p=window.supabase,e(p)):window.supabase&&typeof window.supabase.createClient=="function"?(p=window.supabase.createClient(D,j),e(p)):setTimeout(()=>M().then(e),100)})}async function S(){try{console.log("🔒 MenuOperatorGuard: Checking menu operator access..."),p||await M();const{data:{user:e},error:o}=await p.auth.getUser();if(o){console.error("❌ MenuOperatorGuard: Error getting user:",o),w("Authentication error. Please login again.");return}if(!e){console.log("❌ MenuOperatorGuard: No user logged in"),w("Please login to access menu operator panel");return}console.log("✅ MenuOperatorGuard: User found:",e.email);const{data:t,error:n}=await p.from("profiles").select("role").eq("id",e.id).single();if(n){console.error("❌ MenuOperatorGuard: Error getting profile:",n),w("Error checking user permissions");return}if(t.role!=="menu_operator"){console.log("❌ MenuOperatorGuard: User does not have menu_operator role. Role:",t.role),w("Access denied. Menu operator privileges required.");return}console.log("✅ MenuOperatorGuard: Menu operator access granted for user:",e.email),z()}catch(e){console.error("❌ MenuOperatorGuard: Error checking menu operator access:",e),w("Error checking menu operator access. Please try again.")}}function w(e){const o=document.getElementById("menu-operator-guard");o&&(o.innerHTML=`
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
        `)}function z(){const e=document.getElementById("menu-operator-guard");if(e){e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.height="0",e.style.overflow="hidden";const o=document.getElementById("menu-operator-admin-layout");o&&(o.classList.remove("hidden"),o.style.display="block",o.style.visibility="visible",o.style.opacity="1",Z()),window.dispatchEvent(new CustomEvent("menu-operator-access-granted"))}}async function Z(){try{p||await M();const{data:{user:e}}=await p.auth.getUser();if(e){const{data:o}=await p.from("profiles").select("full_name").eq("id",e.id).single(),t=document.getElementById("menu-operator-name");t&&(t.textContent=o?.full_name||e.user_metadata?.full_name||e.email||"Menu Operator");const n=document.getElementById("menu-operator-avatar");if(n){const r=o?.full_name||e.user_metadata?.full_name||e.email||"M";n.textContent=r.charAt(0).toUpperCase()}}}catch(e){console.warn("Could not update menu operator info:",e)}}function ee(){return new Promise(e=>{const o=document.getElementById("logout-confirmation-modal"),t=document.getElementById("logout-confirm-btn"),n=document.getElementById("logout-cancel-btn");if(!o||!t||!n){console.error("Logout modal elements not found"),e(!1);return}o.classList.remove("hidden"),document.body.style.overflow="hidden";const r=()=>{o.classList.add("hidden"),document.body.style.overflow="",t.removeEventListener("click",r),n.removeEventListener("click",a),e(!0)},a=()=>{o.classList.add("hidden"),document.body.style.overflow="",t.removeEventListener("click",r),n.removeEventListener("click",a),e(!1)};t.addEventListener("click",r),n.addEventListener("click",a);const s=i=>{i.target===o&&(o.classList.add("hidden"),document.body.style.overflow="",o.removeEventListener("click",s),t.removeEventListener("click",r),n.removeEventListener("click",a),e(!1))};o.addEventListener("click",s)})}async function te(e){e&&(e.preventDefault(),e.stopPropagation());try{const t=document.querySelector('[x-data*="open"]');t&&t.__x&&(t.__x.$data.open=!1);const n=document.querySelector("[x-data]");n&&n.__x&&n.__x.$data&&typeof n.__x.$data.open<"u"&&(n.__x.$data.open=!1)}catch(t){console.log("Could not close dropdown programmatically:",t)}if(await ee())try{console.log("🚪 Menu operator signing out...");const t=document.getElementById("menu-operator-name"),n=document.getElementById("menu-operator-avatar");t&&(t.textContent="Signing out..."),n&&(n.textContent="...");let r=p;if(r||(r=await M()),!r&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.signOut=="function"?r=window.supabase:typeof window.supabase.createClient=="function"&&(r=window.supabase.createClient(D,j))),r&&r.auth&&typeof r.auth.signOut=="function")try{await r.auth.signOut(),console.log("✅ Supabase sign out successful")}catch(a){console.warn("⚠️ Supabase sign out error (continuing anyway):",a)}else console.warn("⚠️ Supabase client not available for sign out");sessionStorage.clear(),localStorage.clear(),localStorage.removeItem("supabase-auth-session"),localStorage.removeItem("simple-auth-user"),localStorage.removeItem("simple-auth-session"),sessionStorage.removeItem("simple-auth-session"),sessionStorage.removeItem("simple-auth-user"),window.globalAuthManager&&(window.globalAuthManager.isAuthenticated=!1,window.globalAuthManager.currentUser=null),window.simpleAuthManager&&(window.simpleAuthManager.isAuthenticated=!1,window.simpleAuthManager.currentUser=null),console.log("✅ All storage cleared"),window.dispatchEvent(new CustomEvent("user-logged-out")),await new Promise(a=>setTimeout(a,200)),window.location.href="/login",console.log("✅ Redirecting to login page")}catch(t){console.error("❌ Error during menu operator sign out:",t);try{sessionStorage.clear(),localStorage.clear()}catch(n){console.warn("Error clearing storage:",n)}window.location.href="/login"}}window.handleMenuOperatorSignOut=te;document.addEventListener("DOMContentLoaded",()=>{S()});window.addEventListener("auth-state-changed",S);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",S):S();setTimeout(()=>{const e=document.getElementById("menu-operator-guard");e&&e.style.display!=="none"&&(console.warn("⚠️ Menu operator access check timed out, showing content anyway"),z())},1e4);console.log("MenuOperatorAdminLayout loaded successfully");function N(){console.log("🔧 Fixing text visibility..."),document.querySelectorAll(".text-white, .text-light, .text-muted").forEach(t=>{(t.style.color==="white"||t.style.color==="#ffffff"||t.style.color==="#fff")&&(t.style.color="#1f2937",t.style.backgroundColor="#f8fafc",t.style.padding="2px 4px",t.style.borderRadius="4px")}),document.querySelectorAll("input, textarea, select").forEach(t=>{(t.style.color==="white"||t.style.color==="#ffffff")&&(t.style.color="#1f2937",t.style.backgroundColor="#ffffff",t.style.border="2px solid #d1d5db")}),console.log("✅ Text visibility fixed!")}function O(){document.body.classList.add("menu-operator-admin-active"),window.hideUserNavbar&&window.hideUserNavbar(),document.addEventListener("click",function(e){const o=e.target.closest('a[href="/"]');o&&o.textContent.includes("Back to Site")&&(console.log('🔄 Menu Operator clicked "Back to Site" - preparing to show user navbar'),document.body.classList.remove("menu-operator-admin-active"),setTimeout(()=>{window.showUserNavbar&&(window.showUserNavbar(),console.log("✅ User navbar shown after delay"))},50))}),window.addEventListener("beforeunload",function(){window.location.pathname.startsWith("/menu-operator")||(document.body.classList.remove("menu-operator-admin-active"),window.showUserNavbar&&window.showUserNavbar())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",function(){N(),O()}):(N(),O());(function(){document.documentElement.classList.add("menu-operator-admin-active"),document.body.classList.add("menu-operator-admin-active");function e(){const o=document.querySelector("header");o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.height="0",o.style.maxHeight="0",o.style.overflow="hidden",o.style.position="absolute",o.style.top="-9999px",o.style.left="-9999px",o.style.zIndex="-9999",o.style.pointerEvents="none",o.style.transform="translateY(-100vh)",o.style.transition="none",o.style.animation="none")}e(),document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",e),setTimeout(e,0),setTimeout(e,10),setTimeout(e,50)})();
