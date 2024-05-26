"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Toaster position="bottom-right" />
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </Provider>
    </PersistGate>
  );
};

export default Providers;
