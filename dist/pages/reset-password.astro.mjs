/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_BYANwRK3.mjs';
export { renderers } from '../renderers.mjs';

const $$ResetPassword = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Reset Password" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
Reset Your Password
</h2> <p class="mt-2 text-center text-sm text-gray-600">
Enter your new password below to complete the reset process.
</p> <!-- Email Display --> <div id="email-display" class="hidden text-center"> <div class="bg-blue-50 border border-blue-200 rounded-lg p-3"> <p class="text-sm text-blue-800"> <span class="font-medium">Resetting password for:</span> <span id="user-email" class="font-semibold text-blue-900"></span> </p> </div> </div> </div> <form id="reset-password-form" class="mt-8 space-y-6" autocomplete="off"> <!-- Hidden fields to prevent autofill --> <input type="text" style="display:none" autocomplete="username"> <input type="password" style="display:none" autocomplete="current-password"> <!-- Email field (hidden by default, shown if no session) --> <div id="email-field" class="hidden"> <label for="email" class="block text-sm font-medium text-gray-700">
Email Address <span class="text-red-500">*</span> </label> <input id="email" name="email" type="email" autocomplete="off" class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Enter your email address"> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700">
New Password <span class="text-red-500">*</span> </label> <input id="password" name="password" type="password" required minlength="6" autocomplete="new-password" class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Enter your new password"> </div> <div> <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
Confirm New Password <span class="text-red-500">*</span> </label> <input id="confirmPassword" name="confirmPassword" type="password" required minlength="6" autocomplete="new-password" class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Confirm your new password"> </div> <!-- Success Message --> <div id="success-message" class="hidden rounded-md bg-green-50 p-4"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <p class="text-sm font-medium text-green-800" id="success-text">
Password updated successfully!
</p> </div> </div> </div> <!-- Error Message --> <div id="error-message" class="hidden rounded-md bg-red-50 p-4"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <p class="text-sm font-medium text-red-800" id="error-text">
An error occurred
</p> </div> </div> </div> <div> <button id="reset-password-btn" type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"> <span class="absolute left-0 inset-y-0 flex items-center pl-3"> <svg class="h-5 w-5 text-primary-500 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path> </svg> </span>
Update Password
</button> </div> <div class="text-center space-y-2"> <div> <a href="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
Back to Login
</a> </div> <div> <a href="/forgot-password" class="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
Request New Reset Link
</a> </div> </div> </form> </div> </div> ` })} `;
}, "D:/New/twenty_four_hour_app-main/src/pages/reset-password.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ResetPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
