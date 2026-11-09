import React from 'react';
import {Composition} from 'remotion';
import {TheLastSignal, TOTAL_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH} from './TheLastSignal';

export const Root: React.FC = () => (
  <Composition
    id="TheLastSignal"
    component={TheLastSignal}
    durationInFrames={TOTAL_FRAMES}
    fps={VIDEO_FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
  />
);
