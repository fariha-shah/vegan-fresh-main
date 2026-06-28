import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import favoritesReducer from './slices/favoritesSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    favorites: favoritesReducer,
    products: productReducer,
  },
});

export default store;
