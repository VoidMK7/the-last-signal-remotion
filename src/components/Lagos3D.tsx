import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {useCurrentFrame, useVideoConfig, delayRender, continueRender} from 'remotion';

/** Deterministic Three.js environment: all animation is driven by Remotion's frame. */
export const Lagos3D: React.FC<{mood?: number}> = ({mood = 0}) => {
  const host = useRef<HTMLDivElement>(null);
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const handle = useRef<number | null>(null);
  useEffect(() => {
    if (!host.current) return;
    const el = host.current;
    const gate = delayRender('Rendering Three.js Lagos environment');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(mood > 5 ? '#101a2b' : '#111c2b');
    scene.fog = new THREE.FogExp2('#182437', 0.012);
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 400);
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight('#b8d5ed', '#17131b', 1.8));
    const sun = new THREE.DirectionalLight(mood > 5 ? '#ffc98c' : '#9cc9ed', 3.0);
    sun.position.set(-35, 55, 30); sun.castShadow = true; scene.add(sun);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.MeshStandardMaterial({color:'#202833', roughness:0.94}));
    ground.rotation.x = -Math.PI/2; ground.position.y = -0.08; ground.receiveShadow = true; scene.add(ground);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(15, 260), new THREE.MeshStandardMaterial({color:'#111820', roughness:0.7, metalness:0.12}));
    road.rotation.x=-Math.PI/2; road.position.set(0,0.01,-65); scene.add(road);
    const dashMat = new THREE.MeshBasicMaterial({color:'#d7c89a'});
    for(let i=0;i<22;i++){const dash=new THREE.Mesh(new THREE.PlaneGeometry(.16,3.5),dashMat);dash.rotation.x=-Math.PI/2;dash.position.set(0,.035,-i*11);scene.add(dash);}
    // Dense, varied skyline with procedural geometry.
    let seed=42; const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    const mats=['#293747','#34404a','#202e3c','#4a4b4a'].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.86}));
    for(let i=0;i<105;i++){
      const side=rand()>.5?1:-1; const x=side*(13+rand()*48); const z=-rand()*190+25;
      const w=4+rand()*10,h=9+rand()*42,d=5+rand()*12;
      const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mats[Math.floor(rand()*mats.length)]);
      b.position.set(x,h/2,z);b.castShadow=true;b.receiveShadow=true;scene.add(b);
      const windows=new THREE.Mesh(new THREE.BoxGeometry(w*.78,.12,.04),new THREE.MeshBasicMaterial({color:rand()>.45?'#e2b978':'#7399b8'}));
      for(let j=0;j<Math.min(8,Math.floor(h/4));j++){const win=windows.clone();win.position.set(x,h*.22+j*3,z+d/2+.03);scene.add(win);}
    }
    // Malik: stylized low-poly human silhouette, kept deliberately simple for the first build.
    const skin=new THREE.MeshStandardMaterial({color:'#80553d',roughness:.9});
    const shirt=new THREE.MeshStandardMaterial({color:'#263b4c',roughness:.85});
    const pants=new THREE.MeshStandardMaterial({color:'#171d25',roughness:.9});
    const malik=new THREE.Group();
    const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.85,4,8),shirt);torso.position.y=1.45;malik.add(torso);
    const head=new THREE.Mesh(new THREE.SphereGeometry(.29,12,10),skin);head.position.y=2.25;malik.add(head);
    const armGeo=new THREE.CapsuleGeometry(.12,.65,3,6); const arm1=new THREE.Mesh(armGeo,skin);arm1.position.set(-.48,1.48,0);arm1.rotation.z=-.18;malik.add(arm1);const arm2=arm1.clone();arm2.position.x=.48;arm2.rotation.z=.18;malik.add(arm2);
    const legGeo=new THREE.CapsuleGeometry(.15,.68,3,6);const leg1=new THREE.Mesh(legGeo,pants);leg1.position.set(-.19,.48,0);malik.add(leg1);const leg2=leg1.clone();leg2.position.x=.19;malik.add(leg2);
    malik.position.set(0,0,3);scene.add(malik);
    const glow=new THREE.Mesh(new THREE.SphereGeometry(1.5,24,16),new THREE.MeshBasicMaterial({color:'#f5b86b',transparent:true,opacity:.13}));glow.position.set(-28,24,-125);scene.add(glow);
    const renderFrame=(f:number)=>{
      const t=f/fps;
      const walk=Math.sin(t*7)*.17;
      leg1.rotation.x=walk;leg2.rotation.x=-walk;arm1.rotation.x=-walk*.6;arm2.rotation.x=walk*.6;
      malik.position.z=3-Math.min(12,t*1.2); malik.position.y=Math.abs(Math.sin(t*7))*.035;
      camera.position.set(Math.sin(t*.08)*1.5,5.5,18-t*.22);
      camera.lookAt(0,2,-22);
      sun.intensity=2.1+Math.sin(t*.18)*.35;
      renderer.render(scene,camera);
    };
    renderFrame(frame); continueRender(gate);
    (el as any).__renderFrame=renderFrame;
    return ()=>{renderer.dispose();scene.traverse(o=>{if((o as THREE.Mesh).geometry)(o as THREE.Mesh).geometry.dispose();});if(el.contains(renderer.domElement))el.removeChild(renderer.domElement);};
  // mood/size are composition constants; frame updates are handled below.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width,height,mood,fps]);
  useEffect(()=>{(host.current as any)?.__renderFrame?.(frame);},[frame]);
  return <div ref={host} style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'hidden'}}/>;
};
