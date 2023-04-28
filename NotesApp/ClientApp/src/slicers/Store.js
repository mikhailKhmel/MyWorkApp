import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './NotesSlice';
import foldersReducer from './FoldersSlice';
import profileReducer from './ProfileSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    folders: foldersReducer,
    profile: profileReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('profile', JSON.stringify(state.profile.profile));
  localStorage.setItem('notes', JSON.stringify(state.notes.notes));
  localStorage.setItem('folders', JSON.stringify(state.folders.folders));
});