import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read=n=>fs.readFileSync(new URL("../"+n,import.meta.url),"utf8");
const fr=read("public/beta-terms.html"),en=read("public/beta-terms-en.html"),pfr=read("public/privacy-notice.html"),pen=read("public/privacy-notice-en.html"),lfr=read("public/legal-notice.html"),len=read("public/legal-notice-en.html");
test("French and English terms accurately disclose active company subscriptions",()=>{
 assert.ok(fr.includes("Les comptes entreprise peuvent souscrire aux formules présentées dans l’interface."));
 assert.ok(en.includes("Company accounts can subscribe to the plans displayed in the interface."));
 assert.doesNotMatch(fr,/Aucun abonnement, paiement ou achat intégré n’est activé/);
 assert.doesNotMatch(en,/No subscription or Stripe payment is active/);
 assert.ok(fr.includes("La TVA applicable est calculée et affichée au moment du paiement."));
 assert.ok(en.includes("Applicable VAT is calculated and shown at checkout."));
});
test("both privacy notices link to Stripe's privacy policy and disclose payment processing",()=>{
 assert.ok(pfr.includes('href="https://stripe.com/privacy"'));
 assert.ok(pen.includes('href="https://stripe.com/privacy"'));
 assert.ok(pfr.includes("sont transmises à Stripe"));
 assert.ok(pen.includes("shared with Stripe as the payment service provider"));
 assert.doesNotMatch(pfr,/Aucun paiement, abonnement ni prestataire de paiement n’est activé/);
 assert.doesNotMatch(pen,/No payment, subscription or payment provider is enabled/);
});
test("legal notices and terms are dated consistently",()=>{
 assert.ok(lfr.includes("Dernière mise à jour : 14 novembre 2026"));
 assert.ok(len.includes("Last updated: 14 November 2026"));
 assert.ok(fr.includes("Mise à jour : 14 novembre 2026"));
 assert.ok(en.includes("Updated: 14 November 2026"));
});
