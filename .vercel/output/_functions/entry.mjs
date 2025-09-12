import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_b5HCtx7n.mjs';
import { manifest } from './manifest_dsMgX58u.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/access-denied.astro.mjs');
const _page3 = () => import('./pages/admin/billing.astro.mjs');
const _page4 = () => import('./pages/admin/data.astro.mjs');
const _page5 = () => import('./pages/admin/orders.astro.mjs');
const _page6 = () => import('./pages/admin/profile.astro.mjs');
const _page7 = () => import('./pages/admin/settings.astro.mjs');
const _page8 = () => import('./pages/admin/support.astro.mjs');
const _page9 = () => import('./pages/admin/test.astro.mjs');
const _page10 = () => import('./pages/admin/users.astro.mjs');
const _page11 = () => import('./pages/admin.astro.mjs');
const _page12 = () => import('./pages/api/auth/login.astro.mjs');
const _page13 = () => import('./pages/api/auth/logout.astro.mjs');
const _page14 = () => import('./pages/api/auth/signup.astro.mjs');
const _page15 = () => import('./pages/api/cart/add.astro.mjs');
const _page16 = () => import('./pages/api/cart/count.astro.mjs');
const _page17 = () => import('./pages/api/cart/remove.astro.mjs');
const _page18 = () => import('./pages/api/checkout/create.astro.mjs');
const _page19 = () => import('./pages/auth/callback.astro.mjs');
const _page20 = () => import('./pages/cart.astro.mjs');
const _page21 = () => import('./pages/checkout/_orderid_.astro.mjs');
const _page22 = () => import('./pages/contact.astro.mjs');
const _page23 = () => import('./pages/dashboard.astro.mjs');
const _page24 = () => import('./pages/debug-profile.astro.mjs');
const _page25 = () => import('./pages/faq.astro.mjs');
const _page26 = () => import('./pages/forgot-password.astro.mjs');
const _page27 = () => import('./pages/login.astro.mjs');
const _page28 = () => import('./pages/orders.astro.mjs');
const _page29 = () => import('./pages/privacy.astro.mjs');
const _page30 = () => import('./pages/products/_slug_.astro.mjs');
const _page31 = () => import('./pages/products.astro.mjs');
const _page32 = () => import('./pages/profile.astro.mjs');
const _page33 = () => import('./pages/profile-test.astro.mjs');
const _page34 = () => import('./pages/reset-password.astro.mjs');
const _page35 = () => import('./pages/signup.astro.mjs');
const _page36 = () => import('./pages/support.astro.mjs');
const _page37 = () => import('./pages/terms.astro.mjs');
const _page38 = () => import('./pages/test-auth.astro.mjs');
const _page39 = () => import('./pages/test-fix.astro.mjs');
const _page40 = () => import('./pages/test-order-flow.astro.mjs');
const _page41 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/access-denied.astro", _page2],
    ["src/pages/admin/billing.astro", _page3],
    ["src/pages/admin/data.astro", _page4],
    ["src/pages/admin/orders.astro", _page5],
    ["src/pages/admin/profile.astro", _page6],
    ["src/pages/admin/settings.astro", _page7],
    ["src/pages/admin/support.astro", _page8],
    ["src/pages/admin/test.astro", _page9],
    ["src/pages/admin/users.astro", _page10],
    ["src/pages/admin/index.astro", _page11],
    ["src/pages/api/auth/login.ts", _page12],
    ["src/pages/api/auth/logout.ts", _page13],
    ["src/pages/api/auth/signup.ts", _page14],
    ["src/pages/api/cart/add.ts", _page15],
    ["src/pages/api/cart/count.ts", _page16],
    ["src/pages/api/cart/remove.ts", _page17],
    ["src/pages/api/checkout/create.ts", _page18],
    ["src/pages/auth/callback.astro", _page19],
    ["src/pages/cart.astro", _page20],
    ["src/pages/checkout/[orderId].astro", _page21],
    ["src/pages/contact.astro", _page22],
    ["src/pages/dashboard.astro", _page23],
    ["src/pages/debug-profile.astro", _page24],
    ["src/pages/faq.astro", _page25],
    ["src/pages/forgot-password.astro", _page26],
    ["src/pages/login.astro", _page27],
    ["src/pages/orders.astro", _page28],
    ["src/pages/privacy.astro", _page29],
    ["src/pages/products/[slug].astro", _page30],
    ["src/pages/products/index.astro", _page31],
    ["src/pages/profile.astro", _page32],
    ["src/pages/profile-test.astro", _page33],
    ["src/pages/reset-password.astro", _page34],
    ["src/pages/signup.astro", _page35],
    ["src/pages/support.astro", _page36],
    ["src/pages/terms.astro", _page37],
    ["src/pages/test-auth.astro", _page38],
    ["src/pages/test-fix.astro", _page39],
    ["src/pages/test-order-flow.astro", _page40],
    ["src/pages/index.astro", _page41]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
