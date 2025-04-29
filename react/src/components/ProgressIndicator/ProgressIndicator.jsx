import React from 'react';
import './ProgressIndicator.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function ProgressIndicator({ currentStep, totalSteps }) {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-line">
        <div
          className="progress-line__fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="progress-steps">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`progress-step ${
              index < currentStep
                ? 'completed'
                : index === currentStep
                ? 'current'
                : ''
            }`}
          >

          <Tippy
            content={`Шаг ${index + 1}`}
            placement="top"
            trigger="mouseenter focus"
          >
            <div className="progress-dot"></div>
          </Tippy>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;