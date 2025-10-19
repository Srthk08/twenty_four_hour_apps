import"./ProductDialog.astro_astro_type_script_index_0_lang.BQOC59sz.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";let g;function N(){return new Promise(s=>{window.supabase&&window.supabase.createClient?(g=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),s(g)):setTimeout(()=>N().then(s),100)})}let i=[],u=[],r=1,p=10,c=1;async function L(){try{console.log("⏳ Waiting for Supabase to load..."),await N(),console.log("✅ Supabase client ready"),x(),B(),setTimeout(async()=>{console.log("⏰ Delayed real data load in Admin panel..."),await x()},2e3)}catch(s){console.error("❌ Error initializing orders page:",s)}}async function x(){try{console.log("🔄 Loading OMS customization orders from Admin panel..."),console.log("🔍 Supabase client:",g),console.log("🔍 Checking existing data in order_customizations table...");const{data:s,error:e}=await g.from("order_customizations").select("*").limit(5);e?(console.error("❌ Error fetching existing data:",e),console.error("❌ Error details:",e.message),console.error("❌ Error code:",e.code),console.error("❌ Error hint:",e.hint)):(console.log("📊 Existing data in order_customizations:",s?.length||0,"records"),s&&s.length>0&&console.log("📋 Sample data:",s[0]));const{data:a,error:n}=await g.from("order_customizations").select("*").order("created_at",{ascending:!1}).limit(100);console.log("📊 Query result:",{orders:a,error:n}),n?(console.error("❌ Error loading orders:",n),console.error("❌ Error details:",n.message),console.error("❌ Error code:",n.code),console.error("❌ Error hint:",n.hint),i=[{id:"example-order-1",orderNumber:"ORD-2024-001",customerName:"John Doe",customerEmail:"john.doe@example.com",serviceName:"Web Development",serviceType:"custom",status:"pending",amount:15e3,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}],console.log("⚠️ Using fallback example data")):(console.log("✅ Successfully fetched orders from Supabase:",a?.length||0),!a||a.length===0?(console.log("⚠️ No real data found, using example data"),i=[{id:"example-order-1",orderNumber:"ORD-2024-001",customerName:"John Doe",customerEmail:"john.doe@example.com",serviceName:"Web Development",serviceType:"custom",status:"pending",amount:15e3,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}]):(console.log("✅ Transforming OMS data to order format..."),i=(a||[]).map(t=>({id:t.id,orderNumber:`OMS-${t.id.slice(-8).toUpperCase()}`,customerName:t.owner_name||"No Name",customerEmail:t.email||"No Email",serviceName:t.project_name||"Order Menu System",serviceType:"oms_customization",status:t.status||"pending",paymentStatus:t.payment_status||"pending",amount:t.total_amount||0,createdAt:t.created_at,updatedAt:t.updated_at||t.created_at,restaurantName:t.restaurant_name,contactPerson:t.contact_person,phoneNumber:t.phone_number,address:t.address_line_1,city:t.city,state:t.state,pincode:t.pincode,country:t.country,additionalRequirements:t.additional_requirements,logoUrl:t.restaurant_logo_url,menuPhotos:t.menu_photos_urls||[]})),console.log("✅ Transformed orders:",i.length),console.log("📋 Sample transformed order:",i[0]))),u=[...i],r=1,l(),h(),console.log(`✅ Final result: ${i.length} orders loaded`)}catch(s){console.error("❌ Exception loading orders:",s)}}function l(){const s=document.getElementById("orders-tbody");if(!s)return;if(u.length===0){s.innerHTML=`
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
      `,E();return}c=Math.ceil(u.length/p);const e=(r-1)*p,a=e+p,n=u.slice(e,a);s.innerHTML=n.map(t=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${t.orderNumber||t.id||"N/A"}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <span class="text-sm font-medium text-primary-600">${(t.customerName||t.customer_name||"U").charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">${t.customerName||t.customer_name||"No Name"}</div>
              <div class="text-sm text-gray-500">${t.customerEmail||t.customer_email||"No Email"}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${t.serviceName||t.service_name||"No Service"}</div>
          <div class="text-sm text-gray-500 capitalize">${t.serviceType||t.service_type||"N/A"}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${S(t.status)}">
            ${(t.status||"pending").replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ${(t.amount||t.total_amount||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${t.createdAt||t.created_at?new Date(t.createdAt||t.created_at).toLocaleDateString():"N/A"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div class="flex space-x-2">
            <button 
              onclick="viewOrder('${t.id}')"
              class="text-primary-600 hover:text-primary-900"
            >
              View
            </button>
            <button 
              onclick="updateOrderStatus('${t.id}')"
              class="text-green-600 hover:text-green-900"
            >
              Update
            </button>
          </div>
        </td>
      </tr>
    `).join(""),E()}function h(){const s=document.getElementById("orders-count");s&&(s.textContent=`Showing ${u.length} of ${i.length} orders`)}function E(){const s=document.getElementById("page-numbers"),e=document.getElementById("prev-page"),a=document.getElementById("next-page"),n=document.getElementById("page-numbers-mobile"),t=document.getElementById("prev-page-mobile"),o=document.getElementById("next-page-mobile");s&&e&&a&&I(s,e,a),n&&t&&o&&I(n,t,o)}function I(s,e,a){e.disabled=r===1,e.classList.toggle("opacity-50",r===1),e.classList.toggle("cursor-not-allowed",r===1),a.disabled=r===c||c===0,a.classList.toggle("opacity-50",r===c||c===0),a.classList.toggle("cursor-not-allowed",r===c||c===0);let n="";const t=5;let o=Math.max(1,r-Math.floor(t/2)),d=Math.min(c,o+t-1);d-o+1<t&&(o=Math.max(1,d-t+1));for(let m=o;m<=d;m++)n+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${m===r?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${m})"
        >
          ${m}
        </button>
      `;s.innerHTML=n}function P(s){s<1||s>c||(r=s,l())}function f(){r<c&&(r++,l())}function v(){r>1&&(r--,l())}function _(){const s=document.getElementById("items-per-page"),e=document.getElementById("items-per-page-mobile");let a=p;s&&(a=parseInt(s.value)),e&&(a=parseInt(e.value)),s&&(s.value=a),e&&(e.value=a),p=a,r=1,l()}function S(s){return{pending:"bg-yellow-100 text-yellow-800",confirmed:"bg-blue-100 text-blue-800",in_progress:"bg-purple-100 text-purple-800",completed:"bg-green-100 text-green-800",cancelled:"bg-red-100 text-red-800"}[s]||"bg-gray-100 text-gray-800"}function y(){const s=document.getElementById("search").value.toLowerCase(),e=document.getElementById("status-filter").value,a=document.getElementById("date-filter").value;u=i.filter(n=>{const t=n.orderNumber||n.id||"",o=n.customerName||n.customer_name||"",d=n.customerEmail||n.customer_email||"",m=n.serviceName||n.service_name||"",b=t.toLowerCase().includes(s)||o.toLowerCase().includes(s)||d.toLowerCase().includes(s)||m.toLowerCase().includes(s),$=!e||n.status===e,w=n.createdAt||n.created_at,O=!a||!w||D(w,a);return b&&$&&O}),l(),h()}function D(s,e){const a=new Date(s),n=new Date;switch(e){case"today":return a.toDateString()===n.toDateString();case"week":const t=new Date(n.getTime()-7*24*60*60*1e3);return a>=t;case"month":const o=new Date(n.getTime()-30*24*60*60*1e3);return a>=o;case"quarter":const d=new Date(n.getTime()-90*24*60*60*1e3);return a>=d;default:return!0}}function M(s){const e=i.find(o=>o.id===s);if(!e){console.error("Order not found:",s),alert("Order not found");return}const a=document.getElementById("order-modal"),n=document.getElementById("modal-title"),t=document.getElementById("modal-content");a&&n&&t&&(n.textContent=`Order ${e.orderNumber}`,t.innerHTML=`
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
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${S(e.status)}">
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
            <img src="${e.logoUrl}" alt="Restaurant Logo" class="w-16 h-16 object-cover rounded-lg">
            <div>
              <p class="text-sm text-gray-500">Logo uploaded</p>
              <a href="${e.logoUrl}" target="_blank" class="text-sm text-blue-600 hover:text-blue-800">View full size</a>
            </div>
          </div>
        </div>
        `:""}

        ${e.menuPhotos&&e.menuPhotos.length>0?`
        <!-- Menu Photos -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Menu Photos (${e.menuPhotos.length})</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${e.menuPhotos.map(o=>`
              <div class="relative">
                <img src="${o.url||o}" alt="Menu Photo" class="w-full h-24 object-cover rounded-lg">
                <a href="${o.url||o}" target="_blank" class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white opacity-0 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </a>
              </div>
            `).join("")}
          </div>
        </div>
        `:""}
      `,a.classList.remove("hidden"))}async function j(s){const e=i.find(n=>n.id===s);if(!e){console.error("Order not found:",s),alert("Order not found");return}const a=prompt(`Current status: ${e.status||"No status"}

Enter new status:
- pending
- confirmed
- in_progress
- completed
- cancelled`,e.status||"pending");if(a&&a!==e.status)try{const n=i.findIndex(t=>t.id===s);n>-1&&(i[n].status=a,i[n].updatedAt=new Date().toISOString(),u=[...i],l(),h()),alert("Order status updated successfully!")}catch(n){alert("Failed to update order status"),console.error("Error updating order status:",n)}}function B(){document.getElementById("search")?.addEventListener("input",y),document.getElementById("status-filter")?.addEventListener("change",y),document.getElementById("date-filter")?.addEventListener("change",y),document.getElementById("prev-page")?.addEventListener("click",v),document.getElementById("next-page")?.addEventListener("click",f),document.getElementById("refresh-orders")?.addEventListener("click",async()=>{console.log("🔄 Manual refresh of orders triggered"),await x()}),document.getElementById("prev-page-mobile")?.addEventListener("click",v),document.getElementById("next-page-mobile")?.addEventListener("click",f),document.getElementById("refresh-orders-mobile")?.addEventListener("click",async()=>{console.log("🔄 Manual refresh of orders triggered (mobile)"),await x()}),document.getElementById("close-modal")?.addEventListener("click",()=>{document.getElementById("order-modal")?.classList.add("hidden")}),document.getElementById("order-modal")?.addEventListener("click",a=>{a.target===a.currentTarget&&a.currentTarget.classList.add("hidden")});const s=document.createElement("button");s.textContent="Test Real OMS Data",s.className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-4",s.onclick=async()=>{console.log("🧪 Testing real OMS data load in Admin panel..."),await x()};const e=document.querySelector(".mb-8");e&&e.appendChild(s)}function k(){const s=document.getElementById("items-per-page"),e=document.getElementById("items-per-page-mobile");s&&e&&(e.addEventListener("change",a=>{a.preventDefault(),s.value=e.value,p=parseInt(e.value),r=1,l()}),s.addEventListener("change",a=>{a.preventDefault(),e.value=s.value,p=parseInt(s.value),r=1,l()}))}document.addEventListener("DOMContentLoaded",()=>{L(),k()});window.viewOrder=M;window.updateOrderStatus=j;window.goToPage=P;window.nextPage=f;window.prevPage=v;window.changeItemsPerPage=_;
