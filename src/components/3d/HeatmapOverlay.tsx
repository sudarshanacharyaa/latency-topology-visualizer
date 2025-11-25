'use client';

import { useMemo } from 'react';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { getHeatmapColor } from '@/lib/utils';
import { useGetGlobalLatencyQuery } from '@/store/features/latencyApi';

export function HeatmapOverlay() {
  const { data } = useGetGlobalLatencyQuery();

  const avgLatency = data?.result.data.slice(-1)[0]?.avg || 50;
  const intensity = Math.min(avgLatency / 200, 1);  // 0-1 scale

  const material = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    // Procedural heatmap texture (green low, red high)
    for (let x = 0; x < 1024; x++) {
      for (let y = 0; y < 512; y++) {
        const hue = (1 - intensity) * 120;
        ctx.fillStyle = getHeatmapColor(intensity);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.4 });
  }, [intensity]);

  return (
    <Sphere args={[5.01, 64, 64]}>
      <primitive object={material} attach="material" />
    </Sphere>
  );
}