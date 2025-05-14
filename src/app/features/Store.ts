"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserApi } from "./Api/UserApi";
import { CompanyApi } from "./Api/CompanyApi";
import { projectsApi } from "./Api/projectsApi";
import headerReducer from "./appSlice/headerSlice";
import companyReducer from "./appSlice/companySlices";
import { ServicesApi } from "./Api/ServicesApi";
import projectReducer from "./appSlice/projectSlice";
import { serviceSlice } from "./appSlice/ServiceSlice";
import { fileApi } from "./Api/fileApi";
import { partnersApi } from "./Api/partnersApi";
import partnerReducer from "./appSlice/partnerSlice";
import { EmployeeApi } from "./Api/EmployeeApi";
import employeeReducer from "./appSlice/EmployeeSlice";
import { PServiceApi } from "./Api/PServiceApi";
import pserviceReducer from "./appSlice/PserviceSlice";
import { FAQApi } from "./Api/FAQApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import faqReducer from "./appSlice/FAQSlice";
import { UltraMsgApi } from "./Api/UltraMsgApi";
const rootReducer = combineReducers({
  [UserApi.reducerPath]: UserApi.reducer,
  [CompanyApi.reducerPath]: CompanyApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [ServicesApi.reducerPath]: ServicesApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [partnersApi.reducerPath]: partnersApi.reducer,
  [EmployeeApi.reducerPath]: EmployeeApi.reducer,
  [PServiceApi.reducerPath]: PServiceApi.reducer,
  [FAQApi.reducerPath]: FAQApi.reducer,
  [serviceSlice.reducerPath]: serviceSlice.reducer,
  [UltraMsgApi.reducerPath]: UltraMsgApi.reducer,
  header: headerReducer,
  company: companyReducer, // سيتم حفظ هذا في localStorage
  project: projectReducer,
  partner: partnerReducer,
  employee: employeeReducer,
  pservice: pserviceReducer,
  faq: faqReducer,
});

// إعداد redux-persist لتخزين جزء معين فقط (مثلاً company)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["company"], // فقط company سيتم حفظه
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // لمنع مشاكل التحقق من التسلسل
    }).concat(
      UserApi.middleware,
      CompanyApi.middleware,
      projectsApi.middleware,
      ServicesApi.middleware,
      fileApi.middleware,
      partnersApi.middleware,
      EmployeeApi.middleware,
      PServiceApi.middleware,
      FAQApi.middleware,
      UltraMsgApi.middleware
    ),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
