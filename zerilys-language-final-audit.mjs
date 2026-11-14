import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.argv[2]||"zeri_work18");
const read=n=>fs.existsSync(path.join(root,n))?fs.readFileSync(path.join(root,n),"utf8"):"";
const i18n=read("public/i18n.js");
const frKeys=new Set(),enKeys=new Set();
const frBlocks=[];
for(const m of i18n.matchAll(/const fr = \{([\s\S]*?)\n\s*\};/g))frBlocks.push(m[1]);
for(const m of i18n.matchAll(/Object\.assign\(fr,\s*\{([\s\S]*?)\}\);/g))frBlocks.push(m[1]);
for(const block of frBlocks){
 const re=/^\s*["']((?:\\.|[^"'])+)["']\s*:\s*["']((?:\\.|[^"'])*)["']/gm;
 for(const m of block.matchAll(re)){frKeys.add(m[1]);enKeys.add(m[2]);}
}
for(const m of i18n.matchAll(/Object\.assign\(en,\s*\{([\s\S]*?)\}\);/g)){
 const re=/^\s*["']((?:\\.|[^"'])+)["']\s*:/gm;
 for(const k of m[1].matchAll(re))enKeys.add(k[1]);
}
for(const variable of ["reviewedLanguagePairs","finalLanguagePairs","finalCoveragePairs"]){
 const m=i18n.match(new RegExp("const "+variable+" = (\\[[\\s\\S]*?\\]);"));
 if(m){try{for(const [source,french] of JSON.parse(m[1])){frKeys.add(source);enKeys.add(source);enKeys.add(french);}}catch{}}
}
const englishWords=/\b(the|your|you|profile|skills|search|create|account|company|project|opportunit|privacy|terms|sign|log|loading|failed|error|save|delete|cancel|close|submit|candidate|recruit|evidence|aspiration|visibility|settings|password|email|available|unavailable|success|please|enter|select|choose|remove|add|publish|message|notification|experience|location|network|applications|feedback|team|member|verified|career|history|assessment|results|share|download|forgot|reset|internship|apprenticeship|employment|research|business|industry|technology|finance|data|talent|viewer|recruiter|remote|hybrid|legal|notice|update|website|education|degree|qualification|connection|collaboration|duration|status|pending|accepted|rejected|published|draft|expired|public|private|open|closed|task|deliverable|prototype|supervision|allowance|compensation|institution|specialisation|company|organisation|organisation|field|title|description|feedback|first|action|member|task|workspace|support|team|industry|quotation)\b/i;
const frenchWords=/\b(le|la|les|des|du|de|une|un|votre|vos|vous|nous|dans|pour|avec|est|sont|aucun|aucune|créer|profil|compétence|recherche|candidature|entreprise|projet|opportunité|données|confidentialité|mentions|conditions|accès|partager|enregistrer|envoyer|vérification|équipe|adresse|mot de passe|français|anglais|parcours|réalisations|aspirations|disponibilité|rémunération|formation|expérience|lieu|compte|connexion|inscription|réseau|membre|évaluations|diplôme|équivalence|confirmer|annuler|supprimer|modifier|ajouter|publier|chargement|erreur|succès|étape|intitulé|secteur|établissement|justificatif|droit|personnelles|mise à jour|responsable|hébergement|propriété|intellectuelle|hébergeur|courriel|bêta|gratuit|gratuite|offre|mois|prix|garantis|devis|spécialisés|domaine|risque|compétences|missions|attendues|séparées|virgules|pertinents|niveaux|indicatifs|début|durée|gratification|encadrement|accueil|lieu|ville|pays|précisez|outils|autorisés|limites|attentes|légales|responsabilités|contexte|spécialité|organisme|analyse|financière|gestion|portefeuille|maîtrise|saisissez|d’abord|décrivez|méthode|hypothèses|retenues|vérifications|effectuées|commentaire|factuel|critère|expliquez|points|forts|observés|autrement|mieux|documentées|partenaires|engagement|paiement|abonnement|activé|stade|tâche|ajoutez|première|action|rejoignez|accéder|privé|livrables|accepté|ajoutée|tableau|profil|disponible|invitation|envoyée|réessayez|actualise|page)\b/i;
const missingFr=new Set(),missingEn=new Set();
function decode(s){return s.replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");}
function check(value,where){
 const t=decode(value).replace(/\s+/g," ").trim();
 if(!t||t.length>300||/[{}<>$]/.test(t)||/^https?:/i.test(t)||/^[a-z0-9_.-]+$/i.test(t))return;
 if(englishWords.test(t)&&!frKeys.has(t))missingFr.add(where+": "+t);
 if((/[àâçéèêëîïôûùüÿœæ]/i.test(t)||frenchWords.test(t))&&!enKeys.has(t))missingEn.add(where+": "+t);
}
const html=read("public/index.html");
for(const m of html.matchAll(/>([^<>]+)</g))check(m[1],"HTML");
for(const m of html.matchAll(/\b(?:placeholder|aria-label|aria-description|title|alt)\s*=\s*["']([^"']+)["']/gi))check(m[1],"HTML attribute");
const app=read("public/app.js");
for(const m of app.matchAll(/\btr\(\s*["']([^"']+)["']\s*\)/g))check(m[1],"app tr()");
for(const m of app.matchAll(/(?:textContent|innerHTML|placeholder|title|aria-label|toast|alert|confirm)\s*[:=]\s*["']([^"']+)["']/g))check(m[1],"app direct string");
for(const m of app.matchAll(/(?:toast|alert|confirm)\(\s*["']([^"']+)["']\s*\)/g))check(m[1],"app notification");
const server=read("src/server.js");
for(const m of server.matchAll(/message\s*:\s*"([^"]+)"/g))check(m[1],"server message");
for(const m of server.matchAll(/message\s*:\s*'([^']+)'/g))check(m[1],"server message");
for(const m of server.matchAll(/new Error\(\s*"([^"]+)"/g))check(m[1],"server error");
for(const file of ["public/legal-notice-en.html","public/beta-terms-en.html","public/privacy-notice-en.html"]){
 const body=read(file).replace(/2 Allée Nicolas Poussin/g,"").replace(/Saint-Cyr-l’École/g,"").replace(/CNIL/g,"");
 for(const m of body.matchAll(/>([^<>]+)</g)){const t=m[1].trim();if(/[àâçéèêëîïôûùüÿœæ]/i.test(t)||/\b(le|la|les|des|du|une|un|votre|vous|pour|avec|courriel|mentions|confidentialité|bêta|données|français|allemande|française)\b/i.test(t))missingEn.add(file+": "+t);}
}
console.log("ZERILYS_FINAL_LANGUAGE_AUDIT",JSON.stringify({frKeys:frKeys.size,enKeys:enKeys.size,missingFrench:missingFr.size,missingEnglish:missingEn.size}));
console.log("ZERILYS_FINAL_MISSING_FRENCH",JSON.stringify([...missingFr].slice(0,200)));
console.log("ZERILYS_FINAL_MISSING_ENGLISH",JSON.stringify([...missingEn].slice(0,200)));
