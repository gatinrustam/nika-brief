import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetForm } from '@/store/slices/formSlice';
import { closeModal, resetModal } from '@/store/slices/uiSlice';
import briefSteps from '@/data/briefSteps';
import html2pdf from 'html2pdf.js';
import './AnswerSummary.scss';
import { toast } from 'react-toastify';

function AnswerSummary() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      html2pdf(pdfRef.current, {
        margin: 0.5,
        filename: 'brief-preview.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      });
    }
  };

  const handleDelete = () => {
    dispatch(resetForm());
    dispatch(closeModal('briefIntro'));
    dispatch(resetModal('briefIntro'));
  };

  function prepareFormData(formData) {
    const { contactInfo = {}, ...rest } = formData;
    return {
      ...rest,
      phone: contactInfo.phone || '',
      email: contactInfo.email || '',
      extraContacts: contactInfo.extraContacts || ''
    };
  }
  
  const handleSend = useCallback(() => {
    const preparedData = prepareFormData(formData);
  
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: preparedData }),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
    
        if (!response.ok || data.status === 'error') {
          const errorMessage =
            data?.message ||
            data?.error?.message ||
            'Неизвестная ошибка';
    
          const validationErrors = data?.error?.details;
    
          if (validationErrors) {
            toast.error(
              'Ошибка валидации: ' +
                JSON.stringify(validationErrors, null, 2)
            );
          } else {
            toast.error('Ошибка: ' + errorMessage);
          }
    
          throw new Error(errorMessage);
        }
    
        return data;
      })
      .then((data) => {
        toast.success('Бриф успешно отправлен!');
        handleDelete();
      })
      .catch((error) => {
        console.error('Ошибка запроса:', error);
        // Уже показали toast выше, но можно ещё здесь:
        // toast.error(error.message);
      });
  }, [formData, dispatch]);

  const renderValue = (step, answer) => {
    if (Array.isArray(answer)) {
      return (
        <div className="preview-gallery ui-grid-container ui-grid-gap">
          {answer.map((v) => {
            const option = step.options?.find((opt) => opt.value === v);
            return (
              <div key={v} className="preview-gallery__item ui-col-md-4">
                {option?.image && <img src={option.image} alt={option.label} />}
                <span>{option?.label || v}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (typeof answer === 'object' && answer.choice) {
      const option = step.options?.find((opt) => opt.value === answer.choice);
      const choiceLabel = option?.label || answer.choice;
      const domain = answer.domain ? ` (${answer.domain})` : '';
      return `${choiceLabel}${domain}`;
    }

    if (step.id === 'contactInfo' && typeof answer === 'object') {
      const { phone, email, extraContacts } = answer;
      return (
        <div>
          {phone && <p><strong>Телефон:</strong> {phone}</p>}
          {email && <p><strong>Email:</strong> {email}</p>}
          {extraContacts && <p><strong>Дополнительно:</strong> {extraContacts}</p>}
        </div>
      );
    }

    const option = step.options?.find((opt) => opt.value === answer);
    return option?.label || answer;
  };

  return (
    <div className="answer-summary">
      <div className="answer-summary__header">
        <h2 className="answer-summary__title title title--heading-3">Ваши ответы</h2>
      </div>

      <div className="answer-summary__wrapper" ref={pdfRef}>
        <div className="answer-summary__content">
          <ul className="answer-summary__list">
            {briefSteps.map((step) => {
              const answer = formData[step.id];

              if (
                answer === undefined ||
                (typeof answer === 'string' && answer.trim() === '') ||
                (Array.isArray(answer) && answer.length === 0) ||
                (typeof answer === 'object' &&
                  !Object.keys(answer).length &&
                  !answer.choice && !answer.domain)
              ) {
                return null;
              }

              return (
                <li className="answer-summary__item" key={step.id}>
                  <h4 className="title title--heading-4">{step.label}</h4>
                  {renderValue(step, answer)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {Object.keys(formData).length > 0 && (
        <div className="answer-summary__buttons button-wrap">
          <button
            className="button button--gray"
            onClick={handleDelete}
          >
            Удалить все ответы
          </button>

          <button
            className="button button--gray"
            onClick={handleDownloadPDF}
          >
            Скачать PDF
          </button>

          <button
            className="button button--green"
            onClick={handleSend}
          >
            Отправить бриф
          </button>
        </div>
      )}
    </div>
  );
}

export default AnswerSummary;
