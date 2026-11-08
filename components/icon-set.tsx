import type {ReactNode} from 'react';
import type {Slug} from '@/lib/site';

export type IconName = 'target'|'users'|'calendar'|'layers'|'shield'|'rocket'|'alert'|'network'|'file'|'list'|'repeat'|'monitor'|'code'|'database'|'lock'|'activity'|'play'|'cloud';
/** Semantic icon colors used consistently in diagrams, cards and project illustrations. */
export const iconColors:Record<IconName,[string,string]>={
 target:['#ff629f','#f43578'],users:['#a389ff','#6b55ee'],calendar:['#ffbf63','#f88b36'],
 layers:['#b781ff','#7648ef'],shield:['#57e6b9','#0cae92'],rocket:['#ff9b79','#fb5b82'],
 alert:['#ffc36a','#fa7848'],network:['#6db9ff','#3478f7'],file:['#6cd5ff','#248de4'],
 list:['#af87ff','#784cef'],repeat:['#67e6ce','#1cbba8'],monitor:['#65dcf8','#3187ef'],
 code:['#61c5ff','#3b6df2'],database:['#ae90ff','#6759dc'],lock:['#ff83a1','#ed567e'],
 activity:['#9ce78f','#43b87e'],play:['#ffbb70','#ee8f47'],cloud:['#85e2ff','#2e99db']
};
const rolePalette:Record<Slug,[string,string]>={
 'project-coordination':['#8b7cff','#c07af8'],'business-analysis':['#ff6d9b','#ff9d73'],
 'technical-analysis':['#64bdff','#5276ef'],'qa-uat':['#44dcc1','#37ad9c'],
 'fullstack':['#9278ff','#53baff'],'devsecops':['#5fc7ff','#5ae1c1'],
 'it-operations':['#72c4ff','#438ae9'],'business-operations':['#b986ff','#f278d9']
};

/** Original, dependency-free, outline icon set for all diagrams. Every glyph shares one stroke language. */
export function Glyph({name,x=0,y=0,size=28}:{name:IconName;x?:number;y?:number;size?:number}){
 const line={stroke:'currentColor',strokeWidth:1.8,fill:'none',strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
 const shapes:Record<IconName, ReactNode>={
  target:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></>,
  users:<><circle cx="9" cy="8" r="3"/><path d="M3 20v-2c0-3 2.5-5 6-5s6 2 6 5v2"/><circle cx="18" cy="9" r="2"/><path d="M17 14c3 0 4 2 4 4v2"/></>,
  calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15h3m4 0h2"/></>,
  layers:<><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></>,
  shield:<><path d="m12 2 9 4v5c0 5-3.2 9-9 11-5.8-2-9-6-9-11V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
  rocket:<><path d="M6 15c0-7 5-12 13-12 0 8-5 13-12 13l-3 4 1-5H6Z"/><circle cx="14" cy="9" r="2"/><path d="m7 16-3 3m-1-8 4 0m5 9v-4"/></>,
  alert:<><path d="M12 3 2 20h20L12 3Z"/><path d="M12 9v5m0 3v.5"/></>,
  network:<><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/></>,
  file:<><path d="M6 2h8l5 5v15H6V2Z"/><path d="M14 2v6h5M9 12h7m-7 4h7"/></>,
  list:<><path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1"/></>,
  repeat:<><path d="M4 9a8 8 0 0 1 14-3l2 2m0-5v5h-5M20 15a8 8 0 0 1-14 3l-2-2m0 5v-5h5"/></>,
  monitor:<><rect x="2" y="3" width="20" height="15" rx="2"/><path d="M7 22h10M12 18v4M2 13h20"/></>,
  code:<><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></>,
  database:<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 2 4 3 9 3s9-1 9-3V5M3 12c0 2 4 3 9 3s9-1 9-3"/></>,
  lock:<><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3M12 14v4"/></>,
  activity:<><path d="M2 12h4l3-7 5 14 3-7h5"/></>,
  play:<><circle cx="12" cy="12" r="10"/><path d="m9 7 8 5-8 5V7Z"/></>,
  cloud:<><path d="M5 18h14a4 4 0 0 0 1-8 7 7 0 0 0-13-1 5 5 0 0 0-2 9Z"/></>
 };
 return <g transform={`translate(${x-size/2} ${y-size/2}) scale(${size/24})`} {...line}>{shapes[name]}</g>;
}

const roleGlyphs:Record<Slug,IconName>={'project-coordination':'network','business-analysis':'target','technical-analysis':'activity','qa-uat':'shield','fullstack':'code','devsecops':'layers','it-operations':'monitor','business-operations':'users'};

/** A self-contained isometric-style SVG icon with real role colors and original geometry. */
export function ColorIcon({name,size=64}:{name:IconName;size?:number}){
  const [a,b]=iconColors[name];
 const uid=name;
 return <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true" className="color-icon">
  <defs><linearGradient id={`color-icon-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={a}/><stop offset="1" stopColor={b}/></linearGradient><linearGradient id={`icon-halo-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={a} stopOpacity=".38"/><stop offset="1" stopColor={b} stopOpacity=".04"/></linearGradient></defs>
  <circle cx="40" cy="41" r="38" fill={`url(#icon-halo-${uid})`}/><path d="M12 31Q12 19 24 19H57Q68 19 68 30V54Q68 65 57 65H24Q12 65 12 54Z" fill={b} fillOpacity=".24" transform="translate(0 3)"/>
  <rect x="13" y="12" width="54" height="54" rx="17" fill={`url(#color-icon-${uid})`} stroke={a} strokeWidth="1"/>
  <path d="M19 32q0-13 14-15h20" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity=".34" strokeLinecap="round"/>
  <circle cx="59" cy="20" r="4" fill="white" fillOpacity=".42"/>
  <g transform="translate(40 40)" style={{color:'#fff'}}><Glyph name={name} size={32}/></g>
 </svg>;
}
export function RoleEmblem({slug,size=56}:{slug:Slug;size?:number}){
 const [a,b]=rolePalette[slug],uid=slug;
 return <svg className="role-emblem" width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
  <defs><linearGradient id={`role-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={a}/><stop offset="1" stopColor={b}/></linearGradient></defs>
  <circle cx="40" cy="40" r="37" fill={a} fillOpacity=".11" stroke={a} strokeOpacity=".24"/>
  <path d="M20 20L58 16L69 31L64 57L42 69L17 61L10 35Z" fill={`url(#role-${uid})`} opacity=".20"/>
  <rect x="17" y="15" width="47" height="47" rx="15" fill={`url(#role-${uid})`} stroke={a} strokeWidth="1"/>
  <path d="M21 28q2-11 13-10h22" stroke="white" strokeOpacity=".35" strokeWidth="1.2" fill="none"/>
  <g transform="translate(40 39)" style={{color:'#fff'}}><Glyph name={roleGlyphs[slug]} size={31}/></g>
  <circle cx="63" cy="16" r="5" fill={b} stroke="#fff" strokeOpacity=".7"/>
 </svg>;
}
