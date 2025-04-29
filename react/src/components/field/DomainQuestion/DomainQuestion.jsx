import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/formSlice';

const DomainQuestion = ({ id, label, description, options = [] }) => { 
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form.formData[id] || []);


  const [domainChoice, setDomainChoice] = useState(value.choice || "");
  const [domainName, setDomainName] = useState(value.domain || "");

  const handleChoiceChange = (event) => {
    setDomainChoice(event.target.value);
    
    const updated = {
      ...value,
      choice: event.target.value,
    }

    dispatch(setFormData({ id, value: updated }));
  };

  const handleDomainInput = (e) => {;
    const domainValue = e.target.value.trim();
    setDomainName(domainValue);

    const updated = {
      ...value,
      domain: domainValue,
    }
    
    dispatch(setFormData({ id, value: updated }));
  };

  return (
    <div className="step">
      <h2 className="step__title title title--heading-3">{label}</h2>
      {description && <p className="step__description">{description}</p>}

      <div className="ui-radio-list">
        {options.map((opt) => (
          <div key={opt.value} className="ui-radio">
            <label className="ui-radio__label">
              <input
                className="ui-radio-checker"
                type="radio"
                name={id}
                value={opt.value}
                checked={domainChoice === opt.value}
                onChange={handleChoiceChange}
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

      {domainChoice === 'hasDomain' && (
        <div className="domain-input">
          <label className="ui-label">
            <span>Ваш домен:</span>
            <input
              className="ui-input-item"
              type="text"
              id="domain"
              placeholder="Введите ваш домен"
              value={domainName}
              onChange={handleDomainInput}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default DomainQuestion;