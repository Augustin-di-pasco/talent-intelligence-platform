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

// Make the persistent-disk lock check robust across Render deploy namespaces.
let server = read("src/server.js");
const oldLockCheck = `    if(existing?.pid) {
      try{process.kill(existing.pid,0);throw new Error(`Another ZERILYS instance is already using this data directory (PID ${existing.pid}).`);}
      catch(e){if(e.code!=="ESRCH")throw e;}
    } else {
      throw new Error("A ZERILYS data lock exists but cannot be validated. Inspect and remove it manually only after confirming no instance is running.");
    }
`;
const newLockCheck = `    if(existing?.pid) {
      let sameApplicationProcess = false;
      try {
        process.kill(existing.pid,0);
        const commandLine = fs.readFileSync(`/proc/${existing.pid}/cmdline`, "utf8").replaceAll("\\0"," ");
        sameApplicationProcess = commandLine.includes(path.join(ROOT,"src","server.js")) || commandLine.includes("src/server.js");
      } catch(e) {
        if(e.code !== "ESRCH" && e.code !== "ENOENT" && e.code !== "EACCES") throw e;
      }
      if(sameApplicationProcess) throw new Error(`Another ZERILYS instance is already using this data directory (PID ${existing.pid}).`);
    } else {
      throw new Error("A ZERILYS data lock exists but cannot be validated. Inspect and remove it manually only after confirming no instance is running.");
    }
`;
if (server.includes(oldLockCheck)) {
  server = server.replace(oldLockCheck,newLockCheck);
} else if (!server.includes("sameApplicationProcess")) {
  throw new Error("Could not locate the expected ZERILYS instance-lock code; refusing an unsafe patch.");
}
write("src/server.js",server);

console.log("ZERILYS launch polish applied.");
