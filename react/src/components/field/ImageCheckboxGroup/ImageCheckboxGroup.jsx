import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/formSlice'; // импортируем action
import './ImageCheckboxGroup.scss';

function ImageCheckboxGroup({ id, label, description, required, options }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form.formData[id] || []); // получаем value из Redux

  const handleToggle = (optionValue) => {
    const updated = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];

    dispatch(setFormData({ id, value: updated })); // обновляем Redux при изменении
  };

  return (
    <div className="step">
      <h2 className="step__title title title--heading-3">{label}&nbsp;{required && (<span className="hightlight hightlight--red">*</span>)}</h2>
      {description && <p className="step__description">{description}</p>}

      <div className="image-checkbox-group ui-grid-container ui-grid-gap">
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`ui-col-md-6 ui-col-xl-4 image-checkbox-item ${value.includes(opt.value) ? 'selected' : ''}`}
            onClick={() => handleToggle(opt.value)}
          >
            {opt.image && <img src={opt.image} alt={opt.label} loading="lazy" />}
            {opt.label && <span>{opt.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCheckboxGroup;
