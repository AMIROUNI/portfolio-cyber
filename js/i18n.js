/* ============================================================
   i18n.js — EN/FR translations + switch logic (no page reload)
   Rules:
   - every translatable node has data-i18n="key.path"
   - also: data-i18n-placeholder / data-i18n-aria / data-i18n-alt
   - choice persisted in localStorage, fallback = browser lang, then FR
   ============================================================ */
"use strict";

const translations = {
  en: {
    meta: {
      title: "Arbia Bouzidi — Cybersecurity Engineer | SOC, Audit, DevSecOps",
      desc: "Cybersecurity engineer specialized in IT audit, SOC/SIEM, digital forensics and DevSecOps. Portfolio, experience, projects and certifications."
    },
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      certifications: "Certifications",
      education: "Education",
      contact: "Contact",
      theme: "Toggle dark / light theme",
      menu: "Open menu"
    },
    hero: {
      badge: "Open to cybersecurity job opportunities",
      greeting: "Hello, I'm",
      roles: ["Cybersecurity Engineer", "SOC Analyst", "Security Auditor", "Red Team / Blue Team"],
      pitch: "Cybersecurity engineer specialized in IT audit, SOC/SIEM, digital forensics and DevSecOps. I protect information systems by detecting, analyzing and remediating risks.",
      cv: "Download CV",
      contact: "Contact me",
      gh: "GitHub profile",
      li: "LinkedIn profile",
      mail: "Send an email",
      photoAlt: "Portrait of Arbia Bouzidi",
      scroll: "scroll"
    },
    stats: {
      internships: "Internships",
      certs: "Certifications",
      languages: "Languages",
      tools: "Security tools"
    },
    about: {
      kicker: "// About me",
      title: "whoami",
      p1: "Cybersecurity engineer trained at Tek-Up University with international mobility at CESI École d'Ingénieurs (Paris). I have worked on internal audit at Carrefour's global HQ, honeypot and network analysis at TEK-UP, and digital forensics at ANSI, Tunisia's national cybersecurity agency.",
      p2: "I combine audit rigor, SOC detection skills and hands-on engineering: IAM/PAM, SIEM, forensics, secure CI/CD. My goal — help organizations detect faster, prove compliance and respond to incidents with confidence.",
      f1: "Location",
      f2: "Main focus",
      f3: "Status",
      f3v: "Open to opportunities",
      f4: "Degree",
      f4v: "Engineering degree in Cybersecurity (2026)"
    },
    exp: {
      kicker: "// Work experience",
      title: "ls ./experience",
      badge: "Internship"
    },
    exp1: {
      date: "Mar 2026 – Sep 2026",
      role: "Intern — Internal Audit / Cybersecurity",
      company: "Carrefour — Global HQ, Massy (France)",
      b1: "Took part in internal audit missions related to cybersecurity and information systems security.",
      b2: "Performed analyses of access management, entitlements and privileged accounts to assess compliance and security risks.",
      b3: "Ran technical security tests using Python and PowerShell scripts.",
      b4: "Designed Power BI dashboards and visualizations to monitor and analyze audit data.",
      b5: "Contributed to writing audit reports and formalizing remediation recommendations for business and technical teams.",
      b6: "Worked with audit, security and governance teams in an international environment."
    },
    exp2: {
      date: "Jul 2025 – Aug 2025",
      role: "Intern — Honeypot & Network Analysis",
      company: "TEK-UP — Tunisia",
      b1: "Deployed an exposed honeypot to analyze real-world attack techniques.",
      b2: "Set up a network traffic capture and analysis environment to observe real system behaviors.",
      b3: "In-depth analysis of network exchanges (TCP/IP, ICMP) and response times to assess the robustness of exposed services.",
      b4: "Helped define test scenarios and analyze results (successes, failures, errors)."
    },
    exp3: {
      date: "Feb 2023 – Jun 2023",
      role: "Intern — Digital Forensics",
      company: "ANSI — National Cybersecurity Agency, Tunisia",
      b1: "Developed a web application assisting digital investigation and forensic analysis of digital devices.",
      b2: "Designed a system for automated memory dump analysis to extract and correlate critical information about system and network activity.",
      b3: "Identified and analyzed network connections, associated IP addresses, running processes and system artifacts.",
      b4: "Integrated machine-learning analysis (decision tree) to automatically interpret and contextualize collected data.",
      b5: "Automated generation of detailed investigation reports for documentation and incident closure."
    },
    proj: {
      kicker: "// Featured projects",
      title: "ls ~/projects",
      github: "View on GitHub"
    },
    proj1: {
      title: "Network Intrusion Detection System",
      desc: "Snort IDS with real-time traffic analysis and automated alerts; custom rules detecting various attack types; monitoring dashboard visualizing alerts."
    },
    proj2: {
      title: "DevSecOps Pipeline & Red Team Simulation",
      desc: "Automated security testing integrated into CI/CD; design and execution of full Red Team scenarios: reconnaissance, exploitation, post-exploitation."
    },
    proj3: {
      title: "SIEM & Log Management",
      desc: "Deployment of Linux and Windows log pipelines; suspicious event detection and real-time analysis."
    },
    skills: {
      kicker: "// Technical skills",
      title: "cat skills.json",
      c1: "Systems & Networks",
      c2: "Security & SOC",
      c3: "Security Tools",
      c4: "Cloud, Virtualization & Infra",
      c5: "DevSecOps & Automation",
      c6: "Databases & Data"
    },
    sk: {
      inv: "Investigation & Digital Forensics",
      vuln: "Vulnerability Management",
      logan: "Log Analysis",
      adsec: "Active Directory Security",
      audit: "Security Audit",
      ir: "Incident Response",
      cicd: "Secure CI/CD",
      infra: "IS infrastructure architecture",
      automation: "security control automation"
    },
    term: {
      aria: "Terminal input",
      hint: "type 'help'…",
      welcome: "Welcome to Arbia's interactive terminal — portfolio v1.0",
      hintline: "Type 'help' to see available commands.",
      a: {
        help: "Available commands:\n  whoami    — who I am\n  skills    — technical skills\n  contact   — how to reach me\n  clear     — clear this terminal",
        whoami: "Arbia Bouzidi — Cybersecurity Engineer based in Paris.\nIT audit · SOC/SIEM · digital forensics · DevSecOps.\nCurrently open to new opportunities.",
        skills: "Linux · SIEM (Wazuh, ELK) · Forensics · Snort · Python/PowerShell · Docker · Jenkins · AWS · Power BI\n→ full matrix in the Skills section above.",
        contact: "email: Bouzidiarbia99@gmail.com\nphone: +33 6 59 47 30 75\nlinkedin: linkedin.com/in/arbia-bouzidi\ngithub: github.com/ARBIAARBIA",
        notfound: "bash: {cmd}: command not found — type 'help'",
        sudo: "[ OK ] Checking requirements... done\nACCESS GRANTED — let's talk: Bouzidiarbia99@gmail.com"
      }
    },
    cert: {
      kicker: "// Certifications",
      title: "sudo cert list"
    },
    cert1: { sub: "System Administration" },
    cert2: { sub: "Networking" },
    cert3: { sub: "Security Awareness" },
    cert4: { sub: "Agile / Project Management" },
    edu: {
      kicker: "// Education",
      title: "cat education.log"
    },
    edu1: {
      date: "Sep 2025 – Jul 2026",
      school: "CESI École d'Ingénieurs, Nanterre",
      degree: "International mobility — Engineering cycle"
    },
    edu2: {
      date: "Sep 2023 – Jul 2026",
      school: "Tek-Up University, Ariana, Tunisia",
      degree: "Engineering Degree in Cybersecurity"
    },
    lang: {
      kicker: "// Languages",
      title: "whoami --langs",
      fr: "French",
      frLevel: "Fluent · DELF B2",
      en: "English",
      enLevel: "Advanced · TOEIC C1",
      de: "German",
      deLevel: "Beginner · A1"
    },
    contact: {
      kicker: "// Get in touch",
      title: "./contact --init",
      lead: "My inbox is always open — whether it's a job opportunity, a project, or simply to talk security.",
      copy: "Copy email",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locLabel: "Location",
      liLabel: "LinkedIn",
      ghLabel: "GitHub",
      formTitle: "Send a message",
      formName: "Your name",
      formNamePh: "John Doe",
      formEmail: "Your email",
      formEmailPh: "john@company.com",
      formMessage: "Your message",
      formMessagePh: "Tell me about the role...",
      formSend: "Send message",
      formNote: "Opens your email client — no data is stored."
    },
    toast: {
      copied: "Email copied to clipboard",
      sent: "Opening your email client..."
    },
    footer: {
      built: "built with HTML/CSS/JS",
      top: "Back to top"
    },
    boot: {
      line1: "[ OK ] Loading profile...",
      line2: "[ OK ] Establishing secure connection...",
      line3: "[ OK ] Running security checks...",
      granted: "ACCESS GRANTED",
      skip: "Press any key to skip"
    },
    status: { loc: "Paris, FR" }
  },

  fr: {
    meta: {
      title: "Arbia Bouzidi — Ingénieure Cybersécurité | SOC, Audit, DevSecOps",
      desc: "Ingénieure cybersécurité spécialisée en audit SI, SOC/SIEM, forensique numérique et DevSecOps. Portfolio, expériences, projets et certifications."
    },
    nav: {
      about: "À propos",
      experience: "Expérience",
      projects: "Projets",
      skills: "Compétences",
      certifications: "Certifications",
      education: "Formation",
      contact: "Contact",
      theme: "Basculer thème clair / sombre",
      menu: "Ouvrir le menu"
    },
    hero: {
      badge: "À la recherche d'un poste / alternance / CDI en cybersécurité",
      greeting: "Bonjour, je suis",
      roles: ["Ingénieure Cybersécurité", "Analyste SOC", "Auditrice Sécurité", "Red Team / Blue Team"],
      pitch: "Ingénieure cybersécurité spécialisée en audit SI, SOC/SIEM, forensique numérique et DevSecOps. Je protège les systèmes d'information en détectant, analysant et remédiant les risques.",
      cv: "Télécharger le CV",
      contact: "Me contacter",
      gh: "Profil GitHub",
      li: "Profil LinkedIn",
      mail: "Envoyer un email",
      photoAlt: "Portrait d'Arbia Bouzidi",
      scroll: "défiler"
    },
    stats: {
      internships: "Stages",
      certs: "Certifications",
      languages: "Langues",
      tools: "Outils de sécurité"
    },
    about: {
      kicker: "// À propos de moi",
      title: "whoami",
      p1: "Ingénieure cybersécurité formée à Tek-Up University avec une mobilité internationale à CESI École d'Ingénieurs (Paris). J'ai travaillé sur l'audit interne au siège mondial de Carrefour, le honeypot et l'analyse réseau à TEK-UP, et la forensique numérique à l'ANSI, agence nationale de la sécurité informatique de Tunisie.",
      p2: "Je combine rigueur d'audit, compétences de détection SOC et ingénierie pratique : IAM/PAM, SIEM, forensique, CI/CD sécurisée. Mon objectif — aider les organisations à détecter plus vite, prouver leur conformité et répondre aux incidents avec confiance.",
      f1: "Localisation",
      f2: "Focus principal",
      f3: "Statut",
      f3v: "Ouverte aux opportunités",
      f4: "Diplôme",
      f4v: "Diplôme d'ingénieur en cybersécurité (2026)"
    },
    exp: {
      kicker: "// Expérience professionnelle",
      title: "ls ./experience",
      badge: "Stage"
    },
    exp1: {
      date: "Mars 2026 – Sept. 2026",
      role: "Stagiaire — Audit interne / Cybersécurité",
      company: "Carrefour — Siège mondial, Massy (France)",
      b1: "Participation aux missions d'audit interne liées à la cybersécurité et à la sécurité des systèmes d'information.",
      b2: "Analyses de gestion des accès, des habilitations et des comptes à privilèges pour évaluer la conformité et les risques de sécurité.",
      b3: "Tests techniques de sécurité avec des scripts Python et PowerShell.",
      b4: "Conception de tableaux de bord et visualisations Power BI pour le suivi et l'analyse des données d'audit.",
      b5: "Rédaction des rapports d'audit et formalisation des recommandations de remédiation pour les équipes métiers et techniques.",
      b6: "Collaboration avec les équipes audit, sécurité et gouvernance dans un environnement international."
    },
    exp2: {
      date: "Juil. 2025 – Août 2025",
      role: "Stagiaire — Honeypot & Analyse réseau",
      company: "TEK-UP — Tunisie",
      b1: "Déploiement d'un honeypot exposé pour analyser des techniques d'attaque réelles.",
      b2: "Mise en place d'un environnement de capture et d'analyse du trafic réseau pour observer des comportements système réels.",
      b3: "Analyse approfondie des échanges réseau (TCP/IP, ICMP) et des délais de réponse pour évaluer la robustesse des services exposés.",
      b4: "Participation à la définition de scénarios de test et à l'analyse des résultats (succès, échecs, erreurs)."
    },
    exp3: {
      date: "Fév. 2023 – Juin 2023",
      role: "Stagiaire — Forensique numérique",
      company: "ANSI — Agence Nationale de la Sécurité Informatique, Tunisie",
      b1: "Développement d'une application web d'aide à l'investigation numérique et à l'analyse forensique d'équipements numériques.",
      b2: "Conception d'un système d'analyse automatisée de dumps mémoire pour extraire et corréler des informations critiques liées aux activités système et réseau.",
      b3: "Identification et analyse des connexions réseau, adresses IP associées, processus actifs et artefacts système.",
      b4: "Intégration d'une analyse intelligente par machine learning (arbre de décision) pour interpréter et contextualiser automatiquement les données collectées.",
      b5: "Génération automatisée de rapports d'investigation détaillés pour la documentation et la clôture des incidents."
    },
    proj: {
      kicker: "// Projets réalisés",
      title: "ls ~/projects",
      github: "Voir sur GitHub"
    },
    proj1: {
      title: "Système de Détection d'Intrusion Réseau",
      desc: "IDS Snort avec analyse du trafic en temps réel et alertes automatisées ; règles personnalisées pour détecter différents types d'attaques ; dashboard de supervision avec visualisation des alertes."
    },
    proj2: {
      title: "Pipeline DevSecOps et Simulation Red Team",
      desc: "Intégration de tests de sécurité automatisés dans la CI/CD ; conception et exécution de scénarios Red Team complets : reconnaissance, exploitation, post-exploitation."
    },
    proj3: {
      title: "SIEM et Gestion des Logs",
      desc: "Déploiement de pipelines de logs Linux et Windows ; détection d'événements suspects et analyse en temps réel."
    },
    skills: {
      kicker: "// Compétences techniques",
      title: "cat skills.json",
      c1: "Systèmes & Réseaux",
      c2: "Sécurité & SOC",
      c3: "Outils de Sécurité",
      c4: "Cloud, Virtualisation & Infra",
      c5: "DevSecOps & Automatisation",
      c6: "Bases de données & Data"
    },
    sk: {
      inv: "Investigation & Forensique numérique",
      vuln: "Gestion des vulnérabilités",
      logan: "Analyse de logs",
      adsec: "Sécurité Active Directory",
      audit: "Audit de sécurité",
      ir: "Réponse aux incidents",
      cicd: "CI/CD sécurisée",
      infra: "Architecture d'infrastructure SI",
      automation: "automatisation des contrôles de sécurité"
    },
    term: {
      aria: "Entrée du terminal",
      hint: "tapez 'help'…",
      welcome: "Bienvenue dans le terminal interactif d'Arbia — portfolio v1.0",
      hintline: "Tapez 'help' pour voir les commandes disponibles.",
      a: {
        help: "Commandes disponibles :\n  whoami    — qui je suis\n  skills    — compétences techniques\n  contact   — me contacter\n  clear     — effacer ce terminal",
        whoami: "Arbia Bouzidi — Ingénieure cybersécurité basée à Paris.\nAudit SI · SOC/SIEM · forensique numérique · DevSecOps.\nActuellement à la recherche de nouvelles opportunités.",
        skills: "Linux · SIEM (Wazuh, ELK) · Forensique · Snort · Python/PowerShell · Docker · Jenkins · AWS · Power BI\n→ matrice complète dans la section Compétences ci-dessus.",
        contact: "email: Bouzidiarbia99@gmail.com\ntél : +33 6 59 47 30 75\nlinkedin: linkedin.com/in/arbia-bouzidi\ngithub: github.com/ARBIAARBIA",
        notfound: "bash : {cmd} : commande introuvable — tapez 'help'",
        sudo: "[ OK ] Vérification des prérequis... terminé\nACCÈS AUTORISÉ — discutons : Bouzidiarbia99@gmail.com"
      }
    },
    cert: {
      kicker: "// Certifications",
      title: "sudo cert list"
    },
    cert1: { sub: "Administration système" },
    cert2: { sub: "Réseaux" },
    cert3: { sub: "Sensibilisation à la sécurité" },
    cert4: { sub: "Agile / Gestion de projet" },
    edu: {
      kicker: "// Formation",
      title: "cat education.log"
    },
    edu1: {
      date: "Sept. 2025 – Juil. 2026",
      school: "CESI École d'Ingénieurs, Nanterre",
      degree: "Mobilité internationale — Cycle ingénieur"
    },
    edu2: {
      date: "Sept. 2023 – Juil. 2026",
      school: "Université Tek-Up, Ariana, Tunisie",
      degree: "Diplôme d'Ingénieur en Cybersécurité"
    },
    lang: {
      kicker: "// Langues",
      title: "whoami --langs",
      fr: "Français",
      frLevel: "Courant · DELF B2",
      en: "Anglais",
      enLevel: "Avancé · TOEIC C1",
      de: "Allemand",
      deLevel: "Débutant · A1"
    },
    contact: {
      kicker: "// Me contacter",
      title: "./contact --init",
      lead: "Ma boîte mail est toujours ouverte — que ce soit une opportunité de poste, un projet, ou simplement pour parler sécurité.",
      copy: "Copier l'email",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      locLabel: "Localisation",
      liLabel: "LinkedIn",
      ghLabel: "GitHub",
      formTitle: "Envoyer un message",
      formName: "Votre nom",
      formNamePh: "Jean Dupont",
      formEmail: "Votre email",
      formEmailPh: "jean@entreprise.fr",
      formMessage: "Votre message",
      formMessagePh: "Parlez-moi du poste...",
      formSend: "Envoyer le message",
      formNote: "Ouvre votre client mail — aucune donnée n'est stockée."
    },
    toast: {
      copied: "Email copié dans le presse-papiers",
      sent: "Ouverture de votre client mail..."
    },
    footer: {
      built: "construit avec HTML/CSS/JS",
      top: "Retour en haut"
    },
    boot: {
      line1: "[ OK ] Chargement du profil...",
      line2: "[ OK ] Établissement d'une connexion sécurisée...",
      line3: "[ OK ] Exécution des contrôles de sécurité...",
      granted: "ACCÈS AUTORISÉ",
      skip: "Appuyez sur une touche pour passer"
    },
    status: { loc: "Paris, FR" }
  }
};

