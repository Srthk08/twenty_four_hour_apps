import"./ProductDialog.astro_astro_type_script_index_0_lang.85w2jD1L.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.Bf11ZY-L.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const I="https://lmrrdcaavwwletcjcpqv.supabase.co",T="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ",f="DevExpress";let i=null,d=[],m=[],r=1,y=10,c=1;function h(){return new Promise(s=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(i=window.supabase,s(i)):window.supabase&&typeof window.supabase.createClient=="function"?(i=window.supabase.createClient(I,T),s(i)):setTimeout(()=>h().then(s),100)})}function E(){k(),j()}async function k(){try{console.log("🔄 Loading tickets from Supabase..."),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(e=>{e&&(e.disabled=!0,e.textContent="Loading...")});const t=document.getElementById("tickets-count");t&&(t.textContent="Loading tickets...");const n=document.getElementById("tickets-tbody");if(n&&(n.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">Refreshing tickets...</td></tr>'),i||await h(),!i&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?i=window.supabase:typeof window.supabase.createClient=="function"&&(i=window.supabase.createClient(I,T))),!i){console.error("❌ Supabase client not available"),v("Database connection error. Please refresh the page and try again.");return}const{data:a,error:o}=await i.from("support_tickets").select("*").order("created_at",{ascending:!1});if(o){console.error("❌ Error loading tickets:",o),console.error("Error details:",{message:o.message,details:o.details,hint:o.hint,code:o.code});let e="";o.code==="PGRST116"?e='Table "support_tickets" does not exist. Please run the fix-support-tickets-complete.sql script in Supabase SQL Editor.':o.code==="PGRST301"?e="Permission denied. Please check RLS policies in Supabase.":o.message.includes("permission denied for table users")?e="Database Error: permission denied for table users. Please run the fix-support-tickets-complete.sql script in Supabase.":e=`Database Error: ${o.message}. Please run the fix-support-tickets-complete.sql script in Supabase.`,v(e);return}if(console.log("✅ Raw tickets from Supabase:",a),!a||a.length===0){console.log("⚠️ No tickets found in database"),d=[],m=[],p(),b();const e=document.getElementById("tickets-tbody"),l=document.getElementById("empty-tickets");e&&(e.innerHTML=`
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
          `),l&&l.classList.add("hidden");return}d=[],m=[],d=a.map(e=>{console.log("🔍 Processing ticket:",{id:e.id,rawTicket:e,allKeys:Object.keys(e)});const l={id:e.id,ticketNumber:e.ticket_number||e.ticketNumber||e.ticket_id||e.id,customerName:e.customer_name||e.customerName||e.name||e.user_name||e.userName||"No Name",customerEmail:e.customer_email||e.customerEmail||e.email||e.user_email||e.userEmail||"No Email",subject:e.subject||e.title||e.issue||"No Subject",description:e.description||e.message||e.content||e.details||"No Description",priority:e.priority||e.urgency||"medium",status:e.status||e.state||"open",createdAt:e.created_at||e.createdAt||e.date_created||e.dateCreated||new Date().toISOString(),updatedAt:e.updated_at||e.updatedAt||e.date_updated||e.dateUpdated||new Date().toISOString(),adminReplies:e.admin_replies||e.adminReplies||e.replies||e.responses||[]};return console.log("✅ Processed ticket:",{original:e,processed:l,nameSource:e.customer_name?"customer_name":e.customerName?"customerName":e.name?"name":"fallback",emailSource:e.customer_email?"customer_email":e.customerEmail?"customerEmail":e.email?"email":"fallback"}),l}),m=[...d],r=1,console.log("📊 Final processed tickets:",d),p(),b(),n&&n.offsetHeight}catch(s){console.error("❌ Error loading tickets:",s),v(`Connection Error: ${s.message}`)}finally{document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(t=>{t&&(t.disabled=!1,t.textContent="Refresh")})}}function v(s){const t=document.getElementById("tickets-tbody"),n=document.getElementById("empty-tickets");t&&(t.innerHTML=`
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
      `),n&&n.classList.add("hidden"),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(e=>{e&&(e.disabled=!1,e.textContent="Refresh")});const o=document.getElementById("tickets-count");o&&(o.textContent="Error loading tickets")}function p(){const s=document.getElementById("tickets-tbody"),t=document.getElementById("empty-tickets");if(!s||!t){console.error("❌ Table body or empty state element not found");return}if(s.innerHTML="",m.length===0){t.classList.remove("hidden"),S();return}t.classList.add("hidden"),c=Math.ceil(m.length/y);const n=(r-1)*y,a=n+y,o=m.slice(n,a);console.log("🔄 Rendering tickets:",{total:m.length,paginated:o.length,page:r,totalPages:c}),s.innerHTML=o.map(e=>(console.log("Rendering ticket:",e.customerName,e.customerEmail),`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${e.ticketNumber}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <span class="text-sm font-medium text-primary-600">${(e.customerName||"U").charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">${e.customerName||"Unknown User"}</div>
              <div class="text-sm text-gray-500">${e.customerEmail||"No Email"}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.subject}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${B(e.priority)}">
            ${e.priority}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${L(e.status)}">
            ${e.status.replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${R(e.createdAt)}
        </td>
                 <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
           <div class="flex items-center space-x-2">
             <button onclick="viewTicket('${e.id}')" class="text-primary-600 hover:text-primary-900">View & Reply</button>
           </div>
         </td>
      </tr>
      `)).join(""),S()}function S(){const s=document.getElementById("page-numbers"),t=document.getElementById("prev-page"),n=document.getElementById("next-page");if(!s||!t||!n)return;t.disabled=r===1,t.classList.toggle("opacity-50",r===1),t.classList.toggle("cursor-not-allowed",r===1),n.disabled=r===c||c===0,n.classList.toggle("opacity-50",r===c||c===0),n.classList.toggle("cursor-not-allowed",r===c||c===0);let a="";const o=5;let e=Math.max(1,r-Math.floor(o/2)),l=Math.min(c,e+o-1);l-e+1<o&&(e=Math.max(1,l-o+1));for(let u=e;u<=l;u++)a+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${u===r?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${u})"
        >
          ${u}
        </button>
      `;s.innerHTML=a}function P(s){s<1||s>c||(r=s,p())}function _(){r<c&&(r++,p())}function N(){r>1&&(r--,p())}function $(){const s=document.getElementById("items-per-page");s&&(y=parseInt(s.value),r=1,p())}function b(){const s=document.getElementById("tickets-count");s&&(s.textContent=`Showing ${m.length} of ${d.length} tickets`)}function B(s){return{low:"bg-green-100 text-green-800",medium:"bg-yellow-100 text-yellow-800",high:"bg-orange-100 text-orange-800",urgent:"bg-red-100 text-red-800"}[s]||"bg-gray-100 text-gray-800"}function L(s){return{open:"bg-blue-100 text-blue-800",in_progress:"bg-yellow-100 text-yellow-800",resolved:"bg-green-100 text-green-800",closed:"bg-gray-100 text-gray-800"}[s]||"bg-gray-100 text-gray-800"}function R(s){const t=new Date,n=new Date(s),a=Math.floor((t-n)/(1e3*60*60));if(a<1)return"Just now";if(a<24)return`${a} hour${a>1?"s":""} ago`;const o=Math.floor(a/24);return o<7?`${o} day${o>1?"s":""} ago`:n.toLocaleDateString()}function A(s){const t=d.find(o=>o.id===s);if(!t)return;document.body.style.overflow="hidden",document.getElementById("ticket-modal").classList.remove("hidden");const n=document.getElementById("modal-title"),a=document.getElementById("modal-content");n&&a&&(n.textContent=`Ticket ${t.ticketNumber}`,a.innerHTML=`
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
               ${(()=>{let o=[];if(t.adminReplies)if(Array.isArray(t.adminReplies))o=t.adminReplies;else if(typeof t.adminReplies=="string")try{o=JSON.parse(t.adminReplies),Array.isArray(o)||(o=[{message:t.adminReplies,timestamp:new Date().toISOString()}])}catch{o=[{message:t.adminReplies,timestamp:new Date().toISOString()}]}else typeof t.adminReplies=="object"&&(o=[t.adminReplies]);return o.length>0?o.map(e=>`
                     <div class="mb-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                       <div class="font-medium text-blue-800">Admin Reply:</div>
                       <div class="text-blue-700">${e.message||e.reply||e||"No message"}</div>
                       <div class="text-xs text-blue-600 mt-1">${e.timestamp?new Date(e.timestamp).toLocaleString():e.created_at?new Date(e.created_at).toLocaleString():"Recently"}</div>
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
       `)}function x(){document.getElementById("ticket-modal").classList.add("hidden"),document.body.style.overflow=""}async function C(s){if(confirm("Reopen this ticket?"))try{i||await h();const{error:t}=await i.from("support_tickets").update({status:"open",updated_at:new Date().toISOString()}).eq("id",s);if(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket: "+t.message);return}const n=d.findIndex(a=>a.id===s);n>-1&&(d[n].status="open",d[n].updatedAt=new Date().toISOString(),m=[...d],p(),b()),alert("Ticket reopened successfully!")}catch(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket")}}async function D(s,t,n){try{const a=`Your Problem is Resolved - ${f} Support Ticket #${s.ticketNumber}`,o=`
Hello ${s.customerName||"Valued Customer"},

Your problem has been resolved! Please check on the ${f} app.

Your complaint has been completed and our support team has responded to your ticket.

Ticket Details:
- Ticket Number: ${s.ticketNumber}
- Subject: ${s.subject}
- Status: ${n.charAt(0).toUpperCase()+n.slice(1).replace("_"," ")}

Admin Reply:
${t}

Please check the ${f} app for more details.

Thank you for your patience.

Best regards,
${f} Support Team

---
This is an automated notification. Please do not reply to this email.
      `.trim();try{const{data:e,error:l}=await i.functions.invoke("send-email",{body:{to:s.customerEmail,subject:a,body:o,ticketNumber:s.ticketNumber,customerName:s.customerName}});if(!l&&e){console.log("✅ Email sent successfully via Edge Function");return}}catch{console.log("📧 Edge Function not available, trying database function...")}try{const{error:e}=await i.rpc("send_ticket_reply_email",{p_to_email:s.customerEmail,p_subject:a,p_body:o,p_ticket_number:s.ticketNumber,p_customer_name:s.customerName});if(!e){console.log("✅ Email sent successfully via database function");return}}catch{console.log("📧 Database function not available, using email service...")}try{const{error:e}=await i.from("email_notifications").insert({to_email:s.customerEmail,subject:a,body:o,ticket_id:s.id,ticket_number:s.ticketNumber,customer_name:s.customerName,status:"pending",created_at:new Date().toISOString()});e?(console.log("📧 Email notification logged (table may not exist yet)"),console.log("Email Details:",{to:s.customerEmail,subject:a,body:o})):console.log("✅ Email notification queued for sending")}catch{console.log("📧 Email notification prepared (configure email service to send):",{to:s.customerEmail,subject:a,body:o})}}catch(a){console.warn("⚠️ Error sending email notification (non-blocking):",a)}}async function M(s){const t=document.getElementById("ticket-status").value,n=document.getElementById("ticket-response").value;if(!n.trim()){alert("Please add a reply before updating the ticket");return}try{i||await h();const a=d.find(w=>w.id===s);if(!a){alert("Ticket not found");return}const o={message:n,timestamp:new Date().toISOString(),adminName:"Admin"},l=[...a.adminReplies||[],o],{error:u}=await i.from("support_tickets").update({status:t,admin_replies:l,updated_at:new Date().toISOString()}).eq("id",s);if(u){console.error("Error updating ticket:",u),alert("Failed to update ticket: "+u.message);return}await D(a,n,t);const g=d.findIndex(w=>w.id===s);g>-1&&(d[g].status=t,d[g].adminReplies=l,d[g].updatedAt=new Date().toISOString(),m=[...d],p(),b()),x(),O(`Reply sent to ${a.customerName} for ticket #${a.ticketNumber}`)}catch(a){console.error("Error updating ticket:",a),alert("Failed to update ticket")}}function j(){const s=document.getElementById("refresh-tickets-header"),t=document.getElementById("refresh-tickets");s&&(s.onclick=n=>(n.preventDefault(),n.stopPropagation(),console.log("🔄 Refresh button clicked (header)"),k(),!1)),t&&(t.onclick=n=>(n.preventDefault(),n.stopPropagation(),console.log("🔄 Refresh button clicked (pagination)"),k(),!1)),document.getElementById("items-per-page")?.addEventListener("change",$),document.getElementById("prev-page")?.addEventListener("click",N),document.getElementById("next-page")?.addEventListener("click",_),document.getElementById("close-modal")?.addEventListener("click",x),document.getElementById("ticket-modal")?.addEventListener("click",n=>{n.target===n.currentTarget&&x()})}window.goToPage=P;window.nextPage=_;window.prevPage=N;window.changeItemsPerPage=$;document.addEventListener("DOMContentLoaded",()=>{console.log("📋 Admin support page DOM loaded, initializing..."),E()});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",E):(console.log("📋 Admin support page already loaded, initializing immediately..."),E());function O(s){const t=document.createElement("div");t.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full",t.innerHTML=`
      <div class="flex items-center">
        <svg class="w-5 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${s}</span>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.remove("translate-x-full")},100),setTimeout(()=>{t.classList.add("translate-x-full"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},5e3)}window.viewTicket=A;window.closeTicketModal=x;window.reopenTicket=C;window.updateTicket=M;
