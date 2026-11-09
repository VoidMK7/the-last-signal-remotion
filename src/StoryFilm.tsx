import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Audio, staticFile} from 'remotion';
import {Lagos3D} from './components/Lagos3D';

export const STORY_FPS=30;
export const STORY_WIDTH=1920;
export const STORY_HEIGHT=1080;
const acts=[
 {seconds:78,title:'THE WEIGHT OF HOME',sub:'LAGOS, NIGERIA • BEFORE SUNRISE',voice:'Some people are born with a head start. Malik was born with a list of things that needed fixing.',mood:0},
 {seconds:72,title:'THE LIFE HE COULDN’T AFFORD',sub:'HEARTBREAK • A CHOICE THAT WASN’T HIS',voice:'He mistook someone else’s decision for a verdict on his own worth. It wasn’t.',mood:1},
 {seconds:84,title:'THE LONG WAY UP',sub:'WORK. LEARN. BEGIN AGAIN.',voice:'He stopped waiting for one big break. He built small skills, one honest day at a time.',mood:2},
 {seconds:82,title:'THE NOISE OF THE MARKET',sub:'HYPE IS NOT KNOWLEDGE',voice:'The market did not care how badly he needed a win. Desperation was not a strategy.',mood:3},
 {seconds:86,title:'THE MONTHS THAT TESTED HIM',sub:'PATIENCE IS BUILT IN THE QUIET',voice:'He learned to protect what mattered, accept uncertainty, and keep building beyond the screen.',mood:4},
 {seconds:82,title:'THE TURNING POINT',sub:'A FICTIONAL $100,000,000 PORTFOLIO VALUATION',voice:'After months of failure and learning, an extraordinary number appeared. One hundred million dollars.',mood:5},
 {seconds:92,title:'WHAT SUCCESS IS FOR',sub:'THE PEOPLE WHO BELIEVED BEFORE THE WORLD DID',voice:'The money changed their circumstances. It did not create the love that carried them there.',mood:6},
 {seconds:72,title:'THE LAST SIGNAL',sub:'YOUR BEGINNING DOES NOT HAVE TO DECIDE YOUR ENDING',voice:'He thought he was chasing money. He was trying to give the people he loved a little peace.',mood:7},
];
const ActCard:React.FC<{act:typeof acts[number]}> = ({act})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const opacity=interpolate(f,[0,18,act.seconds*fps-20,act.seconds*fps],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const rise=interpolate(f,[0,30],[35,0],{extrapolateRight:'clamp'});
 return <AbsoluteFill style={{justifyContent:'flex-end',padding:'0 112px 112px',opacity,background:'linear-gradient(0deg,rgba(3,8,15,.88),rgba(3,8,15,0) 62%)'}}>
  <div style={{fontFamily:'Arial,sans-serif',fontSize:19,letterSpacing:8,color:'#9cc8d8',marginBottom:20}}>THE LAST SIGNAL <span style={{color:'#e8b977'}}> / {String(acts.indexOf(act)+1).padStart(2,'0')}</span></div>
  <div style={{fontFamily:'Arial,sans-serif',fontWeight:800,fontSize:68,letterSpacing:1,color:'#f3f4f2',transform:`translateY(${rise}px)`,maxWidth:1300}}>{act.title}</div>
  <div style={{fontFamily:'Arial,sans-serif',fontSize:23,letterSpacing:5,color:'#d6b47e',marginTop:18}}>{act.sub}</div>
  <div style={{fontFamily:'Arial,sans-serif',fontSize:27,lineHeight:1.4,color:'#e8edf2',maxWidth:1150,marginTop:30}}>{act.voice}</div>
  {act.mood===5&&<div style={{fontFamily:'Arial,sans-serif',fontSize:17,color:'#ffc98c',marginTop:18,letterSpacing:2}}>FICTIONAL STORY • MEMECOIN MARKETS ARE EXTREMELY VOLATILE</div>}
 </AbsoluteFill>;
};
export const StoryFilm:React.FC=()=>{
 const {fps}=useVideoConfig();let start=0;
 return <AbsoluteFill style={{background:'#101a2b'}}>
  <Lagos3D mood={0}/>
  <Audio src={staticFile('audio/original-score.mp3')} volume={0.55} loop />
  {acts.map((act,i)=>{const from=start;start+=act.seconds*fps;return <Sequence key={i} from={from} durationInFrames={act.seconds*fps}><ActCard act={act}/></Sequence>;})}
  <AbsoluteFill style={{pointerEvents:'none',border:'2px solid rgba(195,216,228,.12)',margin:34}}/>
 </AbsoluteFill>;
};
export const STORY_DURATION=acts.reduce((n,a)=>n+a.seconds*STORY_FPS,0);
