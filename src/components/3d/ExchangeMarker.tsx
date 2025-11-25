'use client';

import { useRef, useState } from 'react';
import { Text, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { latLngToVector3, getProviderColor } from '@/lib/utils';
import type { Exchange } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedExchange } from '@/store/features/uiSlice';
import { motion } from 'framer-motion';

interface Props {
  exchange: Exchange;
}

export function ExchangeMarker({ exchange }: Props) {
  const meshRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>>(null);
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.ui.selectedExchange?.id);

  const isSelected = selectedId === exchange.id;
  const color = getProviderColor(exchange.provider);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing animation (perf: sin wave)
      meshRef.current.position.y = 5.1 + Math.sin(state.clock.elapsedTime * 3) * 0.02;
      meshRef.current.scale.setScalar(isSelected ? 1.5 : hovered ? 1.2 : 1);
      meshRef.current.material.emissiveIntensity = hovered ? 1 : 0.5;
    }
  });

  return (
    <group position={latLngToVector3(exchange.lat, exchange.lng, 5.1)}>
      <mesh
        ref={meshRef}
        onClick={() => dispatch(setSelectedExchange(exchange))}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} />
      </mesh>

      {/* Hover popup */}
      {hovered && (
        <Html center distanceFactor={10}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/95 text-white p-3 rounded-lg text-xs border border-gray-700 whitespace-nowrap"
          >
            <div className="font-bold">{exchange.name}</div>
            <div className="text-gray-300">{exchange.location}</div>
            <div className="text-xs mt-1 flex items-center">
              <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: color }} />
              {exchange.provider} • {exchange.region}
            </div>
          </motion.div>
        </Html>
      )}

      {/* Label */}
      <Text position={[0, 0.3, 0]} fontSize={0.1} color="white" anchorX="center">
        {exchange.name.slice(0, 4)}  {/* Shorten for mobile */}
      </Text>
    </group>
  );
}