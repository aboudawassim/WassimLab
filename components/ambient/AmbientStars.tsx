'use client';

import {useMemo,useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import type {Group} from 'three';
import {createStarPositions} from '@/lib/star-geometry';

const COUNT=1666;
const RADIUS=1.2;

function StarSphere({color,opacity}:{color:string;opacity:number}){
 const group=useRef<Group>(null);
 const positions=useMemo(()=>createStarPositions(COUNT,RADIUS,20261108,1),[ ]);
 useFrame((_,delta)=>{
  const node=group.current;
  if(!node)return;
  node.rotation.x-=delta/10;
  node.rotation.y-=delta/15;
 });
 return <group ref={group} rotation={[0,0,Math.PI/4]}>
  <points frustumCulled={false}>
   <bufferGeometry>
    <bufferAttribute attach="attributes-position" args={[positions,3]}/>
   </bufferGeometry>
   <pointsMaterial transparent color={color} size={0.002} sizeAttenuation depthWrite={false} opacity={opacity}/>
  </points>
 </group>;
}

/**
 * Ambient point sphere matching the MyFolio field: one tiny, slowly rotating
 * cloud fixed behind the content. Theme only changes the ink, not the motion.
 */
export default function AmbientStars({theme,active}:{theme:'dark'|'light';active:boolean}){
 const light=theme==='light';
 return <Canvas
  frameloop={active?'always':'demand'}
  dpr={[1,1.5]}
  camera={{position:[0,0,1]}}
  gl={{alpha:true,antialias:true,powerPreference:'low-power'}}
  style={{position:'absolute',inset:0,pointerEvents:'none'}}
 >
  <StarSphere color={light?'#b8449b':'#f272c8'} opacity={light?.38:.5}/>
 </Canvas>;
}
