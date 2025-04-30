import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import IMask from 'imask';

import { setFormData, selectFormData } from '@/store/slices/formSlice';

import isEmail from 'validator/lib/isEmail';
import { isValidPhoneNumber } from 'libphonenumber-js';

function ContactInfoStep({ label, description, required }) {
  const dispatch = useDispatch();

  const contactData = useSelector((state) => selectFormData(state)?.contactInfo || {
    phone: '',
    email: '',
    extraContacts: '',
  });

  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [isPhoneValid, setIsPhoneValid] = useState(null); // null — начальное состояние
  const [isEmailValid, setIsEmailValid] = useState(null);

  const phoneRef = useRef(null);

  useEffect(() => {
    if (phoneRef.current) {
      IMask(phoneRef.current, {
        mask: '+{7} (000) 000-00-00',
      });
    }
  }, []);

  const handleChange = (field) => (e) => {
    const updated = {
      ...contactData,
      [field]: e.target.value,
    };

    if (field === 'phone') {
      if (!phoneTouched) setPhoneTouched(true);

      const cleanedPhone = e.target.value.replace(/\D/g, ''); // убираем все кроме цифр
      const validPhone = isValidPhoneNumber('+' + cleanedPhone, 'RU');
      setIsPhoneValid(validPhone);
    }

    if (field === 'email') {
      if (!emailTouched) setEmailTouched(true);

      const validEmail = isEmail(e.target.value);
      setIsEmailValid(validEmail);
    }

    dispatch(setFormData({ id: 'contactInfo', value: updated }));
  };

  const getInputClass = (touched, valid) => {
    if (!touched) return "ui-input-item";
    return cn("ui-input-item", {
      'ui-input-item--error': valid === false,
      'ui-input-item--valid': valid === true,
    });
  };

  return (
    <div className="step">
      <h2 className="step__title title title--heading-3">{label} {required && (<span className="hightlight hightlight--red">*</span>)}</h2>
      {description && <p className="step__description">{description}</p>}

      <div className="step__group">
        <label className="ui-label">
          <span>Телефон</span>
          <input
            ref={phoneRef}
            type="tel"
            className={getInputClass(phoneTouched, isPhoneValid)}
            value={contactData.phone}
            onChange={handleChange('phone')}
            placeholder="+7 (999) 123-45-67"
          />
        </label>
      </div>

      <div className="step__group">
        <label className="ui-label">
          <span>Email</span>
          <input
            type="email"
            className={getInputClass(emailTouched, isEmailValid)}
            value={contactData.email}
            onChange={handleChange('email')}
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div className="step__group">
        <label className="ui-label">
          <span>Дополнительные контакты</span>
          <textarea
            className="ui-input-textarea"
            value={contactData.extraContacts}
            onChange={handleChange('extraContacts')}
            placeholder="Мессенджеры, соцсети, вторые телефоны..."
            rows="4"
          />
        </label>
      </div>
    </div>
  );
}

export default ContactInfoStep;