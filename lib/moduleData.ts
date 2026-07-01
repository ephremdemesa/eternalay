import * as THREE from 'three';

export interface LabModule {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  color: string;
  accentColor: string;
  glowColor: string;
  icon: string;
  size: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
}

export const LAB_MODULES: LabModule[] = [
  {
    id: 'ai-core',
    label: 'AI Core',
    description:
      'Neural network inference engine powering intelligent automation and ML pipelines.',
    position: [-2.2, 0, -1.8],
    color: '#0a1628',
    accentColor: '#00ff88',
    glowColor: '#00ff88',
    icon: '⬡',
    size: [2.4, 0.15, 2.4],
    cameraTarget: [-2.2, 0.8, -1.8],
    cameraPosition: [-2.2, 3.5, 2.2],
  },
  {
    id: 'cloud-infra',
    label: 'Cloud Infrastructure',
    description:
      'Auto-scaling Kubernetes clusters with multi-region failover and 99.99% SLA.',
    position: [2.2, 0, -1.8],
    color: '#0a1a28',
    accentColor: '#00d4ff',
    glowColor: '#00d4ff',
    icon: '☁',
    size: [2.8, 0.15, 2.4],
    cameraTarget: [2.2, 0.8, -1.8],
    cameraPosition: [2.2, 3.5, 2.2],
  },
  {
    id: 'security-matrix',
    label: 'Security Matrix',
    description:
      'Zero-trust architecture with end-to-end encryption and real-time threat detection.',
    position: [-2.2, 0, 2.0],
    color: '#140a1e',
    accentColor: '#a855f7',
    glowColor: '#a855f7',
    icon: '⬡',
    size: [2.4, 0.15, 2.0],
    cameraTarget: [-2.2, 0.8, 2.0],
    cameraPosition: [-2.2, 3.5, 5.5],
  },
  {
    id: 'dev-hub',
    label: 'Dev Hub',
    description:
      'CI/CD pipelines, automated testing, and collaborative engineering workflows.',
    position: [2.2, 0, 2.0],
    color: '#0a1a14',
    accentColor: '#f59e0b',
    glowColor: '#f59e0b',
    icon: '◈',
    size: [2.8, 0.15, 2.0],
    cameraTarget: [2.2, 0.8, 2.0],
    cameraPosition: [2.2, 3.5, 5.5],
  },
];

export const SCROLL_SECTIONS = [
  {
    id: 'overview',
    cameraPosition: new THREE.Vector3(7, 7, 7),
    cameraTarget: new THREE.Vector3(0, 0, 0),
    scrollRange: [0, 0.2],
  },
  {
    id: 'ai-core',
    cameraPosition: new THREE.Vector3(-1.5, 4, 3),
    cameraTarget: new THREE.Vector3(-2.2, 0.5, -1.8),
    scrollRange: [0.2, 0.45],
  },
  {
    id: 'cloud-infra',
    cameraPosition: new THREE.Vector3(3.5, 4, 3),
    cameraTarget: new THREE.Vector3(2.2, 0.5, -1.8),
    scrollRange: [0.45, 0.65],
  },
  {
    id: 'security-matrix',
    cameraPosition: new THREE.Vector3(-1.5, 4, 5),
    cameraTarget: new THREE.Vector3(-2.2, 0.5, 2.0),
    scrollRange: [0.65, 0.85],
  },
  {
    id: 'dev-hub',
    cameraPosition: new THREE.Vector3(3.5, 4, 5),
    cameraTarget: new THREE.Vector3(2.2, 0.5, 2.0),
    scrollRange: [0.85, 1.0],
  },
];
