import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormData } from '@/store/slices/formSlice';

function RadioGroupField({ id, label, description, required, options }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form.formData[id] || '');

  const handleChange = (newValue) => {
    dispatch(setFormData({ id, value: newValue }));
  };

  return (
    <div className="step">
      <h2 className="step__title title title--heading-3">{label} {required && (<span className="hightlight hightlight--red">*</span>)}</h2>
      {description && <p className="step__description">{description}</p>}

      <div className="ui-radio-list">
        {options.map((opt) => (
          <div className="ui-radio" key={opt.value}>
            <label className="ui-radio__label">
              <input
                className="ui-radio-checker"
                type="radio"
                name={id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => handleChange(opt.value)}
              />
              <div className="ui-radio__content">
                <div className="ui-radio__title">{opt.label}</div>
                {opt.description && (
                  <div className="ui-radio__desc">{opt.description}</div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioGroupField;
