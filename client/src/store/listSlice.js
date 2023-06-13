import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    songsList: [],
    albumList: [],
  },
  reducers: {
    setSongsList(state, action) {
      state.songsList = action.payload;
    },
    setAlbumList(state, action) {
      state.albumList = action.payload;
    },
  },
});

export const { setSongsList, setAlbumList } = listSlice.actions;
export default listSlice.reducer;
