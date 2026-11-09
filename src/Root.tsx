import React from 'react';
import {Composition} from 'remotion';
import {TheLastSignal, TOTAL_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH} from './TheLastSignal';
import {StoryFilm, STORY_DURATION, STORY_FPS, STORY_HEIGHT, STORY_WIDTH} from './StoryFilm';

export const Root: React.FC = () => (
  <>
  <Composition
    id="TheLastSignal"
    component={TheLastSignal}
    durationInFrames={TOTAL_FRAMES}
    fps={VIDEO_FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
  />
  <Composition id="TheLastSignal3D" component={StoryFilm} durationInFrames={STORY_DURATION} fps={STORY_FPS} width={STORY_WIDTH} height={STORY_HEIGHT} />
  </>
);
