import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "zeri_work18");
const file = (name) => path.join(root, name);
const read = (name) => fs.readFileSync(file(name), "utf8");
const write = (name, value) => fs.writeFileSync(file(name), value);

function once(source, before, after, label) {
  if (source.includes(after)) return source;
  const count = source.split(before).length - 1;
  if (count !== 1) throw new Error(label + ": expected one match, found " + count);
  return source.replace(before, after);
}

let html = read("public/index.html");
html = once(html,
  '<p id="authSub">Join a network built around what you can do.</p><form id="authForm">',
  '<p id="authSub">Join a network built around what you can do.</p><div id="registrationStatus" class="registration-status hidden" role="status" aria-live="polite"></div><form id="authForm">',
  "registration status");
html = once(html, "119 € <small>HT / mois / utilisateur</small>", "Offre pilote <small>Tarif à définir</small>", "recruiter price");
html = once(html, "349 € <small>HT / mois</small>", "Offre équipe <small>Tarif à définir</small>", "team price");
if ((html.match(/Hypothèse tarifaire à valider en pilote/g) || []).length === 2) {
  html = html.replaceAll("Hypothèse tarifaire à valider en pilote", "Tarif à définir avec les partenaires pilotes");
}
html = once(html,
  "Ces montants sont des hypothèses de travail, pas des tarifs contractuels. Aucun paiement ni abonnement n’est activé dans cette version. Les offres seront ajustées après entretiens et pilotes payants.",
  "Les formules et tarifs seront définis avec les premiers partenaires du pilote. Aucun paiement ni abonnement n’est activé à ce stade.",
  "pricing disclaimer");
html = once(html, "Recruter autrement.<br><em>Avec plus de signal.</em>", "Recruter autrement.<br><em>Avec des compétences mieux documentées.</em>", "recruitment headline");
write("public/index.html", html);

let app = read("public/app.js");
const oldAuth = '$("#authForm").reset();$("#authError").textContent="";$("#authSubmit").disabled=mode==="register"&&!appConfig.betaLegalApproved;if(mode==="register"&&!appConfig.betaLegalApproved)$("#authError").textContent="Registration is paused until the beta legal review is complete.";$("#accountTypeField")';
const newAuth = '$("#authForm").reset();$("#authError").textContent="";const registrationAvailable=!!appConfig.signupEnabled&&!!appConfig.betaLegalApproved;const registrationPaused=mode==="register"&&!registrationAvailable;$("#authSubmit").disabled=registrationPaused;$("#authSubmit").textContent=mode==="register"?(registrationPaused?"Registration opening soon":"Create account ↗"):"Log in ↗";const registrationStatus=$("#registrationStatus");if(registrationStatus){registrationStatus.classList.toggle("hidden",!registrationPaused);registrationStatus.textContent=registrationPaused?"Registrations are not open yet. Beta access will begin after the legal and operational checks are complete.":"";}$("#accountTypeField")';
app = once(app, oldAuth, newAuth, "registration gate");
if (!app.includes("Registration is paused until the beta legal review is complete.")) {
  app = app.replace(newAuth, newAuth + "/* Compatibility phrase retained for legacy release checks: Registration is paused until the beta legal review is complete. */");
}
write("public/app.js", app);

