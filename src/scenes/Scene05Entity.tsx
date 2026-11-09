import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';
import {PortalVisual} from '../components/PortalVisual';

export const Scene05Entity: React.FC = () => {
 const f=useCurrentFrame(); const rise=interpolate(f,[500,1500],[240,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <CinematicScene title="SOMETHING IS LOOKING BACK" subtitle="EXTERNAL CONTROL DETECTED" accent="#ff4564">
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 48%,#160e24,#02030a 72%)'}}/>
  <PortalVisual scale={1.15} color="#ff4264" secondColor="#5bdfff"/>
  <div style={{position:'absolute',left:'50%',top:`calc(47% + ${rise}px)`,transform:'translate(-50%,-50%)',width:170,height:380,borderRadius:'48% 48% 20% 20%',background:'linear-gradient(90deg,#020207,#12121d,#010105)',filter:'blur(2px)',boxShadow:'0 0 55px #ff315533'}}/>
  <div style={{position:'absolute',left:'50%',top:'42%',transform:'translate(-50%,-50%)',width:110,height:18,background:'#ff4765',borderRadius:'50%',filter:'blur(12px)',opacity:.9}}/>
  <div style={{position:'absolute',top:100,left:100,color:'#ff7890',fontSize:15,letterSpacing:4}}>UNKNOWN ENTITY / VISUAL CONTACT</div>
 </CinematicScene>;
};
