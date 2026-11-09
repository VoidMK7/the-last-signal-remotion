import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {CinematicScene} from '../components/CinematicScene';

export const Scene07Shutdown: React.FC = () => {
 const f=useCurrentFrame(); const flash=interpolate(f,[1500,1650,1750],[0,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <CinematicScene title="THE FINAL DECISION" subtitle="MANUAL SHUTDOWN INITIATED" accent="#ff4968">
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,#351421,#05050b 72%)'}}/>
  <div style={{position:'absolute',left:'50%',top:'45%',transform:'translate(-50%,-50%)',width:570,height:570,borderRadius:'50%',border:'18px solid #ff4765',boxShadow:'0 0 65px #ff365b,inset 0 0 65px #ff365b'}}/>
  <div style={{position:'absolute',left:'50%',top:'45%',transform:'translate(-50%,-50%)',fontSize:100,fontWeight:900,color:'#fff',textShadow:'0 0 35px #ff4968'}}>30</div>
  <div style={{position:'absolute',inset:0,background:'#fff',opacity:flash}}/>
  <div style={{position:'absolute',top:100,right:110,color:'#ff8296',fontSize:18,letterSpacing:4}}>CONTAINMENT FAILURE IMMINENT</div>
 </CinematicScene>;
};
