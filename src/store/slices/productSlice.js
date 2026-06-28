import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../assets/data';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('q', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.isOrganic) params.append('isOrganic', true);
      if (filters.sort) params.append('sort', filters.sort);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products?${params}`
      );
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      return data?.products || data;
    } catch {
      let result = [...PRODUCTS];
      if (filters.search)
        result = result.filter((p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      if (filters.category)
        result = result.filter((p) => p.category === filters.category);
      if (filters.minPrice)
        result = result.filter((p) => p.price >= Number(filters.minPrice));
      if (filters.maxPrice)
        result = result.filter((p) => p.price <= Number(filters.maxPrice));
      if (filters.isOrganic) result = result.filter((p) => p.isOrganic);
      if (filters.sort === 'price-asc')
        result.sort((a, b) => a.price - b.price);
      if (filters.sort === 'price-desc')
        result.sort((a, b) => b.price - a.price);
      if (filters.sort === 'name')
        result.sort((a, b) => a.name.localeCompare(b.name));
      if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);
      return result;
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
