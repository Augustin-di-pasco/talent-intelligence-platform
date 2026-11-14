import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "zeri_work18");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, name), value);

// Final, deterministic corrections. The orbital hero's large rings and layout are deliberately preserved.
let html = read("public/index.html");
const replacements = [
  ["CANDIDATE", "CANDIDAT"],
  ["Professional identity", "Identité professionnelle"],
  ["Evolving professional profile", "Profil professionnel évolutif"],
  ["Skills and evidence", "Compétences et réalisations"],
  ["Discovery and opportunities", "Découverte et opportunités"],
  ["Proposed candidate access", "Accès gratuit pour les talents"],
  ["SPECIALIST RECRUITMENT · EMPLOYER OFFER", "RECRUTEMENT SPÉCIALISÉ · OFFRES ENTREPRISES"],
  ["Recruit differently.", "Recrutez autrement."],
  ["A workspace to identify rare expertise, understand demonstrated capabilities and manage conversations with talent.", "Un espace pour repérer les expertises rares, comprendre les compétences démontrées et échanger avec les talents."],
  ["Shared recruitment workspace", "Espace de recrutement partagé"],
  ["Recruiter and viewer roles", "Rôles recruteur et lecteur"],
  ["Opportunity coordination", "Coordination des opportunités"],
  ["Specialist talent search", "Recherche de talents spécialisés"],
  ["Profiles, skills and evidence", "Profils, compétences et réalisations"],
  ["Opportunity publishing and tracking", "Publication et suivi des opportunités"],
  ["Application pipeline management", "Suivi des candidatures"],
  ["Dedicated deployment and support", "Déploiement et accompagnement dédiés"],
  ["Configuration according to needs", "Paramétrage selon vos besoins"],
  ["Specific terms and support", "Conditions et accompagnement spécifiques"],
  ["Case-by-case study", "Étude personnalisée"],
  ["Create a company account ↗", "Créer un compte entreprise ↗"],
  ["Create my profile ↗", "Créer mon profil ↗"]
];
for (const [from, to] of replacements) html = html.replaceAll(from, to);
write("public/index.html", html);

let css = read("public/styles.css");
css += `
/* ZERILYS final premium corrections — French pricing and restrained orbital core */
.pricing-section{padding-block:clamp(30px,3.6vw,52px)!important}
.pricing-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:13px!important;align-items:stretch!important}
.pricing-card{min-width:0!important;min-height:0!important;height:auto!important;padding:21px 20px 18px!important;border-radius:15px!important;display:flex!important;flex-direction:column!important;background:linear-gradient(155deg,rgba(19,31,46,.94),rgba(11,20,32,.96))!important;border:1px solid rgba(155,183,208,.18)!important;box-shadow:none!important;transform:none!important}
.pricing-card.pricing-featured{border-color:rgba(100,211,204,.42)!important}
.pricing-card .pricing-kicker{font-size:9px!important;letter-spacing:.17em!important;color:#76d8d1!important;margin-bottom:12px!important}
.pricing-card h3{font-size:clamp(17px,1.25vw,20px)!important;line-height:1.2!important;margin:0 0 13px!important;letter-spacing:-.025em!important}
.pricing-card .pricing-price{font-size:clamp(18px,1.4vw,22px)!important;line-height:1.25!important;margin:0 0 5px!important;color:#eef3f8!important;font-weight:700!important;overflow-wrap:normal!important}
.pricing-card .pricing-annual{font-size:12px!important;line-height:1.5!important;color:#9fb3c7!important;margin:0 0 14px!important}
.pricing-card .pricing-access{font-size:13px!important;line-height:1.5!important;color:#91d8cc!important;margin:0 0 14px!important}
.pricing-card ul{display:grid!important;gap:8px!important;margin:0 0 18px!important;padding:0!important;list-style:none!important}
.pricing-card li{font-size:11px!important;line-height:1.5!important;color:#b8c6d5!important}
.pricing-card .pricing-foot{margin-top:auto!important;padding-top:12px!important;border-top:1px solid rgba(155,183,208,.14)!important;font-size:10px!important;line-height:1.45!important;color:#91a8bd!important}
.pricing-disclaimer{max-width:1200px!important;margin:16px auto 0!important;padding:12px 0!important;border-top:1px solid rgba(155,183,208,.13)!important;font-size:11px!important;line-height:1.7!important;color:#9fb0c1!important}
.candidate-core .candidate-monogram{width:auto!important;height:auto!important;min-width:0!important;min-height:0!important;padding:0!important;margin:0 0 8px!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
.candidate-core .candidate-monogram::before,.candidate-core .candidate-monogram::after{display:none!important;content:none!important}
.candidate-core .candidate-monogram .candidate-hero-initials,.candidate-core .candidate-monogram>span{width:auto!important;height:auto!important;padding:0!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;font-size:clamp(25px,3vw,34px)!important;letter-spacing:.08em!important;line-height:1!important}
.candidate-core>small,.candidate-core>span{display:none!important}
.candidate-core:not(.is-member)>b{display:none!important}
@media(max-width:1050px){.pricing-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.pricing-card{padding:19px!important}}
@media(max-width:560px){.pricing-grid{grid-template-columns:1fr!important;gap:10px!important}.pricing-card{padding:18px!important}.pricing-card h3{font-size:18px!important}.pricing-card .pricing-price{font-size:20px!important}}
`;
write("public/styles.css", css);

