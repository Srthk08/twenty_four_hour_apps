/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, d as renderSlot, m as maybeRenderHead } from '../../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout, a as $$Toast } from '../../chunks/Layout_BYANwRK3.mjs';
/* empty css                                      */
import 'clsx';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$MenuOperatorLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MenuOperatorLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "data-astro-cid-v2e6spoj": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["      ", '<div class="menu-operator-panel-container bg-gray-50" x-data="{ mobileMenuOpen: false }" data-astro-cid-v2e6spoj> <!-- Top Navigation Bar --> <div class="bg-white shadow-sm border-b border-gray-200" data-astro-cid-v2e6spoj> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-v2e6spoj> <div class="flex items-center justify-between h-16" data-astro-cid-v2e6spoj> <!-- Logo and Brand --> <div class="flex items-center" data-astro-cid-v2e6spoj> <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center" data-astro-cid-v2e6spoj> <span class="text-white font-bold text-sm" data-astro-cid-v2e6spoj>MO</span> </div> <span class="ml-3 text-lg font-semibold text-gray-800" data-astro-cid-v2e6spoj>Menu Operator</span> </div> <!-- Desktop Navigation --> <div class="hidden lg:flex items-center space-x-1" data-astro-cid-v2e6spoj> <!-- Back to Site --> <a href="/" class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors" data-astro-cid-v2e6spoj> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-v2e6spoj> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-astro-cid-v2e6spoj></path> </svg> <span data-astro-cid-v2e6spoj>Back to Site</span> </a> </div> <!-- Mobile Menu Button --> <div class="lg:hidden" data-astro-cid-v2e6spoj> <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" data-astro-cid-v2e6spoj> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-v2e6spoj> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-v2e6spoj></path> </svg> </button> </div> <!-- Profile Dropdown removed as requested --> </div> </div> <!-- Mobile Navigation Menu --> <div class="lg:hidden" x-show="mobileMenuOpen" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 transform scale-95" x-transition:enter-end="opacity-100 transform scale-100" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100 transform scale-100" x-transition:leave-end="opacity-0 transform scale-95" data-astro-cid-v2e6spoj> <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200" data-astro-cid-v2e6spoj> <!-- Back to Site --> <a href="/" class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors" data-astro-cid-v2e6spoj> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-v2e6spoj> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-astro-cid-v2e6spoj></path> </svg> <span data-astro-cid-v2e6spoj>Back to Site</span> </a> </div> </div> </div> <!-- Main Content --> <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" data-astro-cid-v2e6spoj> ', " </main> </div>  ", `  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js" onerror="
      console.warn('\u26A0\uFE0F Alpine.js failed to load from jsdelivr, trying unpkg...');
      const fallback = document.createElement('script');
      fallback.defer = true;
      fallback.src = 'https://unpkg.com/alpinejs@3.13.3/dist/cdn.min.js';
      fallback.onerror = function() {
        console.error('\u274C Alpine.js failed to load from all CDN sources');
      };
      document.head.appendChild(fallback);
    "><\/script>     `])), maybeRenderHead(), renderSlot($$result2, $$slots["default"]), renderComponent($$result2, "Toast", $$Toast, { "data-astro-cid-v2e6spoj": true })) })}`;
}, "D:/New/twenty_four_hour_app-main/src/layouts/MenuOperatorLayout.astro", void 0);

const $$Astro = createAstro();
const $$MenuOperatorGuard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MenuOperatorGuard;
  return renderTemplate``;
}, "D:/New/twenty_four_hour_app-main/src/components/MenuOperatorGuard.astro", void 0);

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MenuOperatorGuard", $$MenuOperatorGuard, {})} ${renderComponent($$result, "MenuOperatorLayout", $$MenuOperatorLayout, { "title": "Menu Operator Profile - 24HourApps" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <!-- Back Button --> <div class="mb-6"> <a href="/menu-operator" class="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> <span>← Back to Menu Operator Dashboard</span> </a> </div> <!-- Page Header --> <div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900 mb-2">Menu Operator Profile</h1> <p class="text-gray-600">Manage your menu operator account settings and view your activity</p> </div> <!-- Profile Card --> <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8"> <div class="flex items-start space-x-6"> <!-- Avatar --> <div class="flex-shrink-0"> <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"> <span id="profile-avatar" class="text-white font-bold text-2xl">MO</span> </div> </div> <!-- User Info --> <div class="flex-1"> <h2 id="profile-name" class="text-2xl font-bold text-gray-900 mb-2">Menu Operator</h2> <p id="profile-email" class="text-gray-600 mb-4">Loading profile...</p> <!-- Status Badges --> <div class="flex space-x-3"> <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"> <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path> </svg>
Menu Operator
</span> <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"> <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"> <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Active
</span> </div> </div> </div> </div> <!-- Profile Information Card --> <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"> <h3 class="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <!-- Left Column --> <div class="space-y-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label> <p id="profile-full-name" class="text-gray-900">Menu Operator</p> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Role</label> <p class="text-gray-900">Menu Operator</p> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Last Login</label> <p id="profile-last-login" class="text-gray-900">Just now</p> </div> </div> <!-- Right Column --> <div class="space-y-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <p id="profile-email-detail" class="text-gray-900">Loading profile...</p> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Member Since</label> <p id="profile-member-since" class="text-gray-900">Today</p> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Status</label> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"> <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"> <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Active
</span> </div> </div> </div> </div> <!-- Activity Section --> <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"> <h3 class="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3> <div class="space-y-4"> <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"> <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"> <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> </div> <div class="flex-1"> <p class="text-sm font-medium text-gray-900">OMS Forms Processed</p> <p class="text-xs text-gray-500">0 forms processed today</p> </div> </div> <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"> <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"> <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div> <div class="flex-1"> <p class="text-sm font-medium text-gray-900">Menu Photos Processed</p> <p class="text-xs text-gray-500">0 photos processed today</p> </div> </div> </div> </div> </div>  ` })}`;
}, "D:/New/twenty_four_hour_app-main/src/pages/menu-operator/profile.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/menu-operator/profile.astro";
const $$url = "/menu-operator/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
