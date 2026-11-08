export const projectCopy = {
  "en": {
    "arsolab": [
      "Technology company website · delivery platform · contribution",
      "An AI-powered technology company platform covering project delivery flows from client request to delivery and recruitment."
    ],
    "mergers": [
      "Digital marketplace · coordination / BA / QA",
      "Coordinated vendor follow-up, requirements, administrative workflows, test scenarios and UAT. This was a team/vendor project."
    ],
    "qatesty": [
      "Independent web application · built end to end",
      "Built the application, handled integrations and OAuth troubleshooting, testing and deployment validation."
    ],
    "prestige": [
      "Independent web platform · built end to end",
      "Developed the Prestige TN website including responsive interfaces, content journeys and deployment."
    ],
    "satoricom": [
      "Digital service operations · coordination",
      "Co-founded a digital-services operation; coordinated customer needs, supplier communication and handover."
    ],
    "finance": [
      "Financial-services workflows · frontend contributor",
      "Developed React/Next.js user interfaces and REST integration for financial-product and eligibility journeys."
    ]
  },
  "fr": {
    "arsolab": [
      "Site d’entreprise technologique · plateforme de livraison · contribution",
      "Plateforme assistée par l’IA pour une entreprise technologique. Elle suit les projets, de la demande du client à la livraison, et facilite le recrutement."
    ],
    "mergers": [
      "Place de marché numérique · coordination / analyse / qualité",
      "Suivi des fournisseurs, des besoins, des processus administratifs, des tests et de la recette. Projet réalisé en équipe."
    ],
    "qatesty": [
      "Application indépendante · réalisée de bout en bout",
      "Développement de l’application, intégration OAuth, résolution d’incidents, tests et vérification du déploiement."
    ],
    "prestige": [
      "Site indépendant · réalisé de bout en bout",
      "Développement du site Prestige TN, avec une interface adaptée aux écrans, des parcours clients et la mise en ligne."
    ],
    "satoricom": [
      "Services numériques · coordination",
      "Co-fondateur d’une activité de services numériques ; suivi des clients, des prestataires et des transmissions."
    ],
    "finance": [
      "Services financiers · contribution aux interfaces",
      "Interfaces React/Next.js et intégrations REST pour parcours financiers et éligibilité."
    ]
  },
  "ar": {
    "arsolab": [
      "موقع شركة تقنية · منصة تسليم · مساهمة",
      "منصة مدعومة بالذكاء الاصطناعي لشركة تقنية. تتابع المشاريع من طلب العميل حتى التسليم، وتدعم عمليات التوظيف."
    ],
    "mergers": [
      "سوق رقمي · تنسيق وتحليل واختبار",
      "تابعت المورد والمتطلبات والعمليات الإدارية وسيناريوهات الاختبار وقبول المستخدم. المشروع عمل جماعي."
    ],
    "qatesty": [
      "تطبيق مستقل · أنجزته كاملًا",
      "بنيت التطبيق وتابعت التكامل والمصادقة ومعالجة الأعطال والاختبارات والتحقق من النشر."
    ],
    "prestige": [
      "موقع مستقل · أنجزته كاملًا",
      "طورت موقع Prestige TN بواجهات متجاوبة ورحلات استخدام ونشر على الإنترنت."
    ],
    "satoricom": [
      "خدمات رقمية · تنسيق",
      "شاركت في تأسيس نشاط خدمات رقمية وتنسيق احتياجات العملاء وتواصل الموردين والتسليم."
    ],
    "finance": [
      "خدمات مالية · مساهمة في تطوير الواجهات",
      "تطوير واجهات React/Next.js وربطها بخدمات REST لعرض المنتجات المالية والتحقق من الأهلية."
    ]
  }
} as const;

/** Group labels and contribution badges for the project display. */
export const projectGroups = {
 en: {
  independent: {eyebrow: 'BUILT END TO END', title: 'Products delivered independently.'},
  contribution: {eyebrow: 'TEAM & CLIENT CONTRIBUTIONS', title: 'Coordinated, analysed and tested with teams.'},
  kind: {independent: 'END TO END', coordination: 'COORDINATION', contributor: 'CONTRIBUTION'},
  privateLabel: 'PRIVATE',
  privateAlt: 'Blurred screenshot, private project'
 },
 fr: {
  independent: {eyebrow: 'RÉALISÉS DE BOUT EN BOUT', title: 'Produits livrés en autonomie.'},
  contribution: {eyebrow: 'CONTRIBUTIONS ÉQUIPE & CLIENT', title: 'Coordination, analyse et recette au sein d’équipes.'},
  kind: {independent: 'DE BOUT EN BOUT', coordination: 'COORDINATION', contributor: 'CONTRIBUTION'},
  privateLabel: 'PRIVÉ',
  privateAlt: 'Capture floutée, projet privé'
 },
 ar: {
  independent: {eyebrow: 'منجزة من البداية إلى النهاية', title: 'منتجات سلّمتها بشكل مستقل.'},
  contribution: {eyebrow: 'مساهمات مع الفرق والعملاء', title: 'تنسيق وتحليل واختبار ضمن فرق العمل.'},
  kind: {independent: 'من البداية إلى النهاية', coordination: 'تنسيق', contributor: 'مساهمة'},
  privateLabel: 'خاص',
  privateAlt: 'لقطة شاشة مموهة لمشروع خاص'
 }
} as const;
