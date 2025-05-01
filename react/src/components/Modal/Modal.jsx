import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, selectIsModalOpen } from '@/store/slices/uiSlice';
import './Modal.scss';

const Modal = ({ modalKey, children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen(modalKey));

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setVh();
      window.addEventListener('resize', setVh);
    }

    return () => {
      document.body.style.overflow = 'initial';
      window.removeEventListener('resize', setVh);
    };
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal(modalKey));
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-wrapper modal-wrapper--active"
      onClick={(e) => {
        if (e.target.classList.contains('modal-wrapper')) {
          handleClose();
        }
      }}
    >
      <div className="modal">
        <button className="modal__close" onClick={handleClose}>
          ×
        </button>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;