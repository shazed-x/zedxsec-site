import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  OrbitControls,
  Sparkles,
  Icosahedron,
  Torus,
  Octahedron,
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';

const ACID = '#D4FF00';
const CYAN = '#00E5FF';

function SpinningCore() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.2;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  return (
    <group ref={ref}>
      <Icosahedron args={[1.4, 0]}>
        <meshStandardMaterial
          color={ACID}
          emissive={ACID}
          emissiveIntensity={0.6}
          wireframe
        />
      </Icosahedron>
      <Icosahedron args={[1.05, 0]}>
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.85}
          roughness={0.25}
        />
      </Icosahedron>
    </group>
  );
}

function OrbitingShapes() {
  const group = useRef();
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <Octahedron args={[0.45]} position={[3.2, 0.5, -0.5]}>
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.4}
            metalness={0.4}
            roughness={0.3}
          />
        </Octahedron>
      </Float>

      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.5}>
        <Torus args={[0.55, 0.04, 16, 64]} position={[-3.3, -0.4, -0.8]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color={ACID}
            emissive={ACID}
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.2}
          />
        </Torus>
      </Float>

      <Float speed={0.9} rotationIntensity={0.8} floatIntensity={0.8}>
        <Octahedron args={[0.32]} position={[2.4, -1.8, 0.6]}>
          <meshStandardMaterial color="#ffffff" wireframe opacity={0.5} transparent />
        </Octahedron>
      </Float>

      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.0}>
        <Icosahedron args={[0.28, 0]} position={[-2.6, 1.6, 0.4]}>
          <meshStandardMaterial color={CYAN} wireframe />
        </Icosahedron>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 6, 14]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color={ACID} />
      <pointLight position={[-5, -3, -3]} intensity={0.8} color={CYAN} />
      <directionalLight position={[0, 4, 2]} intensity={0.4} />

      <SpinningCore />
      <OrbitingShapes />

      <Sparkles count={80} scale={[10, 6, 6]} size={2} speed={0.4} color={ACID} opacity={0.6} />
      <Sparkles count={40} scale={[12, 8, 8]} size={1.2} speed={0.2} color={CYAN} opacity={0.5} />

      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
    </>
  );
}

export default function HeroScene({ interactive = true }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      data-testid="hero-3d-canvas"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.7}
        />
      )}
    </Canvas>
  );
}
