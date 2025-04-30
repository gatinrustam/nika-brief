import React, { useEffect, useRef } from 'react';
import './ProgressIndicator.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function ProgressIndicator({ currentStep, totalSteps }) {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const currentDot = stepRefs.current[currentStep];

    if (container && currentDot) {
      const containerRect = container.getBoundingClientRect();
      const dotRect = currentDot.getBoundingClientRect();

      const offset = dotRect.left - containerRect.left - container.offsetWidth / 2 + dotRect.width / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  }, [currentStep]);

  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="progress-bar-wrapper" ref={containerRef}>
      <div className="progress-steps">
        <div className="progress-line">
          <div
            className="progress-line__fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
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
            ref={(el) => (stepRefs.current[index] = el)}
          >
            <Tippy content={`Шаг ${index + 1}`} placement="top" trigger="mouseenter focus">
              <div className="progress-dot"></div>
            </Tippy>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;