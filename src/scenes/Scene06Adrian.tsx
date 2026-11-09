import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';

export const Scene06Adrian: React.FC = () => {
 const f=useCurrentFrame(); const glow=0.35+Math.sin(f/10)*0.12;
 return <CinematicScene title="THE TRUTH ABOUT ADRIAN" subtitle="47 YEARS LOST · ONE WARNING REMAINS">
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 45%,#17304a,#050711 70%)'}}/>
  <div style={{position:'absolute',left:'50%',top:'43%',transform:'translate(-50%,-50%)',width:340,height:520,borderRadius:'48% 48% 15% 15%',background:'linear-gradient(90deg,#070b14,#263c50,#070b14)',boxShadow:`0 0 90px rgba(85,210,255,${glow})`}}>
   <div style={{position:'absolute',top:-70,left:95,width:150,height:160,borderRadius:'50%',background:'linear-gradient(135deg,#b4c4d0,#253c51 65%,#0a1018)',boxShadow:'0 0 30px #8adfff55'}}/>
  </div>
  <div style={{position:'absolute',left:'12%',top:'25%',width:300,color:'#b8d7e9',fontSize:20,lineHeight:1.6}}>“We weren't the first ones to discover this place. We were the ones who were discovered.”</div>
 </CinematicScene>;
};
