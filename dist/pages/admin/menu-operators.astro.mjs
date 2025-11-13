/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ms-EoaoC.mjs';
export { renderers } from '../../renderers.mjs';

const $$MenuOperators = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Menu Operators - Admin Panel" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-6"> <div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900">Menu Operators Management</h1> <p class="mt-2 text-gray-600">Manage users with Menu Operator role and their permissions</p> </div> <!-- Current Menu Operators --> <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8"> <div class="px-6 py-4 border-b border-gray-200"> <h2 class="text-lg font-semibold text-gray-900">Current Menu Operators</h2> </div> <div class="p-6"> <div id="menu-operators-list" class="space-y-4"> <!-- Menu operators will be loaded here --> </div> </div> </div> <!-- Assign New Menu Operator --> <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8"> <div class="px-6 py-4 border-b border-gray-200"> <h2 class="text-lg font-semibold text-gray-900">Assign Menu Operator Role</h2> </div> <div class="p-6"> <form id="assign-role-form" class="space-y-4"> <div> <label for="user-email" class="block text-sm font-medium text-gray-700">User Email</label> <input type="email" id="user-email" name="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="user@example.com"> </div> <div> <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name (Optional)</label> <input type="text" id="full-name" name="fullName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe"> </div> <div> <label for="phone" class="block text-sm font-medium text-gray-700">Phone (Optional)</label> <input type="tel" id="phone" name="phone" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="+1234567890"> </div> <button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
Assign Menu Operator Role
</button> </form> </div> </div> <!-- All Users List --> <div class="bg-white rounded-lg shadow-sm border border-gray-200"> <div class="px-6 py-4 border-b border-gray-200"> <h2 class="text-lg font-semibold text-gray-900">All Users</h2> <p class="text-sm text-gray-600 mt-1">Click on a user to assign Menu Operator role</p> </div> <div class="p-6"> <div id="all-users-list" class="space-y-2"> <!-- All users will be loaded here --> </div> </div> </div> </div> ` })} `;
}, "D:/New/twenty_four_hour_app-main/src/pages/admin/menu-operators.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/admin/menu-operators.astro";
const $$url = "/admin/menu-operators";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MenuOperators,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
