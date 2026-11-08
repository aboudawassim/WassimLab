'use client';
import {useState,useEffect,useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {Locale} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import {uiCopy} from '@/lib/ui-copy';
import {ScrollProgress} from '@/components/nav/ScrollProgress';
import {motion,AnimatePresence,useReducedMotion} from 'motion/react';
const routes=['','expertise','projects','experience','resumes','contact'];
const languages:{code:Locale;short:string;native:string;dir:'ltr'|'rtl';flag:string}[]=[
 {code:'en',short:'EN',native:'English',dir:'ltr',flag:'🇬🇧'},
 {code:'fr',short:'FR',native:'Français',dir:'ltr',flag:'🇫🇷'},
 {code:'ar',short:'AR',native:'العربية',dir:'rtl',flag:'🇹🇳'},
];
function LocaleMenu({locale,label,onSelect}:{locale:Locale;label:string;onSelect:(next:Locale)=>void}){
 const [open,setOpen]=useState(false),wrap=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),items=useRef<(HTMLButtonElement|null)[]>([]);
 const current=languages.find(l=>l.code===locale)??languages[0];
 useEffect(()=>{if(!open)return;function onPointer(e:PointerEvent){if(!wrap.current?.contains(e.target as Node))setOpen(false)}function onKey(e:KeyboardEvent){if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}}document.addEventListener('pointerdown',onPointer);document.addEventListener('keydown',onKey);const id=requestAnimationFrame(()=>items.current[languages.findIndex(l=>l.code===locale)]?.focus());return()=>{document.removeEventListener('pointerdown',onPointer);document.removeEventListener('keydown',onKey);cancelAnimationFrame(id)}},[open,locale]);
 function move(delta:number){const from=items.current.findIndex(el=>el===document.activeElement),next=(from+delta+languages.length)%languages.length;items.current[next]?.focus()}
 return <div className="locale-picker" ref={wrap}>
  <motion.button ref={trigger} type="button" dir="ltr" className={open?'locale-btn is-open':'locale-btn'} onClick={()=>setOpen(v=>!v)} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setOpen(true)}}} aria-label={`${label}: ${current.native}`} aria-haspopup="listbox" aria-expanded={open} whileHover={{y:-1}} whileTap={{scale:.97}} transition={{type:'spring',stiffness:500,damping:28}}>
   <span className="locale-flag" aria-hidden="true">{current.flag}</span>
   <span className="locale-code">{current.short}</span>
   <svg className="locale-chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
  </motion.button>
  <AnimatePresence>{open&&<motion.ul className="locale-menu" role="listbox" aria-label={label} dir="ltr" initial={{opacity:0,y:-6,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-6,scale:.97}} transition={{duration:.16,ease:'easeOut'}} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();move(1)}else if(e.key==='ArrowUp'){e.preventDefault();move(-1)}}}>
   {languages.map((l,i)=>{const active=l.code===locale;return <li key={l.code} role="none"><button ref={el=>{items.current[i]=el}} type="button" role="option" aria-selected={active} lang={l.code} dir="ltr" className={active?'locale-option is-active':'locale-option'} onClick={()=>{setOpen(false);if(!active)onSelect(l.code)}} tabIndex={-1}>
    <span className="locale-flag" aria-hidden="true">{l.flag}</span><span className="locale-option-name" dir={l.dir}>{l.native}</span><span className="locale-option-code">{l.short}</span>{active&&<svg className="locale-check" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="m5 12 5 5L20 6"/></svg>}
   </button></li>})}
  </motion.ul>}</AnimatePresence>
 </div>;
}
export function Header({locale}:{locale:Locale}){
 const [open,setOpen]=useState(false),[theme,setTheme]=useState('dark'),[scrolled,setScrolled]=useState(false);
 const [hover,setHover]=useState({x:0,width:0,visible:false});
 const path=usePathname(),t=dictionary[locale],u=uiCopy[locale];
 const reduceMotion=useReducedMotion();
 const headerRef=useRef<HTMLElement>(null),linksRef=useRef<HTMLUListElement>(null);
 const sheetRef=useRef<HTMLDivElement>(null),toggleRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{try{const stored=localStorage.getItem('wassim-theme');const v=stored==='light'||stored==='dark'?stored:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');setTheme(v);document.documentElement.dataset.theme=v}catch{}},[]);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>12);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 useEffect(()=>{setOpen(false)},[path]);
 useEffect(()=>{if(!open)return;const prev=document.body.style.overflow;document.body.style.overflow='hidden';const timer=window.setTimeout(()=>sheetRef.current?.querySelector<HTMLElement>('a,button')?.focus({preventScroll:true}),60);const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);toggleRef.current?.focus();return}if(e.key!=='Tab')return;const nodes=sheetRef.current?.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])');if(!nodes?.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}};const onResize=()=>{if(window.innerWidth>=850)setOpen(false)};document.addEventListener('keydown',onKey);window.addEventListener('resize',onResize);return()=>{document.body.style.overflow=prev;window.clearTimeout(timer);document.removeEventListener('keydown',onKey);window.removeEventListener('resize',onResize)}},[open]);
 function trackHover(el:HTMLElement){const list=linksRef.current;if(!list)return;const box=list.getBoundingClientRect(),item=el.getBoundingClientRect();setHover({x:item.left-box.left,width:item.width,visible:true})}
 function clearHover(){setHover(v=>v.visible?{...v,visible:false}:v)}
 function toggle(){const v=theme==='dark'?'light':'dark';setTheme(v);document.documentElement.dataset.theme=v;try{localStorage.setItem('wassim-theme',v)}catch{}}
 function languageHref(l:string){const seg=path.split('/').filter(Boolean);if(seg.length)seg[0]=l;else seg.push(l);return '/'+seg.join('/')+'/'}
 function isCurrent(r:string){return r?path.startsWith(`/${locale}/${r}/`):path===`/${locale}/`}
 function hrefFor(r:string){return '/'+locale+'/'+(r?r+'/':'')}
 return <><a className="skip" href="#main">{u.skip}</a>
 <header ref={headerRef} className={`header${scrolled?' is-scrolled':''}${open?' nav-open':''}`}>
  <div className="container header-inner">
   <Link className="brand" href={'/'+locale+'/'} aria-label={u.brand}>
    <span className="brand-logo" aria-hidden="true">W.</span>
    <span className="brand-text"><span className="brand-name">Wassim<b>Lab</b></span><small>{u.footer}</small></span>
   </Link>
   <nav className={open?'navigation open':'navigation'} id="primary-navigation" aria-label={u.navLabel}>
    <ul className="nav-links" ref={linksRef} onPointerLeave={clearHover}>
     <motion.span className="nav-hover-pill" aria-hidden="true" initial={false} animate={{x:hover.x,width:hover.width,opacity:hover.visible?1:0}} transition={reduceMotion?{duration:0}:{type:'spring',stiffness:380,damping:32,mass:.6}}/>
     {routes.map((r,i)=>{const current=isCurrent(r);return <li key={r||'home'}><Link onClick={()=>setOpen(false)} onPointerEnter={e=>trackHover(e.currentTarget)} onFocus={e=>trackHover(e.currentTarget)} onBlur={clearHover} className={current?'nav-link current':'nav-link'} aria-current={current?'page':undefined} href={hrefFor(r)}>{t.nav[i]}{current&&<motion.span className="nav-active-indicator" layoutId="nav-active-underline" transition={{type:'spring',stiffness:420,damping:34}}/>}</Link></li>})}
    </ul>
   </nav>
   <div className="nav-actions">
    <motion.button className="theme-btn" type="button" onClick={toggle} whileHover={{scale:1.1,rotate:11}} whileTap={{scale:.9,rotate:-7}} transition={{type:'spring',stiffness:500,damping:25}} title={u.theme} aria-label={u.theme}>{theme==='dark'?'☀':'☾'}</motion.button>
    <LocaleMenu locale={locale} label={u.language} onSelect={l=>{window.location.href=languageHref(l)}}/>
    <span className="nav-status" role="status"><span>{u.availability}</span><i className="nav-status-dot" aria-hidden="true"/></span>
    <motion.button ref={toggleRef} className="mobile-toggle" type="button" onClick={()=>setOpen(!open)} whileTap={{scale:.9,rotate:open?90:-90}} transition={{type:'spring',stiffness:460,damping:26}} aria-label={u.menu} aria-expanded={open} aria-controls="mobile-navigation">{open?'✕':'☰'}</motion.button>
   </div>
  </div>
  <ScrollProgress/>
 </header>
 <AnimatePresence>{open&&<motion.div id="mobile-navigation" ref={sheetRef} className="nav-sheet" role="dialog" aria-modal="true" aria-label={u.navLabel} initial={{opacity:0,y:-14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}} transition={{duration:.22,ease:'easeOut'}}>
  <div className="nav-sheet-links">{routes.map((r,i)=>{const current=isCurrent(r);return <Link key={r||'home'} href={hrefFor(r)} onClick={()=>setOpen(false)} className={current?'is-current':''} aria-current={current?'page':undefined}><span>{t.nav[i]}</span><small>{String(i+1).padStart(2,'0')}</small></Link>})}</div>
  <div className="nav-sheet-actions"><button type="button" className="nav-sheet-theme" onClick={toggle}>{theme==='dark'?'☀':'☾'} {u.theme}</button></div>
 </motion.div>}</AnimatePresence>
 </>;
}
export function Footer({locale}:{locale:Locale}){const t=dictionary[locale];return <footer className="footer"><div className="container footer-inner"><div><b>Wassim<span>Lab.</span></b><p>Mohamed Wassim Abouda · Doha, Qatar</p><small>{t.disclaimer}</small></div><div><a href="mailto:med.wassim.abouda@gmail.com">med.wassim.abouda@gmail.com</a><a href="tel:+97450706084">+974 5070 6084</a><a href="https://www.linkedin.com/in/abouda-mdwassim/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><Link href={'/'+locale+'/resumes/'}>{t.nav[4]} ↗</Link></div></div><p className="copyright">© {new Date().getFullYear()} WassimLab. {uiCopy[locale].footer}</p></footer>}
