import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../models/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const sessionUser = sessionStorage.getItem("user");
  if (sessionUser) {
    const user = JSON.parse(sessionUser);
    return { user, isAuthenticated: true };
  }
  return { user: null, isAuthenticated: false };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
