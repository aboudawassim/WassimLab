import type {Slug} from '@/lib/site';

/**
 * Per-role signature art for the expertise cards.
 * Each role gets its own silhouette, so the eight cards never read as
 * recoloured copies of one diagram. Pure SVG: no image request, no client JS.
 */
export const roleAccent: Record<Slug,string>={
 'project-coordination':'#ad8cff',
 'business-analysis':'#ff7bb0',
 'technical-analysis':'#69caff',
 'qa-uat':'#52e9b7',
 'fullstack':'#74b9ff',
 'devsecops':'#55dec8',
 'it-operations':'#78c5ff',
 'business-operations':'#ef9df9',
};

/** Soft dotted grid shared by every signature. */
function Grid(){
 return <g stroke="currentColor" strokeOpacity=".16" strokeWidth="1">
  {[20,50,80,110,140,170,200,230,260,290].map(x=><line key={'v'+x} x1={x} y1="0" x2={x} y2="120"/>)}
  {[24,60,96].map(y=><line key={'h'+y} x1="0" y1={y} x2="320" y2={y}/>)}
 </g>;
}

export function RoleVisual({slug}:{slug:Slug}){
 const accent=roleAccent[slug];
 const id='rv-'+slug;
 const glow={fill:`url(#${id}-glow)`};
 return <svg className="role-visual" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <defs>
   <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
    <stop stopColor="#0a0f24"/>
    <stop offset="1" stopColor={accent} stopOpacity=".22"/>
   </linearGradient>
   <radialGradient id={`${id}-glow`} cx=".5" cy=".5" r=".5">
    <stop stopColor={accent} stopOpacity=".42"/>
    <stop offset="1" stopColor={accent} stopOpacity="0"/>
   </radialGradient>
  </defs>
  <rect width="320" height="120" fill={`url(#${id}-bg)`}/>
  <ellipse cx="168" cy="60" rx="150" ry="58" {...glow}/>
  <g color={accent}><Grid/></g>
  <g fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
   {slug==='project-coordination'&&<>
    {[
     {y:34,w:92},
     {y:52,w:148},
     {y:70,w:64},
     {y:88,w:118},
    ].map((b,i)=><g key={b.y}>
     <rect x="44" y={b.y} width={b.w} height="9" rx="4.5" fill={accent} fillOpacity={i===1?.55:.3} stroke="none"/>
     <rect x="44" y={b.y} width={b.w} height="9" rx="4.5" strokeOpacity=".55" strokeWidth="1"/>
     <path d={`M${44+b.w+8} ${b.y+4.5}l5 -5 5 5 -5 5z`} fill={accent} fillOpacity={i===1?.9:.55} stroke="none"/>
    </g>)}
    <line x1="188" y1="22" x2="188" y2="104" strokeDasharray="3 4" strokeOpacity=".6"/>
    <circle cx="188" cy="22" r="3" fill={accent} stroke="none"/>
   </>}
   {slug==='business-analysis'&&<>
    {[[70,36,138,28],[70,36,120,82],[138,28,168,58],[120,82,168,58],[168,58,246,40],[168,58,238,92],[246,40,238,92]].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity=".42" strokeDasharray={i>3?'4 4':undefined}/>)}
    {[[70,36,7],[138,28,9],[120,82,7],[246,40,6],[238,92,6]].map(([cx,cy,r],i)=><circle key={i} cx={cx} cy={cy} r={r} fill={accent} fillOpacity=".22"/>)}
    <circle cx="168" cy="58" r="17" fill={accent} fillOpacity=".16"/>
    <circle cx="168" cy="58" r="10" fill={accent} fillOpacity=".4"/>
    <path d="M164 58h8M168 54v8" stroke="#fff" strokeOpacity=".8"/>
   </>}
   {slug==='technical-analysis'&&<>
    <rect x="54" y="26" width="128" height="68" rx="8" strokeOpacity=".55"/>
    <rect x="70" y="40" width="62" height="40" rx="5" fill={accent} fillOpacity=".18"/>
    <rect x="146" y="40" width="20" height="18" rx="3" strokeOpacity=".7"/>
    <rect x="146" y="62" width="20" height="18" rx="3" strokeOpacity=".7"/>
    <path d="M70 88v10h112v-10M182 50h14M182 72h14" strokeOpacity=".6"/>
    {[[216,32],[246,50],[216,68],[246,86]].map(([x,y],i)=><g key={i}><rect x={x} y={y} width="30" height="12" rx="3" fill={accent} fillOpacity={i%2?.3:.16}/><circle cx={x+6} cy={y+6} r="2" fill={accent}/></g>)}
    <path d="M196 50h20M196 72h20M246 62v12" strokeOpacity=".5" strokeDasharray="3 3"/>
   </>}
   {slug==='qa-uat'&&<>
    {[0,1,2].map(row=>[0,1,2,3,4,5].map(col=>{
     const x=52+col*36,y=28+row*28,pass=(row*6+col)%5!==3;
     return <g key={`${row}-${col}`}>
      <rect x={x} y={y} width="24" height="20" rx="4" fill={accent} fillOpacity={pass?.16:.06} strokeOpacity={pass?.45:.25}/>
      {pass?<path d={`M${x+6} ${y+10}l4 4 8 -8`} strokeOpacity=".85"/>:<path d={`M${x+8} ${y+7}l8 6M${x+16} ${y+7}l-8 6`} strokeOpacity=".6"/>}
     </g>;
    }))}
    <path d="M44 20h240" strokeOpacity=".4" strokeDasharray="2 5"/>
   </>}
   {slug==='fullstack'&&<>
    {[0,1,2,3].map(i=>{
     const y=32+i*18;
     return <g key={i}>
      <path d={`M84 ${y}h130l24 9-24 9H84l-24-9z`} fill={accent} fillOpacity={.1+i*.07} strokeOpacity=".55"/>
      <circle cx="70" cy={y+9} r="2.4" fill={accent}/>
      <circle cx="88" cy={y+9} r="2.4" fill={accent} fillOpacity=".5"/>
     </g>;
    })}
    <path d="M214 41v46" strokeOpacity=".55" strokeDasharray="4 4"/>
    <path d="M220 50v44" strokeOpacity=".3"/>
    <path d="M226 59v36" strokeOpacity=".2"/>
   </>}
   {slug==='devsecops'&&<>
    <circle cx="164" cy="60" r="34" strokeOpacity=".55" strokeDasharray="5 6"/>
    <circle cx="164" cy="60" r="23" strokeOpacity=".28"/>
    <path d="M164 26a34 34 0 0 1 30 17" strokeWidth="2.4"/>
    <path d="M198 34l-3 11-9-7z" fill={accent} stroke="none"/>
    {[[164,26],[198,60],[164,94],[130,60]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="4.5" fill={accent} fillOpacity={i===0?.9:.55}/>)}
    <path d="M164 50l11 4v9c0 7-5 11-11 13-6-2-11-6-11-13v-9z" fill={accent} fillOpacity=".22"/>
    <path d="M159 60l4 4 7-8" stroke="#fff" strokeOpacity=".85"/>
   </>}
   {slug==='it-operations'&&<>
    {[0,1,2].map(i=><g key={i}>
     <rect x="92" y={28+i*22} width="136" height="16" rx="4" fill={accent} fillOpacity=".12" strokeOpacity=".45"/>
     {[0,1,2].map(j=><circle key={j} cx={104+j*10} cy={36+i*22} r="2" fill={accent} fillOpacity={j===0?.9:.4}/>)}
     <path d={`M190 ${36+i*22}h26`} strokeOpacity=".35"/>
    </g>)}
    <path d="M44 100h28l8-14 10 24 9-18 8 8h169" strokeWidth="1.8" strokeOpacity=".8"/>
    <circle cx="76" cy="86" r="3" fill={accent} stroke="none"/>
   </>}
   {slug==='business-operations'&&<>
    {[{w:196,y:30},{w:158,y:48},{w:118,y:66},{w:76,y:84}].map((b,i)=><g key={b.y}>
     <rect x={160-b.w/2} y={b.y} width={b.w} height="11" rx="5.5" fill={accent} fillOpacity={.14+i*.1} strokeOpacity=".4"/>
     <rect x={160-b.w/2} y={b.y} width={b.w*0.42} height="11" rx="5.5" fill={accent} fillOpacity=".5" stroke="none"/>
    </g>)}
    <path d="M236 92v-46M236 46l-7 9M236 46l7 9" strokeWidth="1.8"/>
    <circle cx="236" cy="92" r="3" fill={accent} stroke="none"/>
    <path d="M262 34v58" strokeOpacity=".25" strokeDasharray="3 5"/>
   </>}
  </g>
 </svg>;
}
