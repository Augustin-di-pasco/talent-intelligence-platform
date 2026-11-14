import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.argv[2]||"zeri_work18");
const cssPath=path.join(root,"public/styles.css");
let css=fs.readFileSync(cssPath,"utf8");
const marker="/* ZERILYS employer workspace responsive repair */";
if(!css.includes(marker)){
css += `
\n\n${marker}
#opportunities.company-team-workspace{
  display:grid!important;
  grid-template-columns:minmax(280px,1.15fr) repeat(2,minmax(220px,1fr))!important;
  align-items:start!important;
  gap:16px!important;
  width:100%!important;
  max-width:100%!important;
  min-width:0!important;
  margin:0!important;
  padding:0!important;
  box-sizing:border-box!important;
}
#opportunities.company-team-workspace>*{
  display:block!important;
  width:100%!important;
  min-width:0!important;
  max-width:none!important;
  margin:0!important;
  box-sizing:border-box!important;
}
#opportunities.company-team-workspace form{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:10px 14px;
  width:100%;
}
#opportunities.company-team-workspace form>*{min-width:0;max-width:100%;box-sizing:border-box}
#opportunities.company-team-workspace input,
#opportunities.company-team-workspace select,
#opportunities.company-team-workspace textarea{width:100%;min-width:0;max-width:100%;box-sizing:border-box}
#opportunities.company-team-workspace textarea{min-height:88px;resize:vertical}
section:has(>#opportunities.company-team-workspace){
  width:100%!important;max-width:none!important;min-width:0!important;
  margin:0!important;padding-top:24px!important;padding-bottom:24px!important;
  box-sizing:border-box!important;
}
section:has(>#opportunities.company-team-workspace)+section,
section:has(>#opportunities.company-team-workspace)~.pricing-section{
  margin-top:0!important;padding-top:28px!important;
}
body>main{row-gap:14px!important}
body>main>.section{padding-top:clamp(26px,3vw,42px)!important;padding-bottom:clamp(26px,3vw,42px)!important}
body>main>.section .section-head{margin-bottom:18px!important}
@media(max-width:920px){
 #opportunities.company-team-workspace{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
@media(max-width:620px){
 #opportunities.company-team-workspace{grid-template-columns:minmax(0,1fr)!important;gap:12px!important}
 #opportunities.company-team-workspace form{grid-template-columns:minmax(0,1fr)}
 section:has(>#opportunities.company-team-workspace){padding-top:18px!important;padding-bottom:18px!important}
}
`;
fs.writeFileSync(cssPath,css);
console.log("Employer workspace layout repaired; homepage vertical spacing compacted.");
}
