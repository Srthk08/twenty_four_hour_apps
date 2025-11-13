import { c as createComponent, b as createAstro, m as maybeRenderHead, e as addAttribute, d as renderSlot, a as renderTemplate } from './astro/server_BvwHy5xa.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$AuthGuard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthGuard;
  const { redirectTo = "/login" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="auth-guard"${addAttribute(redirectTo, "data-redirect-to")}> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "D:/New/twenty_four_hour_app-main/src/components/AuthGuard.astro", void 0);

export { $$AuthGuard as $ };
