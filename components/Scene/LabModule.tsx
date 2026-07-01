'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { LabModule } from '@/lib/moduleData';

interface LabModuleProps {
  module: LabModule;
  onSelect: (module: LabModule) => void;
  isSelected: boolean;
}

function ServerRack({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.28, 0.9, 0.22]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#0d1117" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, -0.3 + i * 0.15, 0.12]}>
          <boxGeometry args={[0.22, 0.04, 0.01]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function GlowingSphere({ color, intensity }: { color: string; intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = intensity * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.3);
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0.6, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        transparent
        opacity={0.85}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
}

function HologramRing({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.6;
      ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.6, 0]}>
      <torusGeometry args={[0.45, 0.02, 8, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.6} />
    </mesh>
  );
}

function WorkstationDesk({ accentColor }: { accentColor: string }) {
  return (
    <group>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.7, 0.05, 0.45]} />
        <meshStandardMaterial color="#1a2030" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.28, -0.1]}>
        <boxGeometry args={[0.5, 0.32, 0.02]} />
        <meshStandardMaterial color="#0d1117" emissive={accentColor} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.3, 0.21, 0.1]}>
        <cylinderGeometry args={[0.07, 0.05, 0.1, 16]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function LabModuleComponent({ module, onSelect, isSelected }: LabModuleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const pulseRef = useRef(0);

  const isActive = hovered || isSelected;

  useFrame((state, delta) => {
    if (!groupRef.current || !platformRef.current) return;

    // Hover scale
    const targetScale = isActive ? 1.04 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    );

    // Pulse glow on platform
    pulseRef.current += delta * (isActive ? 3 : 1);
    const pulse = Math.sin(pulseRef.current) * 0.5 + 0.5;
    const mat = platformRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = isActive ? 0.3 + pulse * 0.4 : 0.05 + pulse * 0.05;
  });

  const floorY = module.size[1] / 2;

  const moduleContent = useMemo(() => {
    switch (module.id) {
      case 'ai-core':
        return (
          <group>
            <GlowingSphere color={module.accentColor} intensity={isActive ? 1.5 : 0.8} />
            <HologramRing color={module.accentColor} />
            <ServerRack position={[-0.7, floorY + 0.45, 0.1]} color={module.accentColor} />
            <ServerRack position={[0.7, floorY + 0.45, 0.1]} color={module.accentColor} />
          </group>
        );
      case 'cloud-infra':
        return (
          <group>
            {[[-0.7, floorY + 0.45, 0], [0, floorY + 0.45, 0], [0.7, floorY + 0.45, 0], [0.35, floorY + 0.45, -0.6]].map(
              ([x, y, z], i) => (
                <ServerRack key={i} position={[x, y, z] as [number, number, number]} color={module.accentColor} />
              )
            )}
          </group>
        );
      case 'security-matrix':
        return (
          <group>
            {Array.from({ length: 9 }).map((_, i) => {
              const x = (i % 3 - 1) * 0.5;
              const z = (Math.floor(i / 3) - 1) * 0.5;
              return (
                <mesh key={i} position={[x, floorY + 0.12 + Math.random() * 0.1, z]}>
                  <boxGeometry args={[0.18, 0.18, 0.18]} />
                  <meshStandardMaterial
                    color={module.accentColor}
                    emissive={module.accentColor}
                    emissiveIntensity={0.3 + i * 0.05}
                    transparent
                    opacity={0.6}
                    wireframe={i % 2 === 0}
                  />
                </mesh>
              );
            })}
          </group>
        );
      case 'dev-hub':
        return (
          <group>
            <WorkstationDesk accentColor={module.accentColor} />
            <WorkstationDesk accentColor={module.accentColor} />
          </group>
        );
      default:
        return null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module.id, module.accentColor, isActive, floorY]);

  return (
    <group
      ref={groupRef}
      position={module.position}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      onClick={(e) => { e.stopPropagation(); onSelect(module); }}
    >
      {/* Glass platform base */}
      <mesh ref={platformRef} position={[0, 0, 0]}>
        <boxGeometry args={module.size} />
        <meshStandardMaterial
          color={module.color}
          emissive={module.accentColor}
          emissiveIntensity={0.05}
          transparent
          opacity={0.9}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>

      {/* Platform rim glow */}
      <mesh position={[0, module.size[1] / 2, 0]}>
        <boxGeometry args={[module.size[0], 0.01, module.size[2]]} />
        <meshStandardMaterial
          color={module.accentColor}
          emissive={module.accentColor}
          emissiveIntensity={isActive ? 2 : 0.5}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Point light per module */}
      <pointLight
        position={[0, 1.2, 0]}
        color={module.accentColor}
        intensity={isActive ? 3 : 0.8}
        distance={4}
        decay={2}
      />

      {/* Module content */}
      {moduleContent}

      {/* Floating label */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.18}
          color={module.accentColor}
          anchorX="center"
          anchorY="middle"
        >
          {module.label}
        </Text>
      </Float>
    </group>
  );
}
