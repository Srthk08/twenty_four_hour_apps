import"./ProductDialog.astro_astro_type_script_index_0_lang.85w2jD1L.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.Bf11ZY-L.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const N="https://lmrrdcaavwwletcjcpqv.supabase.co",E="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";function g(s){try{const t=new Date(s);if(isNaN(t.getTime()))return"Invalid Date";const a=String(t.getMonth()+1).padStart(2,"0"),e=String(t.getDate()).padStart(2,"0"),o=t.getFullYear();return`${a}/${e}/${o}`}catch(t){return console.error("Error formatting date:",t),"Invalid Date"}}let i=null;function _(){return new Promise(s=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(i=window.supabase,s(i)):window.supabase&&typeof window.supabase.createClient=="function"?(i=window.supabase.createClient(N,E),s(i)):setTimeout(()=>_().then(s),100)})}console.log("Admin dashboard loaded successfully");window.addEventListener("load",()=>{console.log("✅ Admin panel loaded successfully");const s=document.getElementById("customizations-table-body");s&&(s.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">Loading customizations...</td></tr>')});document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin dashboard data..."),console.log("✅ Admin dashboard JavaScript is running!"),i||(console.log("⏳ Waiting for Supabase client..."),await _()),console.log("🔍 Supabase client:",i),console.log("🔍 Customizations table body element:",document.getElementById("customizations-table-body"));const s=document.getElementById("users-table-body"),t=document.getElementById("contact-table-body");s&&(s.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading users...</td></tr>'),t&&(t.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading contacts...</td></tr>');try{console.log("🔍 Testing Supabase connection...");const{data:a,error:e}=await i.from("profiles").select("count",{count:"exact",head:!0});console.log("Profiles table test:",{data:a,error:e});const{data:o,error:d}=await i.from("contact_submissions").select("count",{count:"exact",head:!0});if(console.log("Contact submissions table test:",{data:o,error:d}),e&&(console.error("❌ Profiles table error:",e),alert("Profiles table error: "+e.message)),d){console.error("❌ Contact submissions table error:",d);const n=document.getElementById("contact-table-body");n&&(d.message.includes("Could not find the table")?n.innerHTML=`
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-red-500">
                  <div class="space-y-2">
                    <p class="font-semibold">Table 'contact_submissions' not found!</p>
                    <p class="text-sm">The database table needs to be created.</p>
                    <p class="text-sm">Please run the database migration or contact the administrator.</p>
                  </div>
                </td>
              </tr>
            `:n.innerHTML=`
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-red-500">
                  Error: ${d.message}
                </td>
              </tr>
            `)}console.log("✅ Supabase connection tests completed"),console.log("🔄 Loading users data..."),await L(),console.log("🔄 Loading contact data..."),await j(),console.log("🔄 Loading tickets data..."),await S(),console.log("🔄 Loading customizations data..."),await $(),console.log("🔄 Updating summary cards..."),await M(),console.log("✅ All admin data loaded successfully")}catch(a){console.error("❌ Error loading admin data:",a),alert("Error loading admin data: "+a.message)}});async function L(){try{console.log("🔄 Loading users data from profiles table...");const{data:s,error:t}=await i.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading users:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const e=document.getElementById("users-table-body");e&&(e.innerHTML=`
            <tr>
              <td colspan="6" class="px-6 py-4 text-center text-red-500">
                Error loading users: ${t.message}
              </td>
            </tr>
          `);return}console.log("✅ Users loaded successfully:",s?.length||0,"users found");const a=document.getElementById("users-table-body");if(!a)return;s&&s.length>0?a.innerHTML=s.map(e=>`
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${g(e.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.last_login?g(e.last_login):"-"}</td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(s){console.error("Error loading users data:",s)}}async function j(){try{console.log("🔄 Loading contact form data from contact_submissions table...");const{data:s,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact data:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const e=document.getElementById("contact-table-body");e&&(e.innerHTML=`
            <tr>
              <td colspan="6" class="px-6 py-4 text-center text-red-500">
                Error loading contact data: ${t.message}
              </td>
            </tr>
          `);return}console.log("✅ Contact data loaded successfully:",s?.length||0,"contacts found");const a=document.getElementById("contact-table-body");if(!a)return;s&&s.length>0?a.innerHTML=s.map(e=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${e.first_name} ${e.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.company_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.project_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${g(e.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${e.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(s){console.error("Error loading contact data:",s)}}async function S(){try{if(console.log("🔄 Loading support tickets data..."),i||await _(),!i&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?i=window.supabase:typeof window.supabase.createClient=="function"&&(i=window.supabase.createClient(N,E))),!i){console.error("❌ Supabase client not available for loading tickets");const e=document.getElementById("tickets-table-body");e&&(e.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: Database connection failed</td></tr>');return}const{data:s,error:t}=await i.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);const e=document.getElementById("tickets-table-body");e&&(e.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${t.message}</td></tr>`);return}const a=document.getElementById("tickets-table-body");if(!a)return;s&&s.length>0?a.innerHTML=s.map(e=>`
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${g(e.created_at)}</td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(s){console.error("Error loading tickets data:",s)}}async function $(){try{if(console.log("🔄 Loading customizations data..."),console.log("🔍 Supabase client available:",!!i),console.log("🔍 Function called at:",new Date().toISOString()),!i){console.error("❌ Supabase client not available");const n=document.getElementById("customizations-table-body");n&&(n.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}console.log("🔍 Fetching customization_forms data...");const{data:s,error:t}=await i.from("customization_forms").select("*").order("created_at",{ascending:!1});console.log("🔍 Fetching order_customizations data...");const{data:a,error:e}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});let o=[];if(s&&!t?(console.log("✅ Regular customizations loaded:",s.length),o=[...o,...s]):t&&console.error("❌ Error loading regular customizations:",t),a&&!e){console.log("✅ OMS customizations loaded:",a.length),console.log("🔍 Raw OMS data from database:",a);const n=a.map(r=>({id:r.id,contact_email:r.email||"Not provided",product_type:"order-menu-system",product_name:"Order Menu System",project_name:r.project_name||"Not provided",restaurant_name:r.restaurant_name||"Not provided",owner_name:r.owner_name||"Not provided",restaurant_address:r.address_line_1,contact_person:r.contact_person||"Not provided",phone:r.phone_number||"Not provided",additional_requirements:r.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:r.total_amount,created_at:r.created_at,updated_at:r.updated_at,menu_categories:typeof r.menu_categories=="string"?JSON.parse(r.menu_categories):r.menu_categories||[],menu_items:typeof r.menu_items=="string"?JSON.parse(r.menu_items):r.menu_items||[],logo_url:r.restaurant_logo_url,logo_filename:r.logo_filename,logo_size:r.logo_size}));o=[...o,...n]}else e&&console.error("❌ Error loading OMS customizations:",e);o.sort((n,r)=>new Date(r.created_at)-new Date(n.created_at)),console.log("🔍 Combined customizations data:",o.length,"total items");const d=document.getElementById("customizations-table-body");if(!d){console.error("❌ Customizations table body not found");return}console.log("🔍 Customizations data received:",o),o&&o.length>0?(console.log(`✅ Found ${o.length} customizations`),console.log("First customization data:",o[0]),d.innerHTML=o.map(n=>(console.log("Processing customization:",n.id,n.contact_email,n.product_name),`
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.contact_email||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.product_type||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.product_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.project_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(n.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(n.created_at).toLocaleDateString()}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="viewCustomizationDetails('${n.id}')" class="text-blue-600 hover:text-blue-900 cursor-pointer">View Details</button>
              </td>
            </tr>
          `)).join("")):(console.log("ℹ️ No customizations found"),d.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No customizations found</td></tr>')}catch(s){console.error("❌ Error loading customizations data:",s);const t=document.getElementById("customizations-table-body");t&&(t.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${s.message}</td></tr>`)}}window.viewImageInModal=function(s){openImageModal(s)};async function M(){try{const[s,t,a,e]=await Promise.all([i.from("profiles").select("*",{count:"exact",head:!0}),i.from("contact_submissions").select("*",{count:"exact",head:!0}),i.from("support_tickets").select("*",{count:"exact",head:!0}),i.from("customization_forms").select("*",{count:"exact",head:!0})]),o=s.count||0,d=t.count||0,n=a.count||0,r=e.count||0,c=document.getElementById("total-users"),l=document.getElementById("total-contacts"),y=document.getElementById("total-tickets"),x=document.getElementById("total-revenue"),f=document.getElementById("total-customizations");c&&(c.textContent=o.toString()),l&&(l.textContent=d.toString()),y&&(y.textContent=n.toString()),f&&(f.textContent=r.toString()),x&&(x.textContent="₹0"),console.log("✅ Summary cards updated")}catch(s){console.error("Error updating summary cards:",s)}}window.viewContactDetails=async function(s){console.log("Viewing contact details for:",s);try{const{data:t,error:a}=await i.from("contact_submissions").select("*").eq("id",s).single();if(a){console.error("Error loading contact details:",a);return}const e=document.getElementById("details-modal"),o=document.getElementById("modal-title"),d=document.getElementById("modal-content");o.textContent="Contact Form Details",d.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Submitted:</strong> ${g(t.created_at)}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Project Details</h5>
            <p class="text-sm text-gray-600 break-words overflow-wrap-anywhere whitespace-pre-wrap">${t.project_details||t.message||"No additional details provided"}</p>
          </div>
        </div>
      `,document.body.style.overflow="hidden",e.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};let u=[],v=[];window.showContactFormDetails=async function(){console.log("Loading all contact form details...");try{const{data:s,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact details:",t);return}u=s||[];const a=document.getElementById("contact-details-modal"),e=document.getElementById("contact-modal-title"),o=document.getElementById("contact-modal-content");e.textContent=`All Contact Form Details (${u.length} submissions)`,o.innerHTML=`
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
          ${h(u)}
        </div>
      `,document.body.style.overflow="hidden",a.classList.remove("hidden")}catch(s){console.error("Error loading contact details:",s)}};function h(s){return s&&s.length>0?s.map((t,a)=>`
        <div class="bg-gray-50 p-4 rounded-lg border contact-item" data-email="${(t.email||"").toLowerCase()}">
          <div class="flex justify-between items-start mb-3">
            <h4 class="text-lg font-semibold text-gray-900">#${a+1} - ${t.first_name} ${t.last_name}</h4>
            <span class="text-sm text-gray-500">${g(t.created_at)}</span>
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
      `}window.filterContacts=function(){const s=document.getElementById("contact-search-input"),t=document.getElementById("contact-modal-title"),a=s.value.toLowerCase().trim();if(!a){document.getElementById("contacts-list").innerHTML=h(u),t.textContent=`All Contact Form Details (${u.length} submissions)`;return}const e=u.filter(o=>(o.email||"").toLowerCase().includes(a));document.getElementById("contacts-list").innerHTML=h(e),t.textContent=`Contact Form Details (${e.length} of ${u.length} submissions)`};window.showCustomizations=async function(){console.log("Loading all customizations...");try{const{data:s,error:t}=await i.from("customization_forms").select("*").order("created_at",{ascending:!1}),{data:a,error:e}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});let o=[];if(s&&!t?o=[...o,...s]:t&&console.error("Error loading regular customizations:",t),a&&!e){const c=a.map(l=>({id:l.id,contact_email:l.email||"Not provided",product_type:"order-menu-system",product_name:"Order Menu System",project_name:l.project_name||"Not provided",restaurant_name:l.restaurant_name||"Not provided",owner_name:l.owner_name||"Not provided",restaurant_address:l.address_line_1,contact_person:l.contact_person||"Not provided",phone:l.phone_number||"Not provided",additional_requirements:l.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:l.total_amount,created_at:l.created_at,updated_at:l.updated_at,menu_categories:typeof l.menu_categories=="string"?JSON.parse(l.menu_categories):l.menu_categories||[],menu_items:typeof l.menu_items=="string"?JSON.parse(l.menu_items):l.menu_items||[],logo_url:l.restaurant_logo_url,logo_filename:l.logo_filename,logo_size:l.logo_size}));o=[...o,...c]}else e&&console.error("Error loading OMS customizations:",e);o.sort((c,l)=>new Date(l.created_at)-new Date(c.created_at)),window.allCustomizations=o;const d=document.getElementById("customizations-modal"),n=document.getElementById("customizations-modal-title"),r=document.getElementById("customizations-modal-content");n.textContent=`All Product Customizations (${o.length} items)`,r.innerHTML=`
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
        <div id="customizations-list" class="space-y-6">
          ${w(o)}
        </div>
      `,document.body.style.overflow="hidden",d.classList.remove("hidden")}catch(s){console.error("Error loading customizations:",s),alert("Error loading customizations: "+s.message)}};function w(s){return s&&s.length>0?s.map((t,a)=>`
        <div class="bg-white p-6 rounded-lg border shadow-sm customization-item" data-email="${(t.contact_email||"").toLowerCase()}">
          <div class="flex justify-between items-start mb-6">
            <h4 class="text-xl font-bold text-gray-900">#${a+1} - ${t.product_name||"Order Menu System"}</h4>
            <span class="text-sm text-gray-500">${new Date(t.created_at).toLocaleDateString()}</span>
          </div>
          
          <!-- Product Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Product Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Product Type:</span>
                  <span class="text-sm text-gray-900">${t.product_type||"order-menu-system"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Product Name:</span>
                  <span class="text-sm text-gray-900">${t.product_name||"Order Menu System"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Price:</span>
                  <span class="text-sm text-gray-900">₹${(t.product_price||t.total_amount||0).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Project Name:</span>
                  <span class="text-sm text-gray-900">${t.project_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Restaurant Name:</span>
                  <span class="text-sm text-gray-900">${t.restaurant_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Owner Name:</span>
                  <span class="text-sm text-gray-900">${t.owner_name||"Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Email:</span>
                  <span class="text-sm text-gray-900">${t.contact_email||t.email||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Phone:</span>
                  <span class="text-sm text-gray-900">${t.phone||t.contact_phone||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Created:</span>
                  <span class="text-sm text-gray-900">${new Date(t.created_at).toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Updated:</span>
                  <span class="text-sm text-gray-900">${new Date(t.updated_at||t.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Restaurant Information Section -->
          ${t.restaurant_name||t.contact_person||t.phone?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Restaurant Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Restaurant Name:</span>
                  <span class="text-sm text-gray-900">${t.restaurant_name||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Contact Person:</span>
                  <span class="text-sm text-gray-900">${t.contact_person||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Phone:</span>
                  <span class="text-sm text-gray-900">${t.phone||t.contact_phone||"Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          `:""}
          
          <!-- Address Information Section -->
          ${t.restaurant_address||t.city||t.state?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Address Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Address:</span>
                  <span class="text-sm text-gray-900">${t.restaurant_address||t.address_line_1||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">City:</span>
                  <span class="text-sm text-gray-900">${t.city||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">State:</span>
                  <span class="text-sm text-gray-900">${t.state||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Pincode:</span>
                  <span class="text-sm text-gray-900">${t.pincode||"Not provided"}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-600">Country:</span>
                  <span class="text-sm text-gray-900">${t.country||"Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          `:""}
          
          <!-- Additional Requirements Section -->
          ${t.additional_requirements?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Additional Requirements</h5>
            <div class="space-y-2">
              <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span class="text-sm font-medium text-gray-600 flex-shrink-0">Requirements:</span>
                <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere sm:text-right">${t.additional_requirements}</span>
              </div>
            </div>
          </div>
          `:""}
          
          <!-- Logo Section -->
          ${t.logo_url?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Restaurant Logo</h5>
            <div class="flex items-center space-x-4">
              <img src="${t.logo_url}" alt="Restaurant Logo" class="h-16 w-16 object-contain border rounded">
              <div>
                <p class="text-sm text-gray-600">${t.logo_filename||"Restaurant Logo"}</p>
                <p class="text-xs text-gray-500">Logo uploaded successfully</p>
              </div>
            </div>
          </div>
          `:""}
          
          <!-- Menu Photos Section -->
          ${(()=>{let e=t.menu_photos_urls||[];console.log("🔍 Admin Panel - Raw menu_photos_urls:",e,"type:",typeof e);try{typeof e=="string"&&(console.log("📝 Admin Panel - Parsing JSON string"),e=JSON.parse(e))}catch(d){console.error("❌ Admin Panel - Failed to parse JSON:",d)}console.log("🔍 Admin Panel - Parsed photos:",e,"isArray:",Array.isArray(e),"length:",Array.isArray(e)?e.length:"N/A");const o=Array.isArray(e)?e.length:0;if(console.log("🔍 Admin Panel - Photo count:",o),o>0){const d=e.slice(0,8).map(n=>{console.log("🔍 Admin Panel - Processing photo:",n,"type:",typeof n);const r=typeof n=="string"?n:n.url||n.publicUrl||"",c=typeof n=="object"&&n.filename||"menu-photo";return console.log("🔍 Admin Panel - Extracted URL:",r,"filename:",c),r?`<div data-image-url="${r.replace(/"/g,"&quot;")}" class="image-view-trigger cursor-pointer hover:opacity-80 transition-opacity inline-block">
                  <img src="${r}" alt="${c}" class="h-20 w-20 object-cover border rounded" title="Click to view full size: ${c}" onerror="console.error('❌ Failed to load image:', this.src); this.style.display='none';">
                </div>`:(console.warn("⚠️ Admin Panel - No URL found for photo:",n),"")}).filter(Boolean).join("");return console.log("🔍 Admin Panel - Generated HTML length:",d.length),`
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Menu Photos (${o} photos)</h5>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              ${d}
              ${o>8?`
                <div class="h-20 w-20 border rounded flex items-center justify-center bg-gray-100">
                  <span class="text-xs text-gray-500">+${o-8} more</span>
                </div>
              `:""}
            </div>
          </div>
          `}return console.log("⚠️ Admin Panel - No photos to display"),""})()}
        </div>
      `).join(""):`
        <div class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No customizations found</h3>
          <p class="mt-1 text-sm text-gray-500">No customizations match your search criteria.</p>
        </div>
      `}window.filterCustomizations=function(){const s=document.getElementById("customizations-search-input"),t=document.getElementById("customizations-modal-title"),a=s.value.toLowerCase().trim();if(!a){document.getElementById("customizations-list").innerHTML=w(v),t.textContent=`All Product Customizations (${v.length} items)`;return}const e=v.filter(o=>(o.contact_email||"").toLowerCase().includes(a));document.getElementById("customizations-list").innerHTML=w(e),t.textContent=`Product Customizations (${e.length} of ${v.length} items)`};window.loadCustomizationsData=$;window.refreshOMSCustomizations=async function(){console.log("🔄 Refreshing OMS customizations and clearing cache..."),window.allCustomizations=[],await $(),console.log("✅ OMS customizations refreshed")};window.viewCustomizationDetails=async function(s){console.log("🔍 Viewing customization details for ID:",s),console.log("🔍 Supabase client available:",!!i),console.log("🔄 Force refreshing data from order_customizations table...");try{if(!i){console.error("❌ Supabase client not available"),alert("Database connection not available. Please refresh the page.");return}console.log("🔍 Fetching fresh data directly from order_customizations table...");let{data:t,error:a}=await i.from("order_customizations").select("*").eq("id",s).single(),e=null,o=null;if(a){console.log("Not found in order_customizations, trying customization_forms...");const{data:m,error:p}=await i.from("customization_forms").select("*").eq("id",s).single();if(p){console.error("Error loading customization details:",p),alert("Error loading customization details: "+p.message);return}e=m,o=null}else console.log("✅ Found OMS customization in order_customizations table:",t),e={id:t.id,contact_email:t.email||"Not provided",email:t.email||"Not provided",product_type:"order-menu-system",product_name:"Order Menu System",project_name:t.project_name||"Not provided",restaurant_name:t.restaurant_name||"Not provided",owner_name:t.owner_name||"Not provided",restaurant_address:t.address_line_1||"Not provided",contact_person:t.contact_person||"Not provided",phone:t.phone_number||"Not provided",contact_phone:t.phone_number||"Not provided",additional_requirements:t.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:t.total_amount||0,total_amount:t.total_amount||0,created_at:t.created_at,updated_at:t.updated_at||t.created_at,menu_categories:t.menu_categories||[],menu_items:t.menu_items||[],logo_url:t.restaurant_logo_url,logo_filename:t.logo_filename,logo_size:t.logo_size,city:t.city||"Not provided",state:t.state||"Not provided",pincode:t.pincode||"Not provided",country:t.country||"Not provided",house_flat_number:t.house_flat_number||"Not provided",menu_photos_urls:t.menu_photos_urls||[]},o=null;if(console.log("🔍 Database response:",{data:e,error:o}),console.log("🔍 Raw customization data from database:",e),o){console.error("❌ Error loading customization details:",o),alert("Error loading customization details: "+o.message);return}if(!e){console.error("❌ No customization found with ID:",s),alert("No customization found with the specified ID.");return}console.log("✅ Customization data loaded:",e);const d=document.getElementById("details-modal"),n=document.getElementById("modal-title"),r=document.getElementById("modal-content");if(console.log("🔍 Modal elements found:",{modal:!!d,modalTitle:!!n,modalContent:!!r}),!d||!n||!r){console.error("❌ Modal elements not found"),alert("Modal elements not found. Please refresh the page.");return}let c=e.menu_photos_urls||[];try{typeof c=="string"&&(c=JSON.parse(c))}catch{}const l=e.logo_url||e.restaurant_logo_url||"";let y=!1;(!Array.isArray(c)||c.length===0)&&l&&(c=[{url:l,filename:"restaurant-logo"}],y=!0);const x=Array.isArray(c)&&c.length?`<div class="grid grid-cols-3 sm:grid-cols-4 gap-3">${c.map(m=>{const p=typeof m=="string"?m:m.url||m.publicUrl||"",b=typeof m=="string"?"menu-photo":m.filename||"menu-photo";return p?`
            <div data-image-url="${p.replace(/"/g,"&quot;")}" class="image-view-trigger block cursor-pointer hover:opacity-80 transition-opacity">
              <img src="${p}" crossorigin="anonymous" alt="${b}" class="w-20 h-20 object-cover rounded border" title="Click to view full size: ${b}"/>
              <p class="mt-1 text-xs text-gray-500 truncate">${b}</p>
            </div>
          `:""}).filter(Boolean).join("")}</div>`:'<p class="text-gray-500">No menu photos uploaded</p>',f=Array.isArray(c)&&c.length>0,C=(!!e.logo_url||!!e.restaurant_logo_url)&&!f&&!y,I=C?`<img src="${e.logo_url||e.restaurant_logo_url}" alt="Restaurant Logo" class="w-20 h-20 object-cover rounded border"/>`:"";n.textContent="Customization Details",r.innerHTML=`
        <div class="space-y-4">
          <!-- Product Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Product Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Product Type:</span>
                <span class="text-sm text-gray-900">${e.product_type||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Product Name:</span>
                <span class="text-sm text-gray-900">${e.product_name||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Price:</span>
                <span class="text-sm text-gray-900">₹${(e.product_price||e.total_amount||0).toLocaleString("en-IN")}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Project Name:</span>
                <span class="text-sm text-gray-900">${e.project_name||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Restaurant Name:</span>
                <span class="text-sm text-gray-900">${e.restaurant_name||"N/A"}</span>
              </div>
            </div>
          </div>
          
          <!-- Images Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Images</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${C?`
              <div>
                <p class="text-sm font-medium text-gray-600 mb-2">Restaurant Logo</p>
                ${I||'<span class="text-gray-500">Not uploaded</span>'}
              </div>
              `:""}
              <div>
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-gray-600">Menu Photos</p>
                </div>
                ${x}
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Email:</span>
                <span class="text-sm text-gray-900">${e.contact_email||e.email||"Not provided"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Phone:</span>
                <span class="text-sm text-gray-900">${e.phone||e.contact_phone||"Not provided"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Created:</span>
                <span class="text-sm text-gray-900">${new Date(e.created_at).toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Updated:</span>
                <span class="text-sm text-gray-900">${new Date(e.updated_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          ${e.additional_requirements?`
          <!-- Additional Requirements Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Additional Requirements</h4>
            <div class="space-y-2">
              <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span class="text-sm font-medium text-gray-600 flex-shrink-0">Requirements:</span>
                <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere sm:text-right">${e.additional_requirements}</span>
              </div>
            </div>
          </div>
          `:""}
          
          
          <!-- Restaurant Information Section (for Order Menu System) -->
          ${e.restaurant_name||e.contact_person||e.phone?`
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Restaurant Information</h4>
            <div class="space-y-2">
              ${e.restaurant_name?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Restaurant Name:</span>
                <span class="text-sm text-gray-900">${e.restaurant_name}</span>
              </div>
              `:""}
              ${e.contact_person?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Contact Person:</span>
                <span class="text-sm text-gray-900">${e.contact_person}</span>
              </div>
              `:""}
              ${e.phone?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Phone:</span>
                <span class="text-sm text-gray-900">${e.phone}</span>
              </div>
              `:""}
            </div>
          </div>
          `:""}
          
          <!-- Address Information Section (for Order Menu System) -->
          ${e.restaurant_address||e.city||e.state?`
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Address Information</h4>
            <div class="space-y-2">
              ${e.restaurant_address?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Address:</span>
                <span class="text-sm text-gray-900">${e.restaurant_address}</span>
              </div>
              `:""}
              ${e.city?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">City:</span>
                <span class="text-sm text-gray-900">${e.city}</span>
              </div>
              `:""}
              ${e.state?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">State:</span>
                <span class="text-sm text-gray-900">${e.state}</span>
              </div>
              `:""}
              ${e.pincode?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Pincode:</span>
                <span class="text-sm text-gray-900">${e.pincode}</span>
              </div>
              `:""}
              ${e.country?`
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Country:</span>
                <span class="text-sm text-gray-900">${e.country}</span>
              </div>
              `:""}
            </div>
          </div>
          `:""}
          
        </div>
      `,console.log("🔍 Showing modal..."),document.body.style.overflow="hidden",d.classList.remove("hidden"),console.log("✅ Modal should now be visible"),setTimeout(()=>{const m=!d.classList.contains("hidden");console.log("🔍 Modal visibility check:",m),m||console.error("❌ Modal is not visible after showing")},100)}catch(t){console.error("Error viewing customization details:",t),alert("Error viewing customization details: "+t.message)}};window.openImageModal=function(s){console.log("🖼️ Opening image modal for:",s);const t=document.getElementById("image-modal"),a=document.getElementById("image-modal-img");t&&a&&s?(a.src=s,a.onerror=function(){console.error("❌ Failed to load image:",s),closeImageModal()},document.body.style.overflow="hidden",t.classList.remove("hidden")):console.error("❌ Image modal elements not found or invalid URL")};window.closeImageModal=function(){const s=document.getElementById("image-modal");if(s){s.classList.add("hidden"),document.body.style.overflow="";const t=document.getElementById("image-modal-img");t&&(t.src="")}};document.addEventListener("keydown",function(s){s.key==="Escape"&&closeImageModal()});document.addEventListener("DOMContentLoaded",function(){const s=document.getElementById("image-modal");s&&s.addEventListener("click",function(t){t.target===s&&closeImageModal()}),document.addEventListener("click",function(t){const a=t.target.closest(".image-view-trigger");if(a){t.preventDefault(),t.stopPropagation();const e=a.getAttribute("data-image-url")||a.getAttribute("href");e?openImageModal(e):console.error("❌ No image URL found")}})});
