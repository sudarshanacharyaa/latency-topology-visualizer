import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function Globe({ showRegions }: { showRegions: boolean }) {
  return (
    <>
      {/* Base globe */}
      <Sphere args={[5, 128, 128]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#0f172a"
          emissive="#1e293b"
          emissiveIntensity={0.3}
          shininess={100}  // r181 shine
        />
      </Sphere>

      {/* Wireframe (subtle) */}
      {showRegions && (
        <Sphere args={[5.02, 64, 64]}>
          <meshBasicMaterial color="#334155" wireframe opacity={0.1} />
        </Sphere>
      )}
    </>
  );
}