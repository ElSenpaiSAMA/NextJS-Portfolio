"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { buildClusterTopology, heroScroll, seededRandom, type ClusterTopology } from "../../lib/cluster-topology";

// WebGL can't read CSS variables: these mirror the console tokens in globals.css.
const COLORS = {
  console: "#0a0f1a",
  node: "#1a2740",
  nodeLit: "#5cc8ff",
  edge: "#5cc8ff",
  amber: "#ffb547",
  cyan: "#5cc8ff",
};

const NODE_COUNT = 46;
const PACKET_COUNT = 70;

interface Packet {
  from: number;
  to: number;
  t: number;
  speed: number;
}

/** Round, soft sprite for the packets (points are squares by default). */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.8)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

function Cluster({ topology, animate }: { topology: ClusterTopology; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const dot = useDotTexture();
  const { nodes, edges, neighbours } = topology;

  // Static geometry: edge segments and the packets' buffers.
  const edgePositions = useMemo(() => {
    const array = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      array.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], i * 6);
    });
    return array;
  }, [nodes, edges]);

  // Wireframe outline of every node, merged into one draw call.
  const outlinePositions = useMemo(() => {
    const box = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1.35, 1));
    const source = box.attributes.position.array as Float32Array;
    const out = new Float32Array(source.length * nodes.length);
    const matrix = new THREE.Matrix4();
    const vector = new THREE.Vector3();
    nodes.forEach((node, n) => {
      matrix.compose(
        new THREE.Vector3(node.x, node.y, node.z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, node.x * 0.6, 0)),
        new THREE.Vector3(node.size, node.size, node.size),
      );
      for (let i = 0; i < source.length; i += 3) {
        vector.set(source[i], source[i + 1], source[i + 2]).applyMatrix4(matrix);
        out.set([vector.x, vector.y, vector.z], n * source.length + i);
      }
    });
    box.dispose();
    return out;
  }, [nodes]);

  const { initialPackets, packetPositions, packetColors } = useMemo(() => {
    const random = seededRandom(42);
    const amber = new THREE.Color(COLORS.amber);
    const cyan = new THREE.Color(COLORS.cyan);
    const list: Packet[] = [];
    const colors = new Float32Array(PACKET_COUNT * 3);
    for (let i = 0; i < PACKET_COUNT; i++) {
      const [from, to] = edges[Math.floor(random() * edges.length)];
      list.push({ from, to, t: random(), speed: 0.35 + random() * 0.55 });
      (random() < 0.4 ? amber : cyan).toArray(colors, i * 3);
    }
    return { initialPackets: list, packetPositions: new Float32Array(PACKET_COUNT * 3), packetColors: colors };
  }, [edges]);

  // Simulation state mutated every frame lives in refs, not memoised values.
  const packetsRef = useRef<Packet[]>(initialPackets);
  // Per-node glow, raised when a packet arrives and decaying back.
  const glowRef = useRef(new Float32Array(NODE_COUNT));
  const baseColor = useMemo(() => new THREE.Color(COLORS.node), []);
  const litColor = useMemo(() => new THREE.Color(COLORS.nodeLit), []);
  const scratch = useMemo(() => new THREE.Color(), []);
  const random = useMemo(() => seededRandom(99), []);

  useLayoutEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    nodes.forEach((node, i) => {
      dummy.position.set(node.x, node.y, node.z);
      dummy.scale.setScalar(node.size);
      dummy.rotation.set(0, node.x * 0.6, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, baseColor);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes, baseColor]);

  useFrame((state, rawDelta) => {
    const g = group.current;
    const mesh = nodesRef.current;
    const points = pointsRef.current;
    if (!g || !mesh || !points) return;
    const delta = Math.min(rawDelta, 0.05);
    const progress = heroScroll.progress;

    if (animate) {
      // Slow spin + a tilt that follows the pointer.
      g.rotation.y += delta * 0.07;
      g.rotation.x += (state.pointer.y * 0.18 - g.rotation.x) * 0.05;
      g.position.x += (1.7 + state.pointer.x * 0.25 - g.position.x) * 0.05;
    }
    // Scrolling away pulls the camera back and lifts the cluster.
    state.camera.position.z = 8 + progress * 3.5;
    g.position.y = progress * 0.9;

    const positions = points.geometry.attributes.position as THREE.BufferAttribute;
    const glow = glowRef.current;
    packetsRef.current.forEach((packet, i) => {
      if (animate) packet.t += delta * packet.speed;
      if (packet.t >= 1) {
        glow[packet.to] = 1;
        const options = neighbours[packet.to];
        packet.from = packet.to;
        packet.to = options[Math.floor(random() * options.length)];
        packet.t -= 1;
      }
      const a = nodes[packet.from];
      const b = nodes[packet.to];
      positions.setXYZ(i, a.x + (b.x - a.x) * packet.t, a.y + (b.y - a.y) * packet.t, a.z + (b.z - a.z) * packet.t);
    });
    positions.needsUpdate = true;

    for (let i = 0; i < nodes.length; i++) {
      glow[i] = Math.max(0, glow[i] - delta * 1.6);
      mesh.setColorAt(i, scratch.copy(baseColor).lerp(litColor, glow[i] * 0.85));
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={group} position={[1.7, 0, 0]} rotation={[0.15, 0.4, 0]}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]}>
        <boxGeometry args={[1, 1.35, 1]} />
        <meshStandardMaterial roughness={0.45} metalness={0.3} emissive={COLORS.node} emissiveIntensity={0.35} />
      </instancedMesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[outlinePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={COLORS.edge} transparent opacity={0.45} />
      </lineSegments>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={COLORS.edge} transparent opacity={0.16} />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packetPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[packetColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={dot}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

interface ClusterSceneProps {
  /** false: draw one still frame (reduced motion). */
  animate: boolean;
  /** false: stop rendering entirely (hero off screen). */
  visible: boolean;
}

/**
 * The hero's 3D cluster: server nodes wired into a network, with data
 * packets travelling the cables and lighting each node they reach.
 * Transparent canvas over the page background; decorative only.
 */
export default function ClusterScene({ animate, visible }: ClusterSceneProps) {
  const topology = useMemo(() => buildClusterTopology(NODE_COUNT), []);
  const frameloop = !visible ? "never" : animate ? "always" : "demand";

  // Fade in once the first frame is drawn, instead of popping.
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => wrapper.current?.classList.add("opacity-100"));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full opacity-0 transition-opacity duration-1000">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden="true"
      >
        <fog attach="fog" args={[COLORS.console, 7, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[-4, 3, 5]} intensity={30} color={COLORS.cyan} />
        <pointLight position={[5, -3, 4]} intensity={22} color={COLORS.amber} />
        <Cluster topology={topology} animate={animate} />
      </Canvas>
    </div>
  );
}
