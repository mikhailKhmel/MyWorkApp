import {createSlice} from '@reduxjs/toolkit';

//const localFolders = localStorage.getItem('folders');
export const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    path: [null],
    filter: {
      parent: null,
    },
    folders: [],
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter.parent = action.payload;
    },
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    updatePath: (state, action) => {
      state.path = [...action.payload];
    },
  },
});

export const {setFilter, setFolders, updatePath} = foldersSlice.actions;

export default foldersSlice.reducer;