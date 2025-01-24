import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userToken: null,
    userInfo: null,
    posts: [],
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userToken = action.payload.token;
      state.userInfo = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userInfo = null;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { login, logout, addPost } = authSlice.actions;
export default authSlice.reducer;
