import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '@/store/slices/formSlice'; // импортируем action
import { CSSTransition } from 'react-transition-group';
import './CustomSelectField.scss';

function CustomSelectField({ id, label, description, options }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.form.formData[id] || ''); // получаем value из Redux
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (val) => {
    if (val !== value) {
      dispatch(setFormData({ id, value: val })); // обновляем Redux при выборе
    }
    setIsOpen(false); // Закрываем дропдаун при выборе
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <CSSTransition
      in={true}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="custom-select-field step" ref={wrapperRef}>
        <h2 className="step__title title title--heading-3">{label}</h2>
        {description && <p className="step__description">{description}</p>}

        <div
          className={`custom-select ${isOpen ? 'open' : ''}`}
          onClick={toggleOpen}
          role="button"
          tabIndex={0}
        >
          <div className="custom-select__value">
            {value || 'Выберите вариант'}
          </div>
          <div className="custom-select__arrow">&#9662;</div>

          {isOpen && (
            <ul className="custom-select__dropdown">
              {options.map((opt) => (
                <li
                  key={opt}
                  className={`custom-select__option ${opt === value ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // чтобы не сработал toggleOpen
                    handleSelect(opt);
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}

export default CustomSelectField;
