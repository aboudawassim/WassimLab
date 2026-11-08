'use client';

import {useId, useMemo, useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import type {KeyboardEvent, ReactNode} from 'react';
import type {Locale, Slug} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import rawGraphSpecs from '@/lib/diagram-specs.json';
import {Glyph,ColorIcon,iconColors,type IconName} from '@/components/icon-set';
export type {IconName};

type NodeType = 'hub'|'actor'|'artifact'|'stage'|'system'|'gate';
type NodeData = {key:string;icon:IconName;x:number;y:number;type:NodeType;label:[string,string,string];note:[string,string,string]};
type GraphData = {kind:string;accent:string;title:[string,string,string];nodes:NodeData[];edges:[string,string][]};
const graphSpecs = rawGraphSpecs as unknown as Record<Slug, GraphData>;
const typeLabels:Record<Locale,Record<NodeType,string>>={
 en:{hub:'Hub',actor:'Actor',artifact:'Artifact',stage:'Stage',system:'System',gate:'Gate'},
 fr:{hub:'Hub',actor:'Acteur',artifact:'Livrable',stage:'Étape',system:'Système',gate:'Contrôle'},
 ar:{hub:'مركز',actor:'فاعل',artifact:'مخرج',stage:'مرحلة',system:'نظام',gate:'بوابة'}
};
const kindLabels:Record<Locale,Record<string,string>>={
 en:{hub:'HUB',flow:'FLOW',system:'SYSTEM',cycle:'CYCLE',layers:'LAYERS'},
 fr:{hub:'HUB',flow:'FLUX',system:'SYSTÈME',cycle:'CYCLE',layers:'COUCHES'},
 ar:{hub:'مركز',flow:'تدفق',system:'نظام',cycle:'دورة',layers:'طبقات'}
};
const shortLabels:Record<Locale,{selected:string;select:string;next:string;connection:string;output:string;insight:string;diagram:string;flow:string;concept:string;stage:string;active:string;specimen:string;preview:string}> = {
 en:{selected:'Selected stage',select:'Select any node to explore',next:'Next handoff',connection:'Connected workflow',output:'Typical deliverable',insight:'How it works',diagram:'Interactive system map',flow:'Directional flow',concept:'Conceptual illustration, not a confidential production system',stage:'Stage',active:'Active',specimen:'Document anatomy',preview:'How this artifact connects to delivery'},
 fr:{selected:'Étape sélectionnée',select:'Choisissez un nœud pour explorer',next:'Prochaine étape',connection:'Processus connecté',output:'Livrable typique',insight:'Comment cela fonctionne',diagram:'Cartographie interactive',flow:'Flux directionnel',concept:'Schéma explicatif, pas un système de production confidentiel',stage:'Étape',active:'Actif',specimen:'Structure documentaire',preview:'Lien entre le document et la livraison'},
 ar:{selected:'المرحلة المختارة',select:'اختر عقدة لاستكشافها',next:'المرحلة التالية',connection:'تدفق مترابط',output:'مخرج نموذجي',insight:'كيف تعمل العملية',diagram:'خريطة نظام تفاعلية',flow:'تدفق باتجاه محدد',concept:'مخطط توضيحي وليس بنية إنتاجية سرية',stage:'المرحلة',active:'نشط',specimen:'هيكل الوثيقة',preview:'كيف ترتبط هذه الوثيقة بالتنفيذ'}
};

function enterToActivate(event:KeyboardEvent<SVGGElement>,action:()=>void){if(event.key==='Enter'||event.key===' '){event.preventDefault();action();}}
function edgeGeometry(from:{x:number;y:number},to:{x:number;y:number}){
 const dx=to.x-from.x,dy=to.y-from.y,dist=Math.max(Math.hypot(dx,dy),1),nx=dx/dist,ny=dy/dist;
 const sx=from.x+nx*82,sy=from.y+ny*56,ex=to.x-nx*82,ey=to.y-ny*56;
 const curve=Math.abs(dy)>100?((dx>=0?1:-1)*Math.min(36,Math.abs(dx)*.1)):0;
 return `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${((sx+ex)/2+curve).toFixed(1)} ${((sy+ey)/2-curve).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

function DiagramSurface({children,id,viewBox='0 0 1120 605',label='Interactive process diagram'}:{children:ReactNode;id:string;viewBox?:string;label?:string}){
 return <svg className="premium-svg" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} role="group" aria-label={label} preserveAspectRatio="xMidYMid meet">
  <defs>
   <pattern id={`${id}-grid`} width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="currentColor" strokeOpacity=".07" strokeWidth="1"/></pattern>
   <linearGradient id={`${id}-wire`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#8980ff"/><stop offset=".52" stopColor="#59d4ff"/><stop offset="1" stopColor="#57e2c3"/></linearGradient>
   <linearGradient id={`${id}-face`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#25335f"/><stop offset="1" stopColor="#151d39"/></linearGradient>
   {Object.entries(iconColors).map(([key,[start,end]])=><linearGradient key={key} id={`${id}-icon-${key}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={start}/><stop offset="1" stopColor={end}/></linearGradient>)}
   <radialGradient id={`${id}-halo`}><stop stopColor="#7777fa" stopOpacity=".22"/><stop offset="1" stopColor="#7777fa" stopOpacity="0"/></radialGradient>
   <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3 0 6" fill="none" stroke="#70d8fc" strokeWidth="1.3"/></marker>
   <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>
  <rect width="1120" height="605" fill={`url(#${id}-grid)`}/>
  <ellipse cx="560" cy="290" rx="430" ry="265" fill={`url(#${id}-halo)`}/>
  {children}
 </svg>;
}

