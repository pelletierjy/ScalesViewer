import { Action, Middleware } from "@reduxjs/toolkit";

/**
 * Saving state to local storage only if the application is initialized.
 * This is to make sure the state doesn't get overwritten with defaults at setup time.
 * 
 * @param state 
 * @returns 
 */
const saveState = (state: unknown) => {
  // Skip during server-side rendering or when window is not available
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch {
    console.error("Failed to save state to localStorage");
  }
};

let initialized = false;
export const persistentStateMiddleware: Middleware =
  (store) => (next) => (action) => {
    // Type guard to check if action is a Redux action with a type property
    const isReduxAction = (action: unknown): action is Action<string> => {
      return typeof (action as Action<string>).type === "string";
    };
    const result = next(action);
    if ((action as Action<string>).type === 'applicationState/applicationInitialized') {
      initialized = true;
    };

    if (initialized && isReduxAction(action)) {
      saveState(store.getState());
    }

    return result;
  };
