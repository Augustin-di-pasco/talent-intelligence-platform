import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.argv[2]||"zeri_work18");
const read=n=>fs.readFileSync(path.join(root,n),"utf8");
const write=(n,s)=>fs.writeFileSync(path.join(root,n),s);
let app=read("public/app.js");
const hook='$("#userMenu").setAttribute("aria-label","Open my candidate profile")}';
if(app.includes(hook)&&!app.includes("syncCandidateHero()"))app=app.replace(hook,'$("#userMenu").setAttribute("aria-label","Ouvrir mon profil professionnel");syncCandidateHero()}');
const emptyStart=app.indexOf("if(!d.users.length){el.innerHTML=");
if(emptyStart>=0&&!app.includes("search-empty-state")){
 const emptyEnd=app.indexOf("return;}",emptyStart)+7;
 if(emptyEnd<7)throw new Error("Missing search empty state");
 app=app.slice(0,emptyStart)+'if(!d.users.length){const box=document.createElement("div");box.className="search-empty-state";const title=document.createElement("b"),detail=document.createElement("p"),glyph=document.createElement("span");glyph.textContent="⌕";title.textContent=q?tr("No profiles match your search."):tr("The network is taking shape. Be among the first to create a profile.");detail.textContent=q?tr("Try another skill, profession or location."):tr("The first professional profiles will appear here as members join.");box.append(glyph,title,detail);el.replaceChildren(box);return;}'+app.slice(emptyEnd);
}
app=app.replace('if(!name)return;try{const d=await api("/me/skills"','if(!name){$("#skillName").focus();toast(tr("Saisissez d’abord une compétence."));return;}try{const d=await api("/me/skills"');
app=app.replace('$("#visibilityHint").textContent=visibility;','$("#visibilityHint").textContent=window.ZERIHLINK_I18N?.language==="en"?visibility:(me.visibility==="private"?"Votre profil est visible par les membres connectés de ZERILYS. Le mode privé le masque des liens publics et de la découverte anonyme.":"Votre profil est visible des membres ZERILYS et via son lien public. Vous pouvez limiter sa visibilité aux visiteurs non connectés à tout moment.");');
if(!app.includes("function syncCandidateHero()"))app+='\nfunction syncCandidateHero(){const core=document.querySelector(".candidate-core");if(!core)return;const portrait=me&&me.avatarUrl?\'<img class="candidate-hero-avatar" src="\'+esc(me.avatarUrl)+\'" alt="Photo de profil">\':\'<span class="candidate-hero-initials">\'+esc(me?initials(me.name):"VOUS")+\'</span>\';core.innerHTML=\'<div class="candidate-core-aura"></div><div class="candidate-monogram">\'+portrait+\'</div><b>\'+esc(me?.name||"VOTRE PROFIL")+\'</b><small>PROFIL PROFESSIONNEL</small><span><i></i> \'+(me?"VOTRE UNIVERS PROFESSIONNEL":"PRÊT POUR LA SUITE")+\'</span>\';core.classList.toggle("is-member",!!me)}\n';
write("public/app.js",app);
let html=read("public/index.html");
html=html.replace('<div class="candidate-monogram">YOU</div><b>YOUR PROFILE</b><small>PROFESSIONAL PROFILE</small><span><i></i> OPEN TO WHAT’S NEXT</span>','<div class="candidate-monogram"><span class="candidate-hero-initials">VOUS</span></div><b>VOTRE PROFIL</b><small>PROFIL PROFESSIONNEL</small><span><i></i> PRÊT POUR LA SUITE</span>');
html=html.replace('<h3>Capabilities</h3><div class="inline-form"><input id="skillName" placeholder="Add a skill, e.g. Product strategy"><select id="skillLevel"><option value="practitioner">Practitioner</option><option value="learning">Learning</option><option value="advanced">Advanced</option><option value="expert">Expert</option></select><button class="btn outline" id="addSkill">Add</button></div>','<h3>Compétences</h3><div class="skill-entry-label"><label for="skillName">Compétence à ajouter</label><small>Écrivez librement une compétence : technique, métier, relationnelle ou sectorielle.</small></div><div class="inline-form"><input id="skillName" type="text" autocomplete="off" placeholder="Ex. : analyse financière, gestion de portefeuille, Excel…"><label class="skill-level-label" for="skillLevel">Niveau</label><select id="skillLevel" aria-label="Niveau de maîtrise"><option value="practitioner">Opérationnel</option><option value="learning">En apprentissage</option><option value="advanced">Avancé</option><option value="expert">Expert</option></select><button class="btn outline" id="addSkill" type="button">Ajouter</button></div>');
write("public/index.html",html);
let css=read("public/styles.css");
if(!css.includes("ZERILYS interface corrections 2026-11-14"))css+='\n/* ZERILYS interface corrections 2026-11-14 */\n.language-toggle{color:#f4f7fc!important;-webkit-text-fill-color:#f4f7fc!important;background:#172333!important;border-color:#91a7bb66!important}\n.candidate-core .candidate-monogram{width:94px;height:94px;border-radius:50%;overflow:hidden;display:grid;place-items:center;background:#263447;border:1px solid #b8cadb66;margin-bottom:8px}.candidate-hero-avatar{width:100%;height:100%;object-fit:cover;display:block;border-radius:50%}.candidate-hero-initials{font:800 27px var(--display);color:#f4f7fc}.candidate-core>b{max-width:210px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.identity-shell{height:100%;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain}.identity-workspace{flex:0 0 auto;min-height:560px;margin:0 auto;align-items:center}.visibility-hint{position:relative!important;inset:auto!important;float:none!important;clear:both!important;display:block!important;z-index:1;width:calc(100% - 8vw);max-width:1480px;box-sizing:border-box;margin:12px auto 18px!important;padding:12px 16px;line-height:1.55;white-space:normal;overflow-wrap:anywhere}.node-intent{bottom:-2%!important}.identity-universe{min-height:610px}\n#editModal .skill-add .inline-form{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(150px,.45fr) auto;gap:10px;align-items:end}#editModal .skill-entry-label{display:grid;gap:4px;margin:8px 0 10px;color:#c7d4e2;font-size:12px}#editModal .skill-entry-label small{color:#91a5ba;font-size:11px;line-height:1.5}#editModal #skillName{min-width:0;min-height:46px;background:#0b1522;border:1px solid #8ea9c533;color:#f4f7fc;font-size:14px}#editModal #skillLevel{min-height:46px;color:#f4f7fc;background:#111d2b}\n.search-empty-state{grid-column:1/-1;display:grid;justify-items:center;gap:9px;text-align:center;padding:34px 22px;border:1px dashed #8ea9c544;border-radius:16px;background:linear-gradient(135deg,#121e2c,#0b1420);color:#e8eef5}.search-empty-state>span{font-size:30px;color:#7de2d6}.search-empty-state>b{font-size:15px}.search-empty-state p{margin:0;color:#9aabbd;font-size:12px}\n.signal-strip{position:relative;max-width:1380px;margin:-8px auto 24px;padding:14px 20px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;border:0;background:linear-gradient(90deg,transparent,#111d2cbb,transparent)}.signal-strip div{justify-content:flex-start;gap:13px;padding:15px 18px;border:1px solid #8ea9c52b;border-radius:13px;background:linear-gradient(145deg,#172434d9,#0d1623d9);box-shadow:0 12px 34px #0003}.signal-strip strong{font-size:13px}.signal-strip span{font-size:10px;letter-spacing:.12em}.candidate-stage-copy h1{font-size:clamp(34px,4.4vw,64px)!important;line-height:1.03;max-width:12ch;letter-spacing:-.055em}\n@media(max-width:760px){.identity-workspace{min-height:0}.identity-universe{min-height:560px;height:560px}.node-intent{bottom:-1%!important}.visibility-hint{width:calc(100% - 24px);margin:10px auto 14px!important}#editModal .skill-add .inline-form{grid-template-columns:1fr 1fr}#editModal #skillName{grid-column:1/-1}.signal-strip{grid-template-columns:repeat(2,minmax(0,1fr));padding:10px 16px;gap:8px}.signal-strip div{padding:11px 10px}.candidate-core .candidate-monogram{width:70px;height:70px}}\n';
write("public/styles.css",css);
console.log("ZERILYS interface corrections applied");

