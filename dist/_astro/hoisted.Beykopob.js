import{s as a}from"./customization-db.DgkmyQcR.js";import{c}from"./index.BFAZBQoJ.js";import"./Toast.astro_astro_type_script_index_0_lang.C2kRdsNU.js";import"https://unpkg.com/@supabase/supabase-js@2";const o="https://lmrrdcaavwwletcjcpqv.supabase.co",n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ",r=c(o,n);console.log("🔧 Database debug tool loaded");console.log("🔧 Supabase URL:",o);console.log("🔧 Supabase Key (first 20 chars):",n.substring(0,20)+"...");document.getElementById("test-connection")?.addEventListener("click",async()=>{const e=document.getElementById("connection-result");e.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div><p class="mt-2">Testing connection...</p></div>',e.classList.remove("hidden");try{console.log("🔧 Testing Supabase connection...");const{data:s,error:t}=await r.from("customization_forms").select("count").limit(1);t?(console.error("❌ Connection test failed:",t),e.innerHTML=`
          <div class="text-red-600">
            <h3 class="font-semibold">❌ Connection Failed</h3>
            <p class="text-sm mt-2">Error: ${t.message}</p>
            <p class="text-sm">Code: ${t.code}</p>
            <p class="text-sm">Details: ${t.details}</p>
            <p class="text-sm">Hint: ${t.hint}</p>
          </div>
        `):(console.log("✅ Connection test successful:",s),e.innerHTML=`
          <div class="text-green-600">
            <h3 class="font-semibold">✅ Connection Successful</h3>
            <p class="text-sm mt-2">Connected to Supabase successfully!</p>
            <p class="text-sm">Data: ${JSON.stringify(s)}</p>
          </div>
        `)}catch(s){console.error("❌ Unexpected error:",s),e.innerHTML=`
        <div class="text-red-600">
          <h3 class="font-semibold">❌ Unexpected Error</h3>
          <p class="text-sm mt-2">Error: ${s.message}</p>
        </div>
      `}});document.getElementById("check-table")?.addEventListener("click",async()=>{const e=document.getElementById("table-result");e.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div><p class="mt-2">Checking table...</p></div>',e.classList.remove("hidden");try{console.log("🔧 Checking if customization_forms table exists...");const{data:s,error:t}=await r.from("customization_forms").select("*").limit(1);t?(console.error("❌ Table check failed:",t),e.innerHTML=`
          <div class="text-red-600">
            <h3 class="font-semibold">❌ Table Not Found</h3>
            <p class="text-sm mt-2">Error: ${t.message}</p>
            <p class="text-sm">Code: ${t.code}</p>
            <p class="text-sm">This means the table doesn't exist yet.</p>
            <p class="text-sm mt-2"><strong>Solution:</strong> Execute the SQL schema in Supabase Dashboard → SQL Editor</p>
          </div>
        `):(console.log("✅ Table exists:",s),e.innerHTML=`
          <div class="text-green-600">
            <h3 class="font-semibold">✅ Table Exists</h3>
            <p class="text-sm mt-2">customization_forms table found!</p>
            <p class="text-sm">Sample data: ${JSON.stringify(s)}</p>
          </div>
        `)}catch(s){console.error("❌ Unexpected error:",s),e.innerHTML=`
        <div class="text-red-600">
          <h3 class="font-semibold">❌ Unexpected Error</h3>
          <p class="text-sm mt-2">Error: ${s.message}</p>
        </div>
      `}});document.getElementById("test-insert")?.addEventListener("click",async()=>{const e=document.getElementById("insert-result");e.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div><p class="mt-2">Testing insert...</p></div>',e.classList.remove("hidden");try{console.log("🔧 Testing insert...");const t=await a({projectName:"Debug Test Project",contactPerson:"Debug User",appName:"Debug App",productDescription:"This is a debug test",email:"debug@example.com",phone:"+1234567890",additionalRequirements:"Debug test requirements"},"restaurant-website");t.success?(console.log("✅ Insert test successful:",t.data),e.innerHTML=`
          <div class="text-green-600">
            <h3 class="font-semibold">✅ Insert Successful</h3>
            <p class="text-sm mt-2">Data inserted successfully!</p>
            <p class="text-sm">ID: ${t.data.id}</p>
            <p class="text-sm">Is Update: ${t.isUpdate?"Yes":"No"}</p>
          </div>
        `):(console.error("❌ Insert test failed:",t.error),e.innerHTML=`
          <div class="text-red-600">
            <h3 class="font-semibold">❌ Insert Failed</h3>
            <p class="text-sm mt-2">Error: ${t.error}</p>
          </div>
        `)}catch(s){console.error("❌ Unexpected error:",s),e.innerHTML=`
        <div class="text-red-600">
          <h3 class="font-semibold">❌ Unexpected Error</h3>
          <p class="text-sm mt-2">Error: ${s.message}</p>
        </div>
      `}});document.getElementById("view-data")?.addEventListener("click",async()=>{const e=document.getElementById("data-result");e.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto"></div><p class="mt-2">Loading data...</p></div>',e.classList.remove("hidden");try{console.log("🔧 Loading all data...");const{data:s,error:t}=await r.from("customization_forms").select("*").order("created_at",{ascending:!1});t?(console.error("❌ Load data failed:",t),e.innerHTML=`
          <div class="text-red-600">
            <h3 class="font-semibold">❌ Load Failed</h3>
            <p class="text-sm mt-2">Error: ${t.message}</p>
          </div>
        `):(console.log("✅ Data loaded:",s),e.innerHTML=`
          <div class="text-green-600">
            <h3 class="font-semibold">✅ Data Loaded (${s.length} records)</h3>
            <div class="mt-2 text-sm">
              <pre class="bg-gray-200 p-2 rounded text-xs overflow-auto max-h-64">${JSON.stringify(s,null,2)}</pre>
            </div>
          </div>
        `)}catch(s){console.error("❌ Unexpected error:",s),e.innerHTML=`
        <div class="text-red-600">
          <h3 class="font-semibold">❌ Unexpected Error</h3>
          <p class="text-sm mt-2">Error: ${s.message}</p>
        </div>
      `}});
