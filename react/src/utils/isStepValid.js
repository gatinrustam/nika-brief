import isEmail from 'validator/lib/isEmail';
import { isValidPhoneNumber } from 'libphonenumber-js';

export function isStepValid(step = { type: '', required: '', minLength: '' }, value) {
  const { type, required, minLength } = step;

  if (type === 'textarea' && typeof value === 'string') {
    if (minLength !== undefined && value.trim().length < minLength) {
      return false;
    }
  }

  if (type === 'contact-info') {
    if (!value || typeof value !== 'object') return false;

    const { phone, email } = value;

    const isPhoneValid = phone && isValidPhoneNumber(phone, 'RU');
    const isEmailValid = email && isEmail(email);

    return isPhoneValid && isEmailValid;
  }

  if (!required) return true;

  const isEmpty =
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' &&
      Object.values(value).every((v) => v === '' || v === undefined));

  return !isEmpty;
}