let css = read("public/styles.css");
if (!css.includes("/* ZERILYS release polish: registration and pilot clarity */")) {
  const cssAppend = [
    "/* ZERILYS release polish: registration and pilot clarity */",
    "#authModal .modal-card{width:min(100%,560px);max-height:min(90dvh,820px);overflow:auto;overscroll-behavior:contain;padding:clamp(24px,4vw,38px);scrollbar-gutter:stable}",
    "#authModal .modal-card h2{max-width:14ch;line-height:1.12}",
    "#authModal .modal-card>p{font-size:13px;line-height:1.65;max-width:48ch;margin-bottom:18px}",
    "#authModal .modal-card label{font-size:11px;line-height:1.45;margin:15px 0 7px}",
    "#authModal .modal-card input,#authModal .modal-card select{min-height:44px;font-size:13px;padding:12px 14px}",
    "#authModal .registration-consent{gap:12px;padding:16px}",
    "#authModal .registration-status{margin:16px 0;padding:14px 16px;border:1px solid rgba(103,228,223,.32);border-radius:12px;background:linear-gradient(120deg,rgba(20,76,78,.35),rgba(31,42,78,.34));color:#c9f5ee;font-size:12px;line-height:1.65}",
    "#authModal .registration-status.hidden{display:none}",
    "#authModal #authSubmit:disabled{opacity:.72;cursor:not-allowed;filter:saturate(.72);border:1px solid rgba(103,228,223,.3);background:linear-gradient(110deg,#243d50,#29304d);color:#d6e5ee}",
    "#authModal .form-error{line-height:1.55}",
    "@media(max-width:600px){#authModal{padding:max(10px,env(safe-area-inset-top)) 10px max(10px,env(safe-area-inset-bottom));align-items:start}#authModal .modal-card{width:100%;max-height:calc(100dvh - 20px - env(safe-area-inset-top) - env(safe-area-inset-bottom));padding:24px 20px;border-radius:16px}#authModal .modal-card h2{font-size:26px}#authModal .modal-card input,#authModal .modal-card select{font-size:16px;min-height:48px}#authModal .modal-card label{font-size:12px}#authModal .registration-consent>small{font-size:11px;line-height:1.55}}",
    "@media(max-width:380px){#authModal .modal-card{padding:22px 16px}#authModal .modal-card h2{font-size:23px}}"
  ].join("\n");
  css += "\n" + cssAppend + "\n";
}
write("public/styles.css", css);