let languageFile=read("public/i18n.js");
if(!languageFile.includes("ZERILYS profile translation completion")){
 const translations={
 "Explore field":"Explorer mon univers","Focus mode":"Mode concentration","Connections":"Relations","Share identity":"Partager mon profil","Share my public profile":"Partager mon profil public","Data & privacy":"Données et confidentialité","Share beta feedback":"Donner mon avis sur la bêta",
 "YOUR PROFILE FIELD":"VOTRE UNIVERS PROFESSIONNEL","Your professional universe.":"Votre univers professionnel.","Not a CV. A living map of what you are, what you can prove, and what you could create next.":"Bien plus qu’un CV : une cartographie vivante de vos compétences, de vos réalisations et de vos ambitions.","YOUR PROFESSIONAL PROFILE":"VOTRE PROFIL PROFESSIONNEL","One space. Your whole potential.":"Un espace. Tout votre potentiel.",
 "CAPABILITIES":"COMPÉTENCES","EVIDENCE":"RÉALISATIONS","TRAJECTORY":"PARCOURS","INTENT":"ASPIRATIONS","NETWORK":"RÉSEAU","IMPACT":"IMPACT","ASSESSMENTS":"ÉVALUATIONS","OPPORTUNITIES":"OPPORTUNITÉS","Experience & direction":"Expérience et perspectives","What comes next":"La suite de votre parcours","People & proximity":"Personnes et proximité","Work that matters":"Des réalisations qui comptent","Tests & résultats":"Tests et résultats",
 "YOUR CORE SIGNAL":"VOTRE PROFIL EN UN COUP D’ŒIL","Your identity at a glance.":"Votre identité professionnelle en un coup d’œil.","CAPABILITY FIELD":"COMPÉTENCES","What can you actually do?":"Ce que vous savez réellement faire.","PROOF LAYER":"RÉALISATIONS","Show the work behind the claim.":"Les réalisations qui étayent vos compétences.","TRAJECTORY":"PARCOURS","Where have you been — where next?":"Votre parcours et vos prochaines étapes.","INTENT FIELD":"ASPIRATIONS","What do you want to make possible?":"Qu’aimeriez-vous rendre possible ?","MEMBER NETWORK":"RÉSEAU","Discover the people around your orbit.":"Découvrez les profils qui peuvent enrichir votre réseau.","Search members, skills or places":"Rechercher un membre, une compétence ou un lieu","Search member profiles":"Rechercher des profils professionnels","Search ↗":"Rechercher ↗","Searching the member network…":"Recherche dans le réseau…","No matching profiles. Try another name, skill or location.":"Aucun profil ne correspond à votre recherche. Essayez un autre nom, une compétence ou une localisation.","No profiles match your search.":"Aucun profil ne correspond à votre recherche.","Try another skill, profession or location.":"Essayez une autre compétence, un métier ou une localisation.","The network is taking shape. Be among the first to create a profile.":"Le réseau se construit. Les premiers profils apparaîtront ici au fil des inscriptions.","The first professional profiles will appear here as members join.":"Les premiers profils professionnels apparaîtront ici au fil des inscriptions.","SELECT A SIGNAL OR CAPABILITY TO EXPLORE":"SÉLECTIONNEZ UNE DIMENSION POUR EXPLORER VOTRE PROFIL","PROFILE CONSOLE":"ESPACE PROFIL","PRIVATE TO YOU":"VISIBLE UNIQUEMENT PAR VOUS","ZERIH / PROFILE OS":"ZERILYS / ESPACE PROFIL",
 "Search a skill, a profile or a location":"Rechercher une compétence, un profil ou un lieu","Search profiles ↗":"Rechercher des profils ↗","Create a project ↗":"Créer un projet ↗","PROJECTS & COLLABORATIONS":"PROJETS & COLLABORATIONS","Find the right people<br><em>to build with.</em>":"Réunissez les bonnes compétences<br><em>pour concrétiser vos idées.</em>","Discover projects or bring your own challenge to the network.":"Découvrez des projets ou proposez une initiative au réseau.","From idea<br>to team.":"De l’idée<br>à l’équipe.","Meet people with complementary skills and move a project forward.":"Associez des compétences complémentaires pour faire avancer un projet.","Create a project":"Créer un projet","Describe the goal, the people you need and the outcome your team will produce.":"Présentez votre objectif, les compétences recherchées et les livrables attendus.","Project title":"Nom du projet","Project description":"Présentation détaillée du projet","Project type":"Type de projet","Time commitment":"Disponibilité attendue","Duration (weeks)":"Durée estimée (semaines)","Maximum team size, including you":"Taille maximale de l’équipe, vous compris","Skills needed (comma separated)":"Compétences recherchées (séparées par des virgules)","Expected deliverables (comma separated)":"Livrables attendus (séparés par des virgules)","Publish project":"Publier le projet",
 "Create your identity":"Créez votre profil","Welcome back":"Heureux de vous retrouver","Your name":"Votre nom","Professional headline":"Accroche professionnelle","Location":"Localisation","Availability":"Disponibilité","Profile visibility":"Visibilité du profil","About your work":"À propos de votre activité","What can you bring?":"Ce que vous pouvez apporter","What are you looking for?":"Ce que vous recherchez","Interests and themes":"Centres d’intérêt et thématiques","Website (HTTPS only)":"Site web (HTTPS uniquement)","Practitioner":"Opérationnel","Learning":"En apprentissage","Advanced":"Avancé","Expert":"Expert","Add":"Ajouter","Evidence of your work":"Réalisations","Project, credential or achievement":"Projet, certification ou réalisation","Connect to a capability (optional)":"Associer à une compétence (facultatif)","Add evidence":"Ajouter une réalisation","Add a capability":"Ajouter une compétence","Remove skill":"Retirer cette compétence","Profile photo":"Photo de profil","Add / change photo":"Ajouter / modifier la photo","Remove photo":"Retirer la photo",
 "Your profile is visible to ZERILYS members and through its public link. You can limit anonymous discovery at any time.":"Votre profil est visible des membres ZERILYS et via son lien public. Vous pouvez limiter sa visibilité aux visiteurs non connectés à tout moment."
 };
 const rows=Object.entries(translations).map(([k,v])=>"    "+JSON.stringify(k)+": "+JSON.stringify(v)+",").join("\n");
 languageFile=languageFile.replace("  const fr = {","  const fr = {\n    // ZERILYS profile translation completion\n"+rows);
}
write("public/i18n.js",languageFile);

