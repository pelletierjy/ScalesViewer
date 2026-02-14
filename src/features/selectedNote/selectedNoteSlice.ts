import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '@/lib/utils/note';

interface SelectedNoteState {
  selectedNote: Note | null;
}

const initialState: SelectedNoteState = {
  selectedNote: null,
};

export const selectedNoteSlice = createSlice({
  name: 'selectedNote',
  initialState,
  reducers: {
    selectNote: (state, action: PayloadAction<Note | null>) => {
      state.selectedNote = action.payload;
    },
  },
});

export const { selectNote } = selectedNoteSlice.actions;

export default selectedNoteSlice.reducer;