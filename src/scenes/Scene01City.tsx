import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';

export const Scene01City: React.FC = () => {
  const f = useCurrentFrame();
  const drift = interpolate(f,[0,1350],[0,-180],{extrapolateRight:'clamp'});
  return <CinematicScene title="THE WORLD THAT NEVER SLEEPS" subtitle="New Tokyo · 2189 · 00:00">
    <div style={{position:'absolute',inset:0,background:'linear-gradient(#07152d 0%,#111b35 42%,#050711 100%)'}} />
    <div style={{position:'absolute',inset:0,transform:`translateY(${drift}px)`}}>
      {Array.from({length:34},(_,i)=>{
        const x=(i*173)%1920, w=55+(i*37)%105, h=230+(i*83)%620;
        return <div key={i} style={{position:'absolute',left:x,top:1080-h,width:w,height:h,background:`linear-gradient(90deg,#07101e,#142b4c,#07101b)`,border:'1px solid #28466c',boxShadow:'0 0 30px #12345a'}}>
          {Array.from({length:Math.floor(h/34)},(_,j)=><div key={j} style={{height:3,margin:'17px 8px',background:(i+j)%4===0?'#ff4265':'#53cfff',opacity:.3+((i+j)%5)*.1}} />)}
        </div>;
      })}
    </div>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,#07101c66,transparent)',transform:`translateX(${Math.sin(f/30)*90}px)`}} />
    <div style={{position:'absolute',top:150,left:'54%',width:18,height:18,borderRadius:'50%',background:'#ff365c',boxShadow:'0 0 45px 18px #ff365c',opacity:f>900?1:0}} />
    <div style={{position:'absolute',top:110,right:90,color:'#8eeaff',fontSize:14,letterSpacing:5}}>NEW TOKYO / 2189</div>
  </CinematicScene>;
};
