import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "zeri_work18");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, name), value);

let css = read("public/styles.css");
if (!css.includes("ZERILYS — ATLAS ART DIRECTION 2026")) {
  css += String.raw`

/* ZERILYS — ATLAS ART DIRECTION 2026 */
:root{
 --z-bg:#f3f0e9;--z-paper:#fbfaf6;--z-ink:#172b29;--z-muted:#687873;
 --z-line:rgba(23,43,41,.15);--z-copper:#b66e49;--z-blue:#244b63;
 --z-sage:#dce6dc;--z-white:#fffefa;--z-shadow:0 18px 55px rgba(29,43,38,.09);
 --display:'Manrope','DM Sans',sans-serif;--body:'DM Sans',sans-serif;
}
html{scroll-behavior:smooth;background:var(--z-bg)}
body{background:var(--z-bg)!important;color:var(--z-ink)!important;font-family:var(--body)!important}
body,button,input,select,textarea{font-family:var(--body)!important}
h1,h2,h3,h4,.candidate-stage-copy h1{font-family:var(--display)!important;color:var(--z-ink)}
a{color:inherit}
button,.btn{transition:transform .22s ease,background .22s ease,border-color .22s ease,box-shadow .22s ease}
button:hover,.btn:hover{transform:translateY(-2px)}
header,body>header,nav,.topbar,.site-header{
 background:rgba(250,249,245,.94)!important;color:var(--z-ink)!important;
 border-bottom:1px solid var(--z-line)!important;box-shadow:0 8px 30px rgba(28,45,39,.04)!important;
 backdrop-filter:blur(18px)!important
}
header a,nav a,.topbar a,.site-header a{color:var(--z-ink)!important}
header button,nav button,.topbar button{color:var(--z-ink)!important}
body>main{max-width:none!important;width:100%!important;margin:0!important;padding:0 clamp(18px,4vw,64px)!important;
 display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr))!important;gap:clamp(16px,2vw,28px)!important}
body>main>.candidate-hero{grid-column:1/-1!important;width:100%!important;max-width:none!important;margin:0!important}
body>main>.signal-strip{grid-column:1/-1!important;width:100%!important;max-width:none!important;margin:0!important}
body>main>#discover,body>main>#projects,body>main>#opportunities,body>main>#global-pulse,
body>main>#for-recruiters,body>main>.trust-section,body>main>.closing,body>main>.pricing-section{
 max-width:none!important;margin:0!important;min-width:0!important
}
body>main>#discover{grid-column:1/-1!important}
body>main>#projects{grid-column:1/span 6!important}
body>main>#opportunities{grid-column:7/-1!important}
body>main>#global-pulse{grid-column:1/-1!important}
body>main>#for-recruiters{grid-column:1/-1!important}
body>main>.trust-section{grid-column:1/-1!important}
body>main>.pricing-section{grid-column:1/-1!important}
body>main>.closing{grid-column:1/-1!important}
body>main>.signal-strip{
 display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:0!important;
 padding:20px 0!important;background:transparent!important;border-block:1px solid var(--z-line)!important;
 border-radius:0!important;box-shadow:none!important
}
body>main>.signal-strip>div{
 padding:10px clamp(12px,2vw,28px)!important;border:0!important;border-right:1px solid var(--z-line)!important;
 border-radius:0!important;background:transparent!important;box-shadow:none!important
}
body>main>.signal-strip>div:last-child{border:0!important}
body>main>.signal-strip strong{font:700 14px var(--display)!important;color:var(--z-ink)!important}
body>main>.signal-strip span{font-size:10px!important;color:var(--z-muted)!important;letter-spacing:.08em!important}
body>main>#projects,body>main>#opportunities{
 padding:clamp(24px,3vw,44px)!important;border:1px solid var(--z-line)!important;border-radius:4px!important;
 background:var(--z-paper)!important;box-shadow:var(--z-shadow)!important;overflow:hidden
}
body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters,body>main>.trust-section{
 padding:clamp(34px,5vw,68px) clamp(18px,3vw,42px)!important;
 border:1px solid var(--z-line)!important;border-radius:4px!important;background:var(--z-paper)!important;
 box-shadow:var(--z-shadow)!important;overflow:hidden
}
body>main>.closing{
 padding:clamp(42px,6vw,78px) 20px!important;background:var(--z-ink)!important;color:var(--z-white)!important;
 border-radius:4px!important;text-align:center!important;overflow:hidden
}
body>main>.closing h2,body>main>.closing p{color:var(--z-white)!important}
body>main>.section .section-head h2,body>main h2{font-family:var(--display)!important;letter-spacing:-.045em!important}
.pricing-section{padding:clamp(30px,4vw,56px)!important;background:var(--z-paper)!important;border:1px solid var(--z-line)!important;border-radius:4px!important}
.pricing-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important}
.pricing-card{border:1px solid var(--z-line)!important;border-radius:4px!important;background:#fffefa!important;box-shadow:none!important;color:var(--z-ink)!important}
.pricing-card h3,.pricing-card li,.pricing-card .pricing-price{color:var(--z-ink)!important}
.pricing-card .pricing-kicker{color:var(--z-copper)!important}
.pricing-card.pricing-featured{background:var(--z-ink)!important;color:var(--z-white)!important;border-color:var(--z-ink)!important}
.pricing-card.pricing-featured h3,.pricing-card.pricing-featured li,.pricing-card.pricing-featured .pricing-price{color:var(--z-white)!important}
.btn.primary,button.primary,.primary{background:var(--z-ink)!important;color:var(--z-white)!important;border:1px solid var(--z-ink)!important;border-radius:2px!important}
.btn.outline,.btn.secondary,button.outline{background:transparent!important;color:var(--z-ink)!important;border:1px solid var(--z-ink)!important;border-radius:2px!important}
input,select,textarea{border-radius:2px!important;border-color:rgba(23,43,41,.24)!important;background:#fffefa!important;color:var(--z-ink)!important}
footer{background:#e8e5dc!important;color:var(--z-ink)!important}
@media(max-width:900px){
 body>main{grid-template-columns:repeat(6,minmax(0,1fr))!important}
 body>main>#projects{grid-column:1/-1!important}
 body>main>#opportunities{grid-column:1/-1!important}
 .pricing-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
@media(max-width:600px){
 body>main{display:block!important;padding:0 14px!important}
 body>main>.candidate-hero,body>main>.signal-strip,body>main>#projects,body>main>#opportunities,
 body>main>#discover,body>main>#global-pulse,body>main>#for-recruiters,body>main>.trust-section,
 body>main>.closing,body>main>.pricing-section{margin:12px 0!important}
 body>main>.signal-strip{grid-template-columns:1fr!important;padding:10px 0!important}
 body>main>.signal-strip>div{border-right:0!important;border-bottom:1px solid var(--z-line)!important}
 .pricing-grid{grid-template-columns:1fr!important}
}
`;
  write("public/styles.css", css);
}

  css += String.raw`
/* ZERILYS ATLAS HERO — monumental architectural landing */
.z-atlas-hero{position:relative!important;min-height:clamp(570px,66vw,760px)!important;padding:0!important;overflow:hidden!important;background:linear-gradient(110deg,#f8f5ed 0%,#f2eee5 52%,#e9e4d8 100%)!important;border:1px solid var(--z-line)!important;border-radius:4px!important;box-shadow:var(--z-shadow)!important;color:var(--z-ink)!important}
.z-hero-inner{display:grid;grid-template-columns:minmax(360px,.82fr) minmax(0,1.18fr);align-items:center;min-height:inherit;max-width:1600px;margin:auto;padding:clamp(34px,5vw,76px) clamp(24px,4vw,62px);gap:clamp(16px,3vw,48px)}
.z-hero-copy{position:relative;z-index:3;max-width:590px;padding:12px 0}
.z-eyebrow{display:flex;align-items:center;gap:11px;font:700 9px var(--display);letter-spacing:.19em;color:var(--z-copper);margin-bottom:24px}.z-eyebrow span{width:27px;height:1px;background:var(--z-copper)}
.z-hero-copy h1{font:700 clamp(40px,5.2vw,76px)/1.02 var(--display)!important;letter-spacing:-.065em!important;max-width:10.5ch;margin:0 0 23px!important;color:var(--z-ink)!important}.z-hero-copy h1 em{display:block;color:var(--z-copper);font-style:normal}
.z-hero-copy>p{max-width:45ch;font:400 clamp(14px,1.15vw,17px)/1.8 var(--body);color:#596b65;margin:0 0 30px}
.z-hero-actions{display:flex;flex-wrap:wrap;gap:10px}.z-cta{display:inline-flex;align-items:center;justify-content:center;gap:26px;min-height:50px;padding:0 19px;border:1px solid var(--z-ink);border-radius:2px;text-decoration:none;font:700 11px var(--display);cursor:pointer}.z-cta span{font-size:16px}.z-cta-dark{background:var(--z-ink);color:#fffefa!important}.z-cta-light{background:transparent;color:var(--z-ink)}
.z-hero-foot{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:45px;font:700 8px var(--display);letter-spacing:.12em;color:#6d7b75}.z-hero-foot i{width:3px;height:3px;border-radius:50%;background:var(--z-copper)}
.z-hero-visual{position:relative;min-width:0;align-self:stretch;display:flex;align-items:center;justify-content:center;isolation:isolate}.z-scene-frame{position:relative;width:100%;max-width:840px;aspect-ratio:1.24;display:grid;place-items:center;overflow:hidden;background:radial-gradient(ellipse at 52% 48%,#315064 0%,#1c3748 46%,#102432 100%);border:1px solid rgba(182,110,73,.45);box-shadow:0 28px 75px rgba(20,39,48,.22)}
.z-scene-frame:before,.z-scene-frame:after{content:'';position:absolute;inset:14px;border:1px solid rgba(241,220,191,.24);pointer-events:none}.z-scene-frame:after{inset:24px;border-color:rgba(241,220,191,.12)}.z-atlas-art{display:block;width:100%;height:100%;position:relative;z-index:1}
.z-scene-label{position:absolute;z-index:3;left:18px;right:18px;display:flex;justify-content:space-between;gap:10px;color:#f4e8d6;font:700 8px var(--display);letter-spacing:.16em}.z-scene-label b{color:#e5b98e}.z-scene-top{top:16px}.z-scene-bottom{bottom:16px}
.z-scene-node{position:absolute;z-index:4;display:grid;gap:4px;padding:13px 15px;background:rgba(250,248,241,.95);border:1px solid rgba(182,110,73,.55);box-shadow:0 14px 32px rgba(12,31,42,.16);min-width:160px}.z-scene-node small{font:700 8px var(--display);letter-spacing:.14em;color:var(--z-copper)}.z-scene-node b{font:700 14px var(--display);color:var(--z-ink)}.z-scene-node span{font:400 9px var(--body);color:#66766f}.z-node-talent{left:-16px;top:25%}.z-node-company{right:-10px;bottom:22%}
@media(max-width:1050px){.z-hero-inner{grid-template-columns:1fr;gap:24px}.z-hero-copy{max-width:760px}.z-hero-copy h1{max-width:13ch}.z-hero-visual{min-height:440px}.z-scene-frame{max-width:760px}.z-node-talent{left:0}.z-node-company{right:0}}
@media(max-width:600px){.z-atlas-hero{min-height:0!important}.z-hero-inner{padding:30px 18px 22px;gap:18px}.z-hero-copy h1{font-size:clamp(37px,11vw,54px)!important}.z-hero-copy>p{font-size:13px}.z-hero-foot{margin-top:26px;font-size:7px;gap:7px}.z-hero-visual{min-height:300px}.z-scene-frame{aspect-ratio:1.04}.z-scene-node{min-width:0;padding:9px 10px}.z-scene-node b{font-size:11px}.z-scene-node span{font-size:8px}.z-node-talent{left:-3px;top:18%}.z-node-company{right:-3px;bottom:13%}.z-scene-label{font-size:6px;left:10px;right:10px}.z-scene-top{top:10px}.z-scene-bottom{bottom:10px}}
`;
  write("public/styles.css", css);

