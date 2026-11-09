# THE LAST SIGNAL — Remotion starter project

This ZIP contains the screenplay, eight separately coded scenes, a shared cinematic visual system, and Remotion entry points.

## Important scope note
This is a **working animated 2D/cinematic-motion starter**, not a finished photorealistic 3D film. It uses frame-driven React/Remotion animation, layered gradients, vector shapes, HUD graphics, and scene-specific motion. It does not include finished character models, voice acting, licensed music, or photorealistic environment assets. The `three` dependency is included for the next 3D expansion, but the current scenes deliberately avoid WebGL so they render consistently in Remotion.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm
- A computer for rendering (Remotion Studio can be previewed locally)

## Install and preview
```bash
npm install
npm run start
```
Open the Remotion Studio preview, select `TheLastSignal`, and scrub through the timeline.

## Render the MP4
```bash
npm run build
```
The output will be `out/the-last-signal.mp4`.

## Project layout
```text
src/
  index.ts
  Root.tsx
  TheLastSignal.tsx
  styles.ts
  components/
    CinematicScene.tsx
    Hud.tsx
    PortalVisual.tsx
  scenes/
    Scene01City.tsx
    Scene02Signal.tsx
    Scene03Archive.tsx
    Scene04Awakening.tsx
    Scene05Entity.tsx
    Scene06Adrian.tsx
    Scene07Shutdown.tsx
    Scene08LastSignal.tsx
```

## Timeline
The film runs at 30 fps, 1920×1080, approximately 6 minutes 30 seconds.
Each scene is 30–60 seconds. Scene timing is defined in `src/TheLastSignal.tsx`.

## Replace placeholder visuals with real assets
1. Create or obtain environment and character assets (for example, Blender `.glb` models).
2. Put local assets in `public/` and reference them from Remotion using `staticFile()`.
3. Add dialogue and music files under `public/audio/`.
4. For a 3D version, build each environment as a Three.js scene or render image sequences from Blender, then composite those sequences in Remotion.
5. Use only assets you own or have permission to use.

## Scene notes
- Scene 1: futuristic city, aerial movement, red anomaly.
- Scene 2: deep-space facility, signal alert, mysterious voice.
- Scene 3: archival footage and Project Horizon reveal.
- Scene 4: abandoned machine powers up.
- Scene 5: portal opens and entity appears.
- Scene 6: Adrian reveals the truth.
- Scene 7: emergency shutdown and collapse.
- Scene 8: Earth, distant structure, sequel hook.

## Audio
Audio is intentionally not fabricated. Add licensed/original files in `public/audio/` and place `<Audio>` components in the relevant scene or composition. Dialogue in `SCREENPLAY.md` is a recording script.

## Customization
- Change colors, type, and reusable styling in `src/styles.ts`.
- Change scene duration/order in `src/TheLastSignal.tsx`.
- Change on-screen lines and animation in each scene file.
