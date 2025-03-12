import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer from "@/features/globalConfig/globalConfigSlice";
import applicationStateReducer from "@/features/application/applicationSlice";

// Create a test store with the same reducers as the real store
export function createTestStore() {
  return configureStore({
    reducer: {
      globalConfig: globalConfigReducer,
      applicationState: applicationStateReducer,
    },
    // No middleware for tests to keep things simple
  });
}

// Custom render function that includes Redux provider
export function renderWithProviders(
  ui: ReactElement,
  { store = createTestStore(), ...renderOptions } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
