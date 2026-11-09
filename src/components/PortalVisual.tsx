import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

export const PortalVisual: React.FC<{scale?: number; color?: string; secondColor?: string}> = ({scale=1,color='#45dfff',secondColor='#ff3158'}) => {
  const f = useCurrentFrame();
  const pulse = 1 + Math.sin(f/7)*0.035;
  const spin = f*1.7;
  return (
    <div style={{position:'absolute',left:'50%',top:'47%',width:520*scale,height:520*scale,transform:`translate(-50%,-50%) scale(${pulse})`,borderRadius:'50%',filter:'drop-shadow(0 0 28px '+color+')'}}>
      <div style={{position:'absolute',inset:0,borderRadius:'50%',border:`12px solid ${color}`,boxShadow:`inset 0 0 40px ${color},0 0 55px ${color}`,transform:`rotate(${spin}deg) scaleX(.78)`}} />
      <div style={{position:'absolute',inset:42,borderRadius:'50%',border:`5px dashed ${secondColor}`,boxShadow:`0 0 35px ${secondColor}`,transform:`rotate(${-spin*1.4}deg) scaleY(.82)`}} />
      <div style={{position:'absolute',inset:90,borderRadius:'50%',background:`radial-gradient(circle, #02030a 0%, #070c1b 45%, ${color}66 72%, transparent 73%)`,boxShadow:`0 0 65px ${secondColor}88`}} />
      <div style={{position:'absolute',inset:0,borderRadius:'50%',background:`conic-gradient(from ${spin}deg, transparent, ${color}66, transparent, ${secondColor}77, transparent)` ,mixBlendMode:'screen'}} />
    </div>
  );
};
