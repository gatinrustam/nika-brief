import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/formSlice';

function TextareaField({ id, label, description, minLength }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form.formData[id] || '');
  const [charCount, setCharCount] = useState(value.length);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setCharCount(val.length);
    dispatch(setFormData({ id, value: val }));
  };

  const isBelowMin = minLength && charCount < minLength;

  return (
    <div className="step textarea-step">
      <h2 className="step__title title title--heading-3">{label}</h2>
      {description && <p className="step__description">{description}</p>}

      <div className="textarea-wrapper">
        <textarea
          className="ui-input-textarea"
          value={value}
          onChange={handleChange}
          rows="5"
        ></textarea>

        {minLength && (
          <div className={`char-counter ${isBelowMin ? 'warning' : 'ok'}`}>
            {charCount} / {minLength}
          </div>
        )}
      </div>
    </div>
  );
}

export default TextareaField;
