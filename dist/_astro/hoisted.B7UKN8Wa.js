import"./Toast.astro_astro_type_script_index_0_lang.DNmGtDky.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./AdminLayout.astro_astro_type_script_index_3_lang.LJYybVYx.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";const $="https://lmrrdcaavwwletcjcpqv.supabase.co",N="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";let c=null,d=[],u=[],C=!1,l=1,p=10,i=1;function w(){return new Promise(t=>{window.supabase?(c=window.supabase.createClient($,N),t(c)):setTimeout(()=>w().then(t),100)})}async function h(){console.log("🚀 Initializing users page..."),console.log("🔍 Supabase available:",!!window.supabase),console.log("🔍 Current users before load:",d.length),await b(),T()}async function b(){try{console.log("🔄 Loading ALL users from Supabase..."),c||(console.log("⏳ Waiting for Supabase to load..."),await w()),console.log("✅ Supabase client ready:",!!c);const{data:{user:t},error:e}=await c.auth.getUser();if(e||!t){console.error("❌ Not authenticated:",e);return}console.log("✅ Authenticated as:",t.email);const{count:r,error:s}=await c.from("profiles").select("*",{count:"exact",head:!0});s?console.error("❌ Error checking user count:",s):console.log("📊 Total users in database:",r);const{data:a,error:n}=await c.from("profiles").select("*").order("created_at",{ascending:!1});if(n){console.error("❌ Error loading users:",n),console.error("Error details:",{message:n.message,details:n.details,hint:n.hint,code:n.code});return}console.log("✅ Raw users data from Supabase:",a),d=(a||[]).map(o=>({id:o.id,full_name:o.full_name||"No Name",email:o.email||"No Email",phone:o.phone||"",company_name:o.company_name||"",role:o.role||"customer",status:o.status||"active",created_at:o.created_at,updated_at:o.updated_at,last_login_at:o.last_login_at||null})),u=[...d],l=1,console.log("✅ Processed users data:",d),console.log("📊 Total users found:",d.length),g(),E()}catch(t){console.error("❌ Error loading users:",t)}}function g(){const t=document.getElementById("users-tbody");if(!t)return;if(u.length===0){t.innerHTML=`
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
      `,x();return}i=Math.ceil(u.length/p);const e=(l-1)*p,r=e+p,s=u.slice(e,r);t.innerHTML=s.map(a=>`
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
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${B(a.role)}">
            ${a.role}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${U(a.status)}">
            ${a.status.replace("_"," ")}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${a.last_login_at?new Date(a.last_login_at).toLocaleDateString():"Never"}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${a.created_at?new Date(a.created_at).toLocaleDateString():"Invalid Date"}
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
    `).join(""),x()}function E(){const t=document.getElementById("users-count");t&&(t.textContent=`Showing ${u.length} of ${d.length} users`)}function x(){const t=document.getElementById("page-numbers"),e=document.getElementById("prev-page"),r=document.getElementById("next-page");if(!t||!e||!r)return;e.disabled=l===1,e.classList.toggle("opacity-50",l===1),e.classList.toggle("cursor-not-allowed",l===1),r.disabled=l===i||i===0,r.classList.toggle("opacity-50",l===i||i===0),r.classList.toggle("cursor-not-allowed",l===i||i===0);let s="";const a=5;let n=Math.max(1,l-Math.floor(a/2)),o=Math.min(i,n+a-1);o-n+1<a&&(n=Math.max(1,o-a+1));for(let m=n;m<=o;m++)s+=`
        <button 
          class="px-3 py-1 text-sm border rounded-md transition-colors ${m===l?"bg-primary-50 text-primary-700 border-primary-200":"text-gray-700 bg-white border-gray-300 hover:bg-gray-50"}"
          onclick="goToPage(${m})"
        >
          ${m}
        </button>
      `;t.innerHTML=s}function S(t){t<1||t>i||(l=t,g())}function I(){l<i&&(l++,g())}function _(){l>1&&(l--,g())}function L(){const t=document.getElementById("items-per-page");t&&(p=parseInt(t.value),l=1,g())}function B(t){return{customer:"bg-blue-100 text-blue-800",admin:"bg-red-100 text-red-800",developer:"bg-purple-100 text-purple-800",support:"bg-green-100 text-green-800"}[t]||"bg-gray-100 text-gray-800"}function U(t){return{active:"bg-green-100 text-green-800",inactive:"bg-gray-100 text-gray-800",suspended:"bg-red-100 text-red-800",pending_verification:"bg-yellow-100 text-yellow-800"}[t]||"bg-gray-100 text-gray-800"}function f(){const t=document.getElementById("search")?.value?.toLowerCase()||"",e=document.getElementById("role-filter")?.value||"",r=document.getElementById("status-filter")?.value||"";u=d.filter(s=>{const a=s.full_name||"",n=s.email||"",o=s.company_name||"",m=a.toLowerCase().includes(t)||n.toLowerCase().includes(t)||o&&o.toLowerCase().includes(t),y=!e||s.role===e,P=!r||s.status===r;return m&&y&&P}),g(),E()}async function A(t){try{console.log("Viewing user details for:",t);const{data:e,error:r}=await c.from("profiles").select("*").eq("id",t).single();if(r){console.error("Error loading user details:",r);return}console.log("✅ User data retrieved:",e),console.log("📊 User fields:",{full_name:e.full_name,company_name:e.company_name,created_at:e.created_at,updated_at:e.updated_at,last_login_at:e.last_login_at,login_count:e.login_count});const s=document.getElementById("user-details-modal"),a=document.getElementById("details-modal-title"),n=document.getElementById("user-details-content");s&&a&&n&&(a.textContent=`User Details - ${e.full_name||"No Name"}`,n.innerHTML=`
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
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${B(e.role)}">
                  ${e.role}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Status:</span>
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${U(e.status)}">
                  ${e.status.replace("_"," ")}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Login Count:</span>
                <span class="text-sm font-medium text-gray-900">${e.login_count||e.loginCount||"0"}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Last Login:</span>
                <span class="text-sm font-medium text-gray-900">${e.last_login_at||e.lastLoginAt?new Date(e.last_login_at||e.lastLoginAt).toLocaleString():"Never"}</span>
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
              <span class="text-sm font-medium text-gray-900">${e.created_at||e.createdAt?new Date(e.created_at||e.createdAt).toLocaleString():"Not available"}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Last Updated:</span>
              <span class="text-sm font-medium text-gray-900">${e.updated_at||e.updatedAt?new Date(e.updated_at||e.updatedAt).toLocaleString():"Not available"}</span>
            </div>
          </div>
        </div>
      `,s.classList.remove("hidden"))}catch(e){console.error("Error viewing user details:",e)}}function v(){document.getElementById("user-modal")?.classList.add("hidden")}function M(t){t.preventDefault();const e=new FormData(t.target),r=document.getElementById("user-id").value,s={fullName:e.get("full-name"),email:e.get("email"),phone:e.get("phone"),companyName:e.get("company-name"),role:e.get("role"),status:e.get("status")};if(!s.fullName||!s.email){alert("Please fill in all required fields");return}{const a=e.get("password"),n=e.get("confirm-password");if(!a||a!==n){alert("Passwords do not match");return}}try{C||alert("User creation not implemented in this demo")}catch(a){alert("Failed to save user"),console.error("Error saving user:",a)}}function T(){document.getElementById("search")?.addEventListener("input",f),document.getElementById("role-filter")?.addEventListener("change",f),document.getElementById("status-filter")?.addEventListener("change",f),document.getElementById("items-per-page")?.addEventListener("change",L),document.getElementById("prev-page")?.addEventListener("click",_),document.getElementById("next-page")?.addEventListener("click",I),document.getElementById("refresh-users")?.addEventListener("click",b),document.getElementById("user-form")?.addEventListener("submit",M),document.getElementById("close-modal")?.addEventListener("click",v),document.getElementById("cancel-btn")?.addEventListener("click",v),document.getElementById("close-details-modal")?.addEventListener("click",()=>{document.getElementById("user-details-modal")?.classList.add("hidden")}),document.getElementById("user-modal")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.classList.add("hidden")}),document.getElementById("user-details-modal")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.classList.add("hidden")})}window.goToPage=S;window.nextPage=I;window.prevPage=_;window.changeItemsPerPage=L;document.addEventListener("DOMContentLoaded",async()=>{console.log("📄 Users page DOM loaded, initializing..."),console.log("🔍 Supabase available:",!!window.supabase),console.log("🔍 Current users before load:",d.length),await h()});setTimeout(async()=>{d.length===0&&(console.log("⏰ Retrying user load after delay..."),await h())},2e3);window.viewUser=A;
