import{c as d}from"./index.BFAZBQoJ.js";import"./ProductDialog.astro_astro_type_script_index_0_lang.BY4S3r1x.js";import"https://unpkg.com/@supabase/supabase-js@2";const h="YOUR_SUPABASE_URL",w="YOUR_SUPABASE_ANON_KEY",s=d(h,w);let i=null;document.addEventListener("DOMContentLoaded",async()=>{await v(),await x(),_()});async function v(){try{const{data:{user:t}}=await s.auth.getUser();if(!t){window.location.href="/login";return}i=t;const{data:e,error:o}=await s.from("profiles").select("*").eq("id",t.id).single();if(o){console.error("Error loading profile:",o);return}if(console.log("🔍 Profile loaded:",e),console.log("🔍 Role value from database:",JSON.stringify(e.role)),!e.role||e.role.toLowerCase().trim()!=="menu_operator"){console.log("User does not have menu_operator role. Role:",e.role),e.role==="admin"?window.location.href="/admin":window.location.href="/dashboard";return}}catch(t){console.error("Error loading user profile:",t)}}async function x(){await Promise.all([y(),c(),f()])}async function y(){try{const{data:t,error:e}=await s.from("oms_customizations").select("*").order("created_at",{ascending:!1}).limit(50);if(e){console.error("Error loading OMS forms:",e);return}b(t),document.getElementById("total-oms-forms").textContent=t.length}catch(t){console.error("Error loading OMS forms:",t)}}function b(t){const e=document.getElementById("oms-forms-table-body");if(!t||t.length===0){e.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No OMS forms submitted yet</td></tr>';return}e.innerHTML=t.map(o=>`
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">${o.project_name||"Unnamed Project"}</div>
            <div class="text-sm text-gray-500">${o.owner_name||"No owner"}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${o.restaurant_name||"Not specified"}</div>
            <div class="text-sm text-gray-500">${o.restaurant_address||"No address"}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${o.user_email||"No email"}</div>
            <div class="text-sm text-gray-500">${o.phone_number||"No phone"}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            ${o.logo_url?`<img src="${o.logo_url}" alt="Logo" class="w-8 h-8 rounded object-cover">`:'<span class="text-gray-400">No logo</span>'}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${new Date(o.created_at).toLocaleDateString()}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="viewOMSForm('${o.id}')">View</button>
            <button class="text-green-600 hover:text-green-900" onclick="processOMSForm('${o.id}')">Process</button>
          </td>
        </tr>
      `).join("")}async function c(){try{const{data:t,error:e}=await s.from("menu_photos").select("*").eq("user_id",i.id).order("created_at",{ascending:!1}).limit(50);if(e){console.error("Error loading photos:",e);return}E(t),document.getElementById("total-menu-photos").textContent=t.length;const o=t.filter(r=>r.conversion_status==="completed").length,n=t.filter(r=>r.conversion_status==="processing"||r.conversion_status==="pending").length;document.getElementById("total-processed").textContent=o,document.getElementById("total-pending").textContent=n}catch(t){console.error("Error loading photos:",t)}}function E(t){const e=document.getElementById("photos-table-body");if(!t||t.length===0){e.innerHTML='<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No photos uploaded yet</td></tr>';return}e.innerHTML=t.map(o=>`
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            ${o.photo_url?`<img src="${o.photo_url}" alt="Menu photo" class="w-12 h-12 rounded object-cover">`:'<div class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${o.original_filename||"Unknown"}</div>
            <div class="text-sm text-gray-500">${o.file_size?(o.file_size/1024).toFixed(1)+" KB":"Unknown size"}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${o.conversion_status==="completed"?"bg-green-100 text-green-800":o.conversion_status==="processing"?"bg-yellow-100 text-yellow-800":o.conversion_status==="failed"?"bg-red-100 text-red-800":"bg-gray-100 text-gray-800"}">
              ${o.conversion_status||"pending"}
          </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${new Date(o.created_at).toLocaleDateString()}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="viewPhoto('${o.id}')">View</button>
            ${o.conversion_status==="completed"?`<button class="text-green-600 hover:text-green-900" onclick="downloadText('`+o.id+`')">Download</button>`:'<button class="text-gray-400 cursor-not-allowed" disabled>Download</button>'}
          </td>
        </tr>
      `).join("")}async function f(){document.getElementById("last-updated").textContent=new Date().toLocaleTimeString()}function _(){document.getElementById("refresh-oms").addEventListener("click",y),document.getElementById("refresh-photos").addEventListener("click",c),document.getElementById("upload-photo-btn").addEventListener("click",()=>{document.getElementById("photo-upload-input").click()}),document.getElementById("photo-upload-input").addEventListener("change",L)}async function L(t){const e=t.target.files[0];if(e){if(!e.type.startsWith("image/")){alert("Please select an image file");return}if(e.size>10*1024*1024){alert("File size must be less than 10MB");return}try{const o=e.name.split(".").pop(),n=`${i.id}/${Date.now()}.${o}`,{data:r,error:u}=await s.storage.from("menu-photos").upload(n,e);if(u)throw u;const{data:{publicUrl:g}}=s.storage.from("menu-photos").getPublicUrl(n),{data:C,error:m}=await s.from("menu_photos").insert({user_id:i.id,photo_url:g,original_filename:e.name,file_size:e.size,mime_type:e.type,conversion_status:"pending"});if(m)throw m;await c(),await f(),t.target.value="",alert("Photo uploaded successfully!")}catch(o){console.error("Upload error:",o),alert("Error uploading file: "+o.message)}}}window.viewOMSForm=function(t){console.log("View OMS form:",t)};window.processOMSForm=function(t){console.log("Process OMS form:",t)};window.viewPhoto=function(t){console.log("View photo:",t)};window.downloadText=function(t){console.log("Download text for photo:",t)};const S="YOUR_SUPABASE_URL",U="YOUR_SUPABASE_ANON_KEY",l=d(S,U);document.addEventListener("DOMContentLoaded",async()=>{document.body.classList.add("menu-operator-panel-active"),await M(),O()});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{document.body.classList.add("menu-operator-panel-active")}):document.body.classList.add("menu-operator-panel-active");async function M(){try{const{data:{user:t}}=await l.auth.getUser();if(!t){window.location.href="/login";return}const{data:e,error:o}=await l.from("profiles").select("full_name, email, role").eq("id",t.id).single();if(e){document.getElementById("user-name").textContent=e.full_name||t.email,document.getElementById("user-role").textContent=e.role||"Menu Operator";const n=document.getElementById("menu-operator-avatar");n&&e.full_name?n.textContent=e.full_name.charAt(0).toUpperCase():n&&t.email&&(n.textContent=t.email.charAt(0).toUpperCase())}else{document.getElementById("user-name").textContent=t.email;const n=document.getElementById("menu-operator-avatar");n&&(n.textContent=t.email.charAt(0).toUpperCase())}}catch(t){console.error("Error loading user info:",t)}}function O(){document.getElementById("logout-btn").addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&(await l.auth.signOut(),window.location.href="/login")}),document.querySelectorAll('a[href="/"]').forEach(e=>{e.addEventListener("click",o=>{console.log('🔄 Menu Operator clicked "Back to Site" - preparing to show user navbar'),document.body.classList.remove("menu-operator-panel-active"),document.documentElement.classList.remove("menu-operator-panel-active"),setTimeout(()=>{window.showUserNavbar&&(window.showUserNavbar(),console.log("✅ User navbar shown after delay"))},50)})})}(function(){if(document.body)document.body.classList.add("menu-operator-panel-active");else{const e=new MutationObserver(function(o){o.forEach(function(n){n.type==="childList"&&document.body&&(document.body.classList.add("menu-operator-panel-active"),e.disconnect())})});e.observe(document.documentElement,{childList:!0})}const t=()=>{const e=document.querySelector("header"),o=document.querySelector("footer");e&&(e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.height="0",e.style.maxHeight="0",e.style.overflow="hidden",e.style.position="absolute",e.style.top="-9999px",e.style.left="-9999px",e.style.zIndex="-9999",e.style.pointerEvents="none",e.style.transform="translateY(-100vh)"),o&&(o.style.display="none",o.style.visibility="hidden",o.style.opacity="0",o.style.height="0",o.style.maxHeight="0",o.style.overflow="hidden",o.style.position="absolute",o.style.top="-9999px",o.style.left="-9999px",o.style.zIndex="-9999",o.style.pointerEvents="none",o.style.transform="translateY(-100vh)")};t(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()})();(function(){document.documentElement.classList.add("menu-operator-panel-active"),document.body.classList.add("menu-operator-panel-active");function t(){const e=document.querySelector("header");e&&(e.style.display="none",e.style.visibility="hidden",e.style.opacity="0",e.style.height="0",e.style.maxHeight="0",e.style.overflow="hidden",e.style.position="absolute",e.style.top="-9999px",e.style.left="-9999px",e.style.zIndex="-9999",e.style.pointerEvents="none",e.style.transform="translateY(-100vh)",e.style.transition="none",e.style.animation="none")}t(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t(),window.addEventListener("load",t),window.addEventListener("popstate",t),setInterval(t,100)})();const $="YOUR_SUPABASE_URL",B="YOUR_SUPABASE_ANON_KEY",p=d($,B);async function k(){try{const{data:{user:t}}=await p.auth.getUser();if(!t)return window.location.href="/login",!1;const{data:e,error:o}=await p.from("profiles").select("role, status").eq("id",t.id).single();return o||!e?(a("You need menu operator role to access this page. Please contact support to assign the role."),!1):(console.log("🔍 MenuOperatorGuard - Profile loaded:",e),console.log("🔍 MenuOperatorGuard - Role value:",JSON.stringify(e.role)),e.status&&e.status!=="active"?(a("Your menu operator access is currently inactive."),!1):!e.role||e.role.toLowerCase().trim()!=="menu_operator"?(a("You need menu operator role to access this page. Current role: "+e.role),!1):!0)}catch(t){return console.error("Error checking menu operator access:",t),a("Error verifying your access. Please try again."),!1}}function a(t){document.body.innerHTML=`
      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Access Denied</h2>
              <p class="mt-2 text-sm text-gray-600">${t}</p>
              <div class="mt-6">
                <a href="/dashboard" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}document.addEventListener("DOMContentLoaded",async()=>{await k()});
