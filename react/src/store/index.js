import { configureStore } from '@reduxjs/toolkit';
import formReducer from '@/store/slices/formSlice';
import uiReducer from '@/store/slices/uiSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    ui: uiReducer,
  },
});