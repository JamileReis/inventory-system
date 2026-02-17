import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchProductionSuggestion = createAsyncThunk('production/fetch', async () => {
  const res = await api.get('/production/suggestion');
  return res.data;
});

const productionSlice = createSlice({
  name: 'production',
  initialState: { suggestion: null, loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionSuggestion.pending, (state) => { state.loading = true; })
      .addCase(fetchProductionSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestion = action.payload;
      });
  },
});

export default productionSlice.reducer;