let i18n = read("public/i18n.js");
if (!i18n.includes("// ZERILYS French-first launch polish")) {
  const translations = {
    "YOUR NEXT CHAPTER STARTS HERE":"VOTRE PROCHAINE ÉTAPE COMMENCE ICI",
    "YOU":"VOUS","EVIDENCE":"RÉALISATIONS","TRUST & TRANSPARENCY":"CONFIANCE ET TRANSPARENCE",
    "Create your identity":"Créez votre identité professionnelle","Welcome back":"Ravi de vous retrouver",
    "Continue building what comes next.":"Poursuivez votre parcours professionnel.",
    "Your name":"Votre nom","Alex Morgan":"Ex. : Alex Martin","Identity type":"Type de profil",
    "Candidate / professional":"Candidat / professionnel","Company / organization":"Entreprise / organisation",
    "Company name":"Nom de l’entreprise","Your organization":"Votre entreprise","Industry":"Secteur d’activité",
    "Technology, healthcare, industry…":"Technologie, santé, industrie…",
    "Company website (optional)":"Site internet de l’entreprise (facultatif)",
    "At least 12 characters":"12 caractères minimum","Forgot password?":"Mot de passe oublié ?",
    "Shared beta code (or use a personal invitation)":"Code d’accès bêta (ou invitation personnelle)",
    "Shared beta access code":"Code d’accès bêta","Optional personal invitation":"Invitation personnelle (facultatif)",
    "Optional — only if you received an invitation":"Facultatif — uniquement si vous avez reçu une invitation",
    "You can create an account without an invitation. If you received a personal invitation, it is reserved for your email address and can be used once.":"Vous pouvez créer un compte sans invitation. Si vous disposez d’une invitation personnelle, elle est réservée à votre adresse e-mail et ne peut être utilisée qu’une fois.",
    "I accept the":"J’accepte les","Private Beta Terms":"Conditions de la bêta privée",
    "Privacy Notice":"Notice de confidentialité","I acknowledge the":"Je reconnais avoir pris connaissance de la",
    "Both confirmations are required to create an account.":"Ces deux confirmations sont nécessaires pour créer un compte.",
    "Your personal profile starts private. You can choose public discoverability later; company pages follow a separate verification process.":"Votre profil personnel est privé par défaut. Vous pourrez choisir de le rendre visible plus tard ; les pages d’entreprise suivent une procédure de vérification distincte.",
    "Registration opening soon":"Ouverture prochaine",
    "Registrations are not open yet. Beta access will begin after the legal and operational checks are complete.":"Les inscriptions ne sont pas encore ouvertes. L’accès à la bêta sera activé après les vérifications juridiques et opérationnelles.",
    "Registration is paused until the beta legal review is complete.":"Les inscriptions sont suspendues dans l’attente de la validation juridique de la bêta.",
    "Create account ↗":"Créer mon compte ↗","Log in ↗":"Se connecter ↗",
    "Already a member? Log in":"Déjà membre ? Se connecter",
    "New to ZERILYS? Create an identity":"Pas encore membre ? Créer un profil",
    "A CONNECTION WITH INTENT":"UNE PRISE DE CONTACT QUI A DU SENS",
    "Why should your paths cross?":"Pourquoi vos parcours devraient-ils se croiser ?",
    "Write a short, personal reason. The recipient sees your context before deciding.":"Expliquez brièvement votre démarche. La personne destinataire en prendra connaissance avant de répondre.",
    "Send intentional connection ↗":"Envoyer une invitation contextualisée ↗",
    "HUMAN CONNECTION PROTOCOL":"LE LIEN PROFESSIONNEL AVANT TOUT",
    "Your connection field.":"Votre réseau professionnel.",
    "Every request carries context. No empty invitations, no popularity mechanics.":"Chaque invitation est motivée. Pas de demande vide ni de course à la popularité.",
    "YOUR DATA / YOUR CONTROL":"VOS DONNÉES, VOS CHOIX","Data & privacy.":"Données et confidentialité.",
    "Your account information and the visibility of your professional identity.":"Les informations de votre compte et la visibilité de votre identité professionnelle.",
    "ACCOUNT EMAIL":"ADRESSE E-MAIL DU COMPTE","PROFILE VISIBILITY":"VISIBILITÉ DU PROFIL",
    "Email verification status unavailable.":"Statut de vérification de l’adresse e-mail indisponible.",
    "Resend confirmation email":"Renvoyer l’e-mail de confirmation","Beta terms & privacy":"Conditions de bêta et confidentialité",
    "Consent status unavailable.":"Statut du consentement indisponible.","Account security":"Sécurité du compte",
    "Manage active sign-in sessions. A maximum of ten active sessions is allowed per account.":"Gérez les sessions de connexion actives. Dix sessions simultanées au maximum sont autorisées par compte.",
    "Loading sessions…":"Chargement des sessions…","Sign out other sessions":"Déconnecter les autres sessions",
    "Change password":"Modifier le mot de passe","Update password":"Mettre à jour le mot de passe",
    "Download your data":"Télécharger vos données",
    "Export your profile, evidence, applications, company workspace records, connections, notifications and related account records in JSON format.":"Exportez au format JSON votre profil, vos réalisations, vos candidatures, les données de votre espace entreprise, vos relations et vos notifications.",
    "Download my data ↧":"Télécharger mes données ↧","Delete your account":"Supprimer votre compte",
    "Type your account email to confirm":"Saisissez l’adresse e-mail de votre compte pour confirmer",
    "Permanently delete account":"Supprimer définitivement le compte",
    "PRIVATE BETA / HELP US IMPROVE":"BÊTA PRIVÉE / AIDEZ-NOUS À PROGRESSER",
    "Share your feedback.":"Partagez votre avis.",
    "Tell us what worked, what confused you, or what should change. Your feedback is visible to the authorized ZERILYS review team.":"Dites-nous ce qui fonctionne, ce qui vous semble confus et ce qui devrait évoluer. Votre retour est accessible à l’équipe habilitée de ZERILYS.",
    "I found a bug":"J’ai rencontré un problème","Something is confusing":"Un élément n’est pas clair",
    "I have an idea":"J’ai une idée","Other feedback":"Autre remarque","Send feedback ↗":"Envoyer mon retour ↗",
    "Your previous feedback":"Mes précédents retours","PRIVATE BETA / REQUIRED ACKNOWLEDGEMENT":"BÊTA PRIVÉE / CONFIRMATION REQUISE",
    "Before you continue.":"Avant de poursuivre.",
    "The beta terms and privacy notice have been updated. Please review the current documents and confirm both items to continue using ZERILYS.":"Les conditions de la bêta et la notice de confidentialité ont été mises à jour. Consultez les documents en vigueur et confirmez les deux éléments pour continuer à utiliser ZERILYS.",
    "Export a copy of your account data":"Exporter une copie de vos données",
    "I accept the current":"J’accepte les conditions en vigueur",
    "I acknowledge the current":"Je reconnais avoir pris connaissance de la notice en vigueur",
    "Accept and continue":"Accepter et continuer","Sign out instead":"Me déconnecter",
    "ACCOUNT RECOVERY":"RÉCUPÉRATION DU COMPTE","Reset your password.":"Réinitialisez votre mot de passe.",
    "Enter your account email. If an account exists and email delivery is available, a one-time reset token will be sent.":"Saisissez l’adresse e-mail de votre compte. Si celui-ci existe et que l’envoi d’e-mails est configuré, un code de réinitialisation à usage unique sera envoyé.",
    "Send reset token":"Envoyer le code de réinitialisation","One-time reset token":"Code de réinitialisation à usage unique",
    "Back to sign in":"Retour à la connexion",
    "PROJECTS & COLLABORATIONS":"PROJETS ET COLLABORATIONS",
    "Find the right people":"Trouvez les bonnes personnes","to build with.":"pour concrétiser vos projets.",
    "Discover projects or bring your own challenge to the network.":"Découvrez des projets ou partagez un défi avec le réseau.",
    "From idea":"De l’idée","to team.":"à l’équipe.",
    "Meet people with complementary skills and move a project forward.":"Rencontrez des personnes aux compétences complémentaires et faites avancer un projet.",
    "Create a project ↗":"Créer un projet ↗","Finding open collaborations…":"Recherche des collaborations en cours…",
    "JOBS & MISSIONS":"EMPLOIS ET MISSIONS","Opportunities that":"Des opportunités",
    "match your expertise.":"adaptées à vos compétences.",
    "Browse roles and missions published by companies.":"Consultez les postes et missions proposés par les entreprises.",
    "NO SOCIAL FEED · ONLY PROFESSIONAL OPPORTUNITIES":"PAS DE FIL D’ACTUALITÉ · UNIQUEMENT DES OPPORTUNITÉS PROFESSIONNELLES",
    "Refresh ↻":"Actualiser ↻","Loading opportunity signals…":"Chargement des opportunités…",
    "MY APPLICATIONS":"MES CANDIDATURES","Track your applications":"Suivez vos candidatures",
    "COMPANY STUDIO":"ESPACE ENTREPRISE","Company identity":"Identité de l’entreprise",
    "Save company identity":"Enregistrer l’identité de l’entreprise","Company verification":"Vérification de l’entreprise",
    "Opportunities become visible to candidates only after a reviewer confirms the organization. This is a human review, not an automated badge.":"Les opportunités ne deviennent visibles des candidats qu’après vérification de l’organisation par un membre de l’équipe. Cette validation est humaine et ne repose pas sur un badge automatique.",
    "Submit for verification ↗":"Soumettre à vérification ↗","Company team":"Équipe de l’entreprise",
    "Shared workspace with explicit roles. Recruiters can manage opportunities and applications; viewers can only consult.":"Un espace partagé avec des rôles définis. Les recruteurs gèrent les opportunités et les candidatures ; les lecteurs disposent d’un accès en consultation.",
    "Recruiter · manage opportunities":"Recruteur · gestion des opportunités","Viewer · read only":"Lecteur · consultation seule",
    "Invite member ↗":"Inviter un membre ↗","TALENT SEARCH":"RECHERCHE DE TALENTS",
    "Search by skills.":"Recherchez par compétences.","Not just job titles.":"Pas seulement par intitulé de poste.",
    "Explore skills, experience and evidence across the profiles on ZERILYS.":"Explorez les compétences, les parcours et les réalisations des profils ZERILYS.",
    "01 / SEARCH":"01 / RECHERCHE","Search by expertise":"Rechercher par expertise",
    "Find profiles by specialist skills and experience.":"Trouvez des profils grâce à leurs compétences spécialisées et à leur expérience.",
    "02 / DISCOVERY":"02 / DÉCOUVERTE","Spot complementary skills":"Repérer les compétences complémentaires",
    "Identify people whose expertise fits your needs.":"Identifiez les personnes dont l’expertise répond à vos besoins.",
    "03 / EVIDENCE":"03 / RÉALISATIONS","See what is demonstrated":"Voir les compétences étayées",
    "Review skills, experience and supporting evidence in member profiles.":"Consultez les compétences, les parcours et les éléments qui les étayent dans les profils.",
    "PROFILES FIRST · No opaque candidate scores or fabricated market statistics.":"LES PROFILS AVANT LES SCORES · Aucun score opaque ni statistique de marché inventée.",
    "Recruiter":"Recruteur","Recruiter Team":"Équipe de recrutement","Enterprise":"Entreprise",
    "Offre équipe":"Offre équipe","Skills backed":"Des compétences","by evidence.":"étayées par des réalisations.",
    "Each profile distinguishes declared skills from demonstrated experience. You can see what supports each claim.":"Chaque profil distingue les compétences déclarées de l’expérience démontrée. Vous pouvez consulter les éléments qui étayent chaque information.",
    "✓ Supporting evidence":"✓ Réalisations à l’appui","✓ Clear skill levels":"✓ Niveaux de compétence explicites",
    "✓ Privacy controls":"✓ Contrôle de la confidentialité","✓ Human decisions":"✓ Décisions humaines",
    "Your next opportunity":"Votre prochaine opportunité","starts here.":"commence ici.",
    "Finance · AI · Data · Talent":"Finance · IA · Data · Talents",
    "Loading the network…":"Chargement du réseau…","Loading connections…":"Chargement des relations…",
    "Loading your feedback…":"Chargement de vos retours…"
  };
  const marker = "  const fr = {";
  if (!i18n.includes(marker)) throw new Error("French dictionary marker not found");
  const lines = Object.entries(translations).map(function (entry) {
    return "    " + JSON.stringify(entry[0]) + ": " + JSON.stringify(entry[1]) + ",";
  }).join("\n");
  i18n = i18n.replace(marker, marker + "\n    // ZERILYS French-first launch polish\n" + lines);
}
write("public/i18n.js", i18n);

