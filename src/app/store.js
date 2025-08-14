import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice.js';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});