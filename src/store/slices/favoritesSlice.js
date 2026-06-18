import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      name: 'Fresh Tomato',
      price: 25,
      oldPrice: 30,
      image: '🍅',
      badge: 'NATURAL',
    },
    {
      id: 3,
      name: 'Fresh Onion',
      price: 25,
      oldPrice: 40,
      image: '🧅',
      badge: 'NATURAL',
    },
    {
      id: 4,
      name: 'Fresh Carrot',
      price: 20,
      oldPrice: 28,
      image: '🥕',
      badge: 'NATURAL',
    },
  ],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
