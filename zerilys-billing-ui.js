/* ZERILYS billing journey: prices are disclosed only after a plan is selected. */
(() => {
  const plans={
    solo:{name:"Solo",monthly:39,annual:390,features:["Recherche spécialisée de talents","Profils, compétences et réalisations","Publication et suivi des opportunités","Suivi des candidatures"]},
    team:{name:"Team",monthly:89,annual:890,features:["Espace de recrutement partagé","Jusqu’à 3 sièges recruteur","Coordination des opportunités","Gestion des candidatures"]},
    business:{name:"Entreprise",monthly:179,annual:1790,features:["Espace entreprise avancé","Jusqu’à 10 sièges recruteur","Déploiement et accompagnement dédiés","Paramétrage et support adaptés"]}
  };
  let chosen="solo",period="monthly";
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function mount(){
    const cards=[...document.querySelectorAll(".pricing-card")];if(cards.length<4)return;
    const defs=[["CANDIDAT","Candidat","candidate","Accéder gratuitement"],["OFFRE RECRUTEUR","Solo","solo","Solo"],["OFFRE ÉQUIPE","Team","team","Team"],["OFFRE ENTREPRISE","Entreprise","business","Entreprise"]];
    cards.slice(0,4).forEach((card,i)=>{const [k,title,key,label]=defs[i];card.innerHTML='<span class="pricing-kicker">'+k+'</span><h3>'+title+'</h3><button type="button" class="btn primary full" data-zerilys-plan="'+key+'">'+label+'</button>';});
    const section=cards[0].closest(".pricing-section");section?.querySelector(".pricing-disclaimer")?.remove();section?.querySelector(".pricing-cta")?.remove();
    if(!document.getElementById("zerilysBillingModal")){
      const modal=document.createElement("div");modal.id="zerilysBillingModal";modal.className="modal hidden";modal.setAttribute("aria-hidden","true");
      modal.innerHTML='<div class="modal-backdrop" data-billing-close></div><div class="modal-card wide zerilys-billing-card" role="dialog" aria-modal="true" aria-labelledby="zerilysBillingTitle"><button class="close" type="button" data-billing-close aria-label="Fermer">×</button><div class="eyebrow">ABONNEMENT ZERILYS</div><h2 id="zerilysBillingTitle"></h2><p>Choisissez votre périodicité. Les montants sont hors taxes ; la TVA applicable est calculée au paiement.</p><div class="zerilys-period"><button type="button" data-period="monthly">Mensuel</button><button type="button" data-period="annual">Annuel</button></div><div id="zerilysBillingPrice" class="zerilys-billing-price"></div><ul id="zerilysBillingFeatures"></ul><p id="zerilysBillingNote"></p><button type="button" class="btn primary full" id="zerilysBillingCheckout">Continuer vers le paiement ↗</button><button type="button" class="btn outline full hidden" id="zerilysBillingPortal">Gérer mon abonnement</button><p id="zerilysBillingError" role="status" aria-live="polite"></p></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click",e=>{if(e.target.closest("[data-billing-close]")){modal.classList.add("hidden");modal.setAttribute("aria-hidden","true");}});
      modal.querySelectorAll("[data-period]").forEach(b=>b.addEventListener("click",()=>{period=b.dataset.period;render();}));
      modal.querySelector("#zerilysBillingCheckout").addEventListener("click",checkout);
      modal.querySelector("#zerilysBillingPortal").addEventListener("click",portal);
    }
  }
  function render(){
    const p=plans[chosen],m=document.getElementById("zerilysBillingModal");if(!m)return;
    m.querySelector("#zerilysBillingTitle").textContent="Offre "+p.name;
    m.querySelectorAll("[data-period]").forEach(b=>b.classList.toggle("active",b.dataset.period===period));
    const amount=p[period];m.querySelector("#zerilysBillingPrice").innerHTML='<strong>'+amount.toLocaleString("fr-FR")+' € HT</strong><span> / '+(period==="monthly"?"mois":"an")+'</span>';
    m.querySelector("#zerilysBillingFeatures").innerHTML=p.features.map(x=>"<li>"+esc(x)+"</li>").join("");
    m.querySelector("#zerilysBillingNote").textContent=period==="annual"?"Facturation annuelle : "+amount.toLocaleString("fr-FR")+" € HT.":"Facturation mensuelle : "+amount.toLocaleString("fr-FR")+" € HT.";
    m.querySelector("#zerilysBillingError").textContent="";
    const active=!!globalThis.me?.billing?.active;m.querySelector("#zerilysBillingPortal").classList.toggle("hidden",!active);m.querySelector("#zerilysBillingCheckout").classList.toggle("hidden",active);
  }
  async function show(key){
    if(key==="candidate"){document.getElementById("joinOpen")?.click();return;}
    chosen=key;period="monthly";render();const m=document.getElementById("zerilysBillingModal");m.classList.remove("hidden");m.setAttribute("aria-hidden","false");
    if(globalThis.me?.accountType==="company"){try{const d=await api("/me/billing");me.billing=d.billing;render();}catch{}}
  }
  async function checkout(){
    const error=document.getElementById("zerilysBillingError"),button=document.getElementById("zerilysBillingCheckout");error.textContent="";
    if(!globalThis.me){openAuth("register");const type=document.getElementById("accountType");if(type){type.value="company";type.dispatchEvent(new Event("change",{bubbles:true}));}return;}
    if(me.accountType!=="company"){error.textContent="Un compte entreprise est nécessaire. L’accès candidat reste gratuit.";return;}
    button.disabled=true;button.textContent="Connexion sécurisée à Stripe…";
    try{const d=await api("/billing/checkout",{method:"POST",body:JSON.stringify({plan:chosen,interval:period})});location.assign(d.url);}
    catch(e){error.textContent=e.message==="SUBSCRIPTION_ALREADY_ACTIVE"?"Un abonnement est déjà actif. Utilisez la gestion de l’abonnement.":e.message==="BILLING_NOT_CONFIGURED"?"Le paiement doit encore être configuré sur le serveur.":e.message||"Paiement indisponible.";}
    finally{button.disabled=false;button.textContent="Continuer vers le paiement ↗";}
  }
  async function portal(){const error=document.getElementById("zerilysBillingError");try{const d=await api("/billing/portal",{method:"POST",body:"{}"});location.assign(d.url);}catch(e){error.textContent=e.message||"Portail indisponible.";}}
  document.addEventListener("click",e=>{const b=e.target.closest("[data-zerilys-plan]");if(!b)return;e.preventDefault();e.stopImmediatePropagation();show(b.dataset.zerilysPlan);},true);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
  const q=new URLSearchParams(location.search);if(q.get("billing")==="cancel")setTimeout(()=>toast("Paiement annulé. Aucun abonnement n’a été activé."),600);
  if(q.get("billing")==="success")setTimeout(async()=>{if(!globalThis.me)return;try{const d=await api("/me/billing");me.billing=d.billing;toast(d.billing.active?"Votre abonnement ZERILYS est actif.":"Paiement reçu. Confirmation en cours.");}catch{}},1200);
})();