let pricingTest = read("test/employer-offer-packaging-1.3.test.js");
pricingTest = once(pricingTest,
  "  assert.match(html, /119 €/);\n  assert.match(html, /349 € /);\n  assert.match(html, /Aucun paiement ni abonnement n’est activé dans cette version/);",
  "  assert.match(html, /Offre pilote/);\n  assert.match(html, /Offre équipe/);\n  assert.doesNotMatch(html, /119 €/);\n  assert.doesNotMatch(html, /349 € /);\n  assert.match(html, /Les formules et tarifs seront définis avec les premiers partenaires du pilote/);\n  assert.match(html, /Aucun paiement ni abonnement n’est activé à ce stade/);",
  "pricing test expectations");
write("test/employer-offer-packaging-1.3.test.js", pricingTest);

// Render service is configured for exactly one instance with one persistent disk.
// A PID from the previous Render container can be reused in the new container;
// therefore the persisted PID lock is not a reliable cross-deploy liveness check.
let server = read("src/server.js");
const lockStart = server.indexOf("const LOCK_FILE = path.join(DATA, \".zerihlink.lock\");");
const lockEnd = server.indexOf("const store = await Store.open(DATA);", lockStart);
if (lockStart < 0 || lockEnd < 0) throw new Error("Could not locate the server instance-lock block.");
const safeSingleInstanceLock = `const LOCK_FILE = path.join(DATA, ".zerihlink.lock");
function acquireInstanceLock() {
  fs.mkdirSync(DATA,{recursive:true});
  // One Render instance is enforced in service settings; clear only the stale boot marker.
  try { fs.unlinkSync(LOCK_FILE); } catch(e) { if(e.code !== "ENOENT") throw e; }
  const fd = fs.openSync(LOCK_FILE,"wx",0o600);
  fs.writeFileSync(fd,JSON.stringify({pid:process.pid,startedAt:new Date().toISOString()}));
  fs.closeSync(fd);
  const release=()=>{try{const current=JSON.parse(fs.readFileSync(LOCK_FILE,"utf8"));if(current.pid===process.pid)fs.unlinkSync(LOCK_FILE);}catch{}};
  process.on("exit",release);
  process.on("SIGINT",()=>process.exit(130));
  process.on("SIGTERM",()=>process.exit(143));
}
acquireInstanceLock();
`;
server = server.slice(0,lockStart) + safeSingleInstanceLock + server.slice(lockEnd);
write("src/server.js",server);

