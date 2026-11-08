import type {Locale, Slug} from './site';
export type RoleContent = {tag:string;mapTitle:string;lead:string;flow:string[];outputs:string[];explain:string[];example:string;methods:string[]};
const details = {
  "project-coordination": {
    "en": {
      "tag": "Align people and delivery",
      "mapTitle": "How coordination keeps delivery moving",
      "lead": "A good project coordinator connects goals, decisions, people and deadlines—so work moves forward with visible ownership.",
      "flow": [
        "Discover",
        "Scope",
        "Plan",
        "Coordinate",
        "Track",
        "Deliver"
      ],
      "outputs": [
        "Stakeholder discovery summary",
        "Agreed project scope",
        "Milestone and dependency plan",
        "Action and meeting register",
        "Progress, risk and issue log",
        "Handover and delivery checklist"
      ],
      "explain": [
        "Identify the decision makers and project boundaries.",
        "Split scope into milestones and responsibilities.",
        "Monitor actions, dependencies and vendor updates.",
        "Escalate blockers early and retain handover evidence."
      ],
      "example": "A multi-role digital marketplace needs coordinated feedback between business stakeholders, developers and QA. At Mergers United, I followed scope clarifications, outstanding issues, QA feedback and vendor actions.",
      "methods": [
        "Jira",
        "Agile/Scrum",
        "RACI concepts",
        "Action logs",
        "Risk tracking",
        "Notion",
        "Confluence"
      ]
    },
    "fr": {
      "tag": "Aligner les acteurs et la livraison",
      "mapTitle": "Comment la coordination fait avancer la livraison",
      "lead": "La coordination relie objectifs, décisions, personnes et délais afin de garantir un suivi compréhensible.",
      "flow": [
        "Découvrir",
        "Définir le périmètre",
        "Planifier",
        "Coordonner",
        "Suivre",
        "Livrer"
      ],
      "outputs": [
        "Compte rendu des besoins et acteurs",
        "Périmètre projet validé",
        "Planning et dépendances",
        "Suivi des actions et réunions",
        "Rapport d’avancement et risques",
        "Checklist de livraison et passation"
      ],
      "explain": [
        "Identifier décideurs et limites du projet.",
        "Transformer le périmètre en jalons et responsabilités.",
        "Suivre actions, dépendances et fournisseurs.",
        "Remonter les blocages et documenter la passation."
      ],
      "example": "Pour Mergers United, j’ai coordonné clarifications, anomalies, retours de recette et suivi fournisseur.",
      "methods": [
        "Jira",
        "Agile/Scrum",
        "RACI",
        "Suivi d’actions",
        "Gestion des risques",
        "Notion",
        "Confluence"
      ]
    },
    "ar": {
      "tag": "مواءمة الفرق والتنفيذ",
      "mapTitle": "كيف يحافظ التنسيق على تقدم التسليم",
      "lead": "يربط تنسيق المشاريع بين الأهداف والقرارات والأفراد والمواعيد، بحيث يصبح تقدم العمل ومسؤولياته واضحًا.",
      "flow": [
        "الاكتشاف",
        "تحديد النطاق",
        "التخطيط",
        "التنسيق",
        "المتابعة",
        "التسليم"
      ],
      "outputs": [
        "ملخص الاحتياجات وأصحاب المصلحة",
        "نطاق المشروع المتفق عليه",
        "خطة المراحل والاعتماديات",
        "سجل الاجتماعات والإجراءات",
        "تقرير التقدم والمخاطر",
        "قائمة مراجعة التسليم"
      ],
      "explain": [
        "تحديد أصحاب القرار ونطاق العمل.",
        "تقسيم النطاق إلى مراحل ومسؤوليات.",
        "متابعة المهام والاعتمادات وتحديثات المورد.",
        "تصعيد العوائق وتوثيق التسليم."
      ],
      "example": "في Mergers United نسّقت التوضيحات والمشكلات وملاحظات اختبار القبول ومتابعة المورد.",
      "methods": [
        "Jira",
        "Agile/Scrum",
        "RACI",
        "سجل الإجراءات",
        "المخاطر",
        "Notion",
        "Confluence"
      ]
    }
  },
  "business-analysis": {
    "en": {
      "tag": "From ideas to testable requirements",
      "mapTitle": "How a need becomes a testable requirement",
      "lead": "Business Analysis helps teams agree what problem matters, what users need and how success will be verified.",
      "flow": [
        "Business Need",
        "BRD",
        "FRD",
        "SRS",
        "User Stories",
        "Acceptance Criteria",
        "Test Cases"
      ],
      "outputs": [
        "Business problem and desired outcome",
        "Business scope, objectives and stakeholders",
        "Functional rules and expected behaviors",
        "System interfaces and non-functional requirements",
        "User-centered requirements backlog",
        "Testable acceptance conditions",
        "Requirements-linked validation scenarios"
      ],
      "explain": [
        "BRD answers WHY: objectives, constraints and boundaries.",
        "FRD answers WHAT the feature does: rules, validation and paths.",
        "SRS documents system interfaces, quality constraints and behavior.",
        "User stories and diagrams connect those specifications to implementation and tests."
      ],
      "example": "For a marketplace NDA flow: an investor requests sensitive listing details → NDA is presented → acceptance is recorded → authorized details become visible. Each arrow becomes a requirement and test.",
      "methods": [
        "BRD / FRD / SRS",
        "User Stories",
        "BPMN",
        "UML",
        "Figma",
        "Acceptance criteria",
        "Notion",
        "Confluence"
      ]
    },
    "fr": {
      "tag": "Des idées aux exigences vérifiables",
      "mapTitle": "Comment un besoin devient une exigence testable",
      "lead": "L’analyse métier permet de s’accorder sur le vrai problème, les besoins utilisateurs et les critères de validation.",
      "flow": [
        "Besoin métier",
        "BRD",
        "FRD",
        "SRS",
        "User Stories",
        "Critères d’acceptation",
        "Cas de test"
      ],
      "outputs": [
        "Problème métier et résultat attendu",
        "Objectifs, périmètre et parties prenantes",
        "Règles fonctionnelles et comportements",
        "Interfaces et exigences non fonctionnelles",
        "Backlog de besoins utilisateurs",
        "Conditions de validation vérifiables",
        "Scénarios de test liés aux exigences"
      ],
      "explain": [
        "Le BRD explique POURQUOI : objectifs, contraintes, périmètre.",
        "Le FRD décrit CE QUE fait une fonctionnalité : règles et parcours.",
        "Le SRS décrit les interfaces et exigences système.",
        "Stories et schémas relient les spécifications aux tests."
      ],
      "example": "Parcours NDA : demande de détails → présentation NDA → acceptation enregistrée → accès autorisé. Chaque étape devient une exigence testable.",
      "methods": [
        "BRD / FRD / SRS",
        "User stories",
        "BPMN",
        "UML",
        "Figma",
        "Critères d’acceptation",
        "Notion",
        "Confluence"
      ]
    },
    "ar": {
      "tag": "من الفكرة إلى متطلبات قابلة للاختبار",
      "mapTitle": "كيف يتحول الاحتياج إلى متطلب قابل للاختبار",
      "lead": "يحدد تحليل الأعمال المشكلة الحقيقية واحتياجات المستخدمين وكيفية التأكد من نجاح الحل.",
      "flow": [
        "احتياج العمل",
        "BRD",
        "FRD",
        "SRS",
        "قصص المستخدم",
        "معايير القبول",
        "حالات الاختبار"
      ],
      "outputs": [
        "المشكلة والنتيجة المطلوبة",
        "الأهداف والنطاق وأصحاب المصلحة",
        "القواعد الوظيفية والسلوك المتوقع",
        "واجهات النظام والمتطلبات غير الوظيفية",
        "قصص المتطلبات المرتبطة بالمستخدم",
        "شروط قبول قابلة للاختبار",
        "سيناريوهات تحقق مرتبطة بالمتطلبات"
      ],
      "explain": [
        "BRD يجيب عن لماذا: الأهداف والقيود والنطاق.",
        "FRD يشرح ماذا تفعل الميزة: القواعد والتحقق والتدفقات.",
        "SRS يوثق الواجهات والمتطلبات التقنية وغير الوظيفية.",
        "تربط قصص المستخدم والمخططات المتطلبات بالتطوير والاختبار."
      ],
      "example": "مثال اتفاقية السرية: طلب التفاصيل → عرض NDA → تسجيل الموافقة → إظهار المعلومات المسموح بها. تتحول كل خطوة إلى شرط واختبار.",
      "methods": [
        "BRD / FRD / SRS",
        "قصص المستخدم",
        "BPMN",
        "UML",
        "Figma",
        "معايير القبول",
        "Notion",
        "Confluence"
      ]
    }
  },
  "technical-analysis": {
    "en": {
      "tag": "Between business rules and system design",
      "mapTitle": "How the system behaves end to end",
      "lead": "Technical analysis shows how features interact with APIs, data, authentication and external platforms.",
      "flow": [
        "Users",
        "Frontend",
        "API Gateway",
        "Backend Services",
        "Database",
        "Integrations",
        "Monitoring"
      ],
      "outputs": [
        "Actors and user context map",
        "Interface and interaction diagram",
        "API contract and request flows",
        "Service responsibilities and access rules",
        "Data model and persistence map",
        "Third-party integration contracts",
        "Reliability and observability requirements"
      ],
      "explain": [
        "Identify the actors, systems and interfaces.",
        "Map requests, responses and edge cases.",
        "Translate business conditions into technical behavior.",
        "Validate integration boundaries using logs, SQL and API tools."
      ],
      "example": "An OTP sign-up journey involves UI validation, an authentication API, time-limited codes and clear error messages. Each boundary needs analysis and testing.",
      "methods": [
        "REST",
        "GraphQL",
        "Postman",
        "SQL",
        "System diagrams",
        "OAuth / RBAC",
        "NestJS",
        "Python"
      ]
    },
    "fr": {
      "tag": "Entre besoins métier et conception technique",
      "mapTitle": "Comment le système se comporte de bout en bout",
      "lead": "L’analyse technique montre comment les fonctionnalités interagissent avec API, données, authentification et services externes.",
      "flow": [
        "Utilisateurs",
        "Interface",
        "Passerelle API",
        "Services backend",
        "Base de données",
        "Intégrations",
        "Supervision"
      ],
      "outputs": [
        "Acteurs et contexte utilisateur",
        "Diagramme des interactions UI",
        "Contrat API et échanges",
        "Règles métier et droits d’accès",
        "Modèle de données",
        "Contrats de services externes",
        "Exigences de fiabilité et observabilité"
      ],
      "explain": [
        "Identifier les acteurs et interfaces.",
        "Cartographier requêtes, réponses et cas limites.",
        "Traduire les règles métier en logique technique.",
        "Valider les intégrations via logs et outils API."
      ],
      "example": "Un parcours OTP comporte un formulaire, une API d’authentification, des codes temporaires et des erreurs compréhensibles.",
      "methods": [
        "REST",
        "GraphQL",
        "Postman",
        "SQL",
        "Diagrammes",
        "OAuth / RBAC",
        "NestJS",
        "Python"
      ]
    },
    "ar": {
      "tag": "جسر المتطلبات والمنظومات التقنية",
      "mapTitle": "كيف يعمل النظام من طرف إلى طرف",
      "lead": "يوضح التحليل التقني كيف تتواصل الواجهات مع API والبيانات والمصادقة والخدمات الخارجية.",
      "flow": [
        "المستخدمون",
        "الواجهة الأمامية",
        "بوابة API",
        "خدمات الخلفية",
        "قاعدة البيانات",
        "التكاملات",
        "المراقبة"
      ],
      "outputs": [
        "خريطة المستخدمين والأطراف",
        "مخطط تفاعل الواجهة",
        "عقود API وتدفق الطلبات",
        "قواعد الخدمات والصلاحيات",
        "نموذج تخزين البيانات",
        "عقود التكامل الخارجي",
        "متطلبات الموثوقية والمراقبة"
      ],
      "explain": [
        "تحديد الأطراف والأنظمة والواجهات.",
        "رسم الطلبات والاستجابات والحالات غير العادية.",
        "تحويل قواعد الأعمال إلى سلوك تقني.",
        "فحص التكامل عبر السجلات وSQL وAPI."
      ],
      "example": "تسجيل الدخول عبر OTP يشمل نموذجًا وAPI ورموزًا مؤقتة ورسائل خطأ واضحة؛ كل جزء يحتاج تحليلًا واختبارًا.",
      "methods": [
        "REST",
        "GraphQL",
        "Postman",
        "SQL",
        "المخططات",
        "OAuth / RBAC",
        "NestJS",
        "Python"
      ]
    }
  },
  "qa-uat": {
    "en": {
      "tag": "Quality is evidence, not a guess",
      "mapTitle": "How evidence turns work into acceptance",
      "lead": "QA checks whether the product actually behaves as agreed. UAT confirms that it works for business users.",
      "flow": [
        "Plan Tests",
        "Prepare Data",
        "Execute Tests",
        "Log Defects",
        "Retest",
        "UAT Sign-off",
        "Release Readiness"
      ],
      "outputs": [
        "Test scope and coverage plan",
        "Test dataset and environment checklist",
        "Executed scenarios and test evidence",
        "Reproducible defect tickets",
        "Fix verification and regression results",
        "Business-user acceptance decision",
        "Release readiness report"
      ],
      "explain": [
        "Turn acceptance criteria into expected results.",
        "Run functional, integration and regression checks.",
        "Report steps, severity and evidence for each defect.",
        "Retest corrected behavior and coordinate user acceptance."
      ],
      "example": "If an investor submits an NDA request without required consent, the application must block access and display the correct validation message.",
      "methods": [
        "Postman",
        "Jira",
        "Test cases",
        "Playwright",
        "CI checks",
        "Regression / UAT"
      ]
    },
    "fr": {
      "tag": "La qualité se démontre",
      "mapTitle": "Comment les preuves mènent à la recette",
      "lead": "La QA vérifie le respect des exigences. La recette UAT confirme l’adéquation pour les utilisateurs métier.",
      "flow": [
        "Planifier les tests",
        "Préparer les données",
        "Exécuter les tests",
        "Signaler les anomalies",
        "Retester",
        "Valider la recette",
        "Préparer la release"
      ],
      "outputs": [
        "Périmètre et plan de couverture",
        "Données et environnement de test",
        "Scénarios exécutés et preuves",
        "Anomalies reproductibles",
        "Vérification des corrections et régression",
        "Décision des utilisateurs métier",
        "Rapport de préparation à la livraison"
      ],
      "explain": [
        "Transformer critères d’acceptation en résultats attendus.",
        "Exécuter tests fonctionnels et d’intégration.",
        "Documenter étapes, gravité et preuves des erreurs.",
        "Retester puis coordonner la validation des utilisateurs."
      ],
      "example": "Sans consentement NDA, l’accès aux données sensibles doit être bloqué et l’erreur expliquée.",
      "methods": [
        "Postman",
        "Jira",
        "Cas de test",
        "Playwright",
        "CI",
        "Régression / UAT"
      ]
    },
    "ar": {
      "tag": "الجودة تقاس بالأدلة",
      "mapTitle": "كيف تتحول الأدلة إلى قبول",
      "lead": "يتحقق QA من مطابقة التطبيق للمتطلبات؛ ويؤكد UAT ملاءمته للمستخدمين وأهداف الأعمال.",
      "flow": [
        "تخطيط الاختبارات",
        "تحضير البيانات",
        "تنفيذ الاختبارات",
        "تسجيل العيوب",
        "إعادة الاختبار",
        "قبول المستخدم",
        "جاهزية الإصدار"
      ],
      "outputs": [
        "خطة نطاق وتغطية الاختبارات",
        "البيانات وبيئة الاختبار",
        "السيناريوهات ونتائج التنفيذ",
        "تقارير عيوب قابلة لإعادة الإنتاج",
        "التحقق من الإصلاح واختبارات الانحدار",
        "قرار قبول المستخدمين",
        "تقرير جاهزية الإصدار"
      ],
      "explain": [
        "تحويل معايير القبول إلى نتائج متوقعة.",
        "تنفيذ الاختبارات الوظيفية والتكاملية.",
        "توثيق خطوات إعادة إنتاج كل مشكلة.",
        "إعادة الاختبار وتنسيق القبول النهائي."
      ],
      "example": "عندما لا يقبل المستثمر اتفاقية NDA يجب منع عرض البيانات الحساسة وإظهار رسالة واضحة.",
      "methods": [
        "Postman",
        "Jira",
        "حالات الاختبار",
        "Playwright",
        "CI",
        "UAT"
      ]
    }
  },
  "fullstack": {
    "en": {
      "tag": "From interface to production system",
      "mapTitle": "The full stack in one picture",
      "lead": "Full-stack development combines the visible experience, server-side logic, storage and the infrastructure that makes the product available.",
      "flow": [
        "Users",
        "Frontend",
        "API / Backend",
        "Database",
        "Cloud Infrastructure"
      ],
      "outputs": [
        "User journeys and interface needs",
        "Responsive UI components",
        "APIs, authentication and business rules",
        "Data model and persistence logic",
        "Deployment, configuration and observability"
      ],
      "explain": [
        "Frontend: build pages, accessible forms and interactions.",
        "Backend: process requests, apply rules and secure data.",
        "Database: persist and query application information.",
        "Deploy: configure hosting, monitor errors and support releases."
      ],
      "example": "Qatesty is an independent end-to-end application: create a project, connect a target application, organize testing workflows and deploy the product.",
      "methods": [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "NestJS",
        "Python",
        "PostgreSQL / MongoDB",
        "Azure / Render",
        "Firebase",
        "Google Cloud (GCP)",
        "Oracle Cloud"
      ]
    },
    "fr": {
      "tag": "De l’interface au système en production",
      "mapTitle": "La pile complète en une image",
      "lead": "Le développement full-stack relie expérience utilisateur, logique serveur, stockage et infrastructure.",
      "flow": [
        "Utilisateurs",
        "Frontend",
        "API / Backend",
        "Base de données",
        "Infrastructure Cloud"
      ],
      "outputs": [
        "Parcours et besoins des utilisateurs",
        "Composants UI responsive",
        "API, authentification et règles métier",
        "Modèle et stockage des données",
        "Déploiement, configuration et surveillance"
      ],
      "explain": [
        "Frontend : pages et interactions accessibles.",
        "Backend : requêtes, règles et protection des données.",
        "Base de données : stockage et recherche.",
        "Déploiement : hébergement, supervision et versions."
      ],
      "example": "Qatesty est un projet personnel réalisé de bout en bout, intégrant interface, workflows de test et déploiement.",
      "methods": [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "NestJS",
        "Python",
        "PostgreSQL / MongoDB",
        "Azure / Render",
        "Firebase",
        "Google Cloud (GCP)",
        "Oracle Cloud"
      ]
    },
    "ar": {
      "tag": "من الواجهة إلى التطبيق المنشور",
      "mapTitle": "الحزمة الكاملة في صورة واحدة",
      "lead": "يجمع التطوير المتكامل تجربة المستخدم ومنطق الخادم وتخزين البيانات والبنية التي تشغل المنتج.",
      "flow": [
        "المستخدمون",
        "الواجهة الأمامية",
        "API / الخلفية",
        "قاعدة البيانات",
        "البنية السحابية"
      ],
      "outputs": [
        "رحلات المستخدم واحتياجات الواجهة",
        "مكونات واجهة متجاوبة",
        "واجهات API والمصادقة وقواعد العمل",
        "نماذج وحفظ البيانات",
        "النشر والتهيئة والمراقبة"
      ],
      "explain": [
        "الواجهة: صفحات ونماذج سهلة الاستخدام.",
        "الخلفية: الطلبات والقواعد وحماية البيانات.",
        "قاعدة البيانات: الحفظ والاستعلام.",
        "النشر: الاستضافة والسجلات ومراقبة الأخطاء."
      ],
      "example": "Qatesty تطبيق مستقل بنيته من البداية إلى النهاية لربط التطبيقات وتنظيم اختبارات الجودة ونشر الحل.",
      "methods": [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "NestJS",
        "Python",
        "PostgreSQL / MongoDB",
        "Azure / Render",
        "Firebase",
        "Google Cloud (GCP)",
        "Oracle Cloud"
      ]
    }
  },
  "devsecops": {
    "en": {
      "tag": "Safer software delivery",
      "mapTitle": "How code reaches production safely",
      "lead": "DevSecOps integrates development, security and operations so checks happen throughout the release pipeline—not only at the end.",
      "flow": [
        "Plan",
        "Code",
        "Build",
        "Test",
        "Security Scan",
        "Release",
        "Deploy",
        "Monitor",
        "Improve"
      ],
      "outputs": [
        "Delivery priorities and security criteria",
        "Reviewable code changes",
        "Versioned artifact and build logs",
        "Automated test results",
        "Dependency and vulnerability report",
        "Approved release checklist",
        "Deployment and rollback evidence",
        "Monitoring, logs and alerts",
        "Improvement actions and backlog"
      ],
      "explain": [
        "Commit work and run automated quality gates.",
        "Scan dependencies and review security-sensitive changes.",
        "Build and verify artifacts before deployment.",
        "Observe health after release and prepare safe rollback."
      ],
      "example": "Qatesty deployment troubleshooting included API-error investigation, CI verification and post-release checks. These examples are project-specific rather than a claim of owning a company DevSecOps function.",
      "methods": [
        "GitHub Actions",
        "Git",
        "Docker",
        "Azure",
        "Render",
        "Firebase",
        "Google Cloud (GCP)",
        "Oracle Cloud",
        "CI/CD",
        "Logs"
      ]
    },
    "fr": {
      "tag": "Livraison logicielle plus sûre",
      "mapTitle": "Comment le code atteint la production en sécurité",
      "lead": "DevSecOps intègre développement, sécurité et exploitation tout au long du pipeline de livraison.",
      "flow": [
        "Planifier",
        "Coder",
        "Construire",
        "Tester",
        "Scanner la sécurité",
        "Préparer la release",
        "Déployer",
        "Surveiller",
        "Améliorer"
      ],
      "outputs": [
        "Priorités et exigences de sécurité",
        "Modifications de code traçables",
        "Artefact et journaux de build",
        "Résultats des tests automatisés",
        "Rapport de vulnérabilités et dépendances",
        "Checklist de release validée",
        "Preuves de déploiement et rollback",
        "Surveillance, journaux et alertes",
        "Actions et backlog d’amélioration"
      ],
      "explain": [
        "Vérifier automatiquement les changements de code.",
        "Contrôler dépendances et modifications sensibles.",
        "Construire et valider avant le déploiement.",
        "Surveiller après publication et préparer le rollback."
      ],
      "example": "Sur Qatesty, j’ai suivi résolution d’erreurs API, vérification CI et contrôles de déploiement.",
      "methods": [
        "GitHub Actions",
        "Git",
        "Docker",
        "Azure",
        "Render",
        "Firebase",
        "Google Cloud (GCP)",
        "Oracle Cloud",
        "CI/CD",
        "Logs"
      ]
    },
    "ar": {
      "tag": "تسليم برمجي أكثر أمانًا",
      "mapTitle": "كيف يصل الكود إلى الإنتاج بأمان",
      "lead": "يجمع DevSecOps بين التطوير والأمان والتشغيل بحيث تتكرر الفحوصات طوال دورة الإصدار.",
      "flow": [
        "التخطيط",
        "البرمجة",
        "البناء",
        "الاختبار",
        "فحص الأمان",
        "الإصدار",
        "النشر",
        "المراقبة",
        "التحسين"
      ],
      "outputs": [
        "الأولويات ومعايير الأمان",
        "تغييرات الكود الموثقة",
        "نسخة البناء وسجلاتها",
        "نتائج الاختبارات الآلية",
        "تقرير الثغرات والاعتماديات",
        "قائمة مراجعة الإصدار المعتمد",
        "نتائج النشر وخطة الاسترجاع",
        "المراقبة والسجلات والتنبيهات",
        "إجراءات التحسين وقائمة العمل"
      ],
      "explain": [
        "تشغيل فحوصات آلية عند إرسال التغييرات.",
        "فحص المكتبات والتغييرات الحساسة.",
        "بناء التطبيق والتحقق منه قبل النشر.",
        "مراقبة التشغيل ووضع خطة استرجاع."
      ],
      "example": "في Qatesty تابعت إصلاح أخطاء API وفحوصات CI والتحقق بعد النشر، دون الادعاء بإدارة منصة DevSecOps مؤسسية.",
      "methods": [
        "GitHub Actions",
        "Git",
        "Docker",
        "Azure",
        "Render",
        "Firebase",
        "Google Cloud (GCP)",
        "Oracle Cloud",
        "CI/CD",
        "Logs"
      ]
    }
  },
  "it-operations": {
    "en": {
      "tag": "Technology must remain usable",
      "mapTitle": "How an incident becomes a known fix",
      "lead": "IT operations connect service requests, incidents, troubleshooting and communication to keep business applications functioning.",
      "flow": [
        "Incident Raised",
        "Triage",
        "Diagnose",
        "Escalate / Resolve",
        "Verify",
        "Close",
        "Knowledge Base"
      ],
      "outputs": [
        "Incident ticket and reported symptoms",
        "Priority, urgency and impact assessment",
        "Root-cause investigation notes",
        "Escalation or resolution record",
        "User and service verification",
        "Closure note and status notification",
        "Reusable support knowledge article"
      ],
      "explain": [
        "Record the symptoms and business impact.",
        "Narrow down the component, user path and reproduction.",
        "Coordinate with technical teams or suppliers for resolution.",
        "Confirm the fix and document how to avoid recurrence."
      ],
      "example": "An application login issue can be investigated through user reports, session behavior, authentication responses and retesting.",
      "methods": [
        "Ticket tracking",
        "Application logs",
        "User support",
        "Postman",
        "SQL",
        "Documentation",
        "Notion",
        "Confluence"
      ]
    },
    "fr": {
      "tag": "Maintenir des systèmes utilisables",
      "mapTitle": "Comment un incident devient un correctif connu",
      "lead": "Les opérations IT relient demandes, incidents, diagnostic et communication pour soutenir les applications métier.",
      "flow": [
        "Incident signalé",
        "Qualification",
        "Diagnostic",
        "Escalader / Résoudre",
        "Vérifier",
        "Clôturer",
        "Base de connaissances"
      ],
      "outputs": [
        "Ticket et symptômes signalés",
        "Priorité, urgence et impact",
        "Résultats du diagnostic",
        "Compte rendu de l’escalade ou résolution",
        "Confirmation utilisateur et service",
        "Note de clôture et information",
        "Article de connaissance réutilisable"
      ],
      "explain": [
        "Noter symptômes et impact.",
        "Reproduire et isoler la cause.",
        "Coordonner équipes et fournisseurs.",
        "Vérifier la correction puis documenter."
      ],
      "example": "Un souci de connexion se diagnostique via parcours, sessions, réponses API et retests.",
      "methods": [
        "Ticketing",
        "Logs",
        "Support utilisateurs",
        "Postman",
        "SQL",
        "Documentation",
        "Notion",
        "Confluence"
      ]
    },
    "ar": {
      "tag": "ضمان عمل الأنظمة للمستخدمين",
      "mapTitle": "كيف تتحول الحادثة إلى حل موثق",
      "lead": "تجمع العمليات التقنية البلاغات والتشخيص والتصعيد والتواصل لاستمرارية تطبيقات الأعمال.",
      "flow": [
        "تسجيل الحادث",
        "الفرز",
        "التشخيص",
        "التصعيد أو الحل",
        "التحقق",
        "الإغلاق",
        "قاعدة المعرفة"
      ],
      "outputs": [
        "تذكرة البلاغ والأعراض",
        "تقييم الأولوية والتأثير",
        "نتائج تحليل السبب",
        "سجل التصعيد أو الحل",
        "تأكيد المستخدم وسلامة الخدمة",
        "ملاحظة الإغلاق والإشعار",
        "مقالة دعم قابلة لإعادة الاستخدام"
      ],
      "explain": [
        "توثيق الأعراض وتأثيرها على العمل.",
        "إعادة إنتاج المشكلة وعزل السبب.",
        "التنسيق مع الفريق التقني أو المورد.",
        "التحقق من الإصلاح وتوثيقه."
      ],
      "example": "يمكن تحليل مشكلة تسجيل الدخول من خلال مسار المستخدم والاتصال بالهوية ونتائج API.",
      "methods": [
        "سجل البلاغات",
        "السجلات",
        "دعم المستخدم",
        "Postman",
        "SQL",
        "التوثيق",
        "Notion",
        "Confluence"
      ]
    }
  },
  "business-operations": {
    "en": {
      "tag": "From requests to reliable follow-up",
      "mapTitle": "How client work stays coordinated",
      "lead": "Business operations coordinate stakeholders, customer needs, service providers, documents and next steps with transparent ownership.",
      "flow": [
        "Client Needs",
        "Internal Team",
        "Supplier / Vendor",
        "Documentation",
        "Follow-up",
        "Service Delivery",
        "Outcome"
      ],
      "outputs": [
        "Client request and expectations",
        "Assigned responsibilities and schedule",
        "Supplier brief and follow-up record",
        "Approved documents and decisions",
        "Open actions and next steps",
        "Service completion and handover",
        "Client feedback and outcome review"
      ],
      "explain": [
        "Understand what the requester needs and by when.",
        "Coordinate the relevant people or suppliers.",
        "Track outstanding items and communicate progress.",
        "Document decisions and complete handover."
      ],
      "example": "At Satoricom Services, I coordinated digital-service needs, supplier communication, customer feedback and handover activities.",
      "methods": [
        "Microsoft Office",
        "Google Workspace",
        "Coordination",
        "Client communication",
        "Documentation",
        "Notion",
        "Confluence"
      ]
    },
    "fr": {
      "tag": "De la demande au suivi concret",
      "mapTitle": "Comment l’activité client reste coordonnée",
      "lead": "La coordination opérationnelle organise parties prenantes, clients, fournisseurs, documents et prochaines étapes.",
      "flow": [
        "Besoins client",
        "Équipe interne",
        "Fournisseur",
        "Documentation",
        "Suivi",
        "Livraison du service",
        "Résultat"
      ],
      "outputs": [
        "Demande et attentes du client",
        "Responsabilités et planning",
        "Demande et suivi fournisseur",
        "Documents et décisions validés",
        "Actions ouvertes et prochaines étapes",
        "Prestation et passation",
        "Retour client et bilan du résultat"
      ],
      "explain": [
        "Préciser demande, priorité et délai.",
        "Aligner acteurs et prestataires concernés.",
        "Relancer les actions et communiquer les progrès.",
        "Tracer les décisions et assurer la passation."
      ],
      "example": "Chez Satoricom Services, j’ai coordonné besoins clients, échanges fournisseurs et livraisons digitales.",
      "methods": [
        "Microsoft Office",
        "Google Workspace",
        "Coordination",
        "Communication client",
        "Documentation",
        "Notion",
        "Confluence"
      ]
    },
    "ar": {
      "tag": "من الطلب إلى المتابعة الفعالة",
      "mapTitle": "كيف يبقى عمل العملاء منسقًا",
      "lead": "تنظم العمليات الإدارية التواصل مع العملاء والموردين والوثائق والمتابعة حتى إغلاق كل طلب.",
      "flow": [
        "احتياجات العميل",
        "الفريق الداخلي",
        "المورد أو الشريك",
        "التوثيق",
        "المتابعة",
        "تسليم الخدمة",
        "النتيجة"
      ],
      "outputs": [
        "طلب العميل وتوقعاته",
        "المسؤوليات والمواعيد",
        "متابعة المورد أو الشريك",
        "الوثائق والقرارات المعتمدة",
        "البنود المفتوحة والخطوات التالية",
        "إنجاز الخدمة وتسليمها",
        "ملاحظات العميل ومراجعة النتيجة"
      ],
      "explain": [
        "فهم الاحتياج والأولوية والموعد.",
        "التنسيق بين الأطراف والموردين.",
        "متابعة البنود وتحديث أصحاب العلاقة.",
        "توثيق القرارات والتسليم."
      ],
      "example": "في Satoricom Services نسقت متطلبات العملاء وتواصل الموردين والتغذية الراجعة وعمليات التسليم.",
      "methods": [
        "Microsoft Office",
        "Google Workspace",
        "التنسيق",
        "تواصل العملاء",
        "التوثيق",
        "Notion",
        "Confluence"
      ]
    }
  }
} as Record<Slug,Record<Locale,RoleContent>>;
export function getRole(slug:Slug,locale:Locale):RoleContent{return details[slug][locale]}
