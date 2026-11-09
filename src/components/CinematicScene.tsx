import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {fullFrame, vignette, COLORS} from '../styles';

type Props = {
  title: string;
  subtitle?: string;
  accent?: string;
  children?: React.ReactNode;
  progress?: boolean;
};

export const CinematicScene: React.FC<Props> = ({title, subtitle, accent = COLORS.blue, children, progress = true}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(frame, [0, 18, durationInFrames - 18, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={fullFrame}>
      {children}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(2,4,12,.18), transparent 35%, rgba(2,4,12,.7))', opacity}} />
      <div style={{position:'absolute', left:72, bottom:78, opacity, maxWidth:1100}}>
        <div style={{fontSize:16, letterSpacing:7, color:accent, textTransform:'uppercase', marginBottom:14}}>THE LAST SIGNAL</div>
        <div style={{fontSize:58, fontWeight:800, letterSpacing:1, textShadow:'0 4px 30px #000'}}>{title}</div>
        {subtitle && <div style={{fontSize:23, color:'#c5cee3', marginTop:14, letterSpacing:1}}>{subtitle}</div>}
      </div>
      {progress && <div style={{position:'absolute',left:0,right:0,bottom:0,height:4,background:'rgba(255,255,255,.12)'}}>
        <div style={{height:'100%',width:`${Math.min(100, frame / Math.max(1,durationInFrames) * 100)}%`,background:accent}} />
      </div>}
      <AbsoluteFill style={vignette} />
    </AbsoluteFill>
  );
};
