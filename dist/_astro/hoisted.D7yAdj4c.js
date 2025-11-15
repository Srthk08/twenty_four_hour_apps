import"./ProductDialog.astro_astro_type_script_index_0_lang.CpUg5vNK.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.Bf11ZY-L.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const U="https://lmrrdcaavwwletcjcpqv.supabase.co",C="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";function f(t){try{const e=new Date(t);if(isNaN(e.getTime()))return"Invalid Date";const n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0"),a=e.getFullYear();return`${n}/${s}/${a}`}catch(e){return console.error("Error formatting date:",e),"Invalid Date"}}let c=null,d=[],p=[],M=!1,l=1,g=10,i=1;function _(){return new Promise(t=>{window.supabase?(c=window.supabase.createClient(U,C),t(c)):setTimeout(()=>_().then(t),100)})}async function L(){console.log("🚀 Initializing users page..."),console.log("🔍 Supabase available:",!!window.supabase),console.log("🔍 Current users before load:",d.length),await v(),k()}async function v(){try{console.log("🔄 Loading ALL users from Supabase..."),c||(console.log("⏳ Waiting for Supabase to load..."),await _()),console.log("✅ Supabase client ready:",!!c);const{data:{user:t},error:e}=await c.auth.getUser();if(e||!t){console.error("❌ Not authenticated:",e);return}console.log("✅ Authenticated as:",t.email);const{count:n,error:s}=await c.from("profiles").select("*",{count:"exact",head:!0});s?console.error("❌ Error checking user count:",s):console.log("📊 Total users in database:",n);const{data:a,error:o}=await c.from("profiles").select("*").order("created_at",{ascending:!1});if(o){console.error("❌ Error loading users:",o),console.error("Error details:",{message:o.message,details:o.details,hint:o.hint,code:o.code});return}console.log("✅ Raw users data from Supabase:",a),d=(a||[]).map(r=>({id:r.id,full_name:r.full_name||"No Name",email:r.email||"No Email",phone:r.phone||"",company_name:r.company_name||"",role:r.role||"customer",status:r.status||"active",created_at:r.created_at,updated_at:r.updated_at,last_login_at:r.last_login_at||null})),p=[...d],l=1,console.log("✅ Processed users data:",d),console.log("📊 Total users found:",d.length),m(),B()}catch(t){console.error("❌ Error loading users:",t)}}function m(){const t=document.getElementById("users-tbody");if(!t)return;if(p.length===0){t.innerHTML=`
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-gray-500">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              <p class="text-lg font-medium text-gray-900 mb-2">No users found</p>
              <p class="text-gray-500">Try adjusting your search or filters</p>
            </div>
          </td>
        </tr>
      `,h();return}i=Math.ceil(p.length/g);const e=(l-1)*g,n=e+g,s=p.slice(e,n);t.innerHTML=s.map(a=>`
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <span class="text-sm font-medium text-primary-600">${a.full_name?a.full_name.charAt(0).toUpperCase():"U"}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">${a.full_name||"No Name"}</div>
              <div class="text-sm text-gray-500">${a.email}</div>
              ${a.company_name?`<div class="text-xs text-gray-400">${a.company_name}</div>`:""}
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${$(a.role)}">
            ${a.role}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${N(a.status)}">
            ${a.status.replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${a.last_login_at?f(a.last_login_at):"Never"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${a.created_at?f(a.created_at):"Invalid Date"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div class="flex space-x-2">
            <button 
              onclick="viewUser('${a.id}')"
              class="text-primary-600 hover:text-primary-900"
            >
              View
            </button>
          </div>
        </td>
      </tr>
    `).join(""),h()}function B(){const t=document.getElementById("users-count");t&&(t.textContent=`Showing ${p.length} of ${d.length} users`)}function h(){const t=document.getElementById("page-numbers"),e=document.getElementById("prev-page"),n=document.getElementById("next-page"),s=document.getElementById("page-numbers-mobile"),a=document.getElementById("prev-page-mobile"),o=document.getElementById("next-page-mobile");t&&e&&n&&E(t,e,n),s&&a&&o&&E(s,a,o)}function E(t,e,n){e.disabled=l===1,e.classList.toggle("opacity-50",l===1),e.classList.toggle("cursor-not-allowed",l===1),n.disabled=l===i||i===0,n.classList.toggle("opacity-50",l===i||i===0),n.classList.toggle("cursor-not-allowed",l===i||i===0);let s="";const a=5;let o=Math.max(1,l-Math.floor(a/2)),r=Math.min(i,o+a-1);r-o+1<a&&(o=Math.max(1,r-a+1));for(let u=o;u<=r;u++)s+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${u===l?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${u})"
        >
          ${u}
        </button>
      `;t.innerHTML=s}function S(t){t<1||t>i||(l=t,m())}function x(){l<i&&(l++,m())}function b(){l>1&&(l--,m())}function A(){const t=document.getElementById("items-per-page"),e=document.getElementById("items-per-page-mobile");let n=g;t&&(n=parseInt(t.value)),e&&(n=parseInt(e.value)),t&&(t.value=n),e&&(e.value=n),g=n,l=1,m()}function $(t){return{customer:"bg-blue-100 text-blue-800",admin:"bg-red-100 text-red-800",developer:"bg-purple-100 text-purple-800",support:"bg-green-100 text-green-800",menu_operator:"bg-orange-100 text-orange-800"}[t]||"bg-gray-100 text-gray-800"}function N(t){return{active:"bg-green-100 text-green-800",inactive:"bg-gray-100 text-gray-800",suspended:"bg-red-100 text-red-800",pending_verification:"bg-yellow-100 text-yellow-800"}[t]||"bg-gray-100 text-gray-800"}function y(){const t=document.getElementById("search")?.value?.toLowerCase()||"",e=document.getElementById("role-filter")?.value||"",n=document.getElementById("status-filter")?.value||"";p=d.filter(s=>{const a=s.full_name||"",o=s.email||"",r=s.company_name||"",u=a.toLowerCase().includes(t)||o.toLowerCase().includes(t)||r&&r.toLowerCase().includes(t),w=!e||s.role===e,P=!n||s.status===n;return u&&w&&P}),m(),B()}async function D(t){try{console.log("Viewing user details for:",t);const{data:e,error:n}=await c.from("profiles").select("*").eq("id",t).single();if(n){console.error("Error loading user details:",n);return}console.log("✅ User data retrieved:",e),console.log("📊 User fields:",{full_name:e.full_name,company_name:e.company_name,created_at:e.created_at,updated_at:e.updated_at,last_login_at:e.last_login_at,login_count:e.login_count});const s=document.getElementById("user-details-modal"),a=document.getElementById("details-modal-title"),o=document.getElementById("user-details-content");s&&a&&o&&(a.textContent=`User Details - ${e.full_name||"No Name"}`,o.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- User Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">User Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Full Name:</span>
                <span class="text-sm font-medium text-gray-900">${e.full_name||"Not provided"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Email:</span>
                <span class="text-sm font-medium text-gray-900">${e.email}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Phone:</span>
                <span class="text-sm font-medium text-gray-900">${e.phone||"Not provided"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Company:</span>
                <span class="text-sm font-medium text-gray-900">${e.company_name||"Not provided"}</span>
              </div>
            </div>
          </div>

          <!-- Account Information -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Account Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Role:</span>
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${$(e.role)}">
                  ${e.role}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Status:</span>
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${N(e.status)}">
                  ${e.status.replace("_"," ")}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Login Count:</span>
                <span class="text-sm font-medium text-gray-900">${e.login_count||e.loginCount||"0"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Last Login:</span>
                <span class="text-sm font-medium text-gray-900">${e.last_login_at||e.lastLoginAt?f(e.last_login_at||e.lastLoginAt):"Never"}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Information -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Activity Information</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Created:</span>
              <span class="text-sm font-medium text-gray-900">${e.created_at||e.createdAt?f(e.created_at||e.createdAt):"Not available"}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Last Updated:</span>
              <span class="text-sm font-medium text-gray-900">${e.updated_at||e.updatedAt?new Date(e.updated_at||e.updatedAt).toLocaleString():"Not available"}</span>
            </div>
          </div>
        </div>
      `,document.body.style.overflow="hidden",s.classList.remove("hidden"))}catch(e){console.error("Error viewing user details:",e)}}function I(){document.getElementById("user-modal")?.classList.add("hidden"),document.body.style.overflow=""}function T(t){t.preventDefault();const e=new FormData(t.target),n=document.getElementById("user-id").value,s={fullName:e.get("full-name"),email:e.get("email"),phone:e.get("phone"),companyName:e.get("company-name"),role:e.get("role"),status:e.get("status")};if(!s.fullName||!s.email){alert("Please fill in all required fields");return}{const a=e.get("password"),o=e.get("confirm-password");if(!a||a!==o){alert("Passwords do not match");return}}try{M||alert("User creation not implemented in this demo")}catch(a){alert("Failed to save user"),console.error("Error saving user:",a)}}function k(){document.getElementById("search")?.addEventListener("input",y),document.getElementById("role-filter")?.addEventListener("change",y),document.getElementById("status-filter")?.addEventListener("change",y),document.getElementById("prev-page")?.addEventListener("click",b),document.getElementById("next-page")?.addEventListener("click",x),document.getElementById("refresh-users")?.addEventListener("click",v),document.getElementById("prev-page-mobile")?.addEventListener("click",b),document.getElementById("next-page-mobile")?.addEventListener("click",x),document.getElementById("refresh-users-mobile")?.addEventListener("click",v),document.getElementById("user-form")?.addEventListener("submit",T),document.getElementById("close-modal")?.addEventListener("click",I),document.getElementById("cancel-btn")?.addEventListener("click",I),document.getElementById("close-details-modal")?.addEventListener("click",()=>{document.getElementById("user-details-modal")?.classList.add("hidden"),document.body.style.overflow=""}),document.getElementById("user-modal")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.classList.add("hidden"),document.body.style.overflow="")}),document.getElementById("user-details-modal")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.classList.add("hidden"),document.body.style.overflow="")})}window.goToPage=S;window.nextPage=x;window.prevPage=b;window.changeItemsPerPage=A;function j(){const t=document.getElementById("items-per-page"),e=document.getElementById("items-per-page-mobile");t&&e&&(e.addEventListener("change",n=>{n.preventDefault(),t.value=e.value,g=parseInt(e.value),l=1,m()}),t.addEventListener("change",n=>{n.preventDefault(),e.value=t.value,g=parseInt(t.value),l=1,m()}))}document.addEventListener("DOMContentLoaded",async()=>{console.log("📄 Users page DOM loaded, initializing..."),console.log("🔍 Supabase available:",!!window.supabase),console.log("🔍 Current users before load:",d.length),await L(),j()});setTimeout(async()=>{d.length===0&&(console.log("⏰ Retrying user load after delay..."),await L())},2e3);window.viewUser=D;
