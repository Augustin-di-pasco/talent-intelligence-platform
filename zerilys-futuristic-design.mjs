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

css += String.raw\`
/* ZERILYS FUTURE SYSTEM — FULL PAGE PASS */
:root{
 --z-bg:#050c16;--z-surface:rgba(12,24,38,.82);--z-edge:rgba(122,194,211,.20);
 --z-aqua:#75e6dc;--z-electric:#6caeff;--z-copy:#eef6fb;--z-dim:#9db2c5;
 --z-shadow:0 22px 70px rgba(0,0,0,.24),inset 0 1px rgba(255,255,255,.045);
}
body{
 color:var(--z-copy);
 background:
 radial-gradient(ellipse at 50% -18%,rgba(48,122,161,.22),transparent 42%),
 radial-gradient(ellipse at 3% 42%,rgba(23,110,123,.12),transparent 30%),
 radial-gradient(ellipse at 97% 78%,rgba(42,76,153,.12),transparent 33%),
 #050c16!important;
}
body:before{
 content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.14;
 background-image:linear-gradient(rgba(130,190,205,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(130,190,205,.08) 1px,transparent 1px);
 background-size:56px 56px;
 mask-image:linear-gradient(to bottom,black,transparent 78%);
}
header,body>nav,body>header,.site-header,.main-header,.topbar,.navbar{
 background:rgba(5,13,23,.78)!important;backdrop-filter:blur(22px) saturate(145%);
 border-bottom:1px solid rgba(126,193,210,.15)!important;
 box-shadow:0 10px 38px rgba(0,0,0,.15)!important;
}
header a,body>nav a,.site-header a,.main-header a,.topbar a,.navbar a{
 transition:color .2s ease,text-shadow .2s ease;
}
header a:hover,body>nav a:hover,.site-header a:hover,.main-header a:hover,.topbar a:hover,.navbar a:hover{
 color:var(--z-aqua)!important;text-shadow:0 0 16px rgba(117,230,220,.24);
}
main{position:relative;isolation:isolate}
main>section,main>.section,main>[class*="section"]{
 scroll-margin-top:90px;
}
main>section:not(.pricing-section):not(#hero):not(.hero):not(.candidate-stage),
main>.section:not(.pricing-section){
 border-color:var(--z-edge);
}
.hero,.hero-section,#hero,.home-hero,.candidate-stage,.candidate-hero{
 position:relative;isolation:isolate;
}
.hero:after,.hero-section:after,#hero:after,.home-hero:after,.candidate-stage:after{
 content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
 background:radial-gradient(ellipse at 50% 48%,rgba(57,147,169,.13),transparent 56%);
}
.hero h1,.hero-section h1,#hero h1,.home-hero h1,.candidate-stage h1{
 color:#f2f8fc;text-wrap:balance;letter-spacing:-.055em;
 text-shadow:0 8px 42px rgba(65,170,185,.12);
}
.hero p,.hero-section p,#hero p,.home-hero p,.candidate-stage p{
 color:#b1c4d4;line-height:1.7;
}
.hero .btn-primary,.hero-section .btn-primary,#hero .btn-primary,
.home-hero .btn-primary,.candidate-stage .btn-primary,
button.primary,.btn.primary,.btn-primary{
 border:1px solid rgba(117,230,220,.52)!important;
 background:linear-gradient(110deg,#1a7d83,#2762a0)!important;
 color:#f5ffff!important;box-shadow:0 8px 28px rgba(38,154,164,.20),inset 0 1px rgba(255,255,255,.14)!important;
}
.btn-secondary,.btn.outline,button.outline{
 border:1px solid rgba(130,183,205,.30)!important;
 background:rgba(15,30,46,.72)!important;color:#d9eaf3!important;
}
.pricing-section{
 position:relative;isolation:isolate;overflow:hidden;
 border:1px solid rgba(117,230,220,.22)!important;border-radius:22px!important;
 background:linear-gradient(145deg,rgba(14,30,45,.96),rgba(6,15,26,.97))!important;
 box-shadow:var(--z-shadow)!important;
}
.pricing-section:before{
 content:"";position:absolute;inset:0 0 auto;height:1px;pointer-events:none;
 background:linear-gradient(90deg,transparent,rgba(117,230,220,.8),rgba(108,174,255,.55),transparent);
}
.pricing-section>h2,.pricing-section .section-title{
 color:#f2f8fc;letter-spacing:-.04em;
}
.pricing-card{
 position:relative;overflow:hidden;
 background:linear-gradient(155deg,rgba(20,39,57,.94),rgba(8,19,31,.97))!important;
 border:1px solid rgba(130,183,205,.20)!important;
 box-shadow:inset 0 1px rgba(255,255,255,.045),0 18px 45px rgba(0,0,0,.16)!important;
 transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease;
}
.pricing-card:before{
 content:"";position:absolute;inset:0 0 auto;height:1px;
 background:linear-gradient(90deg,transparent,rgba(117,230,220,.36),transparent);
}
.pricing-card:hover{transform:translateY(-4px)!important;border-color:rgba(117,230,220,.48)!important;box-shadow:0 22px 48px rgba(0,0,0,.26),0 0 28px rgba(117,230,220,.08)!important}
.pricing-card.pricing-featured{
 background:linear-gradient(155deg,rgba(20,57,67,.96),rgba(10,27,43,.98))!important;
 border-color:rgba(117,230,220,.55)!important;
}
footer,body>footer,.site-footer,.main-footer{
 position:relative;background:linear-gradient(180deg,rgba(8,18,30,.94),rgba(4,10,18,.99))!important;
 border-top:1px solid rgba(126,193,210,.17)!important;
 color:#9db2c5!important;
}
footer a,.site-footer a,.main-footer a{color:#c1d6e4!important}
footer a:hover,.site-footer a:hover,.main-footer a:hover{color:var(--z-aqua)!important}
.modal-card,.modal-content,.dialog-card{
 background:linear-gradient(145deg,rgba(16,32,49,.98),rgba(7,17,29,.99))!important;
 border:1px solid rgba(117,230,220,.24)!important;
 box-shadow:0 28px 90px rgba(0,0,0,.55),0 0 36px rgba(57,147,169,.08)!important;
}
button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{
 outline:2px solid rgba(117,230,220,.82)!important;outline-offset:3px;
}
@media(max-width:760px){
 header,body>nav,.site-header,.main-header,.topbar,.navbar{backdrop-filter:blur(16px)}
 .pricing-section{border-radius:16px!important}
 .pricing-card:hover{transform:none!important}
}
\`;

fs.writeFileSync(cssPath, css);
console.log("Refonte visuelle ZERILYS appliquée aux sections inférieures et aux espaces entreprise.");
