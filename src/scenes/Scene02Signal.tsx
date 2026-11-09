import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';
import {Hud} from '../components/Hud';

export const Scene02Signal: React.FC = () => {
  const f=useCurrentFrame();
  const blink=Math.floor(f/12)%2===0;
  return <CinematicScene title="THE IMPOSSIBLE TRANSMISSION" subtitle="International Deep Space Research Facility" accent="#ff4968">
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 45%,#17263c,#050711 70%)'}} />
    <div style={{position:'absolute',left:'10%',top:'15%',width:'80%',height:'65%',border:'2px solid #31506b',borderRadius:28,background:'linear-gradient(135deg,#0c1b2b,#050912)',boxShadow:'0 0 80px #123f61',padding:40}}>
      <div style={{color:'#70ddff',letterSpacing:5,fontSize:15}}>DEEP SPACE TELEMETRY // LIVE</div>
      <svg viewBox="0 0 1000 280" style={{width:'100%',height:260,marginTop:55}}>
        <path d={'M0 140 '+Array.from({length:100},(_,i)=>`L${i*10} ${140+Math.sin(i*1.8+f/8)*(10+((i*13)%60))}`).join(' ')} fill="none" stroke="#ff4968" strokeWidth="3"/>
        <path d="M0 140 H1000" stroke="#416078" strokeDasharray="8 12"/>
      </svg>
      <div style={{display:'flex',gap:22,marginTop:10}}><Hud label="SOURCE" value="UNKNOWN" color="#ff4968"/><Hud label="SIGNAL INTEGRITY" value="99.98%"/><Hud label="ORIGIN" value="UNRESOLVED"/></div>
      <div style={{marginTop:35,color:blink?'#ff4968':'#7e293a',fontSize:23,letterSpacing:5}}> {blink?'●':'○'} UNKNOWN SIGNAL DETECTED</div>
    </div>
    <div style={{position:'absolute',right:120,bottom:235,fontSize:18,color:'#ff6b80',letterSpacing:4}}>DO NOT OPEN THE GATE</div>
  </CinematicScene>;
};
