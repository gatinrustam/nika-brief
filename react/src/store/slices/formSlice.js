import { createSlice } from '@reduxjs/toolkit';

import briefSteps from '@/data/briefSteps';
import { isStepValid } from '@/utils/isStepValid';

const initialState = {
  formData: JSON.parse(localStorage.getItem('briefFormData')) || {},
  currentStep: parseInt(localStorage.getItem('briefCurrentStep'), 10) || 0,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = {
        ...state.formData,
        [action.payload.id]: action.payload.value,
      };
      localStorage.setItem('briefFormData', JSON.stringify(state.formData));
    },
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
      localStorage.setItem('briefCurrentStep', action.payload.toString());
    },
    resetForm(state) {
      state.formData = {};
      state.currentStep = 0;
      localStorage.removeItem('briefFormData');
      localStorage.removeItem('briefCurrentStep');
    }
  }
});

export const selectIsCurrentStepValid = (state) => {
  const step = briefSteps[state.form.currentStep];
  const value = state.form.formData[step?.id];
  return isStepValid(step, value);
};

export const selectIsCurrentStepRequired = (state) => {
  const step = briefSteps[state.form.currentStep];
  return Boolean(step?.required);
};

export const { setFormData, setCurrentStep, resetForm } = formSlice.actions;

export const selectFormData = (state) => state.form.formData;
export const selectCurrentStep = (state) => state.form.currentStep;

export default formSlice.reducer;
