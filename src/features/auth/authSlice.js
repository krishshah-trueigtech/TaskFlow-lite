import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUser(),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
