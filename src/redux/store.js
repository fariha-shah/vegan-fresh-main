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

// Cart slice — items: [{ product, quantity }], matches the `cart` collection shape.
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => i.product._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.product._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.product._id === productId);
      if (item) item.quantity = Math.max(1, quantity);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});
