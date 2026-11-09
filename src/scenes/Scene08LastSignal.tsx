import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';

export const Scene08LastSignal: React.FC = () => {
 const f=useCurrentFrame(); const scale=interpolate(f,[0,1350],[.65,1.7],{extrapolateRight:'clamp'});
 return <CinematicScene title="THE LAST SIGNAL" subtitle="...THERE ARE OTHERS." accent="#ff4968" progress={false}>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,#10223d,#010208 72%)'}}/>
  <div style={{position:'absolute',left:'50%',top:'48%',width:330,height:330,borderRadius:'50%',transform:`translate(-50%,-50%) scale(${scale})`,background:'radial-gradient(circle at 35% 35%,#1a4c71,#07101e 58%,#02040a 70%)',boxShadow:'0 0 100px #24638c'}}/>
  <div style={{position:'absolute',left:'50%',top:'48%',width:620,height:620,borderRadius:'50%',transform:`translate(-50%,-50%) scale(${scale})`,border:'1px solid #ff4968',boxShadow:'0 0 50px #ff496866'}}/>
  {Array.from({length:90},(_,i)=><div key={i} style={{position:'absolute',left:(i*191)%1920,top:(i*97)%1080,width:2,height:2,background:i%5===0?'#ff4968':'#d8efff',boxShadow:'0 0 8px currentColor'}}/>)}
  <div style={{position:'absolute',left:'50%',top:'48%',transform:'translate(-50%,-50%)',color:'#ff4c68',fontSize:18,letterSpacing:8}}>SIGNAL RECEIVED</div>
 </CinematicScene>;
};
