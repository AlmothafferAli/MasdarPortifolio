"use client";

import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "./Api/UserApi";
import headerReducer from "./appSlice/headerSlice";

const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    header: headerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
