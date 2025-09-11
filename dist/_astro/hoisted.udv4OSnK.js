import"./supabase.ASU9rNY7.js";import"./Footer.astro_astro_type_script_index_0_lang.DjppUjiM.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.-1XEStwh.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./index.BFAZBQoJ.js";let c=[],m=[],r=1,p=10,i=1;function O(){w(),P()}async function w(){try{c=[{id:"example-order-1",orderNumber:"ORD-2024-001",customerName:"John Doe",customerEmail:"john.doe@example.com",serviceName:"Web Development",serviceType:"custom",status:"pending",amount:15e3,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}],m=[...c],r=1,u(),x()}catch(e){console.error("Error loading orders:",e)}}function u(){const e=document.getElementById("orders-tbody");if(!e)return;if(m.length===0){e.innerHTML=`
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
      `,v();return}i=Math.ceil(m.length/p);const s=(r-1)*p,n=s+p,a=m.slice(s,n);e.innerHTML=a.map(t=>`
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
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${N(t.status)}">
            ${(t.status||"pending").replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ₹${(t.amount||t.total_amount||0).toLocaleString()}
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
    `).join(""),v()}function x(){const e=document.getElementById("orders-count");e&&(e.textContent=`Showing ${m.length} of ${c.length} orders`)}function v(){const e=document.getElementById("page-numbers"),s=document.getElementById("prev-page"),n=document.getElementById("next-page");if(!e||!s||!n)return;s.disabled=r===1,s.classList.toggle("opacity-50",r===1),s.classList.toggle("cursor-not-allowed",r===1),n.disabled=r===i||i===0,n.classList.toggle("opacity-50",r===i||i===0),n.classList.toggle("cursor-not-allowed",r===i||i===0);let a="";const t=5;let o=Math.max(1,r-Math.floor(t/2)),d=Math.min(i,o+t-1);d-o+1<t&&(o=Math.max(1,d-t+1));for(let l=o;l<=d;l++)a+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${l===r?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${l})"
        >
          ${l}
        </button>
      `;e.innerHTML=a}function $(e){e<1||e>i||(r=e,u())}function h(){r<i&&(r++,u())}function b(){r>1&&(r--,u())}function E(){const e=document.getElementById("items-per-page");e&&(p=parseInt(e.value),r=1,u())}function N(e){return{pending:"bg-yellow-100 text-yellow-800",confirmed:"bg-blue-100 text-blue-800",in_progress:"bg-purple-100 text-purple-800",completed:"bg-green-100 text-green-800",cancelled:"bg-red-100 text-red-800"}[e]||"bg-gray-100 text-gray-800"}function g(){const e=document.getElementById("search").value.toLowerCase(),s=document.getElementById("status-filter").value,n=document.getElementById("date-filter").value;m=c.filter(a=>{const t=a.orderNumber||a.id||"",o=a.customerName||a.customer_name||"",d=a.customerEmail||a.customer_email||"",l=a.serviceName||a.service_name||"",y=t.toLowerCase().includes(e)||o.toLowerCase().includes(e)||d.toLowerCase().includes(e)||l.toLowerCase().includes(e),L=!s||a.status===s,f=a.createdAt||a.created_at,I=!n||!f||S(f,n);return y&&L&&I}),u(),x()}function S(e,s){const n=new Date(e),a=new Date;switch(s){case"today":return n.toDateString()===a.toDateString();case"week":const t=new Date(a.getTime()-7*24*60*60*1e3);return n>=t;case"month":const o=new Date(a.getTime()-30*24*60*60*1e3);return n>=o;case"quarter":const d=new Date(a.getTime()-90*24*60*60*1e3);return n>=d;default:return!0}}function B(e){const s=c.find(o=>o.id===e);if(!s){console.error("Order not found:",e),alert("Order not found");return}const n=document.getElementById("order-modal"),a=document.getElementById("modal-title"),t=document.getElementById("modal-content");n&&a&&t&&(a.textContent=`Order ${s.orderNumber}`,t.innerHTML=`
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
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${N(s.status)}">
                  ${(s.status||"pending").replace("_"," ")}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Payment Status:</span>
                <span class="text-sm font-medium text-gray-900">${s.paymentStatus||"Pending"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Amount:</span>
                <span class="text-sm font-medium text-gray-900">₹${(s.amount||0).toLocaleString()}</span>
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
      `,n.classList.remove("hidden"))}async function D(e){const s=c.find(a=>a.id===e);if(!s){console.error("Order not found:",e),alert("Order not found");return}const n=prompt(`Current status: ${s.status||"No status"}

Enter new status:
- pending
- confirmed
- in_progress
- completed
- cancelled`,s.status||"pending");if(n&&n!==s.status)try{const a=c.findIndex(t=>t.id===e);a>-1&&(c[a].status=n,c[a].updatedAt=new Date().toISOString(),m=[...c],u(),x()),alert("Order status updated successfully!")}catch(a){alert("Failed to update order status"),console.error("Error updating order status:",a)}}function P(){document.getElementById("search")?.addEventListener("input",g),document.getElementById("status-filter")?.addEventListener("change",g),document.getElementById("date-filter")?.addEventListener("change",g),document.getElementById("items-per-page")?.addEventListener("change",E),document.getElementById("prev-page")?.addEventListener("click",b),document.getElementById("next-page")?.addEventListener("click",h),document.getElementById("refresh-orders")?.addEventListener("click",w),document.getElementById("close-modal")?.addEventListener("click",()=>{document.getElementById("order-modal")?.classList.add("hidden")}),document.getElementById("order-modal")?.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.classList.add("hidden")})}document.addEventListener("DOMContentLoaded",O);window.viewOrder=B;window.updateOrderStatus=D;window.goToPage=$;window.nextPage=h;window.prevPage=b;window.changeItemsPerPage=E;
