let i;function m(e){try{const t=new Date(e);if(isNaN(t.getTime()))return"Invalid Date";const a=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0"),s=t.getFullYear();return`${a}/${o}/${s}`}catch(t){return console.error("Error formatting date:",t),"Invalid Date"}}function u(){return new Promise(e=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(i=window.supabase,e(i)):window.supabase&&typeof window.supabase.createClient=="function"?(i=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),e(i)):setTimeout(()=>u().then(e),100)})}console.log("Admin data dashboard loaded successfully");document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin data dashboard...");try{console.log("⏳ Waiting for Supabase to load..."),await u(),console.log("✅ Supabase client ready"),await Promise.all([v(),b(),h(),_(),$()]),console.log("✅ All admin data loaded successfully")}catch(e){console.error("❌ Error loading admin data:",e)}});async function v(){try{console.log("🔄 Loading users data...");const{data:e,error:t}=await i.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading users:",t);return}const a=document.getElementById("users-table-body");if(!a)return;e&&e.length>0?a.innerHTML=e.map(o=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-600">${o.full_name?o.full_name.charAt(0).toUpperCase():"U"}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">${o.full_name||"No Name"}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${o.role==="admin"?"bg-red-100 text-red-800":"bg-green-100 text-green-800"}">
                ${o.role||"customer"}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${m(o.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.last_login?m(o.last_login):"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewUserDetails('${o.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(e){console.error("Error loading users data:",e)}}async function b(){try{console.log("🔄 Loading contact form data...");const{data:e,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact data:",t);return}const a=document.getElementById("contact-table-body");if(!a)return;e&&e.length>0?a.innerHTML=e.map(o=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${o.first_name} ${o.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.email||"Not provided"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(()=>{const s=l=>{if(!l||typeof l!="string")return null;const n=l.trim();return n.length>0?n:null};return s(o.phone)||s(o.phone_number)||"-"})()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.company_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.project_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${m(o.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${o.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(e){console.error("Error loading contact data:",e)}}async function h(){try{if(console.log("🔄 Loading support tickets data..."),i||await u(),!i&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?i=window.supabase:typeof window.supabase.createClient=="function"&&(i=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"))),!i){console.error("❌ Supabase client not available for loading tickets");const o=document.getElementById("tickets-table-body");o&&(o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Error: Database connection failed</td></tr>');return}const{data:e,error:t}=await i.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);return}const a=document.getElementById("tickets-table-body");if(!a)return;e&&e.length>0?a.innerHTML=e.map(o=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${o.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.subject}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${o.priority==="high"?"bg-red-100 text-red-800":o.priority==="medium"?"bg-yellow-100 text-yellow-800":"bg-green-100 text-green-800"}">
                ${o.priority}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${o.status==="open"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
                ${o.status}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${m(o.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewTicketDetails('${o.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(e){console.error("Error loading tickets data:",e)}}async function _(){try{if(console.log("🔄 Loading cart customizations data..."),console.log("🔍 Supabase client available:",!!i),!i){console.error("❌ Supabase client not available");const n=document.getElementById("customizations-table-body");n&&(n.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}console.log("🔍 Fetching customization_forms data...");const{data:e,error:t}=await i.from("customization_forms").select("*").order("created_at",{ascending:!1});console.log("🔍 Fetching order_customizations data...");const{data:a,error:o}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});let s=[];if(e&&!t?(console.log("✅ Regular customizations loaded:",e.length),s=[...s,...e]):t&&console.error("❌ Error loading regular customizations:",t),a&&!o){console.log("✅ OMS customizations loaded:",a.length);const n=a.map(r=>({id:r.id,contact_email:r.email,product_type:"order-menu-system",product_name:"Order Menu System",project_name:r.project_name||"Not provided",restaurant_name:r.restaurant_name||"Not provided",owner_name:r.owner_name||"Not provided",restaurant_address:r.address_line_1,contact_person:r.contact_person||"Not provided",phone:r.phone_number||"Not provided",contact_phone:r.phone_number||"Not provided",additional_requirements:r.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:r.total_amount,created_at:r.created_at,updated_at:r.updated_at,menu_categories:r.menu_categories,menu_items:r.menu_items,logo_url:r.restaurant_logo_url,logo_filename:r.logo_filename,logo_size:r.logo_size}));s=[...s,...n]}else o&&console.error("❌ Error loading OMS customizations:",o);s.sort((n,r)=>new Date(r.created_at)-new Date(n.created_at)),console.log("🔍 Combined customizations data:",s.length,"total items");const l=document.getElementById("customizations-table-body");if(!l){console.error("❌ Customizations table body not found");return}s&&s.length>0?(console.log(`✅ Found ${s.length} customizations`),l.innerHTML=s.map(n=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.contact_email||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.product_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.product_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.project_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(n.product_price||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${m(n.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewCustomizationDetails('${n.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join("")):(console.log("ℹ️ No customizations found"),l.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No customizations found</td></tr>')}catch(e){console.error("❌ Error loading customizations data:",e);const t=document.getElementById("customizations-table-body");t&&(t.innerHTML=`<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Error: ${e.message}</td></tr>`)}}async function $(){try{const[e,t,a,o]=await Promise.all([i.from("profiles").select("*",{count:"exact",head:!0}),i.from("contact_submissions").select("*",{count:"exact",head:!0}),i.from("support_tickets").select("*",{count:"exact",head:!0}),i.from("customization_forms").select("*",{count:"exact",head:!0})]),s=e.count||0,l=t.count||0,n=a.count||0,r=o.count||0,c=document.getElementById("total-users"),p=document.getElementById("total-contacts"),g=document.getElementById("total-tickets"),d=document.getElementById("total-orders");c&&(c.textContent=s.toString()),p&&(p.textContent=l.toString()),g&&(g.textContent=n.toString()),d&&(d.textContent=r.toString()),console.log("✅ Summary cards updated")}catch(e){console.error("Error updating summary cards:",e)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("details-modal");document.getElementById("close-modal")?.addEventListener("click",()=>{e.classList.add("hidden"),document.body.style.overflow=""}),e?.addEventListener("click",a=>{a.target===e&&(e.classList.add("hidden"),document.body.style.overflow="")})});window.viewUserDetails=async function(e){console.log("Viewing user details for:",e);try{const{data:t,error:a}=await i.from("profiles").select("*").eq("id",e).single();if(a){console.error("Error loading user details:",a);return}const o=document.getElementById("details-modal"),s=document.getElementById("modal-title"),l=document.getElementById("modal-content");s.textContent="User Details",l.innerHTML=`
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
      `,document.body.style.overflow="hidden",o.classList.remove("hidden")}catch(t){console.error("Error viewing user details:",t)}};window.viewContactDetails=async function(e){console.log("Viewing contact details for:",e);try{const{data:t,error:a}=await i.from("contact_submissions").select("*").eq("id",e).single();if(a){console.error("Error loading contact details:",a);return}console.log("📞 Full contact object (data.astro viewContactDetails):",t),console.log("📞 contact.phone:",t.phone,"Type:",typeof t.phone,"Length:",t.phone?.length),console.log("📞 contact.phone_number:",t.phone_number,"Type:",typeof t.phone_number),console.log("📞 All contact keys:",Object.keys(t));const o=c=>{if(!c||typeof c!="string")return null;const p=c.trim();return p.length>0?p:null},s=o(t.phone)||o(t.phone_number)||o(t.contact_phone)||o(t.mobile)||o(t.telephone)||null;console.log("📞 Resolved phone value (data.astro viewContactDetails):",s);const l=document.getElementById("details-modal"),n=document.getElementById("modal-title"),r=document.getElementById("modal-content");n.textContent="Contact Form Details",r.innerHTML=`
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600"><strong>First Name:</strong> ${t.first_name||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Last Name:</strong> ${t.last_name||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Email:</strong> ${t.email||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Phone:</strong> ${s||"Not provided"}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600"><strong>Company:</strong> ${t.company_name||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Project Type:</strong> ${t.project_type||"Not specified"}</p>
                <p class="text-sm text-gray-600"><strong>Submitted:</strong> ${m(t.created_at)}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Project Details</h5>
            <p class="text-sm text-gray-600 break-words overflow-wrap-anywhere whitespace-pre-wrap max-w-full overflow-hidden word-break-break-word" style="word-break: break-word; overflow-wrap: break-word; max-width: 100%;">${t.project_details||t.message||"No additional details provided"}</p>
          </div>
        </div>
      `,document.body.style.overflow="hidden",l.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};window.viewTicketDetails=async function(e){console.log("Viewing ticket details for:",e);try{const{data:t,error:a}=await i.from("support_tickets").select("*").eq("id",e).single();if(a){console.error("Error loading ticket details:",a);return}const o=document.getElementById("details-modal"),s=document.getElementById("modal-title"),l=document.getElementById("modal-content");s.textContent=`Support Ticket #${t.id}`,l.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Created:</strong> ${m(t.created_at)}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Description</h5>
            <p class="text-sm text-gray-600">${t.description||"No description provided"}</p>
          </div>
        </div>
      `,document.body.style.overflow="hidden",o.classList.remove("hidden")}catch(t){console.error("Error viewing ticket details:",t)}};window.viewCartDetails=async function(e){console.log("Viewing cart details for:",e);try{const{data:t,error:a}=await i.from("customization_forms").select("*").eq("id",e).single();if(a){console.error("Error loading cart details:",a);return}const o=document.getElementById("details-modal"),s=document.getElementById("modal-title"),l=document.getElementById("modal-content");s.textContent="Cart Customization Details",l.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Created:</strong> ${m(t.created_at)}</p>
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
      `,document.body.style.overflow="hidden",o.classList.remove("hidden")}catch(t){console.error("Error viewing cart details:",t)}};function C(){console.log("🔄 Opening contact forms modal...");const e=document.getElementById("contactFormsModal");e?(e.classList.remove("hidden"),document.body.style.overflow="hidden",console.log("✅ Modal opened, loading contact forms..."),N()):console.error("❌ Contact forms modal not found")}function I(){const e=document.getElementById("contactFormsModal");e&&(e.classList.add("hidden"),document.body.style.overflow="")}async function N(){try{console.log("🔄 Loading contact forms from contact_submissions table...");const{data:e,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact forms:",t),alert("Error loading contact forms: "+t.message);return}console.log("✅ Contact forms loaded successfully:",e?.length||0,"contacts found");const a=document.getElementById("contacts-list"),o=document.getElementById("no-contacts");if(!e||e.length===0){a.classList.add("hidden"),o.classList.remove("hidden");return}o.classList.add("hidden"),a.classList.remove("hidden"),a.innerHTML=e.map(s=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Contact Form
              </span>
            </div>
            <span class="text-sm text-gray-500">${m(s.created_at)}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2">${s.first_name} ${s.last_name||""}</h4>
          <p class="text-gray-600 text-sm mb-2">${s.message?s.message.length>100?s.message.substring(0,100)+"...":s.message:"No message"}</p>
          <p class="text-gray-500 text-xs mb-3">Email: ${s.email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3">Phone: ${(()=>{const l=n=>{if(!n||typeof n!="string")return null;const r=n.trim();return r.length>0?r:null};return l(s.phone)||l(s.phone_number)||"Not provided"})()}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewContactDetailsInModal('${s.id}')" 
              class="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(e){alert("Error loading contact forms: "+e.message)}}function E(){const e=document.getElementById("contactSearch").value.toLowerCase();document.querySelectorAll("#contacts-list > div").forEach(a=>{const o=a.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",s=a.querySelector("h4")?.textContent.toLowerCase()||"",l=a.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";o.includes(e)||s.includes(e)||l.includes(e)?a.style.display="block":a.style.display="none"})}async function k(e){try{const{data:t,error:a}=await i.from("contact_submissions").select("*").eq("id",e).single();if(a){alert("Error loading contact details: "+a.message);return}console.log("📞 Full contact object (data.astro):",t),console.log("📞 contact.phone:",t.phone,"Type:",typeof t.phone,"Length:",t.phone?.length),console.log("📞 contact.phone_number:",t.phone_number,"Type:",typeof t.phone_number),console.log("📞 All contact keys:",Object.keys(t));const o=n=>{if(!n||typeof n!="string")return null;const r=n.trim();return r.length>0?r:null},s=o(t.phone)||o(t.phone_number)||o(t.contact_phone)||o(t.mobile)||o(t.telephone)||null;console.log("📞 Resolved phone value (data.astro):",s),document.getElementById("contacts-list").classList.add("hidden"),document.getElementById("contact-details-view").classList.remove("hidden"),setTimeout(()=>{const n=document.getElementById("contact-details-view");if(n){n.replaceWith(n.cloneNode(!0));const r=document.getElementById("contact-details-view");r.addEventListener("click",function(c){c.target===r&&y()})}},100);const l=document.getElementById("contact-details-content");l.innerHTML=`
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
                  <span class="text-sm text-gray-900">${s||"Not provided"}</span>
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
              <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span class="text-sm font-bold text-gray-600 flex-shrink-0">Message:</span>
                <span class="text-sm text-gray-900 whitespace-pre-wrap break-words overflow-wrap-anywhere max-w-full overflow-hidden word-break-break-word sm:text-right" style="word-break: break-word; overflow-wrap: break-word; max-width: 100%;">${t.message||"No message provided"}</span>
              </div>
            </div>
          </div>
        </div>
      `}catch(t){console.error("Error viewing contact details:",t),alert("Error loading contact details: "+t.message)}}function y(){document.getElementById("contact-details-view").classList.add("hidden"),document.getElementById("contacts-list").classList.remove("hidden")}function L(){console.log("🔄 Opening customization forms modal...");const e=document.getElementById("customizationFormsModal");e?(e.classList.remove("hidden"),document.body.style.overflow="hidden",console.log("✅ Modal opened, loading customization forms..."),z()):console.error("❌ Customization forms modal not found")}function j(){const e=document.getElementById("customizationFormsModal");e&&(e.classList.add("hidden"),document.body.style.overflow="")}async function z(){try{console.log("🔄 Loading customization forms from order_customizations table...");const{data:e,error:t}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading customization forms:",t),alert("Error loading customization forms: "+t.message);return}console.log("✅ Customization forms loaded successfully:",e?.length||0,"forms found");const a=document.getElementById("customizations-list"),o=document.getElementById("no-customizations");if(!e||e.length===0){a.classList.add("hidden"),o.classList.remove("hidden");return}o.classList.add("hidden"),a.classList.remove("hidden"),a.innerHTML=e.map(s=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                Order Menu System
              </span>
            </div>
            <span class="text-sm text-gray-500 break-words overflow-wrap-anywhere">${m(s.created_at)}</span>
          </div>
          
          <h4 class="font-semibold text-gray-900 mb-2 break-words overflow-wrap-anywhere">${s.project_name||"No Project Name"}</h4>
          <div class="text-gray-600 text-sm mb-2">
            <p class="mb-1 break-words overflow-wrap-anywhere"><strong>Restaurant Name:</strong> <span class="break-words overflow-wrap-anywhere">${s.restaurant_name||"Not provided"}</span></p>
            <p class="mb-1 break-words overflow-wrap-anywhere"><strong>Owner Name:</strong> <span class="break-words overflow-wrap-anywhere">${s.owner_name||"Not provided"}</span></p>
            <p class="mb-1 break-words overflow-wrap-anywhere"><strong>Contact Person:</strong> <span class="break-words overflow-wrap-anywhere">${s.contact_person||"Not provided"}</span></p>
            <p class="mb-1 break-words overflow-wrap-anywhere"><strong>Total Amount:</strong> ₹${(s.total_amount||0).toLocaleString("en-IN")}</p>
            <p class="mb-1 break-words overflow-wrap-anywhere"><strong>Additional Requirements:</strong> <span class="break-words overflow-wrap-anywhere">${s.additional_requirements?s.additional_requirements.length>100?s.additional_requirements.substring(0,100)+"...":s.additional_requirements:"No additional requirements provided"}</span></p>
          </div>
          <p class="text-gray-500 text-xs mb-3 break-words overflow-wrap-anywhere">Email: ${s.email||"Not provided"}</p>
          <p class="text-gray-400 text-xs mb-3 break-words overflow-wrap-anywhere">Phone: ${s.phone_number||"Not provided"}</p>
          
          <div class="flex justify-between items-center mt-3">
            <button 
              onclick="viewCustomizationDetailsInModal('${s.id}')" 
              class="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      `).join("")}catch(e){alert("Error loading customization forms: "+e.message)}}function M(){const e=document.getElementById("customizationSearch").value.toLowerCase();document.querySelectorAll("#customizations-list > div").forEach(a=>{const o=a.querySelector('p[class*="text-gray-500"]')?.textContent.toLowerCase()||"",s=a.querySelector("h4")?.textContent.toLowerCase()||"",l=a.querySelector('p[class*="text-gray-600"]')?.textContent.toLowerCase()||"";o.includes(e)||s.includes(e)||l.includes(e)?a.style.display="block":a.style.display="none"})}async function D(e){try{console.log("🔄 Loading customization details for:",e);const{data:t,error:a}=await i.from("order_customizations").select("*").eq("id",e).single();if(a){alert("Error loading customization details: "+a.message);return}document.getElementById("customizations-list").classList.add("hidden"),document.getElementById("customization-details-view").classList.remove("hidden"),setTimeout(()=>{const d=document.getElementById("customization-details-view");if(d){d.replaceWith(d.cloneNode(!0));const x=document.getElementById("customization-details-view");x.addEventListener("click",function(w){w.target===x&&f()})}},100);const o=document.getElementById("customization-details-content");let s=t.menu_photos_urls||[];try{typeof s=="string"&&(s=JSON.parse(s))}catch{}const l=t.restaurant_logo_url||t.logo_url||"";let n=!1;(!Array.isArray(s)||s.length===0)&&l&&(s=[{url:l,filename:"restaurant-logo"}],n=!0);const r=Array.isArray(s)&&s.length?`<div class="grid grid-cols-3 sm:grid-cols-4 gap-3">${s.map(d=>`
            <div data-image-url="${(d.url||d.publicUrl).replace(/"/g,"&quot;")}" class="image-view-trigger block cursor-pointer hover:opacity-80 transition-opacity">
              <img src="${d.url||d.publicUrl}" crossorigin="anonymous" alt="${d.filename||"menu photo"}" class="w-20 h-20 object-cover rounded border"/>
              <p class="mt-1 text-xs text-gray-500 truncate">${d.filename||""}</p>
            </div>
          `).join("")}</div>`:'<p class="text-gray-500">No menu photos uploaded</p>',c=Array.isArray(s)&&s.length>0,p=(!!t.restaurant_logo_url||!!t.logo_url)&&!c&&!n,g=p?`<div data-image-url="${t.restaurant_logo_url||t.logo_url}" class="image-view-trigger cursor-pointer hover:opacity-80 transition-opacity inline-block">
            <img src="${t.restaurant_logo_url||t.logo_url}" alt="Restaurant Logo" class="w-20 h-20 object-cover rounded border"/>
          </div>`:"";o.innerHTML=`
        <div class="bg-white rounded-lg shadow p-4 sm:p-6">
          <h4 class="text-xl font-bold text-gray-900 mb-6 break-words overflow-wrap-anywhere">Customization Form Details</h4>
          
          <!-- Product Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Product Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Product Type:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">Order Menu System</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Product Name:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">Order Menu System</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Price:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">₹${(t.total_amount||0).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Project Name:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.project_name||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Restaurant Name:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.restaurant_name||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Owner Name:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.owner_name||"Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Images Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Images</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${p?`
              <div>
                <p class="text-sm font-bold text-gray-600 mb-2">Restaurant Logo</p>
                ${g||'<span class="text-gray-500">Not uploaded</span>'}
              </div>
              `:""}
              <div>
                <p class="text-sm font-bold text-gray-600 mb-2">Menu Photos</p>
                ${r}
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Email:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.email||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Phone:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.phone_number||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Contact Person:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.contact_person||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Created:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${new Date(t.created_at).toLocaleString()}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Updated:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${new Date(t.updated_at||t.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Address Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Address Information</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">House/Flat Number:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.house_flat_number||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Address:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.address_line_1||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">City:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.city||"Not provided"}</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">State:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.state||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Pincode:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.pincode||"Not provided"}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span class="text-sm font-bold text-gray-600 flex-shrink-0">Country:</span>
                  <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere text-right sm:text-left">${t.country||"Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Additional Requirements Section -->
          ${t.additional_requirements?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Additional Requirements</h5>
            <div class="space-y-2">
              <div class="flex flex-col gap-2">
                <span class="text-sm font-bold text-gray-600 flex-shrink-0">Requirements:</span>
                <span class="text-sm text-gray-900 break-words overflow-wrap-anywhere whitespace-pre-wrap">${t.additional_requirements}</span>
              </div>
            </div>
          </div>
          `:""}
          
          <!-- Logo Section -->
          ${t.restaurant_logo_url?`
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Restaurant Logo</h5>
            <div class="flex items-center space-x-4">
              <div data-image-url="${t.restaurant_logo_url}" class="image-view-trigger cursor-pointer hover:opacity-80 transition-opacity">
                <img src="${t.restaurant_logo_url}" alt="Restaurant Logo" class="h-16 w-16 object-contain border rounded">
              </div>
              <div>
                <p class="text-sm text-gray-600">${t.logo_filename||"Restaurant Logo"}</p>
                <p class="text-xs text-gray-500">Logo uploaded successfully</p>
              </div>
            </div>
          </div>
          `:""}
          
          
        </div>
      `}catch(t){console.error("Error viewing customization details:",t),alert("Error loading customization details: "+t.message)}}function f(){document.getElementById("customization-details-view").classList.add("hidden"),document.getElementById("customizations-list").classList.remove("hidden")}window.viewCustomizationDetails=async function(e){console.log("🔄 Loading customization details for table view:",e);try{const{data:t,error:a}=await i.from("order_customizations").select("*").eq("id",e).single();if(a){console.error("Error loading customization details:",a),alert("Error loading customization details: "+a.message);return}const o=`
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
        `;alert(o)}catch(t){console.error("Error viewing customization details:",t),alert("Error viewing customization details: "+t.message)}};window.openContactFormsModal=C;window.closeContactFormsModal=I;window.searchContacts=E;window.viewContactDetailsInModal=k;window.backToContactsList=y;window.openCustomizationFormsModal=L;window.closeCustomizationFormsModal=j;window.searchCustomizations=M;window.viewCustomizationDetailsInModal=D;window.backToCustomizationsList=f;window.viewCustomizationDetails=viewCustomizationDetails;window.openImageModal=function(e){console.log("🖼️ Opening image modal for:",e);const t=document.getElementById("image-modal"),a=document.getElementById("image-modal-img");t&&a&&e?(a.src=e,a.onerror=function(){console.error("❌ Failed to load image:",e),closeImageModal()},document.body.style.overflow="hidden",t.classList.remove("hidden")):console.error("❌ Image modal elements not found or invalid URL")};window.closeImageModal=function(){const e=document.getElementById("image-modal");if(e){e.classList.add("hidden"),document.body.style.overflow="";const t=document.getElementById("image-modal-img");t&&(t.src="")}};document.addEventListener("keydown",function(e){e.key==="Escape"&&closeImageModal()});document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("image-modal");e&&e.addEventListener("click",function(t){t.target===e&&closeImageModal()}),document.addEventListener("click",function(t){const a=t.target.closest(".image-view-trigger");if(a){t.preventDefault(),t.stopPropagation();const o=a.getAttribute("data-image-url");o?openImageModal(o):console.error("❌ No image URL found")}})});
