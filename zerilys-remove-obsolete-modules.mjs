import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "zeri_work18");
const appPath = path.join(root, "public/app.js");
let app = fs.readFileSync(appPath, "utf8");

if (!app.includes("ZERILYS remove obsolete profile modules")) {
  app += String.raw`
/* ZERILYS remove obsolete profile modules */
(() => {
  const normalize = value => (value || "").replace(/\\s+/g, " ").trim().toLocaleLowerCase();
  const contains = (node, phrases) => {
    const text = normalize(node?.innerText || node?.textContent);
    return phrases.every(phrase => text.includes(normalize(phrase)));
  };
  const removeSectionForHeading = phrases => {
    const candidates = [...document.querySelectorAll("h1,h2,h3,h4,[role=heading],.section-title,.eyebrow")];
    const heading = candidates.find(node => contains(node, phrases));
    if (!heading) return false;
    let node = heading;
    for (let depth = 0; node && depth < 9; depth++, node = node.parentElement) {
      const tag = node.tagName?.toLowerCase();
      const cls = typeof node.className === "string" ? node.className : "";
      if ((tag === "section" || tag === "article" || /section|panel|module|opportunit|project/i.test(cls)) &&
          contains(node, phrases)) {
        node.remove();
        return true;
      }
    }
    let fallback = heading;
    for (let i = 0; fallback.parentElement && i < 4; i++) fallback = fallback.parentElement;
    fallback.remove();
    return true;
  };
  const removeProfileActionCard = () => {
    const nodes = [...document.querySelectorAll("button,a,[role=button]")];
    const explorer = nodes.find(node => /^(explorer|explore)$/i.test(normalize(node.innerText || node.getAttribute("aria-label"))));
    const contact = nodes.find(node => /éditer en contact|edit.*contact/i.test(normalize(node.innerText || node.getAttribute("aria-label"))));
    if (!explorer || !contact) return false;
    let a = explorer;
    while (a && !a.contains(contact)) a = a.parentElement;
    if (!a) return false;
    let node = a;
    for (let depth = 0; node && depth < 8; depth++, node = node.parentElement) {
      const tag = node.tagName?.toLowerCase();
      const cls = typeof node.className === "string" ? node.className : "";
      const hasPortrait = !!node.querySelector("img,[class*=avatar],[class*=portrait]");
      if (hasPortrait && (tag === "article" || tag === "section" || /card|profile|identity|candidate/i.test(cls))) {
        node.remove();
        return true;
      }
    }
    let fallback = a;
    for (let i = 0; fallback.parentElement && i < 3; i++) fallback = fallback.parentElement;
    fallback.remove();
    return true;
  };
  let scheduled = false;
  const clean = () => {
    scheduled = false;
    removeProfileActionCard();
    removeSectionForHeading(["projets et collaborations"]);
    removeSectionForHeading(["project", "collaborations"]);
    removeSectionForHeading(["emplois et missions"]);
    removeSectionForHeading(["jobs", "missions"]);
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(clean);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule, {once:true});
  else schedule();
  new MutationObserver(schedule).observe(document.documentElement, {childList:true, subtree:true});
})();
`;
}
fs.writeFileSync(appPath, app);
console.log("ZERILYS obsolete profile modules removed.");
