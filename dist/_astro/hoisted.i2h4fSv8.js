import"./ProductDialog.astro_astro_type_script_index_0_lang.r4zW4cVw.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const h="https://lmrrdcaavwwletcjcpqv.supabase.co",v="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let c=null;function _(){return new Promise(e=>{window.supabase?(c=window.supabase.createClient(h,v),e(c)):setTimeout(()=>_().then(e),100)})}console.log("Admin dashboard loaded successfully");window.addEventListener("load",()=>{console.log("✅ Admin panel loaded successfully");const e=document.getElementById("customizations-table-body");e&&(e.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">Loading customizations...</td></tr>')});document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin dashboard data..."),console.log("✅ Admin dashboard JavaScript is running!"),c||(console.log("⏳ Waiting for Supabase client..."),await _()),console.log("🔍 Supabase client:",c),console.log("🔍 Customizations table body element:",document.getElementById("customizations-table-body"));const e=document.getElementById("users-table-body"),t=document.getElementById("contact-table-body");e&&(e.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading users...</td></tr>'),t&&(t.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading contacts...</td></tr>');try{console.log("🔍 Testing Supabase connection...");const{data:a,error:s}=await c.from("profiles").select("count",{count:"exact",head:!0});console.log("Profiles table test:",{data:a,error:s});const{data:r,error:i}=await c.from("contact_submissions").select("count",{count:"exact",head:!0});if(console.log("Contact submissions table test:",{data:r,error:i}),s&&(console.error("❌ Profiles table error:",s),alert("Profiles table error: "+s.message)),i){console.error("❌ Contact submissions table error:",i);const o=document.getElementById("contact-table-body");o&&(i.message.includes("Could not find the table")?o.innerHTML=`
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-red-500">
                  <div class="space-y-2">
                    <p class="font-semibold">Table 'contact_submissions' not found!</p>
                    <p class="text-sm">The database table needs to be created.</p>
                    <p class="text-sm">Please run the database migration or contact the administrator.</p>
                  </div>
                </td>
              </tr>
            `:o.innerHTML=`
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-red-500">
                  Error: ${i.message}
                </td>
              </tr>
            `)}console.log("✅ Supabase connection tests completed"),console.log("🔄 Loading users data..."),await w(),console.log("🔄 Loading contact data..."),await $(),console.log("🔄 Loading tickets data..."),await C(),console.log("🔄 Loading customizations data..."),await b(),console.log("🔄 Updating summary cards..."),await E(),console.log("✅ All admin data loaded successfully")}catch(a){console.error("❌ Error loading admin data:",a),alert("Error loading admin data: "+a.message)}});async function w(){try{console.log("🔄 Loading users data from profiles table...");const{data:e,error:t}=await c.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading users:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const s=document.getElementById("users-table-body");s&&(s.innerHTML=`
            <tr>
              <td colspan="6" class="px-6 py-4 text-center text-red-500">
                Error loading users: ${t.message}
              </td>
            </tr>
          `);return}console.log("✅ Users loaded successfully:",e?.length||0,"users found");const a=document.getElementById("users-table-body");if(!a)return;e&&e.length>0?a.innerHTML=e.map(s=>`
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
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(e){console.error("Error loading users data:",e)}}async function $(){try{console.log("🔄 Loading contact form data from contact_submissions table...");const{data:e,error:t}=await c.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact data:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const s=document.getElementById("contact-table-body");s&&(s.innerHTML=`
            <tr>
              <td colspan="6" class="px-6 py-4 text-center text-red-500">
                Error loading contact data: ${t.message}
              </td>
            </tr>
          `);return}console.log("✅ Contact data loaded successfully:",e?.length||0,"contacts found");const a=document.getElementById("contact-table-body");if(!a)return;e&&e.length>0?a.innerHTML=e.map(s=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${s.first_name} ${s.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.company_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${s.project_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(s.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${s.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(e){console.error("Error loading contact data:",e)}}async function C(){try{console.log("🔄 Loading support tickets data...");const{data:e,error:t}=await c.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);return}const a=document.getElementById("tickets-table-body");if(!a)return;e&&e.length>0?a.innerHTML=e.map(s=>`
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
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(e){console.error("Error loading tickets data:",e)}}async function b(){try{if(console.log("🔄 Loading customizations data..."),console.log("🔍 Supabase client available:",!!c),console.log("🔍 Function called at:",new Date().toISOString()),!c){console.error("❌ Supabase client not available");const o=document.getElementById("customizations-table-body");o&&(o.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}console.log("🔍 Fetching customization_forms data...");const{data:e,error:t}=await c.from("customization_forms").select("*").order("created_at",{ascending:!1});console.log("🔍 Fetching oms_customizations data...");const{data:a,error:s}=await c.from("oms_customizations").select("*").order("created_at",{ascending:!1});let r=[];if(e&&!t?(console.log("✅ Regular customizations loaded:",e.length),r=[...r,...e]):t&&console.error("❌ Error loading regular customizations:",t),a&&!s){console.log("✅ OMS customizations loaded:",a.length);const o=a.map(n=>({id:n.id,contact_email:n.user_email,product_type:n.product_type||"order-menu-system",product_name:n.product_name||"Order Menu System",project_name:n.project_name,restaurant_name:n.restaurant_name,owner_name:n.owner_name,restaurant_address:n.restaurant_address,contact_person:n.contact_person,phone:n.phone_number,additional_requirements:n.additional_requirements,primary_color:n.primary_color,secondary_color:n.secondary_color,accent_color:n.accent_color,text_color:n.text_color,product_price:n.product_price,created_at:n.created_at,updated_at:n.updated_at,menu_categories:typeof n.menu_categories=="string"?JSON.parse(n.menu_categories):n.menu_categories||[],menu_items:typeof n.menu_items=="string"?JSON.parse(n.menu_items):n.menu_items||[],logo_url:n.logo_url,logo_filename:n.logo_filename,logo_size:n.logo_size}));r=[...r,...o]}else s&&console.error("❌ Error loading OMS customizations:",s);r.sort((o,n)=>new Date(n.created_at)-new Date(o.created_at)),console.log("🔍 Combined customizations data:",r.length,"total items");const i=document.getElementById("customizations-table-body");if(!i){console.error("❌ Customizations table body not found");return}console.log("🔍 Customizations data received:",r),r&&r.length>0?(console.log(`✅ Found ${r.length} customizations`),console.log("First customization data:",r[0]),i.innerHTML=r.map(o=>(console.log("Processing customization:",o.id,o.contact_email,o.product_name),`
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.contact_email||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.product_type||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.product_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.project_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(o.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(o.created_at).toLocaleDateString()}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="viewCustomizationDetails('${o.id}')" class="text-blue-600 hover:text-blue-900 cursor-pointer">View Details</button>
              </td>
            </tr>
          `)).join("")):(console.log("ℹ️ No customizations found"),i.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No customizations found</td></tr>')}catch(e){console.error("❌ Error loading customizations data:",e);const t=document.getElementById("customizations-table-body");t&&(t.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${e.message}</td></tr>`)}}async function E(){try{const[e,t,a,s]=await Promise.all([c.from("profiles").select("*",{count:"exact",head:!0}),c.from("contact_submissions").select("*",{count:"exact",head:!0}),c.from("support_tickets").select("*",{count:"exact",head:!0}),c.from("customization_forms").select("*",{count:"exact",head:!0})]),r=e.count||0,i=t.count||0,o=a.count||0,n=s.count||0,m=document.getElementById("total-users"),l=document.getElementById("total-contacts"),y=document.getElementById("total-tickets"),x=document.getElementById("total-revenue"),f=document.getElementById("total-customizations");m&&(m.textContent=r.toString()),l&&(l.textContent=i.toString()),y&&(y.textContent=o.toString()),f&&(f.textContent=n.toString()),x&&(x.textContent="₹0"),console.log("✅ Summary cards updated")}catch(e){console.error("Error updating summary cards:",e)}}window.viewContactDetails=async function(e){console.log("Viewing contact details for:",e);try{const{data:t,error:a}=await c.from("contact_submissions").select("*").eq("id",e).single();if(a){console.error("Error loading contact details:",a);return}const s=document.getElementById("details-modal"),r=document.getElementById("modal-title"),i=document.getElementById("modal-content");r.textContent="Contact Form Details",i.innerHTML=`
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
      `,s.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};let d=[],p=[];window.showContactFormDetails=async function(){console.log("Loading all contact form details...");try{const{data:e,error:t}=await c.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact details:",t);return}d=e||[];const a=document.getElementById("contact-details-modal"),s=document.getElementById("contact-modal-title"),r=document.getElementById("contact-modal-content");s.textContent=`All Contact Form Details (${d.length} submissions)`,r.innerHTML=`
        <div class="mb-6">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              id="contact-search-input" 
              placeholder="Search by email address..." 
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onkeyup="filterContacts()"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">Type an email address to quickly find a specific contact submission</p>
        </div>
        <div id="contacts-list" class="space-y-6 max-h-96 overflow-y-auto">
          ${g(d)}
        </div>
      `,a.classList.remove("hidden")}catch(e){console.error("Error loading contact details:",e)}};function g(e){return e&&e.length>0?e.map((t,a)=>`
        <div class="bg-gray-50 p-4 rounded-lg border contact-item" data-email="${(t.email||"").toLowerCase()}">
          <div class="flex justify-between items-start mb-3">
            <h4 class="text-lg font-semibold text-gray-900">#${a+1} - ${t.first_name} ${t.last_name}</h4>
            <span class="text-sm text-gray-500">${new Date(t.created_at).toLocaleDateString()}</span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-600"><strong>Email:</strong> <span class="font-mono text-indigo-600">${t.email||"Not provided"}</span></p>
              <p class="text-sm text-gray-600"><strong>Phone:</strong> ${t.phone||"Not provided"}</p>
              <p class="text-sm text-gray-600"><strong>Company:</strong> ${t.company_name||"Not provided"}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600"><strong>Project Type:</strong> ${t.project_type||"Not specified"}</p>
              <p class="text-sm text-gray-600"><strong>Submitted:</strong> ${new Date(t.created_at).toLocaleString()}</p>
            </div>
          </div>
          
          <div class="bg-white p-3 rounded border">
            <h5 class="font-medium text-gray-900 mb-2">Project Details:</h5>
            <p class="text-sm text-gray-600 whitespace-pre-wrap">${t.project_details||t.message||"No additional details provided"}</p>
          </div>
        </div>
      `).join(""):`
        <div class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No contact submissions found</h3>
          <p class="mt-1 text-sm text-gray-500">No contact form submissions match your search criteria.</p>
        </div>
      `}window.filterContacts=function(){const e=document.getElementById("contact-search-input"),t=document.getElementById("contact-modal-title"),a=e.value.toLowerCase().trim();if(!a){document.getElementById("contacts-list").innerHTML=g(d),t.textContent=`All Contact Form Details (${d.length} submissions)`;return}const s=d.filter(r=>(r.email||"").toLowerCase().includes(a));document.getElementById("contacts-list").innerHTML=g(s),t.textContent=`Contact Form Details (${s.length} of ${d.length} submissions)`};window.showCustomizations=async function(){console.log("Loading all customizations...");try{const{data:e,error:t}=await c.from("customization_forms").select("*").order("created_at",{ascending:!1}),{data:a,error:s}=await c.from("oms_customizations").select("*").order("created_at",{ascending:!1});let r=[];if(e&&!t?r=[...r,...e]:t&&console.error("Error loading regular customizations:",t),a&&!s){const m=a.map(l=>({id:l.id,contact_email:l.user_email,product_type:l.product_type||"order-menu-system",product_name:l.product_name||"Order Menu System",project_name:l.project_name,restaurant_name:l.restaurant_name,owner_name:l.owner_name,restaurant_address:l.restaurant_address,contact_person:l.contact_person,phone:l.phone_number,additional_requirements:l.additional_requirements,primary_color:l.primary_color,secondary_color:l.secondary_color,accent_color:l.accent_color,text_color:l.text_color,product_price:l.product_price,created_at:l.created_at,updated_at:l.updated_at,menu_categories:typeof l.menu_categories=="string"?JSON.parse(l.menu_categories):l.menu_categories||[],menu_items:typeof l.menu_items=="string"?JSON.parse(l.menu_items):l.menu_items||[],logo_url:l.logo_url,logo_filename:l.logo_filename,logo_size:l.logo_size}));r=[...r,...m]}else s&&console.error("Error loading OMS customizations:",s);r.sort((m,l)=>new Date(l.created_at)-new Date(m.created_at)),window.allCustomizations=r;const i=document.getElementById("customizations-modal"),o=document.getElementById("customizations-modal-title"),n=document.getElementById("customizations-modal-content");o.textContent=`All Product Customizations (${r.length} items)`,n.innerHTML=`
        <div class="mb-6">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              id="customizations-search-input" 
              placeholder="Search by email address..." 
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onkeyup="filterCustomizations()"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">Type an email address to quickly find a specific customization</p>
        </div>
        <div id="customizations-list" class="space-y-6 max-h-96 overflow-y-auto">
          ${u(r)}
        </div>
      `,i.classList.remove("hidden")}catch(e){console.error("Error loading customizations:",e),alert("Error loading customizations: "+e.message)}};function u(e){return e&&e.length>0?e.map((t,a)=>`
        <div class="bg-gray-50 p-4 rounded-lg border customization-item" data-email="${(t.contact_email||"").toLowerCase()}">
            <div class="flex justify-between items-start mb-3">
            <h4 class="text-lg font-semibold text-gray-900">#${a+1} - ${t.product_name||"Unknown Product"}</h4>
            <span class="text-sm text-gray-500">${new Date(t.created_at).toLocaleDateString()}</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
              <p class="text-sm text-gray-600"><strong>Contact Email:</strong> <span class="font-mono text-indigo-600">${t.contact_email||"Not provided"}</span></p>
              <p class="text-sm text-gray-600"><strong>Product Type:</strong> ${t.product_type||"Not specified"}</p>
              <p class="text-sm text-gray-600"><strong>Product Name:</strong> ${t.product_name||"Not provided"}</p>
              <p class="text-sm text-gray-600"><strong>Project Name:</strong> ${t.project_name||"Not provided"}</p>
              ${t.restaurant_name?`<p class="text-sm text-gray-600"><strong>Restaurant Name:</strong> ${t.restaurant_name}</p>`:""}
              ${t.owner_name?`<p class="text-sm text-gray-600"><strong>Owner Name:</strong> ${t.owner_name}</p>`:""}
              </div>
              <div>
              <p class="text-sm text-gray-600"><strong>Price:</strong> ${(t.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</p>
              <p class="text-sm text-gray-600"><strong>Contact Person:</strong> ${t.contact_person||"N/A"}</p>
              <p class="text-sm text-gray-600"><strong>Phone:</strong> ${t.phone||"N/A"}</p>
              <p class="text-sm text-gray-600"><strong>Cuisine Type:</strong> ${t.cuisine_type||"N/A"}</p>
              <p class="text-sm text-gray-600"><strong>Created:</strong> ${new Date(t.created_at).toLocaleString()}</p>
              </div>
            </div>
            
            ${t.restaurant_address?`
            <div class="bg-white p-3 rounded border mb-3">
              <h5 class="font-medium text-gray-900 mb-2">Restaurant Address:</h5>
              <p class="text-sm text-gray-600">${t.restaurant_address}</p>
            </div>
            `:""}
            
            ${t.menu_items&&t.menu_items.length>0?`
            <div class="bg-white p-3 rounded border mb-3">
              <h5 class="font-medium text-gray-900 mb-2">Menu Items (${t.menu_items.length} items):</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                ${t.menu_items.slice(0,6).map(s=>`
                  <div class="text-sm text-gray-600">
                    <strong>${s.item_name||"Unnamed Item"}</strong> - ₹${s.price||"0"} 
                    <span class="text-gray-500">(${s.item_category||"Uncategorized"})</span>
                  </div>
                `).join("")}
                ${t.menu_items.length>6?`<div class="text-sm text-gray-500">... and ${t.menu_items.length-6} more items</div>`:""}
              </div>
            </div>
            `:""}
            
            ${t.primary_color||t.secondary_color||t.accent_color||t.text_color?`
            <div class="bg-white p-3 rounded border mb-3">
              <h5 class="font-medium text-gray-900 mb-2">Color Customization:</h5>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${t.primary_color?`
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 rounded border" style="background-color: ${t.primary_color}"></div>
                  <span class="text-sm text-gray-600"><strong>Primary:</strong> ${t.primary_color}</span>
                </div>
                `:""}
                ${t.secondary_color?`
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 rounded border" style="background-color: ${t.secondary_color}"></div>
                  <span class="text-sm text-gray-600"><strong>Secondary:</strong> ${t.secondary_color}</span>
                </div>
                `:""}
                ${t.accent_color?`
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 rounded border" style="background-color: ${t.accent_color}"></div>
                  <span class="text-sm text-gray-600"><strong>Accent:</strong> ${t.accent_color}</span>
                </div>
                `:""}
                ${t.text_color?`
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 rounded border" style="background-color: ${t.text_color}"></div>
                  <span class="text-sm text-gray-600"><strong>Text:</strong> ${t.text_color}</span>
                </div>
                `:""}
              </div>
            </div>
            `:""}
            
          ${t.logo_url?`
            <div class="bg-white p-3 rounded border mb-3">
            <h5 class="font-medium text-gray-900 mb-2">Logo:</h5>
            <img src="${t.logo_url}" alt="Logo" class="h-16 w-16 object-contain border rounded">
            <p class="text-xs text-gray-500 mt-1">${t.logo_filename||"Logo file"}</p>
            </div>
            `:""}
            
          ${t.additional_requirements?`
            <div class="bg-white p-3 rounded border">
            <h5 class="font-medium text-gray-900 mb-2">Additional Requirements:</h5>
            <p class="text-sm text-gray-600">${t.additional_requirements}</p>
            </div>
              `:""}
            </div>
      `).join(""):`
        <div class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No customizations found</h3>
          <p class="mt-1 text-sm text-gray-500">No customizations match your search criteria.</p>
        </div>
      `}window.filterCustomizations=function(){const e=document.getElementById("customizations-search-input"),t=document.getElementById("customizations-modal-title"),a=e.value.toLowerCase().trim();if(!a){document.getElementById("customizations-list").innerHTML=u(p),t.textContent=`All Product Customizations (${p.length} items)`;return}const s=p.filter(r=>(r.contact_email||"").toLowerCase().includes(a));document.getElementById("customizations-list").innerHTML=u(s),t.textContent=`Product Customizations (${s.length} of ${p.length} items)`};window.loadCustomizationsData=b;window.viewCustomizationDetails=async function(e){console.log("🔍 Viewing customization details for ID:",e),console.log("🔍 Supabase client available:",!!c);try{if(!c){console.error("❌ Supabase client not available"),alert("Database connection not available. Please refresh the page.");return}console.log("🔍 Fetching customization data from database...");let{data:t,error:a}=await c.from("customization_forms").select("*").eq("id",e).single();if(a&&a.code==="PGRST116"){console.log("Not found in customization_forms, trying oms_customizations...");const{data:o,error:n}=await c.from("oms_customizations").select("*").eq("id",e).single();if(n){console.error("Error loading OMS customization details:",n),alert("Error loading customization details: "+n.message);return}t={id:o.id,contact_email:o.user_email,product_type:o.product_type||"order-menu-system",product_name:o.product_name||"Order Menu System",project_name:o.project_name,restaurant_name:o.restaurant_name,owner_name:o.owner_name,restaurant_address:o.restaurant_address,contact_person:o.contact_person,phone:o.phone_number,additional_requirements:o.additional_requirements,primary_color:o.primary_color,secondary_color:o.secondary_color,accent_color:o.accent_color,text_color:o.text_color,product_price:o.product_price,created_at:o.created_at,updated_at:o.updated_at,menu_categories:o.menu_categories,menu_items:o.menu_items,logo_url:o.logo_url,logo_filename:o.logo_filename,logo_size:o.logo_size},a=null}if(console.log("🔍 Database response:",{data:t,error:a}),a){console.error("❌ Error loading customization details:",a),alert("Error loading customization details: "+a.message);return}if(!t){console.error("❌ No customization found with ID:",e),alert("No customization found with the specified ID.");return}console.log("✅ Customization data loaded:",t);const s=document.getElementById("details-modal"),r=document.getElementById("modal-title"),i=document.getElementById("modal-content");if(console.log("🔍 Modal elements found:",{modal:!!s,modalTitle:!!r,modalContent:!!i}),!s||!r||!i){console.error("❌ Modal elements not found"),alert("Modal elements not found. Please refresh the page.");return}r.textContent="Customization Details",i.innerHTML=`
        <div class="space-y-4">
          <!-- Product Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Product Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Product Type:</span>
                <span class="text-sm text-gray-900">${t.product_type||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Product Name:</span>
                <span class="text-sm text-gray-900">${t.product_name||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Price:</span>
                <span class="text-sm text-gray-900">${(t.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Project Name:</span>
                <span class="text-sm text-gray-900">${t.project_name||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Restaurant Name:</span>
                <span class="text-sm text-gray-900">${t.restaurant_name||"N/A"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Cuisine Type:</span>
                <span class="text-sm text-gray-900">${t.cuisine_type||"N/A"}</span>
              </div>
            </div>
          </div>
          
          <!-- Contact Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Email:</span>
                <span class="text-sm text-gray-900">${t.contact_email||"Not provided"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Phone:</span>
                <span class="text-sm text-gray-900">${t.contact_phone||"Not provided"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Created:</span>
                <span class="text-sm text-gray-900">${new Date(t.created_at).toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Updated:</span>
                <span class="text-sm text-gray-900">${new Date(t.updated_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          ${t.additional_requirements?`
          <!-- Additional Requirements Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Additional Requirements</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Requirements:</span>
                <span class="text-sm text-gray-900">${t.additional_requirements}</span>
              </div>
            </div>
          </div>
          `:""}
          
          ${t.primary_color||t.secondary_color||t.accent_color||t.text_color?`
          <!-- Color Customization Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Color Customization</h4>
            <div class="space-y-2">
              ${t.primary_color?`
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600">Primary:</span>
                <div class="flex items-center space-x-2">
                  <span class="inline-block w-4 h-4 rounded border" style="background-color: ${t.primary_color}"></span>
                  <span class="text-sm text-gray-900">${t.primary_color}</span>
                </div>
              </div>
              `:""}
              ${t.secondary_color?`
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600">Secondary:</span>
                <div class="flex items-center space-x-2">
                  <span class="inline-block w-4 h-4 rounded border" style="background-color: ${t.secondary_color}"></span>
                  <span class="text-sm text-gray-900">${t.secondary_color}</span>
                </div>
              </div>
              `:""}
              ${t.accent_color?`
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600">Accent:</span>
                <div class="flex items-center space-x-2">
                  <span class="inline-block w-4 h-4 rounded border" style="background-color: ${t.accent_color}"></span>
                  <span class="text-sm text-gray-900">${t.accent_color}</span>
                </div>
              </div>
              `:""}
              ${t.text_color?`
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600">Text:</span>
                <div class="flex items-center space-x-2">
                  <span class="inline-block w-4 h-4 rounded border" style="background-color: ${t.text_color}"></span>
                  <span class="text-sm text-gray-900">${t.text_color}</span>
                </div>
              </div>
              `:""}
            </div>
          </div>
          `:""}
          
        </div>
      `,console.log("🔍 Showing modal..."),s.classList.remove("hidden"),console.log("✅ Modal should now be visible"),setTimeout(()=>{const o=!s.classList.contains("hidden");console.log("🔍 Modal visibility check:",o),o||console.error("❌ Modal is not visible after showing")},100)}catch(t){console.error("Error viewing customization details:",t),alert("Error viewing customization details: "+t.message)}};
