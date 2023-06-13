import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    likes: [],
    playlists: [],
    user: null,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setLikes(state, action) {
      state.likes = action.payload;
    },
    setPlaylists(state, action) {
      state.playlists = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.likes = [];
      state.playlists = [];
      state.user = null;
    },
  },
});

export const {
  setIsLoggedIn,
  setAdmin,
  setLikes,
  setPlaylists,
  setUser,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
