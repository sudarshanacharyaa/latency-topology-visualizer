export type Provider = 'AWS' | 'GCP' | 'Azure';

export interface Exchange {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  provider: Provider;
  region: string;
}

export interface CloudRegion {
  id: string;
  name: string;
  provider: Provider;
  code: string;
  lat: number;
  lng: number;
  serverCount: number;
}

export interface LatencyPoint {
  from: string;
  to: string;
  latency: number;  // ms
  timestamp: number;
}

export interface HistoricalData {
  time: string;
  latency: number;
  min: number;
  max: number;
  avg: number;
}