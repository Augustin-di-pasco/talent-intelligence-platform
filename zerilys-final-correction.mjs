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
    const normalize = value => (value || "").replace(/\s+/g," ").trim().toLocaleUpperCase("fr");
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

 // ZERILYS plan cards — guaranteed actions
 let actionApp = read("public/app.js");
 if (!actionApp.includes("ZERILYS plan cards — guaranteed actions")) {
   actionApp += [
     '/* ZERILYS plan cards — guaranteed actions */',
     '(() => {',
     ' const plans=[{key:"candidate",subject:"Accès candidat gratuit ZERILYS",label:"Accéder gratuitement"},{key:"solo",subject:"Demande d’information — Offre Solo ZERILYS",label:"Demander cette formule"},{key:"team",subject:"Demande d’information — Offre Team ZERILYS",label:"Demander cette formule"},{key:"enterprise",subject:"Demande d’information — Offre Entreprise ZERILYS",label:"Échanger avec l’équipe"}];',
     ' const bind=()=>{',
     '  document.querySelectorAll(".pricing-card").forEach((card,index)=>{const plan=plans[index];if(!plan||card.querySelector(".zerilys-plan-action"))return;const link=document.createElement("a");link.className="btn primary zerilys-plan-action";link.href="mailto:zerilys@gmail.com?subject="+encodeURIComponent(plan.subject)+"&body="+encodeURIComponent("Bonjour l’équipe ZERILYS,\\n\\nJe souhaite obtenir des informations concernant : "+plan.subject+".\\n\\nMerci.");link.textContent=plan.label+" ↗";link.setAttribute("aria-label",plan.label+" — "+plan.subject);link.dataset.plan=plan.key;card.appendChild(link);card.dataset.plan=plan.key;card.style.cursor="pointer";card.setAttribute("tabindex","0");card.setAttribute("role","group");card.addEventListener("click",event=>{if(event.target.closest("a,button"))return;link.click();});card.addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&event.target===card){event.preventDefault();link.click();}});});',
     '  const join=document.querySelector("#pricingJoin");if(join&&!join.dataset.zerilysActionBound){join.dataset.zerilysActionBound="1";join.addEventListener("click",()=>{window.location.href="mailto:zerilys@gmail.com?subject="+encodeURIComponent("Créer un compte entreprise ZERILYS");});}',
     ' };',
     ' if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();',
     '})();'
   ].join("\n")+"\n";
 }
 write("public/app.js",actionApp);
 let actionCss=read("public/styles.css");
 if(!actionCss.includes("ZERILYS plan action affordance")){
   actionCss+="\n/* ZERILYS plan action affordance */\n.pricing-card{cursor:pointer}\\n.pricing-card:focus-visible{outline:2px solid rgba(103,228,223,.85);outline-offset:4px}\n.pricing-card .zerilys-plan-action{display:inline-flex!important;align-items:center;justify-content:center;align-self:flex-start;margin-top:16px;padding:11px 15px;min-height:42px;border-radius:8px;text-decoration:none;font-size:11px;font-weight:700;white-space:normal}\n.pricing-card .zerilys-plan-action:hover{filter:brightness(1.12);transform:translateY(-1px)}\n.pricing-card .zerilys-plan-action:focus-visible{outline:2px solid #8de7df;outline-offset:3px}\n@media(max-width:560px){.pricing-card .zerilys-plan-action{width:100%;justify-content:center}}\n";
 }
 write("public/styles.css",actionCss);


 // ZERILYS talent search interaction repair
 let searchApp = read("public/app.js");
 if (!searchApp.includes("ZERILYS talent search interaction repair")) {
   searchApp += String.raw`
/* ZERILYS talent search interaction repair */
(() => {
  const norm = value => (value || "").replace(/\s+/g," ").trim().toLocaleLowerCase("fr");
  const isSearchLabel = el => /^(rechercher|recherche|search|lancer la recherche|voir les profils)$/i.test(norm(el.textContent));
  const findSearchZone = node => {
    let current = node;
    while (current && current !== document.body) {
      const text = norm(current.textContent);
      if ((text.includes("recherche de talents") || text.includes("talent search") || current.matches("#talentSearch,#profileSearch,.talent-search,.profile-search,[data-search-zone]"))
          && current.querySelector('input[type="search"],input[placeholder*="recher" i],input[placeholder*="search" i],input[name*="search" i],input[name*="query" i]')) return current;
      current = current.parentElement;
    }
    return document.querySelector("#talentSearch,#profileSearch,.talent-search,.profile-search,[data-search-zone]") || null;
  };
  const getInput = zone => zone && zone.querySelector('input[type="search"],input[placeholder*="recher" i],input[placeholder*="search" i],input[name*="search" i],input[name*="query" i],input[type="text"]');
  const getForm = (zone,input) => (input && input.form) || (zone && zone.querySelector("form"));
  const submitSearch = (zone,input,sourceButton) => {
    if (!zone || !input) return false;
    const form = getForm(zone,input);
    input.dispatchEvent(new Event("input",{bubbles:true}));
    input.dispatchEvent(new Event("change",{bubbles:true}));
    if (form && typeof form.requestSubmit === "function") {
      const submitter = sourceButton && sourceButton.form === form && sourceButton.type === "submit" ? sourceButton : undefined;
      form.requestSubmit(submitter);
      return true;
    }
    const button = sourceButton || [...zone.querySelectorAll("button,[role=button],input[type=submit]")].find(isSearchLabel);
    if (button && button !== sourceButton) { button.click(); return true; }
    return false;
  };
  const bind = () => {
    const zones = new Set();
    document.querySelectorAll('input[type="search"],input[placeholder*="recher" i],input[placeholder*="search" i],input[name*="search" i],input[name*="query" i]').forEach(input => {
      const zone = findSearchZone(input);
      if (zone) zones.add(zone);
    });
    zones.forEach(zone => {
      if (zone.dataset.zerilysSearchRepair) return;
      zone.dataset.zerilysSearchRepair = "1";
      zone.addEventListener("click", event => {
        const clicked = event.target.closest("button,a,[role=button],[role=option],.chip,.tag,[class*=suggest],[class*=keyword],[data-query]");
        if (!clicked || !zone.contains(clicked)) return;
        const input = getInput(zone);
        if (!input) return;
        if (isSearchLabel(clicked)) {
          if (clicked.type !== "submit") {
            const form = getForm(zone,input);
            if (form && form.requestSubmit) {
              event.preventDefault();
              form.requestSubmit();
            }
          }
          return;
        }
        const text = (clicked.getAttribute("data-query") || clicked.getAttribute("data-value") || clicked.textContent || "").trim();
        if (!text || text.length > 100 || clicked.matches("a[href^='#'],[role=tab]")) return;
        const cls = norm(clicked.className && String(clicked.className));
        const inputRect = input.getBoundingClientRect();
        const clickedRect = clicked.getBoundingClientRect();
        const nearSearchField = clickedRect.top >= inputRect.bottom - 4 && clickedRect.top - inputRect.bottom < 190;
        const isSuggestion = clicked.matches("[role=option],.chip,.tag,[class*=suggest],[class*=keyword],[data-query],[data-value]")
          || (clicked.parentElement && clicked.parentElement.matches("ul,ol,[class*=suggest],[class*=keyword],[class*=popular],[class*=title]"))
          || (nearSearchField && clicked.matches("button,a,[role=button]") && !clicked.closest("[class*=result],[class*=profile-card],[data-profile-id]"));
        if (!isSuggestion) return;
        event.preventDefault();
        input.value = text;
        submitSearch(zone,input);
      }, true);
      zone.addEventListener("keydown", event => {
        if (event.key !== "Enter") return;
        const input = event.target.closest("input");
        if (!input || !zone.contains(input)) return;
        const form = getForm(zone,input);
        if (form && form.requestSubmit) {
          event.preventDefault();
          form.requestSubmit();
        }
      }, true);
      zone.querySelectorAll("button,a,[role=button],[role=option],.chip,.tag,[class*=suggest],[class*=keyword],[data-query]").forEach(el => {
        if (!isSearchLabel(el) && norm(el.textContent).length < 100) {
          el.style.cursor = "pointer";
          if (!el.hasAttribute("tabindex") && !el.matches("button,a,input")) el.setAttribute("tabindex","0");
        }
      });
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",bind,{once:true});
  else bind();
  new MutationObserver(bind).observe(document.documentElement,{childList:true,subtree:true});
})();
`;
 }
 write("public/app.js",searchApp);

