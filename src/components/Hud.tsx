import React from 'react';

export const Hud: React.FC<{label: string; value: string; color?: string}> = ({label, value, color = '#78e5ff'}) => (
  <div style={{border:'1px solid '+color+'66', background:'rgba(3,12,25,.72)', padding:'14px 18px', minWidth:210, boxShadow:'0 0 25px '+color+'22'}}>
    <div style={{fontSize:12,letterSpacing:3,color,marginBottom:8}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:'#f2f7ff'}}>{value}</div>
  </div>
);
