import type {Metadata} from 'next';
import {localizedMetadata} from '@/lib/seo';
import {uiCopy} from '@/lib/ui-copy';
import Image from 'next/image';
import type {Locale} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import {MotionCard,Reveal} from '@/components/MotionKit';
import {DegreePreview} from '@/components/DegreePreview';

const jobs={
 en:[['2024 — 2026','Mergers United','IT Project Coordination · Business Analysis · QA/UAT','Requirements, vendor coordination, issue tracking, acceptance criteria, testing and handover.'],['2023 — 2024','Satoricom Services','Co-founder / Digital Operations','Client needs, supplier communications, digital-service coordination and handover.'],['2023','Avenues Dental Center','Software Engineer','Investigated application issues, supported technical changes and troubleshooting.'],['2022 — 2023','Arsela Technologies','Frontend Software Engineer','React/Next.js interfaces, REST API integration and functional testing.']],
 fr:[['2024 — 2026','Mergers United','Coordination IT · Analyse métier · Recette','Exigences, suivi fournisseur, anomalies, critères d’acceptation, tests et passation.'],['2023 — 2024','Satoricom Services','Co-fondateur / Opérations numériques','Besoin client, fournisseurs, coordination des prestations et passation.'],['2023','Avenues Dental Center','Ingénieur logiciel','Diagnostic d’anomalies applicatives, suivi des changements et support.'],['2022 — 2023','Arsela Technologies','Ingénieur frontend','Interfaces React/Next.js, intégrations REST et tests fonctionnels.']],
 ar:[['2024 — 2026','Mergers United','تنسيق المشاريع وتحليل الأعمال والجودة','المتطلبات ومتابعة الموردين والمشكلات ومعايير القبول والاختبارات والتسليم.'],['2023 — 2024','Satoricom Services','شريك مؤسس / خدمات رقمية','احتياجات العملاء والتواصل مع الموردين وتنسيق الخدمات والتسليم.'],['2023','Avenues Dental Center','مهندس برمجيات','تشخيص مشكلات التطبيقات ودعم التغييرات التقنية.'],['2022 — 2023','Arsela Technologies','مهندس واجهات أمامية','تطوير React/Next.js وتكامل REST والاختبار الوظيفي.']]
} as const;

export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{const {locale}=await params,t=dictionary[locale];return localizedMetadata(locale,'experience',t.experienceHeading,t.qualification);}

export default async function Experience({params}:{params:Promise<{locale:Locale}>}){
 const {locale}=await params,t=dictionary[locale],u=uiCopy[locale];
 return <div className="container subpage">
  <Reveal className="subpage-head"><span className="eyebrow">{u.sections.experience}</span><h1>{t.experienceHeading}</h1><p>{t.qualification}</p></Reveal>
  <div className="career-timeline">{jobs[locale].map((j,i)=><MotionCard key={j[1]} index={i}><article><time>{j[0]}</time><div><span className="timeline-dot"/><h2>{j[1]}</h2><h3>{j[2]}</h3><p>{j[3]}</p></div></article></MotionCard>)}</div>
  <div className="credential-grid">
   <MotionCard><article className="content-panel degree-card">
    <DegreePreview label={u.degreeAlt} note={u.degreeViewOnly}/>
    <div className="degree-body">
     <span className="eyebrow">EPI · SOUSSE</span>
     <h3>{u.degreeTitle}</h3>
     <p>{t.qualification}</p>
    </div>
   </article></MotionCard>
   <MotionCard><article className="content-panel">
    <Image width={440} height={300} src="/assets/media/docker-certificate.webp" alt={u.certificateAlt} className="certificate-image"/>
    <h3>{t.cert}</h3>
    <a href="https://credsverse.com/credentials/99cf456e-5560-40ff-8204-4887debc4c01?preview=1" target="_blank" rel="noopener noreferrer">{u.credentialLink} ↗</a>
   </article></MotionCard>
  </div>
 </div>;
}
