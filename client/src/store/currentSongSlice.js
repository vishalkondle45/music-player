import { createSlice } from "@reduxjs/toolkit";

const currentSongSlice = createSlice({
  name: "currentSong",
  initialState: {
    currentSong: null,
    currentSongTitle: null,
    currentSongImage: null,
    isPlaying: false,
  },
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    setCurrentSongTitle(state, action) {
      state.currentSongTitle = action.payload;
    },
    setCurrentSongImage(state, action) {
      state.currentSongImage = action.payload;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setCurrentSong,
  setCurrentSongTitle,
  setCurrentSongImage,
  setIsPlaying,
} = currentSongSlice.actions;
export default currentSongSlice.reducer;