let pricing=read("public/index.html");
pricing=pricing.replace('<p class="pricing-price">Sur invitation</p>','<p class="pricing-price">0 € · Bêta sur invitation</p>');
pricing=pricing.replace('<p class="pricing-price">Gratuit</p>','<p class="pricing-price">0 € pendant la bêta</p>');
write("public/index.html",pricing);
let layout=read("public/styles.css");
if(!layout.includes("ZERILYS desktop bento landing layout"))layout+='\n/* ZERILYS desktop bento landing layout */\n@media(min-width:1100px){\n body>main{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:20px;max-width:1560px;margin:0 auto;padding:0 24px}\n body>main>.candidate-hero,body>main>.signal-strip,body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters,body>main>.trust-section,body>main>.closing{grid-column:1/-1;width:100%;max-width:none;margin:0}\n body>main>#projects{grid-column:1/span 6;width:100%;max-width:none;margin:0;padding:36px 30px;border:1px solid #91b4d52b;border-radius:22px;background:linear-gradient(145deg,#111d2be8,#0b1420eF)}\n body>main>#opportunities{grid-column:7/-1;width:100%;max-width:none;margin:0;padding:36px 30px;border:1px solid #91b4d52b;border-radius:22px;background:linear-gradient(145deg,#111d2be8,#0b1420eF)}\n body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters{padding:clamp(30px,3.5vw,58px);border:1px solid #91b4d51f;border-radius:24px;background:linear-gradient(145deg,#101c2a88,#0b142055)}\n body>main>.signal-strip{margin:0;padding:12px 20px}\n body>main>.trust-section{max-width:none;padding:42px 58px;margin:0}\n body>main>.closing{padding:46px 20px 70px}\n}\n@media(min-width:1100px) and (max-width:1350px){body>main>#projects,body>main>#opportunities{padding:28px 22px}.project-layout{grid-template-columns:1fr}.project-intro{padding:24px}}\n@media(max-width:1099px){body>main{display:block}.section,.global-pulse,.trust-section,.closing{margin-inline:auto}}\n';
write("public/styles.css",layout);


