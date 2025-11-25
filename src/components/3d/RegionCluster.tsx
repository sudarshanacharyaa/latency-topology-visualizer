'use client';

import { useRef } from 'react';
import { Text, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { latLngToVector3, getProviderColor } from '@/lib/utils';
import type { CloudRegion } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedRegion } from '@/store/features/uiSlice';

interface Props {
  region: CloudRegion;
}

export function RegionCluster({ region }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.ui.selectedRegion?.id);
  const isSelected = selectedId === region.id;
  const color = getProviderColor(region.provider);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;  // Slow spin for clusters
    }
  });

  return (
    <group ref={groupRef} position={latLngToVector3(region.lat, region.lng, 5.05)}>
      {/* Cluster ring (boundary visual) */}
      <mesh onClick={() => dispatch(setSelectedRegion(region))}>
        <ringGeometry args={[0.2, 0.3, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} opacity={0.6} transparent />
      </mesh>

      {/* Info popup */}
      {isSelected && (
        <Html center distanceFactor={10}>
          <div className="bg-gray-900 text-white p-4 rounded-lg text-sm shadow-lg">
            <div className="font-bold">{region.name}</div>
            <div>{region.code} • {region.serverCount} servers</div>
            <div className="text-xs mt-1">Provider: {region.provider}</div>
          </div>
        </Html>
      )}

      <Text position={[0, 0.4, 0]} fontSize={0.08} color={color} anchorX="center">
        {region.code}
      </Text>
    </group>
  );
}