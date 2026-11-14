import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url))),pub=path.join(root,"public"),html=fs.readFileSync(path.join(pub,"index.html"),"utf8");
test("every internal page and section link resolves to an existing destination",()=>{
 const ids=new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
 for(const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/g)){
  const href=match[1];
  if(href==="#"||href.startsWith("http:")||href.startsWith("https:")||href.startsWith("mailto:")||href.startsWith("tel:")||href.startsWith("/api/"))continue;
  if(href.startsWith("#"))assert.ok(ids.has(href.slice(1)),"Missing section target "+href);
  else if(href.startsWith("/"))assert.ok(fs.existsSync(path.join(pub,href.slice(1))),"Missing internal page "+href);
 }
});
test("all legal documents exist in both languages and declare the correct document language",()=>{
 for(const [file,lang] of [["legal-notice.html","fr"],["beta-terms.html","fr"],["privacy-notice.html","fr"],["legal-notice-en.html","en"],["beta-terms-en.html","en"],["privacy-notice-en.html","en"]]){
  const body=fs.readFileSync(path.join(pub,file),"utf8");
  assert.match(body,new RegExp('<html[^>]*lang="'+lang+'"'),file+" language metadata");
  assert.ok(body.includes("<h1"),file+" must have a primary heading");
 }
});
