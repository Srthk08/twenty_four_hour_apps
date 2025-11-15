import"./ProductDialog.astro_astro_type_script_index_0_lang.CpUg5vNK.js";import"https://unpkg.com/@supabase/supabase-js@2";const o=document.getElementById("payment-form");o?.addEventListener("submit",async n=>{n.preventDefault();const e=o.querySelector('button[type="submit"]');e.textContent,e.disabled=!0,e.innerHTML=`
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing Payment...
    `,setTimeout(()=>{const t=document.createElement("div");t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",t.innerHTML=`
        <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p class="text-gray-600 mb-6">Your order has been confirmed and development will begin immediately.</p>
            <button onclick="window.location.href='/dashboard'" class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Go to Dashboard
            </button>
          </div>
        </div>
      `,document.body.appendChild(t)},2e3)});
