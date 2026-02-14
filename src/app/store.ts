import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer from "@/features/globalConfig/globalConfigSlice";
import applicationStateReducer from "@/features/application/applicationSlice";
import audioReducer from "@/features/audio/audioSlice";
import selectedNoteReducer from "@/features/selectedNote/selectedNoteSlice";
import { persistentStateMiddleware } from "./persistentStateMiddleware";

export const store = configureStore({
  reducer: {
    globalConfig: globalConfigReducer,
    applicationState: applicationStateReducer,
    audio: audioReducer,
    selectedNote: selectedNoteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(persistentStateMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
