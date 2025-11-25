'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  setSearchQuery, setProviderFilter, toggleConnections, toggleRegions, setTimeRange 
} from '@/store/features/uiSlice';
import { Search, Filter, Server, Activity } from 'lucide-react';
import { exchanges } from '@/data/exchanges';
import { LatencyChart } from './LatencyChart';
import { MetricsDashboard } from './MetricsDashboard';
import { Legend } from './Legend';

export function Sidebar() {
  const dispatch = useDispatch();
    const { darkMode } = useSelector((state: RootState) => state.ui);
  const { searchQuery, selectedProvider, showConnections, showRegions, timeRange } = useSelector((state: RootState) => state.ui);

  const filteredExchanges = exchanges.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-80 border-l p-6 overflow-y-auto h-screen pb-25 ${
      darkMode 
        ? 'bg-black/90 border-gray-800 text-white' 
        : 'bg-black/0 border-gray-200 text-black'
    }`}>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search exchanges..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
            darkMode 
              ? 'border-gray-700 bg-transparent text-white' 
              : 'border-gray-300 bg-white text-black'
          }`}
        />
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-6 ">
        <h3 className="font-semibold flex items-center space-x-2">
          <Filter className="w-5 h-5 mr-1" />
          Filters
        </h3>

        <label className="flex items-center justify-between cursor-pointer">
          <span>Show Connections</span>
          <input
            type="checkbox"
            checked={showConnections}
            onChange={() => dispatch(toggleConnections())}
            className="w-5 h-5 rounded text-blue-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span>Show Regions</span>
          <input
            type="checkbox"
            checked={showRegions}
            onChange={() => dispatch(toggleRegions())}
            className="w-5 h-5 rounded text-blue-500"
          />
        </label>

        <div>
          <span className="block mb-2 text-sm opacity-80">Provider</span>
          {(['All', 'AWS', 'GCP', 'Azure'] as const).map(p => (
            <label key={p} className="block cursor-pointer">
              <input
                type="radio"
                name="provider"
                checked={selectedProvider === p}
                onChange={() => dispatch(setProviderFilter(p))}
                className="mr-2"
              />
              {p}
            </label>
          ))}
            </div>
      </div>

      {/* Exchanges List */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center space-x-2">
          <Server className="w-5 h-5 mr-1" />
          Exchanges ({filteredExchanges.length})
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredExchanges.map(ex => (
            <button
              key={ex.id}
              onClick={() => {}}  // Redux select
              className={`w-full p-3 text-left rounded-lg border transition-colors ${
                darkMode
                  ? 'border-gray-700 hover:bg-gray-800'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{ex.name}</div>
              <div className={darkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>{ex.location}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
         <h3 className="font-semibold mb-3 flex items-center space-x-2">
          <Activity className="w-5 h-5 mr-1" />
          Charts
        </h3>
        <LatencyChart />
      </div>

      {/* Metrics */}
      <MetricsDashboard />

      <div className="my-6" />

      {/* Legend */}
      <Legend />
    </div>
  );
}