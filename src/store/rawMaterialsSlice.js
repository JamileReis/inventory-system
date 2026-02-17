import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchRawMaterials = createAsyncThunk('rawMaterials/fetch', async () => {
  const res = await api.get('/raw-materials');
  return res.data;
});

export const createRawMaterial = createAsyncThunk('rawMaterials/create', async (data) => {
  const res = await api.post('/raw-materials', data);
  return res.data;
});

export const updateRawMaterial = createAsyncThunk('rawMaterials/update', async ({ id, data }) => {
  const res = await api.put(`/raw-materials/${id}`, data);
  return res.data;
});

export const deleteRawMaterial = createAsyncThunk('rawMaterials/delete', async (id) => {
  await api.delete(`/raw-materials/${id}`);
  return id;
});

const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => { state.loading = true; })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        const idx = state.list.findIndex(r => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.list = state.list.filter(r => r.id !== action.payload);
      });
  },
});

export default rawMaterialsSlice.reducer;
