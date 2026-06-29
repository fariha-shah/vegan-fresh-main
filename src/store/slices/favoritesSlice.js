// store/slices/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;

      const exists = state.items.find(
        (i) => i._id === product._id || i.id === product.id
      );

      if (exists) {
        state.items = state.items.filter(
          (i) => i._id !== product._id && i.id !== product.id
        );
      } else {
        state.items.push(product);
      }

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },

    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(
        (i) => i._id !== action.payload && i.id !== action.payload
      );
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