/* ZERILYS premium refinement 2026-11-14 */
let premiumApp = read("public/app.js");
const authMinLength = '$("#authForm").elements.password.autocomplete=mode==="login"?"current-password":"new-password";modal("authModal")}';
const authMinLengthFixed = '$("#authForm").elements.password.autocomplete=mode==="login"?"current-password":"new-password";$("#authForm").elements.password.minLength=mode==="login"?0:12;$("#authForm").elements.password.maxLength=128;$("#authForm").noValidate=false;modal("authModal")}';
if (premiumApp.includes(authMinLength)) premiumApp = premiumApp.replace(authMinLength, authMinLengthFixed);
write("public/app.js", premiumApp);

let premiumCss = read("public/styles.css");
if (!premiumCss.includes("ZERILYS refined lower-page layout")) {
premiumCss += `
/* ZERILYS refined lower-page layout — original hero untouched */
body>main{
  display:grid;grid-template-columns:repeat(12,minmax(0,1fr));
  column-gap:22px;row-gap:20px;max-width:1500px;margin:0 auto;
  padding:0 clamp(22px,4vw,64px);
}
body>main>.candidate-hero{grid-column:1/-1}
body>main>.signal-strip,body>main>#discover,body>main>#global-pulse,
body>main>#for-recruiters,body>main>.trust-section,body>main>.closing{
  grid-column:1/-1;width:100%;max-width:none;margin-inline:0;
}
body>main>.signal-strip{
  margin:12px 0 18px;padding:16px 6px;
  border-top:1px solid rgba(164,190,211,.13);
  border-bottom:1px solid rgba(164,190,211,.13);
  background:transparent;box-shadow:none;gap:0;
}
body>main>.signal-strip>div{
  justify-content:flex-start;padding:9px 20px;
  border-right:1px solid rgba(164,190,211,.12);
  background:transparent;box-shadow:none;
}
body>main>.signal-strip strong{font-size:10px;color:#82bcb8}
body>main>.signal-strip span{font-size:9px;letter-spacing:.15em;color:#aab8c7}
body>main>#projects,body>main>#opportunities{
  width:100%;max-width:none;margin:0;padding:clamp(28px,3vw,44px);
  border:1px solid rgba(164,190,211,.13);border-radius:18px;
  background:linear-gradient(145deg,rgba(18,30,44,.72),rgba(10,18,29,.55));
  box-shadow:none;
}
body>main>#projects{grid-column:1/span 6}
body>main>#opportunities{grid-column:7/-1}
body>main>#projects .project-layout{grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:20px}
body>main>#projects .project-intro{padding:20px;border:0;background:transparent}
body>main>#projects .big-number{font-size:48px;color:#8ac9c1}
body>main>#projects .project-card,body>main>#opportunities .opportunity-card{
  border:1px solid rgba(164,190,211,.12);border-radius:12px;
  background:rgba(21,34,49,.56);box-shadow:none;
}
body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters{
  padding:clamp(38px,4.5vw,68px) clamp(4px,1.4vw,20px);
  border:0;border-top:1px solid rgba(164,190,211,.13);
  border-radius:0;background:transparent;box-shadow:none;
}
body>main>.section .section-head{gap:32px;margin-bottom:28px}
body>main>.section .section-head h2{font-size:clamp(30px,3vw,44px);line-height:1.08;letter-spacing:-.045em}
body>main>.section .section-head p{max-width:410px;font-size:13px;line-height:1.8;color:#a3b0bf}
body>main>.trust-section{
  margin:20px 0 10px;padding:clamp(32px,4vw,54px);
  border:1px solid rgba(164,190,211,.12);border-radius:19px;
  background:linear-gradient(130deg,rgba(20,33,48,.74),rgba(10,18,28,.62));
  box-shadow:none;
}
body>main>.closing{padding:42px 10px 68px}
.btn{box-shadow:none}
.btn.primary{background:linear-gradient(110deg,#a8d9d1,#b8c8e7);color:#101a27;border:0}
.btn.primary:hover{filter:brightness(1.06);transform:translateY(-1px)}
@media(max-width:1050px){body>main{display:block;padding:0 24px}body>main>#projects,body>main>#opportunities{margin:16px 0}}
@media(max-width:640px){
 body>main{padding:0 16px}
 body>main>#projects,body>main>#opportunities{padding:23px 17px}
 body>main>#projects .project-layout{grid-template-columns:1fr}
 body>main>.section .section-head{display:block}
 body>main>.section .section-head p{margin-top:16px}
 body>main>.signal-strip{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));row-gap:8px}
 body>main>.signal-strip>div{padding:10px 12px}
}
`;
}