let html = read("public/index.html");
if (!html.includes("fonts.googleapis.com/css2?family=DM+Sans")) {
  html = html.replace("</head>", "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin><link href=\"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap\" rel=\"stylesheet\">" + "</head>");
  write("public/index.html", html);
}

let app = read("public/app.js");
if (!app.includes("ZERILYS ATLAS — immersive home architecture")) {
  app += String.raw`

/* ZERILYS ATLAS — immersive home architecture */
(() => {
 const scene = \`
 <svg class="z-atlas-art" viewBox="0 0 1000 720" role="img" aria-label="Atlas architectural mondial reliant talents et organisations" xmlns="http://www.w3.org/2000/svg">
  <defs>
   <linearGradient id="zOcean" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#294c61"/><stop offset=".55" stop-color="#172f40"/><stop offset="1" stop-color="#0d202d"/></linearGradient>
   <linearGradient id="zLand" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff3d9"/><stop offset=".55" stop-color="#d8c6a8"/><stop offset="1" stop-color="#a88c70"/></linearGradient>
   <linearGradient id="zArch" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fffefa"/><stop offset="1" stop-color="#c7b69e"/></linearGradient>
   <linearGradient id="zCopper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3c18f"/><stop offset="1" stop-color="#a95e3b"/></linearGradient>
   <radialGradient id="zGlow"><stop stop-color="#f4d2a5" stop-opacity=".65"/><stop offset="1" stop-color="#f4d2a5" stop-opacity="0"/></radialGradient>
   <filter id="zShadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16"/></filter>
   <clipPath id="zGlobe"><circle cx="560" cy="330" r="218"/></clipPath>
  </defs>
  <ellipse cx="560" cy="620" rx="380" ry="45" fill="#b7a58c" opacity=".28" filter="url(#zShadow)"/>
  <circle cx="560" cy="330" r="255" fill="none" stroke="#b66e49" stroke-opacity=".35" stroke-width="1.4"/>
  <circle cx="560" cy="330" r="238" fill="none" stroke="#f0c69a" stroke-opacity=".5" stroke-dasharray="3 11"/>
  <circle cx="560" cy="330" r="218" fill="url(#zOcean)" stroke="#f3e7d4" stroke-width="2"/>
  <g clip-path="url(#zGlobe)" opacity=".98">
   <path d="M355 180l35-28 38 7 17 31 40 6 21 26-14 31-43 9-19 34-31 8-27-24-33 5-21-34 14-42z" fill="url(#zLand)"/>
   <path d="M484 300l39-20 37 15 12 38-19 33-6 48-28 48-31-13-18-57-26-37 9-37z" fill="url(#zLand)"/>
   <path d="M612 173l37-17 47 20 20 37-13 29-40 3-18 31-31-14-22-39z" fill="url(#zLand)"/>
   <path d="M673 298l53-20 38 25 16 43-27 38-45-8-23 34-37-27 8-39-18-26z" fill="url(#zLand)"/>
   <path d="M382 403l54-20 25 26-15 35-49 13-33-24z" fill="url(#zLand)"/>
   <path d="M322 260q230-120 477 14M324 383q231 122 474-5M560 109q-105 215 0 442M560 109q105 215 0 442" fill="none" stroke="#d7e0d9" stroke-opacity=".18" stroke-width="1"/>
   <path d="M320 330h480M560 110v440" stroke="#e9d5b8" stroke-opacity=".22"/>
  </g>
  <ellipse cx="560" cy="330" rx="340" ry="104" transform="rotate(-18 560 330)" fill="none" stroke="url(#zCopper)" stroke-width="2.2"/>
  <ellipse cx="560" cy="330" rx="355" ry="138" transform="rotate(23 560 330)" fill="none" stroke="#f4e6d1" stroke-opacity=".6" stroke-width="1.4"/>
  <path d="M155 548Q300 410 430 480T760 450T930 535" fill="none" stroke="#b66e49" stroke-width="2"/>
  <path d="M115 595Q270 490 420 544T735 510T950 592" fill="none" stroke="#d5b38d" stroke-width="1.5"/>
  <g fill="#fffaf0" stroke="#b66e49" stroke-width="2">
   <circle cx="290" cy="466" r="7"/><circle cx="795" cy="445" r="7"/><circle cx="430" cy="180" r="6"/><circle cx="745" cy="215" r="6"/><circle cx="630" cy="530" r="6"/>
  </g>
  <g>
   <path d="M70 520Q190 460 310 485L388 532 330 570 145 575 70 548Z" fill="url(#zArch)" stroke="#b69c7d" stroke-width="2"/>
   <path d="M100 520L150 405 214 405 276 485" fill="none" stroke="url(#zArch)" stroke-width="22"/>
   <path d="M102 520L150 405 214 405 276 485" fill="none" stroke="#fffaf0" stroke-width="5"/>
   <path d="M90 514h245" stroke="#a98b6b" stroke-width="2"/>
   <rect x="153" y="370" width="104" height="42" rx="2" fill="#e8e1d4" stroke="#b49a7b"/>
   <path d="M160 370v-25h89v25" fill="#fffaf0" stroke="#b49a7b"/>
   <path d="M172 344v-28h8v28M230 344v-28h8v28" fill="#b66e49"/>
  </g>
  <g>
   <path d="M690 500Q790 405 925 450L970 520 920 566 725 560Z" fill="url(#zArch)" stroke="#b69c7d" stroke-width="2"/>
   <path d="M735 480v-112l58-35 60 35v124" fill="#dfe5e1" stroke="#b79b7b" stroke-width="2"/>
   <path d="M747 380h92M747 408h92M747 436h92M770 355v130M811 355v130" stroke="#8da5a4" stroke-width="3"/>
   <path d="M728 482h145" stroke="#a98b6b" stroke-width="3"/>
   <path d="M862 450l33-55 28 55" fill="none" stroke="#b66e49" stroke-width="8"/>
  </g>
  <g fill="#203a3c">
   <circle cx="385" cy="520" r="6"/><path d="M380 527h10l5 29h-20z"/>
   <circle cx="660" cy="495" r="6"/><path d="M655 502h10l5 29h-20z"/>
   <circle cx="858" cy="520" r="6"/><path d="M853 527h10l5 29h-20z"/>
   <circle cx="250" cy="535" r="5"/><path d="M246 541h8l4 22h-16z"/>
  </g>
  <g fill="none" stroke="#b66e49" stroke-width="2">
   <path d="M290 466Q365 350 430 180"/><path d="M795 445Q815 310 745 215"/><path d="M630 530Q670 420 560 330"/>
  </g>
  <g fill="url(#zGlow)"><circle cx="290" cy="466" r="55"/><circle cx="795" cy="445" r="60"/><circle cx="430" cy="180" r="45"/></g>
  <path d="M90 640Q340 600 560 625T960 620" fill="none" stroke="#b66e49" stroke-opacity=".38" stroke-width="1.5"/>
 </svg>\`;
 const heroMarkup = \`
  <div class="z-hero-inner">
   <div class="z-hero-copy">
    <div class="z-eyebrow"><span></span> THE GLOBAL PROFESSIONAL ATLAS</div>
    <h1>Le talent n’a pas de frontières.<em>Les bonnes rencontres non plus.</em></h1>
    <p>ZERILYS révèle les compétences, relie les ambitions et donne naissance aux collaborations qui font avancer les organisations.</p>
    <div class="z-hero-actions">
     <a class="z-cta z-cta-dark" href="#discover">Explorer le réseau <span>↗</span></a>
     <button class="z-cta z-cta-light" type="button" id="zJoinCta">Créer mon profil <span>↗</span></button>
    </div>
    <div class="z-hero-foot"><span>COMPÉTENCES ÉTAYÉES</span><i></i><span>OPPORTUNITÉS CIBLÉES</span><i></i><span>PROJETS COLLABORATIFS</span></div>
   </div>
   <div class="z-hero-visual">
    <div class="z-scene-label z-scene-top"><span>01 / GLOBAL CONNECTIONS</span><b>WORLDWIDE</b></div>
    <div class="z-scene-frame">\${scene}</div>
    <div class="z-scene-label z-scene-bottom"><span>PEOPLE · SKILLS · PURPOSE</span><b>ZERILYS / 2026</b></div>
    <div class="z-scene-node z-node-talent"><small>01 / TALENT</small><b>Compétences</b><span>Identité · Preuves · Parcours</span></div>
    <div class="z-scene-node z-node-company"><small>02 / ORGANISATION</small><b>Entreprises</b><span>Recrutement · Missions · Projets</span></div>
   </div>
  </div>
 \`;
 const run = () => {
  const hero = document.querySelector("body>main>.candidate-hero,.candidate-hero");
  if (hero && !hero.dataset.zAtlasBuilt) {
   hero.dataset.zAtlasBuilt = "1";
   hero.classList.add("z-atlas-hero");
   hero.innerHTML = heroMarkup;
   const join = document.getElementById("zJoinCta");
   if (join) join.addEventListener("click", () => {
    const existing = document.querySelector("#pricingJoin,#authOpen,#loginBtn,[data-action='register']");
    if (existing) existing.click();
    else {
     const links = [...document.querySelectorAll("button,a")];
     const target = links.find(el => /créer.*profil|create.*profile|inscription|register/i.test(el.textContent||""));
     if (target) target.click();
    }
   });
  }
  const main = document.querySelector("body>main");
  if (main) main.classList.add("z-atlas-main");
  const sections = ["#projects","#opportunities","#discover","#global-pulse","#for-recruiters",".trust-section",".pricing-section",".closing"];
  sections.forEach(selector => {
   const el = document.querySelector("body>main "+selector);
   if (el) el.classList.add("z-atlas-section");
  });
  const strip = document.querySelector("body>main>.signal-strip");
  if (strip) strip.classList.add("z-atlas-signals");
 };
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",run,{once:true});
 else run();
})();
`.replaceAll("\\`", "`").replaceAll("\\${scene}", "${scene}");
  write("public/app.js", app);
}
console.log("ZERILYS new atlas art direction installed.");
