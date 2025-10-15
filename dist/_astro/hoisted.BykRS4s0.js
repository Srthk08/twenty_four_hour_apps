import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./ProductDialog.astro_astro_type_script_index_0_lang.CG_DSVmw.js";import"https://unpkg.com/@supabase/supabase-js@2";let h;function N(){return new Promise(e=>{window.supabase&&window.supabase.createClient?(h=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),e(h)):setTimeout(()=>N().then(e),100)})}let c=[],u=[],r=1,p=10,o=1;async function S(){try{console.log("⏳ Waiting for Supabase to load..."),await N(),console.log("✅ Supabase client ready"),y(),M()}catch(e){console.error("❌ Error initializing orders page:",e)}}async function y(){try{c=[{id:"example-order-1",orderNumber:"ORD-2024-001",customerName:"John Doe",customerEmail:"john.doe@example.com",serviceName:"Web Development",serviceType:"custom",status:"pending",amount:15e3,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}],u=[...c],r=1,d(),v()}catch(e){console.error("Error loading orders:",e)}}function d(){const e=document.getElementById("orders-tbody");if(!e)return;if(u.length===0){e.innerHTML=`
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
      `,I();return}o=Math.ceil(u.length/p);const t=(r-1)*p,a=t+p,n=u.slice(t,a);e.innerHTML=n.map(s=>`
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
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${L(s.status)}">
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
    `).join(""),I()}function v(){const e=document.getElementById("orders-count");e&&(e.textContent=`Showing ${u.length} of ${c.length} orders`)}function I(){const e=document.getElementById("page-numbers"),t=document.getElementById("prev-page"),a=document.getElementById("next-page"),n=document.getElementById("page-numbers-mobile"),s=document.getElementById("prev-page-mobile"),i=document.getElementById("next-page-mobile");e&&t&&a&&E(e,t,a),n&&s&&i&&E(n,s,i)}function E(e,t,a){t.disabled=r===1,t.classList.toggle("opacity-50",r===1),t.classList.toggle("cursor-not-allowed",r===1),a.disabled=r===o||o===0,a.classList.toggle("opacity-50",r===o||o===0),a.classList.toggle("cursor-not-allowed",r===o||o===0);let n="";const s=5;let i=Math.max(1,r-Math.floor(s/2)),l=Math.min(o,i+s-1);l-i+1<s&&(i=Math.max(1,l-s+1));for(let m=i;m<=l;m++)n+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${m===r?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${m})"
        >
          ${m}
        </button>
      `;e.innerHTML=n}function D(e){e<1||e>o||(r=e,d())}function x(){r<o&&(r++,d())}function f(){r>1&&(r--,d())}function $(){const e=document.getElementById("items-per-page"),t=document.getElementById("items-per-page-mobile");let a=p;e&&(a=parseInt(e.value)),t&&(a=parseInt(t.value)),e&&(e.value=a),t&&(t.value=a),p=a,r=1,d()}function L(e){return{pending:"bg-yellow-100 text-yellow-800",confirmed:"bg-blue-100 text-blue-800",in_progress:"bg-purple-100 text-purple-800",completed:"bg-green-100 text-green-800",cancelled:"bg-red-100 text-red-800"}[e]||"bg-gray-100 text-gray-800"}function g(){const e=document.getElementById("search").value.toLowerCase(),t=document.getElementById("status-filter").value,a=document.getElementById("date-filter").value;u=c.filter(n=>{const s=n.orderNumber||n.id||"",i=n.customerName||n.customer_name||"",l=n.customerEmail||n.customer_email||"",m=n.serviceName||n.service_name||"",w=s.toLowerCase().includes(e)||i.toLowerCase().includes(e)||l.toLowerCase().includes(e)||m.toLowerCase().includes(e),O=!t||n.status===t,b=n.createdAt||n.created_at,B=!a||!b||P(b,a);return w&&O&&B}),d(),v()}function P(e,t){const a=new Date(e),n=new Date;switch(t){case"today":return a.toDateString()===n.toDateString();case"week":const s=new Date(n.getTime()-7*24*60*60*1e3);return a>=s;case"month":const i=new Date(n.getTime()-30*24*60*60*1e3);return a>=i;case"quarter":const l=new Date(n.getTime()-90*24*60*60*1e3);return a>=l;default:return!0}}function C(e){const t=c.find(i=>i.id===e);if(!t){console.error("Order not found:",e),alert("Order not found");return}const a=document.getElementById("order-modal"),n=document.getElementById("modal-title"),s=document.getElementById("modal-content");a&&n&&s&&(n.textContent=`Order ${t.orderNumber}`,s.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Order Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Order Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Order Number:</span>
                <span class="text-sm font-medium text-gray-900">${t.orderNumber||t.id}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Status:</span>
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${L(t.status)}">
                  ${(t.status||"pending").replace("_"," ")}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Payment Status:</span>
                <span class="text-sm font-medium text-gray-900">${t.paymentStatus||"Pending"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Amount:</span>
                <span class="text-sm font-medium text-gray-900">${(t.amount||0).toLocaleString("en-IN",{style:"currency",currency:"INR"})}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Created:</span>
                <span class="text-sm text-gray-900">${t.createdAt?new Date(t.createdAt).toLocaleDateString():"N/A"}</span>
              </div>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Customer Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Name:</span>
                <span class="text-sm font-medium text-gray-900">${t.customerName||"No Name"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Email:</span>
                <span class="text-sm font-medium text-gray-900">${t.customerEmail||"No Email"}</span>
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
              <span class="text-sm font-medium text-gray-900">${t.serviceName||"No Service"}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Type:</span>
              <span class="text-sm font-medium text-gray-900 capitalize">${t.serviceType||"N/A"}</span>
            </div>
          </div>
        </div>
      `,a.classList.remove("hidden"))}async function A(e){const t=c.find(n=>n.id===e);if(!t){console.error("Order not found:",e),alert("Order not found");return}const a=prompt(`Current status: ${t.status||"No status"}

Enter new status:
- pending
- confirmed
- in_progress
- completed
- cancelled`,t.status||"pending");if(a&&a!==t.status)try{const n=c.findIndex(s=>s.id===e);n>-1&&(c[n].status=a,c[n].updatedAt=new Date().toISOString(),u=[...c],d(),v()),alert("Order status updated successfully!")}catch(n){alert("Failed to update order status"),console.error("Error updating order status:",n)}}function M(){document.getElementById("search")?.addEventListener("input",g),document.getElementById("status-filter")?.addEventListener("change",g),document.getElementById("date-filter")?.addEventListener("change",g),document.getElementById("prev-page")?.addEventListener("click",f),document.getElementById("next-page")?.addEventListener("click",x),document.getElementById("refresh-orders")?.addEventListener("click",y),document.getElementById("prev-page-mobile")?.addEventListener("click",f),document.getElementById("next-page-mobile")?.addEventListener("click",x),document.getElementById("refresh-orders-mobile")?.addEventListener("click",y),document.getElementById("close-modal")?.addEventListener("click",()=>{document.getElementById("order-modal")?.classList.add("hidden")}),document.getElementById("order-modal")?.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.classList.add("hidden")})}function T(){const e=document.getElementById("items-per-page"),t=document.getElementById("items-per-page-mobile");e&&t&&(t.addEventListener("change",a=>{a.preventDefault(),e.value=t.value,p=parseInt(t.value),r=1,d()}),e.addEventListener("change",a=>{a.preventDefault(),t.value=e.value,p=parseInt(e.value),r=1,d()}))}document.addEventListener("DOMContentLoaded",()=>{S(),T()});window.viewOrder=C;window.updateOrderStatus=A;window.goToPage=D;window.nextPage=x;window.prevPage=f;window.changeItemsPerPage=$;
