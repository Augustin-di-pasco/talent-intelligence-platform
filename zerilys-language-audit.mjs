import fs from "node:fs";
import path from "node:path";
const root=path.resolve("zeri_work18");
const read=p=>fs.existsSync(path.join(root,p))?fs.readFileSync(path.join(root,p),"utf8"):"";
const report=[];
const add=(h,v)=>report.push("\n## "+h+"\n"+v);
const i18n=read("public/i18n.js");
add("I18N STRUCTURE",i18n.split("\n").filter(x=>/const\s+[A-Za-z_$][\w$]*\s*=\s*\{|return\s+\w+|function\s+translate|language\s*=|localStorage|data-i18n/i.test(x)).slice(0,120).join("\n"));
for(const name of ["en","fr"]){
 const m=i18n.match(new RegExp("(?:const|let|var)\\s+"+name+"\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\};"));
 if(m){const keys=[...m[1].matchAll(/^\s*["']([^"']+)["']\s*:/gm)].map(x=>x[1]);add(name.toUpperCase()+" DICTIONARY KEYS ("+keys.length+")",keys.join("\n"));}
}
for(const file of ["public/index.html","public/legal-notice.html","public/beta-terms.html","public/privacy-notice.html","public/app.js","public/i18n.js","src/server.js"]){
 const s=read(file);if(!s)continue;
 const attrs=[...s.matchAll(/\b(?:placeholder|aria-label|title|alt|value|data-i18n|data-en|data-fr)\s*=\s*["']([^"']{2,180})["']/gi)].map(x=>x[1]);
 add(file+" ATTRIBUTE STRINGS ("+attrs.length+")",attrs.slice(0,160).join("\n"));
 const lits=[...s.matchAll(/(["'])((?:\\.|(?!\\1)[\\s\\S]){3,220}?)\\1/g)].map(x=>x[2]).filter(x=>/[A-Za-zÀ-ÿ]{3}/.test(x)&&!/[{}<>$]/.test(x)&&!/^https?:|^\\/|^[.#]/.test(x));
 const picked=lits.filter(x=>/\b(the|your|you|profile|skills|search|create|account|company|project|opportunit|privacy|terms|sign|log|loading|failed|error|save|delete|cancel|close|submit|candidate|recruit|evidence|aspiration|visibility|settings|password|email|available|unavailable|success|please|enter|select|choose|remove|add|publish|message|notification|connexion|profil|compétence|recherche|rechercher|créer|compte|entreprise|projet|opportunité|confidentialité|conditions|candidat|recruteur|enregistrer|supprimer|annuler|fermer|valider|ajouter|publier|chargement|erreur|succès|mot de passe|adresse|visibilité|paramètres|disponible|indisponible|saisissez|choisissez|retirer|modifier|envoyer|télécharger|données|réalisations|aspirations|parcours|équipe|abonnement|paiement)\b/i.test(x));
 add(file+" CANDIDATE LITERALS ("+picked.length+")",picked.slice(0,200).join("\n"));
}
const html=read("public/index.html");
add("HTML TEXT NODES",[...html.matchAll(/>([^<>]{2,180})</g)].map(x=>x[1].trim()).filter(x=>/[A-Za-zÀ-ÿ]{3}/.test(x)).slice(0,220).join("\n"));
const out=report.join("\n");
fs.writeFileSync(path.join(root,"ZERILYS_LANGUAGE_AUDIT.txt"),out);
console.log("ZERILYS_LANGUAGE_AUDIT_BEGIN");
for(let i=0;i<out.length;i+=2600)console.log("ZERILYS_LANGUAGE_AUDIT_CHUNK_"+Math.floor(i/2600)+"\n"+out.slice(i,i+2600));
console.log("ZERILYS_LANGUAGE_AUDIT_END chars="+out.length);
