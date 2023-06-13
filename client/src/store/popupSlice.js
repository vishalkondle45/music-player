import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
    register: false,
  },
  reducers: {
    setRegister(state, action) {
      state.register = action.payload;
    },
    setLogin(state, action) {
      state.login = action.payload;
    },
  },
});

export const { setLogin, setRegister } = popupSlice.actions;
export default popupSlice.reducer;