/* ZERILYS CSRF recovery on sign-in */
let csrfRecoveryApp = read("public/app.js");
const apiHelper = 'async function api(path,options={}){const r=await fetch("/api"+path,{...options,headers:{"Content-Type":"application/json",...(options.method&&options.method!=="GET"?{"X-CSRF-Token":csrfToken}:{}),...(options.headers||{})}});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(window.ZERIHLINK_I18N?.translate(data.message||data.error||"Something went wrong")||data.message||data.error||"Something went wrong");return data}';
const apiHelperFixed = 'async function api(path,options={}){const send=()=>fetch("/api"+path,{...options,headers:{"Content-Type":"application/json",...(options.method&&options.method!=="GET"?{"X-CSRF-Token":csrfToken}:{}),...(options.headers||{})}});let r=await send(),data=await r.json().catch(()=>({}));if(!r.ok&&data.error==="CSRF_INVALID"&&options.method&&options.method!=="GET"){const cfg=await fetch("/api/config",{cache:"no-store"}).then(x=>x.json());appConfig={...appConfig,...cfg};csrfToken=cfg.csrfToken||"";r=await send();data=await r.json().catch(()=>({}));}if(!r.ok)throw new Error(window.ZERIHLINK_I18N?.translate(data.message||data.error||"Something went wrong")||data.message||data.error||"Something went wrong");return data}';
if (csrfRecoveryApp.includes(apiHelper)) csrfRecoveryApp = csrfRecoveryApp.replace(apiHelper, apiHelperFixed);
write("public/app.js",csrfRecoveryApp);


