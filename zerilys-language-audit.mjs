import fs from "node:fs";
import path from "node:path";
const root=path.resolve("zeri_work18");
const read=p=>fs.existsSync(path.join(root,p))?fs.readFileSync(path.join(root,p),"utf8"):"";
const chunks=(label,value)=>{console.log("AUDIT_"+label+"_BEGIN");for(let i=0;i<value.length;i+=2200)console.log("AUDIT_"+label+"_"+Math.floor(i/2200)+"\n"+value.slice(i,i+2200));console.log("AUDIT_"+label+"_END "+value.length);};
const i18n=read("public/i18n.js");
chunks("I18N_HEAD",i18n.slice(0,8500));
chunks("I18N_TAIL",i18n.slice(-8500));
for(const name of ["en","fr"]){const needle="const "+name+" = {";console.log("AUDIT_DICT_"+name.toUpperCase()+"_INDEX",i18n.indexOf(needle));}
for(const file of ["public/index.html","public/legal-notice.html","public/beta-terms.html","public/privacy-notice.html"]){
 const s=read(file);
 const nodes=[...s.matchAll(/>([^<>]{2,180})</g)].map(x=>x[1].trim()).filter(x=>/[A-Za-zÀ-ÿ]{3}/.test(x));
 chunks(file.replace(/[^a-z]+/gi,"_"),nodes.join("\n"));
}
for(const file of ["public/app.js","src/server.js"]){
 const s=read(file);
 const needles=["tr(","toast(","alert(","confirm(","textContent","innerHTML","placeholder","aria-label","title=","throw new Error","message:","error:"];
 const picked=s.split("\n").filter(line=>needles.some(n=>line.includes(n)));
 chunks(file.replace(/[^a-z]+/gi,"_"),picked.join("\n").slice(0,18000));
}
