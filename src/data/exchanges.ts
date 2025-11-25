import type { Exchange } from '@/types';

export const exchanges: Exchange[] = [
  { id: 'binance', name: 'Binance', location: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, provider: 'AWS', region: 'ap-northeast-1' },
  { id: 'bybit', name: 'Bybit', location: 'Singapore', lat: 1.3521, lng: 103.8198, provider: 'AWS', region: 'ap-southeast-1' },
  { id: 'okx', name: 'OKX', location: 'Hong Kong', lat: 22.3193, lng: 114.1694, provider: 'Azure', region: 'eastasia' },
  { id: 'deribit', name: 'Deribit', location: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041, provider: 'GCP', region: 'europe-west4' },
  { id: 'coinbase', name: 'Coinbase Pro', location: 'Frankfurt, Germany', lat: 50.1109, lng: 8.6821, provider: 'AWS', region: 'eu-central-1' },
  { id: 'kraken', name: 'Kraken', location: 'London, UK', lat: 51.5074, lng: -0.1276, provider: 'GCP', region: 'europe-west2' },
];