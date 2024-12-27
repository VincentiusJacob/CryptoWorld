import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const headers = new Headers({
  "X-RapidAPI-Key": "de57958632msh8c052418fa4dbdcp176316jsn3bfca6a1d83d",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
});

const baseUrl = "https://coinranking1.p.rapidapi.com/coins";

export const cryptoAPI = createApi({
  reducerPath: "cryptoAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "X-RapidAPI-Key",
        "de57958632msh8c052418fa4dbdcp176316jsn3bfca6a1d83d"
      );
      headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `?limit=${count}`,
    }),
    getDetails: builder.query({
      query: (coinId) => `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    }),
    getHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?timePeriod=${timePeriod}`,
    }),
  }),
});

export const { useGetCryptosQuery, useGetDetailsQuery, useGetHistoryQuery } =
  cryptoAPI;
