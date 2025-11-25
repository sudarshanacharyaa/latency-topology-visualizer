'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetGlobalLatencyQuery } from '@/store/features/latencyApi';
import { Activity, Server, Zap } from 'lucide-react';

export function     MetricsDashboard() {
  const { historicalData } = useSelector((state: RootState) => state.ui);
  const { data } = useGetGlobalLatencyQuery();

  const avgLatency = data?.result.data.slice(-1)[0]?.avg || 0;
  const activeConnections = historicalData.length * 10;  // Mock
  const dataRate = '1.2k/s';  // Mock

  const stats = [
    { icon: Zap, label: 'Avg Latency', value: `${avgLatency}ms`, color: 'text-green-500' },
    { icon: Server, label: 'Connections', value: activeConnections.toString(), color: 'text-blue-500' },
    { icon: Activity, label: 'Data Rate', value: dataRate, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-4 p-4 bg-black/50 rounded-xl">
      <h3 className="font-semibold flex items-center space-x-2">
        <Zap className="w-5 h-5" />
        System Metrics
      </h3>
    <div className="flex flex-col gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
        <div key={i} className="text-center p-3 bg-gray-900 rounded-lg">
          <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
          <div className="text-lg text-white font-bold">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
        );
      })}
    </div>
    </div>
  );
}