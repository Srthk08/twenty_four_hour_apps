import"./ProductDialog.astro_astro_type_script_index_0_lang.85w2jD1L.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.Bf11ZY-L.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const C="https://lmrrdcaavwwletcjcpqv.supabase.co",N="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";function f(o){try{const t=new Date(o);if(isNaN(t.getTime()))return"Invalid Date";const s=String(t.getMonth()+1).padStart(2,"0"),e=String(t.getDate()).padStart(2,"0"),a=t.getFullYear();return`${s}/${e}/${a}`}catch(t){return console.error("Error formatting date:",t),"Invalid Date"}}let i=null;function b(){return new Promise(o=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(i=window.supabase,o(i)):window.supabase&&typeof window.supabase.createClient=="function"?(i=window.supabase.createClient(C,N),o(i)):setTimeout(()=>b().then(o),100)})}console.log("Admin dashboard loaded successfully");window.addEventListener("load",()=>{console.log("✅ Admin panel loaded successfully");const o=document.getElementById("customizations-table-body");o&&(o.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">Loading customizations...</td></tr>')});document.addEventListener("DOMContentLoaded",async()=>{console.log("🔄 Loading admin dashboard data..."),console.log("✅ Admin dashboard JavaScript is running!"),i||(console.log("⏳ Waiting for Supabase client..."),await b()),console.log("🔍 Supabase client:",i),console.log("🔍 Customizations table body element:",document.getElementById("customizations-table-body"));const o=document.getElementById("users-table-body"),t=document.getElementById("contact-table-body");o&&(o.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading users...</td></tr>'),t&&(t.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading contacts...</td></tr>');try{console.log("🔍 Testing Supabase connection...");const{data:s,error:e}=await i.from("profiles").select("count",{count:"exact",head:!0});console.log("Profiles table test:",{data:s,error:e});const{data:a,error:d}=await i.from("contact_submissions").select("count",{count:"exact",head:!0});if(console.log("Contact submissions table test:",{data:a,error:d}),e&&(console.error("❌ Profiles table error:",e),alert("Profiles table error: "+e.message)),d){console.error("❌ Contact submissions table error:",d);const n=document.getElementById("contact-table-body");n&&(d.message.includes("Could not find the table")?n.innerHTML=`
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
            `)}console.log("✅ Supabase connection tests completed"),console.log("🔄 Loading users data..."),await S(),console.log("🔄 Loading contact data..."),await j(),console.log("🔄 Loading tickets data..."),await M(),console.log("🔄 Loading customizations data..."),await $(),console.log("🔄 Updating summary cards..."),await P(),console.log("🔄 Loading menu photos from storage..."),await I(),console.log("✅ All admin data loaded successfully")}catch(s){console.error("❌ Error loading admin data:",s),alert("Error loading admin data: "+s.message)}});async function S(){try{console.log("🔄 Loading users data from profiles table...");const{data:o,error:t}=await i.from("profiles").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading users:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const e=document.getElementById("users-table-body");e&&(e.innerHTML=`
            <tr>
              <td colspan="6" class="px-6 py-4 text-center text-red-500">
                Error loading users: ${t.message}
              </td>
            </tr>
          `);return}console.log("✅ Users loaded successfully:",o?.length||0,"users found");const s=document.getElementById("users-table-body");if(!s)return;o&&o.length>0?s.innerHTML=o.map(e=>`
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${f(e.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.last_login?f(e.last_login):"-"}</td>
          </tr>
        `).join(""):s.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No users found</td></tr>'}catch(o){console.error("Error loading users data:",o)}}async function j(){try{console.log("🔄 Loading contact form data from contact_submissions table...");const{data:o,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("❌ Error loading contact data:",t),console.error("Error details:",{message:t.message,details:t.details,hint:t.hint,code:t.code});const e=document.getElementById("contact-table-body");e&&(e.innerHTML=`
            <tr>
              <td colspan="6" class="px-6 py-4 text-center text-red-500">
                Error loading contact data: ${t.message}
              </td>
            </tr>
          `);return}console.log("✅ Contact data loaded successfully:",o?.length||0,"contacts found");const s=document.getElementById("contact-table-body");if(!s)return;o&&o.length>0?s.innerHTML=o.map(e=>`
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${e.first_name} ${e.last_name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.phone||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.company_name||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.project_type||"-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${f(e.created_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onclick="viewContactDetails('${e.id}')" class="text-blue-600 hover:text-blue-900">View Details</button>
            </td>
          </tr>
        `).join(""):s.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No contact submissions found</td></tr>'}catch(o){console.error("Error loading contact data:",o)}}async function M(){try{if(console.log("🔄 Loading support tickets data..."),i||await b(),!i&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?i=window.supabase:typeof window.supabase.createClient=="function"&&(i=window.supabase.createClient(C,N))),!i){console.error("❌ Supabase client not available for loading tickets");const e=document.getElementById("tickets-table-body");e&&(e.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: Database connection failed</td></tr>');return}const{data:o,error:t}=await i.from("support_tickets").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading tickets data:",t);const e=document.getElementById("tickets-table-body");e&&(e.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${t.message}</td></tr>`);return}const s=document.getElementById("tickets-table-body");if(!s)return;o&&o.length>0?s.innerHTML=o.map(e=>`
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${f(e.created_at)}</td>
          </tr>
        `).join(""):s.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No support tickets found</td></tr>'}catch(o){console.error("Error loading tickets data:",o)}}async function $(){try{if(console.log("🔄 Loading customizations data..."),console.log("🔍 Supabase client available:",!!i),console.log("🔍 Function called at:",new Date().toISOString()),!i){console.error("❌ Supabase client not available");const n=document.getElementById("customizations-table-body");n&&(n.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Supabase client not available</td></tr>');return}console.log("🔍 Fetching customization_forms data...");const{data:o,error:t}=await i.from("customization_forms").select("*").order("created_at",{ascending:!1});console.log("🔍 Fetching order_customizations data...");const{data:s,error:e}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});let a=[];if(o&&!t?(console.log("✅ Regular customizations loaded:",o.length),a=[...a,...o]):t&&console.error("❌ Error loading regular customizations:",t),s&&!e){console.log("✅ OMS customizations loaded:",s.length),console.log("🔍 Raw OMS data from database:",s);const n=s.map(r=>({id:r.id,contact_email:r.email||"Not provided",product_type:"order-menu-system",product_name:"Order Menu System",project_name:r.project_name||"Not provided",restaurant_name:r.restaurant_name||"Not provided",owner_name:r.owner_name||"Not provided",restaurant_address:r.address_line_1,contact_person:r.contact_person||"Not provided",phone:r.phone_number||"Not provided",additional_requirements:r.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:r.total_amount,created_at:r.created_at,updated_at:r.updated_at,menu_categories:typeof r.menu_categories=="string"?JSON.parse(r.menu_categories):r.menu_categories||[],menu_items:typeof r.menu_items=="string"?JSON.parse(r.menu_items):r.menu_items||[],logo_url:r.restaurant_logo_url,logo_filename:r.logo_filename,logo_size:r.logo_size}));a=[...a,...n]}else e&&console.error("❌ Error loading OMS customizations:",e);a.sort((n,r)=>new Date(r.created_at)-new Date(n.created_at)),console.log("🔍 Combined customizations data:",a.length,"total items");const d=document.getElementById("customizations-table-body");if(!d){console.error("❌ Customizations table body not found");return}console.log("🔍 Customizations data received:",a),a&&a.length>0?(console.log(`✅ Found ${a.length} customizations`),console.log("First customization data:",a[0]),d.innerHTML=a.map(n=>(console.log("Processing customization:",n.id,n.contact_email,n.product_name),`
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
          `)).join("")):(console.log("ℹ️ No customizations found"),d.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No customizations found</td></tr>')}catch(o){console.error("❌ Error loading customizations data:",o);const t=document.getElementById("customizations-table-body");t&&(t.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${o.message}</td></tr>`)}}async function I(){try{console.log("🔄 Loading menu photos from Supabase storage...");const o=document.getElementById("menu-photos-storage-container");if(!o){console.error("❌ Container not found");return}if(o.innerHTML='<div class="col-span-full text-center text-gray-500 py-8">Loading menu photos...</div>',i||await b(),!i){o.innerHTML='<div class="col-span-full text-center text-red-500 py-8">Error: Supabase client not available</div>';return}const t=["menu-photos","MEN U PHOTO","menu_photos","men-u-photo"];let s=[];for(const e of t)try{console.log(`🔍 Trying bucket: ${e}`);const{data:a,error:d}=await i.storage.from(e).list("",{limit:100,offset:0,sortBy:{column:"created_at",order:"desc"}});if(d){console.log(`⚠️ Bucket ${e} not found or error:`,d.message);continue}if(a&&a.length>0){console.log(`✅ Found ${a.length} files in bucket: ${e}`);for(const n of a){if(n.id===null){try{const{data:r,error:c}=await i.storage.from(e).list(n.name,{limit:100,offset:0,sortBy:{column:"created_at",order:"desc"}});if(!c&&r)for(const l of r){if(l.id===null)continue;const p=`${n.name}/${l.name}`;try{const{data:u}=i.storage.from(e).getPublicUrl(p);u&&u.publicUrl&&s.push({name:l.name,url:u.publicUrl,size:l.metadata?.size||0,created_at:l.created_at||new Date().toISOString()})}catch(u){console.warn(`⚠️ Could not get URL for ${p}:`,u)}}}catch(r){console.warn(`⚠️ Could not list folder ${n.name}:`,r)}continue}try{const{data:r}=i.storage.from(e).getPublicUrl(n.name);r&&r.publicUrl&&s.push({name:n.name,url:r.publicUrl,size:n.metadata?.size||0,created_at:n.created_at||new Date().toISOString()})}catch(r){console.warn(`⚠️ Could not get URL for ${n.name}:`,r)}}if(s.length>0){console.log(`✅ Using bucket: ${e} with ${s.length} photos`);break}}}catch(a){console.log(`⚠️ Error accessing bucket ${e}:`,a.message);continue}if(s.length===0){o.innerHTML='<div class="col-span-full text-center text-gray-500 py-8">No menu photos found in storage buckets. Tried: '+t.join(", ")+"</div>";return}o.innerHTML=s.map(e=>`
        <div class="relative group cursor-pointer" onclick="viewImageInModal('${e.url.replace(/'/g,"\\'")}')">
          <img 
            src="${e.url}" 
            alt="${e.name}" 
            class="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-blue-400 transition-all"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          />
          <div class="hidden absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
            <span class="text-xs text-gray-500">Failed to load</span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <p class="truncate">${e.name}</p>
          </div>
        </div>
      `).join(""),console.log(`✅ Displayed ${s.length} menu photos`)}catch(o){console.error("❌ Error loading menu photos from storage:",o);const t=document.getElementById("menu-photos-storage-container");t&&(t.innerHTML=`<div class="col-span-full text-center text-red-500 py-8">Error loading photos: ${o.message}</div>`)}}window.viewImageInModal=function(o){const t=document.getElementById("image-modal"),s=document.getElementById("image-modal-img");t&&s&&(s.src=o,t.classList.remove("hidden"),document.body.style.overflow="hidden")};window.closeImageModal=function(){const o=document.getElementById("image-modal");o&&(o.classList.add("hidden"),document.body.style.overflow="")};window.loadMenuPhotosFromStorage=I;async function P(){try{const[o,t,s,e]=await Promise.all([i.from("profiles").select("*",{count:"exact",head:!0}),i.from("contact_submissions").select("*",{count:"exact",head:!0}),i.from("support_tickets").select("*",{count:"exact",head:!0}),i.from("customization_forms").select("*",{count:"exact",head:!0})]),a=o.count||0,d=t.count||0,n=s.count||0,r=e.count||0,c=document.getElementById("total-users"),l=document.getElementById("total-contacts"),p=document.getElementById("total-tickets"),u=document.getElementById("total-revenue"),x=document.getElementById("total-customizations");c&&(c.textContent=a.toString()),l&&(l.textContent=d.toString()),p&&(p.textContent=n.toString()),x&&(x.textContent=r.toString()),u&&(u.textContent="₹0"),console.log("✅ Summary cards updated")}catch(o){console.error("Error updating summary cards:",o)}}window.viewContactDetails=async function(o){console.log("Viewing contact details for:",o);try{const{data:t,error:s}=await i.from("contact_submissions").select("*").eq("id",o).single();if(s){console.error("Error loading contact details:",s);return}const e=document.getElementById("details-modal"),a=document.getElementById("modal-title"),d=document.getElementById("modal-content");a.textContent="Contact Form Details",d.innerHTML=`
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
                <p class="text-sm text-gray-600"><strong>Submitted:</strong> ${f(t.created_at)}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-medium text-gray-900 mb-2">Project Details</h5>
            <p class="text-sm text-gray-600">${t.project_details||t.message||"No additional details provided"}</p>
          </div>
        </div>
      `,document.body.style.overflow="hidden",e.classList.remove("hidden")}catch(t){console.error("Error viewing contact details:",t)}};let y=[],v=[];window.showContactFormDetails=async function(){console.log("Loading all contact form details...");try{const{data:o,error:t}=await i.from("contact_submissions").select("*").order("created_at",{ascending:!1});if(t){console.error("Error loading contact details:",t);return}y=o||[];const s=document.getElementById("contact-details-modal"),e=document.getElementById("contact-modal-title"),a=document.getElementById("contact-modal-content");e.textContent=`All Contact Form Details (${y.length} submissions)`,a.innerHTML=`
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
          ${w(y)}
        </div>
      `,document.body.style.overflow="hidden",s.classList.remove("hidden")}catch(o){console.error("Error loading contact details:",o)}};function w(o){return o&&o.length>0?o.map((t,s)=>`
        <div class="bg-gray-50 p-4 rounded-lg border contact-item" data-email="${(t.email||"").toLowerCase()}">
          <div class="flex justify-between items-start mb-3">
            <h4 class="text-lg font-semibold text-gray-900">#${s+1} - ${t.first_name} ${t.last_name}</h4>
            <span class="text-sm text-gray-500">${f(t.created_at)}</span>
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
      `}window.filterContacts=function(){const o=document.getElementById("contact-search-input"),t=document.getElementById("contact-modal-title"),s=o.value.toLowerCase().trim();if(!s){document.getElementById("contacts-list").innerHTML=w(y),t.textContent=`All Contact Form Details (${y.length} submissions)`;return}const e=y.filter(a=>(a.email||"").toLowerCase().includes(s));document.getElementById("contacts-list").innerHTML=w(e),t.textContent=`Contact Form Details (${e.length} of ${y.length} submissions)`};window.showCustomizations=async function(){console.log("Loading all customizations...");try{const{data:o,error:t}=await i.from("customization_forms").select("*").order("created_at",{ascending:!1}),{data:s,error:e}=await i.from("order_customizations").select("*").order("created_at",{ascending:!1});let a=[];if(o&&!t?a=[...a,...o]:t&&console.error("Error loading regular customizations:",t),s&&!e){const c=s.map(l=>({id:l.id,contact_email:l.email||"Not provided",product_type:"order-menu-system",product_name:"Order Menu System",project_name:l.project_name||"Not provided",restaurant_name:l.restaurant_name||"Not provided",owner_name:l.owner_name||"Not provided",restaurant_address:l.address_line_1,contact_person:l.contact_person||"Not provided",phone:l.phone_number||"Not provided",additional_requirements:l.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:l.total_amount,created_at:l.created_at,updated_at:l.updated_at,menu_categories:typeof l.menu_categories=="string"?JSON.parse(l.menu_categories):l.menu_categories||[],menu_items:typeof l.menu_items=="string"?JSON.parse(l.menu_items):l.menu_items||[],logo_url:l.restaurant_logo_url,logo_filename:l.logo_filename,logo_size:l.logo_size}));a=[...a,...c]}else e&&console.error("Error loading OMS customizations:",e);a.sort((c,l)=>new Date(l.created_at)-new Date(c.created_at)),window.allCustomizations=a;const d=document.getElementById("customizations-modal"),n=document.getElementById("customizations-modal-title"),r=document.getElementById("customizations-modal-content");n.textContent=`All Product Customizations (${a.length} items)`,r.innerHTML=`
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
          ${_(a)}
        </div>
      `,document.body.style.overflow="hidden",d.classList.remove("hidden")}catch(o){console.error("Error loading customizations:",o),alert("Error loading customizations: "+o.message)}};function _(o){return o&&o.length>0?o.map((t,s)=>`
        <div class="bg-white p-6 rounded-lg border shadow-sm customization-item" data-email="${(t.contact_email||"").toLowerCase()}">
          <div class="flex justify-between items-start mb-6">
            <h4 class="text-xl font-bold text-gray-900">#${s+1} - ${t.product_name||"Order Menu System"}</h4>
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
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Requirements:</span>
                <span class="text-sm text-gray-900">${t.additional_requirements}</span>
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
          ${(()=>{let e=t.menu_photos_urls||[];console.log("🔍 Admin Panel - Raw menu_photos_urls:",e,"type:",typeof e);try{typeof e=="string"&&(console.log("📝 Admin Panel - Parsing JSON string"),e=JSON.parse(e))}catch(d){console.error("❌ Admin Panel - Failed to parse JSON:",d)}console.log("🔍 Admin Panel - Parsed photos:",e,"isArray:",Array.isArray(e),"length:",Array.isArray(e)?e.length:"N/A");const a=Array.isArray(e)?e.length:0;if(console.log("🔍 Admin Panel - Photo count:",a),a>0){const d=e.slice(0,8).map(n=>{console.log("🔍 Admin Panel - Processing photo:",n,"type:",typeof n);const r=typeof n=="string"?n:n.url||n.publicUrl||"",c=typeof n=="object"&&n.filename||"menu-photo";return console.log("🔍 Admin Panel - Extracted URL:",r,"filename:",c),r?`<div data-image-url="${r.replace(/"/g,"&quot;")}" class="image-view-trigger cursor-pointer hover:opacity-80 transition-opacity inline-block">
                  <img src="${r}" alt="${c}" class="h-20 w-20 object-cover border rounded" title="Click to view full size: ${c}" onerror="console.error('❌ Failed to load image:', this.src); this.style.display='none';">
                </div>`:(console.warn("⚠️ Admin Panel - No URL found for photo:",n),"")}).filter(Boolean).join("");return console.log("🔍 Admin Panel - Generated HTML length:",d.length),`
          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="text-lg font-semibold text-gray-900 mb-3">Menu Photos (${a} photos)</h5>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              ${d}
              ${a>8?`
                <div class="h-20 w-20 border rounded flex items-center justify-center bg-gray-100">
                  <span class="text-xs text-gray-500">+${a-8} more</span>
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
      `}window.filterCustomizations=function(){const o=document.getElementById("customizations-search-input"),t=document.getElementById("customizations-modal-title"),s=o.value.toLowerCase().trim();if(!s){document.getElementById("customizations-list").innerHTML=_(v),t.textContent=`All Product Customizations (${v.length} items)`;return}const e=v.filter(a=>(a.contact_email||"").toLowerCase().includes(s));document.getElementById("customizations-list").innerHTML=_(e),t.textContent=`Product Customizations (${e.length} of ${v.length} items)`};window.loadCustomizationsData=$;window.refreshOMSCustomizations=async function(){console.log("🔄 Refreshing OMS customizations and clearing cache..."),window.allCustomizations=[],await $(),console.log("✅ OMS customizations refreshed")};window.viewCustomizationDetails=async function(o){console.log("🔍 Viewing customization details for ID:",o),console.log("🔍 Supabase client available:",!!i),console.log("🔄 Force refreshing data from order_customizations table...");try{if(!i){console.error("❌ Supabase client not available"),alert("Database connection not available. Please refresh the page.");return}console.log("🔍 Fetching fresh data directly from order_customizations table...");let{data:t,error:s}=await i.from("order_customizations").select("*").eq("id",o).single(),e=null,a=null;if(s){console.log("Not found in order_customizations, trying customization_forms...");const{data:m,error:g}=await i.from("customization_forms").select("*").eq("id",o).single();if(g){console.error("Error loading customization details:",g),alert("Error loading customization details: "+g.message);return}e=m,a=null}else console.log("✅ Found OMS customization in order_customizations table:",t),e={id:t.id,contact_email:t.email||"Not provided",email:t.email||"Not provided",product_type:"order-menu-system",product_name:"Order Menu System",project_name:t.project_name||"Not provided",restaurant_name:t.restaurant_name||"Not provided",owner_name:t.owner_name||"Not provided",restaurant_address:t.address_line_1||"Not provided",contact_person:t.contact_person||"Not provided",phone:t.phone_number||"Not provided",contact_phone:t.phone_number||"Not provided",additional_requirements:t.additional_requirements||"Not provided",primary_color:null,secondary_color:null,accent_color:null,text_color:null,product_price:t.total_amount||0,total_amount:t.total_amount||0,created_at:t.created_at,updated_at:t.updated_at||t.created_at,menu_categories:t.menu_categories||[],menu_items:t.menu_items||[],logo_url:t.restaurant_logo_url,logo_filename:t.logo_filename,logo_size:t.logo_size,city:t.city||"Not provided",state:t.state||"Not provided",pincode:t.pincode||"Not provided",country:t.country||"Not provided",house_flat_number:t.house_flat_number||"Not provided",menu_photos_urls:t.menu_photos_urls||[]},a=null;if(console.log("🔍 Database response:",{data:e,error:a}),console.log("🔍 Raw customization data from database:",e),a){console.error("❌ Error loading customization details:",a),alert("Error loading customization details: "+a.message);return}if(!e){console.error("❌ No customization found with ID:",o),alert("No customization found with the specified ID.");return}console.log("✅ Customization data loaded:",e);const d=document.getElementById("details-modal"),n=document.getElementById("modal-title"),r=document.getElementById("modal-content");if(console.log("🔍 Modal elements found:",{modal:!!d,modalTitle:!!n,modalContent:!!r}),!d||!n||!r){console.error("❌ Modal elements not found"),alert("Modal elements not found. Please refresh the page.");return}let c=e.menu_photos_urls||[];try{typeof c=="string"&&(c=JSON.parse(c))}catch{}const l=e.logo_url||e.restaurant_logo_url||"";let p=!1;(!Array.isArray(c)||c.length===0)&&l&&(c=[{url:l,filename:"restaurant-logo"}],p=!0);const u=Array.isArray(c)&&c.length?`<div class="grid grid-cols-3 sm:grid-cols-4 gap-3">${c.map(m=>{const g=typeof m=="string"?m:m.url||m.publicUrl||"",h=typeof m=="string"?"menu-photo":m.filename||"menu-photo";return g?`
            <div data-image-url="${g.replace(/"/g,"&quot;")}" class="image-view-trigger block cursor-pointer hover:opacity-80 transition-opacity">
              <img src="${g}" crossorigin="anonymous" alt="${h}" class="w-20 h-20 object-cover rounded border" title="Click to view full size: ${h}"/>
              <p class="mt-1 text-xs text-gray-500 truncate">${h}</p>
            </div>
          `:""}).filter(Boolean).join("")}</div>`:'<p class="text-gray-500">No menu photos uploaded</p>',x=Array.isArray(c)&&c.length>0,E=(!!e.logo_url||!!e.restaurant_logo_url)&&!x&&!p,L=E?`<img src="${e.logo_url||e.restaurant_logo_url}" alt="Restaurant Logo" class="w-20 h-20 object-cover rounded border"/>`:"";n.textContent="Customization Details",r.innerHTML=`
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
              ${E?`
              <div>
                <p class="text-sm font-medium text-gray-600 mb-2">Restaurant Logo</p>
                ${L||'<span class="text-gray-500">Not uploaded</span>'}
              </div>
              `:""}
              <div>
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-gray-600">Menu Photos</p>
                </div>
                ${u}
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
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Requirements:</span>
                <span class="text-sm text-gray-900">${e.additional_requirements}</span>
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
      `,console.log("🔍 Showing modal..."),document.body.style.overflow="hidden",d.classList.remove("hidden"),console.log("✅ Modal should now be visible"),setTimeout(()=>{const m=!d.classList.contains("hidden");console.log("🔍 Modal visibility check:",m),m||console.error("❌ Modal is not visible after showing")},100)}catch(t){console.error("Error viewing customization details:",t),alert("Error viewing customization details: "+t.message)}};window.openImageModal=function(o){console.log("🖼️ Opening image modal for:",o);const t=document.getElementById("image-modal"),s=document.getElementById("image-modal-img");t&&s&&o?(s.src=o,s.onerror=function(){console.error("❌ Failed to load image:",o),alert("Failed to load image. Please check the image URL."),closeImageModal()},document.body.style.overflow="hidden",t.classList.remove("hidden")):console.error("❌ Image modal elements not found or invalid URL")};window.closeImageModal=function(){const o=document.getElementById("image-modal");if(o){o.classList.add("hidden"),document.body.style.overflow="";const t=document.getElementById("image-modal-img");t&&(t.src="")}};document.addEventListener("keydown",function(o){o.key==="Escape"&&closeImageModal()});document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("image-modal");o&&o.addEventListener("click",function(t){t.target===o&&closeImageModal()}),document.addEventListener("click",function(t){const s=t.target.closest(".image-view-trigger");if(s){t.preventDefault(),t.stopPropagation();const e=s.getAttribute("data-image-url");e?openImageModal(e):console.error("❌ No image URL found in data-image-url attribute")}})});
