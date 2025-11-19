let i=null,p=!1;const y=()=>{try{return window.supabase&&window.supabase.auth?(i=window.supabase,p=!0,console.log("✅ Using global Supabase client from Layout"),!0):window.supabase&&typeof window.supabase.createClient=="function"?(i=window.supabase.createClient("https://lmrrdcaavwwletcjcpqv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"),p=!0,console.log("✅ Supabase client created directly"),!0):(console.log("⏳ Supabase not ready yet"),!1)}catch(t){return console.error("❌ Error initializing Supabase:",t),!1}},f=async(t=10,e=500)=>{for(let s=0;s<t;s++){if(p&&i)return console.log("✅ Supabase is ready"),!0;console.log(`⏳ Waiting for Supabase... (${s+1}/${t})`),await new Promise(a=>setTimeout(a,e)),y()}return console.error("❌ Supabase failed to initialize after retries"),!1};y();document.addEventListener("DOMContentLoaded",async()=>{p||y(),await k()});let E=0;const I=25,T=setInterval(()=>{p||E>=I?(clearInterval(T),p?console.log("✅ Supabase ready after retries"):console.error("❌ Supabase failed to initialize after all retries")):(E++,y())},200);async function k(){try{if(!await f()){console.log("⏳ Supabase not ready yet, will retry..."),setTimeout(k,1e3);return}const{data:{user:e},error:s}=await i.auth.getUser();if(s||!e){console.log("❌ No Supabase authentication found");const a=window.globalAuthManager||window.simpleAuthManager;if(a&&a.getCurrentUser){const l=a.getCurrentUser();if(l){console.log("🔄 User found in global auth manager, attempting to sync with Supabase..."),console.log("👤 Global user:",l),_(l.email);return}}console.log("ℹ️ No user found in any authentication system")}else console.log("✅ User authenticated via Supabase:",e.email),$(e.email)}catch(t){console.error("❌ Error checking authentication:",t)}}function _(t){const e=document.querySelector(".min-h-screen");if(e){const s=document.createElement("div");s.className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50 max-w-md",s.innerHTML=`
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
      `,e.appendChild(s),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},15e3)}}function $(t){document.querySelectorAll("[data-user-email]").forEach(a=>{a.textContent=t});const s=document.querySelector("h1");if(s&&!s.querySelector(".user-email")){const a=document.createElement("span");a.className="user-email text-sm font-normal text-gray-600 ml-2",a.textContent=`(Logged in as: ${t})`,s.appendChild(a)}}function M(){const t=document.getElementById("ticketModal");if(t){const e=window.scrollY;document.body.style.position="fixed",document.body.style.top=`-${e}px`,document.body.style.width="100%",document.body.style.overflow="hidden",document.body.setAttribute("data-scroll-y",e.toString()),t.classList.remove("hidden");const s=document.getElementById("userEmailDisplay");s&&(s.textContent="Loading..."),L()}}async function L(){try{if(!await f()){console.error("❌ Supabase not ready, cannot pre-fill form");const a=document.getElementById("userEmailDisplay");a&&(a.textContent="Database not ready");return}if(!i||!i.auth){console.error("❌ Supabase client or auth not available");const a=document.getElementById("userEmailDisplay");a&&(a.textContent="Authentication error");return}console.log("🔄 Getting user data...");const{data:{user:e},error:s}=await i.auth.getUser();if(s||!e){console.log("❌ No Supabase auth, checking global auth manager...");const a=window.globalAuthManager||window.simpleAuthManager;if(a&&a.getCurrentUser){const c=a.getCurrentUser();if(c){console.log("✅ User found in global auth manager:",c.email);const d=document.getElementById("userEmailDisplay");d&&(d.textContent=c.email||"Not available",d.className="text-yellow-600 font-medium");return}}console.log("❌ No user found in any auth system");const l=document.getElementById("userEmailDisplay");l&&(l.textContent="Not logged in");return}if(e){console.log("✅ User found via Supabase:",e.email);const a=document.getElementById("userEmailDisplay");a&&(a.textContent=e.email||"Not available",a.className="text-green-600 font-medium")}}catch(t){console.error("❌ Error pre-filling form:",t);const e=document.getElementById("userEmailDisplay");e&&(e.textContent="Error loading email")}}function g(){const t=document.getElementById("ticketModal"),e=document.getElementById("ticketForm");if(t){t.classList.add("hidden");const s=document.body.getAttribute("data-scroll-y");document.body.style.position="",document.body.style.top="",document.body.style.width="",document.body.style.overflow="",s&&(window.scrollTo(0,parseInt(s)),document.body.removeAttribute("data-scroll-y")),e&&e.reset()}}async function C(){const t=document.getElementById("myTicketsModal");t&&(document.body.style.overflow="hidden",t.classList.remove("hidden"),await U())}function D(){const t=document.getElementById("myTicketsModal");t&&(t.classList.add("hidden"),document.body.style.overflow="")}async function U(){try{if(console.log("🔄 Loading tickets..."),!await f()){console.error("❌ Supabase not ready"),alert("Database connection error. Please refresh the page and try again.");return}if(!i||!i.auth){console.error("❌ Supabase client or auth not available"),alert("Database connection error. Please refresh the page and try again.");return}const{data:{user:e},error:s}=await i.auth.getUser();if(s||!e){console.error("❌ Supabase auth error:",s),alert("Please login to view your tickets. You need to be authenticated through Supabase.");return}console.log("👤 User authenticated via Supabase:",e.email);const{data:a,error:l}=await i.from("support_tickets").select("*").or(`user_email.eq.${e.email},customer_email.eq.${e.email}`).order("created_at",{ascending:!1});if(l){console.error("❌ Database error:",l),alert("Error loading tickets: "+l.message);return}console.log("✅ Tickets loaded:",a?.length||0);const c=document.getElementById("my-tickets-list"),d=document.getElementById("no-tickets");if(!a||a.length===0){c.classList.add("hidden"),d.classList.remove("hidden");return}d.classList.add("hidden"),c.classList.remove("hidden"),c.innerHTML=a.map(o=>{let u="";if(o.admin_replies){let n=[];if(Array.isArray(o.admin_replies))n=o.admin_replies;else if(typeof o.admin_replies=="string")try{n=JSON.parse(o.admin_replies)}catch{n=[{message:o.admin_replies,timestamp:new Date().toISOString()}]}else typeof o.admin_replies=="object"&&(n=[o.admin_replies]);n&&n.length>0?u=`
              <div class="mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg overflow-hidden">
                <h5 class="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Admin Replies (${n.length}):</h5>
                ${n.map((r,b)=>`
                  <div class="mb-2 sm:mb-3 p-2 sm:p-3 bg-white rounded border-l-4 border-blue-500 overflow-hidden">
                    <div class="flex items-start justify-between">
                      <div class="flex-1 min-w-0">
                        <p class="text-xs sm:text-sm text-gray-700 break-words overflow-wrap-anywhere whitespace-pre-wrap break-all">${r.message||r.reply||r||"No message"}</p>
                        ${r.admin_name?`<p class="text-xs text-blue-600 mt-1 break-words overflow-wrap-anywhere">By: ${r.admin_name}</p>`:""}
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2 break-words overflow-wrap-anywhere">
                      ${r.timestamp?new Date(r.timestamp).toLocaleString():r.created_at?new Date(r.created_at).toLocaleString():"Recently"}
                    </p>
                  </div>
                `).join("")}
              </div>
            `:u=`
              <div class="mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p class="text-xs sm:text-sm text-gray-500">No admin replies yet</p>
              </div>
            `}else u=`
            <div class="mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <p class="text-xs sm:text-sm text-gray-500">No admin replies yet</p>
            </div>
          `;return`
          <div class="border border-gray-200 rounded-lg p-3 sm:p-4 overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
              <div class="flex items-center flex-wrap gap-2">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${N(o.priority)}">
                  ${o.priority}
                </span>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${A(o.status)}">
                  ${o.status.replace("_"," ")}
                </span>
              </div>
              <span class="text-xs sm:text-sm text-gray-500">${new Date(o.created_at).toLocaleDateString()}</span>
            </div>
            
            <h4 class="font-semibold text-gray-900 mb-2 break-words overflow-wrap-anywhere">${o.subject}</h4>
            <p class="text-gray-600 text-sm mb-2 break-words overflow-wrap-anywhere">${o.description.length>100?o.description.substring(0,100)+"...":o.description}</p>
            <p class="text-gray-500 text-xs mb-2 break-words overflow-wrap-anywhere">Email: ${o.user_email||o.customer_email||"Not provided"}</p>
            <p class="text-gray-400 text-xs mb-3 break-words overflow-wrap-anywhere">Ticket #: ${o.ticket_number}</p>
            
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
              <button 
                onclick="viewTicketDetails('${o.id}')" 
                class="text-blue-600 hover:text-blue-800 text-sm font-medium self-start"
              >
                View Details
              </button>
              <span class="text-xs text-gray-400">
                ${(()=>{let n=0;if(o.admin_replies)if(Array.isArray(o.admin_replies))n=o.admin_replies.length;else if(typeof o.admin_replies=="string")try{const r=JSON.parse(o.admin_replies);n=Array.isArray(r)?r.length:1}catch{n=1}else typeof o.admin_replies=="object"&&(n=1);return n>0?`${n} admin ${n===1?"reply":"replies"}`:"No admin replies yet"})()}
              </span>
            </div>
            
            <div id="ticket-details-${o.id}" class="hidden mt-4 overflow-hidden">
              ${u}
            </div>
          </div>
        `}).join("")}catch(t){alert("Error loading tickets: "+t.message)}}function N(t){return{low:"bg-green-100 text-green-800",medium:"bg-yellow-100 text-yellow-800",high:"bg-orange-100 text-orange-800",urgent:"bg-red-100 text-red-800"}[t]||"bg-gray-100 text-gray-800"}function A(t){return{open:"bg-blue-100 text-blue-800",in_progress:"bg-yellow-100 text-yellow-800",resolved:"bg-green-100 text-green-800",closed:"bg-gray-100 text-gray-800"}[t]||"bg-gray-100 text-gray-800"}function B(t){const e=document.getElementById(`ticket-details-${t}`);e&&(e.classList.contains("hidden")?(e.classList.remove("hidden"),e.style.display="block"):(e.classList.add("hidden"),e.style.display="none"))}window.checkSupabaseStatus=()=>{console.log("🔍 Supabase Status Check:"),console.log("- supabaseReady:",p),console.log("- supabase client:",!!i),console.log("- window.supabase:",!!window.supabase),console.log("- window.supabase.auth:",!!(window.supabase&&window.supabase.auth)),console.log("- window.supabase.createClient:",!!(window.supabase&&typeof window.supabase.createClient=="function")),i&&i.auth?console.log("✅ Supabase is ready and functional"):console.log("❌ Supabase is not ready")};window.openTicketModal=M;window.openMyTicketsModal=C;window.closeTicketModal=g;window.closeMyTicketsModal=D;window.viewTicketDetails=B;function P(){const t=document.getElementById("ticketForm"),e=document.getElementById("submitTicketBtn");t&&e&&t.addEventListener("submit",async function(a){a.preventDefault();const l=document.getElementById("ticketSubject").value,c=document.getElementById("ticketPriority").value,d=document.getElementById("ticketDescription").value;if(!l||!c||!d){alert("Please fill in all required fields");return}const o=e.textContent;e.disabled=!0,e.textContent="Creating Ticket...";try{if(console.log("🔄 Creating ticket..."),!await f()){console.error("❌ Supabase not ready"),alert("Database is still loading. Please wait a moment and try again, or refresh the page.");return}if(!i||!i.auth){console.error("❌ Supabase client or auth not available"),alert("Database connection error. Please refresh the page and try again.");return}try{const{data:{session:m}}=await i.auth.getSession();console.log("🔍 Supabase connection test:",m?"Connected":"No session")}catch(m){console.error("❌ Supabase connection test failed:",m),alert("Database connection test failed. Please refresh the page and try again.");return}const{data:{user:n},error:r}=await i.auth.getUser();if(r||!n){console.error("❌ Supabase auth error:",r),console.log("🔍 Auth error details:",{error:r,message:r?.message,status:r?.status});const m=window.globalAuthManager||window.simpleAuthManager;if(m&&m.getCurrentUser){const S=m.getCurrentUser();if(S){console.log("🔄 User found in global auth manager but not in Supabase"),console.log("👤 Global user:",S),alert("Please login again to create a support ticket. Your session needs to be refreshed."),window.location.href="/login";return}}alert(`Please login to create a support ticket. You need to be authenticated through Supabase.

Error: `+(r?.message||"Unknown error"));return}console.log("👤 User authenticated via Supabase:",n.email),console.log("👤 User ID:",n.id),console.log("👤 User metadata:",n.user_metadata);const{data:{session:b},error:x}=await i.auth.getSession();if(x&&console.error("❌ Session error:",x),console.log("🔐 Current session:",b?"Valid":"No session"),!b){console.error("❌ No valid session found"),alert("Your session has expired. Please login again to create a support ticket.");return}const v={ticket_number:`TKT-${Date.now()}`,user_id:n.id,user_email:n.email,customer_name:n.user_metadata?.full_name||n.email?.split("@")[0]||"User",customer_email:n.email,subject:l,description:d,priority:c,status:"open"};console.log("📝 Creating ticket with data:",v);const{data:w,error:h}=await i.from("support_tickets").insert([v]).select().single();if(h){console.error("❌ Database error:",h),alert("Error creating ticket: "+h.message+`

Please check the console for more details.`);return}console.log("✅ Ticket created successfully:",w),alert(`Ticket created successfully! Ticket #${w.ticket_number}`),g(),j(`Ticket #${w.ticket_number} created successfully!`)}catch(u){console.error("❌ Unexpected error:",u),alert(`An unexpected error occurred. Please try again.

Error: `+u.message)}finally{e.disabled=!1,e.textContent=o}});const s=document.getElementById("ticketModal");s&&s.addEventListener("click",function(a){a.target===this&&g()})}function j(t){const e=document.createElement("div");e.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50",e.innerHTML=`
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>${t}</span>
      </div>
    `,document.body.appendChild(e),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},3e3)}window.openTicketModal=M;window.closeTicketModal=g;window.openMyTicketsModal=C;window.closeMyTicketsModal=D;document.addEventListener("DOMContentLoaded",P);
