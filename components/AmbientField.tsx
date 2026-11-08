'use client';

import {useEffect,useRef,useState} from 'react';
import dynamic from 'next/dynamic';
import {hasWebGL} from '@/lib/webgl';
import {WebGLBoundary} from '@/components/WebGLBoundary';

const AmbientStars=dynamic(()=>import('./ambient/AmbientStars'),{ssr:false});

/**
 * Site-wide ambient layer: a slow rotating point sphere behind every page and
 * a soft light that follows the pointer. Mounts after idle, pauses while the
 * tab is hidden, and falls back to CSS dots without WebGL or motion.
 */
export function AmbientField(){
 const root=useRef<HTMLDivElement>(null);
 const [mounted,setMounted]=useState(false);
 const [theme,setTheme]=useState<'dark'|'light'>('dark');
 const [visible,setVisible]=useState(true);

 useEffect(()=>{
  const read=()=>setTheme(document.documentElement.dataset.theme==='light'?'light':'dark');
  read();
  const observer=new MutationObserver(read);
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  return()=>observer.disconnect();
 },[]);

 useEffect(()=>{
  const onVisibility=()=>setVisible(document.visibilityState==='visible');
  onVisibility();
  document.addEventListener('visibilitychange',onVisibility);
  return()=>document.removeEventListener('visibilitychange',onVisibility);
 },[]);

 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!hasWebGL())return;
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;
  if(connection?.saveData)return;
  // The WebGL scene costs a heavy main-thread task on mount. Wait for real idle
  // or the first sign of intent, so it never competes with the first paint.
  let idleId=0,timerId=0,started=false;
  const detach=()=>{
   if(idleId&&typeof window.cancelIdleCallback==='function')window.cancelIdleCallback(idleId);
   if(timerId)window.clearTimeout(timerId);
   window.removeEventListener('pointermove',start);
   window.removeEventListener('pointerdown',start);
   window.removeEventListener('scroll',start);
   window.removeEventListener('keydown',start);
   window.removeEventListener('touchstart',start);
  };
  const start=()=>{
   if(started)return;
   started=true;
   detach();
   setMounted(true);
  };
  window.addEventListener('pointermove',start,{passive:true});
  window.addEventListener('pointerdown',start,{passive:true});
  window.addEventListener('scroll',start,{passive:true});
  window.addEventListener('keydown',start);
  window.addEventListener('touchstart',start,{passive:true});
  const armIdle=()=>{
   if(typeof window.requestIdleCallback==='function')idleId=window.requestIdleCallback(start,{timeout:2500});
   else timerId=window.setTimeout(start,2500);
  };
  // Give the page a quiet window first: paint, hydration and route entry win.
  timerId=window.setTimeout(armIdle,1800);
  return detach;
 },[]);

 useEffect(()=>{
  const node=root.current;
  if(!node)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  let frame=0;
  let x=window.innerWidth*.5,y=window.innerHeight*.34;
  const apply=()=>{
   frame=0;
   node.style.setProperty('--mx',`${x}px`);
   node.style.setProperty('--my',`${y}px`);
  };
  const move=(event:PointerEvent)=>{
   x=event.clientX;
   y=event.clientY;
   node.classList.add('is-live');
   if(!frame)frame=window.requestAnimationFrame(apply);
  };
  const leave=()=>node.classList.remove('is-live');
  node.style.setProperty('--mx',`${x}px`);
  node.style.setProperty('--my',`${y}px`);
  window.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('pointerleave',leave);
  return()=>{
   window.removeEventListener('pointermove',move);
   document.removeEventListener('pointerleave',leave);
   window.cancelAnimationFrame(frame);
  };
 },[]);

 return <div className="ambient-layer" ref={root} aria-hidden="true">
  <span className="ambient-dots"/>
  <span className="ambient-glow"/>
  {mounted&&<WebGLBoundary><div className="ambient-canvas"><AmbientStars theme={theme} active={visible}/></div></WebGLBoundary>}
 </div>;
}
