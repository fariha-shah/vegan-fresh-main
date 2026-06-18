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
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;
