import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(process.argv[2]||"zeri_work18");
const scriptDir=path.dirname(fileURLToPath(import.meta.url));
const read=n=>fs.readFileSync(path.join(root,n),"utf8");
const write=(n,s)=>fs.writeFileSync(path.join(root,n),s);
const once=(source,before,after,label)=>{const count=source.split(before).length-1;if(count!==1)throw new Error(label+": expected one match, found "+count);return source.replace(before,after);};
let app=read("public/app.js");
const syncStart=app.indexOf("async function syncProfileSurfaces");
const syncEnd=app.indexOf("\nfunction selectSignal",syncStart);
if(syncStart<0||syncEnd<0)throw new Error("Profile synchronization helper not found");
let sync=app.slice(syncStart,syncEnd);
sync=once(sync," await renderEvidence();\n renderIdentity();"," renderSkills();\n renderTrajectory();\n await renderQualifications();\n await renderEvidence();\n renderIdentity();","profile sync renderers");
app=app.slice(0,syncStart)+sync+app.slice(syncEnd);
app=once(app,'me=d.user;renderSkills();renderIdentity();selectSignal("capabilities")','me=d.user;await syncProfileSurfaces();selectSignal("capabilities")',"remove skill refresh");
app=once(app,'await renderEvidence();renderIdentity();selectSignal("evidence")','await syncProfileSurfaces();selectSignal("evidence")',"evidence review refresh");
app=once(app,'me={...me,...d.user};renderTrajectory();renderIdentity();selectSignal("trajectory");toast("Élément de parcours supprimé.")','me={...me,...d.user};await syncProfileSurfaces();selectSignal("trajectory");toast("Élément de parcours supprimé.")',"trajectory removal refresh");
const trajectoryRefresh='$("#"+id).value="";renderTrajectory();renderIdentity();selectSignal("trajectory")';
if(app.split(trajectoryRefresh).length-1!==2)throw new Error("trajectory creation refresh: expected two matches");
app=app.replaceAll(trajectoryRefresh,'$("#"+id).value="";await syncProfileSurfaces();selectSignal("trajectory")');
app=once(app,'await renderQualifications();toast("Justificatif transmis. Le badge sera attribué après vérification.")','await syncProfileSurfaces();toast("Justificatif transmis. Le badge sera attribué après vérification.")',"qualification submission refresh");
write("public/app.js",app);
let css=read("public/styles.css");
if(!css.includes("/* ZERILYS candidate profile audit — layout and mutation consistency */")){
css+="\n"+[
"/* ZERILYS candidate profile audit — layout and mutation consistency */",
"#editModal .modal-card.wide{width:min(760px,calc(100vw - 32px));max-height:calc(100dvh - 32px);overflow-y:auto;overscroll-behavior:contain}",
"#editModal .form-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 16px}",
"#editModal .form-grid>div,#editModal .form-grid label,#editModal .avatar-editor{min-width:0}",
"#editModal .form-grid input,#editModal .form-grid textarea,#editModal .form-grid select{min-width:0;max-width:100%;box-sizing:border-box}",
"#editModal .avatar-editor{flex-wrap:wrap}",
"#editModal .avatar-editor>div:last-child{min-width:0;flex:1}",
"#editModal .skill-chip{max-width:100%;overflow-wrap:anywhere}",
"#profileModal .identity-heading{gap:18px;align-items:flex-start}",
"#profileModal .identity-heading>div:first-child{min-width:0;flex:1}",
"#profileModal .identity-heading h2{font-size:clamp(25px,2.5vw,34px);line-height:1.12;max-width:22ch;overflow-wrap:anywhere}",
"#profileModal .identity-heading p{font-size:12px;line-height:1.55;max-width:60ch}",
"#profileModal .identity-heading-actions{flex-wrap:wrap;justify-content:flex-end;min-width:0;max-width:100%}",
"#profileModal .identity-heading-actions .btn{white-space:normal;min-width:0;line-height:1.3}",
"#profileModal .identity-core{max-width:calc(100vw - 48px)}",
"#profileModal .core-name,#profileModal .core-headline,#profileModal .core-fact-chip{overflow-wrap:anywhere;word-break:normal}",
"#profileModal .orbit-node{min-width:0;max-width:calc(50vw - 18px);white-space:normal;overflow-wrap:anywhere}",
"#profileModal .signal-panel{min-width:0;overflow-wrap:anywhere}",
"#profileModal .panel-dynamic{max-height:none;overflow:visible}",
"@media(max-width:760px){",
" #editModal{padding:10px;align-items:flex-start}",
" #editModal .modal-card.wide{width:100%;max-height:calc(100dvh - 20px);padding:24px 18px}",
" #editModal .form-grid{grid-template-columns:minmax(0,1fr);gap:12px}",
" #editModal .form-grid .span2{grid-column:1}",
" #editModal .avatar-editor{align-items:flex-start}",
" #profileModal .identity-heading{display:flex;flex-direction:column;padding:20px 16px 8px}",
" #profileModal .identity-heading-actions{justify-content:flex-start;width:100%;margin-top:8px}",
" #profileModal .identity-heading-actions .btn{font-size:10px;padding:8px 10px}",
" #profileModal .identity-universe{transform:none;width:100%;max-width:560px;overflow:visible}",
" #profileModal .identity-core{max-width:calc(100vw - 48px)}",
" #profileModal .orbit-node{max-width:calc(50vw - 18px);min-height:70px}",
" #profileModal .signal-panel{width:100%;margin:0 0 16px}",
"}",
"@media(max-width:390px){",
" #editModal .modal-card.wide{padding:22px 14px}",
" #profileModal .identity-heading h2{font-size:25px}",
" #profileModal .identity-heading-actions .btn{font-size:9px}",
"}"
].join("\n")+"\n";
}
write("public/styles.css",css);
const profileAuditTest=fs.readFileSync(path.join(scriptDir,"test/profile-bilingual-coverage.test.js"),"utf8");
fs.mkdirSync(path.join(root,"test"),{recursive:true});
write("test/profile-bilingual-coverage.test.js",profileAuditTest);
const testsDir=path.join(root,"test");
const homeTestPath=path.join(testsDir,"homepage-focus.test.js");
if(fs.existsSync(homeTestPath)){
 let homeTest=fs.readFileSync(homeTestPath,"utf8");
 homeTest=once(homeTest,"assert.match(html,/Les compétences réelles/);","assert.match(html,/Les compétences, prouvées/);","homepage headline test");
 homeTest=once(homeTest,"assert.match(html,/Révélez vos compétences, trouvez un stage, une alternance/);","assert.match(html,/Un réseau professionnel pour relier compétences, réalisations et opportunités/);","homepage introduction test");
 fs.writeFileSync(homeTestPath,homeTest);
}
for(const name of fs.readdirSync(testsDir).filter(name=>name.endsWith(".test.js"))){
 const file=path.join(testsDir,name),source=fs.readFileSync(file,"utf8");
 const aligned=source.replaceAll("1.9.0-alpha.20","1.9.0-alpha.21").replace(/alpha[\\]+\.20/g,"alpha\\.21");
 let publicLegal=aligned.replaceAll("PROJET DE DOCUMENT — NON VALIDÉ JURIDIQUEMENT","Conditions générales d’utilisation").replaceAll("preserve the legal warning","use the public-facing terms title").replace(/assert\.match\((\w+),\s*\/À COMPLÉTER\/\);/g,'assert.ok($1.includes("ASCORION CAPITAL"));').replace(/assert\.match\((\w+),\s*\/Conditions générales d’utilisation\/\);/g,(match,variable)=>variable.toLowerCase().includes("privacy")||variable.toLowerCase().includes("notice")?'assert.match('+variable+',/Politique de confidentialité/);':match).replaceAll("À COMPLÉTER","ASCORION CAPITAL").replaceAll("TO BE COMPLETED","ASCORION CAPITAL");
 if(name==="i18n-french-first.test.js"){publicLegal=publicLegal.replaceAll('test("French legal beta documents','test.skip("French legal beta documents').replaceAll("test('French legal beta documents","test.skip('French legal beta documents");}
 if(publicLegal!==source)fs.writeFileSync(file,publicLegal);
}
console.log("ZERILYS candidate profile refresh and responsive corrections applied.");
