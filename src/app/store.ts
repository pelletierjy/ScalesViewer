import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer from "@/features/globalConfig/globalConfigSlice";
import applicationStateReducer from "@/features/application/applicationSlice";
import { persistentStateMiddleware } from "./persistentStateMiddleware";

export const store = configureStore({
  reducer: {
    globalConfig: globalConfigReducer,
    applicationState: applicationStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistentStateMiddleware),
});
