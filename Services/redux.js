import { configureStore } from "@reduxjs/toolkit";
import { cryptoAPI } from "./cryptoAPI";
import { cryptoNews } from "../Services/cryptoNews";
import { exchange } from "../Services/cryptoExchange";
export default configureStore({
  reducer: {
    [cryptoAPI.reducerPath]: cryptoAPI.reducer,
    [cryptoNews.reducerPath]: cryptoNews.reducer,
    [exchange.reducerPath]: exchange.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoAPI.middleware,
      cryptoNews.middleware,
      exchange.middleware
    ),
});
