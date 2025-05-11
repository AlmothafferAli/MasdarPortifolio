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
import { pserviceSlice } from "./appSlice/PserviceSlice";
import { FAQApi } from "./Api/FAQApi";
import faqReducer from "./appSlice/FAQSlice";
const rootReducer = combineReducers({
  [UserApi.reducerPath]: UserApi.reducer,
  [CompanyApi.reducerPath]: CompanyApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [ServicesApi.reducerPath]: ServicesApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [partnersApi.reducerPath]: partnersApi.reducer,
  [EmployeeApi.reducerPath]: EmployeeApi.reducer,
  [PServiceApi.reducerPath]: PServiceApi.reducer,
  header: headerReducer,
  company: companyReducer,
  project: projectReducer,
  partner: partnerReducer,
  pservice: pserviceReducer,
  employee: employeeReducer,
  faq: faqReducer,
  [serviceSlice.reducerPath]: serviceSlice.reducer,
  [FAQApi.reducerPath]: FAQApi.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      UserApi.middleware,
      CompanyApi.middleware,
      projectsApi.middleware,
      ServicesApi.middleware,
      fileApi.middleware,
      partnersApi.middleware,
      EmployeeApi.middleware,
      PServiceApi.middleware,
      FAQApi.middleware
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
