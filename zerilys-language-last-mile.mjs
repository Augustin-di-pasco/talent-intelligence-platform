import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.argv[2]||"zeri_work18");
const file=path.join(root,"public/i18n.js");
let source=fs.readFileSync(file,"utf8");
const rows=[
["Add supporting evidence ↗","Ajouter une réalisation à l’appui ↗","Add supporting evidence ↗"],
["Add a professional headline","Ajouter une accroche professionnelle","Add a professional headline"],
["Company verified. Its published opportunities are now discoverable.","Entreprise vérifiée. Ses opportunités publiées sont désormais visibles.","Company verified. Its published opportunities are now discoverable."],
["Company verification rejected.","Vérification de l’entreprise refusée.","Company verification rejected."],
["Email delivery failed;","L’envoi de l’e-mail a échoué ;","Email delivery failed;"],
["◎ Explore field","◎ Explorer l’univers","◎ Explore field"],
["talent search","recherche de talents","talent search"],
["Reset your ZERILYS password","Réinitialisez votre mot de passe ZERILYS","Reset your ZERILYS password"],
["Describe your company","Présentez votre entreprise","Describe your company"],
["Publish a first opportunity","Publiez une première opportunité","Publish a first opportunity"],
["A structured job, internship, apprenticeship or collaboration.","Une offre d’emploi, un stage, une alternance ou une collaboration structurée.","A structured job, internship, apprenticeship or collaboration."],
["Skills make opportunity relevance understandable.","Les compétences permettent de comprendre la pertinence de chaque opportunité.","Skills make opportunity relevance understandable."],
["Map your capabilities","Cartographiez vos compétences","Map your capabilities"],
["Add at least three skills with realistic proficiency levels.","Ajoutez au moins trois compétences avec des niveaux de maîtrise réalistes.","Add at least three skills with realistic proficiency levels."],
["Attach evidence to your skills","Associez des réalisations à vos compétences","Attach evidence to your skills"],
["Add one concrete project, result or reference.","Ajoutez un projet concret, un résultat ou une référence.","Add one concrete project, result or reference."],
["Make your intentions visible","Rendez vos aspirations visibles","Make your intentions visible"],
["Explain what you can contribute or what you are looking for.","Expliquez ce que vous pouvez apporter ou ce que vous recherchez.","Explain what you can contribute or what you are looking for."],
["Choose your discoverability","Choisissez votre niveau de visibilité","Choose your discoverability"],
["New candidate interest","Nouvel intérêt d’un candidat","New candidate interest"],
["Application status updated","Statut de candidature mis à jour","Application status updated"],
["Your ZERILYS private beta invitation","Votre invitation à la bêta privée ZERILYS","Your ZERILYS private beta invitation"],
["IA autorisée","IA autorisée","AI allowed"],
["L’utilisation de l’IA est autorisée pendant les évaluations liées à cette offre.","L’utilisation de l’IA est autorisée pendant les évaluations liées à cette offre.","AI use is permitted during assessments related to this opportunity."],
["IA non autorisée pendant l’évaluation","IA non autorisée pendant l’évaluation","AI not allowed during the assessment"],
["L’utilisation de l’IA est interdite pendant les évaluations liées à cette offre.","L’utilisation de l’IA est interdite pendant les évaluations liées à cette offre.","AI use is prohibited during assessments related to this opportunity."],
["La capacité à utiliser, vérifier et expliquer les résultats de l’IA fait partie des compétences évaluées.","La capacité à utiliser, vérifier et expliquer les résultats de l’IA fait partie des compétences évaluées.","The ability to use, verify and explain AI outputs is part of the skills being assessed."],
["Un résultat manquant n’est pas une note nulle.","Un résultat manquant n’est pas une note nulle.","A missing result is not a zero score."],
["Votre parcours de complétion est momentanément indisponible.","Votre parcours de complétion est momentanément indisponible.","Your completion progress is temporarily unavailable."],
["En attente de revue","En attente de revue","Awaiting review"],
["Justifiez la décision (au moins 20 caractères). Ne recopiez pas de données sensibles.","Justifiez la décision (au moins 20 caractères). Ne recopiez pas de données sensibles.","Justify the decision (at least 20 characters). Do not copy sensitive data."],
["02 RÉALISATIONS","02 RÉALISATIONS","02 EVIDENCE"],
["03 OPPORTUNITÉS","03 OPPORTUNITÉS","03 OPPORTUNITIES"],
["Accès candidat gratuit","Accès candidat gratuit","Free access for candidates"],
["Profils, compétences et réalisations","Profils, compétences et réalisations","Profiles, skills and evidence"],
["Suivi des candidatures","Suivi des candidatures","Application tracking"],
["Offre Team","Offre Équipe","Team plan"],
["89 € HT / mois · 890 € HT / an","89 € HT/mois · 890 € HT/an","€89 excl. VAT/month · €890 excl. VAT/year"],
["Offre Entreprise","Offre Entreprise","Enterprise plan"],
["Sur devis","Sur devis","By quotation"],
["Paramétrage selon vos besoins","Paramétrage selon vos besoins","Configuration based on your needs"],
["Étude personnalisée","Étude personnalisée","Tailored assessment"],
["Accès gratuit pour les talents","Accès gratuit pour les talents","Free access for talent"],
["01 PROFIL","01 PROFIL","01 PROFILE"],
["Gratuit pour tous les talents","Gratuit pour tous les talents","Free for all talent"],
["Offre recruteur","Offre recruteur","Recruiter plan"],
["89 € HT / mois","89 € HT/mois","€89 excl. VAT/month"],
["Accéder gratuitement","Accéder gratuitement","Get free access"],
["Demande d’information — Offre Entreprise ZERILYS","Demande d’information — Offre Entreprise ZERILYS","Information request — ZERILYS Enterprise plan"],
["Échanger avec l’équipe","Échanger avec l’équipe","Talk to the team"],
["Aucune évaluation autorisée par le candidat.","Aucune évaluation autorisée par le candidat.","No assessment is authorised by the candidate."],
["Je n'ai pas utilisé d'IA","Je n’ai pas utilisé d’IA","I did not use AI"],
["Je n’ai pas utilisé d’IA","Je n’ai pas utilisé d’IA","I did not use AI"],
["Exécution réalisée dans un service isolé distinct. Le code n'est pas exécuté par le serveur de la plateforme.","Exécution réalisée dans un service isolé distinct. Le code n’est pas exécuté par le serveur de la plateforme.","Execution takes place in a separate isolated service. Code is not executed by the platform server."],
["Aucune évaluation autorisée par le candidat.","Aucune évaluation autorisée par le candidat.","No assessment is authorised by the candidate."]
];
rows.push(
["recruiter","recruteur","Recruiter"],
["viewer","lecteur","Viewer"],
["candidate","candidat","Candidate"],
["company","entreprise","Company"],
["open","ouvert","Open"],
["public","public","Public"],
["private","privé","Private"],
["degree","diplôme","Degree"]
);
if(!source.includes("ZERILYS final all-surface bilingual translations")){
 const at=source.indexOf('  let language = "fr";');
 if(at<0)throw new Error("Language engine insertion point not found");
 const block="\n  // ZERILYS final all-surface bilingual translations\n"
  +"  const allSurfaceLanguagePairs = "+JSON.stringify(rows)+";\n"
  +"  for (const [original, french, english] of allSurfaceLanguagePairs) { fr[original]=french; en[original]=english; en[french]=english; }\n";
 source=source.slice(0,at)+block+source.slice(at);
}
fs.writeFileSync(file,source);

