import Image from 'next/image';
import Link from 'next/link';
import type {CSSProperties} from 'react';
import type {Locale} from '@/lib/site';
import {roles} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import {MotionCard,Reveal} from '@/components/MotionKit';
import {roleAccent} from '@/components/RoleVisual';

const visualCopy={
 en:{eyebrow:'EIGHT DISCIPLINES • EIGHT VISUAL LANGUAGES',featuredEyebrow:'SELECTED DISCIPLINES • EIGHT VISUAL LANGUAGES',title:'Every specialty has its own shape.',sub:'Explore vivid, illustrated workflows alongside clear, interactive explanations. Select a discipline to see the full image, localized diagram and process steps.',cta:'Explore the workflow',view:'View all eight specialties'},
 fr:{eyebrow:'HUIT DISCIPLINES • HUIT UNIVERS VISUELS',featuredEyebrow:'DISCIPLINES SÉLECTIONNÉES • HUIT UNIVERS VISUELS',title:'Chaque métier possède son propre schéma.',sub:'Découvrez des illustrations de processus, des explications interactives et des diagrammes traduits pour chaque spécialité.',cta:'Explorer le processus',view:'Voir les huit spécialités'},
 ar:{eyebrow:'ثمانية تخصصات • ثمانية أشكال بصرية',featuredEyebrow:'تخصصات مختارة • ثمانية أشكال بصرية',title:'لكل تخصص مخطط بصري مختلف.',sub:'استكشف الرسوم التوضيحية والمسارات التفاعلية والشروح المترجمة لكل تخصص مهني.',cta:'استكشف المخطط',view:'عرض التخصصات الثمانية'}
} as const;
const coverHeights:Record<string,number>={
 'project-coordination':870,'business-analysis':1020,'technical-analysis':880,'qa-uat':890,'fullstack':885,'devsecops':885,'it-operations':680,'business-operations':890
};
const featured=['project-coordination','business-analysis','qa-uat','fullstack'];
/** Distinct crop per discipline so the strips never share one frame. */
const crops:Record<string,string>={
 'project-coordination':'18% 30%',
 'business-analysis':'50% 22%',
 'technical-analysis':'82% 34%',
 'qa-uat':'35% 58%',
 'fullstack':'68% 62%',
 'devsecops':'22% 70%',
 'it-operations':'55% 44%',
 'business-operations':'78% 74%'
};
const pad=(n:number)=>String(n).padStart(2,'0');

/**
 * Embedded on /expertise: an editorial atlas of rows, each carrying its own
 * signature art. Home: a staggered poster rail, four of the eight disciplines.
 */
function VisualAtlas({locale,cta}:{locale:Locale;cta:string}){
 const names=dictionary[locale].roleNames,shorts=dictionary[locale].roleShort;
 return <div className="atlas-list">
  {roles.map((role,i)=><Reveal key={role.slug} delay={i*.03}>
   <Link href={`/${locale}/expertise/${role.slug}/`} className="atlas-row" style={{'--atlas-accent':roleAccent[role.slug]} as CSSProperties} aria-label={`${cta}: ${names[i]}`}>
    <span className="atlas-index" aria-hidden="true">{pad(i+1)}</span>
    <span className="atlas-copy"><strong>{names[i]}</strong><small>{shorts[i]}</small></span>
    <span className="atlas-art" aria-hidden="true"><Image src={`/assets/workflows/${role.slug}.webp`} alt="" fill sizes="(max-width:650px) 100px, (max-width:900px) 180px, 240px" style={{objectFit:'cover',objectPosition:crops[role.slug]}} unoptimized loading="lazy"/></span>
    <span className="atlas-arrow" aria-hidden="true">↗</span>
   </Link>
  </Reveal>)}
 </div>;
}

function PosterRail({locale,cta}:{locale:Locale;cta:string}){
 const names=dictionary[locale].roleNames,shorts=dictionary[locale].roleShort;
 const items=roles.map((role,index)=>({role,index})).filter(({role})=>featured.includes(role.slug));
 return <div className="poster-rail">
  {items.map(({role,index},i)=><MotionCard key={role.slug} index={i}>
   <Link href={`/${locale}/expertise/${role.slug}/`} className="poster-card" style={{'--poster-accent':roleAccent[role.slug]} as CSSProperties} aria-label={`${cta}: ${names[index]}`}>
    <span className="poster-media">
     <Image src={`/assets/workflows/${role.slug}.webp`} alt={`${names[index]} — ${cta}`} fill sizes="(max-width:600px) 74vw, (max-width:900px) 45vw, 300px" style={{objectFit:'cover',objectPosition:crops[role.slug]}} unoptimized loading="lazy"/>
     <span className="poster-index" aria-hidden="true">{pad(i+1)} / {pad(items.length)}</span>
     <span className="poster-shade" aria-hidden="true"/>
    </span>
    <span className="poster-body">
     <span className="poster-copy"><strong>{names[index]}</strong><small>{shorts[index]}</small></span>
     <span className="poster-arrow" aria-hidden="true">↗</span>
    </span>
   </Link>
  </MotionCard>)}
 </div>;
}

export function VisualHighlights({locale,embedded=false}:{locale:Locale;embedded?:boolean}){
 const t=visualCopy[locale];
 const content=<><Reveal className="section-heading"><span className="eyebrow">{embedded?t.eyebrow:t.featuredEyebrow}</span><h2 id="highlights-heading">{t.title}</h2><p>{t.sub}</p></Reveal>
  {embedded?<VisualAtlas locale={locale} cta={t.cta}/>:<PosterRail locale={locale} cta={t.cta}/>}
  {!embedded&&<div className="visual-all-link"><Link href={`/${locale}/expertise/`} className="text-link">{t.view} ↗</Link></div>}</>;
 return embedded?<section className="visual-highlights inline-highlights" aria-labelledby="highlights-heading">{content}</section>:<section className="visual-highlights section" aria-labelledby="highlights-heading"><div className="container">{content}</div></section>;
}
