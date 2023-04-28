import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    isOnline: false,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setIsOnline: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const {setProfile, setIsOnline} = profileSlice.actions;

export default profileSlice.reducer;