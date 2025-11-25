'use client';

import { Line } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line2, LineSegments2 } from 'three-stdlib';
import { latLngToVector3, getLatencyColor } from '@/lib/utils';
import type { Exchange } from '@/types';

interface Props {
  from: Exchange;
  to: Exchange;
  latency: number;
}

export function ConnectionLine({ from, to, latency }: Props) {
  const lineRef = useRef<Line2 | LineSegments2 | null>(null);
  const color = getLatencyColor(latency);

  const points = [
    latLngToVector3(from.lat, from.lng, 5.1),
    latLngToVector3(to.lat, to.lng, 5.1),
  ];

  useFrame((state) => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime * 2;  // Pulse speed
      for (let i = 0; i < positions.length; i += 3) {
        const progress = (time * 0.5 + (i / positions.length)) % 2;
        positions[i + 1] += Math.sin(progress * Math.PI) * 0.2;  // Arc animation
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={3}
      opacity={0.8}
      transparent
      castShadow
    />
  );
}