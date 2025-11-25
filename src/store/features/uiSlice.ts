import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Exchange, CloudRegion, Provider } from '@/types';
import type { HistoricalData } from '@/types';

interface UIState {
  darkMode: boolean;
  selectedExchange: Exchange | null;
  selectedRegion: CloudRegion | null;
  showConnections: boolean;
  showRegions: boolean;
  searchQuery: string;
  selectedProvider: Provider | 'All';
  timeRange: '1h' | '6h' | '24h' | '7d';
  historicalData: HistoricalData[];  // For chart
}

const initialState: UIState = {
  darkMode: true,
  selectedExchange: null,
  selectedRegion: null,
  showConnections: true,
  showRegions: true,
  searchQuery: '',
  selectedProvider: 'All',
  timeRange: '1h',
  historicalData: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setSelectedExchange: (state, action: PayloadAction<Exchange | null>) => {
      state.selectedExchange = action.payload;
    },
    setSelectedRegion: (state, action: PayloadAction<CloudRegion | null>) => {
      state.selectedRegion = action.payload;
    },
    toggleConnections: (state) => {
      state.showConnections = !state.showConnections;
    },
    toggleRegions: (state) => {
      state.showRegions = !state.showRegions;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setProviderFilter: (state, action: PayloadAction<Provider | 'All'>) => {
      state.selectedProvider = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<'1h' | '6h' | '24h' | '7d'>) => {
      state.timeRange = action.payload;
    },
    updateHistoricalData: (state, action: PayloadAction<HistoricalData[]>) => {
      state.historicalData = action.payload.slice(-100);  // Keep last 100 points
    },
  },
});

export const {
  setDarkMode, setSelectedExchange, setSelectedRegion,
  toggleConnections, toggleRegions, setSearchQuery,
  setProviderFilter, setTimeRange, updateHistoricalData,
} = uiSlice.actions;

export default uiSlice.reducer;