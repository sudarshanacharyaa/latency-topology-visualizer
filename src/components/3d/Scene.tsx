'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { Globe } from './Globe';
import { ExchangeMarker } from './ExchangeMarker';
import { RegionCluster } from './RegionCluster';
import { ConnectionLine } from './ConnectionLine';
import { HeatmapOverlay } from './HeatmapOverlay';
import { exchanges } from '@/data/exchanges';
import { regions } from '@/data/regions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetGlobalLatencyQuery } from '@/store/features/latencyApi';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

function SceneContent() {
  const { camera } = useThree();
  const { showConnections, showRegions, selectedProvider, selectedExchange } = useSelector((state: RootState) => state.ui);
  const { data: latencyData } = useGetGlobalLatencyQuery(undefined, { pollingInterval: 5000 });  // Real updates

  // Filter exchanges/regions
  const filteredExchanges = useMemo(() =>
    selectedProvider === 'All' ? exchanges : exchanges.filter(e => e.provider === selectedProvider),
    [selectedProvider]
  );

  const filteredRegions = useMemo(() =>
    selectedProvider === 'All' ? regions : regions.filter(r => r.provider === selectedProvider),
    [selectedProvider]
  );

  // Dynamic connections (real latency + mock pairs)
  const connections = useMemo(() => {
    const avg = latencyData?.result.data.slice(-1)[0]?.avg || 80;
    return filteredExchanges.flatMap((from, i) =>
      filteredExchanges.slice(i + 1).map(to => ({
        from,
        to,
        latency: avg + (Math.random() * 40 - 20),  // ±20ms variance
      }))
    );
  }, [filteredExchanges, latencyData]);

  // Camera transition to selection
  useEffect(() => {
    if (selectedExchange) {
      const target = latLngToVector3(selectedExchange.lat, selectedExchange.lng, 8);
      camera.position.lerp(target, 0.1);
      camera.lookAt(target);
    }
  }, [selectedExchange, camera]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 5]} intensity={1} />
      <Globe showRegions={showRegions} />

      {/* Markers */}
      {filteredExchanges.map(ex => <ExchangeMarker key={ex.id} exchange={ex} />)}
      {showRegions && filteredRegions.map(r => <RegionCluster key={r.id} region={r} />)}

      {/* Connections */}
      {showConnections && connections.map((conn, i) => (
        <ConnectionLine key={i} {...conn} />
      ))}

      {/* Bonus Heatmap */}
      <HeatmapOverlay />

      <OrbitControls
        enablePan enableZoom={true} enableRotate={true}
        minDistance={4} maxDistance={20}
        dampingFactor={0.05}  // Smooth 2025 feel
      />

      <Preload all />
    </>
  );
}

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);      // from north pole
  const theta = (lng + 180) * (Math.PI / 180);   // shift longitude
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z =  radius * Math.sin(phi) * Math.sin(theta);
  const y =  radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export function Scene() {
  return (
    <Canvas>
      <SceneContent />
    </Canvas>
  );
}
