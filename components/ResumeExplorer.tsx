'use client';
import {useState,useRef} from 'react';
import {resumeFiles} from '@/lib/site';
import cvManifest from '@/public/assets/cv/manifest.json';
import type {Locale} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import {uiCopy} from '@/lib/ui-copy';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
const cvDetailsByFilename=new Map(cvManifest.resumes.map(cv=>[cv.fileName,cv]));
const previewRevision='20261108';
function normalizeSearch(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();}
export function ResumeExplorer({locale}:{locale:Locale}){
 const [q,setQ]=useState(''),[filter,setFilter]=useState<'all'|'en'|'fr'>('all'),[selected,setSelected]=useState(0);
 const previewRef=useRef<HTMLElement>(null);
 const reduced=useReducedMotion(),t=dictionary[locale],u=uiCopy[locale];
 function selectCv(index:number){setSelected(index);const el=previewRef.current;if(!el)return;const box=el.getBoundingClientRect();if(box.top<0||box.bottom>window.innerHeight)el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});}
 const terms=normalizeSearch(q).trim().split(/\s+/).filter(Boolean);
 const queryMatches=resumeFiles.map((file,index)=>({file,index,title:u.cvTitles[index],details:cvDetailsByFilename.get(file[1])})).filter(({file,index,title,details})=>
  terms.every(term=>normalizeSearch([file[0],file[1],title,uiCopy.en.cvTitles[index],uiCopy.fr.cvTitles[index],uiCopy.ar.cvTitles[index],details?.title,details?.headline,details?.category,details?.summary,...(details?.tags??[])].filter(Boolean).join(' ')).includes(term)));
 const matches=queryMatches.filter(({file})=>filter==='all'||file[2]===filter);
 const filterCounts={all:queryMatches.length,en:queryMatches.filter(({file})=>file[2]==='en').length,fr:queryMatches.filter(({file})=>file[2]==='fr').length};
 const active=matches.find(item=>item.index===selected)??matches[0];
 const activeSrc=active?`/assets/cv/${active.file[1]}?preview=${previewRevision}`:'';
 return <div className="resume-panel">
   <div className="resume-toolbar">
     <label><span className="sr-only">{t.search}</span><input type="search" placeholder={t.search} value={q} onChange={e=>setQ(e.target.value)} aria-label={t.search} autoComplete="off"/></label>
     <div className="filter-group" role="group" aria-label={u.resumeFilterLabel}>{(['all','en','fr'] as const).map(f=><motion.button type="button" key={f} aria-pressed={filter===f} className={filter===f?'active':''} onClick={()=>setFilter(f)} whileHover={reduced?undefined:{scale:1.05,y:-2}} whileTap={reduced?undefined:{scale:.92}} transition={{type:'spring',stiffness:430,damping:26}}><span>{f==='all'?t.all:f.toUpperCase()}</span><small>{filterCounts[f]}</small></motion.button>)}</div>
     {(q||filter!=='all')&&<button type="button" className="resume-clear-filters" onClick={()=>{setQ('');setFilter('all')}}>{u.clearFilters}</button>}
   </div>
   <p className="resume-count" role="status" aria-live="polite">{matches.length} / {resumeFiles.length} {u.resumeCount}</p>
   {locale==='ar'&&<p className="resume-language-note">{u.noArabic}</p>}
   {matches.length===0&&<p className="resume-empty" role="status">{u.empty}</p>}
   <div className="resume-layout">
     <motion.div className="resume-grid" layout><AnimatePresence initial={false} mode="popLayout">{matches.map(({file,index,title},i)=>{const current=active?.index===index;return <motion.div key={file[1]} className="resume-motion-wrap" layout initial={reduced?false:{opacity:0,scale:.96,y:9}} animate={{opacity:1,scale:1,y:0}} exit={reduced?undefined:{opacity:0,scale:.94,y:-7}} whileHover={reduced?undefined:{scale:1.018,y:-4}} whileTap={reduced?undefined:{scale:.975}} transition={{type:'spring',stiffness:280,damping:25,delay:reduced?0:Math.min(i,6)*.025}}>
       <div className={current?'resume-row is-previewing':'resume-row'}>
         <button type="button" className="resume-select" aria-pressed={current} aria-controls="resume-preview" onClick={()=>selectCv(index)}>
           <span className="resume-icon" aria-hidden="true">▤</span>
           <span><strong>{title}</strong><small>{file[2].toUpperCase()} · {u.pdfLabel}</small></span>
         </button>
         <a href={'/assets/cv/'+file[1]} download={file[1]} className="resume-download" aria-label={`${u.download}: ${title} (${file[2].toUpperCase()} PDF)`}><span className="download-arrow" aria-hidden="true">↓</span></a>
       </div>
     </motion.div>})}</AnimatePresence></motion.div>
     <aside id="resume-preview" ref={previewRef} className="resume-preview" aria-live="polite">
       {active?<>
         <div className="resume-preview-head">
           <div><span className="eyebrow">{u.preview}</span><h3>{active.title}</h3><small>{active.file[2].toUpperCase()} · {u.pdfLabel}</small></div>
           <a className="resume-preview-open" href={activeSrc} target="_blank" rel="noopener noreferrer">{u.openPdf} ↗</a>
         </div>
         <div className="resume-preview-frame"><iframe key={active.file[1]} src={`${activeSrc}#view=FitH&toolbar=0&navpanes=0`} title={active.title} loading="eager"/></div>
         <a className="btn primary resume-preview-download" href={activeSrc} download={active.file[1]}>{u.download} ↓</a>
       </>:<p className="resume-preview-empty">{u.selectCv}</p>}
     </aside>
   </div>
 </div>;
}
