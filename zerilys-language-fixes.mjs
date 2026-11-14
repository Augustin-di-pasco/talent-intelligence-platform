import fs from "node:fs";
import path from "node:path";
const root=path.resolve(process.argv[2]||"zeri_work18");
const file=path.join(root,"public/i18n.js");
let source=fs.readFileSync(file,"utf8");
const rows=[
["ZERILYS — Talent Intelligence","ZERILYS — Intelligence des talents","ZERILYS — Talent Intelligence"],
["BEYOND THE CV.","AU-DELÀ DU CV.","BEYOND THE CV."],
["Offre Team · 89 € HT / mois · 890 € HT / an · 890 € HT / an","Offre Équipe · 89 € HT/mois · 890 € HT/an · 890 € HT/an","Team plan · €89 excl. VAT/month · €890 excl. VAT/year · €890 excl. VAT/year"],
["Interactive preview of a candidate profile","Aperçu interactif d’un profil candidat","Interactive preview of a candidate profile"],
["Your account email","Adresse e-mail de votre compte","Your account email"],
["Describe what happened or what you would improve (at least 20 characters)","Décrivez ce qui s’est passé ou ce que vous souhaiteriez améliorer (20 caractères minimum)","Describe what happened or what you would improve (at least 20 characters)"],
["Add or change your profile photo","Ajouter ou modifier votre photo de profil","Add or change your profile photo"],
["Domaine (ex. risque, data)","Domaine (ex. : risque, données)","Field (e.g. risk, data)"],
["Diplôme ou équivalence (ex. Master Finance)","Diplôme ou équivalence (ex. : master en finance)","Degree or equivalent qualification (e.g. master's in finance)"],
["Member professional identity","Identité professionnelle du membre","Member professional identity"],
["No tasks yet. Add the first action for your team.","Aucune tâche pour le moment. Ajoutez la première action à votre équipe.","No tasks yet. Add the first action for your team."],
["e.g. Prepare the first prototype","Ex. : préparer le premier prototype","e.g. Prepare the first prototype"],
["Add task","Ajouter une tâche","Add task"],
["Join this project to access the private team workspace, tasks and deliverables.","Rejoignez ce projet pour accéder à l’espace privé de l’équipe, aux tâches et aux livrables.","Join this project to access the private team workspace, tasks and deliverables."],
["Member accepted into the team.","Membre accepté dans l’équipe.","Member accepted into the team."],
["Task added to the team board.","Tâche ajoutée au tableau de l’équipe.","Task added to the team board."],
["Share member link","Partager le lien du membre","Share member link"],
["Your identity is not available.","Ce profil n’est pas disponible.","Your profile is not available."],
["Enter between 1 and 50 email addresses, one per line.","Saisissez entre 1 et 50 adresses e-mail, une par ligne.","Enter between 1 and 50 email addresses, one per line."],
["Tarifs partenaires bêta : Solo 29 € HT/mois · Team 69 € HT/mois · Business 139 € HT/mois, prix garantis pendant 12 mois. Offre Business standard : 179 € HT/mois ou 1 790 € HT/an. Offre Entreprise : sur devis.","Tarifs partenaires de la bêta : Solo 29 € HT/mois · Équipe 69 € HT/mois · Entreprise 139 € HT/mois, prix garantis pendant 12 mois. Offre Entreprise standard : 179 € HT/mois ou 1 790 € HT/an. Offre Entreprise : sur devis.","Beta partner pricing: Solo €29 excl. VAT/month · Team €69 excl. VAT/month · Business €139 excl. VAT/month, prices guaranteed for 12 months. Standard Business plan: €179 excl. VAT/month or €1,790 excl. VAT/year. Enterprise offer: by quotation."],
["Tarifs partenaires bêta (engagement de 12 mois) : Solo 29 € HT/mois · Team 69 € HT/mois · Business 139 € HT/mois. Offre Business standard : 179 € HT/mois ou 1 790 € HT/an. Aucun paiement en ligne n’est activé.","Tarifs partenaires de la bêta (engagement de 12 mois) : Solo 29 € HT/mois · Équipe 69 € HT/mois · Entreprise 139 € HT/mois. Offre Entreprise standard : 179 € HT/mois ou 1 790 € HT/an. Aucun paiement en ligne n’est activé.","Beta partner pricing (12-month commitment): Solo €29 excl. VAT/month · Team €69 excl. VAT/month · Business €139 excl. VAT/month. Standard Business plan: €179 excl. VAT/month or €1,790 excl. VAT/year. No online payment is enabled."],
["Gestion du pipeline de candidatures","Gestion du suivi des candidatures","Application pipeline management"],
["39 € HT / mois avec les partenaires pilotes","39 € HT/mois avec les partenaires pilotes","€39 excl. VAT/month with pilot partners"],
["Gestion d'équipe","Gestion d’équipe","Team management"],
["ENTREPRISE","ENTREPRISE","COMPANY"],
["Les formules et tarifs seront définis avec les premiers partenaires du pilote. Aucun paiement ni abonnement n’est activé à ce stade.","Les formules et tarifs seront définis avec les premiers partenaires du pilote. Aucun paiement ni abonnement n’est activé à ce stade.","Plans and pricing will be defined with the first pilot partners. No payment or subscription is enabled at this stage."],
["Compétence à ajouter","Compétence à ajouter","Skill to add"],
["Écrivez librement une compétence : technique, métier, relationnelle ou sectorielle.","Écrivez librement une compétence : technique, métier, relationnelle ou sectorielle.","Enter any skill freely: technical, professional, interpersonal or industry-specific."],
["Recherche de talents spécialiséses","Recherche de talents spécialisés","Specialist talent search"],
["Intitulé du poste ou de la mission","Intitulé du poste ou de la mission","Job or assignment title"],
["Décrivez le poste, les missions et les compétences attendues (30 caractères minimum)","Décrivez le poste, les missions et les compétences attendues (30 caractères minimum)","Describe the role, responsibilities and required skills (at least 30 characters)"],
["Compétences recherchées, séparées par des virgules","Compétences recherchées, séparées par des virgules","Required skills, separated by commas"],
["Parcours ou expériences pertinents (mots-clés)","Parcours ou expériences pertinents (mots-clés)","Relevant career history or experience (keywords)"],
["Formation ou diplômes pertinents (mots-clés)","Formation ou diplômes pertinents (mots-clés)","Relevant education or qualifications (keywords)"],
["Niveaux indicatifs (ex. Bac+4, Bac+5, doctorat) — non éliminatoires","Niveaux indicatifs (ex. : master, doctorat) — non éliminatoires","Indicative levels (e.g. master's degree, doctorate) — not used as automatic filters"],
["Date de début (stage / alternance)","Date de début (stage / alternance)","Start date (internship / apprenticeship)"],
["Durée (ex. 6 mois)","Durée (ex. : 6 mois)","Duration (e.g. 6 months)"],
["Gratification / rémunération (préciser les conditions)","Gratification / rémunération (préciser les conditions)","Internship allowance / compensation (specify the terms)"],
["Encadrement / équipe d’accueil","Encadrement / équipe d’accueil","Supervision / host team"],
["Lieu (ville / pays)","Lieu (ville / pays)","Location (city / country)"],
["Précisez les outils autorisés, les limites ou les attentes (facultatif)","Précisez les outils autorisés, les limites ou les attentes (facultatif)","Specify permitted tools, limitations or expectations (optional)"],
["Informations légales","Informations légales","Legal information"],
["Intitulé du poste","Intitulé du poste","Job title"],
["Responsabilités, réalisations, contexte","Responsabilités, réalisations, contexte","Responsibilities, achievements and context"],
["Diplôme / formation","Diplôme / formation","Degree / education"],
["Établissement","Établissement","Institution"],
["Spécialité","Spécialité","Specialisation"],
["Établissement / organisme","Établissement / organisme","Institution / awarding body"],
["Ex. : analyse financière, gestion de portefeuille, Excel…","Ex. : analyse financière, gestion de portefeuille, Excel…","E.g. financial analysis, portfolio management, Excel…"],
["Niveau de maîtrise","Niveau de maîtrise","Proficiency level"],
["Saisissez d’abord une compétence.","Saisissez d’abord une compétence.","Enter a skill first."],
["Décrivez votre méthode, les hypothèses retenues et les vérifications effectuées…","Décrivez votre méthode, les hypothèses retenues et les vérifications effectuées…","Describe your method, assumptions and checks performed…"],
["Commentaire factuel sur ce critère","Commentaire factuel sur ce critère","Factual comment on this criterion"],
["Expliquez les points forts, limites et éléments observés.","Expliquez les points forts, limites et éléments observés.","Explain the strengths, limitations and evidence observed."],
["Recrutez autrement. Avec des compétences mieux documentées.","Recrutez autrement. Avec des compétences mieux documentées.","Recruit differently. With better-documented skills."],
["If an account exists for that address and email delivery is available, a reset token will be sent.","Si un compte existe pour cette adresse et que l’envoi d’e-mails est disponible, un code de réinitialisation sera envoyé.","If an account exists for that address and email delivery is available, a reset token will be sent."],
["Consent is paused until the beta terms and privacy notice are legally approved.","Le recueil du consentement est suspendu dans l’attente de la validation juridique des conditions de la bêta et de la notice de confidentialité.","Consent is paused until the beta terms and privacy notice are legally approved."],
["Provide a business email, HTTPS company website and at least 30 characters explaining the public evidence reviewers can check.","Indiquez une adresse e-mail professionnelle, un site web d’entreprise en HTTPS et au moins 30 caractères expliquant les éléments publics que les évaluateurs pourront vérifier.","Provide a business email, an HTTPS company website and at least 30 characters explaining the public evidence reviewers can check."],
["Provide between 1 and 50 email addresses.","Saisissez entre 1 et 50 adresses e-mail.","Provide between 1 and 50 email addresses."],
["Explique brièvement votre raisonnement en 40 caractères minimum.","Expliquez brièvement votre raisonnement en 40 caractères minimum.","Briefly explain your reasoning in at least 40 characters."],
["Cette compétence ne fait pas partie de ton identité.","Cette compétence ne fait pas partie de ton profil.","This skill is not part of your profile."],
["Choisissez une décision et justifiez-la en au moins 20 caractères.","Choisissez une décision et justifiez-la en au moins 20 caractères.","Select a decision and justify it in at least 20 characters."],
["Le nom et le secteur de l’entreprise sont requis.","Le nom et le secteur de l’entreprise sont requis.","The company name and industry are required."],
["Le site de l’entreprise doit commencer par https://.","Le site de l’entreprise doit commencer par https://.","The company website must start with https://."],
["Ajoute un intitulé et une description suffisamment précise.","Ajoute un intitulé et une description suffisamment précise.","Add a title and a sufficiently detailed description."],
["Pour publier un stage ou une alternance, indique la date de début, la durée et les conditions de gratification ou de rémunération.","Pour publier un stage ou une alternance, indique la date de début, la durée et les conditions de gratification ou de rémunération.","To publish an internship or apprenticeship, provide the start date, duration and compensation terms."],
["Explique en au moins 20 caractères pourquoi cette rencontre aurait du sens.","Explique en au moins 20 caractères pourquoi cette rencontre aurait du sens.","Explain in at least 20 characters why this connection would be meaningful."],
["Une demande ou une connexion existe déjà entre ces deux membres.","Une demande ou une connexion existe déjà entre ces deux membres.","A request or connection already exists between these two members."],
["Décris le problème en au moins 20 caractères.","Décris le problème en au moins 20 caractères.","Describe the issue in at least 20 characters."],
["La capacité maximale de l'équipe est atteinte.","La capacité maximale de l’équipe est atteinte.","The team's maximum capacity has been reached."],
["La capacité maximale de l’équipe est atteinte.","La capacité maximale de l’équipe est atteinte.","The team's maximum capacity has been reached."],
["Actualise la page et réessaie.","Actualise la page et réessaie.","Refresh the page and try again."]
];
if (!source.includes("ZERILYS complete bilingual language fixes")) {
  const at=source.indexOf('  let language = "fr";');
  if(at<0)throw new Error("Language engine insertion point not found");
  const block="\n  // ZERILYS complete bilingual language fixes\n"
    +"  const finalLanguagePairs = "+JSON.stringify(rows)+";\n"
    +"  for (const [original, french, english] of finalLanguagePairs) { fr[original]=french; en[original]=english; en[french]=english; }\n";
  source=source.slice(0,at)+block+source.slice(at);
}
source=source.replace('const attrs = ["placeholder", "aria-label", "title", "alt"];','const attrs = ["placeholder", "aria-label", "aria-description", "title", "alt"];');
source=source.replace("La plateforme spécialisée pour identifier, valoriser et recruter les talents en finance, intelligence artificielle et data.","La plateforme spécialisée pour identifier, valoriser et recruter les talents en finance, intelligence artificielle et données.");
source=source.replace("The specialist talent platform for finance, AI and data.","The specialist talent platform for finance, artificial intelligence and data.");
source=source.replace('document.title = language === "fr" ? "ZERILYS — Talent Intelligence" : "ZERILYS — Talent Intelligence";','document.title = language === "fr" ? "ZERILYS — Intelligence des talents" : "ZERILYS — Talent Intelligence";');
fs.writeFileSync(file,source);
console.log("ZERILYS final language coverage patch applied.");
