import type { CloudRegion } from '@/types';

export const regions: CloudRegion[] = [
  { id: 'aws-tokyo', name: 'Tokyo (AWS)', provider: 'AWS', code: 'ap-northeast-1', lat: 35.6762, lng: 139.6503, serverCount: 45 },
  { id: 'aws-singapore', name: 'Singapore (AWS)', provider: 'AWS', code: 'ap-southeast-1', lat: 1.3521, lng: 103.8198, serverCount: 32 },
  { id: 'azure-hk', name: 'Hong Kong (Azure)', provider: 'Azure', code: 'eastasia', lat: 22.3193, lng: 114.1694, serverCount: 28 },
  { id: 'gcp-ams', name: 'Amsterdam (GCP)', provider: 'GCP', code: 'europe-west4', lat: 52.3676, lng: 4.9041, serverCount: 41 },
  { id: 'aws-fra', name: 'Frankfurt (AWS)', provider: 'AWS', code: 'eu-central-1', lat: 50.1109, lng: 8.6821, serverCount: 37 },
  { id: 'gcp-lon', name: 'London (GCP)', provider: 'GCP', code: 'europe-west2', lat: 51.5074, lng: -0.1276, serverCount: 29 },
];