import"./ProductDialog.astro_astro_type_script_index_0_lang.C1LHbjNP.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";let i;function c(e){try{const t=new Date(e);if(isNaN(t.getTime()))return"Invalid Date";const o=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),s=t.getFullYear();return`${o}/${a}/${s}`}catch(t){return console.error("Error formatting date:",t),"Invalid Date"}}function x(){return new Promise(e=>{window.supabase&&window.supabase.createClient?(i=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),e(i)):setTimeout(()=>x().then(e),100)})}console.log("Admin data dashboard loaded successfully");document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin data dashboard...");try{console.log("⏳ Waiting for Supabase to load..."),await x(),console.log("✅ Supabase client ready"),await Promise.all([b(),w(),h(),_(),$()]),console.log("✅ All admin data loaded successfully")}catch(e){console.error("❌ Error loading admin data:",e)}});async function b(){try{console.log("🔄 Loading users data...");const{data:e,error:t}=await i.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading users:",t);return}const o=document.getElementById("users-table-body");if(!o)return;e&&e.length>0?o.innerHTML=e.map(a=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-600">${a.full_name?a.full_name.charAt(0).toUpperCase():"U"}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">${a.full_name||"No Name"}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${a.role==="admin"?"bg-red-100 text-red-800":"bg-green-100 text-green-800"}">
                ${a.role||"customer"}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${c(a.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.last_login?c(a.last_login):"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewUserDetails('${a.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(e){console.error("Error loading users data:",e)}}async function w(){try{console.log("🔄 Loading contact form data...");const{data:e,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact data:",t);return}const o=document.getElementById("contact-table-body");if(!o)return;e&&e.length>0?o.innerHTML=e.map(a=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${a.first_name} ${a.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.email||"Not provided"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.company_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.project_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${c(a.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${a.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(e){console.error("Error loading contact data:",e)}}async function h(){try{console.log("🔄 Loading support tickets data...");const{data:e,error:t}=await i.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);return}const o=document.getElementById("tickets-table-body");if(!o)return;e&&e.length>0?o.innerHTML=e.map(a=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${a.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.subject}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${a.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${a.priority==="high"?"bg-red-100 text-red-800":a.priority==="medium"?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"}">
                ${a.priority}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${a.status==="open"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
                ${a.status}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${c(a.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewTicketDetails('${a.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(e){console.error("Error loading tickets data:",e)}}async function _(){try{if(console.log("🔄 Loading cart customizations data..."),console.log("🔍 Supabase client available:",!!i),!i){console.error("❌ Supabase client not available");const l=document.getElementById("customizations-table-body");l&&(l.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}console.log("🔍 Fetching customization_forms data...");const{data:e,error:t}=await i.from("customization_forms").select("*").order("created_at",{ascending:!1});console.log("🔍 Fetching order_customizations data...");const{data:o,error:a}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});let s=[];if(e&&!t?(console.log("✅ Regular customizations loaded:",e.length),s=[...s,...e]):t&&console.error("❌ Error loading regular customizations:",t),o&&!a){console.log("✅ OMS customizations loaded:",o.length);const l=o.map(n=>({id:n.id,contact_email:n.email,product_type:"order-menu-system",product_name:"Order Menu System",project_name:n.project_name||"Not provided",restaurant_name:n.restaurant_name||"Not provided",owner_name:n.owner_name||"Not provided",restaurant_address:n.address_line_1,contact_person:n.contact_person||"Not provided",phone:n.phone_number||"Not provided",contact_phone:n.phone_number||"Not provided",additional_requirements:n.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:n.total_amount,created_at:n.created_at,updated_at:n.updated_at,menu_categories:n.menu_categories,menu_items:n.menu_items,logo_url:n.restaurant_logo_url,logo_filename:n.logo_filename,logo_size:n.logo_size}));s=[...s,...l]}else a&&console.error("❌ Error loading OMS customizations:",a);s.sort((l,n)=>new Date(n.created_at)-new Date(l.created_at)),console.log("🔍 Combined customizations data:",s.length,"total items");const r=document.getElementById("customizations-table-body");if(!r){console.error("❌ Customizations table body not found");return}s&&s.length>0?(console.log(`✅ Found ${s.length} customizations`),r.innerHTML=s.map(l=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${l.contact_email||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${l.product_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${l.product_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${l.project_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(l.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${c(l.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewCustomizationDetails('${l.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join("")):(console.log("ℹ️ No customizations found"),r.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No customizations found</td></tr>')}catch(e){console.error("❌ Error loading customizations data:",e);const t=document.getElementById("customizations-table-body");t&&(t.innerHTML=`<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Error: ${e.message}</td></tr>`)}}async function $(){try{const[e,t,o,a]=await Promise.all([i.from("profiles").select("*",{count:"exact",head:!0}),i.from("contact_submissions").select("*",{count:"exact",head:!0}),i.from("support_tickets").select("*",{count:"exact",head:!0}),i.from("customization_forms").select("*",{count:"exact",head:!0})]),s=e.count||0,r=t.count||0,l=o.count||0,n=a.count||0,p=document.getElementById("total-users"),m=document.getElementById("total-contacts"),g=document.getElementById("total-tickets"),d=document.getElementById("total-orders");p&&(p.textContent=s.toString()),m&&(m.textContent=r.toString()),g&&(g.textContent=l.toString()),d&&(d.textContent=n.toString()),console.log("✅ Summary cards updated")}catch(e){console.error("Error updating summary cards:",e)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("details-modal");document.getElementById("close-modal")?.addEventListener("click",()=>{e.classList.add("hidden")}),e?.addEventListener("click",o=>{o.target===e&&e.classList.add("hidden")})});window.viewUserDetails=async function(e){console.log("Viewing user details for:",e);try{const{data:t,error:o}=await i.from("profiles").select("*").eq("id",e).single();if(o){console.error("Error loading user details:",o);return}const a=document.getElementById("details-modal"),s=document.getElementById("modal-title"),r=document.getElementById("modal-content");s.textContent="User Details",r.innerHTML=`
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
      `,a.classList.remove("hidden")}catch(t){console.error("Error viewing user details:",t)}};window.viewContactDetails=async function(e){console.log("Viewing contact details for:",e);try{const{data:t,error:o}=await i.from("contact_submissions").select("*").eq("id",e).single();if(o){console.error("Error loading contact details:",o);return}const a=document.getElementById("details-modal"),s=document.getElementById("modal-title"),r=document.getElementById("modal-content");s.textContent="Contact Form Details",r.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Submitted:</strong> ${c(t.created_at)}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Project Details</h5>
            <p class="text-sm text-gray-600">${t.project_details||t.message||"No additional details provided"}</p>
          </div>
        </div>
      `,a.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};window.viewTicketDetails=async function(e){console.log("Viewing ticket details for:",e);try{const{data:t,error:o}=await i.from("support_tickets").select("*").eq("id",e).single();if(o){console.error("Error loading ticket details:",o);return}const a=document.getElementById("details-modal"),s=document.getElementById("modal-title"),r=document.getElementById("modal-content");s.textContent=`Support Ticket #${t.id}`,r.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Created:</strong> ${c(t.created_at)}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Description</h5>
            <p class="text-sm text-gray-600">${t.description||"No description provided"}</p>
          </div>
        </div>
      `,a.classList.remove("hidden")}catch(t){console.error("Error viewing ticket details:",t)}};window.viewCartDetails=async function(e){console.log("Viewing cart details for:",e);try{const{data:t,error:o}=await i.from("customization_forms").select("*").eq("id",e).single();if(o){console.error("Error loading cart details:",o);return}const a=document.getElementById("details-modal"),s=document.getElementById("modal-title"),r=document.getElementById("modal-content");s.textContent="Cart Customization Details",r.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Created:</strong> ${c(t.created_at)}</p>
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
      `,a.classList.remove("hidden")}catch(t){console.error("Error viewing cart details:",t)}};function C(){console.log("🔄 Opening contact forms modal...");const e=document.getElementById("contactFormsModal");e?(e.classList.remove("hidden"),document.body.style.overflow="hidden",console.log("✅ Modal opened, loading contact forms..."),E()):console.error("❌ Contact forms modal not found")}function N(){const e=document.getElementById("contactFormsModal");e&&(e.classList.add("hidden"),document.body.style.overflow="auto")}async function E(){try{console.log("🔄 Loading contact forms from contact_submissions table...");const{data:e,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact forms:",t),alert("Error loading contact forms: "+t.message);return}console.log("✅ Contact forms loaded successfully:",e?.length||0,"contacts found");const o=document.getElementById("contacts-list"),a=document.getElementById("no-contacts");if(!e||e.length===0){o.classList.add("hidden"),a.classList.remove("hidden");return}a.classList.add("hidden"),o.classList.remove("hidden"),o.innerHTML=e.map(s=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Contact Form
              </span>
            </div>
            <span class="text-sm text-gray-500">${c(s.created_at)}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2">${s.first_name} ${s.last_name||""}</h4>
          <p class="text-gray-600 text-sm mb-2">${s.message?s.message.length>100?s.message.substring(0,100)+"...":s.message:"No message"}</p>
          <p class="text-gray-500 text-xs mb-3">Email: ${s.email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3">Phone: ${s.phone||"Not provided"}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewContactDetailsInModal('${s.id}')" 
              class="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(e){alert("Error loading contact forms: "+e.message)}}function L(){const e=document.getElementById("contactSearch").value.toLowerCase();document.querySelectorAll("#contacts-list > div").forEach(o=>{const a=o.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",s=o.querySelector("h4")?.textContent.toLowerCase()||"",r=o.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";a.includes(e)||s.includes(e)||r.includes(e)?o.style.display="block":o.style.display="none"})}async function I(e){try{const{data:t,error:o}=await i.from("contact_submissions").select("*").eq("id",e).single();if(o){alert("Error loading contact details: "+o.message);return}document.getElementById("contacts-list").classList.add("hidden"),document.getElementById("contact-details-view").classList.remove("hidden"),setTimeout(()=>{const s=document.getElementById("contact-details-view");if(s){s.replaceWith(s.cloneNode(!0));const r=document.getElementById("contact-details-view");r.addEventListener("click",function(l){l.target===r&&y()})}},100);const a=document.getElementById("contact-details-content");a.innerHTML=`
        <div class="bg-white rounded-lg shadow p-6">
          <h4 class="text-xl font-bold text-gray-900 mb-6">Contact Form Details</h4>
          
          <!-- Contact Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">First Name:</span>
                  <span class="text-sm text-gray-900">${t.first_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Last Name:</span>
                  <span class="text-sm text-gray-900">${t.last_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Email:</span>
                  <span class="text-sm text-gray-900">${t.email||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Phone:</span>
                  <span class="text-sm text-gray-900">${t.phone||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Company:</span>
                  <span class="text-sm text-gray-900">${t.company_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Project Type:</span>
                  <span class="text-sm text-gray-900">${t.project_type||"Not specified"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Submitted:</span>
                  <span class="text-sm text-gray-900">${new Date(t.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Message Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Message</h5>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm font-bold text-gray-600">Message:</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap">${t.message||"No message provided"}</span>
              </div>
            </div>
          </div>
        </div>
      `}catch(t){console.error("Error viewing contact details:",t),alert("Error loading contact details: "+t.message)}}function y(){document.getElementById("contact-details-view").classList.add("hidden"),document.getElementById("contacts-list").classList.remove("hidden")}function j(){console.log("🔄 Opening customization forms modal...");const e=document.getElementById("customizationFormsModal");e?(e.classList.remove("hidden"),document.body.style.overflow="hidden",console.log("✅ Modal opened, loading customization forms..."),S()):console.error("❌ Customization forms modal not found")}function z(){const e=document.getElementById("customizationFormsModal");e&&(e.classList.add("hidden"),document.body.style.overflow="auto")}async function S(){try{console.log("🔄 Loading customization forms from order_customizations table...");const{data:e,error:t}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading customization forms:",t),alert("Error loading customization forms: "+t.message);return}console.log("✅ Customization forms loaded successfully:",e?.length||0,"forms found");const o=document.getElementById("customizations-list"),a=document.getElementById("no-customizations");if(!e||e.length===0){o.classList.add("hidden"),a.classList.remove("hidden");return}a.classList.add("hidden"),o.classList.remove("hidden"),o.innerHTML=e.map(s=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                Order Menu System
              </span>
            </div>
            <span class="text-sm text-gray-500">${c(s.created_at)}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2">${s.project_name||"No Project Name"}</h4>
          <div class="text-gray-600 text-sm mb-2">
            <p class="mb-1"><strong>Restaurant Name:</strong> ${s.restaurant_name||"Not provided"}</p>
            <p class="mb-1"><strong>Owner Name:</strong> ${s.owner_name||"Not provided"}</p>
            <p class="mb-1"><strong>Contact Person:</strong> ${s.contact_person||"Not provided"}</p>
            <p class="mb-1"><strong>Total Amount:</strong> ₹${(s.total_amount||0).toLocaleString("en-IN")}</p>
            <p class="mb-1"><strong>Additional Requirements:</strong> ${s.additional_requirements?s.additional_requirements.length>100?s.additional_requirements.substring(0,100)+"...":s.additional_requirements:"No additional requirements provided"}</p>
          </div>
          <p class="text-gray-500 text-xs mb-3">Email: ${s.email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3">Phone: ${s.phone_number||"Not provided"}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewCustomizationDetailsInModal('${s.id}')" 
              class="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(e){alert("Error loading customization forms: "+e.message)}}function D(){const e=document.getElementById("customizationSearch").value.toLowerCase();document.querySelectorAll("#customizations-list > div").forEach(o=>{const a=o.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",s=o.querySelector("h4")?.textContent.toLowerCase()||"",r=o.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";a.includes(e)||s.includes(e)||r.includes(e)?o.style.display="block":o.style.display="none"})}async function M(e){try{console.log("🔄 Loading customization details for:",e);const{data:t,error:o}=await i.from("order_customizations").select("*").eq("id",e).single();if(o){alert("Error loading customization details: "+o.message);return}document.getElementById("customizations-list").classList.add("hidden"),document.getElementById("customization-details-view").classList.remove("hidden"),setTimeout(()=>{const d=document.getElementById("customization-details-view");if(d){d.replaceWith(d.cloneNode(!0));const u=document.getElementById("customization-details-view");u.addEventListener("click",function(v){v.target===u&&f()})}},100);const a=document.getElementById("customization-details-content");let s=t.menu_photos_urls||[];try{typeof s=="string"&&(s=JSON.parse(s))}catch{}const r=t.restaurant_logo_url||t.logo_url||"";let l=!1;(!Array.isArray(s)||s.length===0)&&r&&(s=[{url:r,filename:"restaurant-logo"}],l=!0);const n=Array.isArray(s)&&s.length?`<div class="grid grid-cols-3 sm:grid-cols-4 gap-3">${s.map(d=>`
            <a href="${d.url||d.publicUrl}" target="_blank" class="block">
              <img src="${d.url||d.publicUrl}" crossorigin="anonymous" alt="${d.filename||"menu photo"}" class="w-20 h-20 object-cover rounded border"/>
              <p class="mt-1 text-xs text-gray-500 truncate">${d.filename||""}</p>
            </a>
          `).join("")}</div>`:'<p class="text-gray-500">No menu photos uploaded</p>',p=Array.isArray(s)&&s.length>0,m=(!!t.restaurant_logo_url||!!t.logo_url)&&!p&&!l,g=m?`<img src="${t.restaurant_logo_url||t.logo_url}" alt="Restaurant Logo" class="w-20 h-20 object-cover rounded border"/>`:"";a.innerHTML=`
        <div class="bg-white rounded-lg shadow p-6">
          <h4 class="text-xl font-bold text-gray-900 mb-6">Customization Form Details</h4>
          
          <!-- Product Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Product Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Product Type:</span>
                  <span class="text-sm text-gray-900">Order Menu System</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Product Name:</span>
                  <span class="text-sm text-gray-900">Order Menu System</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Price:</span>
                  <span class="text-sm text-gray-900">₹${(t.total_amount||0).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Project Name:</span>
                  <span class="text-sm text-gray-900">${t.project_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Restaurant Name:</span>
                  <span class="text-sm text-gray-900">${t.restaurant_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Owner Name:</span>
                  <span class="text-sm text-gray-900">${t.owner_name||"Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Images Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Images</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${m?`
              <div>
                <p class="text-sm font-bold text-gray-600 mb-2">Restaurant Logo</p>
                ${g||'<span class="text-gray-500">Not uploaded</span>'}
              </div>
              `:""}
              <div>
                <p class="text-sm font-bold text-gray-600 mb-2">Menu Photos</p>
                ${n}
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Email:</span>
                  <span class="text-sm text-gray-900">${t.email||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Phone:</span>
                  <span class="text-sm text-gray-900">${t.phone_number||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Contact Person:</span>
                  <span class="text-sm text-gray-900">${t.contact_person||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Created:</span>
                  <span class="text-sm text-gray-900">${new Date(t.created_at).toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Updated:</span>
                  <span class="text-sm text-gray-900">${new Date(t.updated_at||t.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Address Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Address Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">House/Flat Number:</span>
                  <span class="text-sm text-gray-900">${t.house_flat_number||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Address:</span>
                  <span class="text-sm text-gray-900">${t.address_line_1||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">City:</span>
                  <span class="text-sm text-gray-900">${t.city||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">State:</span>
                  <span class="text-sm text-gray-900">${t.state||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Pincode:</span>
                  <span class="text-sm text-gray-900">${t.pincode||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-bold text-gray-600">Country:</span>
                  <span class="text-sm text-gray-900">${t.country||"Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Additional Requirements Section -->
          ${t.additional_requirements?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Additional Requirements</h5>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm font-bold text-gray-600">Requirements:</span>
                <span class="text-sm text-gray-900">${t.additional_requirements}</span>
              </div>
            </div>
          </div>
          `:""}
          
          <!-- Logo Section -->
          ${t.restaurant_logo_url?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Restaurant Logo</h5>
            <div class="flex items-center space-x-4">
              <img src="${t.restaurant_logo_url}" alt="Restaurant Logo" class="h-16 w-16 object-contain border rounded">
              <div>
                <p class="text-sm text-gray-600">${t.logo_filename||"Restaurant Logo"}</p>
                <p class="text-xs text-gray-500">Logo uploaded successfully</p>
              </div>
            </div>
          </div>
          `:""}
          
          
        </div>
      `}catch(t){console.error("Error viewing customization details:",t),alert("Error loading customization details: "+t.message)}}function f(){document.getElementById("customization-details-view").classList.add("hidden"),document.getElementById("customizations-list").classList.remove("hidden")}window.viewCustomizationDetails=async function(e){console.log("🔄 Loading customization details for table view:",e);try{const{data:t,error:o}=await i.from("order_customizations").select("*").eq("id",e).single();if(o){console.error("Error loading customization details:",o),alert("Error loading customization details: "+o.message);return}const a=`
Customization Details:
====================
Product Type: Order Menu System
Product Name: Order Menu System
Project Name: ${t.project_name||"Not provided"}
Price: ₹${(t.total_amount||0).toLocaleString("en-IN")}
Contact Email: ${t.email||"Not provided"}
Phone: ${t.phone_number||"Not provided"}
Restaurant Name: ${t.restaurant_name||"Not provided"}
Owner Name: ${t.owner_name||"Not provided"}
Contact Person: ${t.contact_person||"Not provided"}

Address Information:
House/Flat Number: ${t.house_flat_number||"Not provided"}
Address: ${t.address_line_1||"Not provided"}
City: ${t.city||"Not provided"}
State: ${t.state||"Not provided"}
Pincode: ${t.pincode||"Not provided"}
Country: ${t.country||"Not provided"}

Created: ${new Date(t.created_at).toLocaleString()}
${t.additional_requirements?`Additional Requirements: ${t.additional_requirements}`:""}
        `;alert(a)}catch(t){console.error("Error viewing customization details:",t),alert("Error viewing customization details: "+t.message)}};window.openContactFormsModal=C;window.closeContactFormsModal=N;window.searchContacts=L;window.viewContactDetailsInModal=I;window.backToContactsList=y;window.openCustomizationFormsModal=j;window.closeCustomizationFormsModal=z;window.searchCustomizations=D;window.viewCustomizationDetailsInModal=M;window.backToCustomizationsList=f;window.viewCustomizationDetails=viewCustomizationDetails;
