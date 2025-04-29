import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export const selectIsModalOpen = (state) => state.ui.isModalOpen;

export default uiSlice.reducer;