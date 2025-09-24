import{s as n}from"./customization-db.DgkmyQcR.js";import"./Toast.astro_astro_type_script_index_0_lang.C2kRdsNU.js";import"https://unpkg.com/@supabase/supabase-js@2";import"./index.BFAZBQoJ.js";console.log("🧪 Database test page loaded");const a=document.getElementById("test-form"),l=document.getElementById("test-results"),o=document.getElementById("result-content");a?.addEventListener("submit",async r=>{r.preventDefault(),console.log("🧪 Test form submitted");const c=new FormData(a),e=Object.fromEntries(c);console.log("📝 Form data:",e),o.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div><p class="mt-2">Saving to database...</p></div>',l.classList.remove("hidden");try{const s={projectName:e.projectName,contactPerson:e.contactPerson,appName:e.appName,productDescription:e.productDescription,email:e.email,phone:e.phone,additionalRequirements:e.additionalRequirements,primaryColor:"#3B82F6",secondaryColor:"#10B981",accentColor:"#F59E0B",textColor:"#1F2937"};console.log("💾 Attempting to save to database...");const t=await n(s,e.productType);t.success?(console.log("✅ Database save successful:",t.data),o.innerHTML=`
          <div class="text-green-600">
            <h3 class="font-semibold text-lg mb-2">✅ Success!</h3>
            <p class="mb-2">Data saved to database successfully.</p>
            <p class="text-sm">Record ID: ${t.data.id}</p>
            <p class="text-sm">Created: ${new Date(t.data.created_at).toLocaleString()}</p>
            <p class="text-sm">Is Update: ${t.isUpdate?"Yes (duplicate prevented)":"No (new record)"}</p>
          </div>
        `):(console.error("❌ Database save failed:",t.error),o.innerHTML=`
          <div class="text-red-600">
            <h3 class="font-semibold text-lg mb-2">❌ Error!</h3>
            <p class="mb-2">Failed to save to database.</p>
            <p class="text-sm">Error: ${t.error}</p>
            <p class="text-sm mt-2">Check the browser console for more details.</p>
          </div>
        `)}catch(s){console.error("❌ Unexpected error:",s),o.innerHTML=`
        <div class="text-red-600">
          <h3 class="font-semibold text-lg mb-2">❌ Unexpected Error!</h3>
          <p class="mb-2">An unexpected error occurred.</p>
          <p class="text-sm">Error: ${s.message}</p>
          <p class="text-sm mt-2">Check the browser console for more details.</p>
        </div>
      `}});
