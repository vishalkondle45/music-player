import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import currentSongSlice from "./currentSongSlice";
import popupSlice from "./popupSlice";
import listSlice from "./listSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    currentSong: currentSongSlice,
    popup: popupSlice,
    list: listSlice,
    search: searchSlice,
  },
});

export default store;