// ZERILYS employer offer: French copy and approved pricing
let employerHtml = read("public/index.html");
const employerReplacements = [
  ["SPECIALIST RECRUITMENT · EMPLOYER OFFER","RECRUTEMENT SPÉCIALISÉ · OFFRES ENTREPRISES"],
  ["Recruit differently.","Recrutez autrement."],
  ["A workspace to identify rare expertise, understand demonstrated capabilities and manage conversations with talent.","Un espace pour repérer les expertises rares, comprendre les compétences démontrées et échanger avec les talents."],
  ["CANDIDATE","CANDIDAT"],
  ["RECRUITER","RECRUTEUR"],
  ["Professional identity","Identité professionnelle"],
  ["Evolving professional profile","Profil professionnel évolutif"],
  ["Skills and evidence","Compétences et réalisations"],
  ["Discovery and opportunities","Découverte et opportunités"],
  ["Proposed candidate access","Accès candidat gratuit"],
  ["Specialist talent search","Recherche de talents spécialisés"],
  ["Profiles, skills and evidence","Profils, compétences et réalisations"],
  ["Opportunity publishing and tracking","Publication et suivi des opportunités"],
  ["Application pipeline management","Suivi des candidatures"],
  ["Shared recruitment workspace","Espace de recrutement partagé"],
  ["Recruiter and viewer roles","Rôles recruteur et lecteur"],
  ["Opportunity coordination","Coordination des opportunités"],
  ["Dedicated deployment and support","Déploiement et accompagnement dédiés"],
  ["Configuration according to needs","Paramétrage selon vos besoins"],
  ["Specific terms and support","Conditions et accompagnement spécifiques"],
  ["Case-by-case study","Étude personnalisée"],
  ["Tarif à définir","39 € HT / mois"],
  ["Offre pilote","Offre Solo"],
  ["Offre équipe","Offre Team"],
  ["Tarif à définir avec les partenaires pilotes","Tarif partenaire bêta : 29 € HT / mois pendant 12 mois"]
];
for (const [before, after] of employerReplacements) employerHtml = employerHtml.replaceAll(before, after);
employerHtml = employerHtml.replace("39 € HT / mois","39 € HT / mois · 390 € HT / an");
employerHtml = employerHtml.replace("Offre équipe","Offre Team");
employerHtml = employerHtml.replace("Offre Team","Offre Team · 89 € HT / mois · 890 € HT / an");
employerHtml = employerHtml.replace("89 € HT / mois","89 € HT / mois · 890 € HT / an");
employerHtml = employerHtml.replace("179 € HT / mois","179 € HT / mois · 1 790 € HT / an");
employerHtml = employerHtml.replace("29 € HT / mois pendant 12 mois","29 € HT / mois pendant 12 mois");
employerHtml = employerHtml.replace("Tarif partenaire bêta : 29 € HT / mois pendant 12 mois","Tarif partenaire bêta : Solo 29 € · Team 69 € · Business 139 € HT / mois, prix bloqués 12 mois");
employerHtml = employerHtml.replace("Tarif à définir","Tarif sur devis");
employerHtml = employerHtml.replace("Sur mesure","Sur mesure · sur devis");
if (!employerHtml.includes("Business : 179 € HT / mois")) {
  employerHtml = employerHtml.replace("</main>", '<section class="employer-pricing-note" aria-label="Tarifs complémentaires"><strong>Offre Business :</strong> 179 € HT / mois ou 1 790 € HT / an. <strong>Tarifs partenaires bêta :</strong> Solo 29 €, Team 69 €, Business 139 € HT / mois, bloqués pendant 12 mois. <strong>Entreprise :</strong> sur devis.</section></main>');
}
write("public/index.html", employerHtml);
let employerCss = read("public/styles.css");
if (!employerCss.includes("ZERILYS employer pricing clarity")) employerCss += `
/* ZERILYS employer pricing clarity */
.employer-pricing-note{max-width:1180px;margin:22px auto 0;padding:15px 18px;border-top:1px solid rgba(164,190,211,.16);color:#aab9c9;font-size:12px;line-height:1.8}
.employer-pricing-note strong{color:#e9f0f7;font-weight:650}
`;
write("public/styles.css", employerCss);


