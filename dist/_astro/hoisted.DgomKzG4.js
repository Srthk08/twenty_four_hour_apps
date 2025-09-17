import{supabase as n}from"./supabase.C3b_eKiV.js";import"./Toast.astro_astro_type_script_index_0_lang.C2kRdsNU.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./index.BymsOcZI.js";import"./preload-helper.CLcXU_4U.js";console.log("Admin data dashboard loaded successfully");document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin data dashboard...");try{await Promise.all([x(),y(),f(),b(),v()]),console.log("✅ All admin data loaded successfully")}catch(e){console.error("❌ Error loading admin data:",e)}});async function x(){try{console.log("🔄 Loading users data...");const{data:e,error:t}=await n.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading users:",t);return}const o=document.getElementById("users-table-body");if(!o)return;e&&e.length>0?o.innerHTML=e.map(s=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-600">${s.full_name?s.full_name.charAt(0).toUpperCase():"U"}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">${s.full_name||"No Name"}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.role==="admin"?"bg-red-100 text-red-800":"bg-green-100 text-green-800"}">
                ${s.role||"customer"}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(s.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.last_login?new Date(s.last_login).toLocaleDateString():"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewUserDetails('${s.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(e){console.error("Error loading users data:",e)}}async function y(){try{console.log("🔄 Loading contact form data...");const{data:e,error:t}=await n.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact data:",t);return}const o=document.getElementById("contact-table-body");if(!o)return;e&&e.length>0?o.innerHTML=e.map(s=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${s.first_name} ${s.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.email||"Not provided"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.company_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.project_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(s.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${s.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(e){console.error("Error loading contact data:",e)}}async function f(){try{console.log("🔄 Loading support tickets data...");const{data:e,error:t}=await n.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);return}const o=document.getElementById("tickets-table-body");if(!o)return;e&&e.length>0?o.innerHTML=e.map(s=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${s.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.subject}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.priority==="high"?"bg-red-100 text-red-800":s.priority==="medium"?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"}">
                ${s.priority}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.status==="open"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
                ${s.status}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(s.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewTicketDetails('${s.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(e){console.error("Error loading tickets data:",e)}}async function b(){try{if(console.log("🔄 Loading cart customizations data..."),console.log("🔍 Supabase client available:",!!n),!n){console.error("❌ Supabase client not available");const s=document.getElementById("cart-table-body");s&&(s.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}const{data:e,error:t}=await n.from("cart_customizations").select("*").order("created_at",{ascending:!1});if(console.log("🔍 Cart data query result:",{data:e,error:t}),t){console.error("❌ Error loading cart data:",t);const s=document.getElementById("cart-table-body");s&&(s.innerHTML=`<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Error: ${t.message}</td></tr>`);return}const o=document.getElementById("cart-table-body");if(!o){console.error("❌ Cart table body not found");return}console.log("🔍 Cart data received:",e),e&&e.length>0?(console.log(`✅ Found ${e.length} cart customizations`),o.innerHTML=e.map(s=>{let a=s.total_amount;if(!a||a===0){const r=s.base_price||0,l=(s.selected_features||[]).length*500,d=r+l,c=Math.round(d*.18);a=d+c}return`
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.user_email}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.project_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.app_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.contact_person||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹${a.toLocaleString()}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(s.created_at).toLocaleDateString()}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="viewCartDetails('${s.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
              </td>
            </tr>
          `}).join("")):(console.log("ℹ️ No cart customizations found"),o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No cart customizations found</td></tr>')}catch(e){console.error("❌ Error loading cart data:",e);const t=document.getElementById("cart-table-body");t&&(t.innerHTML=`<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Error: ${e.message}</td></tr>`)}}async function v(){try{const[e,t,o,s]=await Promise.all([n.from("profiles").select("*",{count:"exact",head:!0}),n.from("contact_submissions").select("*",{count:"exact",head:!0}),n.from("support_tickets").select("*",{count:"exact",head:!0}),n.from("cart_customizations").select("*",{count:"exact",head:!0})]),a=e.count||0,r=t.count||0,i=o.count||0,l=s.count||0,d=document.getElementById("total-users"),c=document.getElementById("total-contacts"),m=document.getElementById("total-tickets"),g=document.getElementById("total-orders");d&&(d.textContent=a.toString()),c&&(c.textContent=r.toString()),m&&(m.textContent=i.toString()),g&&(g.textContent=l.toString()),console.log("✅ Summary cards updated")}catch(e){console.error("Error updating summary cards:",e)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("details-modal");document.getElementById("close-modal")?.addEventListener("click",()=>{e.classList.add("hidden")}),e?.addEventListener("click",o=>{o.target===e&&e.classList.add("hidden")})});window.viewUserDetails=async function(e){console.log("Viewing user details for:",e);try{const{data:t,error:o}=await n.from("profiles").select("*").eq("id",e).single();if(o){console.error("Error loading user details:",o);return}const s=document.getElementById("details-modal"),a=document.getElementById("modal-title"),r=document.getElementById("modal-content");a.textContent="User Details",r.innerHTML=`
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span class="text-2xl font-medium text-blue-600">${t.full_name?t.full_name.charAt(0).toUpperCase():"U"}</span>
            </div>
            <div>
              <h4 class="text-xl font-semibold text-gray-900">${t.full_name||"No Name"}</h4>
              <p class="text-gray-600">${t.email}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h5 class="font-medium text-gray-900 mb-2">Contact Information</h5>
              <p class="text-sm text-gray-600"><strong>Email:</strong> ${t.email}</p>
              <p class="text-sm text-gray-600"><strong>Phone:</strong> ${t.phone||"Not provided"}</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h5 class="font-medium text-gray-900 mb-2">Account Information</h5>
              <p class="text-sm text-gray-600"><strong>Role:</strong> <span class="px-2 py-1 text-xs rounded-full ${t.role==="admin"?"bg-red-100 text-red-800":"bg-green-100 text-green-800"}">${t.role||"customer"}</span></p>
              <p class="text-sm text-gray-600"><strong>Registered:</strong> ${new Date(t.created_at).toLocaleDateString()}</p>
              <p class="text-sm text-gray-600"><strong>Last Login:</strong> ${t.last_login?new Date(t.last_login).toLocaleDateString():"Never"}</p>
            </div>
          </div>
        </div>
      `,s.classList.remove("hidden")}catch(t){console.error("Error viewing user details:",t)}};window.viewContactDetails=async function(e){console.log("Viewing contact details for:",e);try{const{data:t,error:o}=await n.from("contact_submissions").select("*").eq("id",e).single();if(o){console.error("Error loading contact details:",o);return}const s=document.getElementById("details-modal"),a=document.getElementById("modal-title"),r=document.getElementById("modal-content");a.textContent="Contact Form Details",r.innerHTML=`
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600"><strong>Name:</strong> ${t.first_name} ${t.last_name}</p>
                <p class="text-sm text-gray-600"><strong>Email:</strong> ${t.email||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Phone:</strong> ${t.phone||"Not provided"}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600"><strong>Company:</strong> ${t.company_name||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Project Type:</strong> ${t.project_type||"Not specified"}</p>
                <p class="text-sm text-gray-600"><strong>Submitted:</strong> ${new Date(t.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Project Details</h5>
            <p class="text-sm text-gray-600">${t.project_details||t.message||"No additional details provided"}</p>
          </div>
        </div>
      `,s.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};window.viewTicketDetails=async function(e){console.log("Viewing ticket details for:",e);try{const{data:t,error:o}=await n.from("support_tickets").select("*").eq("id",e).single();if(o){console.error("Error loading ticket details:",o);return}const s=document.getElementById("details-modal"),a=document.getElementById("modal-title"),r=document.getElementById("modal-content");a.textContent=`Support Ticket #${t.id}`,r.innerHTML=`
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Ticket Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600"><strong>Subject:</strong> ${t.subject}</p>
                <p class="text-sm text-gray-600"><strong>Category:</strong> ${t.category}</p>
                <p class="text-sm text-gray-600"><strong>Priority:</strong> <span class="px-2 py-1 text-xs rounded-full ${t.priority==="high"?"bg-red-100 text-red-800":t.priority==="medium"?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"}">${t.priority}</span></p>
              </div>
              <div>
                <p class="text-sm text-gray-600"><strong>Status:</strong> <span class="px-2 py-1 text-xs rounded-full ${t.status==="open"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">${t.status}</span></p>
                <p class="text-sm text-gray-600"><strong>Email:</strong> ${t.user_email||t.email||"No Email"}</p>
                <p class="text-sm text-gray-600"><strong>Created:</strong> ${new Date(t.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Description</h5>
            <p class="text-sm text-gray-600">${t.description||"No description provided"}</p>
          </div>
        </div>
      `,s.classList.remove("hidden")}catch(t){console.error("Error viewing ticket details:",t)}};window.viewCartDetails=async function(e){console.log("Viewing cart details for:",e);try{const{data:t,error:o}=await n.from("cart_customizations").select("*").eq("id",e).single();if(o){console.error("Error loading cart details:",o);return}const s=document.getElementById("details-modal"),a=document.getElementById("modal-title"),r=document.getElementById("modal-content");a.textContent="Cart Customization Details",r.innerHTML=`
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Project Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600"><strong>User Email:</strong> ${t.user_email}</p>
                <p class="text-sm text-gray-600"><strong>Project Name:</strong> ${t.project_name||"Not specified"}</p>
                <p class="text-sm text-gray-600"><strong>App Name:</strong> ${t.app_name||"Not specified"}</p>
                <p class="text-sm text-gray-600"><strong>Contact Person:</strong> ${t.contact_person||"Not specified"}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600"><strong>Total Amount:</strong> ₹${t.total_amount?t.total_amount.toLocaleString():"0"}</p>
                <p class="text-sm text-gray-600"><strong>Created:</strong> ${new Date(t.created_at).toLocaleDateString()}</p>
                <p class="text-sm text-gray-600"><strong>Restaurant Name:</strong> ${t.restaurant_name||"N/A"}</p>
                <p class="text-sm text-gray-600"><strong>Cuisine Type:</strong> ${t.cuisine_type||"N/A"}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Customization Details</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600"><strong>Primary Color:</strong> <span class="inline-block w-4 h-4 rounded-full border" style="background-color: ${t.primary_color||"#000"}"></span> ${t.primary_color||"Not specified"}</p>
                <p class="text-sm text-gray-600"><strong>Secondary Color:</strong> <span class="inline-block w-4 h-4 rounded-full border" style="background-color: ${t.secondary_color||"#000"}"></span> ${t.secondary_color||"Not specified"}</p>
                <p class="text-sm text-gray-600"><strong>Accent Color:</strong> <span class="inline-block w-4 h-4 rounded-full border" style="background-color: ${t.accent_color||"#000"}"></span> ${t.accent_color||"Not specified"}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600"><strong>Logo URL:</strong> ${t.logo_url?'<a href="'+t.logo_url+'" target="_blank" class="text-blue-600 hover:underline">View Logo</a>':"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Additional Notes:</strong> ${t.additional_notes||"None"}</p>
              </div>
            </div>
          </div>
        </div>
      `,s.classList.remove("hidden")}catch(t){console.error("Error viewing cart details:",t)}};function w(){console.log("🔄 Opening contact forms modal...");const e=document.getElementById("contactFormsModal");e?(e.classList.remove("hidden"),console.log("✅ Modal opened, loading contact forms..."),$()):console.error("❌ Contact forms modal not found")}function h(){const e=document.getElementById("contactFormsModal");e&&e.classList.add("hidden")}async function $(){try{console.log("🔄 Loading contact forms from contact_submissions table...");const{data:e,error:t}=await n.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact forms:",t),alert("Error loading contact forms: "+t.message);return}console.log("✅ Contact forms loaded successfully:",e?.length||0,"contacts found");const o=document.getElementById("contacts-list"),s=document.getElementById("no-contacts");if(!e||e.length===0){o.classList.add("hidden"),s.classList.remove("hidden");return}s.classList.add("hidden"),o.classList.remove("hidden"),o.innerHTML=e.map(a=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Contact Form
              </span>
            </div>
            <span class="text-sm text-gray-500">${new Date(a.created_at).toLocaleDateString()}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2">${a.first_name} ${a.last_name||""}</h4>
          <p class="text-gray-600 text-sm mb-2">${a.message?a.message.length>100?a.message.substring(0,100)+"...":a.message:"No message"}</p>
          <p class="text-gray-500 text-xs mb-3">Email: ${a.email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3">Phone: ${a.phone||"Not provided"}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewContactDetailsInModal('${a.id}')" 
              class="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(e){alert("Error loading contact forms: "+e.message)}}function _(){const e=document.getElementById("cartCustomizationsModal");e&&(e.classList.remove("hidden"),L())}function C(){const e=document.getElementById("cartCustomizationsModal");e&&e.classList.add("hidden")}async function L(){try{const{data:e,error:t}=await n.from("cart_customizations").select("*").order("created_at",{ascending:!1});if(t){alert("Error loading cart customizations: "+t.message);return}const o=document.getElementById("carts-list"),s=document.getElementById("no-carts");if(!e||e.length===0){o.classList.add("hidden"),s.classList.remove("hidden");return}s.classList.add("hidden"),o.classList.remove("hidden"),o.innerHTML=e.map(a=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                Cart Customization
              </span>
            </div>
            <span class="text-sm text-gray-500">${new Date(a.created_at).toLocaleDateString()}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2">${a.project_name||"No Project Name"}</h4>
          <div class="text-gray-600 text-sm mb-2">
            <p class="mb-1"><strong>Products Chosen:</strong> ${D(a)}</p>
            <p class="mb-1"><strong>Additional Requirements:</strong> ${a.additional_requirements?a.additional_requirements.length>100?a.additional_requirements.substring(0,100)+"...":a.additional_requirements:"No additional requirements provided"}</p>
          </div>
          <p class="text-gray-500 text-xs mb-3">Email: ${a.user_email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3">Total: ₹${a.total_amount?a.total_amount.toLocaleString():"0"}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewCartDetailsInModal('${a.id}')" 
              class="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(e){alert("Error loading cart customizations: "+e.message)}}function E(){const e=document.getElementById("contactSearch").value.toLowerCase();document.querySelectorAll("#contacts-list > div").forEach(o=>{const s=o.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",a=o.querySelector("h4")?.textContent.toLowerCase()||"",r=o.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";s.includes(e)||a.includes(e)||r.includes(e)?o.style.display="block":o.style.display="none"})}function N(){const e=document.getElementById("cartSearch").value.toLowerCase();document.querySelectorAll("#carts-list > div").forEach(o=>{const s=o.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",a=o.querySelector("h4")?.textContent.toLowerCase()||"",r=o.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";s.includes(e)||a.includes(e)||r.includes(e)?o.style.display="block":o.style.display="none"})}function D(e){const t=e.product_id,o=e.product_name;return{1:"Restaurant Menu System",2:"Android TV App",3:"Streaming Mobile App",4:"Restaurant Website","restaurant-menu":"Restaurant Menu System","restaurant-menu-system":"Restaurant Menu System","android-tv":"Android TV App","android-tv-app":"Android TV App","mobile-streaming":"Streaming Mobile App","streaming-mobile-app":"Streaming Mobile App","restaurant-website":"Restaurant Website"}[t]||o||"Unknown Product"}async function I(e){try{const{data:t,error:o}=await n.from("cart_customizations").select("*").eq("id",e).single();if(o){alert("Error loading cart details: "+o.message);return}document.getElementById("carts-list").classList.add("hidden"),document.getElementById("cart-details-view").classList.remove("hidden"),setTimeout(()=>{const a=document.getElementById("cart-details-view");if(a){a.replaceWith(a.cloneNode(!0));const r=document.getElementById("cart-details-view");r.addEventListener("click",function(i){i.target===r&&p()})}},100);const s=document.getElementById("cart-details-content");s.innerHTML=`
        <div class="bg-white rounded-lg shadow p-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 class="font-medium text-gray-900 mb-3">Project Information</h5>
              <p class="text-sm text-gray-600 mb-2"><strong>Project Name:</strong> ${t.project_name||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>App Name:</strong> ${t.app_name||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Contact Person:</strong> ${t.contact_person||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>User Email:</strong> ${t.user_email||"Not provided"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Total Amount:</strong> ₹${t.total_amount?t.total_amount.toLocaleString():"0"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Created:</strong> ${new Date(t.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <h5 class="font-medium text-gray-900 mb-3">Restaurant Details</h5>
              <p class="text-sm text-gray-600 mb-2"><strong>Restaurant Name:</strong> ${t.restaurant_name||"N/A"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Cuisine Type:</strong> ${t.cuisine_type||"N/A"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Logo URL:</strong> ${t.logo_url?'<a href="'+t.logo_url+'" target="_blank" class="text-blue-600 hover:underline">View Logo</a>':"Not provided"}</p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <h5 class="font-medium text-gray-900 mb-3">Color Customization</h5>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center space-x-2">
                <span class="inline-block w-6 h-6 rounded-full border-2 border-gray-300" style="background-color: ${t.primary_color||"#000"}"></span>
                <span class="text-sm text-gray-600"><strong>Primary:</strong> ${t.primary_color||"Not specified"}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="inline-block w-6 h-6 rounded-full border-2 border-gray-300" style="background-color: ${t.secondary_color||"#000"}"></span>
                <span class="text-sm text-gray-600"><strong>Secondary:</strong> ${t.secondary_color||"Not specified"}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="inline-block w-6 h-6 rounded-full border-2 border-gray-300" style="background-color: ${t.accent_color||"#000"}"></span>
                <span class="text-sm text-gray-600"><strong>Accent:</strong> ${t.accent_color||"Not specified"}</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <h5 class="font-medium text-gray-900 mb-3">Product Chosen by User</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 class="font-medium text-gray-800 mb-2">Selected Product:</h6>
                <div class="space-y-1">
                  <p class="text-sm text-gray-600"><strong>Product ID:</strong> ${t.product_id||"Not specified"}</p>
                  <p class="text-sm text-gray-600"><strong>Product Name:</strong> ${t.product_name||"Not specified"}</p>
                  <p class="text-sm text-gray-600"><strong>Product Description:</strong> ${t.product_description||"Not provided"}</p>
                  <p class="text-sm text-gray-600"><strong>Custom Name:</strong> ${t.custom_name||"Not specified"}</p>
                </div>
              </div>
              <div>
                <h6 class="font-medium text-gray-800 mb-2">Pricing Details:</h6>
                <div class="space-y-1">
                  <p class="text-sm text-gray-600"><strong>Base Price:</strong> ₹${t.base_price?t.base_price.toLocaleString():"0"}</p>
                  <p class="text-sm text-gray-600"><strong>Selected Features:</strong> ${t.selected_features?Array.isArray(t.selected_features)?t.selected_features.join(", "):t.selected_features:"None"}</p>
                  <p class="text-sm text-gray-600"><strong>Features Count:</strong> ${t.selected_features?Array.isArray(t.selected_features)?t.selected_features.length:1:"0"}</p>
                  <p class="text-sm text-gray-600"><strong>Features Cost:</strong> ₹${t.selected_features?((Array.isArray(t.selected_features)?t.selected_features.length:1)*500).toLocaleString():"0"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-3">Additional Requirements</h5>
            <p class="text-sm text-gray-600 whitespace-pre-wrap">${t.additional_requirements||"No additional requirements provided"}</p>
          </div>
        </div>
      `}catch(t){console.error("Error viewing cart details:",t),alert("Error loading cart details: "+t.message)}}function p(){document.getElementById("cart-details-view").classList.add("hidden"),document.getElementById("carts-list").classList.remove("hidden")}async function S(e){try{const{data:t,error:o}=await n.from("contact_submissions").select("*").eq("id",e).single();if(o){alert("Error loading contact details: "+o.message);return}document.getElementById("contacts-list").classList.add("hidden"),document.getElementById("contact-details-view").classList.remove("hidden"),setTimeout(()=>{const a=document.getElementById("contact-details-view");if(a){a.replaceWith(a.cloneNode(!0));const r=document.getElementById("contact-details-view");r.addEventListener("click",function(i){i.target===r&&u()})}},100);const s=document.getElementById("contact-details-content");s.innerHTML=`
        <div class="bg-white rounded-lg shadow p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 class="font-medium text-gray-900 mb-3">Contact Information</h5>
              <p class="text-sm text-gray-600 mb-2"><strong>Name:</strong> ${t.first_name} ${t.last_name||""}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Email:</strong> ${t.email||"Not provided"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Phone:</strong> ${t.phone||"Not provided"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Project Type:</strong> ${t.project_type||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Submitted:</strong> ${new Date(t.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <h5 class="font-medium text-gray-900 mb-3">Additional Details</h5>
              <p class="text-sm text-gray-600 mb-2"><strong>Company:</strong> ${t.company_name||"Not provided"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Website:</strong> ${t.website||"Not provided"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Budget:</strong> ${t.budget||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-2"><strong>Timeline:</strong> ${t.timeline||"Not specified"}</p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-3">Message</h5>
            <p class="text-sm text-gray-600 whitespace-pre-wrap">${t.message||"No message provided"}</p>
          </div>
        </div>
      `}catch(t){console.error("Error viewing contact details:",t),alert("Error loading contact details: "+t.message)}}function u(){document.getElementById("contact-details-view").classList.add("hidden"),document.getElementById("contacts-list").classList.remove("hidden")}window.openContactFormsModal=w;window.closeContactFormsModal=h;window.openCartCustomizationsModal=_;window.closeCartCustomizationsModal=C;window.searchContacts=E;window.searchCarts=N;window.viewCartDetailsInModal=I;window.backToCartsList=p;window.viewContactDetailsInModal=S;window.backToContactsList=u;
