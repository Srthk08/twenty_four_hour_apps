import"./ProductDialog.astro_astro_type_script_index_0_lang.CpUg5vNK.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.Bf11ZY-L.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";let u;function w(){return new Promise(t=>{window.supabase&&window.supabase.createClient?(u=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),t(u)):setTimeout(()=>w().then(t),100)})}let i=[],g=[],r=1,p=10,l=1;async function O(){try{console.log("⏳ Waiting for Supabase to load..."),await w(),console.log("✅ Supabase client ready"),y(),j(),setTimeout(async()=>{console.log("⏰ Delayed real data load in Admin panel..."),await y()},2e3)}catch(t){console.error("❌ Error initializing orders page:",t)}}async function y(){try{console.log("🔄 Loading OMS customization orders from Admin panel..."),console.log("🔍 Supabase client:",u),console.log("🔍 Checking existing data in order_customizations table...");const{data:t,error:e}=await u.from("order_customizations").select("*").limit(5);e?(console.error("❌ Error fetching existing data:",e),console.error("❌ Error details:",e.message),console.error("❌ Error code:",e.code),console.error("❌ Error hint:",e.hint)):(console.log("📊 Existing data in order_customizations:",t?.length||0,"records"),t&&t.length>0&&console.log("📋 Sample data:",t[0]));const{data:a,error:n}=await u.from("order_customizations").select("*").order("created_at",{ascending:!1}).limit(100);console.log("📊 Query result:",{orders:a,error:n}),n?(console.error("❌ Error loading orders:",n),console.error("❌ Error details:",n.message),console.error("❌ Error code:",n.code),console.error("❌ Error hint:",n.hint),i=[{id:"example-order-1",orderNumber:"ORD-2024-001",customerName:"John Doe",customerEmail:"john.doe@example.com",serviceName:"Web Development",serviceType:"custom",status:"pending",amount:15e3,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}],console.log("⚠️ Using fallback example data")):(console.log("✅ Successfully fetched orders from Supabase:",a?.length||0),!a||a.length===0?(console.log("⚠️ No real data found, using example data"),i=[{id:"example-order-1",orderNumber:"ORD-2024-001",customerName:"John Doe",customerEmail:"john.doe@example.com",serviceName:"Web Development",serviceType:"custom",status:"pending",amount:15e3,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}]):(console.log("✅ Transforming OMS data to order format..."),i=(a||[]).map(s=>({id:s.id,orderNumber:`OMS-${s.id.slice(-8).toUpperCase()}`,customerName:s.owner_name||"No Name",customerEmail:s.email||"No Email",serviceName:s.project_name||"Order Menu System",serviceType:"oms_customization",status:s.status||"pending",paymentStatus:s.payment_status||"pending",amount:s.total_amount||0,createdAt:s.created_at,updatedAt:s.updated_at||s.created_at,restaurantName:s.restaurant_name,contactPerson:s.contact_person,phoneNumber:s.phone_number,address:s.address_line_1,city:s.city,state:s.state,pincode:s.pincode,country:s.country,additionalRequirements:s.additional_requirements,logoUrl:s.restaurant_logo_url,menuPhotos:s.menu_photos_urls||[]})),console.log("✅ Transformed orders:",i.length),console.log("📋 Sample transformed order:",i[0]))),g=[...i],r=1,m(),b(),console.log(`✅ Final result: ${i.length} orders loaded`)}catch(t){console.error("❌ Exception loading orders:",t)}}function m(){const t=document.getElementById("orders-tbody");if(!t)return;if(g.length===0){t.innerHTML=`
        <tr>
          <td colspan="7" class="px-6 py-12 text-center text-gray-500">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <p class="text-lg font-medium text-gray-900 mb-2">No orders found</p>
              <p class="text-gray-500">Try adjusting your search or filters</p>
            </div>
          </td>
        </tr>
      `,N();return}l=Math.ceil(g.length/p);const e=(r-1)*p,a=e+p,n=g.slice(e,a);t.innerHTML=n.map(s=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${s.orderNumber||s.id||"N/A"}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <span class="text-sm font-medium text-primary-600">${(s.customerName||s.customer_name||"U").charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">${s.customerName||s.customer_name||"No Name"}</div>
              <div class="text-sm text-gray-500">${s.customerEmail||s.customer_email||"No Email"}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${s.serviceName||s.service_name||"No Service"}</div>
          <div class="text-sm text-gray-500 capitalize">${s.serviceType||s.service_type||"N/A"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${$(s.status)}">
            ${(s.status||"pending").replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ${(s.amount||s.total_amount||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${s.createdAt||s.created_at?new Date(s.createdAt||s.created_at).toLocaleDateString():"N/A"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div class="flex space-x-2">
            <button 
              onclick="viewOrder('${s.id}')"
              class="text-primary-600 hover:text-primary-900"
            >
              View
            </button>
            <button 
              onclick="updateOrderStatus('${s.id}')"
              class="text-green-600 hover:text-green-900"
            >
              Update
            </button>
          </div>
        </td>
      </tr>
    `).join(""),N()}function b(){const t=document.getElementById("orders-count");t&&(t.textContent=`Showing ${g.length} of ${i.length} orders`)}function N(){const t=document.getElementById("page-numbers"),e=document.getElementById("prev-page"),a=document.getElementById("next-page"),n=document.getElementById("page-numbers-mobile"),s=document.getElementById("prev-page-mobile"),o=document.getElementById("next-page-mobile");t&&e&&a&&L(t,e,a),n&&s&&o&&L(n,s,o)}function L(t,e,a){e.disabled=r===1,e.classList.toggle("opacity-50",r===1),e.classList.toggle("cursor-not-allowed",r===1),a.disabled=r===l||l===0,a.classList.toggle("opacity-50",r===l||l===0),a.classList.toggle("cursor-not-allowed",r===l||l===0);let n="";const s=5;let o=Math.max(1,r-Math.floor(s/2)),c=Math.min(l,o+s-1);c-o+1<s&&(o=Math.max(1,c-s+1));for(let d=o;d<=c;d++)n+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${d===r?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${d})"
        >
          ${d}
        </button>
      `;t.innerHTML=n}function M(t){t<1||t>l||(r=t,m())}function v(){r<l&&(r++,m())}function h(){r>1&&(r--,m())}function D(){const t=document.getElementById("items-per-page"),e=document.getElementById("items-per-page-mobile");let a=p;t&&(a=parseInt(t.value)),e&&(a=parseInt(e.value)),t&&(t.value=a),e&&(e.value=a),p=a,r=1,m()}function $(t){return{pending:"bg-yellow-100 text-yellow-800",confirmed:"bg-blue-100 text-blue-800",in_progress:"bg-purple-100 text-purple-800",completed:"bg-green-100 text-green-800",cancelled:"bg-red-100 text-red-800"}[t]||"bg-gray-100 text-gray-800"}function x(){const t=document.getElementById("search").value.toLowerCase(),e=document.getElementById("status-filter").value,a=document.getElementById("date-filter").value;g=i.filter(n=>{const s=n.orderNumber||n.id||"",o=n.customerName||n.customer_name||"",c=n.customerEmail||n.customer_email||"",d=n.serviceName||n.service_name||"",f=s.toLowerCase().includes(t)||o.toLowerCase().includes(t)||c.toLowerCase().includes(t)||d.toLowerCase().includes(t),E=!e||n.status===e,I=n.createdAt||n.created_at,S=!a||!I||_(I,a);return f&&E&&S}),m(),b()}function _(t,e){const a=new Date(t),n=new Date;switch(e){case"today":return a.toDateString()===n.toDateString();case"week":const s=new Date(n.getTime()-7*24*60*60*1e3);return a>=s;case"month":const o=new Date(n.getTime()-30*24*60*60*1e3);return a>=o;case"quarter":const c=new Date(n.getTime()-90*24*60*60*1e3);return a>=c;default:return!0}}function B(t){const e=i.find(o=>o.id===t);if(!e){console.error("Order not found:",t),alert("Order not found");return}const a=document.getElementById("order-modal"),n=document.getElementById("modal-title"),s=document.getElementById("modal-content");a&&n&&s&&(n.textContent=`Order ${e.orderNumber}`,s.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Order Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Order Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Order Number:</span>
                <span class="text-sm font-medium text-gray-900">${e.orderNumber||e.id}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Status:</span>
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${$(e.status)}">
                  ${(e.status||"pending").replace("_"," ")}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Payment Status:</span>
                <span class="text-sm font-medium text-gray-900">${e.paymentStatus||"Pending"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Amount:</span>
                <span class="text-sm font-medium text-gray-900">${(e.amount||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Created:</span>
                <span class="text-sm text-gray-900">${e.createdAt?new Date(e.createdAt).toLocaleDateString():"N/A"}</span>
              </div>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Customer Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Name:</span>
                <span class="text-sm font-medium text-gray-900">${e.customerName||"No Name"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Email:</span>
                <span class="text-sm font-medium text-gray-900">${e.customerEmail||"No Email"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Phone:</span>
                <span class="text-sm font-medium text-gray-900">${e.phoneNumber||"No Phone"}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Restaurant Information -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Restaurant Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Restaurant Name:</span>
                <span class="text-sm font-medium text-gray-900">${e.restaurantName||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Contact Person:</span>
                <span class="text-sm font-medium text-gray-900">${e.contactPerson||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Address:</span>
                <span class="text-sm font-medium text-gray-900">${e.address||"Not specified"}</span>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">City:</span>
                <span class="text-sm font-medium text-gray-900">${e.city||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">State:</span>
                <span class="text-sm font-medium text-gray-900">${e.state||"Not specified"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Pincode:</span>
                <span class="text-sm font-medium text-gray-900">${e.pincode||"Not specified"}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Details -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Service Details</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Project Name:</span>
              <span class="text-sm font-medium text-gray-900">${e.serviceName||"No Service"}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Type:</span>
              <span class="text-sm font-medium text-gray-900 capitalize">${e.serviceType||"N/A"}</span>
            </div>
            ${e.additionalRequirements?`
            <div class="mt-4">
              <span class="text-sm text-gray-500 block mb-2">Additional Requirements:</span>
              <div class="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">${e.additionalRequirements}</div>
            </div>
            `:""}
          </div>
        </div>

        ${e.logoUrl?`
        <!-- Logo -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Restaurant Logo</h4>
          <div class="flex items-center space-x-4">
            <div data-image-url="${e.logoUrl.replace(/"/g,"&quot;")}" class="image-view-trigger cursor-pointer hover:opacity-80 transition-opacity">
              <img src="${e.logoUrl}" alt="Restaurant Logo" class="w-16 h-16 object-cover rounded-lg">
            </div>
            <div>
              <p class="text-sm text-gray-500">Logo uploaded</p>
              <span class="text-sm text-blue-600 hover:text-blue-800 cursor-pointer" onclick="openImageModal('${e.logoUrl.replace(/'/g,"\\'")}')">View full size</span>
            </div>
          </div>
        </div>
        `:""}

        ${(()=>{let o=e.menuPhotos||[];try{typeof o=="string"&&(o=JSON.parse(o))}catch{}return Array.isArray(o)||(o=[]),o.length>0?`
        <!-- Menu Photos -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Menu Photos (${o.length})</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${o.map(c=>{const d=typeof c=="string"?c:c.url||c.publicUrl||"",f=typeof c=="object"&&c.filename||"menu-photo";return`
              <div class="relative image-view-trigger cursor-pointer" data-image-url="${d.replace(/"/g,"&quot;").replace(/'/g,"\\'")}">
                <img src="${d}" alt="${f}" class="w-full h-24 object-cover rounded-lg" title="${f}">
                <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white opacity-0 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
              </div>
            `}).join("")}
          </div>
        </div>
        `:""})()}
      `,document.body.style.overflow="hidden",a.classList.remove("hidden"))}async function P(t){const e=i.find(n=>n.id===t);if(!e){console.error("Order not found:",t),alert("Order not found");return}const a=prompt(`Current status: ${e.status||"No status"}

Enter new status:
- pending
- confirmed
- in_progress
- completed
- cancelled`,e.status||"pending");if(a&&a!==e.status)try{u||await w();const{error:n}=await u.from("order_customizations").update({status:a,updated_at:new Date().toISOString()}).eq("id",t);if(n){console.error("Error updating order status in database:",n),alert("Failed to update order status in database: "+n.message);return}const s=i.findIndex(o=>o.id===t);s>-1&&(i[s].status=a,i[s].updatedAt=new Date().toISOString(),g=[...i],m(),b()),alert("Order status updated successfully!")}catch(n){alert("Failed to update order status"),console.error("Error updating order status:",n)}}function j(){document.getElementById("search")?.addEventListener("input",x),document.getElementById("status-filter")?.addEventListener("change",x),document.getElementById("date-filter")?.addEventListener("change",x),document.getElementById("prev-page")?.addEventListener("click",h),document.getElementById("next-page")?.addEventListener("click",v),document.getElementById("refresh-orders")?.addEventListener("click",async()=>{console.log("🔄 Manual refresh of orders triggered"),await y()}),document.getElementById("prev-page-mobile")?.addEventListener("click",h),document.getElementById("next-page-mobile")?.addEventListener("click",v),document.getElementById("refresh-orders-mobile")?.addEventListener("click",async()=>{console.log("🔄 Manual refresh of orders triggered (mobile)"),await y()}),document.getElementById("close-modal")?.addEventListener("click",()=>{document.getElementById("order-modal")?.classList.add("hidden"),document.body.style.overflow=""}),document.getElementById("order-modal")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.classList.add("hidden"),document.body.style.overflow="")})}function k(){const t=document.getElementById("items-per-page"),e=document.getElementById("items-per-page-mobile");t&&e&&(e.addEventListener("change",a=>{a.preventDefault(),t.value=e.value,p=parseInt(e.value),r=1,m()}),t.addEventListener("change",a=>{a.preventDefault(),e.value=t.value,p=parseInt(t.value),r=1,m()}))}document.addEventListener("DOMContentLoaded",()=>{O(),k()});window.openImageModal=function(t){console.log("🖼️ Opening image modal for:",t);const e=document.getElementById("image-modal"),a=document.getElementById("image-modal-img");e&&a&&t?(a.src=t,a.onerror=function(){console.error("❌ Failed to load image:",t),closeImageModal()},document.body.style.overflow="hidden",e.classList.remove("hidden")):console.error("❌ Image modal elements not found or invalid URL")};window.closeImageModal=function(){const t=document.getElementById("image-modal");if(t){t.classList.add("hidden"),document.body.style.overflow="";const e=document.getElementById("image-modal-img");e&&(e.src="")}};document.addEventListener("keydown",function(t){t.key==="Escape"&&closeImageModal()});document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("image-modal");t&&t.addEventListener("click",function(e){e.target===t&&closeImageModal()}),document.addEventListener("click",function(e){const a=e.target.closest(".image-view-trigger");if(a){e.preventDefault(),e.stopPropagation();const n=a.getAttribute("data-image-url");n?openImageModal(n):console.error("❌ No image URL found")}})});window.viewOrder=B;window.updateOrderStatus=P;window.goToPage=M;window.nextPage=v;window.prevPage=h;window.changeItemsPerPage=D;
