'use client';

import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ScrollControls,
  Environment,
  ContactShadows,
  Grid,
  Preload,
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import LabModuleComponent from './LabModule';
import SceneCamera from './SceneCamera';
import Particles from './Particles';
import { LAB_MODULES, type LabModule } from '@/lib/moduleData';

// Total number of virtual scroll pages (controls scroll distance)
const SCROLL_PAGES = 5;

function LabFloor() {
  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial
          color="#060b14"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Grid overlay */}
      <Grid
        position={[0, -0.09, 0]}
        args={[24, 24]}
        cellSize={0.5}
        cellThickness={0.4}
        cellColor="#0d2030"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#0a2545"
        fadeDistance={18}
        fadeStrength={1.5}
        infiniteGrid={false}
      />

      {/* Central connector platform */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.2, 0.08, 1.2]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#00ff88"
          emissiveIntensity={0.12}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

function ConnectorLines() {
  const positions = new Float32Array([
    -2.2, 0.02, -1.8,   0, 0.02, 0,
     2.2, 0.02, -1.8,   0, 0.02, 0,
    -2.2, 0.02,  2.0,   0, 0.02, 0,
     2.2, 0.02,  2.0,   0, 0.02, 0,
  ]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#00ff88" transparent opacity={0.25} />
    </lineSegments>
  );
}

function SceneContent({
  selectedModule,
  onModuleSelect,
}: {
  selectedModule: string | null;
  onModuleSelect: (m: LabModule) => void;
}) {
  return (
    <>
      <LabFloor />
      <ConnectorLines />
      <Particles />

      {LAB_MODULES.map((mod) => (
        <LabModuleComponent
          key={mod.id}
          module={mod}
          onSelect={onModuleSelect}
          isSelected={selectedModule === mod.id}
        />
      ))}

      {/* Ambient + directional lights */}
      <ambientLight intensity={0.15} color="#0a1628" />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#c0d8ff" castShadow />
      <directionalLight position={[-5, 6, -5]} intensity={0.3} color="#00ff88" />

      {/* Fog */}
      <fog attach="fog" args={['#0a0e1a', 14, 28]} />

      <ContactShadows
        position={[0, -0.08, 0]}
        opacity={0.6}
        scale={16}
        blur={2.5}
        far={5}
        color="#000510"
      />

      <Environment preset="night" />
    </>
  );
}

interface LabSceneProps {
  onModuleSelect?: (module: LabModule | null) => void;
}

export default function LabScene({ onModuleSelect }: LabSceneProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [cameraFocus, setCameraFocus] = useState<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);

  const handleModuleSelect = useCallback(
    (module: LabModule) => {
      if (selectedModule === module.id) {
        setSelectedModule(null);
        setCameraFocus(null);
        onModuleSelect?.(null);
      } else {
        setSelectedModule(module.id);
        setCameraFocus({
          position: new THREE.Vector3(...module.cameraPosition),
          target: new THREE.Vector3(...module.cameraTarget),
        });
        onModuleSelect?.(module);
      }
    },
    [selectedModule, onModuleSelect]
  );

  const handleFocusDone = useCallback(() => {
    setCameraFocus(null);
  }, []);

  return (
    <div className="canvas-container">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ fov: 50, near: 0.1, far: 100, position: [7, 7, 7] }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={SCROLL_PAGES} damping={0.25}>
            <SceneCamera
              focusTarget={cameraFocus?.target ?? null}
              focusPosition={cameraFocus?.position ?? null}
              onFocusDone={handleFocusDone}
            />
            <SceneContent
              selectedModule={selectedModule}
              onModuleSelect={handleModuleSelect}
            />
          </ScrollControls>

          <EffectComposer>
            <Bloom
              intensity={1.4}
              luminanceThreshold={0.55}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0005, 0.0005)}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
