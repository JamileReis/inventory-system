import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchCompositionsByProduct = createAsyncThunk('compositions/fetchByProduct', async (productId) => {
  const res = await api.get(`/compositions/product/${productId}`);
  return res.data;
});

export const createComposition = createAsyncThunk('compositions/create', async (data) => {
  const res = await api.post('/compositions', data);
  return res.data;
});

export const deleteComposition = createAsyncThunk('compositions/delete', async (id) => {
  await api.delete(`/compositions/${id}`);
  return id;
});

const compositionsSlice = createSlice({
  name: 'compositions',
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompositionsByProduct.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createComposition.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteComposition.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload);
      });
  },
});

export default compositionsSlice.reducer;
