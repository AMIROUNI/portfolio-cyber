# STRUCTURE.md — Project structure, content & i18n

## 1. Folder tree
```
portfolio/
├── index.html
├── DESIGN.md
├── STRUCTURE.md
├── assets/
│   ├── photo.jpg            <- profile photo (provided by the owner)
│   ├── favicon.svg
│   ├── og-image.png         <- social preview (optional, generate if possible)
│   └── Arbia_Bouzidi_CV.pdf <- CV to download (owner will drop it here)
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── sections.css
│   └── animations.css
└── js/
    ├── i18n.js              <- translations EN/FR + switch logic
    ├── main.js              <- nav, theme, scroll reveal, counters, toast
    ├── effects.js           <- boot sequence, matrix rain, typing, glitch, cursor glow, tilt
    └── terminal.js          <- interactive mini terminal widget
```

## 2. i18n rules (EN / FR)
- Every translatable element has `data-i18n="key"` (use `data-i18n-placeholder` / `data-i18n-aria` where needed).
- `i18n.js` holds `const translations = { en: {...}, fr: {...} }`.
- Language switch button `EN | FR` in navbar. Choice saved in `localStorage`; default = browser language, fallback FR.
- Update `<html lang>` and `<title>`/meta description on switch. No page reload. Smooth fade on text change.
- Typing-effect roles and terminal widget answers are also translated.

## 3. Sections (order) & IDs
`#hero` → `#about` → `#experience` → `#projects` → `#skills` → `#certifications` → `#education` → `#contact`

## 4. CONTENT (source of truth — do not invent facts or numbers)

### Identity
- Name: **Arbia Bouzidi**
- Title FR: Ingénieure Cybersécurité | EN: Cybersecurity Engineer
- Location: Paris, France
- Email: Bouzidiarbia99@gmail.com
- Phone: +33 6 59 47 30 75
- LinkedIn: https://linkedin.com/in/arbia-bouzidi
- GitHub: https://github.com/ARBIAARBIA

### Hero pitch
- FR: "Ingénieure cybersécurité spécialisée en audit SI, SOC/SIEM, forensique numérique et DevSecOps. Je protège les systèmes d'information en détectant, analysant et remédiant les risques."
- EN: "Cybersecurity engineer specialized in IT audit, SOC/SIEM, digital forensics and DevSecOps. I protect information systems by detecting, analyzing and remediating risks."
- Status badge: FR "À la recherche d'un poste / alternance / CDI en cybersécurité" | EN "Open to cybersecurity job opportunities"

### Experience (reverse chronological)

**1. Carrefour — Siège mondial, Massy (France)** · Mar 2026 – Sep 2026 · Intern (Stagiaire) – Internal Audit / Cybersecurity
- FR:
  - Participation aux missions d'audit interne liées à la cybersécurité et à la sécurité des systèmes d'information.
  - Analyses de gestion des accès, des habilitations et des comptes à privilèges pour évaluer la conformité et les risques de sécurité.
  - Tests techniques de sécurité avec des scripts Python et PowerShell.
  - Conception de tableaux de bord et visualisations Power BI pour le suivi et l'analyse des données d'audit.
  - Rédaction des rapports d'audit et formalisation des recommandations de remédiation pour les équipes métiers et techniques.
  - Collaboration avec les équipes audit, sécurité et gouvernance dans un environnement international.
- EN:
  - Took part in internal audit missions related to cybersecurity and information systems security.
  - Performed analyses of access management, entitlements and privileged accounts to assess compliance and security risks.
  - Ran technical security tests using Python and PowerShell scripts.
  - Designed Power BI dashboards and visualizations to monitor and analyze audit data.
  - Contributed to writing audit reports and formalizing remediation recommendations for business and technical teams.
  - Worked with audit, security and governance teams in an international environment.
- Tags: IAM, PAM, Audit, Python, PowerShell, Power BI

**2. TEK-UP — Tunisia** · Jul 2025 – Aug 2025 · Intern – Honeypot & Network Analysis
- FR:
  - Déploiement d'un honeypot exposé pour analyser des techniques d'attaque réelles.
  - Mise en place d'un environnement de capture et d'analyse du trafic réseau pour observer des comportements système réels.
  - Analyse approfondie des échanges réseau (TCP/IP, ICMP) et des délais de réponse pour évaluer la robustesse des services exposés.
  - Participation à la définition de scénarios de test et à l'analyse des résultats (succès, échecs, erreurs).
- EN:
  - Deployed an exposed honeypot to analyze real-world attack techniques.
  - Set up a network traffic capture and analysis environment to observe real system behaviors.
  - In-depth analysis of network exchanges (TCP/IP, ICMP) and response times to assess the robustness of exposed services.
  - Helped define test scenarios and analyze results (successes, failures, errors).
- Tags: Honeypot, Wireshark, TCP/IP, ICMP, Threat Analysis

