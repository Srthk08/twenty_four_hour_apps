import{a as x}from"./admin-data.DaeKHMJw.js";import"./Toast.astro_astro_type_script_index_0_lang.D91WvFkz.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./supabase.Bj7MEfmu.js";import"./index.BymsOcZI.js";import"./preload-helper.CLcXU_4U.js";let m=[],l=[],s=1,g=10,i=1;function I(){f(),P()}function f(){try{m=x.getRevenue(),l=[...m],s=1,u(),L(),v()}catch(t){console.error("Error loading billing data:",t)}}function L(){try{const t=x.getStats();document.getElementById("total-revenue").textContent=`₹${t.totalRevenue.toLocaleString()}`,document.getElementById("monthly-revenue").textContent=`₹${t.monthlyRevenue.toLocaleString()}`,document.getElementById("weekly-revenue").textContent=`₹${t.weeklyRevenue.toLocaleString()}`;const e=m.filter(a=>a.status==="pending").reduce((a,o)=>a+o.amount,0);document.getElementById("pending-revenue").textContent=`₹${e.toLocaleString()}`}catch(t){console.error("Error updating revenue stats:",t)}}function u(){const t=document.getElementById("transactions-tbody");if(!t)return;if(l.length===0){t.innerHTML=`
        <tr>
          <td colspan="7" class="px-6 py-12 text-center text-gray-500">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              <p class="text-lg font-medium text-gray-900 mb-2">No transactions found</p>
              <p class="text-gray-500">Try adjusting your search or filters</p>
            </div>
          </td>
        </tr>
      `,y();return}i=Math.ceil(l.length/g);const e=(s-1)*g,a=e+g,o=l.slice(e,a);t.innerHTML=o.map(n=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          ${n.transactionId||"N/A"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${n.customerEmail}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ₹${n.amount.toLocaleString()}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${E(n.status)}">
            ${n.status}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${n.paymentMethod}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${new Date(n.createdAt).toLocaleDateString()}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div class="flex space-x-2">
            <button 
              onclick="viewTransaction('${n.id}')"
              class="text-primary-600 hover:text-primary-900"
            >
              View
            </button>
            ${n.status==="completed"?`
              <button 
                onclick="refundTransaction('${n.id}')"
                class="text-red-600 hover:text-red-900"
              >
                Refund
              </button>
            `:""}
          </div>
        </td>
      </tr>
    `).join(""),y()}function v(){const t=document.getElementById("transactions-count");t&&(t.textContent=`Showing ${l.length} of ${m.length} transactions`)}function y(){const t=document.getElementById("page-numbers"),e=document.getElementById("prev-page"),a=document.getElementById("next-page");if(!t||!e||!a)return;e.disabled=s===1,e.classList.toggle("opacity-50",s===1),e.classList.toggle("cursor-not-allowed",s===1),a.disabled=s===i||i===0,a.classList.toggle("opacity-50",s===i||i===0),a.classList.toggle("cursor-not-allowed",s===i||i===0);let o="";const n=5;let c=Math.max(1,s-Math.floor(n/2)),r=Math.min(i,c+n-1);r-c+1<n&&(c=Math.max(1,r-n+1));for(let d=c;d<=r;d++)o+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${d===s?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${d})"
        >
          ${d}
        </button>
      `;t.innerHTML=o}function B(t){t<1||t>i||(s=t,u())}function w(){s<i&&(s++,u())}function h(){s>1&&(s--,u())}function b(){const t=document.getElementById("items-per-page");t&&(g=parseInt(t.value),s=1,u())}function E(t){return{pending:"bg-yellow-100 text-yellow-800",completed:"bg-green-100 text-green-800",failed:"bg-red-100 text-red-800",refunded:"bg-gray-100 text-gray-800"}[t]||"bg-gray-100 text-gray-800"}function p(){const t=document.getElementById("search").value.toLowerCase(),e=document.getElementById("status-filter").value,a=document.getElementById("date-filter").value;l=m.filter(o=>{const n=o.customerEmail.toLowerCase().includes(t)||o.transactionId&&o.transactionId.toLowerCase().includes(t),c=!e||o.status===e,r=!a||T(o.createdAt,a);return n&&c&&r}),u(),v()}function T(t,e){const a=new Date(t),o=new Date;switch(e){case"today":return a.toDateString()===o.toDateString();case"week":const n=new Date(o.getTime()-7*24*60*60*1e3);return a>=n;case"month":const c=new Date(o.getTime()-30*24*60*60*1e3);return a>=c;case"quarter":const r=new Date(o.getTime()-90*24*60*60*1e3);return a>=r;default:return!0}}function $(t){const e=m.find(c=>c.id===t);if(!e)return;const a=document.getElementById("transaction-modal"),o=document.getElementById("modal-title"),n=document.getElementById("modal-content");a&&o&&n&&(o.textContent=`Transaction ${e.transactionId||e.id}`,n.innerHTML=`
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Transaction ID</label>
              <p class="text-sm text-gray-900">${e.transactionId||"N/A"}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${E(e.status)}">
                ${e.status}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Amount</label>
              <p class="text-sm text-gray-900">₹${e.amount.toLocaleString()}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Currency</label>
              <p class="text-sm text-gray-900">${e.currency}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Payment Method</label>
              <p class="text-sm text-gray-900">${e.paymentMethod}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <p class="text-sm text-gray-900">${new Date(e.createdAt).toLocaleString()}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Customer Email</label>
            <p class="text-sm text-gray-900">${e.customerEmail}</p>
          </div>
        </div>
      `,a.classList.remove("hidden"))}function k(t){if(confirm("Are you sure you want to refund this transaction?"))try{alert("Refund functionality would be implemented with payment gateway integration")}catch(e){alert("Failed to process refund"),console.error("Error processing refund:",e)}}function D(){try{const t=["Transaction ID","Customer Email","Amount","Status","Payment Method","Date"],e=l.map(r=>[r.transactionId||"N/A",r.customerEmail,`${r.amount} ${r.currency}`,r.status,r.paymentMethod,new Date(r.createdAt).toLocaleDateString()]),a=[t,...e].map(r=>r.map(d=>`"${d}"`).join(",")).join(`
`),o=new Blob([a],{type:"text/csv"}),n=window.URL.createObjectURL(o),c=document.createElement("a");c.href=n,c.download=`transactions-${new Date().toISOString().split("T")[0]}.csv`,c.click(),window.URL.revokeObjectURL(n)}catch(t){alert("Failed to export transactions"),console.error("Error exporting transactions:",t)}}function P(){document.getElementById("search")?.addEventListener("input",p),document.getElementById("status-filter")?.addEventListener("change",p),document.getElementById("date-filter")?.addEventListener("change",p),document.getElementById("items-per-page")?.addEventListener("change",b),document.getElementById("prev-page")?.addEventListener("click",h),document.getElementById("next-page")?.addEventListener("click",w),document.getElementById("refresh-transactions")?.addEventListener("click",f),document.getElementById("export-btn")?.addEventListener("click",D),document.getElementById("close-modal")?.addEventListener("click",()=>{document.getElementById("transaction-modal")?.classList.add("hidden")}),document.getElementById("transaction-modal")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.classList.add("hidden")})}document.addEventListener("DOMContentLoaded",I);window.viewTransaction=$;window.refundTransaction=k;window.goToPage=B;window.nextPage=w;window.prevPage=h;window.changeItemsPerPage=b;
