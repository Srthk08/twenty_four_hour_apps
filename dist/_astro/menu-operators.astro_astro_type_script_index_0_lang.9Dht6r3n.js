import{c as u}from"./index.9NDAT-bh.js";import"./preload-helper.BlTxHScW.js";const d="YOUR_SUPABASE_URL",m="YOUR_SUPABASE_ANON_KEY",a=u(d,m);async function s(){try{const{data:e,error:t}=await a.from("profiles").select("*").eq("role","menu_operator").order("created_at",{ascending:!1});if(t){console.error("Error loading menu operators:",t);return}p(e)}catch(e){console.error("Error loading menu operators:",e)}}function p(e){const t=document.getElementById("menu-operators-list");if(!e||e.length===0){t.innerHTML='<p class="text-gray-500 text-center py-8">No Menu Operators assigned yet</p>';return}t.innerHTML=e.map(r=>`
      <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div class="flex-1">
          <h3 class="font-medium text-gray-900">${r.full_name}</h3>
          <p class="text-sm text-gray-600">${r.email}</p>
          <p class="text-sm text-gray-500">${r.phone||"No phone"}</p>
        </div>
        <div class="flex items-center space-x-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
            ${r.is_active?"Active":"Inactive"}
          </span>
          <button
            onclick="removeMenuOperator('${r.email}')"
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Remove Role
          </button>
        </div>
      </div>
    `).join("")}async function l(){try{const{data:e,error:t}=await a.rpc("list_all_users");if(t){console.error("Error loading users:",t);return}f(e)}catch(e){console.error("Error loading users:",e)}}function f(e){const t=document.getElementById("all-users-list");if(!e||e.length===0){t.innerHTML='<p class="text-gray-500 text-center py-8">No users found</p>';return}t.innerHTML=e.map(r=>`
      <div 
        class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${r.current_role==="menu_operator"?"bg-blue-50 border-blue-200":""}"
        onclick="${r.current_role!=="menu_operator"?`assignMenuOperator('${r.email}', '${r.full_name}')`:""}"
      >
        <div class="flex-1">
          <h3 class="font-medium text-gray-900">${r.full_name}</h3>
          <p class="text-sm text-gray-600">${r.email}</p>
          <p class="text-xs text-gray-500">Joined: ${new Date(r.created_at).toLocaleDateString()}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.current_role==="menu_operator"?"bg-blue-100 text-blue-800":r.current_role==="No Role"?"bg-gray-100 text-gray-800":"bg-yellow-100 text-yellow-800"}">
            ${r.current_role}
          </span>
          ${r.current_role==="menu_operator"?"":'<span class="text-blue-600 text-sm">Click to assign</span>'}
        </div>
      </div>
    `).join("")}async function c(e,t=null,r=null){try{const{data:o,error:n}=await a.from("auth.users").select("id").eq("email",e).single();if(n||!o)throw new Error("User not found with email: "+e);const{data:x,error:i}=await a.from("profiles").upsert({user_id:o.id,full_name:t||e.split("@")[0],email:e,phone:r,role:"menu_operator",is_active:!0,updated_at:new Date().toISOString()},{onConflict:"user_id"});if(i)throw i;alert("Menu Operator role assigned successfully!"),s(),l()}catch(o){console.error("Error assigning role:",o),alert("Error assigning role: "+o.message)}}async function g(e){if(confirm(`Are you sure you want to remove Menu Operator role from ${e}?`))try{const{data:t,error:r}=await a.from("auth.users").select("id").eq("email",e).single();if(r||!t)throw new Error("User not found with email: "+e);const{data:o,error:n}=await a.from("profiles").update({role:"customer",updated_at:new Date().toISOString()}).eq("user_id",t.id);if(n)throw n;alert("Menu Operator role removed successfully!"),s(),l()}catch(t){console.error("Error removing role:",t),alert("Error removing role: "+t.message)}}document.getElementById("assign-role-form").addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.target),r=t.get("email"),o=t.get("fullName"),n=t.get("phone");await c(r,o,n),e.target.reset()});window.assignMenuOperator=c;window.removeMenuOperator=g;document.addEventListener("DOMContentLoaded",()=>{s(),l()});
