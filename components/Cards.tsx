import Link from 'next/link';
import Image from 'next/image';
import type {Locale} from '@/lib/site';
import {roles,projects} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import {projectCopy,projectGroups} from '@/lib/projects';
import {RoleEmblem} from '@/components/icon-set';
import {RoleVisual} from '@/components/RoleVisual';
import {MotionCard} from '@/components/MotionKit';

export function RoleCards({locale}:{locale:Locale}){const t=dictionary[locale];return <div className="role-grid">{roles.map((r,i)=><MotionCard key={r.slug} index={i}><Link href={`/${locale}/expertise/${r.slug}/`} className="role-card"><div className="role-number">0{i+1} <span>{r.category}</span></div><div className={`role-image-band role-band-${r.slug}`}><RoleVisual slug={r.slug}/><span className="role-image-glow"/></div><div className="role-symbol"><RoleEmblem slug={r.slug} size={69}/></div><h3>{t.roleNames[i]}</h3><p>{t.roleShort[i]}</p><div className="role-more">{t.rolesBtn}<span>↗</span></div></Link></MotionCard>)}</div>}

type Project=typeof projects[number];
type Kind=keyof typeof projectGroups['en']['kind'];
const pad=(n:number)=>String(n).padStart(2,'0');

function ArrowIcon(){return <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>}
function GithubIcon(){return <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>}
function ProjectLinks({project,locale}:{project:Project;locale:Locale}){
 const t=dictionary[locale];
 return <div className="project-links">
  {project.url&&<a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${t.visit}: ${project.title}`}><span>{t.visit}</span><ArrowIcon/></a>}
  {project.github&&<a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${t.source}: ${project.title}`}><GithubIcon/><span>{t.source}</span></a>}
  {!project.url&&!project.github&&<span>{t.evidence}</span>}
 </div>;
}

/** Rich card for independently delivered products. */
function ProjectCard({project,index,locale,kindLabel}:{project:Project;index:number;locale:Locale;kindLabel:string}){
 const t=dictionary[locale],data=projectCopy[locale],g=projectGroups[locale],isPrivate=project.private===true;
 return <MotionCard index={index}>
  <article className={'project-card '+(!project.image?'text-project':'')}>
   <div className={isPrivate?'project-visual is-private':'project-visual'}>
    {project.image
     ?<Image src={project.image} alt={isPrivate?`${project.title} — ${g.privateAlt}`:project.title+' product screenshot'} fill sizes="(max-width:800px) 100vw, 50vw" draggable={false} style={{objectFit:'cover',objectPosition:'top'}}/>
     :<div className={`project-abstract project-art-${project.id}`}><span className="abstract-circle c1"/><span className="abstract-circle c2"/><span className="project-picto">{project.id==='mergers'?<RoleEmblem slug="project-coordination" size={103}/>:project.id==='prestige'?<RoleEmblem slug="fullstack" size={103}/>:<RoleEmblem slug="technical-analysis" size={103}/>}</span><span className="abstract-title">{project.id==='mergers'?'M&A':project.id==='prestige'?'PRESTIGE':'FIN'}</span></div>}
    {isPrivate&&<span className="project-private-badge">{g.privateLabel}</span>}
    <span className="project-index">{kindLabel} / {pad(index+1)}</span>
   </div>
   <div className="project-content">
    <div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    <h3>{project.title}</h3>
    <small>{data[project.id as keyof typeof data][0]}</small>
    <p>{data[project.id as keyof typeof data][1]}</p>
    <ProjectLinks project={project} locale={locale}/>
   </div>
  </article>
 </MotionCard>;
}

/** Compact ledger row for team, client and coordination contributions. */
function ProjectRow({project,index,locale,kindLabel,groupLabel}:{project:Project;index:number;locale:Locale;kindLabel:string;groupLabel:string}){
 const t=dictionary[locale],data=projectCopy[locale],g=projectGroups[locale],isPrivate=project.private===true;
 return <MotionCard index={index}>
  <article className="project-row">
   <div className={isPrivate?'project-row-media is-private':'project-row-media'}>
    {project.image
     ?<Image src={project.image} alt={isPrivate?`${project.title} — ${g.privateAlt}`:project.title+' product screenshot'} fill sizes="(max-width:650px) 100vw, 240px" draggable={false} style={{objectFit:'cover',objectPosition:'top'}}/>
     :<div className="project-row-abstract"><span>{project.id==='arsolab'?'ARS':project.id==='finance'?'FIN':'M&A'}</span></div>}
    {isPrivate&&<span className="project-private-badge">{g.privateLabel}</span>}
   </div>
   <div className="project-row-body">
    <div className="project-row-top">
     <div className="project-row-flags"><span className="project-row-index">{groupLabel} / {pad(index+1)}</span><span className="project-kind">{kindLabel}</span></div>
     <div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    </div>
    <h3>{project.title}</h3>
    <small>{data[project.id as keyof typeof data][0]}</small>
    <p>{data[project.id as keyof typeof data][1]}</p>
    <ProjectLinks project={project} locale={locale}/>
   </div>
  </article>
 </MotionCard>;
}

/**
 * Projects split by delivery model: products built end to end stay as large
 * image cards; team and client contributions read as a compact evidence ledger.
 */
export function ProjectCards({locale}:{locale:Locale}){
 const g=projectGroups[locale];
 const independent=projects.filter(project=>project.kind==='independent');
 const contributions=projects.filter(project=>project.kind!=='independent');
 const kind=(value:string)=>g.kind[value as Kind];
 return <>
  <section className="project-group" aria-label={g.independent.eyebrow}>
   <div className="project-group-head"><span className="eyebrow">{g.independent.eyebrow}</span><h3>{g.independent.title}</h3></div>
   <div className="project-grid project-grid-featured">
    {independent.map((project,index)=><ProjectCard key={project.id} project={project} index={index} locale={locale} kindLabel={kind(project.kind)}/>)}
   </div>
  </section>
  <section className="project-group" aria-label={g.contribution.eyebrow}>
   <div className="project-group-head"><span className="eyebrow">{g.contribution.eyebrow}</span><h3>{g.contribution.title}</h3></div>
   <div className="project-ledger">
    {contributions.map((project,index)=><ProjectRow key={project.id} project={project} index={index} locale={locale} kindLabel={kind(project.kind)} groupLabel={g.kind.contributor}/>)}
   </div>
  </section>
 </>;
}
