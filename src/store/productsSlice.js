import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await api.get('/products');
  return res.data;
});

export const createProduct = createAsyncThunk('products/create', async (data) => {
  const res = await api.post('/products', data);
  return res.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.list.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
