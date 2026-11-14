import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.argv[2]||"zeri_work18"),read=n=>fs.readFileSync(path.join(root,n),"utf8"),write=(n,s)=>fs.writeFileSync(path.join(root,n),s);
const replace=(s,a,b,label)=>{if(s.includes(b))return s;const n=s.split(a).length-1;if(n!==1)throw Error(label+" expected one occurrence, found "+n);return s.replace(a,b);};
const corrected="Les tarifs applicables sont affichés avant la souscription. Les montants sont hors taxes ; la TVA applicable est calculée au paiement. L’accès candidat reste gratuit.";
let home=read("public/index.html");
home=home.replaceAll("<small>BEYOND THE CV.</small>","<small>INTELLIGENCE DES TALENTS</small>");
home=replace(home,'<h1>Les compétences réelles.<br><em>Au-delà du CV.</em></h1><p class="hero-text">Révélez vos compétences, trouvez un stage, une alternance, un emploi ou des partenaires de projet.</p>','<h1>Les compétences, prouvées.<br><em>Pas seulement déclarées.</em></h1><p class="hero-text">Un réseau professionnel pour relier compétences, réalisations et opportunités.</p>',"homepage hero copy");
write("public/index.html",home);
let app=read("public/app.js");
for(const stale of [
"Offre Business standard : 179 € HT/mois ou 1 790 € HT/an. Tarifs partenaires bêta garantis 12 mois : Solo 29 € · Team 69 € · Business 139 € HT/mois. Aucun paiement en ligne n’est activé.",
"Tarifs partenaires bêta (engagement de 12 mois) : Solo 29 € HT/mois · Team 69 € HT/mois · Business 139 € HT/mois. Offre Business standard : 179 € HT/mois ou 1 790 € HT/an. Aucun paiement en ligne n’est activé.",
"Tarifs partenaires bêta : Solo 29 € HT/mois · Team 69 € HT/mois · Business 139 € HT/mois, prix garantis pendant 12 mois. Offre Business standard : 179 € HT/mois ou 1 790 € HT/an. Offre Entreprise : sur devis."
]) app=app.replaceAll(stale,corrected);
if(/Aucun paiement en ligne n’est activé|Aucun paiement ni abonnement Stripe n’est actif|Tarifs partenaires bêta|Solo 29 € HT|Team 69 € HT|Business 139 € HT/.test(app))throw Error("Outdated billing copy remains in app.js");
// Preserve the Stripe checkout controls from older visual scripts that used to rebuild
// the pricing cards as static content or replace them with mailto links.
const pricingStartMarker="    // Rebuild the four pricing cards as a compact, readable French price list.\n    const cards = [...document.querySelectorAll(\".pricing-card\")];";
const pricingStart=app.indexOf(pricingStartMarker);
const coreMarker='    const core = document.querySelector(".candidate-core");';
const pricingEnd=app.indexOf(coreMarker,pricingStart);
if(pricingStart<0||pricingEnd<0)throw Error("Legacy pricing rebuild markers not found");
if(!app.slice(pricingStart,pricingEnd).includes('if(!document.querySelector("[data-billing-plan]"))')){
 const legacy=app.slice(pricingStart,pricingEnd);
 app=app.slice(0,pricingStart)+'    if(!document.querySelector("[data-billing-plan]")) {\n'+legacy+'    }\n'+app.slice(pricingEnd);
}
const consolidationMarker="/* ZERILYS premium content consolidation */";
const consolidationAt=app.indexOf(consolidationMarker);
const dataStart=app.indexOf("   const data=[",consolidationAt);
const dataEnd=app.indexOf("\n };",dataStart);
if(consolidationAt<0||dataStart<0||dataEnd<0)throw Error("Legacy premium pricing consolidation markers not found");
if(!app.slice(dataStart,dataEnd).includes('if(!document.querySelector("[data-billing-plan]"))')){
 const legacy=app.slice(dataStart,dataEnd);
 app=app.slice(0,dataStart)+'   if(!document.querySelector("[data-billing-plan]")) {\n'+legacy+'\n   }\n'+app.slice(dataEnd);
}
const actionMarker="/* ZERILYS plan cards — guaranteed actions */";
const actionAt=app.indexOf(actionMarker);
const bindMarker=" const bind=()=>{";
const bindAt=app.indexOf(bindMarker,actionAt);
if(actionAt<0||bindAt<0)throw Error("Legacy mailto plan action markers not found");
const guard='\n  if(document.querySelector("[data-billing-plan]"))return;';
if(!app.slice(bindAt,bindAt+bindMarker.length+guard.length+8).includes("data-billing-plan")){
 const pos=bindAt+bindMarker.length;
 app=app.slice(0,pos)+guard+app.slice(pos);
}
write("public/app.js",app);
let i18n=read("public/i18n.js");
if(!i18n.includes("ZERILYS_AUDIT_BILLING_LANGUAGE")){
const additions={
  [corrected]:"Applicable prices are shown before subscription. Prices exclude VAT; applicable VAT is calculated at checkout. Candidate access is free.",
  "INTELLIGENCE DES TALENTS":"TALENT INTELLIGENCE",
  "Les compétences, prouvées.":"Skills, proven.",
  "Pas seulement déclarées.":"Not just claimed.",
  "Un réseau professionnel pour relier compétences, réalisations et opportunités.":"A professional network connecting skills, evidence and opportunities.",
  "Le bon cadre pour":"The right plan to",
  "faire grandir vos recrutements.":"grow your recruiting.",
  "Choisissez votre formule. Les tarifs s’affichent après sélection.":"Choose your plan. Prices appear after selection.",
  "INDÉPENDANT":"INDEPENDENT",
  "Continuer au mois":"Continue monthly",
  "Continuer à l’année":"Continue annually",
  "179 € HT / mois":"€179 excl. VAT / month",
  "Prix hors taxes. La TVA applicable est calculée au paiement. L’accès candidat reste gratuit.":"Prices exclude VAT. Applicable VAT is calculated at checkout. Candidate access is free.",
  "Choisissez une formule.":"Choose a plan.",
  "Gérer mon abonnement":"Manage my subscription",
  "Les abonnements sont réservés aux comptes entreprise. L’accès candidat reste gratuit.":"Subscriptions are reserved for company accounts. Candidate access is free.",
  "Un abonnement actif est nécessaire pour inviter des membres.":"An active subscription is required to invite team members.",
  "Un abonnement actif est nécessaire pour publier une offre.":"An active subscription is required to publish an offer."
};
const profileTranslations={
  "PROFILE CONFIGURATION": "CONFIGURATION DU PROFIL",
  "YOUR PROFILE FIELD": "VOTRE ESPACE PROFIL",
  "TALENT INTELLIGENCE": "INTELLIGENCE DES TALENTS",
  "✓ Verified background": "✓ Parcours vérifié",
  "The elements that add depth to your profile": "Les éléments qui donnent de la profondeur à votre profil",
  "Complete my profile ↗": "Compléter mon profil ↗",
  "Living professional identity": "Identité professionnelle vivante",
  "Interactive capability constellation": "Constellation interactive des compétences",
  "Professional experience": "Parcours professionnel",
  "Add experience": "Ajouter une expérience",
  "Education": "Formation",
  "Add education": "Ajouter une formation",
  "Verify my qualification or equivalency": "Vérifier mon diplôme ou mon équivalence",
  "The “Verified background” badge is only awarded after a human review of the supporting document. You may hide unnecessary information before submission.": "Le badge « Parcours vérifié » n’est attribué qu’après contrôle humain du justificatif. Vous pouvez masquer les informations non nécessaires avant l’envoi.",
  "Completed or ongoing qualification": "Diplôme obtenu ou en cours",
  "Equivalency through experience / certification": "Équivalence par expérience / certification",
  "Submit supporting document for verification": "Soumettre le justificatif pour vérification",
  "Skill to add": "Compétence à ajouter",
  "Enter any skill: technical, professional, interpersonal or industry-specific.": "Écrivez librement une compétence : technique, métier, relationnelle ou sectorielle.",
  "Job title": "Intitulé du poste",
  "Field (e.g. risk, data)": "Domaine (ex. risque, data)",
  "Responsibilities, achievements, context": "Responsabilités, réalisations, contexte",
  "Degree / qualification": "Diplôme / formation",
  "Institution": "Établissement",
  "Field of study": "Spécialité",
  "Level (e.g. Master's)": "Niveau (ex. Master)",
  "Degree or equivalency (e.g. MSc Finance)": "Diplôme ou équivalence (ex. Master Finance)",
  "Institution / awarding body": "Établissement / organisme",
  "Level (e.g. postgraduate)": "Niveau (ex. Bac+5)",
  "E.g. financial analysis, portfolio management, Excel…": "Ex. : analyse financière, gestion de portefeuille, Excel…",
  "Proficiency level": "Niveau de maîtrise",
  "Your profile updates as you add skills, evidence and intentions. Select a signal to explore each dimension.": "Votre profil évolue à mesure que vous ajoutez des compétences, des preuves et des intentions. Sélectionnez un signal pour explorer chaque dimension.",
  "At least one qualification or equivalency has been verified by an authorised reviewer.": "Au moins un diplôme ou une équivalence a été vérifié par un évaluateur habilité.",
  "No verified qualification or equivalency yet.": "Aucun diplôme ou équivalence vérifié.",
  "No AI use declared": "Aucune IA déclarée",
  "No evidence linked yet. Add a project, credential or work sample to support this capability.": "Aucune preuve associée pour le moment. Ajoutez un projet, un diplôme ou un exemple de réalisation pour étayer cette compétence.",
  "This capability is part of your professional identity.": "Cette compétence fait partie de votre identité professionnelle.",
  "Demonstrate your skills.": "Démontrez vos compétences.",
  "Awaiting verification": "En attente de vérification",
  "AI permitted": "IA autorisée",
  "AI not permitted during this assessment": "IA non autorisée pendant l’évaluation",
  "AI used": "IA utilisée",
  "Could not save the result.": "Impossible d’enregistrer le résultat.",
  "Additional information required": "Informations complémentaires requises",
  "The ability to use, verify and explain AI outputs is part of the skills being assessed.": "La capacité à utiliser, vérifier et expliquer les résultats de l’IA fait partie des compétences évaluées.",
  "Location not specified": "Localisation non renseignée",
  "Your company identity is separate from your personal profile. Opportunities are visible only after company verification.": "L’identité de votre entreprise est distincte de votre profil personnel. Les opportunités ne sont visibles qu’après vérification de l’entreprise.",
  "AI use is permitted during assessments for this opportunity.": "L’utilisation de l’IA est autorisée pendant les évaluations liées à cette offre.",
  "AI use is not permitted during assessments for this opportunity.": "L’utilisation de l’IA est interdite pendant les évaluations liées à cette offre.",
  "Not specified": "Non précisé",
  "Not provided": "Non renseignée",
  "OPEN TO OPPORTUNITIES": "OUVERT AUX OPPORTUNITÉS",
  "Present your approach, assumptions, calculations or supporting evidence, limitations and recommendations…": "Présentez votre démarche, vos hypothèses, vos calculs ou éléments de preuve, vos limites et vos recommandations…",
  "Rejected": "Refusé",
  "A missing result is not a zero score.": "Un résultat manquant n’est pas une note nulle.",
  "AI use expected and assessed": "Usage de l’IA attendu et évalué",
  "Your profile is visible to ZERILYS members and through its public link. You can restrict visibility to signed-in members at any time.": "Votre profil est visible des membres ZERILYS et via son lien public. Vous pouvez limiter sa visibilité aux visiteurs non connectés à tout moment.",
  "You can structure your response with headings.": "Vous pouvez structurer votre réponse avec des titres.",
  "Verified": "Vérifié",
  "Add a skill first.": "Saisissez d’abord une compétence.",
  "Your profile has been saved and refreshed across your workspaces.": "Votre profil a bien été enregistré et actualisé dans vos espaces.",
  "The server did not confirm the save. Please try again.": "Le serveur n’a pas confirmé l’enregistrement. Réessayez.",
  "Professional profile saved and refreshed.": "Votre profil a bien été enregistré et actualisé dans vos espaces.",
  "Evidence item": "élément associé",
  "Evidence items": "éléments associés",
  "VERIFIED WITH EVIDENCE": "ÉTAYÉE PAR DES PREUVES",
  "Exchange with the team": "Échanger avec l’équipe"
};
const block='  // ZERILYS_AUDIT_BILLING_LANGUAGE\n  Object.assign(fr,'+JSON.stringify(profileTranslations,null,2)+');\n  Object.assign(en,Object.fromEntries(Object.entries(profileTranslations).map(([source,translated])=>[translated,source])));\n  Object.assign(en,'+JSON.stringify(additions,null,2)+');\n';
i18n=replace(i18n,'  let language = "fr";',block+'  let language = "fr";',"language dictionary");write("public/i18n.js",i18n);
}
let fr=read("public/beta-terms.html");
fr=replace(fr,'<h2>7. Gratuité actuelle et évolution commerciale</h2><p>La version bêta actuellement proposée ne donne lieu à aucun paiement. Aucun abonnement ni paiement Stripe n’est actif. Si une offre payante est introduite, son prix, sa durée, ses modalités de résiliation et ses conditions particulières seront présentés avant toute commande et feront l’objet de conditions mises à jour.</p>','<h2>7. Offres, abonnements et facturation</h2><p>Les fonctionnalités destinées aux candidats restent gratuites. Les comptes entreprise peuvent souscrire aux formules Solo, Team ou Entreprise lorsqu’elles sont proposées dans l’interface. Le prix, la périodicité et les caractéristiques de l’offre sélectionnée sont présentés avant validation de la commande.</p><p>Les formules Solo et Team sont proposées mensuellement ou annuellement aux tarifs affichés dans l’interface, en euros hors taxes. La formule Entreprise peut faire l’objet d’une proposition commerciale spécifique. La TVA applicable est calculée et affichée au moment du paiement.</p><p>Le paiement et la gestion de l’abonnement sont opérés au moyen de Stripe. En validant la commande sur la page de paiement, l’entreprise autorise le paiement et, pour une formule récurrente, les renouvellements selon la périodicité choisie. L’abonnement peut être résilié depuis l’espace de gestion accessible dans ZERILYS ; sauf indication contraire présentée lors de la commande, la résiliation prend effet à la fin de la période déjà payée.</p><p>Les droits impératifs dont bénéficie éventuellement le client, selon sa qualité et les circonstances de la souscription, demeurent applicables.</p>',"French terms");
fr=fr.replace("Version 1.0 — Mise à jour : 13 novembre 2026 — Service en bêta gratuite","Version 1.1 — Mise à jour : 14 novembre 2026 — Service en bêta");write("public/beta-terms.html",fr);
let en=read("public/beta-terms-en.html");
en=replace(en,'<section><h2>7. Current free access and future commercial terms</h2><p>The current beta version is provided free of charge. No subscription or Stripe payment is active. If a paid offer is introduced, its price, duration, cancellation terms and specific conditions will be presented before any order is placed, and the terms will be updated accordingly.</p></section>','<section><h2>7. Plans, subscriptions and billing</h2><p>Candidate-facing features remain free of charge. Company accounts may subscribe to the Solo, Team or Enterprise plans when those plans are made available in the interface. The selected plan, price, billing interval and included features are displayed before the order is confirmed.</p><p>Solo and Team plans are offered monthly or annually at the prices displayed in the interface, in euros excluding VAT. The Enterprise plan may be subject to a separate commercial proposal. Applicable VAT is calculated and shown at checkout.</p><p>Payment and subscription management are provided through Stripe. By confirming an order on the checkout page, the company authorises the payment and, for a recurring plan, renewals at the selected billing interval. The subscription can be cancelled through the management area available from ZERILYS; unless otherwise stated at checkout, cancellation takes effect at the end of the already-paid billing period.</p><p>Any mandatory rights that may apply to the customer depending on its legal status and the circumstances of the subscription remain unaffected.</p></section>',"English terms");
en=en.replace("Version 1.0 — Updated: 13 November 2026 — Free beta service","Version 1.1 — Updated: 14 November 2026 — Beta service");
en=en.replace("ZERILYS is currently provided free of charge for testing and improvement. No subscription, payment or in-app purchase is enabled. Any future paid offers will be subject to separate terms and clear pricing information before a subscription is made.","Candidate-facing features are provided free of charge. Company subscriptions may be offered through the plans and checkout flow displayed in the service. The applicable plan, price, billing interval and terms are shown before an order is confirmed.");write("public/beta-terms-en.html",en);
let pfr=read("public/privacy-notice.html");
pfr=replace(pfr,"Aucun paiement, abonnement ni prestataire de paiement n’est activé dans la bêta.","Les abonnements entreprise et leur paiement peuvent être proposés dans l’application. Lorsqu’un utilisateur souscrit, les données nécessaires à la transaction (identifiants de compte, informations de facturation, statut et références de paiement) sont transmises à Stripe, prestataire de paiement. Les données complètes de carte bancaire sont saisies et traitées par Stripe et ne sont pas stockées par ZERILYS. Consultez la politique de confidentialité de Stripe pour connaître ses traitements propres.","French privacy");
pfr=pfr.replace("Version 1.0 — Mise à jour : 13 novembre 2026","Version 1.1 — Mise à jour : 14 novembre 2026");write("public/privacy-notice.html",pfr);
let pen=read("public/privacy-notice-en.html");
pen=replace(pen,"No payment, subscription or payment provider is enabled during the beta.","Company subscriptions and payment may be offered through the application. When a user subscribes, the information required for the transaction (account identifiers, billing information, payment status and transaction references) is shared with Stripe as the payment service provider. Full card details are entered and processed by Stripe and are not stored by ZERILYS. Please consult Stripe’s privacy policy for information about its own processing.","English privacy");
pen=pen.replace("Version 1.0 — Updated: 13 November 2026","Version 1.1 — Updated: 14 November 2026");write("public/privacy-notice-en.html",pen);
const test='import test from "node:test";\nimport assert from "node:assert/strict";\nimport fs from "node:fs";\nconst read=n=>fs.readFileSync(new URL("../public/"+n,import.meta.url),"utf8");\ntest("FR/EN terms disclose Stripe subscriptions and cancellation",()=>{const fr=read("beta-terms.html"),en=read("beta-terms-en.html");for(const x of ["Offres, abonnements et facturation","Stripe","TVA applicable","résilié"])assert.ok(fr.toLowerCase().includes(x.toLowerCase()),x);for(const x of ["Plans, subscriptions and billing","Stripe","VAT","cancelled"])assert.ok(en.toLowerCase().includes(x.toLowerCase()),x);assert.doesNotMatch(fr,/Aucun abonnement ni paiement Stripe n’est actif/);assert.doesNotMatch(en,/No subscription or Stripe payment is active/);});\ntest("FR/EN privacy notices disclose Stripe processing",()=>{const fr=read("privacy-notice.html"),en=read("privacy-notice-en.html");assert.ok(fr.includes("sont transmises à Stripe"));assert.ok(en.includes("shared with Stripe as the payment service provider"));assert.doesNotMatch(fr,/Aucun paiement, abonnement ni prestataire de paiement n’est activé/);assert.doesNotMatch(en,/No payment, subscription or payment provider is enabled/);});\ntest("runtime has no obsolete beta discounts or disabled-payment claims",()=>{const app=fs.readFileSync(new URL("../public/app.js",import.meta.url),"utf8");assert.doesNotMatch(app,/Tarifs partenaires bêta|Aucun paiement en ligne n’est activé|Solo 29 € HT|Team 69 € HT|Business 139 € HT/);});\n';
fs.mkdirSync(path.join(root,"test"),{recursive:true});write("test/billing-legal-consistency.test.js",test);
const billingFlowTest=fs.readFileSync(new URL("./test/billing-flow-guard.test.js",import.meta.url),"utf8");
write("test/billing-flow-guard.test.js",billingFlowTest);
const billingSessionTest=fs.readFileSync(new URL("./test/billing-session.test.js",import.meta.url),"utf8");
write("test/billing-session.test.js",billingSessionTest);
let css=read("public/styles.css");
if(!css.includes("/* ZERILYS refined visual hierarchy */")){
 css+='\n/* ZERILYS refined visual hierarchy */\n.hero{padding-top:clamp(58px,7vw,82px);padding-bottom:clamp(56px,6vw,76px);min-height:540px}.hero h1{font-size:clamp(32px,3.9vw,48px);line-height:1.08;letter-spacing:-.045em;max-width:12ch}.hero-text{font-size:15px;line-height:1.65;max-width:470px}.section{padding-top:clamp(64px,7vw,86px);padding-bottom:clamp(64px,7vw,86px)}.section-head h2,.section-heading h2{font-size:clamp(27px,3vw,36px);line-height:1.12;letter-spacing:-.04em}.trust-section h2{font-size:clamp(28px,3vw,35px);line-height:1.12}.closing h2{font-size:clamp(30px,3.8vw,42px);line-height:1.1}.modal-card h2{font-size:25px;line-height:1.16}@media(max-width:680px){.hero{padding:46px 20px 50px;min-height:unset}.hero h1{font-size:clamp(30px,7vw,40px)}.hero-text{font-size:14px}.section{padding-top:54px;padding-bottom:54px}.section-head h2,.section-heading h2{font-size:clamp(25px,6vw,32px)}.closing h2{font-size:32px}}\n';
}
write("public/styles.css",css);
const hierarchyTest=`import test from "node:test";\nimport assert from "node:assert/strict";\nimport fs from "node:fs";\nconst html=fs.readFileSync(new URL("../public/index.html",import.meta.url),"utf8"),css=fs.readFileSync(new URL("../public/styles.css",import.meta.url),"utf8");\ntest("homepage uses concise bilingual positioning and a restrained type scale",()=>{assert.ok(html.includes("Les compétences, prouvées."));assert.ok(html.includes("Pas seulement déclarées."));assert.ok(html.includes("Un réseau professionnel pour relier compétences, réalisations et opportunités."));assert.doesNotMatch(html,/Les compétences réelles\\.<br><em>Au-delà du CV/);assert.ok(css.includes(".hero h1{font-size:clamp(32px,3.9vw,48px)"));assert.ok(css.includes(".section-head h2,.section-heading h2{font-size:clamp(27px,3vw,36px)"));});\n`;
write("test/interface-hierarchy.test.js",hierarchyTest);
const interactionTest=`import test from "node:test";\nimport assert from "node:assert/strict";\nimport fs from "node:fs";\nconst html=fs.readFileSync(new URL("../public/index.html",import.meta.url),"utf8"),app=fs.readFileSync(new URL("../public/app.js",import.meta.url),"utf8"),i18n=fs.readFileSync(new URL("../public/i18n.js",import.meta.url),"utf8");\nconst forms=[...html.matchAll(/<form\\b([^>]*)>/g)].map(m=>({start:m.index,end:html.indexOf("</form>",m.index),attrs:m[1]}));\ntest("every static button is associated with a form handler, an ID handler or a delegated data action",()=>{const buttons=[...html.matchAll(/<button\\b([^>]*)>/g)];assert.ok(buttons.length>0);for(const b of buttons){const a=b[1],id=a.match(/\\bid=["\x27]([^"\x27]+)["\x27]/),data=[...a.matchAll(/\\b(data-[a-z0-9-]+)(?:=|(?=\\s|$))/gi)].map(x=>x[1]);let covered=false;if(id){assert.ok(app.includes(id[1])||i18n.includes(id[1]),"No code reference for button #"+id[1]);covered=true;}for(const key of data){assert.ok(app.includes(key),"No delegated handler reference for "+key);covered=true;}const form=forms.find(f=>b.index>f.start&&b.index<f.end);if(form){const fid=form.attrs.match(/\\bid=["\x27]([^"\x27]+)["\x27]/);assert.ok(fid&&app.includes(fid[1]),"No form handler for "+(fid?.[1]||"unnamed form"));covered=true;}assert.ok(covered,"Unclassified button: "+a);}});\ntest("every static link has an explicit destination",()=>{const links=[...html.matchAll(/<a\\b([^>]*)>/g)];assert.ok(links.length>0);for(const link of links)assert.match(link[1],/\\bhref=["\x27][^"\x27]+["\x27]/,"Anchor without href: "+link[1]);});\n`;\nwrite("test/interactive-inventory.test.js",interactionTest);\nconsole.log("ZERILYS billing, legal and interactive inventory checks installed.");