// Remove the redundant four-step index strip below the original candidate hero.
// The main content grid then closes naturally, without reserving a blank slot.
let removeIndexStripApp = read("public/app.js");
if (!removeIndexStripApp.includes("ZERILYS remove redundant lower-page index strip")) {
  removeIndexStripApp += String.raw`
/* ZERILYS remove redundant lower-page index strip */
(() => {
  const labels = ["01 PROFIL", "02 RÉALISATIONS", "03 OPPORTUNITÉS", "04 PROJETS"];
  const normalize = value => (value || "").replace(/\\s+/g, " ").trim().toLocaleUpperCase("fr");
  const removeStrip = () => {
    const nodes = labels.map(label => [...document.querySelectorAll("body *")].find(el =>
      el.children.length === 0 && normalize(el.textContent) === label
    ));
    if (nodes.some(node => !node)) return;
    let parent = nodes[0].parentElement;
    while (parent && parent !== document.body && !nodes.every(node => parent.contains(node))) parent = parent.parentElement;
    if (!parent || parent === document.body || parent.tagName === "MAIN") return;
    const text = normalize(parent.textContent);
    if (!labels.every(label => text.includes(label))) return;
    const rowNodes = nodes.map(node => {
      let row = node;
      while (row.parentElement && row.parentElement !== parent) row = row.parentElement;
      return row;
    });
    if (new Set(rowNodes).size !== 4) return;
    parent.remove();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", removeStrip, { once: true });
  else removeStrip();
})();
`;
}
write("public/app.js", removeIndexStripApp);


/* ZERILYS final visual repair — footer, pricing, hero core and index strip */
let finalRepairCss = read("public/styles.css");
finalRepairCss += String.raw`
/* Footer pricing note: full-width, readable and never squeezed into one grid track */
.employer-pricing-note{
  display:block!important;grid-column:1/-1!important;flex:0 0 100%!important;
  width:100%!important;max-width:1500px!important;min-width:0!important;
  box-sizing:border-box!important;margin:24px auto 0!important;padding:18px 24px!important;
  line-height:1.75!important;overflow-wrap:normal!important;word-break:normal!important;
  border-top:1px solid rgba(164,190,211,.16);font-size:12px!important;
}
footer,.site-footer,.footer,.footer-inner{
  min-width:0;
}
footer .footer-grid,footer .footer-inner,.site-footer .footer-grid,.site-footer .footer-inner{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:22px;
}
footer .footer-brand,footer .brand,footer .footer-links,.site-footer .footer-brand,.site-footer .footer-links{
  min-width:0;max-width:100%;
}
.candidate-core .candidate-monogram{
  width:108px!important;height:108px!important;min-width:108px!important;
  display:grid!important;place-items:center!important;overflow:hidden!important;
  border-radius:50%!important;letter-spacing:0!important;line-height:1!important;
}
.candidate-core .candidate-monogram .candidate-hero-initials,
.candidate-core .candidate-monogram>span:not(i){
  display:flex!important;align-items:center!important;justify-content:center!important;
  width:100%!important;height:100%!important;padding:0!important;margin:0!important;
  font-family:var(--display,Manrope,sans-serif)!important;font-size:25px!important;
  font-weight:800!important;letter-spacing:.055em!important;line-height:1!important;
  white-space:nowrap!important;transform:none!important;
}
.candidate-core .candidate-monogram img{width:100%;height:100%;object-fit:cover;border-radius:50%}
@media(max-width:760px){.candidate-core .candidate-monogram{width:76px!important;height:76px!important;min-width:76px!important}.candidate-core .candidate-monogram .candidate-hero-initials{font-size:19px!important}}
`;
write("public/styles.css",finalRepairCss);

