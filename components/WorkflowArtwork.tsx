'use client';

import {useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import Image from 'next/image';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import type {Locale,Slug} from '@/lib/site';

/**
 * The cinematic layer supplements the accessible, localized SVG/process diagrams.
 * Generated artwork is concept illustration, not evidence of real KPIs.
 * Keep interactive outputs grounded in the existing role content.
 */
const metadata:Record<Slug,{shape:string;imageHeight:number;accent:string}>={
 'project-coordination':{shape:'RADIAL DELIVERY HUB',imageHeight:870,accent:'#ad8cff'},
 'business-analysis':{shape:'TRACEABILITY PATH',imageHeight:1020,accent:'#ff7bb0'},
 'technical-analysis':{shape:'SYSTEM NETWORK',imageHeight:880,accent:'#69caff'},
 'qa-uat':{shape:'QUALITY CYCLE',imageHeight:890,accent:'#52e9b7'},
 'fullstack':{shape:'LAYERED ARCHITECTURE',imageHeight:885,accent:'#74b9ff'},
 'devsecops':{shape:'CONTINUOUS LOOP',imageHeight:885,accent:'#55dec8'},
 'it-operations':{shape:'INCIDENT RESPONSE',imageHeight:680,accent:'#78c5ff'},
 'business-operations':{shape:'OPERATIONS HUB',imageHeight:890,accent:'#ef9df9'},
};
const localizedShape:Record<Slug,Record<Locale,string>>={
 'project-coordination':{en:'RADIAL DELIVERY HUB',fr:'HUB RADIAL DE COORDINATION',ar:'شبكة تنسيق دائرية'},
 'business-analysis':{en:'TRACEABILITY PATH',fr:'CHAÎNE DE TRAÇABILITÉ',ar:'مسار تتبع المتطلبات'},
 'technical-analysis':{en:'SYSTEM NETWORK',fr:'RÉSEAU DE SYSTÈMES',ar:'شبكة الأنظمة'},
 'qa-uat':{en:'QUALITY CYCLE',fr:'CYCLE QUALITÉ',ar:'دورة ضمان الجودة'},
 'fullstack':{en:'LAYERED ARCHITECTURE',fr:'ARCHITECTURE EN COUCHES',ar:'معمارية متعددة الطبقات'},
 'devsecops':{en:'CONTINUOUS LOOP',fr:'BOUCLE CONTINUE',ar:'حلقة التسليم المستمر'},
 'it-operations':{en:'INCIDENT RESPONSE',fr:'GESTION DES INCIDENTS',ar:'استجابة حوادث الدعم'},
 'business-operations':{en:'OPERATIONS HUB',fr:'HUB DES OPÉRATIONS',ar:'مركز العمليات'}
};
const copy={
 en:{eyebrow:'VISUAL WORKFLOW • ILLUSTRATED GUIDE',visual:'Illustrated concept',schema:'Localized diagram',zoom:'Expand illustration',close:'Close full-screen illustration',choose:'Explore the steps',step:'Selected stage',output:'Example deliverable',stepOf:'of',caption:'Illustrative workflow, not a live dashboard or measured project results.',languageNote:'The illustration is in English. Use “Localized diagram” and the step explorer for this language.'},
 fr:{eyebrow:'PARCOURS VISUEL • GUIDE ILLUSTRÉ',visual:'Illustration 3D',schema:'Schéma traduit',zoom:'Agrandir l’illustration',close:'Fermer l’illustration',choose:'Explorer les étapes',step:'Étape sélectionnée',output:'Exemple de livrable',stepOf:'sur',caption:'Schéma conceptuel : pas de tableau de bord réel ni de résultats mesurés.',languageNote:'L’illustration est en anglais. Ouvrez le schéma traduit et le parcours interactif.'},
 ar:{eyebrow:'مسار بصري • دليل توضيحي',visual:'الرسم التوضيحي',schema:'المخطط المترجم',zoom:'تكبير الرسم',close:'إغلاق العرض الموسع',choose:'استكشف المراحل',step:'المرحلة المختارة',output:'مثال على المخرجات',stepOf:'من',caption:'رسم توضيحي مفاهيمي وليس لوحة بيانات حقيقية أو نتائج أداء فعلية.',languageNote:'النص داخل الصورة بالإنجليزية؛ اختر المخطط المترجم أو المراحل التفاعلية لعرض شرح بلغتك.'}
} satisfies Record<Locale,Record<string,string>>;

export function WorkflowArtwork({slug,locale,title,steps,outputs}:{slug:Slug;locale:Locale;title:string;steps:string[];outputs:string[]}){
 const [mode,setMode]=useState<'visual'|'schema'>('visual');
 const [selected,setSelected]=useState(0);
 const dialogRef=useRef<HTMLDialogElement>(null);
 const reduced=useReducedMotion();
 const t=copy[locale],m=metadata[slug];
 const img=mode==='visual'?`/assets/workflows/${slug}.webp`:`/assets/visuals/${slug}-${locale}.svg`;
 const height=mode==='visual'?m.imageHeight:605;
 const selectedOutput=outputs[selected]??outputs[selected%outputs.length]??'';
 return <section className={`cinematic-flow cinematic-${slug}`} style={{'--flow-accent':m.accent} as CSSProperties} aria-label={`${title} — ${t.eyebrow}`}>
   <div className="cinematic-toolbar">
     <div className="cinematic-ident"><span className="cinematic-beacon"/><span>{t.eyebrow}</span><strong>{localizedShape[slug][locale]}</strong></div>
     <div className="cinematic-switch" role="group" aria-label={t.eyebrow}>
       <button type="button" className={mode==='visual'?'selected':''} aria-pressed={mode==='visual'} onClick={()=>setMode('visual')}>{t.visual}</button>
       <button type="button" className={mode==='schema'?'selected':''} aria-pressed={mode==='schema'} onClick={()=>setMode('schema')}>{t.schema}</button>
     </div>
   </div>
   <div className={mode==='schema'?'cinematic-canvas in-schema':'cinematic-canvas'}>
     <AnimatePresence mode="wait" initial={false}>
       <motion.div key={mode} className="cinematic-image" initial={reduced?false:{opacity:0,scale:.965,filter:'blur(10px)'}} animate={{opacity:1,scale:1,filter:'blur(0px)'}} exit={reduced?undefined:{opacity:0,scale:1.025,filter:'blur(7px)'}} transition={{duration:reduced?0:.48,ease:[.22,1,.36,1]}}>
         <Image src={img} alt={`${title}: ${mode==='visual'?t.visual:t.schema}`} width={mode==='visual'?1448:1120} height={height} sizes="(max-width: 720px) 100vw, (max-width: 1250px) 92vw, 1180px" priority={false} unoptimized className="cinematic-art"/>
       </motion.div>
     </AnimatePresence>
     <div className="cinematic-corner" aria-hidden="true"><i/><i/><i/></div>
     <button type="button" className="cinematic-zoom" onClick={()=>dialogRef.current?.showModal()} aria-label={t.zoom}>⛶ <span>{t.zoom}</span></button>
   </div>
   <div className="cinematic-interaction">
     <div className="cinematic-steps-side"><div className="cinematic-miniheading"><span>{t.choose}</span><small>{String(selected+1).padStart(2,'0')} / {String(steps.length).padStart(2,'0')}</small></div>
       <div className="cinematic-steps" role="group" aria-label={t.choose}>
         {steps.map((step,i)=><motion.button key={`${i}-${step}`} type="button" className={`cinematic-step ${i===selected?'active':''}`} aria-pressed={i===selected} onClick={()=>setSelected(i)} whileHover={reduced?undefined:{y:-3,scale:1.02}} whileTap={reduced?undefined:{scale:.97}} transition={{type:'spring',stiffness:380,damping:25}}>
           <span className="cinematic-step-count">{String(i+1).padStart(2,'0')}</span><b>{step}</b><span className="cinematic-step-spark"/>
         </motion.button>)}
       </div>
     </div>
     <div className="cinematic-inspector" aria-live="polite" aria-atomic="true"><span className="cinematic-inspector-eyebrow">{t.step} · {String(selected+1).padStart(2,'0')}</span>
       <AnimatePresence mode="wait" initial={false}><motion.div key={selected} initial={reduced?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,y:-10}} transition={{duration:reduced?0:.24}}><h3>{steps[selected]}</h3><p><strong>{t.output}:</strong> {selectedOutput}</p></motion.div></AnimatePresence>
       <div className="cinematic-progress" aria-hidden="true"><motion.span initial={false} animate={{width:`${((selected+1)/steps.length)*100}%`}} transition={{duration:reduced?0:.34}}/></div>
     </div>
   </div>
   <div className="cinematic-disclaimer"><span>ⓘ {t.caption}</span>{locale!=='en'&&<span>{t.languageNote}</span>}</div>
   <dialog ref={dialogRef} className="cinematic-lightbox" onClick={event=>{if(event.target===event.currentTarget)dialogRef.current?.close()}} aria-label={title}>
     <div className="cinematic-lightbox-inner"><div className="cinematic-lightbox-header"><strong>{title}</strong><button type="button" onClick={()=>dialogRef.current?.close()} aria-label={t.close}>✕</button></div><Image src={img} alt={`${title} — ${mode==='visual'?t.visual:t.schema}`} width={mode==='visual'?1448:1120} height={height} unoptimized/><p>{t.caption}</p></div>
   </dialog>
 </section>
}
