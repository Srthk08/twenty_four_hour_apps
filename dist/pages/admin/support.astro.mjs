/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ms-EoaoC.mjs';
export { renderers } from '../../renderers.mjs';

const $$Support = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Support & Help Center - DevExpress" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <!-- Page Header --> <div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900">Support & Help Center</h1> <p class="text-gray-600 mt-2">Manage customer support tickets</p> </div> <!-- Support Tickets --> <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"> <div class="px-6 py-4 border-b border-gray-200"> <div class="flex items-center justify-between"> <h3 class="text-lg font-medium text-gray-900">Support Tickets</h3> <div class="flex items-center space-x-3"> <span id="tickets-count" class="text-sm text-gray-500">Loading tickets...</span> <button id="refresh-tickets-header" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
Refresh
</button> </div> </div> </div> <div class="overflow-x-auto"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> </tr> </thead> <tbody id="tickets-tbody" class="bg-white divide-y divide-gray-200"> <tr> <td colspan="7" class="px-6 py-4 text-center text-gray-500">Loading tickets...</td> </tr> </tbody> </table> </div> <!-- Empty State --> <div id="empty-tickets" class="hidden px-6 py-12 text-center"> <div class="flex flex-col items-center"> <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <p class="text-lg font-medium text-gray-900 mb-2">No support tickets found</p> <p class="text-gray-500">Support tickets will appear here when users create them</p> </div> </div> <!-- Pagination --> <div class="bg-white px-6 py-3 border-t border-gray-200"> <div class="flex items-center justify-between"> <div class="flex items-center space-x-2"> <span class="text-sm text-gray-700">Show</span> <select id="items-per-page" class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"> <option value="10">10</option> <option value="25">25</option> <option value="50">50</option> <option value="100">100</option> </select> <span class="text-sm text-gray-700">entries</span> </div> <div class="flex items-center space-x-2"> <button id="refresh-tickets" class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
Refresh
</button> <button id="prev-page" class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
Previous
</button> <div id="page-numbers" class="flex items-center space-x-1"> <!-- Page numbers will be generated dynamically --> </div> <button id="next-page" class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
Next
</button> </div> </div> </div> </div> <!-- Ticket Details Modal --> <div id="ticket-modal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"> <div class="flex items-start justify-center min-h-screen p-2 sm:p-4 py-4"> <div class="relative mx-auto border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white my-4 max-h-[calc(100vh-2rem)] flex flex-col"> <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 flex-shrink-0"> <h3 id="modal-title" class="text-lg font-medium text-gray-900">Ticket Details</h3> <button id="close-modal" class="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-4"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div id="modal-content" class="space-y-4 p-4 sm:p-5 overflow-y-auto flex-1 min-h-0"> <!-- Content will be populated by JavaScript --> <div class="text-center text-gray-500">
Loading ticket details...
</div> </div> </div> </div> </div> </div> ` })} `;
}, "D:/New/twenty_four_hour_app-main/src/pages/admin/support.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/admin/support.astro";
const $$url = "/admin/support";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Support,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
