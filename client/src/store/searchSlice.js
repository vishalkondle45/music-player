import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    songSearch: "",
  },
  reducers: {
    setSongSearch(state, action) {
      state.songSearch = action.payload;
    },
    clearSongSearch(state, action) {
      state.songSearch = "";
    },
  },
});

export const { setSongSearch, clearSongSearch } = searchSlice.actions;
export default searchSlice.reducer;
