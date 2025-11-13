/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_BYANwRK3.mjs';
export { renderers } from '../renderers.mjs';

const $$OrderSuccess = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Order Success - Congratulations!" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4"> <div class="max-w-2xl w-full"> <!-- Success Card --> <div class="bg-white rounded-2xl shadow-2xl p-8 text-center"> <!-- Success Icon --> <div class="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"> <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <!-- Success Message --> <h1 class="text-4xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h1> <h2 class="text-2xl font-semibold text-green-600 mb-6">Your Order Has Been Placed Successfully!</h2> <!-- Order Details --> <div class="bg-gray-50 rounded-lg p-6 mb-8"> <h3 class="text-lg font-semibold text-gray-800 mb-4">Order Details</h3> <div class="space-y-3 text-left"> <div class="flex justify-between"> <span class="text-gray-600">Product:</span> <span class="font-medium text-gray-900">Order Menu System</span> </div> <div class="flex justify-between"> <span class="text-gray-600">Amount:</span> <span class="font-medium text-gray-900">₹999</span> </div> <div class="flex justify-between"> <span class="text-gray-600">Status:</span> <span class="font-medium text-green-600">Payment Completed</span> </div> <div class="flex justify-between"> <span class="text-gray-600">Order Date:</span> <span class="font-medium text-gray-900" id="order-date"></span> </div> </div> </div> <!-- Next Steps --> <div class="bg-blue-50 rounded-lg p-6 mb-8"> <h3 class="text-lg font-semibold text-blue-800 mb-4">What Happens Next?</h3> <div class="space-y-3 text-left text-blue-700"> <div class="flex items-start"> <div class="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"> <span class="text-xs font-bold text-blue-800">1</span> </div> <p>Our team will review your customization requirements within 24 hours</p> </div> <div class="flex items-start"> <div class="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"> <span class="text-xs font-bold text-blue-800">2</span> </div> <p>We'll contact you via email to confirm project details and timeline</p> </div> <div class="flex items-start"> <div class="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"> <span class="text-xs font-bold text-blue-800">3</span> </div> <p>Your Order Menu System will be delivered within 1-2 business days</p> </div> </div> </div> <!-- Contact Information --> <div class="bg-amber-50 rounded-lg p-6 mb-8"> <h3 class="text-lg font-semibold text-amber-800 mb-4">Need Help?</h3> <p class="text-amber-700 mb-4">If you have any questions about your order, feel free to contact us:</p> <div class="space-y-2 text-amber-700"> <p><strong>Email:</strong> support@yourcompany.com</p> <p><strong>Phone:</strong> +91 9876543210</p> <p><strong>Response Time:</strong> Within 2 hours during business hours</p> </div> </div> <!-- Action Buttons --> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/dashboard" class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
Go to Dashboard
</a> <a href="/orders" class="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
View All Orders
</a> <a href="/products" class="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
Browse More Products
</a> </div> <!-- Thank You Message --> <div class="mt-8 pt-6 border-t border-gray-200"> <p class="text-gray-600 text-lg">
Thank you for choosing our services! We're excited to work on your project. 🚀
</p> </div> </div> </div> </div> ` })} `;
}, "D:/New/twenty_four_hour_app-main/src/pages/order-success.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/order-success.astro";
const $$url = "/order-success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$OrderSuccess,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
