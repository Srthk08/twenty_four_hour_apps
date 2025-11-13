/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_BYANwRK3.mjs';
import { g as getProducts } from '../chunks/products-data_-JT-YBVr.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error loading products:", error);
    products = [];
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "DevExpress - 24 Hour Development Company", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`    ${maybeRenderHead()}<div class="min-h-screen bg-white" data-astro-cid-j7pv25f6> <!-- Hero Section --> <section class="relative bg-blue-600 text-white overflow-hidden" data-astro-cid-j7pv25f6> <div class="absolute inset-0 bg-black opacity-20" data-astro-cid-j7pv25f6></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32" data-astro-cid-j7pv25f6> <div class="text-center" data-astro-cid-j7pv25f6> <h1 class="text-4xl md:text-6xl font-bold mb-6 text-white" style="color: #ffffff !important;" data-astro-cid-j7pv25f6>
Your App Ready in
<span class="text-white" style="color: #ffffff !important;" data-astro-cid-j7pv25f6>
24 Hours
</span> </h1> <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto" data-astro-cid-j7pv25f6>
Professional restaurant systems, mobile apps, and websites delivered lightning-fast. 
          No compromises on quality, just rapid results.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-j7pv25f6> <a href="/products" class="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg" data-astro-cid-j7pv25f6>
View Our Products
</a> <a href="#how-it-works" class="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 rounded-lg text-lg font-semibold how-it-works-btn" data-astro-cid-j7pv25f6>
How It Works
</a> </div> </div> </div> <!-- Floating Elements --> <div class="absolute top-20 left-10 w-20 h-20 bg-accent-500 rounded-full opacity-20" data-astro-cid-j7pv25f6></div> <div class="absolute bottom-20 right-10 w-16 h-16 bg-secondary-500 rounded-full opacity-20" data-astro-cid-j7pv25f6></div> </section> <!-- Stats Section --> <section class="py-16 bg-white" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <div class="text-4xl font-bold text-primary-600 mb-2" data-astro-cid-j7pv25f6>500+</div> <div class="text-black font-medium" data-astro-cid-j7pv25f6>Projects Delivered</div> </div> <div data-astro-cid-j7pv25f6> <div class="text-4xl font-bold text-primary-600 mb-2" data-astro-cid-j7pv25f6>24hrs</div> <div class="text-black font-medium" data-astro-cid-j7pv25f6>Average Delivery</div> </div> <div data-astro-cid-j7pv25f6> <div class="text-4xl font-bold text-primary-600 mb-2" data-astro-cid-j7pv25f6>98%</div> <div class="text-black font-medium" data-astro-cid-j7pv25f6>Client Satisfaction</div> </div> <div data-astro-cid-j7pv25f6> <div class="text-4xl font-bold text-primary-600 mb-2" data-astro-cid-j7pv25f6>24/7</div> <div class="text-black font-medium" data-astro-cid-j7pv25f6>Support Available</div> </div> </div> </div> </section> <!-- Products Section --> <section class="py-20" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="text-center mb-16" data-astro-cid-j7pv25f6> <h2 class="text-3xl md:text-4xl font-bold text-black mb-4" data-astro-cid-j7pv25f6>Our Products</h2> <p class="text-xl text-black font-medium max-w-3xl mx-auto" data-astro-cid-j7pv25f6>
Choose from our range of professional digital solutions, all delivered within 24 hours
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-astro-cid-j7pv25f6> ${products.map((product, index) => renderTemplate`<div class="product-card bg-white rounded-xl shadow-lg" data-astro-cid-j7pv25f6> <div class="relative rounded-t-xl overflow-hidden" style="height: 192px;" data-astro-cid-j7pv25f6> <img${addAttribute(product.featured_image, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover" loading="eager" decoding="async" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDMwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgODBMMTgwIDExMEgxMjBMMTUwIDgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjAiIHI9IjEwIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+Cg=='" data-astro-cid-j7pv25f6> </div> <div class="p-6" data-astro-cid-j7pv25f6> <h3 class="text-xl font-semibold text-black mb-2" data-astro-cid-j7pv25f6>${product.name}</h3> <p class="text-black font-medium mb-4 text-sm" data-astro-cid-j7pv25f6>${product.short_description}</p> <div class="flex items-center justify-between" data-astro-cid-j7pv25f6> <span class="text-2xl font-bold text-primary-600" data-astro-cid-j7pv25f6>
₹${product.base_price.toLocaleString()} </span> <a${addAttribute(`/products/${product.slug}`, "href")} class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium" data-astro-cid-j7pv25f6>
View Details
</a> </div> </div> </div>`)} </div> </div> </section> <!-- How It Works Section --> <section id="how-it-works" class="py-20 bg-white" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="text-center mb-16" data-astro-cid-j7pv25f6> <h2 class="text-3xl md:text-4xl font-bold text-black mb-4" data-astro-cid-j7pv25f6>How It Works</h2> <p class="text-xl text-black font-medium max-w-3xl mx-auto" data-astro-cid-j7pv25f6>
Our streamlined process ensures rapid delivery without compromising quality
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-j7pv25f6> <div class="text-center" data-astro-cid-j7pv25f6> <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-j7pv25f6> <span class="text-2xl font-bold text-primary-600" data-astro-cid-j7pv25f6>1</span> </div> <h3 class="text-xl font-semibold text-black mb-4" data-astro-cid-j7pv25f6>Choose & Order</h3> <p class="text-black font-medium" data-astro-cid-j7pv25f6>
Select your product, choose a plan, and provide your requirements. 
            Our smart forms collect everything we need to get started.
</p> </div> <div class="text-center" data-astro-cid-j7pv25f6> <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-j7pv25f6> <span class="text-2xl font-bold text-secondary-600" data-astro-cid-j7pv25f6>2</span> </div> <h3 class="text-xl font-semibold text-black mb-4" data-astro-cid-j7pv25f6>We Build</h3> <p class="text-black font-medium" data-astro-cid-j7pv25f6>
Our expert team immediately starts working on your project using 
            proven templates and rapid development methodologies.
</p> </div> <div class="text-center" data-astro-cid-j7pv25f6> <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-j7pv25f6> <span class="text-2xl font-bold text-accent-600" data-astro-cid-j7pv25f6>3</span> </div> <h3 class="text-xl font-semibold text-black mb-4" data-astro-cid-j7pv25f6>Delivered</h3> <p class="text-black font-medium" data-astro-cid-j7pv25f6>
Within 24 hours, receive your fully functional application with 
            documentation and ongoing support included.
</p> </div> </div> </div> </section> <!-- Why Choose Us Section --> <section class="py-20" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h2 class="text-3xl md:text-4xl font-bold text-black mb-6" data-astro-cid-j7pv25f6>
Why Choose DevExpress?
</h2> <div class="space-y-6" data-astro-cid-j7pv25f6> <div class="flex items-start space-x-4" data-astro-cid-j7pv25f6> <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-j7pv25f6></path> </svg> </div> <div data-astro-cid-j7pv25f6> <h3 class="text-lg font-semibold text-black mb-2" data-astro-cid-j7pv25f6>Lightning Fast Delivery</h3> <p class="text-black font-medium" data-astro-cid-j7pv25f6>Our proven development process and pre-built components enable 24-hour delivery without quality compromise.</p> </div> </div> <div class="flex items-start space-x-4" data-astro-cid-j7pv25f6> <div class="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-j7pv25f6></path> </svg> </div> <div data-astro-cid-j7pv25f6> <h3 class="text-lg font-semibold text-black mb-2" data-astro-cid-j7pv25f6>Professional Quality</h3> <p class="text-black font-medium" data-astro-cid-j7pv25f6>Every project is built by experienced developers using industry best practices and modern technologies.</p> </div> </div> <div class="flex items-start space-x-4" data-astro-cid-j7pv25f6> <div class="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" data-astro-cid-j7pv25f6></path> </svg> </div> <div data-astro-cid-j7pv25f6> <h3 class="text-lg font-semibold text-black mb-2" data-astro-cid-j7pv25f6>Ongoing Support</h3> <p class="text-black font-medium" data-astro-cid-j7pv25f6>Get 30 days of free support and maintenance, plus affordable long-term support options.</p> </div> </div> </div> </div> <div class="relative" data-astro-cid-j7pv25f6> <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" alt="Development team" class="rounded-lg shadow-xl" data-astro-cid-j7pv25f6> <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg" data-astro-cid-j7pv25f6> <div class="text-2xl font-bold text-primary-600" data-astro-cid-j7pv25f6>24hrs</div> <div class="text-sm text-black font-medium" data-astro-cid-j7pv25f6>Average Delivery</div> </div> </div> </div> </div> </section> <!-- CTA Section --> <section class="py-20 bg-blue-600 text-white" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-astro-cid-j7pv25f6> <h2 class="text-3xl md:text-4xl font-bold mb-6" data-astro-cid-j7pv25f6>
Ready to Get Started?
</h2> <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90" data-astro-cid-j7pv25f6>
Join hundreds of satisfied clients who got their digital solutions delivered in just 24 hours.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-j7pv25f6> <a href="/products" class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg" data-astro-cid-j7pv25f6>
Browse Products
</a> <a href="/contact" class="contact-us-btn border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all" data-astro-cid-j7pv25f6>
Contact Us
</a> </div> </div> </section> </div> ` })}  `;
}, "D:/New/twenty_four_hour_app-main/src/pages/index.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
