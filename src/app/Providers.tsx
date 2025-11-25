'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { updateHistoricalData } from '@/store/features/uiSlice';
import { format } from 'date-fns';

export function Providers({ children }: { children: React.ReactNode }) {
  // Simulate historical updates (integrate with real API)
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        time: format(new Date(), 'HH:mm:ss'),
        latency: Math.random() * 100 + 20,
        min: Math.random() * 50,
        max: Math.random() * 150,
        avg: Math.random() * 80 + 40,
      };
      store.dispatch(updateHistoricalData([newPoint]));  // Append
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return <Provider store={store}>{children}</Provider>;
}