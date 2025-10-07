import"./ProductDialog.astro_astro_type_script_index_0_lang.r4zW4cVw.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";let c;function p(){return new Promise(s=>{window.supabase&&window.supabase.createClient?(c=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),s(c)):setTimeout(()=>p().then(s),100)})}console.log("Admin data dashboard loaded successfully");document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin data dashboard...");try{console.log("⏳ Waiting for Supabase to load..."),await p(),console.log("✅ Supabase client ready"),await Promise.all([y(),x(),_(),f(),b()]),console.log("✅ All admin data loaded successfully")}catch(s){console.error("❌ Error loading admin data:",s)}});async function y(){try{console.log("🔄 Loading users data...");const{data:s,error:t}=await c.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading users:",t);return}const a=document.getElementById("users-table-body");if(!a)return;s&&s.length>0?a.innerHTML=s.map(e=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-600">${e.full_name?e.full_name.charAt(0).toUpperCase():"U"}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">${e.full_name||"No Name"}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${e.role==="admin"?"bg-red-100 text-red-800":"bg-green-100 text-green-800"}">
                ${e.role||"customer"}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(e.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.last_login?new Date(e.last_login).toLocaleDateString():"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewUserDetails('${e.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(s){console.error("Error loading users data:",s)}}async function x(){try{console.log("🔄 Loading contact form data...");const{data:s,error:t}=await c.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact data:",t);return}const a=document.getElementById("contact-table-body");if(!a)return;s&&s.length>0?a.innerHTML=s.map(e=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${e.first_name} ${e.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.email||"Not provided"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.company_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.project_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(e.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${e.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(s){console.error("Error loading contact data:",s)}}async function _(){try{console.log("🔄 Loading support tickets data...");const{data:s,error:t}=await c.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);return}const a=document.getElementById("tickets-table-body");if(!a)return;s&&s.length>0?a.innerHTML=s.map(e=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${e.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.subject}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${e.priority==="high"?"bg-red-100 text-red-800":e.priority==="medium"?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"}">
                ${e.priority}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${e.status==="open"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
                ${e.status}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(e.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewTicketDetails('${e.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(s){console.error("Error loading tickets data:",s)}}async function f(){try{if(console.log("🔄 Loading cart customizations data..."),console.log("🔍 Supabase client available:",!!c),!c){console.error("❌ Supabase client not available");const d=document.getElementById("customizations-table-body");d&&(d.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}console.log("🔍 Fetching customization_forms data...");const{data:s,error:t}=await c.from("customization_forms").select("*").order("created_at",{ascending:!1});console.log("🔍 Fetching oms_customizations data...");const{data:a,error:e}=await c.from("oms_customizations").select("*").order("created_at",{ascending:!1});let o=[];if(s&&!t?(console.log("✅ Regular customizations loaded:",s.length),o=[...o,...s]):t&&console.error("❌ Error loading regular customizations:",t),a&&!e){console.log("✅ OMS customizations loaded:",a.length);const d=a.map(r=>({id:r.id,contact_email:r.user_email,product_type:r.product_type||"order-menu-system",product_name:r.product_name||"Order Menu System",project_name:r.project_name,restaurant_name:r.restaurant_name,owner_name:r.owner_name,restaurant_address:r.restaurant_address,contact_person:r.contact_person,phone:r.phone_number,contact_phone:r.phone_number,additional_requirements:r.additional_requirements,primary_color:r.primary_color,secondary_color:r.secondary_color,accent_color:r.accent_color,text_color:r.text_color,product_price:r.product_price,created_at:r.created_at,updated_at:r.updated_at,menu_categories:r.menu_categories,menu_items:r.menu_items,logo_url:r.logo_url,logo_filename:r.logo_filename,logo_size:r.logo_size}));o=[...o,...d]}else e&&console.error("❌ Error loading OMS customizations:",e);o.sort((d,r)=>new Date(r.created_at)-new Date(d.created_at)),console.log("🔍 Combined customizations data:",o.length,"total items");const n=document.getElementById("customizations-table-body");if(!n){console.error("❌ Customizations table body not found");return}o&&o.length>0?(console.log(`✅ Found ${o.length} customizations`),n.innerHTML=o.map(d=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.contact_email||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.product_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.product_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.project_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(d.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(d.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewCustomizationDetails('${d.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join("")):(console.log("ℹ️ No customizations found"),n.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No customizations found</td></tr>')}catch(s){console.error("❌ Error loading customizations data:",s);const t=document.getElementById("customizations-table-body");t&&(t.innerHTML=`<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Error: ${s.message}</td></tr>`)}}async function b(){try{const[s,t,a,e]=await Promise.all([c.from("profiles").select("*",{count:"exact",head:!0}),c.from("contact_submissions").select("*",{count:"exact",head:!0}),c.from("support_tickets").select("*",{count:"exact",head:!0}),c.from("customization_forms").select("*",{count:"exact",head:!0})]),o=s.count||0,n=t.count||0,d=a.count||0,r=e.count||0,i=document.getElementById("total-users"),l=document.getElementById("total-contacts"),m=document.getElementById("total-tickets"),g=document.getElementById("total-orders");i&&(i.textContent=o.toString()),l&&(l.textContent=n.toString()),m&&(m.textContent=d.toString()),g&&(g.textContent=r.toString()),console.log("✅ Summary cards updated")}catch(s){console.error("Error updating summary cards:",s)}}document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("details-modal");document.getElementById("close-modal")?.addEventListener("click",()=>{s.classList.add("hidden")}),s?.addEventListener("click",a=>{a.target===s&&s.classList.add("hidden")})});window.viewUserDetails=async function(s){console.log("Viewing user details for:",s);try{const{data:t,error:a}=await c.from("profiles").select("*").eq("id",s).single();if(a){console.error("Error loading user details:",a);return}const e=document.getElementById("details-modal"),o=document.getElementById("modal-title"),n=document.getElementById("modal-content");o.textContent="User Details",n.innerHTML=`
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
      `,e.classList.remove("hidden")}catch(t){console.error("Error viewing user details:",t)}};window.viewContactDetails=async function(s){console.log("Viewing contact details for:",s);try{const{data:t,error:a}=await c.from("contact_submissions").select("*").eq("id",s).single();if(a){console.error("Error loading contact details:",a);return}const e=document.getElementById("details-modal"),o=document.getElementById("modal-title"),n=document.getElementById("modal-content");o.textContent="Contact Form Details",n.innerHTML=`
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
      `,e.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};window.viewTicketDetails=async function(s){console.log("Viewing ticket details for:",s);try{const{data:t,error:a}=await c.from("support_tickets").select("*").eq("id",s).single();if(a){console.error("Error loading ticket details:",a);return}const e=document.getElementById("details-modal"),o=document.getElementById("modal-title"),n=document.getElementById("modal-content");o.textContent=`Support Ticket #${t.id}`,n.innerHTML=`
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
      `,e.classList.remove("hidden")}catch(t){console.error("Error viewing ticket details:",t)}};window.viewCartDetails=async function(s){console.log("Viewing cart details for:",s);try{const{data:t,error:a}=await c.from("customization_forms").select("*").eq("id",s).single();if(a){console.error("Error loading cart details:",a);return}const e=document.getElementById("details-modal"),o=document.getElementById("modal-title"),n=document.getElementById("modal-content");o.textContent="Cart Customization Details",n.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Total Amount:</strong> ${t.total_amount?t.total_amount.toLocaleString("en-IN",{style:"currency",currency:"INR"}):"₹0"}</p>
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
      `,e.classList.remove("hidden")}catch(t){console.error("Error viewing cart details:",t)}};function v(){console.log("🔄 Opening contact forms modal...");const s=document.getElementById("contactFormsModal");s?(s.classList.remove("hidden"),document.body.style.overflow="hidden",console.log("✅ Modal opened, loading contact forms..."),h()):console.error("❌ Contact forms modal not found")}function w(){const s=document.getElementById("contactFormsModal");s&&(s.classList.add("hidden"),document.body.style.overflow="auto")}async function h(){try{console.log("🔄 Loading contact forms from contact_submissions table...");const{data:s,error:t}=await c.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact forms:",t),alert("Error loading contact forms: "+t.message);return}console.log("✅ Contact forms loaded successfully:",s?.length||0,"contacts found");const a=document.getElementById("contacts-list"),e=document.getElementById("no-contacts");if(!s||s.length===0){a.classList.add("hidden"),e.classList.remove("hidden");return}e.classList.add("hidden"),a.classList.remove("hidden"),a.innerHTML=s.map(o=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Contact Form
              </span>
            </div>
            <span class="text-sm text-gray-500">${new Date(o.created_at).toLocaleDateString()}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2">${o.first_name} ${o.last_name||""}</h4>
          <p class="text-gray-600 text-sm mb-2">${o.message?o.message.length>100?o.message.substring(0,100)+"...":o.message:"No message"}</p>
          <p class="text-gray-500 text-xs mb-3">Email: ${o.email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3">Phone: ${o.phone||"Not provided"}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewContactDetailsInModal('${o.id}')" 
              class="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(s){alert("Error loading contact forms: "+s.message)}}function $(){const s=document.getElementById("customizationsModal");s&&(s.classList.remove("hidden"),document.body.style.overflow="hidden",E())}function C(){const s=document.getElementById("customizationsModal");s&&(s.classList.add("hidden"),document.body.style.overflow="auto")}async function E(){try{console.log("🔄 Loading customizations for modal...");const{data:s,error:t}=await c.from("customization_forms").select("*").order("created_at",{ascending:!1}),{data:a,error:e}=await c.from("oms_customizations").select("*").order("created_at",{ascending:!1});let o=[];if(s&&!t?(console.log("✅ Regular customizations loaded for modal:",s.length),o=[...o,...s]):t&&console.error("❌ Error loading regular customizations for modal:",t),a&&!e){console.log("✅ OMS customizations loaded for modal:",a.length);const r=a.map(i=>({id:i.id,contact_email:i.user_email,product_type:i.product_type||"order-menu-system",product_name:i.product_name||"Order Menu System",project_name:i.project_name,restaurant_name:i.restaurant_name,owner_name:i.owner_name,restaurant_address:i.restaurant_address,contact_person:i.contact_person,phone:i.phone_number,contact_phone:i.phone_number,additional_requirements:i.additional_requirements,primary_color:i.primary_color,secondary_color:i.secondary_color,accent_color:i.accent_color,text_color:i.text_color,product_price:i.product_price,created_at:i.created_at,updated_at:i.updated_at,menu_categories:typeof i.menu_categories=="string"?JSON.parse(i.menu_categories):i.menu_categories||[],menu_items:typeof i.menu_items=="string"?JSON.parse(i.menu_items):i.menu_items||[],logo_url:i.logo_url,logo_filename:i.logo_filename,logo_size:i.logo_size}));o=[...o,...r]}else e&&console.error("❌ Error loading OMS customizations for modal:",e);o.sort((r,i)=>new Date(i.created_at)-new Date(r.created_at));const n=document.getElementById("customizations-list"),d=document.getElementById("no-customizations");if(!o||o.length===0){n.classList.add("hidden"),d.classList.remove("hidden");return}d.classList.add("hidden"),n.classList.remove("hidden"),n.innerHTML=o.map(r=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                Product Customization
              </span>
            </div>
            <span class="text-sm text-gray-500">${new Date(r.created_at).toLocaleDateString()}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2">${r.product_name||"No Product Name"}</h4>
          <div class="text-gray-600 text-sm mb-2">
            <p class="mb-1"><strong>Product Type:</strong> ${r.product_type||"Not specified"}</p>
            <p class="mb-1"><strong>Project Name:</strong> ${r.project_name||"Not specified"}</p>
            <p class="mb-1"><strong>Restaurant Name:</strong> ${r.restaurant_name||"N/A"}</p>
            <p class="mb-1"><strong>Cuisine Type:</strong> ${r.cuisine_type||"N/A"}</p>
            <p class="mb-1"><strong>Additional Requirements:</strong> ${r.additional_requirements?r.additional_requirements.length>100?r.additional_requirements.substring(0,100)+"...":r.additional_requirements:"No additional requirements provided"}</p>
          </div>
          <p class="text-gray-500 text-xs mb-3">Email: ${r.contact_email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3">Price: ${r.product_price?r.product_price.toLocaleString("en-IN",{style:"currency",currency:"INR"}):"₹0"}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewCustomizationDetailsInModal('${r.id}')" 
              class="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(s){alert("Error loading customizations: "+s.message)}}function N(){const s=document.getElementById("contactSearch").value.toLowerCase();document.querySelectorAll("#contacts-list > div").forEach(a=>{const e=a.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",o=a.querySelector("h4")?.textContent.toLowerCase()||"",n=a.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";e.includes(s)||o.includes(s)||n.includes(s)?a.style.display="block":a.style.display="none"})}function L(){const s=document.getElementById("customizationSearch").value.toLowerCase();document.querySelectorAll("#customizations-list > div").forEach(a=>{const e=a.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",o=a.querySelector("h4")?.textContent.toLowerCase()||"",n=a.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";e.includes(s)||o.includes(s)||n.includes(s)?a.style.display="block":a.style.display="none"})}async function I(s){try{const{data:t,error:a}=await c.from("contact_submissions").select("*").eq("id",s).single();if(a){alert("Error loading contact details: "+a.message);return}document.getElementById("contacts-list").classList.add("hidden"),document.getElementById("contact-details-view").classList.remove("hidden"),setTimeout(()=>{const o=document.getElementById("contact-details-view");if(o){o.replaceWith(o.cloneNode(!0));const n=document.getElementById("contact-details-view");n.addEventListener("click",function(d){d.target===n&&u()})}},100);const e=document.getElementById("contact-details-content");e.innerHTML=`
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
      `}catch(t){console.error("Error viewing contact details:",t),alert("Error loading contact details: "+t.message)}}function u(){document.getElementById("contact-details-view").classList.add("hidden"),document.getElementById("contacts-list").classList.remove("hidden")}async function z(s){try{let{data:t,error:a}=await c.from("customization_forms").select("*").eq("id",s).single();if(a&&a.status===406&&(console.log("406 error from customization_forms, trying oms_customizations..."),a={code:"PGRST116"}),a&&a.code==="PGRST116"){console.log("Not found in customization_forms, trying oms_customizations...");const{data:e,error:o}=await c.from("oms_customizations").select("*").eq("id",s).single();if(o){alert("Error loading OMS customization details: "+o.message);return}t={id:e.id,contact_email:e.user_email,product_type:e.product_type||"order-menu-system",product_name:e.product_name||"Order Menu System",project_name:e.project_name,restaurant_name:e.restaurant_name,owner_name:e.owner_name,restaurant_address:e.restaurant_address,contact_person:e.contact_person,phone:e.phone_number,additional_requirements:e.additional_requirements,primary_color:e.primary_color,secondary_color:e.secondary_color,accent_color:e.accent_color,text_color:e.text_color,product_price:e.product_price,created_at:e.created_at,updated_at:e.updated_at,menu_categories:typeof e.menu_categories=="string"?JSON.parse(e.menu_categories):e.menu_categories||[],menu_items:typeof e.menu_items=="string"?JSON.parse(e.menu_items):e.menu_items||[],logo_url:e.logo_url,logo_filename:e.logo_filename,logo_size:e.logo_size},a=null}if(a){alert("Error loading customization details: "+a.message);return}document.getElementById("customizations-list").classList.add("hidden"),document.getElementById("customization-details-view").classList.remove("hidden"),document.getElementById("customization-details-content").innerHTML=`
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h4 class="text-xl font-bold text-gray-900 mb-4">Customization Details</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 class="font-semibold text-gray-700 mb-2">Product Information</h5>
              <p class="text-sm text-gray-600 mb-1"><strong>Product Type:</strong> ${t.product_type||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Product Name:</strong> ${t.product_name||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Price:</strong> ${(t.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</p>
            </div>
            
            <div>
              <h5 class="font-semibold text-gray-700 mb-2">Project Information</h5>
              <p class="text-sm text-gray-600 mb-1"><strong>Project Name:</strong> ${t.project_name||"Not specified"}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Restaurant Name:</strong> ${t.restaurant_name||"N/A"}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Cuisine Type:</strong> ${t.cuisine_type||"N/A"}</p>
            </div>
          </div>
          
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Contact Information</h5>
            <p class="text-sm text-gray-600 mb-1"><strong>Email:</strong> ${t.contact_email||"Not provided"}</p>
            <p class="text-sm text-gray-600 mb-1"><strong>Phone:</strong> ${t.contact_phone||t.phone||"Not provided"}</p>
          </div>
          
          ${t.restaurant_address?`
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Restaurant Address</h5>
            <p class="text-sm text-gray-600">${t.restaurant_address}</p>
          </div>
          `:""}
          
          ${t.owner_name?`
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Owner Information</h5>
            <p class="text-sm text-gray-600 mb-1"><strong>Owner Name:</strong> ${t.owner_name}</p>
            <p class="text-sm text-gray-600 mb-1"><strong>Contact Person:</strong> ${t.contact_person||"Not provided"}</p>
          </div>
          `:""}
          
          ${t.menu_items&&t.menu_items.length>0?`
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Menu Items (${t.menu_items.length} items)</h5>
            ${(()=>{const e={};return t.menu_items.forEach(o=>{const n=o.item_category||o.category||"Uncategorized";e[n]||(e[n]=[]),e[n].push(o)}),Object.keys(e).map(o=>`
                <div class="mb-4">
                  <h6 class="font-medium text-gray-800 mb-2 text-sm uppercase tracking-wide">${o}</h6>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${e[o].map(n=>`
                      <div class="bg-gray-50 p-3 rounded border">
                        <div class="flex justify-between items-start">
                          <div>
                            <h6 class="font-medium text-gray-900">${n.item_name||"Unnamed Item"}</h6>
                          </div>
                          <span class="text-lg font-bold text-green-600">₹${n.price||"0"}</span>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `).join("")})()}
          </div>
          `:""}
          
          ${t.menu_categories&&t.menu_categories.length>0?`
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Menu Categories (${t.menu_categories.length} categories)</h5>
            <div class="flex flex-wrap gap-2">
              ${t.menu_categories.map(e=>`
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${e.name||"Unnamed Category"}</span>
              `).join("")}
            </div>
          </div>
          `:""}
          
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Color Customization</h5>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded border" style="background-color: ${t.primary_color||"#3B82F6"}"></div>
                <span class="text-sm text-gray-600"><strong>Primary:</strong> ${t.primary_color||"#3B82F6"}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded border" style="background-color: ${t.secondary_color||"#10B981"}"></div>
                <span class="text-sm text-gray-600"><strong>Secondary:</strong> ${t.secondary_color||"#10B981"}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded border" style="background-color: ${t.accent_color||"#F59E0B"}"></div>
                <span class="text-sm text-gray-600"><strong>Accent:</strong> ${t.accent_color||"#F59E0B"}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded border" style="background-color: ${t.text_color||"#1F2937"}"></div>
                <span class="text-sm text-gray-600"><strong>Text:</strong> ${t.text_color||"#1F2937"}</span>
              </div>
            </div>
          </div>
          
          ${t.logo_url?`
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Logo</h5>
            <img src="${t.logo_url}" alt="Logo" class="h-20 w-20 object-contain border rounded">
            <p class="text-xs text-gray-500 mt-1">${t.logo_filename||"Logo file"}</p>
          </div>
          `:""}
          
          ${t.additional_requirements?`
          <div class="mt-4">
            <h5 class="font-semibold text-gray-700 mb-2">Additional Requirements</h5>
            <p class="text-sm text-gray-600">${t.additional_requirements}</p>
          </div>
          `:""}
          
          <div class="mt-4 text-xs text-gray-500">
            <p><strong>Created:</strong> ${new Date(t.created_at).toLocaleString()}</p>
            <p><strong>Updated:</strong> ${new Date(t.updated_at).toLocaleString()}</p>
          </div>
        </div>
      `}catch(t){alert("Error loading customization details: "+t.message)}}function D(){document.getElementById("customization-details-view").classList.add("hidden"),document.getElementById("customizations-list").classList.remove("hidden")}window.viewCustomizationDetails=async function(s){console.log("Viewing customization details for:",s);try{let{data:t,error:a}=await c.from("customization_forms").select("*").eq("id",s).single();if(a&&a.status===406&&(console.log("406 error from customization_forms, trying oms_customizations..."),a={code:"PGRST116"}),a&&a.code==="PGRST116"){console.log("Not found in customization_forms, trying oms_customizations...");const{data:o,error:n}=await c.from("oms_customizations").select("*").eq("id",s).single();if(n){console.error("Error loading OMS customization details:",n),alert("Error loading customization details: "+n.message);return}t={id:o.id,contact_email:o.user_email,product_type:o.product_type||"order-menu-system",product_name:o.product_name||"Order Menu System",project_name:o.project_name,restaurant_name:o.restaurant_name,owner_name:o.owner_name,restaurant_address:o.restaurant_address,contact_person:o.contact_person,phone:o.phone_number,additional_requirements:o.additional_requirements,primary_color:o.primary_color,secondary_color:o.secondary_color,accent_color:o.accent_color,text_color:o.text_color,product_price:o.product_price,created_at:o.created_at,updated_at:o.updated_at,menu_categories:typeof o.menu_categories=="string"?JSON.parse(o.menu_categories):o.menu_categories||[],menu_items:typeof o.menu_items=="string"?JSON.parse(o.menu_items):o.menu_items||[],logo_url:o.logo_url,logo_filename:o.logo_filename,logo_size:o.logo_size},a=null}if(a){console.error("Error loading customization details:",a),alert("Error loading customization details: "+a.message);return}const e=`
Customization Details:
====================
Product Type: ${t.product_type||"Not specified"}
Product Name: ${t.product_name||"Not specified"}
Project Name: ${t.project_name||"Not specified"}
Price: ${(t.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}
Contact Email: ${t.contact_email||"Not provided"}
  Contact Phone: ${t.contact_phone||t.phone||"Not provided"}
Restaurant Name: ${t.restaurant_name||"N/A"}
Restaurant Address: ${t.restaurant_address||"Not provided"}
Owner Name: ${t.owner_name||"Not provided"}
Contact Person: ${t.contact_person||"Not provided"}
Cuisine Type: ${t.cuisine_type||"N/A"}

Color Customization:
Primary Color: ${t.primary_color||"#3B82F6"}
Secondary Color: ${t.secondary_color||"#10B981"}
Accent Color: ${t.accent_color||"#F59E0B"}
Text Color: ${t.text_color||"#1F2937"}

Created: ${new Date(t.created_at).toLocaleString()}
  ${t.additional_requirements?`Additional Requirements: ${t.additional_requirements}`:""}
  
  ${t.menu_items&&t.menu_items.length>0?`
  Menu Items (${t.menu_items.length} items):
  ${t.menu_items.map(o=>`- ${o.item_name||"Unnamed Item"} (${o.item_category||o.category||"Uncategorized"}) - ₹${o.price||"0"}`).join(`
`)}
  `:""}
  
  ${t.menu_categories&&t.menu_categories.length>0?`
  Menu Categories (${t.menu_categories.length} categories):
  ${t.menu_categories.map(o=>`- ${o.name||"Unnamed Category"}`).join(`
`)}
  `:""}
        `;alert(e)}catch(t){console.error("Error viewing customization details:",t),alert("Error viewing customization details: "+t.message)}};window.openContactFormsModal=v;window.closeContactFormsModal=w;window.openCustomizationsModal=$;window.closeCustomizationsModal=C;window.searchContacts=N;window.searchCustomizations=L;window.viewCustomizationDetailsInModal=z;window.backToCustomizationsList=D;window.viewContactDetailsInModal=I;window.backToContactsList=u;window.viewCustomizationDetails=viewCustomizationDetails;
