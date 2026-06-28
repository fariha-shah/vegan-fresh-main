import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Fareeha Shah',
    email: 'fareeha@example.com',
    phone: '+92 300 1234567',
    address: 'House 12, Street 4, Peshawar',
  },
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { updateProfile, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
