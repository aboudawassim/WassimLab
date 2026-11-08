'use client';

import {motion,useScroll,useSpring,useReducedMotion} from 'motion/react';

/**
 * Scroll progress hairline pinned to the header's bottom edge.
 * Spring-smoothed like the MyFolio reference; snaps under reduced motion.
 */
export function ScrollProgress(){
 const {scrollYProgress}=useScroll();
 const reduce=useReducedMotion();
 const scaleX=useSpring(scrollYProgress,{
  stiffness:reduce?1000:150,
  damping:reduce?100:30,
  restDelta:0.001,
 });
 return <div className="nav-progress" aria-hidden="true">
  <motion.span style={{scaleX}}/>
 </div>;
}
