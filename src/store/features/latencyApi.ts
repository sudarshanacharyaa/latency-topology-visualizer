import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LatencyPoint } from '@/types';

interface CloudflareResponse {
  result: {
    data: Array<{ time: string; avg: number }>;
  };
}

export const latencyApi = createApi({
  reducerPath: 'latencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.cloudflare.com/client/v4/radar' }),
  tagTypes: ['Latency'],
  endpoints: (builder) => ({
    getGlobalLatency: builder.query<CloudflareResponse, void>({
      query: () => '/http/locations/global/timeseries?aggInterval=1m',
      providesTags: ['Latency'],
    }),
    getRegionLatency: builder.query<CloudflareResponse, string>({
      query: (code) => `/http/locations/${code}/timeseries?aggInterval=1m`,
      providesTags: ['Latency'],
    }),
  }),
});

export const { useGetGlobalLatencyQuery, useGetRegionLatencyQuery } = latencyApi;