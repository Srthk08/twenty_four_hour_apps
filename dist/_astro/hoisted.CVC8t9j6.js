import"./Toast.astro_astro_type_script_index_0_lang.D91WvFkz.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const C="https://lmrrdcaavwwletcjcpqv.supabase.co",_="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let n=null;function h(){return new Promise(s=>{window.supabase?(n=window.supabase.createClient(C,_),s(n)):setTimeout(()=>h().then(s),100)})}console.log("Admin dashboard loaded successfully");document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin dashboard data..."),console.log("✅ Admin dashboard JavaScript is running!"),n||await h(),console.log("🔍 Supabase client:",n);const s=document.getElementById("users-table-body"),t=document.getElementById("contact-table-body");s&&(s.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-blue-500">JavaScript is working! Loading data...</td></tr>'),t&&(t.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-blue-500">JavaScript is working! Loading data...</td></tr>');try{console.log("🔍 Testing Supabase connection...");const{data:a,error:e}=await n.from("profiles").select("count",{count:"exact",head:!0});console.log("Profiles table test:",{data:a,error:e});const{data:o,error:r}=await n.from("contact_submissions").select("count",{count:"exact",head:!0});if(console.log("Contact submissions table test:",{data:o,error:r}),e&&(console.error("❌ Profiles table error:",e),alert("Profiles table error: "+e.message)),r){console.error("❌ Contact submissions table error:",r);const l=document.getElementById("contact-table-body");l&&(r.message.includes("Could not find the table")?l.innerHTML=`
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-red-500">
                  <div class="space-y-2">
                    <p class="font-semibold">Table 'contact_submissions' not found!</p>
                    <p class="text-sm">The database table needs to be created.</p>
                    <p class="text-sm">Please run the database migration or contact the administrator.</p>
                  </div>
                </td>
              </tr>
            `:l.innerHTML=`
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-red-500">
                  Error: ${r.message}
                </td>
              </tr>
            `)}console.log("✅ Supabase connection tests completed"),console.log("🔄 Loading users data..."),await E(),console.log("🔄 Loading contact data..."),await L(),console.log("🔄 Loading tickets data..."),await I(),console.log("🔄 Loading cart data..."),await T(),console.log("🔄 Updating summary cards..."),await B(),console.log("✅ All admin data loaded successfully")}catch(a){console.error("❌ Error loading admin data:",a),alert("Error loading admin data: "+a.message)}});async function E(){try{console.log("🔄 Loading users data from profiles table...");const{data:s,error:t}=await n.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading users:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const e=document.getElementById("users-table-body");e&&(e.innerHTML=`
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(e.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.last_login?new Date(e.last_login).toLocaleDateString():"-"}</td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(s){console.error("Error loading users data:",s)}}async function L(){try{console.log("🔄 Loading contact form data from contact_submissions table...");const{data:s,error:t}=await n.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact data:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const e=document.getElementById("contact-table-body");e&&(e.innerHTML=`
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(e.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${e.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(s){console.error("Error loading contact data:",s)}}async function I(){try{console.log("🔄 Loading support tickets data...");const{data:s,error:t}=await n.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);return}const a=document.getElementById("tickets-table-body");if(!a)return;s&&s.length>0?a.innerHTML=s.map(e=>`
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
          </tr>
        `).join(""):a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(s){console.error("Error loading tickets data:",s)}}async function T(){try{if(console.log("🔄 Loading cart customizations data..."),console.log("🔍 Supabase client available:",!!n),!n){console.error("❌ Supabase client not available");const e=document.getElementById("cart-table-body");e&&(e.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}const{data:s,error:t}=await n.from("cart_customizations").select("*").order("created_at",{ascending:!1});if(console.log("🔍 Cart data query result:",{data:s,error:t}),t){console.error("❌ Error loading cart data:",t);const e=document.getElementById("cart-table-body");e&&(e.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${t.message}</td></tr>`);return}const a=document.getElementById("cart-table-body");if(!a){console.error("❌ Cart table body not found");return}console.log("🔍 Cart data received:",s),s&&s.length>0?(console.log(`✅ Found ${s.length} cart customizations`),a.innerHTML=s.map(e=>{let o=e.total_amount;if(!o||o===0){const r=e.base_price||0,m=(e.selected_features||[]).length*500,c=r+m,p=Math.round(c*.18);o=c+p}return`
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.user_email}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.project_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.app_name||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.contact_person||"-"}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹${o.toLocaleString()}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(e.created_at).toLocaleDateString()}</td>
            </tr>
          `}).join("")):(console.log("ℹ️ No cart customizations found"),a.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No cart customizations found</td></tr>')}catch(s){console.error("❌ Error loading cart data:",s);const t=document.getElementById("cart-table-body");t&&(t.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${s.message}</td></tr>`)}}async function B(){try{const[s,t,a,e]=await Promise.all([n.from("profiles").select("*",{count:"exact",head:!0}),n.from("contact_submissions").select("*",{count:"exact",head:!0}),n.from("support_tickets").select("*",{count:"exact",head:!0}),n.from("cart_customizations").select("*",{count:"exact",head:!0})]),o=s.count||0,r=t.count||0,l=a.count||0,m=e.count||0,c=document.getElementById("total-users"),p=document.getElementById("total-contacts"),x=document.getElementById("total-tickets"),y=document.getElementById("total-revenue"),f=document.getElementById("total-carts");if(c&&(c.textContent=o.toString()),p&&(p.textContent=r.toString()),x&&(x.textContent=l.toString()),f&&(f.textContent=m.toString()),y){const{data:b}=await n.from("cart_customizations").select("total_amount").eq("cart_status","completed"),w=b?b.reduce((v,$)=>v+($.total_amount||0),0):0;y.textContent=`₹${w.toLocaleString()}`}console.log("✅ Summary cards updated")}catch(s){console.error("Error updating summary cards:",s)}}window.viewContactDetails=async function(s){console.log("Viewing contact details for:",s);try{const{data:t,error:a}=await n.from("contact_submissions").select("*").eq("id",s).single();if(a){console.error("Error loading contact details:",a);return}const e=document.getElementById("details-modal"),o=document.getElementById("modal-title"),r=document.getElementById("modal-content");o.textContent="Contact Form Details",r.innerHTML=`
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
      `,e.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};let i=[],d=[];window.showContactFormDetails=async function(){console.log("Loading all contact form details...");try{const{data:s,error:t}=await n.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact details:",t);return}i=s||[];const a=document.getElementById("contact-details-modal"),e=document.getElementById("contact-modal-title"),o=document.getElementById("contact-modal-content");e.textContent=`All Contact Form Details (${i.length} submissions)`,o.innerHTML=`
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
          ${g(i)}
        </div>
      `,a.classList.remove("hidden")}catch(s){console.error("Error loading contact details:",s)}};function g(s){return s&&s.length>0?s.map((t,a)=>`
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
      `}window.filterContacts=function(){const s=document.getElementById("contact-search-input"),t=document.getElementById("contact-modal-title"),a=s.value.toLowerCase().trim();if(!a){document.getElementById("contacts-list").innerHTML=g(i),t.textContent=`All Contact Form Details (${i.length} submissions)`;return}const e=i.filter(o=>(o.email||"").toLowerCase().includes(a));document.getElementById("contacts-list").innerHTML=g(e),t.textContent=`Contact Form Details (${e.length} of ${i.length} submissions)`};window.showCartCustomizations=async function(){console.log("Loading all cart customizations...");try{const{data:s,error:t}=await n.from("cart_customizations").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading cart customizations:",t),alert("Error loading cart customizations: "+t.message);return}d=s||[];const a=document.getElementById("cart-customizations-modal"),e=document.getElementById("cart-modal-title"),o=document.getElementById("cart-modal-content");e.textContent=`All Cart Customizations (${d.length} items)`,o.innerHTML=`
        <div class="mb-6">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              id="cart-search-input" 
              placeholder="Search by email address..." 
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onkeyup="filterCartCustomizations()"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">Type an email address to quickly find a specific cart customization</p>
        </div>
        <div id="carts-list" class="space-y-6 max-h-96 overflow-y-auto">
          ${u(d)}
        </div>
      `,a.classList.remove("hidden")}catch(s){console.error("Error loading cart customizations:",s),alert("Error loading cart customizations: "+s.message)}};function u(s){return s&&s.length>0?s.map((t,a)=>{let e=t.total_amount;if(!e||e===0){const o=t.base_price||0,l=(t.selected_features||[]).length*500,m=o+l,c=Math.round(m*.18);e=m+c}return`
          <div class="bg-gray-50 p-4 rounded-lg border cart-item" data-email="${(t.user_email||"").toLowerCase()}">
            <div class="flex justify-between items-start mb-3">
              <h4 class="text-lg font-semibold text-gray-900">#${a+1} - ${t.product_name||"Unknown Product"}</h4>
              <span class="text-sm text-gray-500">${new Date(t.created_at).toLocaleDateString()}</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-gray-600"><strong>User Email:</strong> <span class="font-mono text-indigo-600">${t.user_email||"Not provided"}</span></p>
                <p class="text-sm text-gray-600"><strong>Project Name:</strong> ${t.project_name||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>App Name:</strong> ${t.app_name||"Not provided"}</p>
                <p class="text-sm text-gray-600"><strong>Contact Person:</strong> ${t.contact_person||"Not provided"}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600"><strong>Product ID:</strong> ${t.product_id||"Not specified"}</p>
                <p class="text-sm text-gray-600"><strong>Base Price:</strong> ₹${t.base_price||0}</p>
                <p class="text-sm text-gray-600"><strong>Total Amount:</strong> ₹${e.toLocaleString()}</p>
                <p class="text-sm text-gray-600"><strong>Status:</strong> 
                  <span class="px-2 py-1 rounded-full text-xs font-medium ${t.cart_status==="completed"?"bg-green-100 text-green-800":t.cart_status==="cancelled"?"bg-red-100 text-red-800":t.cart_status==="expired"?"bg-gray-100 text-gray-800":"bg-blue-100 text-blue-800"}">${t.cart_status||"active"}</span>
                </p>
              </div>
            </div>
            
            ${t.restaurant_name?`
            <div class="bg-white p-3 rounded border mb-3">
              <h5 class="font-medium text-gray-900 mb-2">Restaurant Details:</h5>
              <p class="text-sm text-gray-600"><strong>Restaurant Name:</strong> ${t.restaurant_name}</p>
              <p class="text-sm text-gray-600"><strong>Cuisine Type:</strong> ${t.cuisine_type||"Not specified"}</p>
            </div>
            `:""}
            
            <div class="bg-white p-3 rounded border">
              <h5 class="font-medium text-gray-900 mb-2">Contact Information:</h5>
              <p class="text-sm text-gray-600"><strong>Email:</strong> ${t.contact_email||"Not provided"}</p>
              <p class="text-sm text-gray-600"><strong>Phone:</strong> ${t.contact_phone||"Not provided"}</p>
              ${t.additional_requirements?`<p class="text-sm text-gray-600 mt-2"><strong>Additional Requirements:</strong> ${t.additional_requirements}</p>`:""}
            </div>
            
            <div class="mt-4">
              ${t.cart_status==="completed"?`
                <span class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                  ✅ Payment Completed
                </span>
              `:""}
              ${t.cart_status==="cancelled"?`
                <span class="px-3 py-1 bg-red-100 text-red-800 text-xs rounded font-medium">
                  ❌ Order Cancelled
                </span>
              `:""}
              ${t.cart_status==="pending"?`
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded font-medium">
                  ⏳ Payment Pending
                </span>
              `:""}
              ${t.cart_status==="expired"?`
                <span class="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded font-medium">
                  ⏰ Order Expired
                </span>
              `:""}
              ${!t.cart_status||t.cart_status==="active"?`
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                  📋 Order Active
                </span>
              `:""}
            </div>
          </div>
        `}).join(""):`
        <div class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No cart customizations found</h3>
          <p class="mt-1 text-sm text-gray-500">No cart customizations match your search criteria.</p>
        </div>
      `}window.filterCartCustomizations=function(){const s=document.getElementById("cart-search-input"),t=document.getElementById("cart-modal-title"),a=s.value.toLowerCase().trim();if(!a){document.getElementById("carts-list").innerHTML=u(d),t.textContent=`All Cart Customizations (${d.length} items)`;return}const e=d.filter(o=>(o.user_email||"").toLowerCase().includes(a));document.getElementById("carts-list").innerHTML=u(e),t.textContent=`Cart Customizations (${e.length} of ${d.length} items)`};