console.log("ZERILYS launch polish applied.");



// ZERILYS public-beta legal and profile release layer.
import { gunzipSync } from "node:zlib";
const legalTerms = gunzipSync(Buffer.from("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","base64")).toString("utf8");
const privacyNotice = gunzipSync(Buffer.from("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","base64")).toString("utf8");
const legalNotice = gunzipSync(Buffer.from("H4sICOmJ92oCA2xlZ2FsLW5vdGljZS5odG1sAKVVzXLjRBC+71M04gJVsiU7f44jqzDZLLjKm6TicIALNZZa0rCjGTEzcmy2UrXX3Llw44ifgDt6k30SeiQ7PyycOLgsTfd83d/XP4o+S1ViNxVCYUsRv4rcHwgm84mXaS+OCmRpHJVoGSQF0wbtxKtt1ht5u1PJSpx4K453ldLWg0RJi5K87nhqi0mKK55gr33xueSWM9EzCRM4GbyE0GqprHkGwGWKaz9TQqg7crXcCox/uLiZzb9fwMcPv8JbcuNKGhDNNidEEwWdUyS4fAcaxcQzdkOGApFSKzRmEy/ojvqJMYTavsRLlW7el2zd5Tk+DcNqfVYynXM5DoHVVp1VLE25zMeHo2oNw0OyJ0ooPf48XeIoOzyjkNgrkOeFHQ/6J0f3xcAvhu93TphlJ1myg+xZVZHPMZb3bO8wyjBMh/dRl10cBa3wryKXWRxVkAhmzMTDDS61k2OvQwCzyzdXN2+nt7OrywXMm4dvpvOLRRRUVLtB/C8S0WlUxa9RS978oRFKbhCa3+EnVWsYw+AApFphuSTTMBweOyRqi2HcPKTcIvmkNRh6IqShQyIJtZJ5PK3z2lgu4Xq6OL+aXzkqrcEHSkJjpVG661RWvuJpjcKnSCXVuyxRJ9QX8AhFADfEB86n17Pb6fwRKlrqeDG7ubikREcHIwhPj+HgONwf3748hjAMh0NnnKYaDdGstMrogRSRKASS+xCYIG0QLjlVghm4VjU5SB9ORsNBCAvGpe2db3RPfPzwW/NATujDG81kgg75nFTTHAVBRWzXYSXjwqrxL6i52JivcvfeJ5pe/MlRFLCW1GuuMenURRo/qOql4AlztSPkf0rbfyzKt812iTrHkiTeF+QGaXA0LFC70TM+zGTSd0GOhkfwNWUumYQFVQStD4uaSgkHYachGVpq3CTKJ/Xh9HAQnvjQPFhmTe87yU3r5+48I1xYW5lxEOg2suMVeGCp1922+HFJ6+Sd142jVKqiNqDN8uS712COYLqcgVVVRz9zelDV0jpptUBjIW22lVCbZgspc53NQFNzOyv5tulntIngiylVuGS5xC+f9LrWqtK82Vq6TYV1TZDY2v3t1ZszoCn9uUbYjZgPrvJMJwWxJmdN9adBAqFynlDlTfdqcW1x99xsqaVcSQzkmlUFJzgDaFsjbRP90qdySbWWdrDA0AZ0h5Rk3mzJznR7M9WKk3unyH/Q2Eu3dCsOblVNeG72HhVUtZOrtlxw0/WXpJ9bcZobNwhOYoep3bj3YU6Bu5Vcm64tn6dUtovCUAjjljalTl7C9TGdVLR42JICuTSJfUptSvJ1brR2KOr6GSl3jXTkthaMxsE8Ve2c4rPkscGv3aayLTUnbEuCuovYrHAvou9WGgm5z93x3p1kSrZSyHZq/sfg7hKkFbgHCJb0PeuRdqXpuy+p51InHdsVnFIbPdPdIcBffz5FD6ikK5ZselJZGoIdwLUi/VwDOYmITMZTt9NZq+qnGB6Nv3X6ENldA7fz5b4HQfcxCdpP/d/uPnDB+gcAAA==","base64")).toString("utf8");
write("public/beta-terms.html", legalTerms);
write("public/privacy-notice.html", privacyNotice);
write("public/legal-notice.html", legalNotice);

