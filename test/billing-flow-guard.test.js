import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read=n=>fs.readFileSync(new URL("../"+n,import.meta.url),"utf8");
const html=read("public/index.html"),app=read("public/app.js"),css=read("public/styles.css"),billing=read("src/billing.js");
test("the three Stripe plans and six monthly or annual checkout choices remain in the page",()=>{
 for(const plan of ["solo","team","business"])assert.ok(html.includes('data-billing-plan="'+plan+'"'),"Missing plan selector: "+plan);
 for(const price of ["solo_monthly","solo_annual","team_monthly","team_annual","business_monthly","business_annual"])assert.ok(html.includes('data-billing-price="'+price+'"'),"Missing checkout choice: "+price);
 assert.ok(html.includes('id="billingManage"'));
 assert.equal((html.match(/class="pricing-card/g)||[]).length,3,"The Stripe pricing section must contain exactly three company plans");
});
test("legacy visual scripts cannot replace Stripe checkout cards with static or mailto actions",()=>{
 const legacy=app.indexOf("ZERILYS final premium corrections — deterministic");
 const legacyGuard=app.indexOf('if(!document.querySelector("[data-billing-plan]"))',legacy);
 const rebuild=app.indexOf("Rebuild the four pricing cards",legacy);
 assert.ok(legacy>=0&&legacyGuard>legacy&&rebuild>legacyGuard,"Legacy card rebuild must be guarded by Stripe UI presence");
 const premium=app.indexOf("ZERILYS premium content consolidation");
 const premiumGuard=app.indexOf('if(!document.querySelector("[data-billing-plan]"))',premium);
 const premiumCards=app.indexOf("const data=[",premium);
 assert.ok(premium>=0&&premiumGuard>premium&&premiumCards>premiumGuard,"Legacy premium card content must be guarded");
 const mailto=app.indexOf("ZERILYS plan cards — guaranteed actions");
 const mailtoGuard=app.indexOf('if(document.querySelector("[data-billing-plan]"))return;',mailto);
 const mailtoCards=app.indexOf('document.querySelectorAll(".pricing-card")',mailto);
 assert.ok(mailto>=0&&mailtoGuard>mailto&&mailtoCards>mailtoGuard,"Legacy mailto plan actions must be disabled when Stripe plans exist");
});
test("checkout and portal actions reach authenticated Stripe endpoints",()=>{
 assert.ok(app.includes('api("/billing/checkout"'));
 assert.ok(app.includes('location.assign(r.url)'));
 assert.ok(app.includes('api("/billing/portal"'));
 assert.ok(app.includes('document.addEventListener("click"'));
 assert.ok(billing.includes('success_url:base+"/?billing=success&session_id={CHECKOUT_SESSION_ID}"'));
 assert.ok(billing.includes('cancel_url:base+"/?billing=cancelled"'));
 assert.ok(billing.includes('"automatic_tax[enabled]":"true"'));
 assert.ok(billing.includes('"tax_id_collection[enabled]":"true"'));
});
test("the three-plan grid is responsive and sized for three company plans",()=>{
 assert.ok(css.includes(".zerilys-billing-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}"));
 assert.ok(css.includes("@media(max-width:1050px){.zerilys-billing-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}"));
 assert.ok(css.includes("@media(max-width:560px){.zerilys-billing-grid{grid-template-columns:1fr!important}}"));
});