let app = read("public/app.js");
if (!app.includes("ZERILYS final premium corrections — deterministic")) {
  app += String.raw`
/* ZERILYS final premium corrections — deterministic */
(() => {
  const run = () => {
    // Remove only the redundant four-step index strip, not the candidate hero or its orbital rings.
    const labels = ["01 PROFIL","02 RÉALISATIONS","03 OPPORTUNITÉS","04 PROJETS"];
    const normalize = value => (value || "").replace(/\\s+/g," ").trim().toLocaleUpperCase("fr");
    const candidates = [...document.querySelectorAll("body *")].filter(el => {
      if (el === document.body || el.tagName === "MAIN" || el.children.length > 6) return false;
      const value = normalize(el.textContent);
      return value.length < 220 && labels.every(label => value.includes(label));
    }).sort((a,b) => normalize(a.textContent).length - normalize(b.textContent).length);
    if (candidates.length) candidates[0].remove();

    // Rebuild the four pricing cards as a compact, readable French price list.
    const cards = [...document.querySelectorAll(".pricing-card")];
    const plans = [
      {k:"CANDIDAT",h:"Identité professionnelle",price:"",annual:"",access:"Accès gratuit",items:["Profil professionnel évolutif","Compétences et réalisations","Découverte et opportunités"],foot:"Gratuit pour tous les talents"},
      {k:"RECRUTEUR",h:"Offre Solo",price:"39 € HT / mois",annual:"390 € HT / an",access:"",items:["Recherche de talents spécialisés","Profils, compétences et réalisations","Publication et suivi des opportunités","Suivi des candidatures"],foot:"Offre recruteur"},
      {k:"ÉQUIPE",h:"Offre Team",price:"89 € HT / mois",annual:"890 € HT / an",access:"",items:["Espace de recrutement partagé","Rôles recruteur et lecteur","Coordination des opportunités","Gestion d’équipe"],foot:"Offre équipe"},
      {k:"ENTREPRISE",h:"Offre Entreprise",price:"Sur devis",annual:"",access:"",items:["Déploiement et accompagnement dédiés","Paramétrage selon vos besoins","Conditions et accompagnement spécifiques"],foot:"Étude personnalisée"}
    ];
    cards.slice(0,4).forEach((card,index) => {
      const plan = plans[index];
      if (!plan) return;
      card.innerHTML = '<span class="pricing-kicker">'+plan.k+'</span><h3>'+plan.h+'</h3>'
        +(plan.price?'<p class="pricing-price">'+plan.price+'</p>':"")
        +(plan.annual?'<p class="pricing-annual">'+plan.annual+'</p>':"")
        +(plan.access?'<p class="pricing-access">'+plan.access+'</p>':"")
        +'<ul>'+plan.items.map(item=>'<li>'+item+'</li>').join("")+'</ul>'
        +'<span class="pricing-foot">'+plan.foot+'</span>';
    });
    const section = document.querySelector(".pricing-section") || (cards[0] && cards[0].closest("section"));
    if (section) {
      section.querySelectorAll(".employer-pricing-note").forEach(el=>el.remove());
      let note = section.querySelector(".pricing-disclaimer");
      if (!note) { note=document.createElement("p"); note.className="pricing-disclaimer"; const grid=section.querySelector(".pricing-grid"); if(grid)grid.insertAdjacentElement("afterend",note); }
      if (note) note.textContent = "Tarifs partenaires bêta (engagement de 12 mois) : Solo 29 € HT/mois · Team 69 € HT/mois · Business 139 € HT/mois. Offre Business standard : 179 € HT/mois ou 1 790 € HT/an. Aucun paiement en ligne n’est activé.";
    }
    const core = document.querySelector(".candidate-core");
    if (core) {
      const monogram = core.querySelector(".candidate-monogram");
      if (monogram) {
        monogram.style.setProperty("border","0","important");
        monogram.style.setProperty("background","transparent","important");
        monogram.style.setProperty("box-shadow","none","important");
        monogram.style.setProperty("border-radius","0","important");
      }
      core.querySelectorAll(":scope > small,:scope > span").forEach(el=>el.remove());
      if (!core.classList.contains("is-member")) core.querySelectorAll(":scope > b").forEach(el=>el.remove());
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",run,{once:true});
  else run();
})();
`;
}
write("public/app.js", app);

write("public/robots.txt", "User-agent: *\\nAllow: /\\n");
for (const page of ["public/index.html","public/legal-notice.html","public/beta-terms.html","public/privacy-notice.html"]) {
  const full = path.join(root, page);
  if (!fs.existsSync(full)) continue;
  let document = fs.readFileSync(full, "utf8");
  if (!document.includes('name="robots"')) {
    document = document.replace(/<head([^>]*)>/i, '<head$1>\\n<meta name="robots" content="noindex, nofollow, noarchive">');
    fs.writeFileSync(full, document);
  }
}
console.log("ZERILYS final premium correction layer applied.");
