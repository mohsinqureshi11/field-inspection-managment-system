import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forms: [],
  responses: []
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state, action) => {
      state.forms.push(action.payload);
    },
    addResponse: (state, action) => {
      state.responses.push(action.payload);
    },
    deleteForm: (state, action) => {
      state.forms = state.forms.filter(form => form.id !== action.payload);
    }
  },
});

export const { addForm, addResponse, deleteForm } = formSlice.actions;
export const selectForms = (state) => state.form.forms;
export default formSlice.reducer;