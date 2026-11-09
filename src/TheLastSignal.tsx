import React from 'react';
import {Sequence, AbsoluteFill} from 'remotion';
import {Scene01City} from './scenes/Scene01City';
import {Scene02Signal} from './scenes/Scene02Signal';
import {Scene03Archive} from './scenes/Scene03Archive';
import {Scene04Awakening} from './scenes/Scene04Awakening';
import {Scene05Entity} from './scenes/Scene05Entity';
import {Scene06Adrian} from './scenes/Scene06Adrian';
import {Scene07Shutdown} from './scenes/Scene07Shutdown';
import {Scene08LastSignal} from './scenes/Scene08LastSignal';

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

// Durations follow the screenplay: 45s, 45s, 45s, 45s, 60s, 45s, 60s, 45s.
const durations = [1350, 1350, 1350, 1350, 1800, 1350, 1800, 1350];
export const TOTAL_FRAMES = durations.reduce((a,b)=>a+b,0);

export const TheLastSignal: React.FC = () => {
 let from = 0;
 const scenes = [
  {duration:durations[0],component:<Scene01City/>},
  {duration:durations[1],component:<Scene02Signal/>},
  {duration:durations[2],component:<Scene03Archive/>},
  {duration:durations[3],component:<Scene04Awakening/>},
  {duration:durations[4],component:<Scene05Entity/>},
  {duration:durations[5],component:<Scene06Adrian/>},
  {duration:durations[6],component:<Scene07Shutdown/>},
  {duration:durations[7],component:<Scene08LastSignal/>},
 ];
 return <AbsoluteFill style={{background:'#050711'}}>
  {scenes.map((scene,i)=>{const start=from;from+=scene.duration;return <Sequence key={i} from={start} durationInFrames={scene.duration}>{scene.component}</Sequence>;})}
 </AbsoluteFill>;
};
