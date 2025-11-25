import * as THREE from 'three';

export const latLngToVector3 = (lat: number, lng: number, radius = 5): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

export const getProviderColor = (provider: string): string => {
  return provider === 'AWS' ? '#FF9900' : provider === 'GCP' ? '#EA4335' : '#4285F4';
};

export const getLatencyColor = (ms: number): string => {
  if (ms < 60) return '#10B981';  // Green low
  if (ms < 120) return '#F59E0B'; // Yellow medium
  return '#EF4444';              // Red high
};

// Bonus: Heatmap intensity
export const getHeatmapColor = (intensity: number): string => {
  const hue = (1 - intensity) * 120; // Green to red
  return `hsl(${hue}, 100%, 50%)`;
};