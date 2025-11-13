/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_BYANwRK3.mjs';
import { g as getProducts } from '../chunks/products-data_-JT-YBVr.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getProducts();
  const processedProducts = products.map((product) => ({
    ...product,
    category: product.category || "other",
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, "-")
  })).filter(
    (product, index, self) => (
      // Remove duplicates based on id
      index === self.findIndex((p) => p.id === product.id)
    )
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Our Products - DevExpress", "description": "Explore our range of professional digital solutions delivered in 24 hours", "data-astro-cid-ttgomkr6": true }, { "default": async ($$result2) => renderTemplate`    ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100" data-astro-cid-ttgomkr6> <!-- Hero Section --> <section class="bg-blue-600 text-white py-20" data-astro-cid-ttgomkr6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-astro-cid-ttgomkr6> <h1 class="text-4xl md:text-5xl font-bold mb-6 text-white" style="color: #ffffff !important;" data-astro-cid-ttgomkr6>Our Products</h1> <p class="text-xl text-gray-200 max-w-3xl mx-auto" data-astro-cid-ttgomkr6>
Professional digital solutions crafted for your business needs. 
        Choose from our proven products, all delivered within 24 hours.
</p> </div> </section> <!-- Products Grid --> <section class="py-16 bg-white" data-astro-cid-ttgomkr6> <!-- Filter Section --> <div class="filter-section py-8 bg-white" data-astro-cid-ttgomkr6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-ttgomkr6> <div class="flex flex-wrap justify-center gap-4 mb-8" data-astro-cid-ttgomkr6> <button class="filter-btn active px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium transition-all border border-gray-300" data-filter="all" data-astro-cid-ttgomkr6>
All Products
</button> <button class="filter-btn px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium transition-all border border-gray-300" data-filter="restaurant" data-astro-cid-ttgomkr6>
Restaurant Menu
</button> <button class="filter-btn px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium transition-all border border-gray-300" data-filter="order-menu-system" data-astro-cid-ttgomkr6>
Order Menu System
</button> <button class="filter-btn px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium transition-all border border-gray-300" data-filter="mobile" data-astro-cid-ttgomkr6>
Mobile Apps
</button> <button class="filter-btn px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium transition-all border border-gray-300" data-filter="tv" data-astro-cid-ttgomkr6>
TV Apps
</button> <button class="filter-btn px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium transition-all border border-gray-300" data-filter="web" data-astro-cid-ttgomkr6>
Websites
</button> </div> </div> </div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-ttgomkr6> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="products-grid" data-astro-cid-ttgomkr6> ${processedProducts.map((product, index) => {
    const categoryLabels = {
      "restaurant": "Restaurant Menu",
      "mobile": "Mobile Apps",
      "tv": "TV Apps",
      "web": "Websites"
    };
    const categoryColors = {
      "restaurant": "from-green-500 to-emerald-600",
      "mobile": "from-blue-500 to-indigo-600",
      "tv": "from-purple-500 to-violet-600",
      "web": "from-orange-500 to-red-600"
    };
    const getProductLabel = (product2) => {
      if (product2.slug === "restaurant-website") return "Restaurant Website";
      if (product2.slug === "order-menu-system") return "Order Menu System";
      return categoryLabels[product2.category] || "Product";
    };
    return renderTemplate`<div class="product-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"${addAttribute(product.category, "data-category")}${addAttribute(product.id, "data-product-id")}${addAttribute(product.slug, "data-product-slug")}${addAttribute(product.name, "data-product-name")} data-astro-cid-ttgomkr6> <div class="relative rounded-t-xl overflow-hidden" style="height: 192px;" data-astro-cid-ttgomkr6> <img${addAttribute(product.featured_image, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover" data-astro-cid-ttgomkr6> <div${addAttribute(`category-badge absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${categoryColors[product.category]}`, "class")} data-astro-cid-ttgomkr6> ${getProductLabel(product)} </div> </div> <div class="p-6" data-astro-cid-ttgomkr6> <h3 class="text-xl font-bold text-black mb-2" data-astro-cid-ttgomkr6>${product.name}</h3> <p class="text-black font-medium mb-4" data-astro-cid-ttgomkr6>${product.short_description}</p> <div class="mb-4" data-astro-cid-ttgomkr6> <div class="flex flex-wrap gap-2" data-astro-cid-ttgomkr6> ${product.features.slice(0, 3).map((feature) => renderTemplate`<span class="px-2 py-1 bg-gray-100 text-black text-xs rounded-full font-medium" data-astro-cid-ttgomkr6>${feature}</span>`)} </div> </div> <div class="flex flex-col space-y-3" data-astro-cid-ttgomkr6> <div class="flex items-center justify-between" data-astro-cid-ttgomkr6> <div data-astro-cid-ttgomkr6> <span class="text-sm text-black font-medium" data-astro-cid-ttgomkr6>Starting from</span> <div class="text-2xl font-bold text-primary-600" data-astro-cid-ttgomkr6>₹${product.base_price.toLocaleString()}</div> </div> </div> <div class="flex justify-center" data-astro-cid-ttgomkr6> <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-center product-view-btn"${addAttribute(product.slug, "data-product-slug")}${addAttribute(product.name, "data-product-name")} data-astro-cid-ttgomkr6>
View Details
</button> </div> </div> </div> </div>`;
  })} </div> </div> </section> <!-- CTA Section --> <section class="py-16 bg-blue-600 text-white" data-astro-cid-ttgomkr6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-astro-cid-ttgomkr6> <h2 class="text-3xl font-bold mb-4" data-astro-cid-ttgomkr6>Need Something Custom?</h2> <p class="text-xl mb-8 opacity-90" data-astro-cid-ttgomkr6>
Don't see exactly what you need? Contact us for a custom solution tailored to your requirements.
</p> <a href="/contact?project_type=custom&project_details=I'm interested in a custom solution tailored to my specific requirements. Please provide more information about your custom development services." class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors" data-astro-cid-ttgomkr6>
Get Custom Quote
</a> <p class="text-xs text-gray-500 mt-2 text-center" data-astro-cid-ttgomkr6> <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ttgomkr6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-astro-cid-ttgomkr6></path> </svg>
Login required for quotes
</p> </div> </section> </div> ` })}   `;
}, "D:/New/twenty_four_hour_app-main/src/pages/products/index.astro", void 0);

const $$file = "D:/New/twenty_four_hour_app-main/src/pages/products/index.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