function StaticBadge({value,locale}:{value:string;locale:Locale}){return <span className="diagram-live"><span className="diagram-live-dot" aria-hidden="true"/>{value} · {locale==='ar'?'تفاعلي':locale==='fr'?'INTERACTIF':'INTERACTIVE'}</span>;}

export function ArchitectureDiagram({slug,locale,heading}:{slug:Slug;locale:Locale;heading?:string}){
 const graph=graphSpecs[slug],l=shortLabels[locale],iTitle={en:0,fr:1,ar:2}[locale];
 const [selected,setSelected]=useState(0),id=useId().replace(/:/g,'');
 const reduce=useReducedMotion();
 const nodes=useMemo(()=>graph.nodes.map(n=>({key:n.key,icon:n.icon,x:n.x,y:n.y,type:n.type,label:n.label[iTitle],note:n.note[iTitle]})),[graph,iTitle]);
 const byKey=Object.fromEntries(nodes.map(n=>[n.key,n]));
 const active=nodes[selected];
 const linked=graph.edges.filter(([a,b])=>a===active.key||b===active.key).map(([a,b])=>a===active.key?b:a);
 return <section className="diagram-platform" aria-label={`${l.diagram}: ${graph.title[iTitle]}`}>
  <div className="diagram-head"><div><span className="eyebrow">{graph.title[iTitle]}</span><h3>{heading??l.diagram}</h3><p>{l.select}. {l.concept}.</p></div><StaticBadge value={kindLabels[locale][graph.kind]??graph.kind.toUpperCase()} locale={locale}/></div>
  <div className="diagram-viewport" tabIndex={0} aria-label={locale==='ar'?'مرّر أفقيًا لاستكشاف المخطط':locale==='fr'?'Défiler horizontalement pour parcourir le schéma':'Scroll horizontally to explore diagram'}>
   <DiagramSurface id={id} label={l.diagram}>
    <g className="diagram-ornaments" aria-hidden="true"><circle cx="560" cy="297" r="231" fill="none" stroke="#7471dc" strokeOpacity=".11" strokeDasharray="9 12"/><circle cx="560" cy="297" r="284" fill="none" stroke="#7471dc" strokeOpacity=".07"/></g>
    {graph.edges.map(([a,b],i)=>{const from=byKey[a],to=byKey[b],path=edgeGeometry(from,to),activeLine=a===active.key||b===active.key;return <g key={`${a}-${b}`} className={activeLine?'diagram-connection selected':'diagram-connection'}>
       <path d={path} className="diagram-connection-halo" stroke={`url(#${id}-wire)`} filter={`url(#${id}-glow)`}/>
       <path d={path} className="diagram-connection-line" stroke={`url(#${id}-wire)`} markerEnd={`url(#${id}-arrow)`}/>
       <motion.path d={path} className="diagram-motion-trace" stroke={`url(#${id}-wire)`} initial={reduce?false:{pathLength:0,opacity:0}} whileInView={{pathLength:1}} viewport={{once:true,amount:.2}} animate={{opacity:activeLine?.72:.18,strokeWidth:activeLine?3:1.5}} transition={{pathLength:{duration:1.05,delay:i*.08,ease:'easeInOut'},opacity:{duration:.3},strokeWidth:{duration:.3}}}/>
       <circle className="diagram-particle" r="4" fill="#9eeaff"><animateMotion path={path} dur={`${3+(i%4)*.45}s`} repeatCount="indefinite" begin={`${i*.3}s`}/></circle>
      </g>})}
    {nodes.map((node,i)=>{const activeNode=i===selected,near=linked.includes(node.key);return <motion.g key={node.key} style={{transformBox:'fill-box',transformOrigin:'center'}} animate={reduce?{opacity:1}:{scale:activeNode?1.055:1,opacity:near||activeNode?1:.93}} whileHover={reduce?undefined:{scale:1.09,rotate:activeNode?1.4:-1.3}} whileTap={reduce?undefined:{scale:.94,rotate:0}} transition={{type:'spring',stiffness:350,damping:26}} role="button" tabIndex={0} aria-label={`${l.stage} ${i+1}: ${node.label}`} aria-pressed={activeNode} onClick={()=>setSelected(i)} onKeyDown={e=>enterToActivate(e,()=>setSelected(i))} className={'diagram-node'+(activeNode?' is-active':near?' is-neighbor':'')}>
      <title>{node.label}</title><rect x={node.x-81} y={node.y-59} width="162" height="118" rx="20" className="diagram-node-back"/><rect x={node.x-77} y={node.y-62} width="154" height="114" rx="17" className="diagram-node-front"/>
      <rect x={node.x-54} y={node.y-54} width="108" height="3" rx="2" fill={iconColors[node.icon][0]} opacity=".75"/>
      <circle cx={node.x} cy={node.y-24} r="25" fill={`url(#${id}-icon-${node.icon})`} opacity=".20"/>
      <circle cx={node.x} cy={node.y-24} r="21" fill={`url(#${id}-icon-${node.icon})`} stroke={iconColors[node.icon][0]} strokeWidth="1.5"/>
      <g style={{color:'#fff'}}><Glyph name={node.icon} x={node.x} y={node.y-24} size={23}/></g>
      <foreignObject x={node.x-70} y={node.y+5} width="140" height="38"><div dir={locale==='ar'?'rtl':'ltr'} className="diagram-node-title">{node.label}</div></foreignObject>
      <circle cx={node.x+66} cy={node.y-48} r="4" fill={activeNode?'#5fe3d4':'#747cba'}/>
     </motion.g>})}
   </DiagramSurface>
  </div>
  <div className="diagram-inspector" aria-live="polite" aria-label={`${l.insight}: ${active.label}`}><div className="diagram-inspector-symbol"><ColorIcon name={active.icon} size={54}/></div><AnimatePresence mode="wait" initial={false}><motion.div key={active.key} className="diagram-inspector-copy" initial={reduce?false:{opacity:0,x:locale==='ar'?12:-12,scale:.98}} animate={{opacity:1,x:0,scale:1}} exit={reduce?{opacity:0}:{opacity:0,x:locale==='ar'?-9:9,scale:.985}} transition={{duration:reduce ? .1 : .24,ease:'easeOut'}}><span className="eyebrow">{l.selected} / {String(selected+1).padStart(2,'0')}</span><h4>{active.label}<span className="diagram-inspector-type">{typeLabels[locale][active.type]}</span></h4><p>{active.note}</p></motion.div></AnimatePresence><div className="diagram-inspector-next"><span>{l.connection}</span><strong>{linked.map(key=>byKey[key]?.label).filter(Boolean).join(' · ')||'—'}</strong></div></div>
 </section>;
}

