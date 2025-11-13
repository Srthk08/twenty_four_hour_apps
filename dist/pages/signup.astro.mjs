/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_BYANwRK3.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign Up - DevExpress", "data-astro-cid-sgjovbj7": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" data-astro-cid-sgjovbj7> <div class="sm:mx-auto sm:w-full sm:max-w-md" data-astro-cid-sgjovbj7> <div class="flex justify-center" data-astro-cid-sgjovbj7> <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center" data-astro-cid-sgjovbj7> <span class="text-white font-bold text-xl" data-astro-cid-sgjovbj7>24</span> </div> </div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" data-astro-cid-sgjovbj7>
Create your account
</h2> <p class="mt-2 text-center text-sm text-gray-600" data-astro-cid-sgjovbj7>
Or${" "} <a href="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors" data-astro-cid-sgjovbj7>
sign in to your existing account
</a> </p> </div> <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md" data-astro-cid-sgjovbj7> <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" data-astro-cid-sgjovbj7> <form id="signup-form" class="space-y-6" data-astro-cid-sgjovbj7> <!-- Error Message --> <div id="error-message" class="hidden p-4 bg-red-50 border border-red-200 rounded-lg" data-astro-cid-sgjovbj7> <div class="flex" data-astro-cid-sgjovbj7> <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-sgjovbj7> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-astro-cid-sgjovbj7></path> </svg> <span id="error-text" class="text-red-800" data-astro-cid-sgjovbj7>An error occurred during account creation.</span> </div> </div> <!-- Success Message --> <div id="success-message" class="hidden p-4 bg-green-50 border border-green-200 rounded-lg" data-astro-cid-sgjovbj7> <div class="flex" data-astro-cid-sgjovbj7> <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-sgjovbj7> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-astro-cid-sgjovbj7></path> </svg> <span id="success-text" class="text-green-800" data-astro-cid-sgjovbj7>Account created successfully! Redirecting...</span> </div> </div> <!-- Full Name --> <div data-astro-cid-sgjovbj7> <label for="full_name" class="block text-sm font-medium text-gray-700" data-astro-cid-sgjovbj7>
Full Name *
</label> <div class="mt-1" data-astro-cid-sgjovbj7> <input id="full_name" name="full_name" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Enter your full name" data-astro-cid-sgjovbj7> </div> </div> <!-- Email --> <div data-astro-cid-sgjovbj7> <label for="email" class="block text-sm font-medium text-gray-700" data-astro-cid-sgjovbj7>
Email Address *
</label> <div class="mt-1" data-astro-cid-sgjovbj7> <input id="email" name="email" type="email" required autocomplete="off" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="your@email.com" data-astro-cid-sgjovbj7> </div> </div> <!-- Password --> <div data-astro-cid-sgjovbj7> <label for="password" class="block text-sm font-medium text-gray-700" data-astro-cid-sgjovbj7>
Password *
</label> <div class="mt-1" data-astro-cid-sgjovbj7> <input id="password" name="password" type="password" required minlength="6" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Create a password (min 6 characters)" data-astro-cid-sgjovbj7> </div> </div> <!-- Confirm Password --> <div data-astro-cid-sgjovbj7> <label for="confirm_password" class="block text-sm font-medium text-gray-700" data-astro-cid-sgjovbj7>
Confirm Password *
</label> <div class="mt-1" data-astro-cid-sgjovbj7> <input id="confirm_password" name="confirm_password" type="password" required minlength="6" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Confirm your password" data-astro-cid-sgjovbj7> </div> </div> <!-- Phone --> <div data-astro-cid-sgjovbj7> <label for="phone" class="block text-sm font-medium text-gray-700" data-astro-cid-sgjovbj7>
Phone Number *
</label> <div class="mt-1" data-astro-cid-sgjovbj7> <div class="flex" data-astro-cid-sgjovbj7> <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm" data-astro-cid-sgjovbj7>
+91
</span> <input id="phone" name="phone" type="tel" required maxlength="10" pattern="[0-9]{10}" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="9876543210" data-astro-cid-sgjovbj7> </div> <div id="phone-error" class="hidden text-red-500 text-sm mt-1" data-astro-cid-sgjovbj7>Please enter a valid 10-digit phone number</div> </div> </div> <!-- Company Name --> <div data-astro-cid-sgjovbj7> <label for="company_name" class="block text-sm font-medium text-gray-700" data-astro-cid-sgjovbj7>
Company Name
</label> <div class="mt-1" data-astro-cid-sgjovbj7> <input id="company_name" name="company_name" type="text" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Your company name (optional)" data-astro-cid-sgjovbj7> </div> </div> <!-- Admin Code (Hidden by default) --> <div id="admin-code-section" class="hidden" data-astro-cid-sgjovbj7> <label for="admin_code" class="block text-sm font-medium text-gray-700" data-astro-cid-sgjovbj7>
Admin Code
</label> <div class="mt-1" data-astro-cid-sgjovbj7> <input id="admin_code" name="admin_code" type="text" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Enter admin code (optional)" data-astro-cid-sgjovbj7> </div> </div> <!-- Submit Button --> <button type="submit" id="signup-btn" class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors" data-astro-cid-sgjovbj7>
Create Account
</button> <!-- Google Authentication --> <div class="google-auth-section" data-astro-cid-sgjovbj7> <div class="divider" data-astro-cid-sgjovbj7> <span data-astro-cid-sgjovbj7>or</span> </div> <div class="google-auth-container" data-astro-cid-sgjovbj7> <button id="google-signup-btn" class="google-btn signup" data-astro-cid-sgjovbj7> <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20" data-astro-cid-sgjovbj7> <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-astro-cid-sgjovbj7></path> <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-astro-cid-sgjovbj7></path> <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-astro-cid-sgjovbj7></path> <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-astro-cid-sgjovbj7></path> </svg> <span data-astro-cid-sgjovbj7>Sign up with Google</span> </button> </div> </div> <!-- Login Link --> <div class="text-center text-sm text-gray-600" data-astro-cid-sgjovbj7>
Already have an account?
<a href="/login" class="text-primary-600 hover:text-primary-500 font-medium transition-colors" data-astro-cid-sgjovbj7>
Sign in here
</a> </div> </form> </div> </div> </section> ` })}  `;
}, "D:/New/twenty_four_hour_app-main/src/pages/signup.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
