import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const app=fs.readFileSync(new URL("../public/app.js",import.meta.url),"utf8");
const camel=value=>value.slice(5).replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase());
const handled=(attribute)=>app.includes("["+attribute+"]")||app.includes("dataset."+camel(attribute))||app.includes('getAttribute("'+attribute+'")')||app.includes("getAttribute('"+attribute+"')");
test("every dynamically generated button is attached to an action, delegated control or handled form",()=>{
 const forms=[...app.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/g)];
 const buttons=[...app.matchAll(/<button\b([^>]*)>/g)];
 assert.ok(buttons.length>=50,"Dynamic button inventory unexpectedly shrank");
 for(const button of buttons){
  const attrs=button[1],id=attrs.match(/\bid=["']([^"']+)["']/),data=[...attrs.matchAll(/\b(data-[a-z0-9-]+)(?:=|(?=\s|$))/gi)].map(m=>m[1]),type=attrs.match(/\btype=["']([^"']+)["']/);
  if(data.length){for(const key of data)assert.ok(handled(key),"No delegated action reference for "+key+" in "+attrs);continue;}
  if(id){assert.ok(app.split(id[1]).length-1>=2,"Button ID has no handler reference: "+id[1]);continue;}
  if(type?.[1]==="submit"){
   const form=forms.find(f=>button.index>f.index&&button.index<f.index+f[0].length);
   assert.ok(form,"Submit button is not contained in a form: "+attrs);
   const formId=form[1].match(/\bid=["']([^"']+)["']/),formData=[...form[1].matchAll(/\b(data-[a-z0-9-]+)(?:=|(?=\s|$))/gi)].map(m=>m[1]);
   assert.ok(formId||formData.length,"Submit form has no handler identity: "+form[1]);
   if(formId)assert.ok(app.split(formId[1]).length-1>=2,"Submit form ID has no handler reference: "+formId[1]);
   for(const key of formData)assert.ok(handled(key),"Submit form has no delegated handler: "+key);
   continue;
  }
  assert.fail("Unbound dynamic button: "+attrs);
 }
});
