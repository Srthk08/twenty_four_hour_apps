import"./Footer.astro_astro_type_script_index_0_lang.CYGdQqJr.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const $="https://lmrrdcaavwwletcjcpqv.supabase.co",L="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let c=null,i=[],m=[],a=1,f=10,d=1;function b(){return new Promise(s=>{window.supabase?(c=window.supabase.createClient($,L),s(c)):setTimeout(()=>b().then(s),100)})}function B(){w(),D()}async function w(){try{console.log("🔄 Loading tickets from Supabase..."),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(e=>{e&&(e.disabled=!0,e.textContent="Loading...")});const t=document.getElementById("tickets-count");if(t&&(t.textContent="Loading tickets..."),c||await b(),!c){console.error("❌ Supabase client not available"),v("Database connection error. Please refresh the page and try again.");return}const{data:r,error:o}=await c.from("support_tickets").select("*").order("created_at",{ascending:!1});if(o){console.error("❌ Error loading tickets:",o),console.error("Error details:",{message:o.message,details:o.details,hint:o.hint,code:o.code});let e="";o.code==="PGRST116"?e='Table "support_tickets" does not exist. Please run the fix-support-tickets-complete.sql script in Supabase SQL Editor.':o.code==="PGRST301"?e="Permission denied. Please check RLS policies in Supabase.":o.message.includes("permission denied for table users")?e="Database Error: permission denied for table users. Please run the fix-support-tickets-complete.sql script in Supabase.":e=`Database Error: ${o.message}. Please run the fix-support-tickets-complete.sql script in Supabase.`,v(e);return}if(console.log("✅ Raw tickets from Supabase:",r),!r||r.length===0){console.log("⚠️ No tickets found in database"),i=[],m=[],u(),y();const e=document.getElementById("tickets-tbody"),n=document.getElementById("empty-tickets");e&&(e.innerHTML=`
            <tr>
              <td colspan="7" class="px-6 py-4 text-center">
                <div class="text-blue-600">
                  <div class="font-medium">📋 No support tickets found</div>
                  <div class="text-sm mt-1">Support tickets will appear here when users create them.</div>
                  <div class="text-xs mt-2 text-gray-500">
                    To add sample data, run the fix-support-tickets-complete.sql script in Supabase SQL Editor.
                  </div>
                </div>
              </td>
            </tr>
          `),n&&n.classList.add("hidden");return}i=r.map(e=>{console.log("🔍 Processing ticket:",{id:e.id,rawTicket:e,allKeys:Object.keys(e)});const n={id:e.id,ticketNumber:e.ticket_number||e.ticketNumber||e.ticket_id||e.id,customerName:e.customer_name||e.customerName||e.name||e.user_name||e.userName||"No Name",customerEmail:e.customer_email||e.customerEmail||e.email||e.user_email||e.userEmail||"No Email",subject:e.subject||e.title||e.issue||"No Subject",description:e.description||e.message||e.content||e.details||"No Description",priority:e.priority||e.urgency||"medium",status:e.status||e.state||"open",createdAt:e.created_at||e.createdAt||e.date_created||e.dateCreated||new Date().toISOString(),updatedAt:e.updated_at||e.updatedAt||e.date_updated||e.dateUpdated||new Date().toISOString(),adminReplies:e.admin_replies||e.adminReplies||e.replies||e.responses||[]};return console.log("✅ Processed ticket:",{original:e,processed:n,nameSource:e.customer_name?"customer_name":e.customerName?"customerName":e.name?"name":"fallback",emailSource:e.customer_email?"customer_email":e.customerEmail?"customerEmail":e.email?"email":"fallback"}),n}),m=[...i],a=1,console.log("📊 Final processed tickets:",i),u(),y()}catch(s){console.error("❌ Error loading tickets:",s),v(`Connection Error: ${s.message}`)}finally{document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(t=>{t&&(t.disabled=!1,t.textContent="Refresh")})}}function v(s){const t=document.getElementById("tickets-tbody"),r=document.getElementById("empty-tickets");t&&(t.innerHTML=`
        <tr>
          <td colspan="7" class="px-6 py-4 text-center">
            <div class="text-red-600">
              <div class="font-medium">Error Loading Tickets</div>
              <div class="text-sm mt-1">${s}</div>
              <div class="text-xs mt-2 text-gray-500">
                Please check the browser console for more details and run the fix-support-tickets-complete.sql script in Supabase.
              </div>
            </div>
          </td>
        </tr>
      `),r&&r.classList.add("hidden"),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(n=>{n&&(n.disabled=!1,n.textContent="Refresh")});const e=document.getElementById("tickets-count");e&&(e.textContent="Error loading tickets")}function u(){const s=document.getElementById("tickets-tbody"),t=document.getElementById("empty-tickets");if(!s||!t)return;if(m.length===0){s.innerHTML="",t.classList.remove("hidden"),k();return}t.classList.add("hidden"),d=Math.ceil(m.length/f);const r=(a-1)*f,o=r+f,e=m.slice(r,o);console.log("Rendering tickets:",e),s.innerHTML=e.map(n=>(console.log("Rendering ticket:",n.customerName,n.customerEmail),`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${n.ticketNumber}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <span class="text-sm font-medium text-primary-600">${(n.customerName||"U").charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">${n.customerName||"Unknown User"}</div>
              <div class="text-sm text-gray-500">${n.customerEmail||"No Email"}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${n.subject}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${N(n.priority)}">
            ${n.priority}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${R(n.status)}">
            ${n.status.replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${A(n.createdAt)}
        </td>
                 <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
           <div class="flex items-center space-x-2">
             <button onclick="viewTicket('${n.id}')" class="text-primary-600 hover:text-primary-900">View & Reply</button>
           </div>
         </td>
      </tr>
      `)).join(""),k()}function k(){const s=document.getElementById("page-numbers"),t=document.getElementById("prev-page"),r=document.getElementById("next-page");if(!s||!t||!r)return;t.disabled=a===1,t.classList.toggle("opacity-50",a===1),t.classList.toggle("cursor-not-allowed",a===1),r.disabled=a===d||d===0,r.classList.toggle("opacity-50",a===d||d===0),r.classList.toggle("cursor-not-allowed",a===d||d===0);let o="";const e=5;let n=Math.max(1,a-Math.floor(e/2)),p=Math.min(d,n+e-1);p-n+1<e&&(n=Math.max(1,p-e+1));for(let l=n;l<=p;l++)o+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${l===a?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${l})"
        >
          ${l}
        </button>
      `;s.innerHTML=o}function P(s){s<1||s>d||(a=s,u())}function E(){a<d&&(a++,u())}function I(){a>1&&(a--,u())}function S(){const s=document.getElementById("items-per-page");s&&(f=parseInt(s.value),a=1,u())}function y(){const s=document.getElementById("tickets-count");s&&(s.textContent=`Showing ${m.length} of ${i.length} tickets`)}function N(s){return{low:"bg-green-100 text-green-800",medium:"bg-yellow-100 text-yellow-800",high:"bg-orange-100 text-orange-800",urgent:"bg-red-100 text-red-800"}[s]||"bg-gray-100 text-gray-800"}function R(s){return{open:"bg-blue-100 text-blue-800",in_progress:"bg-yellow-100 text-yellow-800",resolved:"bg-green-100 text-green-800",closed:"bg-gray-100 text-gray-800"}[s]||"bg-gray-100 text-gray-800"}function A(s){const t=new Date,r=new Date(s),o=Math.floor((t-r)/(1e3*60*60));if(o<1)return"Just now";if(o<24)return`${o} hour${o>1?"s":""} ago`;const e=Math.floor(o/24);return e<7?`${e} day${e>1?"s":""} ago`:r.toLocaleDateString()}function C(s){const t=i.find(e=>e.id===s);if(!t)return;document.getElementById("ticket-modal").classList.remove("hidden");const r=document.getElementById("modal-title"),o=document.getElementById("modal-content");r&&o&&(r.textContent=`Ticket ${t.ticketNumber}`,o.innerHTML=`
         <div class="space-y-4">
           <!-- Customer Information -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
             <div class="bg-gray-50 p-3 rounded text-sm text-gray-900">
               ${t.customerName} (${t.customerEmail})
             </div>
           </div>
           
           <!-- Subject -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
             <div class="bg-gray-50 p-3 rounded text-sm text-gray-900">
               ${t.subject}
             </div>
           </div>
           
           <!-- Issue Description -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
             <div class="bg-gray-50 p-3 rounded text-sm text-gray-900">
               ${t.description}
             </div>
           </div>
           
           <!-- Admin Replies Section -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Admin Replies</label>
             <div id="admin-replies" class="bg-gray-50 p-3 rounded text-sm text-gray-900 max-h-32 overflow-y-auto">
               ${t.adminReplies&&t.adminReplies.length>0?t.adminReplies.map(e=>`
                   <div class="mb-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                     <div class="font-medium text-blue-800">Admin Reply:</div>
                     <div class="text-blue-700">${e.message}</div>
                     <div class="text-xs text-blue-600 mt-1">${new Date(e.timestamp).toLocaleString()}</div>
                   </div>
                 `).join(""):'<div class="text-gray-500">No admin replies yet</div>'}
             </div>
           </div>
           
           <!-- Status Update -->
           <div>
             <label for="ticket-status" class="block text-sm font-medium text-gray-700">Update Status</label>
             <select id="ticket-status" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
               <option value="open" ${t.status==="open"?"selected":""}>Open</option>
               <option value="in_progress" ${t.status==="in_progress"?"selected":""}>In Progress</option>
               <option value="resolved" ${t.status==="resolved"?"selected":""}>Resolved</option>
               <option value="closed" ${t.status==="closed"?"selected":""}>Closed</option>
             </select>
           </div>
           
           <!-- Admin Response -->
           <div>
             <label for="ticket-response" class="block text-sm font-medium text-gray-700">Add Admin Reply</label>
             <textarea
               id="ticket-response"
               rows="4"
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
               placeholder="Type your reply to the customer..."
             ></textarea>
           </div>
           
           <!-- Action Buttons -->
           <div class="flex justify-end space-x-3 pt-4">
             <button onclick="closeTicketModal()" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
               Cancel
             </button>
             <button onclick="updateTicket('${t.id}')" class="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
               Send Reply & Update
             </button>
           </div>
         </div>
       `)}function x(){document.getElementById("ticket-modal").classList.add("hidden")}async function _(s){if(confirm("Reopen this ticket?"))try{c||await b();const{error:t}=await c.from("support_tickets").update({status:"open",updated_at:new Date().toISOString()}).eq("id",s);if(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket: "+t.message);return}const r=i.findIndex(o=>o.id===s);r>-1&&(i[r].status="open",i[r].updatedAt=new Date().toISOString(),m=[...i],u(),y()),alert("Ticket reopened successfully!")}catch(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket")}}async function M(s){const t=document.getElementById("ticket-status").value,r=document.getElementById("ticket-response").value;if(!r.trim()){alert("Please add a reply before updating the ticket");return}try{c||await b();const o=i.find(h=>h.id===s);if(!o){alert("Ticket not found");return}const e={message:r,timestamp:new Date().toISOString(),adminName:"Admin"},p=[...o.adminReplies||[],e],{error:l}=await c.from("support_tickets").update({status:t,admin_replies:p,updated_at:new Date().toISOString()}).eq("id",s);if(l){console.error("Error updating ticket:",l),alert("Failed to update ticket: "+l.message);return}const g=i.findIndex(h=>h.id===s);g>-1&&(i[g].status=t,i[g].adminReplies=p,i[g].updatedAt=new Date().toISOString(),m=[...i],u(),y());const T=`✅ Reply sent successfully!

Ticket #${o.ticketNumber} has been updated.
Status: ${t}
Customer: ${o.customerName}

An email notification has been sent to ${o.customerEmail}`;alert(T),x(),j(`Reply sent to ${o.customerName} for ticket #${o.ticketNumber}`)}catch(o){console.error("Error updating ticket:",o),alert("Failed to update ticket")}}function D(){document.getElementById("refresh-tickets-header")?.addEventListener("click",()=>{console.log("🔄 Refresh button clicked (header)"),w()}),document.getElementById("refresh-tickets")?.addEventListener("click",()=>{console.log("🔄 Refresh button clicked (pagination)"),w()}),document.getElementById("items-per-page")?.addEventListener("change",S),document.getElementById("prev-page")?.addEventListener("click",I),document.getElementById("next-page")?.addEventListener("click",E),document.getElementById("close-modal")?.addEventListener("click",x),document.getElementById("ticket-modal")?.addEventListener("click",s=>{s.target===s.currentTarget&&x()})}window.goToPage=P;window.nextPage=E;window.prevPage=I;window.changeItemsPerPage=S;document.addEventListener("DOMContentLoaded",B);function j(s){const t=document.createElement("div");t.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full",t.innerHTML=`
      <div class="flex items-center">
        <svg class="w-5 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${s}</span>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.remove("translate-x-full")},100),setTimeout(()=>{t.classList.add("translate-x-full"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},5e3)}window.viewTicket=C;window.closeTicketModal=x;window.reopenTicket=_;window.updateTicket=M;
