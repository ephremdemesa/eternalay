'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { SCROLL_SECTIONS } from '@/lib/moduleData';

interface SceneCameraProps {
  focusTarget: THREE.Vector3 | null;
  focusPosition: THREE.Vector3 | null;
  onFocusDone: () => void;
}

const tempPos = new THREE.Vector3();
const tempTarget = new THREE.Vector3();

export default function SceneCamera({ focusTarget, focusPosition, onFocusDone }: SceneCameraProps) {
  const { camera } = useThree();
  const scroll = useScroll();
  const targetRef = useRef(new THREE.Vector3());
  const isFocusing = useRef(false);
  const focusDoneTimer = useRef(0);

  useFrame((_, delta) => {
    const offset = scroll.offset; // 0 → 1

    if (focusPosition && focusTarget) {
      // Override: user clicked a module
      isFocusing.current = true;
      tempPos.copy(focusPosition);
      tempTarget.copy(focusTarget);
      focusDoneTimer.current += delta;
      if (focusDoneTimer.current > 2.0) {
        focusDoneTimer.current = 0;
        onFocusDone();
      }
    } else {
      isFocusing.current = false;
      focusDoneTimer.current = 0;

      // Find which scroll section we're in
      let section = SCROLL_SECTIONS[0];
      for (const s of SCROLL_SECTIONS) {
        if (offset >= s.scrollRange[0] && offset <= s.scrollRange[1]) {
          section = s;
          break;
        }
      }

      // Interpolate between prev and next section for smooth blending
      const [start, end] = section.scrollRange;
      const t = end > start ? (offset - start) / (end - start) : 0;

      // Get next section for interpolation
      const currentIdx = SCROLL_SECTIONS.indexOf(section);
      const nextSection = SCROLL_SECTIONS[Math.min(currentIdx + 1, SCROLL_SECTIONS.length - 1)];

      tempPos.lerpVectors(section.cameraPosition, nextSection.cameraPosition, t);
      tempTarget.lerpVectors(section.cameraTarget, nextSection.cameraTarget, t);
    }

    // Smooth camera movement
    camera.position.lerp(tempPos, delta * 2.5);
    targetRef.current.lerp(tempTarget, delta * 2.5);
    camera.lookAt(targetRef.current);
  });

  return null;
}
