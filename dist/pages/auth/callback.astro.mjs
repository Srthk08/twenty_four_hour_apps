/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BYANwRK3.mjs';
import { createClient } from '@supabase/supabase-js';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Callback = createComponent(async ($$result, $$props, $$slots) => {
  const SUPABASE_URL = "https://lmrrdcaavwwletcjcpqv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcnJkY2Fhdnd3bGV0Y2pjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDQ0ODgsImV4cCI6MjA3MTA4MDQ4OH0.AU59Qfr6K9i880Gcn5y-3pjCf8PXsDIq4OI0-lPQVuQ";
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  let authResult = null;
  let error = null;
  try {
    const { data, error: authError } = await supabase.auth.getSession();
    if (authError) {
      error = authError.message;
    } else if (data.session) {
      authResult = data.session;
    }
  } catch (err) {
    error = err.message;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Authentication Callback", "data-astro-cid-qbporkgn": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center bg-white" data-astro-cid-qbporkgn> <div class="max-w-md w-full space-y-8" data-astro-cid-qbporkgn> <div class="text-center" data-astro-cid-qbporkgn> <h2 class="mt-6 text-3xl font-extrabold text-gray-900" data-astro-cid-qbporkgn> ${error ? "Authentication Error" : "Processing Authentication..."} </h2> <p class="mt-2 text-sm text-gray-700" data-astro-cid-qbporkgn> ${error ? "There was an error with your authentication." : "Please wait while we complete your sign-in."} </p> </div> <div class="mt-8 space-y-6" data-astro-cid-qbporkgn> ${error ? renderTemplate`<div class="bg-red-50 border border-red-200 rounded-md p-4" data-astro-cid-qbporkgn> <div class="flex" data-astro-cid-qbporkgn> <div class="flex-shrink-0" data-astro-cid-qbporkgn> <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-qbporkgn> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-astro-cid-qbporkgn></path> </svg> </div> <div class="ml-3" data-astro-cid-qbporkgn> <h3 class="text-sm font-medium text-red-800" data-astro-cid-qbporkgn>Authentication Failed</h3> <div class="mt-2 text-sm text-red-700" data-astro-cid-qbporkgn> <p data-astro-cid-qbporkgn>${error}</p> </div> </div> </div> </div>` : renderTemplate`<div class="bg-white border border-gray-200 rounded-md p-4" data-astro-cid-qbporkgn> <div class="flex" data-astro-cid-qbporkgn> <div class="flex-shrink-0" data-astro-cid-qbporkgn> <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-astro-cid-qbporkgn> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-astro-cid-qbporkgn></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-astro-cid-qbporkgn></path> </svg> </div> <div class="ml-3" data-astro-cid-qbporkgn> <h3 class="text-sm font-medium text-gray-800" data-astro-cid-qbporkgn>Processing...</h3> <div class="mt-2 text-sm text-gray-700" data-astro-cid-qbporkgn> <p data-astro-cid-qbporkgn>Setting up your account and redirecting...</p> </div> </div> </div> </div>`} <div class="flex space-x-4" data-astro-cid-qbporkgn> <a href="/login" class="flex-1 bg-gray-800 text-white text-center py-2 px-4 rounded-md hover:bg-gray-900 transition duration-150 ease-in-out" data-astro-cid-qbporkgn>
Back to Login
</a> <a href="/" class="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition duration-150 ease-in-out" data-astro-cid-qbporkgn>
Go Home
</a> </div> </div> </div> </main>  ` })} `;
}, "D:/New/twenty_four_hour_app-main/src/pages/auth/callback.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/auth/callback.astro";
const $$url = "/auth/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Callback,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