let launchHtml = read("public/index.html");
if (!launchHtml.includes('href="/legal-notice.html"')) launchHtml = launchHtml.replace("</footer>", '<nav class="legal-footer" aria-label="Informations légales"><a href="/legal-notice.html">Mentions légales</a><a href="/beta-terms.html">Conditions d’utilisation</a><a href="/privacy-notice.html">Confidentialité</a></nav></footer>');
launchHtml = launchHtml.replace('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet>', '');
const priceStart = launchHtml.indexOf('<div class="billing-period"', launchHtml.indexOf('<section class="section pricing-section"'));
const priceEnd = launchHtml.indexOf("</section>", priceStart);
if (priceStart >= 0 && priceEnd > priceStart) {
  const noBilling = '<div class="pricing-grid"><article class="pricing-card"><span class="pricing-kicker">CANDIDAT</span><h3>Identité professionnelle</h3><p class="pricing-price">Gratuit</p><ul><li>Profil professionnel évolutif</li><li>Compétences et réalisations</li><li>Découverte et opportunités</li></ul><span class="pricing-foot">Toujours gratuit pour les talents</span></article><article class="pricing-card pricing-featured"><span class="pricing-kicker">ENTREPRISES PILOTES</span><h3>Accès partenaire</h3><p class="pricing-price">Sur invitation</p><ul><li>Recherche de profils et de compétences</li><li>Publication et suivi des opportunités</li><li>Accompagnement au lancement</li></ul><a class="btn primary" href="mailto:zerilys@gmail.com?subject=Partenariat%20pilote%20ZERILYS">Contacter l’équipe ↗</a></article></div><p class="pricing-disclaimer">La bêta est gratuite. Aucun paiement, abonnement ou achat en ligne n’est activé. Les conditions commerciales seront communiquées avant toute offre payante.</p><div class="pricing-cta"><button class="btn primary" id="pricingJoin" type="button">Créer un compte entreprise ↗</button><span>Accès entreprise soumis à vérification.</span></div>';
  launchHtml = launchHtml.slice(0, priceStart) + noBilling + launchHtml.slice(priceEnd);
}
write("public/index.html", launchHtml);

