import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AudioStatus = 'uninitialized' | 'initializing' | 'initialized' | 'failed';

interface AudioState {
  status: AudioStatus;
}

const initialState: AudioState = {
  status: 'uninitialized',
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setAudioStatus(state, action: PayloadAction<AudioStatus>) {
      state.status = action.payload;
    },
  },
});

export const { setAudioStatus } = audioSlice.actions;

export const selectAudioStatus = (state: { audio: AudioState }) => state.audio.status;

export default audioSlice.reducer;
