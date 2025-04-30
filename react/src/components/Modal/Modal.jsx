import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, selectIsModalOpen } from '@/store/slices/uiSlice';
import './Modal.scss';

const Modal = ({ modalKey, children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen(modalKey));

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'initial';
    return () => {
      document.body.style.overflow = 'initial';
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