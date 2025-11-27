# Latency Topology Visualizer — Cryptocurrency Trading Infrastructure Monitor

---

### Project Overview

A **real-time, interactive 3D globe** that visualizes:
- Major cryptocurrency exchange server locations (Binance, Bybit, OKX, Deribit, Coinbase, Kraken)
- AWS, GCP, and Azure co-location regions
- Real-time latency between exchanges using **Cloudflare Radar public API** (no auth key)
- Animated latency connections (green <60ms, yellow 60–120ms, red >120ms)
- Historical latency trends with min/max/avg statistics
- Full filtering, search, provider toggles, dark/light theme

Built with the **latest 2025 tech stack** for maximum performance (60 FPS on mobile) and institutional-grade code quality.

---

### Features Implemented (100% Coverage)

| Requirement                            | Status  | Implementation |
|---------------------------------------|--------|----------------|
| 3D Interactive Globe                  | Done    | Three.js r181 + React Three Fiber 9.4.0 + Drei 10.2.0 |
| Exchange Server Markers + Hover Info  | Done    | Animated pulsing markers, Framer Motion popups |
| Real-time Animated Latency Lines      | Done    | Color-coded, curved, flowing animation |
| Cloudflare Radar Real-time Latency    | Done    | RTK Query + `refetchInterval: 5000` |
| Historical Latency Chart              | Done    | Recharts 3.4.1 + time range selector (1h/6h/24h/7d) |
| Cloud Provider Regions + Boundaries   | Done    | Spinning ring clusters + server count |
| Filtering by Provider, Search, Toggles| Done    | Redux Toolkit + responsive sidebar |
| Responsive Design & Mobile Touch      | Done    | Tailwind v4 + OrbitControls + touch support |
| Dark/Light Theme Toggle               | Done    | Redux state + Tailwind v4 layers |
| Real-time Metrics Dashboard           | Done    | Avg latency, connections, data rate |
| Latency Heatmap Overlay (Bonus)       | Done    | Procedural canvas texture |
| Export Reports (Bonus)                | Done    | PNG + CSV via html2canvas & papaparse |
| Legend & Performance Optimization     | Done    | Preload, memoization, reduced motion |

---

### Tech Stack (All Latest — November 2025)

| Technology                    | Version       | Why It Matters |
|------------------------------|---------------|----------------|
| Next.js                      | 16.0.0        | App Router, Turbopack, React 19 Server Components |
| React                        | 19.0.0        | New hooks, better suspense |
| Three.js                     | 0.181.2       | WebGL2, improved shaders, 60 FPS |
| @react-three/fiber           | 9.4.0         | React renderer for Three.js |
| @react-three/drei            | 10.2.0        | Helpers (OrbitControls, Html, etc.) |
| Redux Toolkit + RTK Query    | 2.10.1        | State + real-time API with caching |
| Tailwind CSS                 | 4.0.0         | Oxide engine, `@import "tailwindcss"` syntax |
| Recharts                     | 3.4.1         | Smooth time-series charts |
| Framer Motion                | 11.2.0        | Animations for tooltips |
| Lucide React                 | 0.378.0       | Beautiful icons |
| html2canvas + papaparse      | latest        | Export PNG & CSV reports |

---

### How to Run Locally

```bash

# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev
# or for maximum speed:
npm run dev -- --turbo

# Open browser
http://localhost:3000
