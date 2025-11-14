import"./ProductDialog.astro_astro_type_script_index_0_lang.CpUg5vNK.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.Bf11ZY-L.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const I="https://lmrrdcaavwwletcjcpqv.supabase.co",T="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ",f="DevExpress";let i=null,l=[],m=[],n=1,y=10,c=1;function h(){return new Promise(o=>{window.supabase&&window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?(i=window.supabase,o(i)):window.supabase&&typeof window.supabase.createClient=="function"?(i=window.supabase.createClient(I,T),o(i)):setTimeout(()=>h().then(o),100)})}function E(){k(),j()}async function k(){try{console.log("🔄 Loading tickets from Supabase..."),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(e=>{e&&(e.disabled=!0,e.textContent="Loading...")});const t=document.getElementById("tickets-count");t&&(t.textContent="Loading tickets...");const r=document.getElementById("tickets-tbody");if(r&&(r.innerHTML='<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">Refreshing tickets...</td></tr>'),i||await h(),!i&&window.supabase&&(window.supabase.auth&&typeof window.supabase.auth.getUser=="function"?i=window.supabase:typeof window.supabase.createClient=="function"&&(i=window.supabase.createClient(I,T))),!i){console.error("❌ Supabase client not available"),v("Database connection error. Please refresh the page and try again.");return}const{data:a,error:s}=await i.from("support_tickets").select("*").order("created_at",{ascending:!1});if(s){console.error("❌ Error loading tickets:",s),console.error("Error details:",{message:s.message,details:s.details,hint:s.hint,code:s.code});let e="";s.code==="PGRST116"?e='Table "support_tickets" does not exist. Please run the fix-support-tickets-complete.sql script in Supabase SQL Editor.':s.code==="PGRST301"?e="Permission denied. Please check RLS policies in Supabase.":s.message.includes("permission denied for table users")?e="Database Error: permission denied for table users. Please run the fix-support-tickets-complete.sql script in Supabase.":e=`Database Error: ${s.message}. Please run the fix-support-tickets-complete.sql script in Supabase.`,v(e);return}if(console.log("✅ Raw tickets from Supabase:",a),!a||a.length===0){console.log("⚠️ No tickets found in database"),l=[],m=[],p(),b();const e=document.getElementById("tickets-tbody"),d=document.getElementById("empty-tickets");e&&(e.innerHTML=`
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
          `),d&&d.classList.add("hidden");return}l=[],m=[],l=a.map(e=>{console.log("🔍 Processing ticket:",{id:e.id,rawTicket:e,allKeys:Object.keys(e)});const d={id:e.id,ticketNumber:e.ticket_number||e.ticketNumber||e.ticket_id||e.id,customerName:e.customer_name||e.customerName||e.name||e.user_name||e.userName||"No Name",customerEmail:e.customer_email||e.customerEmail||e.email||e.user_email||e.userEmail||"No Email",subject:e.subject||e.title||e.issue||"No Subject",description:e.description||e.message||e.content||e.details||"No Description",priority:e.priority||e.urgency||"medium",status:e.status||e.state||"open",createdAt:e.created_at||e.createdAt||e.date_created||e.dateCreated||new Date().toISOString(),updatedAt:e.updated_at||e.updatedAt||e.date_updated||e.dateUpdated||new Date().toISOString(),adminReplies:e.admin_replies||e.adminReplies||e.replies||e.responses||[]};return console.log("✅ Processed ticket:",{original:e,processed:d,nameSource:e.customer_name?"customer_name":e.customerName?"customerName":e.name?"name":"fallback",emailSource:e.customer_email?"customer_email":e.customerEmail?"customerEmail":e.email?"email":"fallback"}),d}),m=[...l],n=1,console.log("📊 Final processed tickets:",l),p(),b(),r&&r.offsetHeight}catch(o){console.error("❌ Error loading tickets:",o),v(`Connection Error: ${o.message}`)}finally{document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(t=>{t&&(t.disabled=!1,t.textContent="Refresh")})}}function v(o){const t=document.getElementById("tickets-tbody"),r=document.getElementById("empty-tickets");t&&(t.innerHTML=`
        <tr>
          <td colspan="7" class="px-6 py-4 text-center">
            <div class="text-red-600">
              <div class="font-medium">Error Loading Tickets</div>
              <div class="text-sm mt-1">${o}</div>
              <div class="text-xs mt-2 text-gray-500">
                Please check the browser console for more details and run the fix-support-tickets-complete.sql script in Supabase.
              </div>
            </div>
          </td>
        </tr>
      `),r&&r.classList.add("hidden"),document.querySelectorAll("#refresh-tickets-header, #refresh-tickets").forEach(e=>{e&&(e.disabled=!1,e.textContent="Refresh")});const s=document.getElementById("tickets-count");s&&(s.textContent="Error loading tickets")}function p(){const o=document.getElementById("tickets-tbody"),t=document.getElementById("empty-tickets");if(!o||!t){console.error("❌ Table body or empty state element not found");return}if(o.innerHTML="",m.length===0){t.classList.remove("hidden"),S();return}t.classList.add("hidden"),c=Math.ceil(m.length/y);const r=(n-1)*y,a=r+y,s=m.slice(r,a);console.log("🔄 Rendering tickets:",{total:m.length,paginated:s.length,page:n,totalPages:c}),o.innerHTML=s.map(e=>(console.log("Rendering ticket:",e.customerName,e.customerEmail),`
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
      `)).join(""),S()}function S(){const o=document.getElementById("page-numbers"),t=document.getElementById("prev-page"),r=document.getElementById("next-page");if(!o||!t||!r)return;t.disabled=n===1,t.classList.toggle("opacity-50",n===1),t.classList.toggle("cursor-not-allowed",n===1),r.disabled=n===c||c===0,r.classList.toggle("opacity-50",n===c||c===0),r.classList.toggle("cursor-not-allowed",n===c||c===0);let a="";const s=5;let e=Math.max(1,n-Math.floor(s/2)),d=Math.min(c,e+s-1);d-e+1<s&&(e=Math.max(1,d-s+1));for(let u=e;u<=d;u++)a+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${u===n?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${u})"
        >
          ${u}
        </button>
      `;o.innerHTML=a}function P(o){o<1||o>c||(n=o,p())}function _(){n<c&&(n++,p())}function N(){n>1&&(n--,p())}function $(){const o=document.getElementById("items-per-page");o&&(y=parseInt(o.value),n=1,p())}function b(){const o=document.getElementById("tickets-count");o&&(o.textContent=`Showing ${m.length} of ${l.length} tickets`)}function B(o){return{low:"bg-green-100 text-green-800",medium:"bg-yellow-100 text-yellow-800",high:"bg-orange-100 text-orange-800",urgent:"bg-red-100 text-red-800"}[o]||"bg-gray-100 text-gray-800"}function L(o){return{open:"bg-blue-100 text-blue-800",in_progress:"bg-yellow-100 text-yellow-800",resolved:"bg-green-100 text-green-800",closed:"bg-gray-100 text-gray-800"}[o]||"bg-gray-100 text-gray-800"}function R(o){const t=new Date,r=new Date(o),a=Math.floor((t-r)/(1e3*60*60));if(a<1)return"Just now";if(a<24)return`${a} hour${a>1?"s":""} ago`;const s=Math.floor(a/24);return s<7?`${s} day${s>1?"s":""} ago`:r.toLocaleDateString()}function A(o){const t=l.find(s=>s.id===o);if(!t)return;document.body.style.overflow="hidden",document.getElementById("ticket-modal").classList.remove("hidden");const r=document.getElementById("modal-title"),a=document.getElementById("modal-content");r&&a&&(r.textContent=`Ticket ${t.ticketNumber}`,a.innerHTML=`
         <div class="space-y-4">
           <!-- Customer Information -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
             <div class="bg-gray-50 p-3 rounded text-sm text-gray-900 break-words overflow-wrap-anywhere">
               ${t.customerName} (${t.customerEmail})
             </div>
           </div>
           
           <!-- Subject -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
             <div class="bg-gray-50 p-3 rounded text-sm text-gray-900 break-words overflow-wrap-anywhere">
               ${t.subject}
             </div>
           </div>
           
           <!-- Issue Description -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
             <div class="bg-gray-50 p-3 rounded text-sm text-gray-900 break-words overflow-wrap-anywhere whitespace-pre-wrap break-all">
               ${t.description}
             </div>
           </div>
           
           <!-- Admin Replies Section -->
           <div>
             <label class="block text-sm font-medium text-gray-700 mb-2">Admin Replies</label>
             <div id="admin-replies" class="bg-gray-50 p-3 rounded text-sm text-gray-900 max-h-48 overflow-y-auto overflow-x-hidden break-words overflow-wrap-anywhere">
               ${(()=>{let s=[];if(t.adminReplies)if(Array.isArray(t.adminReplies))s=t.adminReplies;else if(typeof t.adminReplies=="string")try{s=JSON.parse(t.adminReplies),Array.isArray(s)||(s=[{message:t.adminReplies,timestamp:new Date().toISOString()}])}catch{s=[{message:t.adminReplies,timestamp:new Date().toISOString()}]}else typeof t.adminReplies=="object"&&(s=[t.adminReplies]);return s.length>0?s.map(e=>`
                     <div class="mb-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400 overflow-hidden">
                       <div class="font-medium text-blue-800 break-words overflow-wrap-anywhere">Admin Reply:</div>
                       <div class="text-blue-700 break-words overflow-wrap-anywhere whitespace-pre-wrap break-all">${e.message||e.reply||e||"No message"}</div>
                       <div class="text-xs text-blue-600 mt-1 break-words overflow-wrap-anywhere">${e.timestamp?new Date(e.timestamp).toLocaleString():e.created_at?new Date(e.created_at).toLocaleString():"Recently"}</div>
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
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y"
               placeholder="Type your reply to the customer..."
             ></textarea>
           </div>
           
           <!-- Action Buttons -->
           <div class="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
             <button onclick="closeTicketModal()" class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
               Cancel
             </button>
             <button onclick="updateTicket('${t.id}')" class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
               Send Reply & Update
             </button>
           </div>
         </div>
       `)}function w(){document.getElementById("ticket-modal").classList.add("hidden"),document.body.style.overflow=""}async function C(o){if(confirm("Reopen this ticket?"))try{i||await h();const{error:t}=await i.from("support_tickets").update({status:"open",updated_at:new Date().toISOString()}).eq("id",o);if(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket: "+t.message);return}const r=l.findIndex(a=>a.id===o);r>-1&&(l[r].status="open",l[r].updatedAt=new Date().toISOString(),m=[...l],p(),b()),alert("Ticket reopened successfully!")}catch(t){console.error("Error reopening ticket:",t),alert("Failed to reopen ticket")}}async function D(o,t,r){try{const a=`Your Problem is Resolved - ${f} Support Ticket #${o.ticketNumber}`,s=`
Hello ${o.customerName||"Valued Customer"},

Your problem has been resolved! Please check on the ${f} app.

Your complaint has been completed and our support team has responded to your ticket.

Ticket Details:
- Ticket Number: ${o.ticketNumber}
- Subject: ${o.subject}
- Status: ${r.charAt(0).toUpperCase()+r.slice(1).replace("_"," ")}

Admin Reply:
${t}

Please check the ${f} app for more details.

Thank you for your patience.

Best regards,
${f} Support Team

---
This is an automated notification. Please do not reply to this email.
      `.trim();try{const{data:e,error:d}=await i.functions.invoke("send-email",{body:{to:o.customerEmail,subject:a,body:s,ticketNumber:o.ticketNumber,customerName:o.customerName}});if(!d&&e){console.log("✅ Email sent successfully via Edge Function");return}}catch{console.log("📧 Edge Function not available, trying database function...")}try{const{error:e}=await i.rpc("send_ticket_reply_email",{p_to_email:o.customerEmail,p_subject:a,p_body:s,p_ticket_number:o.ticketNumber,p_customer_name:o.customerName});if(!e){console.log("✅ Email sent successfully via database function");return}}catch{console.log("📧 Database function not available, using email service...")}try{const{error:e}=await i.from("email_notifications").insert({to_email:o.customerEmail,subject:a,body:s,ticket_id:o.id,ticket_number:o.ticketNumber,customer_name:o.customerName,status:"pending",created_at:new Date().toISOString()});e?(console.log("📧 Email notification logged (table may not exist yet)"),console.log("Email Details:",{to:o.customerEmail,subject:a,body:s})):console.log("✅ Email notification queued for sending")}catch{console.log("📧 Email notification prepared (configure email service to send):",{to:o.customerEmail,subject:a,body:s})}}catch(a){console.warn("⚠️ Error sending email notification (non-blocking):",a)}}async function M(o){const t=document.getElementById("ticket-status").value,r=document.getElementById("ticket-response").value;if(!r.trim()){alert("Please add a reply before updating the ticket");return}try{i||await h();const a=l.find(x=>x.id===o);if(!a){alert("Ticket not found");return}const s={message:r,timestamp:new Date().toISOString(),adminName:"Admin"},d=[...a.adminReplies||[],s],{error:u}=await i.from("support_tickets").update({status:t,admin_replies:d,updated_at:new Date().toISOString()}).eq("id",o);if(u){console.error("Error updating ticket:",u),alert("Failed to update ticket: "+u.message);return}await D(a,r,t);const g=l.findIndex(x=>x.id===o);g>-1&&(l[g].status=t,l[g].adminReplies=d,l[g].updatedAt=new Date().toISOString(),m=[...l],p(),b()),w(),O(`Reply sent to ${a.customerName} for ticket #${a.ticketNumber}`)}catch(a){console.error("Error updating ticket:",a),alert("Failed to update ticket")}}function j(){const o=document.getElementById("refresh-tickets-header"),t=document.getElementById("refresh-tickets");o&&(o.onclick=r=>(r.preventDefault(),r.stopPropagation(),console.log("🔄 Refresh button clicked (header)"),k(),!1)),t&&(t.onclick=r=>(r.preventDefault(),r.stopPropagation(),console.log("🔄 Refresh button clicked (pagination)"),k(),!1)),document.getElementById("items-per-page")?.addEventListener("change",$),document.getElementById("prev-page")?.addEventListener("click",N),document.getElementById("next-page")?.addEventListener("click",_),document.getElementById("close-modal")?.addEventListener("click",w),document.getElementById("ticket-modal")?.addEventListener("click",r=>{r.target===r.currentTarget&&w()})}window.goToPage=P;window.nextPage=_;window.prevPage=N;window.changeItemsPerPage=$;document.addEventListener("DOMContentLoaded",()=>{console.log("📋 Admin support page DOM loaded, initializing..."),E()});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",E):(console.log("📋 Admin support page already loaded, initializing immediately..."),E());function O(o){const t=document.createElement("div");t.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full",t.innerHTML=`
      <div class="flex items-center">
        <svg class="w-5 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${o}</span>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.remove("translate-x-full")},100),setTimeout(()=>{t.classList.add("translate-x-full"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},5e3)}window.viewTicket=A;window.closeTicketModal=w;window.reopenTicket=C;window.updateTicket=M;
