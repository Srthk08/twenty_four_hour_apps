import{supabase as i}from"./supabase.C3b_eKiV.js";import"./Toast.astro_astro_type_script_index_0_lang.D91WvFkz.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";import"./index.BymsOcZI.js";import"./preload-helper.CLcXU_4U.js";class g{constructor(){}static getInstance(){return g.instance||(g.instance=new g),g.instance}async getUsers(){try{const{data:e,error:t}=await i.from("profiles_complete").select("*").order("created_at",{ascending:!1});return t?(console.error("Error fetching users:",t),[]):e||[]}catch(e){return console.error("Error in getUsers:",e),[]}}async getUserById(e){try{const{data:t,error:r}=await i.from("profiles_complete").select("*").eq("id",e).single();return r?(console.error("Error fetching user by ID:",r),null):t}catch(t){return console.error("Error in getUserById:",t),null}}async addUser(e){try{const{data:t,error:r}=await i.from("user_profiles").insert({email:e.email,full_name:e.full_name,phone:e.phone,company_name:e.company_name,role:e.role,status:e.status,username:e.username,avatar_url:e.avatar_url,bio:e.bio,website:e.website,location:e.location,timezone:e.timezone,language:e.language}).select().single();return r?(console.error("Error adding user:",r),null):t}catch(t){return console.error("Error in addUser:",t),null}}async updateUser(e,t){try{const{data:r,error:n}=await i.from("user_profiles").update({...t,updated_at:new Date().toISOString()}).eq("id",e).select().single();return n?(console.error("Error updating user:",n),null):r}catch(r){return console.error("Error in updateUser:",r),null}}async deleteUser(e){try{const{error:t}=await i.from("profiles").delete().eq("id",e);return t?(console.error("Error deleting user:",t),!1):!0}catch(t){return console.error("Error in deleteUser:",t),!1}}async getOrders(){try{const{data:e,error:t}=await i.from("orders").select(`
          *,
          profiles!inner(full_name, email)
        `).order("created_at",{ascending:!1});return t?(console.error("Error fetching orders:",t),[]):(e||[]).map(r=>({id:r.id,order_number:r.order_number,customer_name:r.user_profiles?.full_name||"Unknown",customer_email:r.user_profiles?.email||"Unknown",service_name:r.service_name||"Unknown Service",status:r.status,total_amount:r.total_amount,created_at:r.created_at,updated_at:r.updated_at}))}catch(e){return console.error("Error in getOrders:",e),[]}}async getOrderById(e){try{const{data:t,error:r}=await i.from("orders").select(`
          *,
          user_profiles!inner(full_name, email)
        `).eq("id",e).single();return r?(console.error("Error fetching order by ID:",r),null):{id:t.id,order_number:t.order_number,customer_name:t.user_profiles?.full_name||"Unknown",customer_email:t.user_profiles?.email||"Unknown",service_name:t.service_name||"Unknown Service",status:t.status,total_amount:t.total_amount,created_at:t.created_at,updated_at:t.updated_at}}catch(t){return console.error("Error in getOrderById:",t),null}}async addOrder(e){try{const{data:t,error:r}=await i.from("orders").insert({order_number:e.order_number,customer_name:e.customer_name,customer_email:e.customer_email,service_name:e.service_name,status:e.status,total_amount:e.total_amount}).select().single();return r?(console.error("Error adding order:",r),null):t}catch(t){return console.error("Error in addOrder:",t),null}}async updateOrder(e,t){try{const{data:r,error:n}=await i.from("orders").update({...t,updated_at:new Date().toISOString()}).eq("id",e).select().single();return n?(console.error("Error updating order:",n),null):r}catch(r){return console.error("Error in updateOrder:",r),null}}async getRevenue(){try{const{data:e,error:t}=await i.from("payments").select("*").order("created_at",{ascending:!1});return t?(console.error("Error fetching revenue:",t),[]):e||[]}catch(e){return console.error("Error in getRevenue:",e),[]}}async addRevenue(e){try{const{data:t,error:r}=await i.from("payments").insert({order_id:e.order_id,amount:e.amount,payment_method:e.payment_method,status:e.status}).select().single();return r?(console.error("Error adding revenue:",r),null):t}catch(t){return console.error("Error in addRevenue:",t),null}}async getRevenueByDateRange(e,t){try{const{data:r,error:n}=await i.from("payments").select("*").gte("created_at",e.toISOString()).lte("created_at",t.toISOString()).order("created_at",{ascending:!1});return n?(console.error("Error fetching revenue by date range:",n),[]):r||[]}catch(r){return console.error("Error in getRevenueByDateRange:",r),[]}}async getSupportTickets(){try{const{data:e,error:t}=await i.from("support_tickets").select("*").order("created_at",{ascending:!1});return t?(console.error("Error fetching support tickets:",t),[]):e||[]}catch(e){return console.error("Error in getSupportTickets:",e),[]}}async getTicketById(e){try{const{data:t,error:r}=await i.from("support_tickets").select("*").eq("id",e).single();return r?(console.error("Error fetching ticket by ID:",r),null):t}catch(t){return console.error("Error in getTicketById:",t),null}}async addTicket(e){try{const{data:t,error:r}=await i.from("support_tickets").insert({user_id:e.user_id,subject:e.subject,description:e.description,status:e.status,priority:e.priority}).select().single();return r?(console.error("Error adding ticket:",r),null):t}catch(t){return console.error("Error in addTicket:",t),null}}async updateTicket(e,t){try{const{data:r,error:n}=await i.from("support_tickets").update({...t,updated_at:new Date().toISOString()}).eq("id",e).select().single();return n?(console.error("Error updating ticket:",n),null):r}catch(r){return console.error("Error in updateTicket:",r),null}}async getStats(){try{const{data:e,error:t}=await i.from("admin_dashboard_data").select("*").single();if(t)return console.error("Error fetching dashboard data:",t),this.getDefaultStats();const[r,n,s]=await Promise.all([this.getOrders(),this.getRevenue(),this.getSupportTickets()]),o=n.reduce((c,y)=>c+(y.amount||0),0),u=n.filter(c=>new Date(c.created_at)>=new Date(Date.now()-30*24*60*60*1e3)).reduce((c,y)=>c+(y.amount||0),0),w=n.filter(c=>new Date(c.created_at)>=new Date(Date.now()-7*24*60*60*1e3)).reduce((c,y)=>c+(y.amount||0),0);return{totalUsers:e?.total_users||0,activeUsers:e?.active_users||0,totalOrders:r.length,pendingOrders:r.filter(c=>c.status==="pending").length,cartOrders:r.filter(c=>c.status==="cart").length,completedOrders:r.filter(c=>c.status==="completed").length,totalRevenue:o,monthlyRevenue:u,weeklyRevenue:w,openTickets:s.filter(c=>c.status==="open").length,highPriorityTickets:s.filter(c=>c.priority==="high").length,pendingPayments:n.filter(c=>c.status==="pending").length}}catch(e){return console.error("Error in getStats:",e),this.getDefaultStats()}}getDefaultStats(){return{totalUsers:0,activeUsers:0,totalOrders:0,pendingOrders:0,cartOrders:0,completedOrders:0,totalRevenue:0,monthlyRevenue:0,weeklyRevenue:0,openTickets:0,highPriorityTickets:0,pendingPayments:0}}async searchUsers(e){try{const{data:t,error:r}=await i.from("profiles_complete").select("*").or(`full_name.ilike.%${e}%,email.ilike.%${e}%,company_name.ilike.%${e}%`).order("created_at",{ascending:!1});return r?(console.error("Error searching users:",r),[]):t||[]}catch(t){return console.error("Error in searchUsers:",t),[]}}async searchOrders(e){try{const{data:t,error:r}=await i.from("orders").select(`
          *,
          user_profiles!inner(full_name, email)
        `).or(`order_number.ilike.%${e}%,user_profiles.full_name.ilike.%${e}%,user_profiles.email.ilike.%${e}%`).order("created_at",{ascending:!1});return r?(console.error("Error searching orders:",r),[]):(t||[]).map(n=>({id:n.id,order_number:n.order_number,customer_name:n.user_profiles?.full_name||"Unknown",customer_email:n.user_profiles?.email||"Unknown",service_name:n.service_name||"Unknown Service",status:n.status,total_amount:n.total_amount,created_at:n.created_at,updated_at:n.updated_at}))}catch(t){return console.error("Error in searchOrders:",t),[]}}async filterOrdersByStatus(e){try{if(!e)return await this.getOrders();const{data:t,error:r}=await i.from("orders").select(`
          *,
          user_profiles!inner(full_name, email)
        `).eq("status",e).order("created_at",{ascending:!1});return r?(console.error("Error filtering orders by status:",r),[]):(t||[]).map(n=>({id:n.id,order_number:n.order_number,customer_name:n.user_profiles?.full_name||"Unknown",customer_email:n.user_profiles?.email||"Unknown",service_name:n.service_name||"Unknown Service",status:n.status,total_amount:n.total_amount,created_at:n.created_at,updated_at:n.updated_at}))}catch(t){return console.error("Error in filterOrdersByStatus:",t),[]}}async filterOrdersByDateRange(e){try{const t=new Date;let r;switch(e){case"today":r=new Date(t.getFullYear(),t.getMonth(),t.getDate());break;case"week":r=new Date(t.getTime()-7*24*60*60*1e3);break;case"month":r=new Date(t.getTime()-30*24*60*60*1e3);break;case"quarter":r=new Date(t.getTime()-90*24*60*60*1e3);break;default:return await this.getOrders()}const{data:n,error:s}=await i.from("orders").select(`
          *,
          user_profiles!inner(full_name, email)
        `).gte("created_at",r.toISOString()).order("created_at",{ascending:!1});return s?(console.error("Error filtering orders by date range:",s),[]):(n||[]).map(o=>({id:o.id,order_number:o.order_number,customer_name:o.user_profiles?.full_name||"Unknown",customer_email:o.user_profiles?.email||"Unknown",service_name:o.service_name||"Unknown Service",status:o.status,total_amount:o.total_amount,created_at:o.created_at,updated_at:o.updated_at}))}catch(t){return console.error("Error in filterOrdersByDateRange:",t),[]}}exportOrdersToCSV(){return"CSV export functionality to be implemented"}async clearAllData(){try{const{error:e}=await i.rpc("clear_all_data");return e?(console.error("Error clearing all data:",e),!1):!0}catch(e){return console.error("Error in clearAllData:",e),!1}}async getAdminUsers(){try{const{data:e,error:t}=await i.rpc("get_admin_users");return t?(console.error("Error fetching admin users:",t),[]):e||[]}catch(e){return console.error("Error in getAdminUsers:",e),[]}}async logAdminAction(e,t,r,n){try{const{error:s}=await i.from("admin_audit_log").insert({action:e,target_type:t,target_id:r,details:n||{},ip_address:"127.0.0.1",user_agent:navigator.userAgent});return s?(console.error("Error logging admin action:",s),!1):!0}catch(s){return console.error("Error in logAdminAction:",s),!1}}}const x=g.getInstance();let p=[],m=[],l=1,_=10,d=1;function S(){E(),P()}function E(){try{p=x.getRevenue(),m=[...p],l=1,f(),B(),b()}catch(a){console.error("Error loading billing data:",a)}}function B(){try{const a=x.getStats();document.getElementById("total-revenue").textContent=`₹${a.totalRevenue.toLocaleString()}`,document.getElementById("monthly-revenue").textContent=`₹${a.monthlyRevenue.toLocaleString()}`,document.getElementById("weekly-revenue").textContent=`₹${a.weeklyRevenue.toLocaleString()}`;const e=p.filter(t=>t.status==="pending").reduce((t,r)=>t+r.amount,0);document.getElementById("pending-revenue").textContent=`₹${e.toLocaleString()}`}catch(a){console.error("Error updating revenue stats:",a)}}function f(){const a=document.getElementById("transactions-tbody");if(!a)return;if(m.length===0){a.innerHTML=`
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
      `,v();return}d=Math.ceil(m.length/_);const e=(l-1)*_,t=e+_,r=m.slice(e,t);a.innerHTML=r.map(n=>`
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
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${T(n.status)}">
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
    `).join(""),v()}function b(){const a=document.getElementById("transactions-count");a&&(a.textContent=`Showing ${m.length} of ${p.length} transactions`)}function v(){const a=document.getElementById("page-numbers"),e=document.getElementById("prev-page"),t=document.getElementById("next-page");if(!a||!e||!t)return;e.disabled=l===1,e.classList.toggle("opacity-50",l===1),e.classList.toggle("cursor-not-allowed",l===1),t.disabled=l===d||d===0,t.classList.toggle("opacity-50",l===d||d===0),t.classList.toggle("cursor-not-allowed",l===d||d===0);let r="";const n=5;let s=Math.max(1,l-Math.floor(n/2)),o=Math.min(d,s+n-1);o-s+1<n&&(s=Math.max(1,o-n+1));for(let u=s;u<=o;u++)r+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${u===l?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${u})"
        >
          ${u}
        </button>
      `;a.innerHTML=r}function L(a){a<1||a>d||(l=a,f())}function k(){l<d&&(l++,f())}function I(){l>1&&(l--,f())}function D(){const a=document.getElementById("items-per-page");a&&(_=parseInt(a.value),l=1,f())}function T(a){return{pending:"bg-yellow-100 text-yellow-800",completed:"bg-green-100 text-green-800",failed:"bg-red-100 text-red-800",refunded:"bg-gray-100 text-gray-800"}[a]||"bg-gray-100 text-gray-800"}function h(){const a=document.getElementById("search").value.toLowerCase(),e=document.getElementById("status-filter").value,t=document.getElementById("date-filter").value;m=p.filter(r=>{const n=r.customerEmail.toLowerCase().includes(a)||r.transactionId&&r.transactionId.toLowerCase().includes(a),s=!e||r.status===e,o=!t||$(r.createdAt,t);return n&&s&&o}),f(),b()}function $(a,e){const t=new Date(a),r=new Date;switch(e){case"today":return t.toDateString()===r.toDateString();case"week":const n=new Date(r.getTime()-7*24*60*60*1e3);return t>=n;case"month":const s=new Date(r.getTime()-30*24*60*60*1e3);return t>=s;case"quarter":const o=new Date(r.getTime()-90*24*60*60*1e3);return t>=o;default:return!0}}function U(a){const e=p.find(s=>s.id===a);if(!e)return;const t=document.getElementById("transaction-modal"),r=document.getElementById("modal-title"),n=document.getElementById("modal-content");t&&r&&n&&(r.textContent=`Transaction ${e.transactionId||e.id}`,n.innerHTML=`
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Transaction ID</label>
              <p class="text-sm text-gray-900">${e.transactionId||"N/A"}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${T(e.status)}">
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
      `,t.classList.remove("hidden"))}function O(a){if(confirm("Are you sure you want to refund this transaction?"))try{alert("Refund functionality would be implemented with payment gateway integration")}catch(e){alert("Failed to process refund"),console.error("Error processing refund:",e)}}function R(){try{const a=["Transaction ID","Customer Email","Amount","Status","Payment Method","Date"],e=m.map(o=>[o.transactionId||"N/A",o.customerEmail,`${o.amount} ${o.currency}`,o.status,o.paymentMethod,new Date(o.createdAt).toLocaleDateString()]),t=[a,...e].map(o=>o.map(u=>`"${u}"`).join(",")).join(`
`),r=new Blob([t],{type:"text/csv"}),n=window.URL.createObjectURL(r),s=document.createElement("a");s.href=n,s.download=`transactions-${new Date().toISOString().split("T")[0]}.csv`,s.click(),window.URL.revokeObjectURL(n)}catch(a){alert("Failed to export transactions"),console.error("Error exporting transactions:",a)}}function P(){document.getElementById("search")?.addEventListener("input",h),document.getElementById("status-filter")?.addEventListener("change",h),document.getElementById("date-filter")?.addEventListener("change",h),document.getElementById("items-per-page")?.addEventListener("change",D),document.getElementById("prev-page")?.addEventListener("click",I),document.getElementById("next-page")?.addEventListener("click",k),document.getElementById("refresh-transactions")?.addEventListener("click",E),document.getElementById("export-btn")?.addEventListener("click",R),document.getElementById("close-modal")?.addEventListener("click",()=>{document.getElementById("transaction-modal")?.classList.add("hidden")}),document.getElementById("transaction-modal")?.addEventListener("click",a=>{a.target===a.currentTarget&&a.currentTarget.classList.add("hidden")})}document.addEventListener("DOMContentLoaded",S);window.viewTransaction=U;window.refundTransaction=O;window.goToPage=L;window.nextPage=k;window.prevPage=I;window.changeItemsPerPage=D;