const stepIcons:IconName[]=['target','file','calendar','layers','code','shield','rocket','repeat'];
export function PathDiagram({steps,caption,details,locale='en'}:{steps:readonly string[];caption?:string;details?:readonly string[];locale?:Locale}){
 const [selected,setSelected]=useState(0),id=useId().replace(/:/g,''),l=shortLabels[locale],count=steps.length;
 const reduce=useReducedMotion();
 const nodes=steps.map((text,i)=>({text,i,x:90+(count>1?i*940/(count-1):0),y: i%2===0?190:300}));
 return <section className="diagram-platform pipeline" aria-label={caption||l.connection}><div className="diagram-head"><div><span className="eyebrow">{caption||l.connection}</span><h3>{l.flow}</h3><p>{l.select}</p></div><StaticBadge value={`${count} ${l.stage.toUpperCase()}`} locale={locale}/></div>
  <div className="diagram-viewport" tabIndex={0}><DiagramSurface id={id} viewBox="0 0 1120 500" label={l.flow}>
    {nodes.slice(0,-1).map((node,i)=>{const next=nodes[i+1],path=`M ${node.x+58} ${node.y} C ${(node.x+next.x)/2} ${node.y}, ${(node.x+next.x)/2} ${next.y}, ${next.x-58} ${next.y}`;return <g className={selected===i||selected===i+1?'diagram-connection selected':'diagram-connection'} key={i}>
      <path d={path} className="diagram-connection-halo" stroke={`url(#${id}-wire)`} filter={`url(#${id}-glow)`}/><path d={path} className="diagram-connection-line" stroke={`url(#${id}-wire)`} markerEnd={`url(#${id}-arrow)`}/><motion.path d={path} className="diagram-motion-trace" stroke={`url(#${id}-wire)`} initial={reduce?false:{pathLength:0,opacity:0}} whileInView={{pathLength:1}} viewport={{once:true}} animate={{opacity:(selected===i||selected===i+1) ? .75 : .15}} transition={{pathLength:{duration:.7,delay:i*.12},opacity:{duration:.25}}}/><circle r="4" className="diagram-particle" fill="#98eaff"><animateMotion path={path} dur={`${2.8+i*.15}s`} repeatCount="indefinite" begin={`${i*.25}s`}/></circle>
     </g>})}
    {nodes.map(({text,i,x,y})=><motion.g key={i} className={'diagram-node'+(selected===i?' is-active':'')} style={{transformBox:'fill-box',transformOrigin:'center'}} animate={reduce?undefined:{scale:selected===i?1.07:1}} whileHover={reduce?undefined:{scale:1.1,rotate:selected===i?1.4:-1.2}} whileTap={reduce?undefined:{scale:.94,rotate:0}} transition={{type:'spring',stiffness:380,damping:27}} role="button" tabIndex={0} aria-pressed={selected===i} aria-label={`${l.stage} ${i+1}: ${text}`} onClick={()=>setSelected(i)} onKeyDown={event=>enterToActivate(event,()=>setSelected(i))}>
      <rect x={x-63} y={y-75} width="126" height="144" rx="18" className="diagram-node-back"/><rect x={x-60} y={y-80} width="120" height="140" rx="17" className="diagram-node-front"/><circle cx={x} cy={y-43} r="26" fill={`url(#${id}-icon-${stepIcons[i%stepIcons.length]})`} opacity=".22"/><circle cx={x} cy={y-43} r="23" fill={`url(#${id}-icon-${stepIcons[i%stepIcons.length]})`} stroke={iconColors[stepIcons[i%stepIcons.length]][0]} strokeWidth="1.4"/><g style={{color:'#fff'}}><Glyph name={stepIcons[i%stepIcons.length]} x={x} y={y-43} size={24}/></g>
      <foreignObject x={x-57} y={y-7} width="114" height="55"><div dir={locale==='ar'?'rtl':'ltr'} className="diagram-node-title">{text}</div></foreignObject>
      <text x={x} y={y+58} textAnchor="middle" className="diagram-node-index">{String(i+1).padStart(2,'0')}</text>
    </motion.g>)}
   </DiagramSurface></div>
  <div className="diagram-inspector" aria-live="polite"><div className="diagram-inspector-symbol"><ColorIcon name={stepIcons[selected%stepIcons.length]} size={54}/></div><AnimatePresence mode="wait" initial={false}><motion.div key={`${locale}-${selected}`} className="diagram-inspector-copy" initial={reduce?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={reduce?{opacity:0}:{opacity:0,y:-9}} transition={{duration:reduce ? .1 : .22}}><span className="eyebrow">{l.selected} / {String(selected+1).padStart(2,'0')}</span><h4>{steps[selected]}</h4><p>{details?.[selected] || (locale==='fr'?'Cette étape prépare les informations nécessaires au prochain transfert.':locale==='ar'?'تُعد هذه المرحلة المعلومات اللازمة للانتقال إلى الخطوة التالية.':'This stage prepares the evidence and information needed for the next handoff.')}</p></motion.div></AnimatePresence><div className="diagram-inspector-next"><span>{l.next}</span><strong>{steps[(selected+1)%count]}</strong><small>{selected===count-1?(locale==='en'?'Continuous feedback loop':locale==='fr'?'Boucle d’amélioration continue':'دورة التحسين المستمر'):l.connection}</small></div></div>
 </section>;
}

export function ProcessExplorer({locale,compact=false}:{locale:Locale;compact?:boolean}){
 const t=dictionary[locale];
 return <div className={compact?'process-explorer premium-process compact':'process-explorer premium-process'}><PathDiagram steps={t.steps} details={t.stepDesc} caption={t.workflow} locale={locale}/></div>;
}

export function ArtefactExplorer({locale}:{locale:Locale}){
 const [active,setActive]=useState(0),id=useId().replace(/:/g,'');
 const reduce=useReducedMotion();
 const datasets:{[key in Locale]:[string,string,string,string[]][]}={
  en:[['BRD','Why do we need it?','Business goals, scope, stakeholders, constraints',['Objective','Business scope','Stakeholders','Success criteria']],['FRD','What should the application do?','Features, screens, rules and validation',['User journey','Business rules','Form validations','Expected behavior']],['SRS','How must the system behave?','Interfaces, reliability, security and system rules',['Interfaces','Performance','Security','Constraints']],['User Story','What does the user need?','As a user, I want…, so that… + acceptance criteria',['Persona','User goal','Business value','Acceptance criteria']],['BPMN / UML','How do participants and systems interact?','Processes, roles, interactions and data relationships',['Actors','Decisions','Message flow','Data entities']]],
  fr:[['BRD','Pourquoi ce projet ?','Objectifs, périmètre, acteurs et contraintes',['Objectifs','Périmètre métier','Parties prenantes','Critères de succès']],['FRD','Que doit faire la fonction ?','Écrans, règles, validations et parcours',['Parcours utilisateur','Règles métier','Validations','Comportement attendu']],['SRS','Quel comportement système ?','Interfaces, fiabilité, sécurité et contraintes',['Interfaces','Performance','Sécurité','Contraintes']],['User Story','Quel besoin utilisateur ?','En tant que…, je veux…, afin de…',['Profil','Objectif','Valeur métier','Critères d’acceptation']],['BPMN / UML','Comment fonctionnent les interactions ?','Processus, acteurs, échanges et données',['Acteurs','Décisions','Messages','Entités de données']]],
  ar:[['BRD','لماذا نحتاج المشروع؟','الأهداف والنطاق والأطراف والقيود',['الهدف','نطاق العمل','أصحاب المصلحة','معايير النجاح']],['FRD','ماذا يجب أن تفعل الميزة؟','الشاشات والقواعد والتحقق والتدفقات',['رحلة المستخدم','قواعد العمل','التحقق من الإدخال','السلوك المتوقع']],['SRS','كيف يجب أن يعمل النظام؟','الواجهات والأمان والاعتمادية والقيود',['الواجهات','الأداء','الأمان','القيود']],['User Story','ماذا يحتاج المستخدم؟','بصفتي مستخدمًا أريد... حتى... ومعايير القبول',['شخصية المستخدم','الهدف','القيمة','معايير القبول']],['BPMN / UML','كيف تسير العملية؟','العمليات والأطراف والتفاعلات والبيانات',['المشاركون','القرارات','تدفق الرسائل','كيانات البيانات']]]
 };
 const rows=datasets[locale],entry=rows[active],l=shortLabels[locale];
 return <section className="artifact-explorer premium-artifacts"><div className="artifact-tabs" role="tablist" aria-label={l.specimen}>{rows.map((r,i)=><motion.button key={i} role="tab" aria-selected={i===active} className={i===active?'selected':''} onClick={()=>setActive(i)} whileHover={reduce?undefined:{scale:1.055,y:-2}} whileTap={reduce?undefined:{scale:.93}} transition={{type:'spring',stiffness:420,damping:26}}>{i===active&&<motion.span className="artifact-tab-active" layoutId="active-artifact-pill" transition={{type:'spring',stiffness:400,damping:31}}/>}<span className="artifact-tab-text">{r[0]}</span></motion.button>)}</div>
 <div className="artifact-viz-layout"><div className="artifact-diagram-window"><div className="diagram-window-heading"><span>{l.specimen}</span><span>0{active+1} / 05</span></div><AnimatePresence mode="wait" initial={false}><motion.div className="artifact-document" key={`${locale}-${active}`} initial={reduce?false:{opacity:0,y:22,scale:.92,rotateY:-9}} animate={{opacity:1,y:0,scale:1,rotateY:0}} exit={reduce?{opacity:0}:{opacity:0,y:-12,scale:.94,rotateY:8}} transition={{type:'spring',stiffness:280,damping:28}}><span className="artifact-doc-icon"><ColorIcon name={active===4?'network':active===3?'users':'file'} size={44}/></span><strong>{entry[0]}</strong><span className="artifact-doc-title">{l.preview}</span><div className="artifact-doc-fields" dir={locale==='ar'?'rtl':'ltr'}>{entry[3].map((item,i)=><div key={item}><span>0{i+1}</span>{item}<em/></div>)}</div></motion.div></AnimatePresence><div className="artifact-connector-caption"><span>●</span> {l.connection}</div></div><AnimatePresence mode="wait" initial={false}><motion.div key={`${locale}-${active}-copy`} className="artifact-panel-copy" initial={reduce?false:{opacity:0,x:locale==='ar'?-14:14}} animate={{opacity:1,x:0}} exit={reduce?{opacity:0}:{opacity:0,x:locale==='ar'?10:-10}} transition={{duration:reduce ? .1 : .26}}><span className="eyebrow">{dictionary[locale].explanation}</span><h3>{entry[1]}</h3><p>{entry[2]}</p><div className="artifact-output-tag"><ColorIcon name="shield" size={28}/><span>{l.output}: {entry[3].join(' · ')}</span></div></motion.div></AnimatePresence></div>
 </section>;
}

