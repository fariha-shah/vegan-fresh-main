import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 'ORD-001',
      date: '2026-06-10',
      items: [
        { name: 'Fresh Tomato', quantity: 2, price: 25 },
        { name: 'Fresh Broccoli', quantity: 1, price: 30 },
      ],
      total: 80,
      status: 'delivered',
    },
    {
      id: 'ORD-002',
      date: '2026-06-15',
      items: [
        { name: 'Fresh Carrot', quantity: 3, price: 20 },
        { name: 'Fresh Spinach', quantity: 1, price: 30 },
      ],
      total: 90,
      status: 'shipped',
    },
    {
      id: 'ORD-003',
      date: '2026-06-17',
      items: [{ name: 'Fresh Cucumber', quantity: 2, price: 30 }],
      total: 60,
      status: 'processing',
    },
  ],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
