# World Walk — Remotion + Three.js

A 20-second, 1920×1080, 30 FPS animated composition.

## Files

- `src/WorldWalk.tsx` — animation component.
- `src/Root.example.tsx` — example composition registration.
- `package.json` — dependencies and useful scripts.

## Add it to an existing Remotion project

1. Copy `src/WorldWalk.tsx` into your project's `src` folder.
2. Open your existing Remotion root file (often `src/Root.tsx`).
3. Add this import:

   ```tsx
   import { WorldWalk } from "./WorldWalk";
   ```

4. Add this composition inside your existing root component. Keep your other compositions:

   ```tsx
   <Composition
     id="WorldWalk"
     component={WorldWalk}
     durationInFrames={600}
     fps={30}
     width={1920}
     height={1080}
   />
   ```

5. Install Three.js if it is not already installed:

   ```bash
   npm install three
   npm install -D @types/three
   ```

6. Render it (adjust the entry file if yours is named differently):

   ```bash
   npx remotion render src/index.ts WorldWalk out/world-walk.mp4
   ```

## Notes

- This is a stylized circular Earth illustration, not a geographically accurate 3D globe.
- Remotion drives the animation frame-by-frame.
- The star positions are deterministic so renders remain repeatable.
