import { configureStore } from '@reduxjs/toolkit';
import { latencyApi } from './features/latencyApi';
import uiReducer from './features/uiSlice';

export const store = configureStore({
  reducer: {
    [latencyApi.reducerPath]: latencyApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(latencyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;