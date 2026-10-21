import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEYS = {
  accessToken: "accessToken",
  user: "authUser",
};

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to read stored user:", error);
    localStorage.removeItem(STORAGE_KEYS.user);
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  accessToken: localStorage.getItem(STORAGE_KEYS.accessToken),
  isAuthenticated: Boolean(
    localStorage.getItem(STORAGE_KEYS.accessToken)
  ),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = Boolean(accessToken);

      localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem(STORAGE_KEYS.accessToken);
      localStorage.removeItem(STORAGE_KEYS.user);
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };

      localStorage.setItem(
        STORAGE_KEYS.user,
        JSON.stringify(state.user)
      );
    },
  },
});

export const { setCredentials, logout, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
