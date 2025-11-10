import"./ProductDialog.astro_astro_type_script_index_0_lang.85w2jD1L.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.Bf11ZY-L.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const S="https://lmrrdcaavwwletcjcpqv.supabase.co",I="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let d=null,r=[],m=[],i=1,f=10,l=1;function x(){return new Promise(s=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(d=window.supabase,s(d)):window.supabase&&typeof window.supabase.createClient=="function"?(d=window.supabase.createClient(S,I),s(d)):setTimeout(()=>x().then(s),100)})}function v(){k(),D()}async function k(){try{console.log("🔄 Loading tickets from Supabase..."),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(e=>{e&&(e.disabled=!0,e.textContent="Loading...")});const t=document.getElementById("tickets-count");if(t&&(t.textContent="Loading tickets..."),d||await x(),!d&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?d=window.supabase:typeof window.supabase.createClient=="function"&&(d=window.supabase.createClient(S,I))),!d){console.error("❌ Supabase client not available"),h("Database connection error. Please refresh the page and try again.");return}const{data:a,error:n}=await d.from("support_tickets").select("*").order("created_at",{ascending:!1});if(n){console.error("❌ Error loading tickets:",n),console.error("Error details:",{message:n.message,details:n.details,hint:n.hint,code:n.code});let e="";n.code==="PGRST116"?e='Table "support_tickets" does not exist. Please run the fix-support-tickets-complete.sql script in Supabase SQL Editor.':n.code==="PGRST301"?e="Permission denied. Please check RLS policies in Supabase.":n.message.includes("permission denied for table users")?e="Database Error: permission denied for table users. Please run the fix-support-tickets-complete.sql script in Supabase.":e=`Database Error: ${n.message}. Please run the fix-support-tickets-complete.sql script in Supabase.`,h(e);return}if(console.log("✅ Raw tickets from Supabase:",a),!a||a.length===0){console.log("⚠️ No tickets found in database"),r=[],m=[],u(),y();const e=document.getElementById("tickets-tbody"),o=document.getElementById("empty-tickets");e&&(e.innerHTML=`
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
          `),o&&o.classList.add("hidden");return}r=a.map(e=>{console.log("🔍 Processing ticket:",{id:e.id,rawTicket:e,allKeys:Object.keys(e)});const o={id:e.id,ticketNumber:e.ticket_number||e.ticketNumber||e.ticket_id||e.id,customerName:e.customer_name||e.customerName||e.name||e.user_name||e.userName||"No Name",customerEmail:e.customer_email||e.customerEmail||e.email||e.user_email||e.userEmail||"No Email",subject:e.subject||e.title||e.issue||"No Subject",description:e.description||e.message||e.content||e.details||"No Description",priority:e.priority||e.urgency||"medium",status:e.status||e.state||"open",createdAt:e.created_at||e.createdAt||e.date_created||e.dateCreated||new Date().toISOString(),updatedAt:e.updated_at||e.updatedAt||e.date_updated||e.dateUpdated||new Date().toISOString(),adminReplies:e.admin_replies||e.adminReplies||e.replies||e.responses||[]};return console.log("✅ Processed ticket:",{original:e,processed:o,nameSource:e.customer_name?"customer_name":e.customerName?"customerName":e.name?"name":"fallback",emailSource:e.customer_email?"customer_email":e.customerEmail?"customerEmail":e.email?"email":"fallback"}),o}),m=[...r],i=1,console.log("📊 Final processed tickets:",r),u(),y()}catch(s){console.error("❌ Error loading tickets:",s),h(`Connection Error: ${s.message}`)}finally{document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(t=>{t&&(t.disabled=!1,t.textContent="Refresh")})}}function h(s){const t=document.getElementById("tickets-tbody"),a=document.getElementById("empty-tickets");t&&(t.innerHTML=`
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
      `),a&&a.classList.add("hidden"),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(o=>{o&&(o.disabled=!1,o.textContent="Refresh")});const e=document.getElementById("tickets-count");e&&(e.textContent="Error loading tickets")}function u(){const s=document.getElementById("tickets-tbody"),t=document.getElementById("empty-tickets");if(!s||!t)return;if(m.length===0){s.innerHTML="",t.classList.remove("hidden"),E();return}t.classList.add("hidden"),l=Math.ceil(m.length/f);const a=(i-1)*f,n=a+f,e=m.slice(a,n);console.log("Rendering tickets:",e),s.innerHTML=e.map(o=>(console.log("Rendering ticket:",o.customerName,o.customerEmail),`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${o.ticketNumber}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <span class="text-sm font-medium text-primary-600">${(o.customerName||"U").charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">${o.customerName||"Unknown User"}</div>
              <div class="text-sm text-gray-500">${o.customerEmail||"No Email"}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${o.subject}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${P(o.priority)}">
            ${o.priority}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${N(o.status)}">
            ${o.status.replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${A(o.createdAt)}
        </td>
                 <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
           <div class="flex items-center space-x-2">
             <button onclick="viewTicket('${o.id}')" class="text-primary-600 hover:text-primary-900">View & Reply</button>
           </div>
         </td>
      </tr>
      `)).join(""),E()}function E(){const s=document.getElementById("page-numbers"),t=document.getElementById("prev-page"),a=document.getElementById("next-page");if(!s||!t||!a)return;t.disabled=i===1,t.classList.toggle("opacity-50",i===1),t.classList.toggle("cursor-not-allowed",i===1),a.disabled=i===l||l===0,a.classList.toggle("opacity-50",i===l||l===0),a.classList.toggle("cursor-not-allowed",i===l||l===0);let n="";const e=5;let o=Math.max(1,i-Math.floor(e/2)),p=Math.min(l,o+e-1);p-o+1<e&&(o=Math.max(1,p-e+1));for(let c=o;c<=p;c++)n+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${c===i?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${c})"
        >
          ${c}
        </button>
      `;s.innerHTML=n}function B(s){s<1||s>l||(i=s,u())}function T(){i<l&&(i++,u())}function L(){i>1&&(i--,u())}function $(){const s=document.getElementById("items-per-page");s&&(f=parseInt(s.value),i=1,u())}function y(){const s=document.getElementById("tickets-count");s&&(s.textContent=`Showing ${m.length} of ${r.length} tickets`)}function P(s){return{low:"bg-green-100 text-green-800",medium:"bg-yellow-100 text-yellow-800",high:"bg-orange-100 text-orange-800",urgent:"bg-red-100 text-red-800"}[s]||"bg-gray-100 text-gray-800"}function N(s){return{open:"bg-blue-100 text-blue-800",in_progress:"bg-yellow-100 text-yellow-800",resolved:"bg-green-100 text-green-800",closed:"bg-gray-100 text-gray-800"}[s]||"bg-gray-100 text-gray-800"}function A(s){const t=new Date,a=new Date(s),n=Math.floor((t-a)/(1e3*60*60));if(n<1)return"Just now";if(n<24)return`${n} hour${n>1?"s":""} ago`;const e=Math.floor(n/24);return e<7?`${e} day${e>1?"s":""} ago`:a.toLocaleDateString()}function C(s){const t=r.find(e=>e.id===s);if(!t)return;document.body.style.overflow="hidden",document.getElementById("ticket-modal").classList.remove("hidden");const a=document.getElementById("modal-title"),n=document.getElementById("modal-content");a&&n&&(a.textContent=`Ticket ${t.ticketNumber}`,n.innerHTML=`
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
               ${(()=>{let e=[];if(t.adminReplies)if(Array.isArray(t.adminReplies))e=t.adminReplies;else if(typeof t.adminReplies=="string")try{e=JSON.parse(t.adminReplies),Array.isArray(e)||(e=[{message:t.adminReplies,timestamp:new Date().toISOString()}])}catch{e=[{message:t.adminReplies,timestamp:new Date().toISOString()}]}else typeof t.adminReplies=="object"&&(e=[t.adminReplies]);return e.length>0?e.map(o=>`
                     <div class="mb-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                       <div class="font-medium text-blue-800">Admin Reply:</div>
                       <div class="text-blue-700">${o.message||o.reply||o||"No message"}</div>
                       <div class="text-xs text-blue-600 mt-1">${o.timestamp?new Date(o.timestamp).toLocaleString():o.created_at?new Date(o.created_at).toLocaleString():"Recently"}</div>
                     </div>
                   `).join(""):'<div class="text-gray-500">No admin replies yet</div>'})()}
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
       `)}function b(){document.getElementById("ticket-modal").classList.add("hidden"),document.body.style.overflow=""}async function _(s){if(confirm("Reopen this ticket?"))try{d||await x();const{error:t}=await d.from("support_tickets").update({status:"open",updated_at:new Date().toISOString()}).eq("id",s);if(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket: "+t.message);return}const a=r.findIndex(n=>n.id===s);a>-1&&(r[a].status="open",r[a].updatedAt=new Date().toISOString(),m=[...r],u(),y()),alert("Ticket reopened successfully!")}catch(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket")}}async function M(s){const t=document.getElementById("ticket-status").value,a=document.getElementById("ticket-response").value;if(!a.trim()){alert("Please add a reply before updating the ticket");return}try{d||await x();const n=r.find(w=>w.id===s);if(!n){alert("Ticket not found");return}const e={message:a,timestamp:new Date().toISOString(),adminName:"Admin"},p=[...n.adminReplies||[],e],{error:c}=await d.from("support_tickets").update({status:t,admin_replies:p,updated_at:new Date().toISOString()}).eq("id",s);if(c){console.error("Error updating ticket:",c),alert("Failed to update ticket: "+c.message);return}const g=r.findIndex(w=>w.id===s);g>-1&&(r[g].status=t,r[g].adminReplies=p,r[g].updatedAt=new Date().toISOString(),m=[...r],u(),y());const R=`✅ Reply sent successfully!

Ticket #${n.ticketNumber} has been updated.
Status: ${t}
Customer: ${n.customerName}

An email notification has been sent to ${n.customerEmail}`;alert(R),b(),O(`Reply sent to ${n.customerName} for ticket #${n.ticketNumber}`)}catch(n){console.error("Error updating ticket:",n),alert("Failed to update ticket")}}function D(){document.getElementById("refresh-tickets-header")?.addEventListener("click",()=>{console.log("🔄 Refresh button clicked (header)"),k()}),document.getElementById("refresh-tickets")?.addEventListener("click",()=>{console.log("🔄 Refresh button clicked (pagination)"),k()}),document.getElementById("items-per-page")?.addEventListener("change",$),document.getElementById("prev-page")?.addEventListener("click",L),document.getElementById("next-page")?.addEventListener("click",T),document.getElementById("close-modal")?.addEventListener("click",b),document.getElementById("ticket-modal")?.addEventListener("click",s=>{s.target===s.currentTarget&&b()})}window.goToPage=B;window.nextPage=T;window.prevPage=L;window.changeItemsPerPage=$;document.addEventListener("DOMContentLoaded",()=>{console.log("📋 Admin support page DOM loaded, initializing..."),v()});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",v):(console.log("📋 Admin support page already loaded, initializing immediately..."),v());function O(s){const t=document.createElement("div");t.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full",t.innerHTML=`
      <div class="flex items-center">
        <svg class="w-5 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${s}</span>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.remove("translate-x-full")},100),setTimeout(()=>{t.classList.add("translate-x-full"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},5e3)}window.viewTicket=C;window.closeTicketModal=b;window.reopenTicket=_;window.updateTicket=M;
