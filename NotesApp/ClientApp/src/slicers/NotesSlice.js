import {createSlice} from '@reduxjs/toolkit';

//const localNotes = localStorage.getItem('notes');
export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    currentEditableNote: null,
    notes: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCurrentEditableNote: (state, action) => {
      state.currentEditableNote = action.payload;
    },
  },
});

export const {setNotes, setCurrentEditableNote} = notesSlice.actions;

export default notesSlice.reducer;