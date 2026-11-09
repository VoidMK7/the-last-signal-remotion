import React from 'react';

export const COLORS = {
  background: '#050711',
  blue: '#65d9ff',
  cyan: '#a4f0ff',
  red: '#ff405d',
  white: '#f4f7ff',
  muted: '#9ba8c7',
};

export const fullFrame: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  background: COLORS.background,
  color: COLORS.white,
  fontFamily: 'Arial, Helvetica, sans-serif',
};

export const vignette: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,.72) 100%)',
  pointerEvents: 'none',
};