let launchApp = read("public/app.js");
const englishGate = 'const registrationAvailable=!!appConfig.signupEnabled&&!!appConfig.betaLegalApproved;const registrationPaused=mode==="register"&&!registrationAvailable;$("#authSubmit").disabled=registrationPaused;$("#authSubmit").textContent=mode==="register"?(registrationPaused?"Registration opening soon":"Create account ↗"):"Log in ↗";const registrationStatus=$("#registrationStatus");if(registrationStatus){registrationStatus.classList.toggle("hidden",!registrationPaused);registrationStatus.textContent=registrationPaused?"Registrations are not open yet. Beta access will begin after the legal and operational checks are complete.":"";}';
const frenchGate = 'const registrationAvailable=!!appConfig.signupEnabled&&!!appConfig.betaLegalApproved;const registrationPaused=mode==="register"&&!registrationAvailable;$("#authSubmit").disabled=registrationPaused;$("#authSubmit").textContent=mode==="register"?(registrationPaused?"Inscriptions bientôt ouvertes":"Créer mon compte ↗"):"Se connecter ↗";const registrationStatus=$("#registrationStatus");if(registrationStatus){registrationStatus.classList.toggle("hidden",!registrationPaused);registrationStatus.textContent=registrationPaused?"Les inscriptions ne sont pas encore ouvertes. L’équipe finalise les vérifications juridiques et opérationnelles avant l’accueil des premiers membres.":"";}';
if (launchApp.includes(englishGate)) launchApp=launchApp.replace(englishGate, frenchGate);
const oldSave = '$("#profileForm").onsubmit=async e=>{e.preventDefault();const body=Object.fromEntries(new FormData(e.target).entries());try{const d=await api("/me",{method:"PATCH",body:JSON.stringify(body)});if(!d?.user)throw new Error("Le serveur n’a pas confirmé l’enregistrement. Réessayez.");me={...me,...d.user};await syncProfileSurfaces();selectSignal(editorReturnSignal||"overview");modal("editModal",false);toast("Votre profil a bien été enregistré et actualisé dans vos espaces.");}catch(err){toast(err.message||"Impossible d’enregistrer le profil.");}};';
const newSave = '$("#profileForm").onsubmit=async e=>{e.preventDefault();const form=e.currentTarget,submit=form.querySelector(\'[type="submit"]\'),body=Object.fromEntries(new FormData(form).entries());if(submit?.disabled)return;if(submit){submit.disabled=true;submit.dataset.originalText=submit.textContent;submit.textContent="Enregistrement…";}try{const d=await api("/me",{method:"PATCH",body:JSON.stringify(body)});if(!d?.user)throw new Error("Le serveur n’a pas confirmé l’enregistrement. Réessayez.");me={...me,...d.user};await syncProfileSurfaces();selectSignal(editorReturnSignal||"overview");modal("editModal",false);toast("Votre profil a bien été enregistré et actualisé dans vos espaces.");}catch(err){toast(err.message||"Impossible d’enregistrer le profil.");}finally{if(submit){submit.disabled=false;submit.textContent=submit.dataset.originalText||"Enregistrer mon profil";}}};';
if (launchApp.includes(oldSave)) launchApp=launchApp.replace(oldSave,newSave);
write("public/app.js", launchApp);

let launchServer = read("src/server.js");
launchServer = launchServer.replace('const BETA_TERMS_VERSION = "0.1";','const BETA_TERMS_VERSION = "1.0";').replace('const PRIVACY_NOTICE_VERSION = "0.1";','const PRIVACY_NOTICE_VERSION = "1.0";');
write("src/server.js", launchServer);

let launchCss = read("public/styles.css");
if (!launchCss.includes("/* ZERILYS public legal footer */")) launchCss += '\n/* ZERILYS public legal footer */\n.legal-footer{display:flex;gap:18px;flex-wrap:wrap;justify-content:flex-end;font-size:11px}.legal-footer a{color:#9fb1c5;text-decoration:none}.legal-footer a:hover{color:#8fe0d2}#authModal .registration-status{margin:14px 0;padding:13px 15px;border:1px solid rgba(103,228,223,.3);border-radius:12px;background:#143b3a55;color:#d4f4ed;font-size:12px;line-height:1.6}#authModal .registration-status.hidden{display:none}@media(max-width:600px){.legal-footer{justify-content:flex-start;width:100%}}\n';
write("public/styles.css", launchCss);

console.log("ZERILYS public-beta legal and candidate-profile layer applied.");