**3. ANSI — Agence Nationale de la Sécurité Informatique, Tunisia** · Feb 2023 – Jun 2023 · Intern – Digital Forensics
- FR:
  - Développement d'une application web d'aide à l'investigation numérique et à l'analyse forensique d'équipements numériques.
  - Conception d'un système d'analyse automatisée de dumps mémoire pour extraire et corréler des informations critiques liées aux activités système et réseau.
  - Identification et analyse des connexions réseau, adresses IP associées, processus actifs et artefacts système.
  - Intégration d'une analyse intelligente par machine learning (arbre de décision) pour interpréter et contextualiser automatiquement les données collectées.
  - Génération automatisée de rapports d'investigation détaillés pour la documentation et la clôture des incidents.
- EN:
  - Developed a web application assisting digital investigation and forensic analysis of digital devices.
  - Designed a system for automated memory dump analysis to extract and correlate critical information about system and network activity.
  - Identified and analyzed network connections, associated IP addresses, running processes and system artifacts.
  - Integrated machine-learning analysis (decision tree) to automatically interpret and contextualize collected data.
  - Automated generation of detailed investigation reports for documentation and incident closure.
- Tags: Forensics, Memory dump, Machine Learning, Web app, Incident response

### Projects
1. **Network Intrusion Detection System / Système de Détection d'Intrusion Réseau** — Python, Scapy, Snort, Qt Designer
   - FR: IDS Snort avec analyse du trafic en temps réel et alertes automatisées ; règles personnalisées pour détecter différents types d'attaques ; dashboard de supervision avec visualisation des alertes.
   - EN: Snort IDS with real-time traffic analysis and automated alerts; custom rules detecting various attack types; monitoring dashboard visualizing alerts.
2. **DevSecOps Pipeline & Red Team Simulation / Pipeline DevSecOps et Simulation Red Team** — Proxmox, Docker, Jenkins, Git, SonarQube, Nexus, Grafana, Prometheus, Ansible
   - FR: Intégration de tests de sécurité automatisés dans la CI/CD ; conception et exécution de scénarios Red Team complets : reconnaissance, exploitation, post-exploitation.
   - EN: Automated security testing integrated into CI/CD; design and execution of full Red Team scenarios: reconnaissance, exploitation, post-exploitation.
3. **SIEM & Log Management / SIEM et Gestion des Logs** — Wazuh, Elasticsearch, Kibana, SIEM, Linux
   - FR: Déploiement de pipelines de logs Linux et Windows ; détection d'événements suspects et analyse en temps réel.
   - EN: Deployment of Linux and Windows log pipelines; suspicious event detection and real-time analysis.
- Each project card: GitHub button linking to https://github.com/ARBIAARBIA (owner can later replace with specific repo URLs — keep a `data-repo` attribute / config object for easy edit).

### Skills (categories)
- **Systems & Networks:** Linux (RHEL, Ubuntu, CentOS), Windows Server, Cisco, GNS3, HAProxy, TCP/IP, DNS, DHCP, VLAN
- **Security & SOC:** SIEM, Threat Hunting, Investigation & Digital Forensics, Vulnerability Management, Log Analysis, IDS/IPS (Snort), PAM, IAM, Active Directory Security, OWASP, MITRE ATT&CK, Security Audit, Privileged Access Management, Incident Response
- **Security Tools:** Wazuh, ELK Stack, Grafana, Snort, Wireshark, Nmap, Burp Suite, Metasploit, PingCastle, BloodHound, Zabbix, Prometheus
- **Cloud, Virtualization & Infra:** AWS, VMware ESXi, VirtualBox, Docker, Docker Compose, Secure CI/CD, IS infrastructure architecture
- **DevSecOps & Automation:** Jenkins, SonarQube, Nexus, Git, Python, Bash, PowerShell, Ansible, security control automation
- **Databases & Data:** MySQL, SQL Server, SQLite, Power BI

### Certifications
- Red Hat Certified System Administrator (RHCSA)
- Cisco Certified Network Associate (CCNA)
- Cybersecurity Awareness Professional Certification
- Scrum Foundation Professional Certification

### Education
- **CESI École d'Ingénieurs, Nanterre** — International mobility · Sep 2025 – Jul 2026
- **Tek-Up University, Ariana, Tunisia** — Engineering Degree in Cybersecurity (Cycle Ingénieur en Cybersécurité) · Sep 2023 – Jul 2026

### Languages
- French: Fluent (DELF B2) — ~85%
- English: Advanced (TOEIC C1) — ~90%
- German: Beginner (A1) — ~20%

## 5. SEO / meta
- `<title>` EN: "Arbia Bouzidi — Cybersecurity Engineer | SOC, Audit, DevSecOps" / FR: "Arbia Bouzidi — Ingénieure Cybersécurité | SOC, Audit, DevSecOps"
- Meta description, Open Graph, Twitter card, JSON-LD `Person` schema, `lang` attributes, favicon (shield SVG).

## 6. Deliverables checklist
- [ ] Works by opening `index.html` directly (no server needed) — avoid fetch() of local JSON; keep translations in JS.
- [ ] EN/FR fully translated, no missing keys (add a dev-console warning for missing keys).
- [ ] Photo loaded from `assets/photo.jpg` with graceful fallback (initials "AB" avatar) if missing.
- [ ] CV button points to `assets/Arbia_Bouzidi_CV.pdf`.
- [ ] Fully responsive, accessible, reduced-motion safe.
- [ ] Short `README.md` explaining how to edit content, add the photo/CV, and deploy to GitHub Pages / Netlify / Vercel.
