import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type SceneData = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  globe: THREE.Group;
  stickman: THREE.Group;
  limbs: THREE.Line[];
  stars: THREE.Points;
};

export const WorldWalk: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneData | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050b18");

    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2, height / 2, -height / 2, 0.1, 1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Deterministic star field (important for repeatable video renders).
    const starPositions: number[] = [];
    for (let i = 0; i < 180; i++) {
      const x = (((i * 73) % 997) / 997 - 0.5) * width;
      const y = (((i * 193) % 991) / 991 - 0.5) * height;
      starPositions.push(x, y, -20);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: "#a9c9ff", size: 2 })
    );
    scene.add(stars);

    // Stylized circular Earth.
    const globe = new THREE.Group();
    scene.add(globe);
    const radius = Math.min(width * 0.29, height * 0.36);

    globe.add(new THREE.Mesh(
      new THREE.CircleGeometry(radius, 96),
      new THREE.MeshBasicMaterial({ color: "#102e59" })
    ));
    globe.add(new THREE.Mesh(
      new THREE.RingGeometry(radius - 2, radius + 3, 128),
      new THREE.MeshBasicMaterial({
        color: "#46b9ff", transparent: true, opacity: 0.9
      })
    ));

    const gridMaterial = new THREE.LineBasicMaterial({
      color: "#438bc7", transparent: true, opacity: 0.5
    });

    for (let i = 1; i <= 4; i++) {
      const r = radius * (i / 5);
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 100; j++) {
        const a = (j / 100) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 2));
      }
      globe.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points), gridMaterial
      ));
    }

    for (let i = 0; i < 3; i++) {
      const curve = new THREE.EllipseCurve(
        0, 0, radius * (0.35 + i * 0.2), radius, 0, Math.PI * 2
      );
      const points = curve.getPoints(100).map(
        (p) => new THREE.Vector3(p.x, p.y, 3)
      );
      globe.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points), gridMaterial
      ));
    }
    globe.position.set(0, -30, 0);

    // Simple white stick figure.
    const stickman = new THREE.Group();
    scene.add(stickman);
    const white = new THREE.LineBasicMaterial({ color: "#ffffff" });

    const makeLine = (points: THREE.Vector3[]) => {
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points), white
      );
      stickman.add(line);
      return line;
    };

    const head = new THREE.Mesh(
      new THREE.CircleGeometry(9, 32),
      new THREE.MeshBasicMaterial({ color: "#ffffff" })
    );
    head.position.y = 43;
    stickman.add(head);

    makeLine([new THREE.Vector3(0, 33), new THREE.Vector3(0, 0)]);
    const limbs = [
      makeLine([new THREE.Vector3(0, 26), new THREE.Vector3(-12, 10)]),
      makeLine([new THREE.Vector3(0, 26), new THREE.Vector3(12, 10)]),
      makeLine([new THREE.Vector3(0, 0), new THREE.Vector3(-10, -20)]),
      makeLine([new THREE.Vector3(0, 0), new THREE.Vector3(10, -20)]),
    ];

    sceneRef.current = { renderer, scene, camera, globe, stickman, limbs, stars };
    renderer.render(scene, camera);

    return () => {
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, [width, height]);

  useLayoutEffect(() => {
    const data = sceneRef.current;
    if (!data) return;

    const { renderer, scene, camera, globe, stickman, limbs, stars } = data;
    const radius = Math.min(width * 0.29, height * 0.36);
    const progress = interpolate(frame, [0, 20 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });

    const angle = Math.PI - progress * Math.PI;
    stickman.position.set(
      Math.cos(angle) * (radius + 8),
      Math.sin(angle) * (radius + 8) - 30,
      10
    );
    stickman.rotation.z = angle - Math.PI / 2;

    const swing = Math.sin(frame * 0.22) * 11;
    const updateLine = (
      line: THREE.Line, x1: number, y1: number, x2: number, y2: number
    ) => {
      const oldGeometry = line.geometry;
      line.geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y1, 0),
        new THREE.Vector3(x2, y2, 0),
      ]);
      oldGeometry.dispose();
    };

    updateLine(limbs[0], 0, 26, -12 + swing, 10);
    updateLine(limbs[1], 0, 26, 12 - swing, 10);
    updateLine(limbs[2], 0, 0, -10 + swing, -20);
    updateLine(limbs[3], 0, 0, 10 - swing, -20);

    globe.rotation.z = progress * 0.35;
    stars.rotation.z = -progress * 0.05;
    camera.position.x = interpolate(progress, [0, 1], [-15, 15]);

    renderer.render(scene, camera);
  }, [frame, fps, width, height]);

  const titleOpacity = interpolate(frame, [0, 35, 100], [1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const endingOpacity = interpolate(
    frame, [17 * fps, 19 * fps, 20 * fps], [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#050b18" }}>
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
      <AbsoluteFill style={{
        justifyContent: "flex-start", alignItems: "center",
        paddingTop: 65, opacity: titleOpacity, pointerEvents: "none"
      }}>
        <div style={{
          color: "#fff", fontSize: 22, letterSpacing: 7,
          fontFamily: "Arial", fontWeight: 300
        }}>THE JOURNEY</div>
        <div style={{
          color: "#70bfff", fontSize: 13, letterSpacing: 4, marginTop: 12
        }}>ONE WORLD. TWO SIDES.</div>
      </AbsoluteFill>
      <AbsoluteFill style={{
        justifyContent: "flex-end", alignItems: "center",
        paddingBottom: 85, opacity: endingOpacity, pointerEvents: "none"
      }}>
        <div style={{
          color: "#fff", fontSize: 30, fontWeight: 300,
          letterSpacing: 3, fontFamily: "Arial"
        }}>THERE IS MORE BEYOND.</div>
        <div style={{
          color: "#80bfff", fontSize: 14, letterSpacing: 4, marginTop: 15
        }}>KEEP WALKING.</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
