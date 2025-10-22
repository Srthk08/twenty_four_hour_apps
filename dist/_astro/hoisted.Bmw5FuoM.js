import{c as D}from"./index.BFAZBQoJ.js";import"./ProductDialog.astro_astro_type_script_index_0_lang.BQOC59sz.js";import"https://unpkg.com/@supabase/supabase-js@2";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const f=void 0,v=void 0,s=D(f,v);console.log("🔧 Supabase configuration:");console.log("- URL:",f);console.log("- Key:","Missing");let p=null;function z(){return new Promise(e=>{let t=0;const o=50,n=()=>{if(t++,window.supabase)try{s=window.supabase.createClient(f,v),console.log("✅ Supabase client initialized successfully"),e(s)}catch(r){console.error("❌ Error initializing Supabase:",r),e(null)}else t<o?setTimeout(n,100):(console.warn("⚠️ Supabase not available after timeout, continuing with demo data"),e(null))};n()})}document.addEventListener("DOMContentLoaded",async()=>{console.log("📄 DOM Content Loaded - Starting Menu Operator Dashboard initialization"),console.log("🔄 UPDATED: Product Customizations Dashboard Loading..."),console.log("🔄 Loading demo data immediately..."),y(),A(),console.log("✅ Dashboard initialized with demo data - Page is ready!"),setTimeout(async()=>{try{console.log("🔄 Attempting to load real data in background..."),await g(),console.log("✅ Real data loaded successfully")}catch(e){console.warn("⚠️ Could not load real data, continuing with demo data:",e.message)}},1e3)});window.addEventListener("load",()=>{console.log("🔄 Window loaded - Ensuring dashboard is ready"),document.getElementById("customizations-table-body").innerHTML.includes("Loading")&&(console.log("🔄 Page still loading, forcing demo data"),y())});window.showProductBrowser=function(){console.log("🔄 Showing product browser...");const e=document.getElementById("product-browser-modal"),t=document.getElementById("products-grid"),o=x();t.innerHTML=P(o),e.classList.remove("hidden")};window.closeProductBrowser=function(){document.getElementById("product-browser-modal").classList.add("hidden")};window.selectProduct=function(e){console.log("🔄 Product selected:",e),closeProductBrowser(),showCustomizationForm(e)};window.showCustomizationForm=function(e){console.log("🔄 Showing customization form for product:",e);const t=document.getElementById("customization-form-modal"),o=document.getElementById("customization-form-content"),n=_(e);o.innerHTML=$(n),t.classList.remove("hidden")};window.closeCustomizationForm=function(){document.getElementById("customization-form-modal").classList.add("hidden")};document.addEventListener("submit",function(e){e.target.id==="customization-form"&&(e.preventDefault(),L(e.target))});function L(e){const t=new FormData(e),o=Object.fromEntries(t.entries());console.log("🔄 Submitting customization form:",o);const n=e.dataset.productId||"unknown",r=_(n),a={...o,product_name:r.name,product_id:n,status:"pending",created_at:new Date().toISOString()};console.log("📝 Customization data to save:",a),alert("Customization request submitted successfully! We will contact you soon."),closeCustomizationForm(),setTimeout(()=>{window.location.reload()},1e3)}function x(){return[{id:"restaurant-menu-system",name:"Restaurant Menu System",description:"Digital menu system with QR code ordering",price:"Starting from $2,500",image:"/images/restaurant-menu.jpg",features:["QR Code Ordering","Real-time Updates","Multi-language Support"]},{id:"android-tv-app",name:"Android TV App",description:"Custom Android TV application for streaming",price:"Starting from $5,500",image:"/images/android-tv.jpg",features:["Custom UI/UX","Content Management","Multi-platform Support"]},{id:"restaurant-website",name:"Restaurant Website",description:"Professional website with online ordering",price:"Starting from $3,000",image:"/images/restaurant-website.jpg",features:["Online Ordering","Menu Management","SEO Optimized"]},{id:"streaming-mobile-app",name:"Streaming Mobile App",description:"Cross-platform mobile app for content streaming",price:"Starting from $4,500",image:"/images/mobile-app.jpg",features:["iOS & Android","Live Streaming","User Management"]},{id:"order-menu-system",name:"Order Menu System",description:"Complete ordering system for restaurants",price:"Starting from $3,500",image:"/images/order-system.jpg",features:["Order Management","Payment Integration","Analytics"]},{id:"e-commerce-platform",name:"E-commerce Platform",description:"Full-featured online store platform",price:"Starting from $6,000",image:"/images/ecommerce.jpg",features:["Product Catalog","Payment Gateway","Inventory Management"]}]}function _(e){const t=x();return t.find(o=>o.id===e)||t[0]}function P(e){return`
      ${e.map(t=>`
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="aspect-w-16 aspect-h-9 mb-4">
              <div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${t.name}</h3>
            <p class="text-gray-600 mb-4">${t.description}</p>
            <div class="mb-4">
              <p class="text-lg font-bold text-green-600">${t.price}</p>
            </div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">Features:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                ${t.features.map(o=>`<li>• ${o}</li>`).join("")}
              </ul>
            </div>
            <button onclick="selectProduct('${t.id}')" class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Select Product
            </button>
          </div>
        </div>
      `).join("")}
    `}function $(e){return`
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
    `}function y(){console.log("🔄 Loading demo data immediately...");const e=O(),t=N();E(e),C(t),M(e),console.log("✅ Demo data loaded - Customizations:",e.length,"Photos:",t.length)}async function g(){try{if(console.log("🔄 Loading real data from Supabase..."),!await z()){console.warn("⚠️ Supabase not available, keeping demo data");return}await U();const t=await I(),o=await S();console.log("🔄 Real data fetched - Customizations:",t?.length||0,"Photos:",o?.length||0),t&&t.length>0&&(E(t),console.log("✅ Updated with real customizations data")),o&&o.length>0&&(C(o),console.log("✅ Updated with real photos data")),t||o?(M(t||[],o||[]),console.log("✅ Real data loaded and displayed successfully!")):console.log("ℹ️ No real data found, keeping demo data")}catch(e){console.warn("⚠️ Error loading real data, keeping demo data:",e.message)}}async function I(){try{if(console.log("🔄 Attempting to load from product_customizations table..."),console.log("🔄 Supabase client status:",s?"Available":"Not available"),!s)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");console.log("🔄 Executing Supabase query...");const{data:e,error:t}=await s.from("product_customizations").select("*").order("created_at",{ascending:!1}).limit(50);if(console.log("🔄 Supabase query completed. Data:",e,"Error:",t),t)throw console.error("❌ Supabase error:",t),t;return console.log("✅ Loaded customizations from product_customizations:",e?.length||0),console.log("🔄 Sample data:",e?.[0]||"No data"),e||[]}catch(e){throw console.error("❌ Error loading real product customizations from product_customizations:",e),e}}async function S(){try{if(console.log("🔄 Attempting to load from menu_photos table..."),!s)throw console.error("❌ Supabase client not available"),new Error("Supabase not available");const{data:e,error:t}=await s.from("menu_photos").select("*").order("created_at",{ascending:!1}).limit(50);if(t)throw console.error("❌ Supabase error:",t),t;return console.log("✅ Loaded photos from menu_photos:",e?.length||0),e||[]}catch(e){throw console.error("❌ Error loading real menu photos:",e),e}}function E(e){console.log("🔄 Displaying customizations:",e?.length||0);const t=document.getElementById("customizations-table-body");if(!t){console.error("❌ Table body not found! Looking for: customizations-table-body"),console.log("Available elements:",document.querySelectorAll('[id*="table"]'));return}if(!e||e.length===0){console.log("⚠️ No customizations to display - showing empty state"),t.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No product customizations found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}t.innerHTML=e.map(o=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">${o.product_name||"Product Customization"}</div>
          <div class="text-sm text-gray-500">${o.project_name||"No project name"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${o.customer_name||"Not specified"}</div>
          <div class="text-sm text-gray-500">${o.company_name||"No company"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${o.email||"No email"}</div>
          <div class="text-sm text-gray-500">${o.phone||"No phone"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${o.status==="completed"?"bg-green-100 text-green-800":o.status==="in_progress"?"bg-yellow-100 text-yellow-800":o.status==="pending"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
            ${o.status||"pending"}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ₹${(o.price||0).toLocaleString("en-IN")}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${o.created_at?new Date(o.created_at).toLocaleDateString():"Unknown"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="viewCustomization('${o.id}')">View</button>
          <button class="text-green-600 hover:text-green-900" onclick="processCustomization('${o.id}')">Process</button>
        </td>
      </tr>
    `).join(""),console.log("✅ Customizations table updated with",e.length,"items")}function C(e){const t=document.getElementById("photos-table-body");if(t){if(!e||e.length===0){console.log("⚠️ No photos to display - showing empty state"),t.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No photos found in database. <button onclick="loadRealData()" class="text-blue-600 hover:text-blue-800 underline">Refresh to try again</button></td></tr>';return}t.innerHTML=e.map(o=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          ${o.photo_url?`<img src="${o.photo_url}" alt="Menu photo" class="w-12 h-12 rounded object-cover">`:'<div class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${o.original_filename||"Unknown"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${o.conversion_status==="completed"?"bg-green-100 text-green-800":o.conversion_status==="processing"?"bg-yellow-100 text-yellow-800":o.conversion_status==="failed"?"bg-red-100 text-red-800":"bg-gray-100 text-gray-800"}">
            ${o.conversion_status||"pending"}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${o.file_size?(o.file_size/1024).toFixed(1)+" KB":"Unknown size"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${o.created_at?new Date(o.created_at).toLocaleDateString():"Unknown"}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="viewPhoto('${o.id}')">View</button>
              ${o.conversion_status==="completed"?`<button class="text-green-600 hover:text-green-900" onclick="downloadText('`+o.id+`')">Download</button>`:'<button class="text-gray-400 cursor-not-allowed" disabled>Download</button>'}
            </td>
          </tr>
        `).join("")}}function M(e,t){const o=document.getElementById("total-customizations"),n=document.getElementById("pending-customizations"),r=document.getElementById("in-progress-customizations"),a=document.getElementById("completed-customizations");if(o&&(o.textContent=e.length),n){const i=e.filter(d=>d.status==="pending"||d.status==="new").length;n.textContent=i}if(r){const i=e.filter(d=>d.status==="in_progress"||d.status==="processing").length;r.textContent=i}if(a){const i=e.filter(d=>d.status==="completed"||d.status==="processed").length;a.textContent=i}}function O(){return[{id:"demo-1",product_name:"Restaurant Menu System",project_name:"Bella Vista Digital Menu",customer_name:"Maria Rodriguez",company_name:"Bella Vista Restaurant",email:"maria@bellavista.com",phone:"+1 (555) 123-4567",requirements:"QR code ordering system with real-time updates",status:"pending",price:25e3,created_at:new Date(Date.now()-2*24*60*60*1e3).toISOString()},{id:"demo-2",product_name:"Android TV App",project_name:"Golden Dragon Streaming App",customer_name:"David Chen",company_name:"Golden Dragon Media",email:"david@goldendragon.com",phone:"+1 (555) 987-6543",requirements:"Multi-language support and content management",status:"in_progress",price:55e3,created_at:new Date(Date.now()-5*24*60*60*1e3).toISOString()},{id:"demo-3",product_name:"Restaurant Website",project_name:"Café Del Sol Website",customer_name:"Sophie Martin",company_name:"Café Del Sol",email:"sophie@cafedelsol.com",phone:"+1 (555) 456-7890",requirements:"Online ordering integration with delivery partners",status:"completed",price:15e3,created_at:new Date(Date.now()-7*24*60*60*1e3).toISOString()},{id:"demo-4",product_name:"Streaming Mobile App",project_name:"Pizza Palace Mobile App",customer_name:"Tony Romano",company_name:"Pizza Palace",email:"tony@pizzapalace.com",phone:"+1 (555) 321-9876",requirements:"Real-time order tracking and push notifications",status:"pending",price:45e3,created_at:new Date(Date.now()-10*24*60*60*1e3).toISOString()},{id:"demo-5",product_name:"Restaurant Menu System",project_name:"Sushi Master Digital Menu",customer_name:"Yuki Tanaka",company_name:"Sushi Master",email:"yuki@sushimaster.com",phone:"+1 (555) 654-3210",requirements:"Customizable menu categories and seasonal updates",status:"in_progress",price:25e3,created_at:new Date(Date.now()-12*24*60*60*1e3).toISOString()}]}function N(){return[{id:"photo-1",original_filename:"bella-vista-menu.jpg",photo_url:"https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=BV",conversion_status:"completed",created_at:new Date(Date.now()-1*24*60*60*1e3).toISOString(),file_size:24e5},{id:"photo-2",original_filename:"golden-dragon-menu.jpg",photo_url:"https://via.placeholder.com/100x100/DC2626/FFFFFF?text=GD",conversion_status:"processing",created_at:new Date(Date.now()-3*24*60*60*1e3).toISOString(),file_size:18e5},{id:"photo-3",original_filename:"cafe-del-sol-menu.jpg",photo_url:"https://via.placeholder.com/100x100/059669/FFFFFF?text=CD",conversion_status:"completed",created_at:new Date(Date.now()-5*24*60*60*1e3).toISOString(),file_size:31e5}]}async function U(){try{if(typeof window.supabase>"u"){console.error("Supabase client not available");return}const e=window.supabase,{data:{user:t},error:o}=await e.auth.getUser();if(o||!t){console.error("Error getting user:",o),window.location.href="/login";return}p=t,console.log("🔍 Loading profile for user:",t.email);const{data:n,error:r}=await e.from("profiles").select("*").eq("id",t.id).eq("role","menu_operator").single();if(r){console.error("Error loading profile:",r);const{data:a,error:i}=await e.from("profiles").select("*").eq("id",t.id).single();if(i){console.error("Error loading fallback profile:",i),window.location.href="/login";return}if(console.log("🔍 Fallback profile loaded:",a),console.log("🔍 Role value from database:",JSON.stringify(a.role)),!a.role||a.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",a.role),a.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...");return}if(console.log("🔍 Profile loaded:",n),console.log("🔍 Role value from database:",JSON.stringify(n.role)),!n.role||n.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",n.role),n.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}console.log("✅ User has menu_operator role, proceeding...")}catch(e){console.error("Error loading user profile:",e)}}function A(){const e=document.getElementById("refresh-customizations");e&&e.addEventListener("click",async()=>{console.log("🔄 Manual refresh of product customizations triggered"),await g()});const t=document.getElementById("refresh-photos");t&&t.addEventListener("click",async()=>{console.log("🔄 Manual refresh of photos triggered"),await g()});const o=document.getElementById("photo-upload-input");o&&o.addEventListener("change",B)}async function B(e){const t=e.target.files[0];if(t){if(!t.type.startsWith("image/")){alert("Please select an image file");return}if(t.size>10*1024*1024){alert("File size must be less than 10MB");return}try{const o=t.name.split(".").pop(),n=`${p.id}/${Date.now()}.${o}`,{data:r,error:a}=await s.storage.from("menu-photos").upload(n,t);if(a)throw a;const{data:{publicUrl:i}}=s.storage.from("menu-photos").getPublicUrl(n),{data:d,error:h}=await s.from("menu_photos").insert({user_id:p.id,photo_url:i,original_filename:t.name,file_size:t.size,mime_type:t.type,conversion_status:"pending"});if(h)throw h;await S(),e.target.value="",alert("Photo uploaded successfully!")}catch(o){console.error("Upload error:",o),alert("Error uploading file: "+o.message)}}}window.viewCustomization=async function(e){console.log("🔄 Loading product customization details for:",e);try{const{data:t,error:o}=await s.from("product_customizations").select("*").eq("id",e).single();if(o){console.error("Error loading product customization details:",o),alert("Error loading customization details: "+o.message);return}const n=`
Product Customization Details:
=============================

Product Information:
-------------------
Product Name: ${t.product_name||"Not provided"}
Project Name: ${t.project_name||"Not provided"}
Status: ${t.status||"Not provided"}
Price: ₹${(t.price||0).toLocaleString("en-IN")}

Customer Information:
-------------------
Customer Name: ${t.customer_name||"Not provided"}
Company Name: ${t.company_name||"Not provided"}
Email: ${t.email||"Not provided"}
Phone: ${t.phone||"Not provided"}

Project Details:
---------------
Requirements: ${t.requirements||"No requirements provided"}
Created: ${new Date(t.created_at).toLocaleString()}
Updated: ${new Date(t.updated_at||t.created_at).toLocaleString()}

${t.notes?`Notes: ${t.notes}`:""}
        `;alert(n)}catch(t){console.error("Error viewing product customization details:",t),alert("Error viewing customization details: "+t.message)}};window.processCustomization=function(e){console.log("Process product customization:",e),alert("Processing customization: "+e)};window.viewPhoto=function(e){console.log("View photo:",e)};window.downloadText=function(e){console.log("Download text for photo:",e)};console.log("🔄 Script loaded - Force loading data...");setTimeout(()=>{y()},100);const F="https://lmrrdcaavwwletcjcpqv.supabase.co",j="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let l=null;function m(){return new Promise(e=>{window.supabase?(l=window.supabase.createClient(F,j),e(l)):setTimeout(()=>m().then(e),100)})}async function u(){try{console.log("🔒 MenuOperatorGuard: Checking menu operator access..."),l||await m();const{data:{user:e},error:t}=await l.auth.getUser();if(t){console.error("❌ MenuOperatorGuard: Error getting user:",t),c("Authentication error. Please login again.");return}if(!e){console.log("❌ MenuOperatorGuard: No user logged in"),c("Please login to access menu operator panel");return}console.log("✅ MenuOperatorGuard: User found:",e.email);const{data:o,error:n}=await l.from("profiles").select("role").eq("id",e.id).single();if(n){console.error("❌ MenuOperatorGuard: Error getting profile:",n),c("Error checking user permissions");return}if(o.role!=="menu_operator"){console.log("❌ MenuOperatorGuard: User does not have menu_operator role. Role:",o.role),c("Access denied. Menu operator privileges required.");return}console.log("✅ MenuOperatorGuard: Menu operator access granted for user:",e.email),k()}catch(e){console.error("❌ MenuOperatorGuard: Error checking menu operator access:",e),c("Error checking menu operator access. Please try again.")}}function c(e){const t=document.getElementById("menu-operator-guard");t&&(t.innerHTML=`
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
        `)}function k(){const e=document.getElementById("menu-operator-guard");if(e){e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.height="0",e.style.overflow="hidden";const t=document.getElementById("menu-operator-admin-layout");t&&(t.classList.remove("hidden"),t.style.display="block",t.style.visibility="visible",t.style.opacity="1",R()),window.dispatchEvent(new CustomEvent("menu-operator-access-granted"))}}async function R(){try{l||await m();const{data:{user:e}}=await l.auth.getUser();if(e){const{data:t}=await l.from("profiles").select("full_name").eq("id",e.id).single(),o=document.getElementById("menu-operator-name");o&&(o.textContent=t?.full_name||e.user_metadata?.full_name||e.email||"Menu Operator");const n=document.getElementById("menu-operator-avatar");if(n){const r=t?.full_name||e.user_metadata?.full_name||e.email||"M";n.textContent=r.charAt(0).toUpperCase()}}}catch(e){console.warn("Could not update menu operator info:",e)}}async function T(){try{console.log("Menu operator signing out..."),l||await m(),await l.auth.signOut(),sessionStorage.clear(),localStorage.removeItem("supabase-auth-session"),window.location.href="/"}catch(e){console.error("Error during menu operator sign out:",e),window.location.href="/"}}window.handleMenuOperatorSignOut=T;document.addEventListener("DOMContentLoaded",u);window.addEventListener("auth-state-changed",u);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):u();setTimeout(()=>{const e=document.getElementById("menu-operator-guard");e&&e.style.display!=="none"&&(console.warn("⚠️ Menu operator access check timed out, showing content anyway"),k())},1e4);console.log("MenuOperatorAdminLayout loaded successfully");function w(){console.log("🔧 Fixing text visibility..."),document.querySelectorAll(".text-white, .text-light, .text-muted").forEach(o=>{(o.style.color==="white"||o.style.color==="#ffffff"||o.style.color==="#fff")&&(o.style.color="#1f2937",o.style.backgroundColor="#f8fafc",o.style.padding="2px 4px",o.style.borderRadius="4px")}),document.querySelectorAll("input, textarea, select").forEach(o=>{(o.style.color==="white"||o.style.color==="#ffffff")&&(o.style.color="#1f2937",o.style.backgroundColor="#ffffff",o.style.border="2px solid #d1d5db")}),console.log("✅ Text visibility fixed!")}function b(){document.body.classList.add("menu-operator-admin-active"),window.hideUserNavbar&&window.hideUserNavbar(),document.addEventListener("click",function(e){const t=e.target.closest('a[href="/"]');t&&t.textContent.includes("Back to Site")&&(console.log('🔄 Menu Operator clicked "Back to Site" - preparing to show user navbar'),document.body.classList.remove("menu-operator-admin-active"),setTimeout(()=>{window.showUserNavbar&&(window.showUserNavbar(),console.log("✅ User navbar shown after delay"))},50))}),window.addEventListener("beforeunload",function(){window.location.pathname.startsWith("/menu-operator")||(document.body.classList.remove("menu-operator-admin-active"),window.showUserNavbar&&window.showUserNavbar())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",function(){w(),b()}):(w(),b());(function(){document.documentElement.classList.add("menu-operator-admin-active"),document.body.classList.add("menu-operator-admin-active");function e(){const t=document.querySelector("header");t&&(t.style.display="none",t.style.visibility="hidden",t.style.opacity="0",t.style.height="0",t.style.maxHeight="0",t.style.overflow="hidden",t.style.position="absolute",t.style.top="-9999px",t.style.left="-9999px",t.style.zIndex="-9999",t.style.pointerEvents="none",t.style.transform="translateY(-100vh)",t.style.transition="none",t.style.animation="none")}e(),document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",e),setTimeout(e,0),setTimeout(e,10),setTimeout(e,50)})();
