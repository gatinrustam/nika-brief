import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentStep, setCurrentStep } from '@/store/slices/formSlice';
import { selectIsCurrentStepValid, selectIsCurrentStepRequired } from '@/store/slices/formSlice';

import Tippy from '@tippyjs/react';

import briefSteps from '@/data/briefSteps';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';

import './NavigationButtons.scss';

function NavigationButtons() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const isValid = useSelector(selectIsCurrentStepValid);
  const isNotRequired = useSelector(selectIsCurrentStepRequired);

  const isSummaryStep = currentStep === briefSteps.length;

  const tippyContent = isValid ? 'Перейти к следующему шагу' : 'Заполните обязательные поля';

  const handleNext = useCallback(() => {
    if (currentStep < briefSteps.length) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  }, [currentStep, dispatch]);

  if (!isSummaryStep) {
    return (
      <div className="steps__buttons">
        <div className="button-wrap button-wrap--mobile">
          <ProgressIndicator currentStep={currentStep} totalSteps={briefSteps.length} />
  
          <Tippy content={tippyContent} placement="top" trigger="mouseenter focus">
            <div className="button-wrap__inner">
              <button className="button button--green" disabled={!isValid} onClick={handleNext}>
                {isNotRequired ? "Далее" : "Пропустить"}
              </button>
            </div>
          </Tippy>
        </div>
      </div>
    );
  }
}

export default NavigationButtons;