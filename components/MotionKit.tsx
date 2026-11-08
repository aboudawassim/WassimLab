'use client';

import {useCallback} from 'react';
import type {ReactNode, PointerEvent} from 'react';
import Image from 'next/image';
import type {Locale} from '@/lib/site';
import {usePathname} from 'next/navigation';
import {MotionConfig, motion, useMotionValue, useReducedMotion, useSpring} from 'motion/react';

/** Global Motion for React settings. The user's OS preference disables transform-based animation. */
export function MotionProvider({children}:{children:ReactNode}){
 return <MotionConfig reducedMotion="user" transition={{type:'spring',stiffness:260,damping:25}}>{children}</MotionConfig>;
}

/**
 * Route entrance animation. CSS only: an exit phase would delay the new page and
 * a stalled exit leaves the wrapper at opacity 0. The key restarts the keyframe
 * on navigation, so the new route is visible on its first paint.
 */
export function PageTransition({children}:{children:ReactNode}){
 const pathname=usePathname();
 return <div key={pathname} className="route-transition">{children}</div>;
}

/** In-view appearance with subtle spring settling, used on headings, sections and card rows. */
export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:16,scale:.99}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,amount:.1,margin:'0px 0px -20px 0px'}} transition={{duration:.36,delay:reduce?0:delay,ease:[.2,.8,.3,1]}}>{children}</motion.div>;
}

/** High-value interaction: entrance, hover elevation + slight 3D rotation, press compression. */
export function MotionCard({children,className='',index=0}:{children:ReactNode;className?:string;index?:number}){
 const reduce=useReducedMotion();
 return <motion.div className={'motion-card '+className} style={{transformStyle:'preserve-3d'}} initial={reduce?false:{opacity:0,y:27,scale:.96}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,amount:.12}} whileHover={reduce?undefined:{y:-8,scale:1.016,rotateX:1.2,rotateY:1.2}} whileTap={reduce?undefined:{scale:.975,y:-1,rotateX:0,rotateY:0}} transition={{type:'spring',stiffness:280,damping:23,delay:Math.min(index,8)*.045}}>{children}</motion.div>;
}

/** Wrap actual link/button elements; the click remains on the underlying native control. */
export function MotionAction({children,className=''}:{children:ReactNode;className?:string}){
 const reduce=useReducedMotion();
 return <motion.span className={'motion-action '+className} whileHover={reduce?undefined:{scale:1.045,y:-3}} whileTap={reduce?undefined:{scale:.935,y:0}} transition={{type:'spring',stiffness:430,damping:24}}>{children}</motion.span>;
}

/** Actual portfolio portrait with pointer-responsive tilt, slow orbital rotation and floating badges. */
const heroWords:Record<Locale,{labels:string[];footer:string;alt:string;name:string;scene:string}>={
 en:{labels:['◇ BUSINESS','⌘ ENGINEERING','✓ QUALITY','◈ DELIVERY','⌁ SYSTEMS'],footer:'DELIVERY THINKING',alt:'Professional portrait of Mohamed Wassim Abouda',name:'Mohamed Wassim Abouda',scene:'Professional portrait with connected business and engineering themes'},
 fr:{labels:['◇ MÉTIER','⌘ INGÉNIERIE','✓ QUALITÉ','◈ LIVRAISON','⌁ SYSTÈMES'],footer:'DE L’IDÉE À LA LIVRAISON',alt:'Portrait professionnel de Mohamed Wassim Abouda',name:'Mohamed Wassim Abouda',scene:'Portrait professionnel illustrant les liens entre métier et ingénierie'},
 ar:{labels:['◇ الأعمال','⌘ الهندسة','✓ الجودة','◈ التسليم','⌁ الأنظمة'],footer:'من الفكرة إلى التنفيذ',alt:'صورة مهنية لمحمد وسيم عبودة',name:'محمد وسيم عبودة',scene:'صورة مهنية توضح الترابط بين الأعمال والهندسة'}
};
export function HeroScene({locale}:{locale:Locale}){
 const reduce=useReducedMotion();
 const words=heroWords[locale];
 const rx=useSpring(useMotionValue(0),{stiffness:120,damping:21,mass:.6});
 const ry=useSpring(useMotionValue(0),{stiffness:120,damping:21,mass:.6});
 const onMove=useCallback((event:PointerEvent<HTMLDivElement>)=>{
  if(reduce||event.pointerType==='touch')return;
  const b=event.currentTarget.getBoundingClientRect();
  const x=(event.clientX-b.left)/b.width-.5,y=(event.clientY-b.top)/b.height-.5;
  rx.set(-y*8);ry.set(x*11);
 },[reduce,rx,ry]);
 const reset=useCallback(()=>{rx.set(0);ry.set(0)},[rx,ry]);
 return <div className="hero-graphic motion-scene" onPointerMove={onMove} onPointerLeave={reset} aria-label={words.scene}>
  <motion.span className="hero-orbit orbit-one" aria-hidden="true" animate={reduce?undefined:{rotate:360}} transition={{duration:65,repeat:Infinity,ease:'linear'}}/>
  <motion.span className="hero-orbit orbit-two" aria-hidden="true" animate={reduce?undefined:{rotate:-360}} transition={{duration:49,repeat:Infinity,ease:'linear'}}/>
  <motion.span className="hero-orbit orbit-three" aria-hidden="true" animate={reduce?undefined:{rotate:360}} transition={{duration:85,repeat:Infinity,ease:'linear'}}/>
  <motion.div className="hero-nameplate" initial={reduce?false:{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:.25,duration:.5,ease:'easeOut'}}><strong className="hero-nameplate-name">{words.name}</strong></motion.div>
  <motion.div className="hero-image" style={reduce?undefined:{rotateX:rx,rotateY:ry,transformPerspective:1000}} initial={reduce?false:{opacity:0,scale:.88,y:28}} animate={{opacity:1,scale:1,y:0}} whileHover={reduce?undefined:{scale:1.03}} transition={{type:'spring',stiffness:170,damping:22}}>
   <Image src="/assets/media/professional-portrait.webp" alt={words.alt} fill priority sizes="(max-width:900px) 70vw, 420px" style={{objectFit:'cover',objectPosition:'center top'}}/>
  </motion.div>
  {words.labels.map((label,i)=><motion.div className={'float-label fl'+(i+1)} key={label} initial={reduce?false:{opacity:0,y:20,scale:.9}} animate={reduce?{opacity:1}:{opacity:1,y:[0,-7,0],rotate:[0,2,-1,0]}} transition={reduce?{duration:.12}:{duration:6+i*1.5,repeat:Infinity,ease:'easeInOut',delay:i*.5}}>{label}</motion.div>)}
  <motion.div className="hero-image-footer" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6,duration:.5}}>{words.footer}</motion.div>
 </div>;
}
