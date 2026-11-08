export const locales = ['en','fr','ar'] as const;
export type Locale = typeof locales[number];
export type Slug = 'project-coordination'|'business-analysis'|'technical-analysis'|'qa-uat'|'fullstack'|'devsecops'|'it-operations'|'business-operations';
export const roles: {slug:Slug;icon:string;category:string}[] = [
 {slug:'project-coordination',icon:'◈',category:'Delivery'},
 {slug:'business-analysis',icon:'◇',category:'Analysis'},
 {slug:'technical-analysis',icon:'⌘',category:'Analysis'},
 {slug:'qa-uat',icon:'✓',category:'Quality'},
 {slug:'fullstack',icon:'{ }',category:'Engineering'},
 {slug:'devsecops',icon:'⬡',category:'Engineering'},
 {slug:'it-operations',icon:'⚙',category:'Operations'},
 {slug:'business-operations',icon:'◎',category:'Operations'},
];
type ProjectEntry={id:string;title:string;tags:string[];image:string;url:string;github:string;kind:'independent'|'coordination'|'contributor';private?:boolean};
export const projects:ProjectEntry[]=[
 {id:'arsolab',title:'Arsolab',tags:['Delivery','Analysis','Product'],image:'/assets/media/arsolab-homepage.webp',url:'https://arsolab-app.web.app',github:'https://github.com/aboudawassim/Arsolab',kind:'contributor'},
 {id:'mergers',title:'Mergers United',tags:['Delivery','Analysis','Quality'],image:'/assets/media/mergers-united-private.webp',url:'https://www.mergersunited.com',github:'',kind:'coordination',private:true},
 {id:'qatesty',title:'Qatesty',tags:['Engineering','Quality','DevSecOps'],image:'/assets/media/qatesty-product-interface.webp',url:'https://qatesty.onrender.com/',github:'https://github.com/aboudawassim/Qatesty',kind:'independent'},
 {id:'prestige',title:'Prestige TN',tags:['Engineering','Design'],image:'/assets/media/prestige-tn.jpeg',url:'https://prestige-tn.com/',github:'https://github.com/aboudawassim/Prestige-TN',kind:'independent'},
 {id:'satoricom',title:'Satoricom Services',tags:['Operations','Delivery'],image:'/assets/media/satoricom-website.webp',url:'https://www.satoricomservices.com',github:'',kind:'coordination'},
 {id:'finance',title:'Financial services interfaces',tags:['Engineering','Analysis'],image:'',url:'',github:'',kind:'contributor'}
];
export const resumeFiles=[
 ['Master CV','Mohamed_Wassim_Abouda_CV_master_EN.pdf','en'],['IT Project Coordinator','Mohamed_Wassim_Abouda_CV_it_project_coordinator_EN.pdf','en'],['Business Analyst','Mohamed_Wassim_Abouda_CV_business_analyst_EN.pdf','en'],['Technical Analyst','Mohamed_Wassim_Abouda_CV_technical_analyst_EN.pdf','en'],['QA Engineer','Mohamed_Wassim_Abouda_CV_qa_engineer_EN.pdf','en'],['Full-stack Engineer','Mohamed_Wassim_Abouda_CV_full_stack_engineer_EN.pdf','en'],['Frontend Engineer','Mohamed_Wassim_Abouda_CV_frontend_engineer_EN.pdf','en'],['IT Analyst','Mohamed_Wassim_Abouda_CV_it_analyst_EN.pdf','en'],['Product Delivery Coordinator','Mohamed_Wassim_Abouda_CV_product_delivery_coordinator_EN.pdf','en'],['IT Operations Support','Mohamed_Wassim_Abouda_CV_it_operations_support_EN.pdf','en'],['Administrative Coordinator','Mohamed_Wassim_Abouda_CV_administration_business_coordinator_EN.pdf','en'],['Partnerships Support','Mohamed_Wassim_Abouda_CV_administration_partnerships_EN.pdf','en'],['Technical Client Coordinator','Mohamed_Wassim_Abouda_CV_technical_client_coordinator_EN.pdf','en'],['Onsite IT Support','Mohamed_Wassim_Abouda_CV_onsite_it_support_EN.pdf','en'],['Hospitality IT Coordinator','Mohamed_Wassim_Abouda_CV_hospitality_it_coordinator_EN.pdf','en'],['Programme Reporting','Mohamed_Wassim_Abouda_CV_programme_performance_reporting_EN.pdf','en'],['Jira Delivery Controls','Mohamed_Wassim_Abouda_CV_jira_delivery_reporting_EN.pdf','en'],['Coordinateur de projets IT','Mohamed_Wassim_Abouda_CV_fr_coordinateur_projets_it_FR.pdf','fr'],['Business Analyst / Analyste fonctionnel','Mohamed_Wassim_Abouda_CV_fr_business_analyst_FR.pdf','fr'],['Ingénieur Full-stack','Mohamed_Wassim_Abouda_CV_fr_ingenieur_fullstack_FR.pdf','fr']
] as const;