let finalRepairHtml = read("public/index.html");
const oldPartnerNote = /<section class="employer-pricing-note" aria-label="Tarifs complémentaires">[\\s\\S]*?<\\/section>/;
if (oldPartnerNote.test(finalRepairHtml)) {
 finalRepairHtml=finalRepairHtml.replace(oldPartnerNote,'<section class="employer-pricing-note" aria-label="Tarifs partenaires"><strong>Tarifs partenaires bêta :</strong> Solo : 29 € HT/mois · Team : 69 € HT/mois · Business : 139 € HT/mois. Prix garantis pendant 12 mois pour les partenaires pilotes. <strong>Offre Business standard :</strong> 179 € HT/mois ou 1 790 € HT/an. <strong>Offre Entreprise :</strong> sur devis.</section>');
}
write("public/index.html",finalRepairHtml);

let finalRepairApp=read("public/app.js");
if(!finalRepairApp.includes("ZERILYS final French pricing and index cleanup")){
finalRepairApp+=String.raw`
/* ZERILYS final French pricing and index cleanup */
(() => {
 const clean = () => {
  const cards=[...document.querySelectorAll(".pricing-card")];
  if(cards.length>=4){
   const intro=[...document.querySelectorAll("h1,h2,h3")].find(el=>(el.textContent||"").includes("Recrutez autrement")||(el.textContent||"").includes("Recruit differently"));
   if(intro) intro.textContent="Recrutez autrement. Avec des compétences mieux documentées.";
   const cardData=[
    {k:"CANDIDAT",h:"Identité professionnelle",p:"0 € pendant la bêta",items:["Profil professionnel évolutif","Compétences et réalisations","Découverte et opportunités"],foot:"Accès candidat gratuit"},
    {k:"RECRUTEUR",h:"Offre Solo",p:"39 € HT / mois · 390 € HT / an",items:["Recherche de talents spécialisés","Profils, compétences et réalisations","Publication et suivi des opportunités","Suivi des candidatures"],foot:"Tarif standard"},
    {k:"ÉQUIPE",h:"Offre Team",p:"89 € HT / mois · 890 € HT / an",items:["Espace de recrutement partagé","Rôles recruteur et lecteur","Coordination des opportunités","Gestion d’équipe"],foot:"Tarif standard"},
    {k:"ENTREPRISE",h:"Offre Entreprise",p:"Sur devis",items:["Déploiement et accompagnement dédiés","Paramétrage selon vos besoins","Conditions et accompagnement spécifiques"],foot:"Étude personnalisée"}
   ];
   cards.slice(0,4).forEach((card,i)=>{
    const d=cardData[i];
    const kicker=card.querySelector(".pricing-kicker");if(kicker)kicker.textContent=d.k;
    const heading=card.querySelector("h3");if(heading)heading.textContent=d.h;
    const price=card.querySelector(".pricing-price");if(price)price.textContent=d.p;
    const list=card.querySelector("ul");
    if(list){list.replaceChildren(...d.items.map(value=>{const li=document.createElement("li");li.textContent=value;return li;}));}
    const foot=card.querySelector(".pricing-foot");if(foot)foot.textContent=d.foot;
   });
  }
  const note=document.querySelector(".employer-pricing-note");
  if(note){note.style.gridColumn="1 / -1";note.style.width="100%";note.style.maxWidth="1500px";note.style.margin="24px auto 0";note.style.boxSizing="border-box";note.textContent="Tarifs partenaires bêta : Solo 29 € HT/mois · Team 69 € HT/mois · Business 139 € HT/mois, prix garantis pendant 12 mois. Offre Business standard : 179 € HT/mois ou 1 790 € HT/an. Offre Entreprise : sur devis.";}
  const labels=["01 PROFIL","02 RÉALISATIONS","03 OPPORTUNITÉS","04 PROJETS"];
  const norm=s=>(s||"").replace(/\\s+/g," ").trim().toLocaleUpperCase("fr");
  const leaves=[...document.querySelectorAll("body *")].filter(el=>el.children.length===0&&labels.includes(norm(el.textContent)));
  if(leaves.length===4){
   const rows=leaves.map(el=>{let n=el;while(n.parentElement&&n.parentElement!==document.querySelector("main"))n=n.parentElement;return n;});
   [...new Set(rows)].forEach(row=>{if(row&&row.parentElement)row.remove();});
  }
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",clean,{once:true});else clean();
})();
`;
}
write("public/app.js",finalRepairApp);
console.log("ZERILYS final visual repair applied.");
