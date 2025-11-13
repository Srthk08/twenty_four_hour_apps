/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_BYANwRK3.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign In - DevExpress", "data-astro-cid-sgpqyurt": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" data-astro-cid-sgpqyurt> <div class="sm:mx-auto sm:w-full sm:max-w-md" data-astro-cid-sgpqyurt> <div class="flex justify-center" data-astro-cid-sgpqyurt> <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center" data-astro-cid-sgpqyurt> <span class="text-white font-bold text-xl" data-astro-cid-sgpqyurt>24</span> </div> </div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" data-astro-cid-sgpqyurt>
Sign in to your account
</h2> <p class="mt-2 text-center text-sm text-gray-600" data-astro-cid-sgpqyurt>
Or${" "} <a href="/signup" class="font-medium text-primary-600 hover:text-primary-500 transition-colors" data-astro-cid-sgpqyurt>
create a new account
</a> </p> </div> <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md" data-astro-cid-sgpqyurt> <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" data-astro-cid-sgpqyurt> <form id="login-form" class="space-y-6" data-astro-cid-sgpqyurt> <!-- Error Message --> <div id="error-message" class="hidden p-4 bg-red-50 border border-red-200 rounded-lg" data-astro-cid-sgpqyurt> <div class="flex" data-astro-cid-sgpqyurt> <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-sgpqyurt> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-astro-cid-sgpqyurt></path> </svg> <span id="error-text" class="text-red-800" data-astro-cid-sgpqyurt>An error occurred during sign in.</span> </div> </div> <!-- Success Message --> <div id="success-message" class="hidden p-4 bg-green-50 border border-green-200 rounded-lg" data-astro-cid-sgpqyurt> <div class="flex" data-astro-cid-sgpqyurt> <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-sgpqyurt> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-astro-cid-sgpqyurt></path> </svg> <span id="success-text" class="text-green-800" data-astro-cid-sgpqyurt>Login successful! Redirecting...</span> </div> </div> <div data-astro-cid-sgpqyurt> <label for="email" class="block text-sm font-medium text-gray-700" data-astro-cid-sgpqyurt>
Email address
</label> <div class="mt-1" data-astro-cid-sgpqyurt> <input id="email" name="email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Enter your email address" data-astro-cid-sgpqyurt> </div> </div> <div data-astro-cid-sgpqyurt> <label for="password" class="block text-sm font-medium text-gray-700" data-astro-cid-sgpqyurt>
Password
</label> <div class="mt-1" data-astro-cid-sgpqyurt> <input id="password" name="password" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Enter your password" data-astro-cid-sgpqyurt> </div> </div> <!-- Submit Button --> <button type="submit" id="login-btn" class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors" data-astro-cid-sgpqyurt>
Sign In
</button> <!-- Google Authentication --> <div class="google-auth-section" data-astro-cid-sgpqyurt> <div class="divider" data-astro-cid-sgpqyurt> <span data-astro-cid-sgpqyurt>or</span> </div> <div class="google-auth-container" data-astro-cid-sgpqyurt> <button id="google-signin-btn" class="google-btn" data-astro-cid-sgpqyurt> <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20" data-astro-cid-sgpqyurt> <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-astro-cid-sgpqyurt></path> <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-astro-cid-sgpqyurt></path> <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-astro-cid-sgpqyurt></path> <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-astro-cid-sgpqyurt></path> </svg> <span data-astro-cid-sgpqyurt>Continue with Google</span> </button> </div> </div> <!-- Forgot Password Link --> <div class="text-center" data-astro-cid-sgpqyurt> <a href="/forgot-password" class="text-sm text-primary-600 hover:text-primary-500 transition-colors" data-astro-cid-sgpqyurt>
Forgot your password?
</a> </div> <!-- Sign Up Link --> <div class="text-center text-sm text-gray-600" data-astro-cid-sgpqyurt>
Don't have an account?
<a href="/signup" class="text-primary-600 hover:text-primary-500 font-medium transition-colors" data-astro-cid-sgpqyurt>
Sign up here
</a> </div> </form> </div> </div> </section>   ` })}`;
}, "D:/New/twenty_four_hour_app-main/src/pages/login.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
