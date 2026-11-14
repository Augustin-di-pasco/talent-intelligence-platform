import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.argv[2]||"zeri_work18");
const file=path.join(root,"public/i18n.js");
let source=fs.readFileSync(file,"utf8");
const rows=[
["ZERILYS Talent Intelligence","ZERILYS — Intelligence des talents","ZERILYS Talent Intelligence"],
["Entreprise / organisation","Entreprise / organisation","Company / organisation"],
["Optional — only if you received an invitation","Facultatif — uniquement si vous avez reçu une invitation","Optional — only if you received an invitation"],
["Task updated.","Tâche mise à jour.","Task updated."],
["Please provide a review note of at least 20 characters.","Veuillez fournir une justification d’au moins 20 caractères.","Please provide a review note of at least 20 characters."],
["Tester feedback updated.","Retour du testeur mis à jour.","Tester feedback updated."],
["Clipboard unavailable. Copy the tokens individually.","Presse-papiers indisponible. Copiez les codes un par un.","Clipboard unavailable. Copy the tokens individually."],
["This company page is not available.","Cette page entreprise n’est pas disponible.","This company page is not available."],
["Manual invitation tokens copied.","Codes d’invitation manuels copiés.","Manual invitation tokens copied."],
["Revoke this pending invitation?","Révoquer cette invitation en attente ?","Revoke this pending invitation?"],
["Invitation revoked.","Invitation révoquée.","Invitation revoked."],
["Élément de parcours supprimé.","Élément de parcours supprimé.","Career history item removed."],
["La justification doit comporter au moins 20 caractères.","La justification doit comporter au moins 20 caractères.","The review note must contain at least 20 characters."],
["Revue humaine enregistrée.","Revue humaine enregistrée.","Human review saved."],
["Expérience ajoutée au parcours.","Expérience ajoutée au parcours.","Work experience added to career history."],
["Formation ajoutée au parcours.","Formation ajoutée au parcours.","Education added to career history."],
["Justificatif transmis. Le badge sera attribué après vérification.","Justificatif transmis. Le badge sera attribué après vérification.","Supporting document submitted. The badge will be awarded after review."],
["Recruter autrement.","Recrutez autrement.","Recruit differently."],
["39 € HT / mois · 390 € HT / an","39 € HT/mois · 390 € HT/an","€39 excl. VAT/month · €390 excl. VAT/year"],
["39 € HT / mois","39 € HT/mois","€39 excl. VAT/month"]
];
if(!source.includes("ZERILYS final bilingual microcopy corrections")){
 const at=source.indexOf('  let language = "fr";');
 if(at<0)throw new Error("Language engine insertion point not found");
 const block="\n  // ZERILYS final bilingual microcopy corrections\n"
  +"  const finalCoveragePairs = "+JSON.stringify(rows)+";\n"
  +"  for (const [original, french, english] of finalCoveragePairs) { fr[original]=french; en[original]=english; en[french]=english; }\n";
 source=source.slice(0,at)+block+source.slice(at);
}
fs.writeFileSync(file,source);
console.log("ZERILYS final bilingual microcopy corrections applied.");
