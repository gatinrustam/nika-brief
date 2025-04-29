import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFormData,
  selectCurrentStep,
  setFormData,
} from '@/store/slices/formSlice';

import briefSteps from '@/data/briefSteps';

import FieldRenderer from '@/components/FieldRenderer/FieldRenderer';
import NavigationButtons from '@/components/NavigationButtons/NavigationButtons';
import AnswerSummary from '@/components/AnswerSummary/AnswerSummary';

function StepRenderer() {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const currentStep = useSelector(selectCurrentStep);
  const step = briefSteps[currentStep];
  const value = formData[step?.id];

  const isSummaryStep = currentStep === briefSteps.length;

  const handleChange = useCallback((id, newValue) => {
    dispatch(setFormData({ id, value: newValue }));
  }, [dispatch]);

  return (
    <div className="steps">
      {isSummaryStep ? <AnswerSummary /> : <FieldRenderer step={step} value={value} onChange={handleChange} />}
      <NavigationButtons />
    </div>
  );
}

export default StepRenderer;