/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_BYANwRK3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [];
}
const $$orderId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$orderId;
  const { orderId } = Astro2.params;
  const mockOrder = {
    order_number: "ORD-2024-003",
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    order_items: [
      {
        id: "item-1",
        product: {
          name: "Restaurant Menu System",
          featured_image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
        },
        plan: {
          name: "Professional",
          description: "Advanced menu with ordering",
          price: 25e3,
          delivery_days: 1
        },
        quantity: 1,
        unit_price: 25e3,
        total_price: 25e3
      },
      {
        id: "item-2",
        product: {
          name: "Android TV App Development",
          featured_image: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg"
        },
        plan: {
          name: "Professional",
          description: "Advanced TV app with CMS",
          price: 65e3,
          delivery_days: 1
        },
        quantity: 1,
        unit_price: 65e3,
        total_price: 65e3
      }
    ]
  };
  const subtotal = mockOrder.order_items.reduce((sum, item) => sum + item.total_price, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Checkout - DevExpress" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-12 bg-gray-50 min-h-screen"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Header --> <div class="text-center mb-8"> <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1> <p class="text-gray-600">Order #${mockOrder.order_number}</p> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> <!-- Order Summary --> <div class="bg-white rounded-lg shadow-sm p-6"> <h2 class="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2> <div class="space-y-4 mb-6"> ${mockOrder.order_items.map((item) => renderTemplate`<div class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"> <img${addAttribute(item.product.featured_image, "src")}${addAttribute(item.product.name, "alt")} class="w-16 h-16 object-cover rounded-lg"> <div class="flex-1"> <h3 class="font-semibold text-gray-900">${item.product.name}</h3> <p class="text-sm text-gray-600">${item.plan.name}</p> <p class="text-xs text-gray-500">${item.plan.description}</p> </div> <div class="text-right"> <div class="text-lg font-semibold text-gray-900">₹${item.total_price.toLocaleString()}</div> <div class="text-sm text-gray-500">Qty: ${item.quantity}</div> </div> </div>`)} </div> <div class="border-t pt-4 space-y-2"> <div class="flex justify-between"> <span class="text-gray-600">Subtotal</span> <span class="font-medium">₹${subtotal.toLocaleString()}</span> </div> <div class="flex justify-between"> <span class="text-gray-600">GST (18%)</span> <span class="font-medium">₹${tax.toLocaleString()}</span> </div> <div class="border-t pt-2"> <div class="flex justify-between"> <span class="text-lg font-semibold">Total</span> <span class="text-lg font-semibold">₹${total.toLocaleString()}</span> </div> </div> </div> </div> <!-- Payment Form --> <div class="bg-white rounded-lg shadow-sm p-6"> <h2 class="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2> <form id="payment-form" class="space-y-6"> <!-- Contact Information --> <div> <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3> <div class="grid grid-cols-1 gap-4"> <div> <label for="email" class="block text-sm font-medium text-gray-700">Email</label> <input type="email" id="email" name="email" value="test@example.com" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"> </div> <div> <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label> <input type="tel" id="phone" name="phone" value="+91 9876543210" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"> </div> </div> </div> <!-- Project Requirements --> <div> <h3 class="text-lg font-medium text-gray-900 mb-4">Project Requirements</h3> <div class="space-y-4"> <div> <label for="project_name" class="block text-sm font-medium text-gray-700">Project Name</label> <input type="text" id="project_name" name="project_name" placeholder="Enter your project name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"> </div> <div> <label for="requirements" class="block text-sm font-medium text-gray-700">Special Requirements</label> <textarea id="requirements" name="requirements" rows="4" placeholder="Describe any specific requirements, features, or customizations you need..." class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea> </div> </div> </div> <!-- Payment Method --> <div> <h3 class="text-lg font-medium text-gray-900 mb-4">Payment Method</h3> <div class="space-y-3"> <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"> <input type="radio" name="payment_method" value="razorpay" checked class="text-primary-600 focus:ring-primary-500"> <div class="ml-3 flex-1"> <div class="flex items-center justify-between"> <span class="font-medium text-gray-900">Credit/Debit Card</span> <div class="flex space-x-2"> <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" class="h-6"> <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="h-6"> </div> </div> <p class="text-sm text-gray-600">Secure payment via Razorpay</p> </div> </label> <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"> <input type="radio" name="payment_method" value="upi" class="text-primary-600 focus:ring-primary-500"> <div class="ml-3 flex-1"> <div class="flex items-center justify-between"> <span class="font-medium text-gray-900">UPI</span> <span class="text-sm text-gray-600">GPay, PhonePe, Paytm</span> </div> <p class="text-sm text-gray-600">Pay using your UPI ID</p> </div> </label> </div> </div> <!-- Terms --> <div class="flex items-start"> <input type="checkbox" id="terms" name="terms" required class="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"> <label for="terms" class="ml-2 text-sm text-gray-600">
I agree to the <a href="/terms" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
and understand that development will begin immediately after payment confirmation.
</label> </div> <!-- Submit Button --> <button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
Pay ₹${total.toLocaleString()} & Start Development
</button> </form> <!-- Security Notice --> <div class="mt-6 p-4 bg-green-50 rounded-lg"> <div class="flex items-center space-x-2"> <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> <span class="text-sm font-medium text-green-800">Secure Payment</span> </div> <p class="text-sm text-green-700 mt-1">
Your payment information is encrypted and secure. We never store your card details.
</p> </div> </div> </div> </div> </section> ` })} `;
}, "D:/New/twenty_four_hour_app-main/src/pages/checkout/[orderId].astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/checkout/[orderId].astro";
const $$url = "/checkout/[orderId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$orderId,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