console.log("ZERILYS final premium correction layer applied.");



// ZERILYS lower-home orbital art direction
let lowerCss = read("public/styles.css");
if (!lowerCss.includes("ZERILYS lower-home orbital art direction")) {
 lowerCss += "\n/* ZERILYS lower-home orbital art direction */\n:root{--z-ink:#eaf1f7;--z-muted:#91a5b8;--z-line:rgba(164,195,214,.17);--z-mint:#8bded3;--z-blue:#8cb7df}\n"
 + "body>main>.signal-strip{display:flex!important;align-items:center;justify-content:space-between;gap:3vw;padding:18px 2vw!important;margin:8px 0 28px!important;border:0!important;border-block:1px solid var(--z-line)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}\n"
 + "body>main>.signal-strip>div{flex:1;min-width:0;display:flex;align-items:baseline;gap:12px;padding:8px 0!important;border:0!important;border-right:1px solid var(--z-line)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}body>main>.signal-strip>div:last-child{border:0!important}body>main>.signal-strip strong{font-size:clamp(15px,1.5vw,21px)!important;color:var(--z-ink)!important}body>main>.signal-strip span{font-size:9px!important;letter-spacing:.16em;color:var(--z-muted)!important}\n"
 + "body>main>#projects,body>main>#opportunities,body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters,body>main>.trust-section,body>main>.closing{position:relative;isolation:isolate;overflow:hidden;border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent!important}\n"
 + "body>main>#projects,body>main>#opportunities{grid-column:1/-1!important;padding:clamp(42px,5vw,76px) 2vw!important;border-top:1px solid var(--z-line)!important}body>main>#opportunities{border-bottom:1px solid var(--z-line)!important}body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters{padding:clamp(48px,6vw,88px) 2vw!important;border-top:1px solid var(--z-line)!important}body>main>.trust-section{padding:clamp(42px,5vw,72px) 2vw!important;margin:0!important;border-top:1px solid var(--z-line)!important}body>main>.closing{padding:clamp(54px,7vw,100px) 10px!important;border-top:1px solid var(--z-line)!important;text-align:center}\n"
 + "body>main>#projects:before,body>main>#opportunities:before,body>main>#discover:before,body>main>#global-pulse:before,body>main>#for-recruiters:before{content:'';position:absolute;z-index:-1;pointer-events:none;width:clamp(260px,34vw,520px);aspect-ratio:1;right:-5%;top:50%;transform:translateY(-50%);border:1px solid rgba(119,208,198,.2);border-radius:50%;box-shadow:0 0 0 42px rgba(140,183,223,.025),0 0 0 84px rgba(140,183,223,.02)}body>main>#opportunities:before{right:auto;left:-5%;border-color:rgba(140,183,223,.2)}body>main>#discover:before{right:8%;top:35%;border-style:dashed}body>main>#global-pulse:before{right:10%;width:clamp(300px,40vw,620px);border-color:rgba(140,183,223,.16)}\n"
 + "body>main>#projects:after,body>main>#opportunities:after,body>main>#discover:after,body>main>#global-pulse:after,body>main>#for-recruiters:after{content:'';position:absolute;z-index:-1;pointer-events:none;right:0;top:50%;width:42%;height:1px;background:linear-gradient(90deg,transparent,rgba(128,203,199,.26),transparent)}body>main>#opportunities:after{right:auto;left:0;background:linear-gradient(90deg,transparent,rgba(140,183,223,.28),transparent)}\n"
 + "body>main>.section .section-head{position:relative;z-index:1;display:flex;align-items:flex-end;justify-content:space-between;gap:28px;margin-bottom:clamp(22px,3vw,40px)}body>main>.section .section-head h2{max-width:13ch;font-size:clamp(30px,4vw,56px)!important;line-height:1.02!important;letter-spacing:-.055em!important;color:var(--z-ink)}body>main>.section .section-head p{max-width:34ch;margin:0;color:var(--z-muted);font-size:12px;line-height:1.7}\n"
 + "body>main>#projects .project-layout{position:relative;z-index:1;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)!important;gap:clamp(20px,5vw,76px)!important}body>main>#projects .project-intro{padding:0!important;border:0!important;background:transparent!important}body>main>#projects .project-card,body>main>#opportunities .opportunity-card{border:0!important;border-radius:0!important;border-top:1px solid var(--z-line)!important;background:transparent!important;box-shadow:none!important;padding:18px 0!important}body>main>#projects .project-card:hover,body>main>#opportunities .opportunity-card:hover{transform:translateX(4px);background:transparent!important}body>main>#projects .big-number{font-size:clamp(48px,7vw,92px)!important;line-height:.9;color:var(--z-mint)!important;letter-spacing:-.08em}body>main>#opportunities .opportunity-card{border-bottom:1px solid var(--z-line)!important}\n"
 + "body>main>.trust-section [class*=card],body>main>.trust-section [class*=item]{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}body>main>.closing h2{font-size:clamp(34px,5vw,68px)!important;line-height:1.02;letter-spacing:-.06em;max-width:12ch;margin-inline:auto}body>main>.closing p{max-width:42ch;margin:16px auto;color:var(--z-muted);font-size:12px;line-height:1.7}body>main>.closing:before,body>main>.closing:after{content:'';position:absolute;aspect-ratio:1;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none}body>main>.closing:before{width:clamp(240px,34vw,500px);border:1px solid rgba(139,222,211,.2)}body>main>.closing:after{width:clamp(180px,25vw,360px);border:1px dashed rgba(140,183,223,.18)}\n"
 + "@media(max-width:900px){body>main>.signal-strip{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 18px}body>main>.signal-strip>div{border-right:0!important;border-bottom:1px solid var(--z-line)!important}body>main>#projects .project-layout{grid-template-columns:1fr!important}body>main>.section .section-head{display:block}body>main>.section .section-head p{margin-top:12px}}\n"
 + "@media(max-width:600px){body>main>#projects,body>main>#opportunities,body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters,body>main>.trust-section{padding:36px 4px!important}body>main>.closing{padding:54px 8px!important}body>main>#projects:before,body>main>#discover:before,body>main>#global-pulse:before{right:-42%;width:78vw}body>main>#opportunities:before{left:-42%;width:78vw}body>main>.signal-strip{padding:14px 2px!important}body>main>.signal-strip strong{font-size:14px!important}}\n";
}
write("public/styles.css", lowerCss);
