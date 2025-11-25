import { getProviderColor } from '@/lib/utils';
import { getLatencyColor } from '@/lib/utils';

export function Legend() {
  const providers = ['AWS', 'GCP', 'Azure'] as const;
  const latencyRanges = [
    { label: 'Low (<60ms)', color: getLatencyColor(50) },
    { label: 'Medium (60-120ms)', color: getLatencyColor(90) },
    { label: 'High (>120ms)', color: getLatencyColor(150) },
  ];

  return (
    <div className="space-y-4 p-4 mb-3 bg-black/50 rounded-xl">
      <h3 className="font-semibold flex items-center space-x-2">
        <span>Legend</span>
      </h3>
      <div>
        <h4 className="text-sm opacity-80 mb-2">Providers</h4>
        {providers.map(p => (
          <div key={p} className="flex items-center space-x-2 text-sm">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getProviderColor(p) }} />
            <span>{p}</span>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-sm opacity-80 mb-2">Latency</h4>
        {latencyRanges.map(range => (
          <div key={range.label} className="flex items-center space-x-2 text-sm">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: range.color }} />
            <span>{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}