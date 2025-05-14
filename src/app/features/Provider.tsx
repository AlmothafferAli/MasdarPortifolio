"use client";

import { Provider } from "react-redux";
import store from "./Store";
import type { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Store";
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ApiProvider api={CaptersApi}> */}
        {children}
        {/* </ApiProvider> */}
      </PersistGate>
    </Provider>
  );
}
