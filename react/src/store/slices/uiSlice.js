import { createSlice } from '@reduxjs/toolkit';

// Универсальное хранилище модалок
const getModalSeenFlags = () => {
  try {
    return JSON.parse(localStorage.getItem('modalFlags')) || {};
  } catch {
    return {};
  }
};

const setModalSeenFlag = (key) => {
  const flags = getModalSeenFlags();
  flags[key] = true;
  localStorage.setItem('modalFlags', JSON.stringify(flags));
};

const hasSeenModal = (key) => getModalSeenFlags()[key] === true;

const initialState = {
  modals: {
    briefIntro: !hasSeenModal('briefIntro'),
    // другие ключи по мере надобности
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const key = action.payload;
      state.modals[key] = true;
    },
    closeModal: (state, action) => {
      const key = action.payload;
      state.modals[key] = false;
      setModalSeenFlag(key);
    },
    resetModal: (state, action) => {
      const key = action.payload;
      state.modals[key] = true;
      const flags = getModalSeenFlags();
      delete flags[key];
      localStorage.setItem('modalFlags', JSON.stringify(flags));
    },
  },
});

export const { openModal, closeModal, resetModal } = uiSlice.actions;
export const selectIsModalOpen = (key) => (state) => state.ui.modals[key];

export default uiSlice.reducer;