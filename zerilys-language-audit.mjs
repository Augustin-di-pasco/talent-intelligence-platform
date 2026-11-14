import fs from "node:fs";
import path from "node:path";
const root=path.resolve("zeri_work18");
const read=p=>fs.existsSync(path.join(root,p))?fs.readFileSync(path.join(root,p),"utf8"):"";
const chunks=(label,value)=>{console.log("AUDIT_"+label+"_BEGIN");for(let i=0;i<value.length;i+=2200)console.log("AUDIT_"+label+"_"+Math.floor(i/2200)+"\n"+value.slice(i,i+2200));console.log("AUDIT_"+label+"_END "+value.length);};
const i18n=read("public/i18n.js");
chunks("I18N_HEAD",i18n.slice(0,8500));
chunks("I18N_TAIL",i18n.slice(-8500));
for(const name of ["en","fr"]){const re=new RegExp("(?:const|let|var) "+name+" = \\{");const m=re.exec(i18n);console.log("AUDIT_DICT_"+name.toUpperCase()+"_INDEX",m?.index??-1);}
for(const file of ["public/index.html","public/legal-notice.html","public/beta-terms.html","public/privacy-notice.html"]){
 let s=read(file);
 s=s.replace(/<script[\\s\\S]*?<\\/script>/gi," ").replace(/<style[\\s\\S]*?<\\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\\s+/g," ").trim();
 chunks(file.replace(/[^a-z]+/gi,"_"),s);
}
for(const file of ["public/app.js","src/server.js"]){
 const s=read(file);const lines=s.split("\n");
 const picked=lines.filter(line=>/(tr\\(|toast\\(|alert\\(|confirm\\(|textContent|innerHTML|placeholder|aria-label|title=|throw new Error|message:|error:)/i.test(line));
 chunks(file.replace(/[^a-z]+/gi,"_"),picked.join("\n").slice(0,18000));
}
