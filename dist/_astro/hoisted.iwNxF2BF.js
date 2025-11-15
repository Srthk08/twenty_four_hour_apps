import"./ProductDialog.astro_astro_type_script_index_0_lang.CpUg5vNK.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AuthGuard.astro_astro_type_script_index_0_lang.DULNhCHQ.js";let i=null,p=!1;const y=()=>{try{return window.supabase&&window.supabase.auth?(i=window.supabase,p=!0,console.log("✅ Using global Supabase client from Layout"),!0):window.supabase&&typeof window.supabase.createClient=="function"?(i=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),p=!0,console.log("✅ Supabase client created directly"),!0):(console.log("⏳ Supabase not ready yet"),!1)}catch(t){return console.error("❌ Error initializing Supabase:",t),!1}},f=async(t=10,e=500)=>{for(let r=0;r<t;r++){if(p&&i)return console.log("✅ Supabase is ready"),!0;console.log(`⏳ Waiting for Supabase... (${r+1}/${t})`),await new Promise(a=>setTimeout(a,e)),y()}return console.error("❌ Supabase failed to initialize after retries"),!1};y();document.addEventListener("DOMContentLoaded",async()=>{p||y(),await k()});let E=0;const I=25,T=setInterval(()=>{p||E>=I?(clearInterval(T),p?console.log("✅ Supabase ready after retries"):console.error("❌ Supabase failed to initialize after all retries")):(E++,y())},200);async function k(){try{if(!await f()){console.log("⏳ Supabase not ready yet, will retry..."),setTimeout(k,1e3);return}const{data:{user:e},error:r}=await i.auth.getUser();if(r||!e){console.log("❌ No Supabase authentication found");const a=window.globalAuthManager||window.simpleAuthManager;if(a&&a.getCurrentUser){const l=a.getCurrentUser();if(l){console.log("🔄 User found in global auth manager, attempting to sync with Supabase..."),console.log("👤 Global user:",l),_(l.email);return}}console.log("ℹ️ No user found in any authentication system")}else console.log("✅ User authenticated via Supabase:",e.email),L(e.email)}catch(t){console.error("❌ Error checking authentication:",t)}}function _(t){const e=document.querySelector(".min-h-screen");if(e){const r=document.createElement("div");r.className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50 max-w-md",r.innerHTML=`
        <div class="flex items-start">
          <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <div class="flex-1">
            <p class="font-medium">Authentication Sync Required</p>
            <p class="text-sm mt-1">You're logged in as <strong>${t}</strong> but need to re-authenticate to access support features.</p>
            <div class="mt-3 flex space-x-2">
              <button onclick="window.location.href='/login'" class="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors">
                Go to Login
              </button>
              <button onclick="this.parentElement.parentElement.parentElement.remove()" class="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      `,e.appendChild(r),setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},15e3)}}function L(t){document.querySelectorAll("[data-user-email]").forEach(a=>{a.textContent=t});const r=document.querySelector("h1");if(r&&!r.querySelector(".user-email")){const a=document.createElement("span");a.className="user-email text-sm font-normal text-gray-600 ml-2",a.textContent=`(Logged in as: ${t})`,r.appendChild(a)}}function M(){const t=document.getElementById("ticketModal");if(t){document.body.style.overflow="hidden",t.classList.remove("hidden");const e=document.getElementById("userEmailDisplay");e&&(e.textContent="Loading..."),U()}}async function U(){try{if(!await f()){console.error("❌ Supabase not ready, cannot pre-fill form");const a=document.getElementById("userEmailDisplay");a&&(a.textContent="Database not ready");return}if(!i||!i.auth){console.error("❌ Supabase client or auth not available");const a=document.getElementById("userEmailDisplay");a&&(a.textContent="Authentication error");return}console.log("🔄 Getting user data...");const{data:{user:e},error:r}=await i.auth.getUser();if(r||!e){console.log("❌ No Supabase auth, checking global auth manager...");const a=window.globalAuthManager||window.simpleAuthManager;if(a&&a.getCurrentUser){const c=a.getCurrentUser();if(c){console.log("✅ User found in global auth manager:",c.email);const d=document.getElementById("userEmailDisplay");d&&(d.textContent=c.email||"Not available",d.className="text-yellow-600 font-medium");return}}console.log("❌ No user found in any auth system");const l=document.getElementById("userEmailDisplay");l&&(l.textContent="Not logged in");return}if(e){console.log("✅ User found via Supabase:",e.email);const a=document.getElementById("userEmailDisplay");a&&(a.textContent=e.email||"Not available",a.className="text-green-600 font-medium")}}catch(t){console.error("❌ Error pre-filling form:",t);const e=document.getElementById("userEmailDisplay");e&&(e.textContent="Error loading email")}}function g(){const t=document.getElementById("ticketModal"),e=document.getElementById("ticketForm");t&&(t.classList.add("hidden"),document.body.style.overflow="",e&&e.reset())}async function C(){const t=document.getElementById("myTicketsModal");t&&(document.body.style.overflow="hidden",t.classList.remove("hidden"),await $())}function D(){const t=document.getElementById("myTicketsModal");t&&(t.classList.add("hidden"),document.body.style.overflow="")}async function $(){try{if(console.log("🔄 Loading tickets..."),!await f()){console.error("❌ Supabase not ready"),alert("Database connection error. Please refresh the page and try again.");return}if(!i||!i.auth){console.error("❌ Supabase client or auth not available"),alert("Database connection error. Please refresh the page and try again.");return}const{data:{user:e},error:r}=await i.auth.getUser();if(r||!e){console.error("❌ Supabase auth error:",r),alert("Please login to view your tickets. You need to be authenticated through Supabase.");return}console.log("👤 User authenticated via Supabase:",e.email);const{data:a,error:l}=await i.from("support_tickets").select("*").or(`user_email.eq.${e.email},customer_email.eq.${e.email}`).order("created_at",{ascending:!1});if(l){console.error("❌ Database error:",l),alert("Error loading tickets: "+l.message);return}console.log("✅ Tickets loaded:",a?.length||0);const c=document.getElementById("my-tickets-list"),d=document.getElementById("no-tickets");if(!a||a.length===0){c.classList.add("hidden"),d.classList.remove("hidden");return}d.classList.add("hidden"),c.classList.remove("hidden"),c.innerHTML=a.map(s=>{let u="";if(s.admin_replies){let o=[];if(Array.isArray(s.admin_replies))o=s.admin_replies;else if(typeof s.admin_replies=="string")try{o=JSON.parse(s.admin_replies)}catch{o=[{message:s.admin_replies,timestamp:new Date().toISOString()}]}else typeof s.admin_replies=="object"&&(o=[s.admin_replies]);o&&o.length>0?u=`
              <div class="mt-4 p-3 bg-blue-50 rounded-lg overflow-hidden">
                <h5 class="font-semibold text-blue-900 mb-2">Admin Replies (${o.length}):</h5>
                ${o.map((n,b)=>`
                  <div class="mb-3 p-3 bg-white rounded border-l-4 border-blue-500 overflow-hidden">
                    <div class="flex items-start justify-between">
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-700 break-words overflow-wrap-anywhere whitespace-pre-wrap break-all">${n.message||n.reply||n||"No message"}</p>
                        ${n.admin_name?`<p class="text-xs text-blue-600 mt-1 break-words overflow-wrap-anywhere">By: ${n.admin_name}</p>`:""}
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2 break-words overflow-wrap-anywhere">
                      ${n.timestamp?new Date(n.timestamp).toLocaleString():n.created_at?new Date(n.created_at).toLocaleString():"Recently"}
                    </p>
                  </div>
                `).join("")}
              </div>
            `:u=`
              <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500">No admin replies yet</p>
              </div>
            `}else u=`
            <div class="mt-4 p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500">No admin replies yet</p>
            </div>
          `;return`
          <div class="border border-gray-200 rounded-lg p-3 sm:p-4 overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
              <div class="flex items-center flex-wrap gap-2">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${N(s.priority)}">
                  ${s.priority}
                </span>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${B(s.status)}">
                  ${s.status.replace("_"," ")}
                </span>
              </div>
              <span class="text-xs sm:text-sm text-gray-500">${new Date(s.created_at).toLocaleDateString()}</span>
            </div>
            
            <h4 class="font-semibold text-gray-900 mb-2 break-words overflow-wrap-anywhere">${s.subject}</h4>
            <p class="text-gray-600 text-sm mb-2 break-words overflow-wrap-anywhere">${s.description.length>100?s.description.substring(0,100)+"...":s.description}</p>
            <p class="text-gray-500 text-xs mb-2 break-words overflow-wrap-anywhere">Email: ${s.user_email||s.customer_email||"Not provided"}</p>
            <p class="text-gray-400 text-xs mb-3 break-words overflow-wrap-anywhere">Ticket #: ${s.ticket_number}</p>
            
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
              <button 
                onclick="viewTicketDetails('${s.id}')" 
                class="text-blue-600 hover:text-blue-800 text-sm font-medium self-start"
              >
                View Details
              </button>
              <span class="text-xs text-gray-400">
                ${(()=>{let o=0;if(s.admin_replies)if(Array.isArray(s.admin_replies))o=s.admin_replies.length;else if(typeof s.admin_replies=="string")try{const n=JSON.parse(s.admin_replies);o=Array.isArray(n)?n.length:1}catch{o=1}else typeof s.admin_replies=="object"&&(o=1);return o>0?`${o} admin ${o===1?"reply":"replies"}`:"No admin replies yet"})()}
              </span>
            </div>
            
            <div id="ticket-details-${s.id}" class="hidden mt-4 overflow-hidden">
              ${u}
            </div>
          </div>
        `}).join("")}catch(t){alert("Error loading tickets: "+t.message)}}function N(t){return{low:"bg-green-100 text-green-800",medium:"bg-yellow-100 text-yellow-800",high:"bg-orange-100 text-orange-800",urgent:"bg-red-100 text-red-800"}[t]||"bg-gray-100 text-gray-800"}function B(t){return{open:"bg-blue-100 text-blue-800",in_progress:"bg-yellow-100 text-yellow-800",resolved:"bg-green-100 text-green-800",closed:"bg-gray-100 text-gray-800"}[t]||"bg-gray-100 text-gray-800"}function A(t){const e=document.getElementById(`ticket-details-${t}`);e&&(e.classList.contains("hidden")?(e.classList.remove("hidden"),e.style.display="block"):(e.classList.add("hidden"),e.style.display="none"))}window.checkSupabaseStatus=()=>{console.log("🔍 Supabase Status Check:"),console.log("- supabaseReady:",p),console.log("- supabase client:",!!i),console.log("- window.supabase:",!!window.supabase),console.log("- window.supabase.auth:",!!(window.supabase&&window.supabase.auth)),console.log("- window.supabase.createClient:",!!(window.supabase&&typeof window.supabase.createClient=="function")),i&&i.auth?console.log("✅ Supabase is ready and functional"):console.log("❌ Supabase is not ready")};window.openTicketModal=M;window.openMyTicketsModal=C;window.closeTicketModal=g;window.closeMyTicketsModal=D;window.viewTicketDetails=A;function P(){const t=document.getElementById("ticketForm"),e=document.getElementById("submitTicketBtn");t&&e&&t.addEventListener("submit",async function(a){a.preventDefault();const l=document.getElementById("ticketSubject").value,c=document.getElementById("ticketPriority").value,d=document.getElementById("ticketDescription").value;if(!l||!c||!d){alert("Please fill in all required fields");return}const s=e.textContent;e.disabled=!0,e.textContent="Creating Ticket...";try{if(console.log("🔄 Creating ticket..."),!await f()){console.error("❌ Supabase not ready"),alert("Database is still loading. Please wait a moment and try again, or refresh the page.");return}if(!i||!i.auth){console.error("❌ Supabase client or auth not available"),alert("Database connection error. Please refresh the page and try again.");return}try{const{data:{session:m}}=await i.auth.getSession();console.log("🔍 Supabase connection test:",m?"Connected":"No session")}catch(m){console.error("❌ Supabase connection test failed:",m),alert("Database connection test failed. Please refresh the page and try again.");return}const{data:{user:o},error:n}=await i.auth.getUser();if(n||!o){console.error("❌ Supabase auth error:",n),console.log("🔍 Auth error details:",{error:n,message:n?.message,status:n?.status});const m=window.globalAuthManager||window.simpleAuthManager;if(m&&m.getCurrentUser){const S=m.getCurrentUser();if(S){console.log("🔄 User found in global auth manager but not in Supabase"),console.log("👤 Global user:",S),alert("Please login again to create a support ticket. Your session needs to be refreshed."),window.location.href="/login";return}}alert(`Please login to create a support ticket. You need to be authenticated through Supabase.

Error: `+(n?.message||"Unknown error"));return}console.log("👤 User authenticated via Supabase:",o.email),console.log("👤 User ID:",o.id),console.log("👤 User metadata:",o.user_metadata);const{data:{session:b},error:x}=await i.auth.getSession();if(x&&console.error("❌ Session error:",x),console.log("🔐 Current session:",b?"Valid":"No session"),!b){console.error("❌ No valid session found"),alert("Your session has expired. Please login again to create a support ticket.");return}const v={ticket_number:`TKT-${Date.now()}`,user_id:o.id,user_email:o.email,customer_name:o.user_metadata?.full_name||o.email?.split("@")[0]||"User",customer_email:o.email,subject:l,description:d,priority:c,status:"open"};console.log("📝 Creating ticket with data:",v);const{data:w,error:h}=await i.from("support_tickets").insert([v]).select().single();if(h){console.error("❌ Database error:",h),alert("Error creating ticket: "+h.message+`

Please check the console for more details.`);return}console.log("✅ Ticket created successfully:",w),alert(`Ticket created successfully! Ticket #${w.ticket_number}`),g(),j(`Ticket #${w.ticket_number} created successfully!`)}catch(u){console.error("❌ Unexpected error:",u),alert(`An unexpected error occurred. Please try again.

Error: `+u.message)}finally{e.disabled=!1,e.textContent=s}});const r=document.getElementById("ticketModal");r&&r.addEventListener("click",function(a){a.target===this&&g()})}function j(t){const e=document.createElement("div");e.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50",e.innerHTML=`
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>${t}</span>
      </div>
    `,document.body.appendChild(e),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},3e3)}window.openTicketModal=M;window.closeTicketModal=g;window.openMyTicketsModal=C;window.closeMyTicketsModal=D;document.addEventListener("DOMContentLoaded",P);
