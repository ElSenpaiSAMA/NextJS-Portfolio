"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { buildContainerYard, heroProgress } from "../../lib/hero-progress";

/*
 * Hero scene: a harbour at dusk whose skyline is stacked shipping containers.
 * The scroll (heroProgress) flies the camera down the boulevard.
 * Colours mirror the CSS tokens in globals.css (WebGL can't read CSS vars).
 */
const SKY = { zenith: "#160b2e", dusk: "#3d1a5b", glow: "#ff4f8b", horizon: "#ff7849" };
const CONTAINER_COLORS = ["#b14a37", "#2a7b84", "#6a3d93", "#c27a3a", "#34478a"];
const FOG = "#2a1347";

const CONTAINER_SIZE: [number, number, number] = [2.4, 2.5, 6];

function Sky() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          zenith: { value: new THREE.Color(SKY.zenith) },
          dusk: { value: new THREE.Color(SKY.dusk) },
          glow: { value: new THREE.Color(SKY.glow) },
          horizon: { value: new THREE.Color(SKY.horizon) },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 zenith; uniform vec3 dusk; uniform vec3 glow; uniform vec3 horizon;
          varying vec3 vDir;
          void main() {
            float h = vDir.y;
            vec3 color = mix(horizon, glow, smoothstep(-0.02, 0.08, h));
            color = mix(color, dusk, smoothstep(0.06, 0.25, h));
            color = mix(color, zenith, smoothstep(0.22, 0.6, h));
            // Low sun glow straight down the boulevard
            float sun = pow(max(dot(vDir, normalize(vec3(0.0, 0.04, -1.0))), 0.0), 220.0);
            color += vec3(1.0, 0.75, 0.55) * sun * 1.4;
            gl_FragColor = vec4(color, 1.0);
          }`,
      }),
    [],
  );
  return (
    <mesh material={material}>
      <sphereGeometry args={[400, 32, 16]} />
    </mesh>
  );
}

function ContainerYard({ columnsPerSide, rows }: { columnsPerSide: number; rows: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const slots = useMemo(() => buildContainerYard({ columnsPerSide, rows }), [columnsPerSide, rows]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    slots.forEach((slot, i) => {
      dummy.position.set(slot.x, slot.y, slot.z);
      dummy.rotation.set(0, slot.across ? Math.PI / 2 : 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(CONTAINER_COLORS[slot.colorIndex]));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [slots]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, slots.length]}>
      <boxGeometry args={CONTAINER_SIZE} />
      <meshStandardMaterial roughness={0.55} metalness={0.35} />
    </instancedMesh>
  );
}

/** Lane markings in flamingo pink: the "boulevard" the camera follows. */
function Boulevard({ rows }: { rows: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = rows * 2;

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0.02, 25 - i * 4);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -100]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#120922" roughness={0.9} />
      </mesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.18, 0.02, 1.6]} />
        <meshBasicMaterial color="#ff4f8b" toneMapped={false} />
      </instancedMesh>
    </>
  );
}

/** Camera settles within this distance of its goal; then rendering stops. */
const SETTLED_DISTANCE = 0.01;

/**
 * Flies the camera with the scroll and drifts it with the pointer. The canvas
 * renders on demand: scroll and pointer events request frames, and the rig
 * keeps requesting them only until the camera reaches its goal. A still page
 * costs no GPU/CPU at all.
 */
function CameraRig({ animated }: { animated: boolean }) {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pointer = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!animated) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
      invalidate();
    };
    const onScroll = () => invalidate();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [animated, invalidate]);

  useFrame((_, delta) => {
    const p = animated ? heroProgress.current : 0;
    // Start high above the yard, then dive down the boulevard.
    const goal = target.set(pointer.current.x * 3, 16 - p * 11 - pointer.current.y * 1.5, 38 - p * 130);
    camera.position.lerp(goal, 1 - Math.exp(-Math.min(delta, 0.1) * 4));
    camera.lookAt(camera.position.x * 0.3, 2 + (1 - p) * 4, camera.position.z - 60);
    if (camera.position.distanceTo(goal) > SETTLED_DISTANCE) invalidate();
  });

  return null;
}

export interface CitySceneProps {
  /** Pauses rendering when the hero is off-screen. */
  active: boolean;
  /** False with prefers-reduced-motion: static camera, no scroll flight. */
  animated: boolean;
}

const COLUMNS_PER_SIDE = 4;
const ROWS = 26;

/** Desktop only — phones get StaticSkyline (see Hero.tsx). */
export default function CityScene({ active, animated }: CitySceneProps) {
  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={[1, 1.5]}
      camera={{ fov: 50, near: 0.5, far: 900, position: [0, 16, 38] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <fog attach="fog" args={[FOG, 30, 170]} />
      <hemisphereLight args={["#ffb08f", "#2a1347", 1.6]} />
      {/* Low sunset key light from the horizon, rim-lighting the stacks */}
      <directionalLight position={[0, 6, -120]} intensity={3.2} color="#ff7849" />
      <directionalLight position={[30, 40, 40]} intensity={0.35} color="#9a87a8" />
      <Sky />
      <ContainerYard columnsPerSide={COLUMNS_PER_SIDE} rows={ROWS} />
      <Boulevard rows={ROWS} />
      <CameraRig animated={animated} />
    </Canvas>
  );
}
