import { configureStore, createSlice } from '@reduxjs/toolkit';

// Temporary placeholder auth slice — replace with the real one once
// you wire up /api/auth (login/register) endpoints from Ayesh's backend.
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: 'Fareeha Shah',
      email: 'fareeha@veganfresh.com',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
