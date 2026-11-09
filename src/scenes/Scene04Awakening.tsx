import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';
import {PortalVisual} from '../components/PortalVisual';

export const Scene04Awakening: React.FC = () => {
 const f=useCurrentFrame();
 return <CinematicScene title="THE AWAKENING" subtitle="PROJECT HORIZON ONLINE" accent="#6be7ff">
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 48%,#142c47,#03050c 70%)'}}/>
  <PortalVisual scale={1.05}/>
  <div style={{position:'absolute',left:80,top:100,color:'#ff4968',fontSize:18,letterSpacing:4}}>ENERGY LEVEL: {Math.min(100,Math.floor(f/12))}%</div>
  <div style={{position:'absolute',right:90,top:100,color:'#8feaff',fontSize:16,letterSpacing:3}}>CONTAINMENT {f>900?'UNSTABLE':'ACTIVE'}</div>
  {Array.from({length:45},(_,i)=><div key={i} style={{position:'absolute',left:(i*97+f*2)%1920,top:(i*53+f*3)%1080,width:3,height:3,borderRadius:'50%',background:i%3?'#70eaff':'#ff4c6b',boxShadow:'0 0 12px currentColor'}}/>)}
 </CinematicScene>;
};
