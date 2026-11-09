import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';

export const Scene03Archive: React.FC = () => {
 const f=useCurrentFrame(); const y=interpolate(f,[0,1350],[30,-30]);
 return <CinematicScene title="THE FORGOTTEN EXPERIMENT" subtitle="PROJECT HORIZON · CLASSIFIED ARCHIVE">
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,#26374a,#070a12 72%)'}}/>
  <div style={{position:'absolute',left:'18%',top:'12%',width:'64%',height:'72%',border:'1px solid #7a9ab2',background:'linear-gradient(135deg,#162537,#070d17)',boxShadow:'0 0 70px #4aa9dc33',padding:38,transform:`translateY(${y}px)`}}>
   <div style={{fontSize:14,letterSpacing:5,color:'#9ce8ff'}}>ARCHIVE RECORDING / 2142</div>
   <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'70%'}}>
    <div style={{width:390,height:390,borderRadius:'50%',border:'18px solid #7898a9',boxShadow:'0 0 45px #54cfff,inset 0 0 35px #54cfff',display:'grid',placeItems:'center'}}>
     <div style={{width:240,height:240,borderRadius:'50%',background:'radial-gradient(circle,#02040a,#101e31 70%,#ff345966)',boxShadow:'0 0 60px #ff365c'}}/>
    </div>
   </div>
   <div style={{display:'flex',justifyContent:'space-between',color:'#c5d9e8',fontSize:16,letterSpacing:3}}><span>HORIZON ARRAY</span><span>TEST 001 / LOST</span></div>
  </div>
 </CinematicScene>;
};
