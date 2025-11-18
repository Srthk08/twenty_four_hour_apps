import{c}from"./index.9NDAT-bh.js";import"./preload-helper.BlTxHScW.js";const n={ASSETS_PREFIX:void 0,BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SITE:void 0,SSR:!1};var t={};const i={url:"https://lmrrdcaavwwletcjcpqv.supabase.co",anonKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ"},a=e=>typeof import.meta<"u"&&n&&n[e]?n[e]:typeof process<"u"&&t&&t[e]?t[e]:typeof window<"u"&&window.__ENV__&&window.__ENV__[e]?window.__ENV__[e]:"",u=a("VITE_SUPABASE_URL")||i.url,d=a("VITE_SUPABASE_ANON_KEY")||i.anonKey,f=c(u,d);async function p(){try{console.log("🔍 MenuOperatorGuard - Checking access...");const e=sessionStorage.getItem("simple-auth-session");if(!e)return console.log("❌ No session data found - redirecting to login"),window.location.href="/login",!1;let o;try{o=JSON.parse(e)}catch{return console.log("❌ Invalid session data - redirecting to login"),window.location.href="/login",!1}if(!o.user||!o.user.email)return console.log("❌ No user data in session - redirecting to login"),window.location.href="/login",!1;if(console.log("✅ Session found for user:",o.user.email),o.user.role==="menu_operator"||o.user.role==="menu operator")return console.log("✅ Menu operator role found in session"),!0;console.log("⚠️ No role in session, checking Supabase...");const{data:s,error:l}=await f.from("profiles").select("role, status").eq("id",o.user.id).single();return l||!s?(console.log("❌ No profile found in Supabase"),r("You need menu operator role to access this page. Please contact support to assign the role."),!1):(console.log("🔍 MenuOperatorGuard - Profile loaded:",s),console.log("🔍 MenuOperatorGuard - Role value:",JSON.stringify(s.role)),s.status&&s.status!=="active"?(r("Your menu operator access is currently inactive."),!1):!s.role||s.role.toLowerCase().trim()!=="menu_operator"?(r("You need menu operator role to access this page. Current role: "+s.role),!1):(o.user.role=s.role,sessionStorage.setItem("simple-auth-session",JSON.stringify(o)),console.log("✅ Updated session with role information"),!0))}catch(e){return console.error("Error checking menu operator access:",e),r("Error verifying your access. Please try again."),!1}}function r(e){document.body.innerHTML=`
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
              <p class="mt-2 text-sm text-gray-600">${e}</p>
              <div class="mt-6">
                <a href="/dashboard" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}document.addEventListener("DOMContentLoaded",async()=>{await p()});
