import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./ProductDialog.astro_astro_type_script_index_0_lang.D_8W2uES.js";import"https://unpkg.com/@supabase/supabase-js@2";let v;function h(){return new Promise(e=>{window.supabase&&window.supabase.createClient?(v=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),e(v)):setTimeout(()=>h().then(e),100)})}let c=[],m=[],r=1,p=10,o=1;async function $(){try{console.log("⏳ Waiting for Supabase to load..."),await h(),console.log("✅ Supabase client ready"),b(),A()}catch(e){console.error("❌ Error initializing orders page:",e)}}async function b(){try{c=[{id:"example-order-1",orderNumber:"ORD-2024-001",customerName:"John Doe",customerEmail:"john.doe@example.com",serviceName:"Web Development",serviceType:"custom",status:"pending",amount:15e3,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}],m=[...c],r=1,u(),x()}catch(e){console.error("Error loading orders:",e)}}function u(){const e=document.getElementById("orders-tbody");if(!e)return;if(m.length===0){e.innerHTML=`
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
      `,w();return}o=Math.ceil(m.length/p);const s=(r-1)*p,n=s+p,a=m.slice(s,n);e.innerHTML=a.map(t=>`
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
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${O(t.status)}">
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
    `).join(""),w()}function x(){const e=document.getElementById("orders-count");e&&(e.textContent=`Showing ${m.length} of ${c.length} orders`)}function w(){const e=document.getElementById("page-numbers"),s=document.getElementById("prev-page"),n=document.getElementById("next-page");if(!e||!s||!n)return;s.disabled=r===1,s.classList.toggle("opacity-50",r===1),s.classList.toggle("cursor-not-allowed",r===1),n.disabled=r===o||o===0,n.classList.toggle("opacity-50",r===o||o===0),n.classList.toggle("cursor-not-allowed",r===o||o===0);let a="";const t=5;let i=Math.max(1,r-Math.floor(t/2)),d=Math.min(o,i+t-1);d-i+1<t&&(i=Math.max(1,d-t+1));for(let l=i;l<=d;l++)a+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${l===r?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${l})"
        >
          ${l}
        </button>
      `;e.innerHTML=a}function D(e){e<1||e>o||(r=e,u())}function I(){r<o&&(r++,u())}function E(){r>1&&(r--,u())}function N(){const e=document.getElementById("items-per-page");e&&(p=parseInt(e.value),r=1,u())}function O(e){return{pending:"bg-yellow-100 text-yellow-800",confirmed:"bg-blue-100 text-blue-800",in_progress:"bg-purple-100 text-purple-800",completed:"bg-green-100 text-green-800",cancelled:"bg-red-100 text-red-800"}[e]||"bg-gray-100 text-gray-800"}function g(){const e=document.getElementById("search").value.toLowerCase(),s=document.getElementById("status-filter").value,n=document.getElementById("date-filter").value;m=c.filter(a=>{const t=a.orderNumber||a.id||"",i=a.customerName||a.customer_name||"",d=a.customerEmail||a.customer_email||"",l=a.serviceName||a.service_name||"",y=t.toLowerCase().includes(e)||i.toLowerCase().includes(e)||d.toLowerCase().includes(e)||l.toLowerCase().includes(e),L=!s||a.status===s,f=a.createdAt||a.created_at,S=!n||!f||B(f,n);return y&&L&&S}),u(),x()}function B(e,s){const n=new Date(e),a=new Date;switch(s){case"today":return n.toDateString()===a.toDateString();case"week":const t=new Date(a.getTime()-7*24*60*60*1e3);return n>=t;case"month":const i=new Date(a.getTime()-30*24*60*60*1e3);return n>=i;case"quarter":const d=new Date(a.getTime()-90*24*60*60*1e3);return n>=d;default:return!0}}function P(e){const s=c.find(i=>i.id===e);if(!s){console.error("Order not found:",e),alert("Order not found");return}const n=document.getElementById("order-modal"),a=document.getElementById("modal-title"),t=document.getElementById("modal-content");n&&a&&t&&(a.textContent=`Order ${s.orderNumber}`,t.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Order Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Order Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Order Number:</span>
                <span class="text-sm font-medium text-gray-900">${s.orderNumber||s.id}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Status:</span>
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${O(s.status)}">
                  ${(s.status||"pending").replace("_"," ")}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Payment Status:</span>
                <span class="text-sm font-medium text-gray-900">${s.paymentStatus||"Pending"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Amount:</span>
                <span class="text-sm font-medium text-gray-900">${(s.amount||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Created:</span>
                <span class="text-sm text-gray-900">${s.createdAt?new Date(s.createdAt).toLocaleDateString():"N/A"}</span>
              </div>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Customer Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Name:</span>
                <span class="text-sm font-medium text-gray-900">${s.customerName||"No Name"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Email:</span>
                <span class="text-sm font-medium text-gray-900">${s.customerEmail||"No Email"}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Details -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Service Details</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Service:</span>
              <span class="text-sm font-medium text-gray-900">${s.serviceName||"No Service"}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Type:</span>
              <span class="text-sm font-medium text-gray-900 capitalize">${s.serviceType||"N/A"}</span>
            </div>
          </div>
        </div>
      `,n.classList.remove("hidden"))}async function C(e){const s=c.find(a=>a.id===e);if(!s){console.error("Order not found:",e),alert("Order not found");return}const n=prompt(`Current status: ${s.status||"No status"}

Enter new status:
- pending
- confirmed
- in_progress
- completed
- cancelled`,s.status||"pending");if(n&&n!==s.status)try{const a=c.findIndex(t=>t.id===e);a>-1&&(c[a].status=n,c[a].updatedAt=new Date().toISOString(),m=[...c],u(),x()),alert("Order status updated successfully!")}catch(a){alert("Failed to update order status"),console.error("Error updating order status:",a)}}function A(){document.getElementById("search")?.addEventListener("input",g),document.getElementById("status-filter")?.addEventListener("change",g),document.getElementById("date-filter")?.addEventListener("change",g),document.getElementById("items-per-page")?.addEventListener("change",N),document.getElementById("prev-page")?.addEventListener("click",E),document.getElementById("next-page")?.addEventListener("click",I),document.getElementById("refresh-orders")?.addEventListener("click",b),document.getElementById("close-modal")?.addEventListener("click",()=>{document.getElementById("order-modal")?.classList.add("hidden")}),document.getElementById("order-modal")?.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.classList.add("hidden")})}document.addEventListener("DOMContentLoaded",$);window.viewOrder=P;window.updateOrderStatus=C;window.goToPage=D;window.nextPage=I;window.prevPage=E;window.changeItemsPerPage=N;
