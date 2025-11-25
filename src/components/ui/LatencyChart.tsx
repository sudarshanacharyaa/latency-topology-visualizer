'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';

export function LatencyChart() {
  const { historicalData, timeRange } = useSelector((state: RootState) => state.ui);

  // Filter by time range (mock for demo)
  const filteredData = historicalData.filter(d => {
    // Implement range logic here (e.g., last 1h data)
    return true;  // Placeholder
  });

  // Stats
  const latencies = filteredData.map(d => d.latency);
  const min = Math.min(...latencies);
  const max = Math.max(...latencies);
  const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length || 0;

  return (
    <div className="bg-black/50 rounded-xl p-4">
      <div className="flex flex-col justify-between mb-4">
        <h3 className="font-semibold">Historical Latency</h3>
        <div className="text-xs space-x-2">
          <div>Min: {min}ms</div>
          <div>Max: {max}ms</div>
          <div>Avg: {avg.toFixed(1)}ms</div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              tickFormatter={(t) => {
                let date: Date;
                if (typeof t === 'string') {
                  date = parseISO(t);
                } else {
                  date = new Date(t);
                }
                if (isNaN(date.getTime())) return '';
                return format(date, 'HH:mm');
              }} 
              stroke="#9CA3AF"
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip formatter={(value) => [`${value}ms`, 'Latency']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="latency" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
              zIndex={10}  // v3.4.1 feature
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time selectors */}
      <div className="flex space-x-2 mt-4">
        {['1h', '6h', '24h', '7d'].map(range => (
          <button key={range} className="px-3 py-1 rounded text-xs bg-white/80 hover:bg-white/20 transition-colors">
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}