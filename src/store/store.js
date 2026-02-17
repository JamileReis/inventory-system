import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import rawMaterialsReducer from './rawMaterialsSlice';
import compositionsReducer from './compositionsSlice';
import productionReducer from './productionSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    rawMaterials: rawMaterialsReducer,
    compositions: compositionsReducer,
    production: productionReducer,
  },
});