let server=fs.readFileSync(path.join(root,"src/server.js"),"utf8");
const resetPattern=/(await\s+)?sendTransactionalEmail\(\{(to:\s*[^,]+,\s*)subject\s*:\s*"Reset your ZERILYS password",\s*text,\s*html\}\);/;
const resetMatch=server.match(resetPattern);
if(resetMatch){
 const resetReplacement='const emailLanguage = u.language === "en" ? "en" : "fr"; const localizedText = emailLanguage === "en" ? text : "Réinitialisation du mot de passe ZERILYS\\n\\nVotre code de réinitialisation : " + raw + "\\n\\nOuvrez " + appUrl + ", choisissez « Mot de passe oublié » et saisissez ce code. Il expire dans 30 minutes. Si vous n’avez pas demandé cette réinitialisation, ignorez ce message."; const localizedHtml = emailLanguage === "en" ? html : "<p>Réinitialisation du mot de passe ZERILYS</p><p>Votre code de réinitialisation : <code>" + escapeHtml(raw) + "</code></p><p>Ouvrez <a href=\\"" + escapeHtml(appUrl) + "\\">" + escapeHtml(appUrl) + "</a>, choisissez « Mot de passe oublié » et saisissez ce code. Il expire dans 30 minutes. Si vous n’avez pas demandé cette réinitialisation, ignorez ce message.</p>"; '+(resetMatch[1]||"await " )+'sendTransactionalEmail({'+resetMatch[2]+'subject:emailLanguage === "en" ? "Reset your ZERILYS password" : "Réinitialisez votre mot de passe ZERILYS",text:localizedText,html:localizedHtml});';
 server=server.replace(resetPattern,resetReplacement);
}else console.log("ZERILYS_RESET_EMAIL_PATCH_NOT_FOUND");
const inviteNeedle='await sendTransactionalEmail({to:item.invitation.email,subject:"Your ZERILYS private beta invitation",text,html});';
const inviteReplacement='const emailLanguage = u.language === "en" ? "en" : "fr"; const localizedText = emailLanguage === "en" ? text : "Vous êtes invité(e) à rejoindre la bêta privée de ZERILYS.\\n\\nVotre code d’invitation à usage unique : " + item.raw + "\\n\\nOuvrez " + deliveryConfig.appUrl + ", choisissez « Créer un compte » et saisissez ce code. Il expire dans " + days + " jour(s). Si vous n’attendiez pas cette invitation, ignorez ce message."; const localizedHtml = emailLanguage === "en" ? html : "<p>Vous êtes invité(e) à rejoindre la bêta privée de ZERILYS.</p><p>Votre code d’invitation à usage unique :</p><p><code>" + escapeHtml(item.raw) + "</code></p><p>Ouvrez <a href=\\"" + escapeHtml(deliveryConfig.appUrl) + "\\">" + escapeHtml(deliveryConfig.appUrl) + "</a>, choisissez « Créer un compte » et saisissez ce code. Il expire dans " + days + " jour(s).</p><p>Si vous n’attendiez pas cette invitation, ignorez ce message.</p>"; await sendTransactionalEmail({to:item.invitation.email,subject:emailLanguage === "en" ? "Your ZERILYS private beta invitation" : "Votre invitation à la bêta privée ZERILYS",text:localizedText,html:localizedHtml});';
if(server.includes(inviteNeedle))server=server.replace(inviteNeedle,inviteReplacement);else console.log("ZERILYS_BATCH_INVITE_EMAIL_PATCH_NOT_FOUND");
const singleInviteNeedle='await sendTransactionalEmail({to:email,subject:"Your ZERILYS private beta invitation",text,html});';
const singleInviteReplacement='const emailLanguage = u.language === "en" ? "en" : "fr"; const localizedText = emailLanguage === "en" ? text : "Vous êtes invité(e) à rejoindre la bêta privée de ZERILYS.\\n\\nVotre code d’invitation à usage unique : " + raw + "\\n\\nOuvrez " + appUrl + ", choisissez « Créer un compte » et saisissez ce code. Il expire dans " + days + " jour(s). Si vous n’attendiez pas cette invitation, ignorez ce message."; const localizedHtml = emailLanguage === "en" ? html : "<p>Vous êtes invité(e) à rejoindre la bêta privée de ZERILYS.</p><p>Votre code d’invitation à usage unique :</p><p><code>" + escapeHtml(raw) + "</code></p><p>Ouvrez <a href=\\"" + escapeHtml(appUrl) + "\\">" + escapeHtml(appUrl) + "</a>, choisissez « Créer un compte » et saisissez ce code. Il expire dans " + days + " jour(s).</p><p>Si vous n’attendiez pas cette invitation, ignorez ce message.</p>"; await sendTransactionalEmail({to:email,subject:emailLanguage === "en" ? "Your ZERILYS private beta invitation" : "Votre invitation à la bêta privée ZERILYS",text:localizedText,html:localizedHtml});';
if(server.includes(singleInviteNeedle))server=server.replace(singleInviteNeedle,singleInviteReplacement);

