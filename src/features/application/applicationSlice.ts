import { createSlice } from "@reduxjs/toolkit";

/**
 * Application-level 
 * 
 * Use applicationState to get the application state and know when the initialization phase is done.
 * 
 */
export interface Application {
  applicationState: "started" | "initializing" | "initialized";
}

export const initialState: Application = {
  applicationState: "started",
};

export const applicationSlice = createSlice({
  name: "applicationState",
  initialState,
  reducers: {
    initializeApplication: (state) => {
      state.applicationState = "initializing";
    },
    applicationInitialized: (state) => {
      state.applicationState = "initialized";
    },
  },
});

export const { initializeApplication, applicationInitialized } =
  applicationSlice.actions;

export default applicationSlice.reducer;

const selectapplicationState = (state: { applicationState: Application }) =>
  state.applicationState;

export const selectApplicationState = (state: { applicationState: Application }) =>
  selectapplicationState(state).applicationState;
