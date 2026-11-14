import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "zeri_work18");
const cssPath = path.join(root, "public", "styles.css");
if (!fs.existsSync(cssPath)) throw new Error("public/styles.css introuvable");
let css = fs.readFileSync(cssPath, "utf8");
if (css.includes("ZERILYS FUTURE SYSTEM / 2026-11-14")) {
  console.log("Design futuriste déjà appliqué.");
  process.exit(0);
}
css += String.raw`
/* ZERILYS FUTURE SYSTEM / 2026-11-14
   Refonte des modules inférieurs uniquement.
   Le header, le hero d'accueil et les abonnements sont volontairement préservés. */
:root{
 --z-ink:#07111d;--z-panel:rgba(13,25,39,.82);--z-panel-2:rgba(17,33,50,.72);
 --z-line:rgba(134,190,211,.18);--z-cyan:#70e4dc;--z-blue:#62a8f5;
 --z-text:#edf5fb;--z-muted:#9aafc2;--z-glow:0 0 34px rgba(75,205,211,.10);
}
html{scroll-behavior:smooth}
body{
 background-color:var(--z-ink);
 background-image:radial-gradient(ellipse at 12% 48%,rgba(21,100,128,.13),transparent 34%),
 radial-gradient(ellipse at 88% 68%,rgba(35,78,143,.13),transparent 36%);
}
body>main{row-gap:clamp(14px,1.8vw,24px)!important}
body>main>#projects,body>main>#opportunities,body>main>#discover,
body>main>#global-pulse,body>main>#for-recruiters,
body>main>.trust-section,body>main>.closing{
 position:relative;isolation:isolate;min-width:0;overflow:hidden;
 border:1px solid var(--z-line)!important;border-radius:20px!important;
 background:linear-gradient(145deg,rgba(17,34,51,.88),rgba(8,18,30,.88))!important;
 box-shadow:inset 0 1px rgba(255,255,255,.035),var(--z-glow)!important;
}
body>main>#projects:before,body>main>#opportunities:before,
body>main>#discover:before,body>main>#global-pulse:before,
body>main>#for-recruiters:before{
 content:"";position:absolute;inset:0 0 auto;height:1px;pointer-events:none;
 background:linear-gradient(90deg,transparent,rgba(112,228,220,.7),rgba(98,168,245,.28),transparent);
}
body>main>#projects,body>main>#opportunities{padding:clamp(22px,2.6vw,38px)!important}
body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters,
body>main>.trust-section{padding:clamp(24px,3vw,44px)!important}
body>main>#projects h2,body>main>#opportunities h2,
body>main>#discover h2,body>main>#global-pulse h2,
body>main>#for-recruiters h2,body>main>.trust-section h2{
 color:var(--z-text);letter-spacing:-.035em;line-height:1.08;
}
body>main>#projects p,body>main>#opportunities p,
body>main>#discover p,body>main>#global-pulse p,
body>main>#for-recruiters p,body>main>.trust-section p{
 color:var(--z-muted);line-height:1.6;
}
body>main>#projects .project-layout{gap:clamp(14px,2vw,26px)!important}
body>main>#projects .project-intro{
 border:1px solid rgba(112,228,220,.14)!important;border-radius:15px;
 background:linear-gradient(145deg,rgba(23,52,68,.56),rgba(12,26,41,.4))!important;
}
body>main>#projects .big-number{color:var(--z-cyan)!important;text-shadow:0 0 26px rgba(112,228,220,.18)}
/* Les blocs d'opportunités deviennent des unités compactes et lisibles. */
#opportunities .opportunity-card,#opportunities .offer-card,
#opportunities .job-card,#discover .profile-card,
#discover .talent-card,#global-pulse .pulse-card{
 min-width:0;border:1px solid rgba(134,190,211,.15)!important;
 border-radius:14px!important;background:rgba(7,17,29,.58)!important;
 box-shadow:inset 0 1px rgba(255,255,255,.025)!important;
}
#opportunities button,#projects button,#discover button,#for-recruiters button,
#global-pulse button{
 transition:transform .18s ease,border-color .18s ease,background .18s ease,box-shadow .18s ease;
}
#opportunities button:hover,#projects button:hover,#discover button:hover,
#for-recruiters button:hover,#global-pulse button:hover{
 transform:translateY(-2px);border-color:rgba(112,228,220,.58)!important;
 box-shadow:0 8px 24px rgba(0,0,0,.2),0 0 20px rgba(112,228,220,.08);
}
/* Workspace entreprise : formulaires respirants, jamais comprimés dans une colonne étroite. */
.company-workspace,.employer-workspace,.company-dashboard,.employer-dashboard,
#companyWorkspace,#employerWorkspace,#companyDashboard,#employerDashboard{
 width:min(100%,1440px)!important;max-width:1440px!important;margin-inline:auto!important;
 min-width:0!important;
}
.company-workspace form,.employer-workspace form,.company-dashboard form,
.employer-dashboard form,#companyWorkspace form,#employerWorkspace form,
#companyDashboard form,#employerDashboard form{
 display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 18px;
 width:100%;max-width:none;min-width:0;
}
.company-workspace form>*,.employer-workspace form>*,
.company-dashboard form>*,.employer-dashboard form>*,
#companyWorkspace form>*,#employerWorkspace form>*,
#companyDashboard form>*,#employerDashboard form>*{min-width:0}
.company-workspace textarea,.employer-workspace textarea,
.company-dashboard textarea,.employer-dashboard textarea,
#companyWorkspace textarea,#employerWorkspace textarea,
#companyDashboard textarea,#employerDashboard textarea{min-height:112px;resize:vertical}
.company-workspace input,.company-workspace select,.company-workspace textarea,
.employer-workspace input,.employer-workspace select,.employer-workspace textarea,
.company-dashboard input,.company-dashboard select,.company-dashboard textarea,
.employer-dashboard input,.employer-dashboard select,.employer-dashboard textarea,
#companyWorkspace input,#companyWorkspace select,#companyWorkspace textarea,
#employerWorkspace input,#employerWorkspace select,#employerWorkspace textarea,
#companyDashboard input,#companyDashboard select,#companyDashboard textarea,
#employerDashboard input,#employerDashboard select,#employerDashboard textarea{
 width:100%;max-width:100%;min-width:0;box-sizing:border-box;
 color:var(--z-text);background:rgba(5,14,25,.78);
 border:1px solid rgba(134,190,211,.22);border-radius:10px;
}
.company-workspace input:focus,.company-workspace select:focus,.company-workspace textarea:focus,
.employer-workspace input:focus,.employer-workspace select:focus,.employer-workspace textarea:focus,
.company-dashboard input:focus,.company-dashboard select:focus,.company-dashboard textarea:focus,
.employer-dashboard input:focus,.employer-dashboard select:focus,.employer-dashboard textarea:focus{
 outline:2px solid rgba(112,228,220,.55);outline-offset:1px;
}
.company-workspace label,.employer-workspace label,
.company-dashboard label,.employer-dashboard label{display:grid;gap:7px;color:#c8d8e5;font-size:12px}
.company-workspace form .full-width,.employer-workspace form .full-width,
.company-dashboard form .full-width,.employer-dashboard form .full-width,
#companyWorkspace form .full-width,#employerWorkspace form .full-width{grid-column:1/-1}
/* Modales et fiches : densité maîtrisée, sans rétrécir les champs. */
.modal-card,.modal-content,.dialog-card{max-width:min(94vw,920px)}
.modal-card form,.modal-content form,.dialog-card form{min-width:0}
.modal-card input,.modal-card select,.modal-card textarea,
.modal-content input,.modal-content select,.modal-content textarea,
.dialog-card input,.dialog-card select,.dialog-card textarea{max-width:100%;box-sizing:border-box}
input,select,textarea{accent-color:var(--z-cyan)}
:focus-visible{outline-color:var(--z-cyan)!important}
/* Navigation interne et micro-indicateurs */
.section-eyebrow,.eyebrow,.section-kicker{
 color:var(--z-cyan)!important;letter-spacing:.16em!important;font-size:10px!important;
}
.status-dot,.live-dot{box-shadow:0 0 12px rgba(112,228,220,.55)}
@media(max-width:900px){
 body>main>#projects,body>main>#opportunities{grid-column:1/-1!important}
 body>main>#projects .project-layout{grid-template-columns:1fr!important}
}
@media(max-width:680px){
 body>main{padding-inline:14px!important;row-gap:12px!important}
 body>main>#projects,body>main>#opportunities,body>main>#discover,
 body>main>#global-pulse,body>main>#for-recruiters,body>main>.trust-section{
  padding:20px 16px!important;border-radius:15px!important;
 }
 .company-workspace form,.employer-workspace form,.company-dashboard form,
 .employer-dashboard form,#companyWorkspace form,#employerWorkspace form,
 #companyDashboard form,#employerDashboard form{grid-template-columns:minmax(0,1fr)}
}
@media(prefers-reduced-motion:reduce){
 html{scroll-behavior:auto}
 #opportunities button,#projects button,#discover button,#for-recruiters button,
 #global-pulse button{transition:none}
}
`;
fs.writeFileSync(cssPath, css);
console.log("Refonte visuelle ZERILYS appliquée aux sections inférieures et aux espaces entreprise.");
