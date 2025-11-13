/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_BYANwRK3.mjs';
export { renderers } from '../renderers.mjs';

const $$ForgotPassword = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Forgot Password" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"> <div class="sm:mx-auto sm:w-full sm:max-w-md"> <div class="flex justify-center"> <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"> <span class="text-white font-bold text-xl">24</span> </div> </div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
Forgot Your Password?
</h2> <p class="mt-2 text-center text-sm text-gray-600">
Enter your email address and we'll send you a link to reset your password.
</p> </div> <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"> <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> <form id="forgot-password-form" class="space-y-6"> <div> <label for="email" class="block text-sm font-medium text-gray-700">
Email Address
</label> <div class="mt-1"> <input id="email" name="email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Enter your email address"> </div> </div> <!-- Success Message --> <div id="success-message" class="hidden p-4 bg-green-50 border border-green-200 rounded-lg"> <div class="flex"> <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span id="success-text" class="text-green-800">Reset link sent successfully!</span> </div> </div> <!-- Error Message --> <div id="error-message" class="hidden p-4 bg-red-50 border border-red-200 rounded-lg"> <div class="flex"> <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> <span id="error-text" class="text-red-800">An error occurred</span> </div> </div> <div> <button id="send-reset-btn" type="submit" class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
Send Reset Link
</button> </div> <div class="text-center text-sm text-gray-600">
Remember your password?
<a href="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">
Sign in here
</a> </div> </form> </div> </div> </section> ` })} `;
}, "D:/New/twenty_four_hour_app-main/src/pages/forgot-password.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/forgot-password.astro";
const $$url = "/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForgotPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