fs.writeFileSync(path.join(root,"src/server.js"),server);
const appSource=fs.readFileSync(path.join(root,"public/app.js"),"utf8");
const i18nSource=fs.readFileSync(path.join(root,"public/i18n.js"),"utf8");
for(const [label,source,terms] of [
 ["APP",appSource,["Intl.DateTimeFormat","Intl.NumberFormat","toLocaleDateString","toLocaleString"]],
 ["I18N",i18nSource,["localStorage","fetch(","document.documentElement.lang","/api/me/language","preferredLanguage","languagechange"]],
 ["SERVER",server,["/api/me/language","preferredLanguage","language:","u.language"]]
]){
 for(const term of terms){const i=source.indexOf(term);if(i>=0)console.log("ZERILYS_LOCALE_DETAIL_"+label+"_"+term.replace(/[^a-z]/gi,"_"),source.slice(Math.max(0,i-120),Math.min(source.length,i+260)));}
}
for(const term of ["zerilys:languagechange","/api/me/language","toLocaleDateString","toLocaleString","Intl.DateTimeFormat"]){
 const i=appSource.indexOf(term);
 if(i>=0)console.log("ZERILYS_LANGUAGE_RUNTIME_"+term.replace(/[^a-z]/gi,"_"),appSource.slice(Math.max(0,i-250),Math.min(appSource.length,i+650)));
}
for(const term of ["async function api","function api(","const api=","fetch(url","fetch(path","window.fetch","New candidate interest","Application status updated"]){
 const i=appSource.indexOf(term);
 if(i>=0)console.log("ZERILYS_APP_LANGUAGE_CONTEXT_"+term.replace(/[^a-z]/gi,"_"),appSource.slice(Math.max(0,i-220),Math.min(appSource.length,i+520)));
}
for(const term of ["preferredLanguage","/api/me","/api/profile","/api/user","language:"]){
 const i=server.indexOf(term);
 if(i>=0)console.log("ZERILYS_SERVER_LANGUAGE_CONTEXT_"+term.replace(/[^a-z]/gi,"_"),server.slice(Math.max(0,i-220),Math.min(server.length,i+520)));
}
const langPrefIndex=appSource.lastIndexOf("languagePreferenceUserId");
if(langPrefIndex>=0)console.log("ZERILYS_LANGUAGE_PREFERENCE_LOGIC",appSource.slice(Math.max(0,langPrefIndex-500),Math.min(appSource.length,langPrefIndex+1100)));
const dateIndex=appSource.lastIndexOf("Intl.DateTimeFormat");
if(dateIndex>=0)console.log("ZERILYS_DATE_FORMAT_LOGIC",appSource.slice(Math.max(0,dateIndex-180),Math.min(appSource.length,dateIndex+240)));
const i18nChange=i18nSource.lastIndexOf("languagechange");
if(i18nChange>=0)console.log("ZERILYS_I18N_CHANGE_LOGIC",i18nSource.slice(Math.max(0,i18nChange-260),Math.min(i18nSource.length,i18nChange+300)));
for(const [label,source,term] of [["APP","app", "languagePreferenceUserId"],["APP","app","zerihlink:languagechange"],["APP","app","preferredLanguage"],["SERVER","server","preferredLanguage"]]){
 const data=label==="APP"?appSource:server;
 let pos=-1,n=0;while((pos=data.indexOf(term,pos+1))>=0&&n<8){console.log("ZERILYS_ALL_LANGUAGE_OCCURRENCES_"+label+"_"+term.replace(/[^a-z]/gi,"_")+"_"+n,data.slice(Math.max(0,pos-180),Math.min(data.length,pos+420)));n++;}
}
const meIndex=server.indexOf('"/api/me"');
if(meIndex>=0)console.log("ZERILYS_SERVER_ME_ROUTE",server.slice(Math.max(0,meIndex-260),Math.min(server.length,meIndex+850)));
const langRoute=server.indexOf("/api/me/language");
if(langRoute>=0)console.log("ZERILYS_LANGUAGE_SERVER_ROUTE",server.slice(Math.max(0,langRoute-250),Math.min(server.length,langRoute+700)));

console.log("ZERILYS transactional email localization",JSON.stringify({reset:server.includes('subject:emailLanguage === "en" ? "Reset your ZERILYS password"'),batchInvite:server.includes('to:item.invitation.email,subject:emailLanguage'),singleInvite:server.includes('to:email,subject:emailLanguage')}));

for(const term of ["Password reset token:","Your one-time invitation token:","New candidate interest","Application status updated"]){
 const i=server.lastIndexOf(term);
 if(i>=0)for(let j=Math.max(0,i-700),n=0;j<Math.min(server.length,i+1000);j+=500,n++)console.log("ZERILYS_FINAL_SERVER_CONTEXT_"+term.replace(/[^a-z]/gi,"_")+"_"+n,server.slice(j,Math.min(server.length,j+500)));
}
console.log("ZERILYS final all-surface bilingual translations applied.");
