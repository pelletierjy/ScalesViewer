import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer from "@/features/globalConfig/globalConfigSlice";
import applicationStateReducer from "@/features/application/applicationSlice";
import audioReducer from "@/features/audio/audioSlice";
import { persistentStateMiddleware } from "./persistentStateMiddleware";

export const store = configureStore({
  reducer: {
    globalConfig: globalConfigReducer,
    applicationState: applicationStateReducer,
    audio: audioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistentStateMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
