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
if(!source.includes("ZERILYS final all-surface bilingual translations")){
 const at=source.indexOf('  let language = "fr";');
 if(at<0)throw new Error("Language engine insertion point not found");
 const block="\n  // ZERILYS final all-surface bilingual translations\n"
  +"  const allSurfaceLanguagePairs = "+JSON.stringify(rows)+";\n"
  +"  for (const [original, french, english] of allSurfaceLanguagePairs) { fr[original]=french; en[original]=english; en[french]=english; }\n";
 source=source.slice(0,at)+block+source.slice(at);
}
fs.writeFileSync(file,source);
const server=fs.readFileSync(path.join(root,"src/server.js"),"utf8");
for(const term of ["Reset your ZERILYS password","Your ZERILYS private beta invitation","New candidate interest","Application status updated"]){
 const i=server.indexOf(term);
 if(i>=0)for(let j=Math.max(0,i-900),n=0;j<Math.min(server.length,i+1600);j+=650,n++)console.log("ZERILYS_EMAIL_CONTEXT_"+term.replace(/[^a-z]/gi,"_")+"_"+n,server.slice(j,Math.min(server.length,j+650)));
}
console.log("ZERILYS final all-surface bilingual translations applied.");