/* ============================================================
   i18n engine
   ============================================================ */
const I18N = (() => {
  const STORE_KEY = "portfolio-lang";
  const FALLBACK = "fr";
  let current = FALLBACK;

  const resolve = (lang, key) =>
    key.split(".").reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), translations[lang]);

  const t = (key) => {
    let val = resolve(current, key);
    if (val === undefined) {
      console.warn(`[i18n] Missing key "${key}" for lang "${current}"`);
      val = resolve(FALLBACK, key);
    }
    if (val === undefined) {
      console.warn(`[i18n] Missing key "${key}" in fallback lang "${FALLBACK}"`);
      return key;
    }
    return val;
  };

  const detect = () => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (stored && translations[stored]) return stored;
    } catch (e) {}
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    return nav.toLowerCase().startsWith("fr") ? "fr" : nav.toLowerCase().startsWith("en") ? "en" : FALLBACK;
  };

  const apply = () => {
    const html = document.documentElement;
    html.lang = current;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.setAttribute("alt", t(el.dataset.i18nAlt));
    });

    /* document head */
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));
    const ogT = document.querySelector('meta[property="og:title"]');
    if (ogT) ogT.setAttribute("content", t("meta.title"));
    const ogD = document.querySelector('meta[property="og:description"]');
    if (ogD) ogD.setAttribute("content", t("meta.desc"));
    const twT = document.querySelector('meta[name="twitter:title"]');
    if (twT) twT.setAttribute("content", t("meta.title"));

    /* navbar switch state */
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === current));
    });

    /* status bar language code */
    const statusLang = document.getElementById("statusLang");
    if (statusLang) statusLang.textContent = current.toUpperCase();

    /* notify modules (typing roles, terminal) */
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: current } }));
  };

  const setLang = (lang) => {
    if (!translations[lang] || lang === current) {
      apply();
      return;
    }
    current = lang;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    /* smooth fade on text change */
    document.documentElement.classList.add("lang-switching");
    apply();
    window.setTimeout(() => document.documentElement.classList.remove("lang-switching"), 260);
  };

  const init = () => {
    current = detect();
    apply();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
  };

  return { t, setLang, getLang: () => current, apply, init };
})();

document.addEventListener("DOMContentLoaded", () => I18N.init());
