import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read=n=>fs.readFileSync(new URL("../"+n,import.meta.url),"utf8");
const app=read("public/app.js"),i18n=read("public/i18n.js"),css=read("public/styles.css");
test("candidate profile and editor labels have explicit French-English dictionary coverage",()=>{
 for(const phrase of ["PROFILE CONFIGURATION","YOUR PROFILE FIELD","Professional experience","Add experience","Education","Add education","Verify my qualification or equivalency","Completed or ongoing qualification","Equivalency through experience / certification","Submit supporting document for verification","Skill to add","Job title","Field (e.g. risk, data)","Responsibilities, achievements, context","Degree / qualification","Institution","Field of study","Level (e.g. Master's)","Proficiency level","Your profile updates as you add skills, evidence and intentions. Select a signal to explore each dimension.","Your profile has been saved and refreshed across your workspaces."]) assert.ok(i18n.includes(JSON.stringify(phrase)),"Missing bilingual source entry: "+phrase);
 for(const phrase of ["Parcours professionnel","Ajouter une expérience","Formation","Ajouter une formation","Vérifier mon diplôme ou mon équivalence","Compétence à ajouter","Intitulé du poste","Établissement","Spécialité","Niveau de maîtrise"]) assert.ok(i18n.includes(JSON.stringify(phrase)),"Missing French value for English reverse lookup: "+phrase);
});
test("all profile mutations refresh the canonical profile and dependent surfaces",()=>{
 const start=app.indexOf("async function syncProfileSurfaces"),end=app.indexOf("\nfunction selectSignal",start),sync=app.slice(start,end);
 for(const fn of ["renderSkills()","renderTrajectory()","renderQualifications()","renderEvidence()","renderIdentity()","loadReadiness()","loadOpportunityOrbit()","loadCandidateApplications()","loadNetwork()"]) assert.ok(sync.includes(fn),"Profile sync omits "+fn);
 for(const [label,snippet] of [
  ["skill removal",'me=d.user;await syncProfileSurfaces();selectSignal("capabilities")'],
  ["evidence submission",'await syncProfileSurfaces();selectSignal("evidence")'],
  ["trajectory removal",'await syncProfileSurfaces();selectSignal("trajectory");toast("Élément de parcours supprimé.")'],
  ["experience creation",'$("#trajectoryExperienceDescription").value="";await syncProfileSurfaces();selectSignal("trajectory")'],
  ["education creation",'$("#trajectoryEducationLevel").value="";await syncProfileSurfaces();selectSignal("trajectory")'],
  ["qualification submission",'await syncProfileSurfaces();toast("Justificatif transmis. Le badge sera attribué après vérification.")']
 ]) assert.ok(app.includes(snippet),label+" must refresh all profile surfaces");
});
test("candidate profile and editor layouts have bounded responsive geometry",()=>{
 assert.ok(css.includes("#editModal .modal-card.wide{width:min(760px,calc(100vw - 32px));max-height:calc(100dvh - 32px)"));
 assert.ok(css.includes("#profileModal .identity-heading h2{font-size:clamp(25px,2.5vw,34px)"));
 assert.ok(css.includes("#editModal .form-grid{grid-template-columns:minmax(0,1fr);gap:12px}"));
 assert.ok(css.includes("#profileModal .orbit-node{min-width:0;max-width:calc(50vw - 18px)"));
});
