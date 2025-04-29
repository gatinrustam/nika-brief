import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, selectIsModalOpen } from '@/store/slices/uiSlice';
import './Modal.scss';

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'initial';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [isOpen]);

  const handleClose = () => dispatch(closeModal());

  return (
    <div
      className={`modal-wrapper${isOpen ? ' modal-wrapper--active' : ''}`}
      onClick={(e) => {
        if (e.target.classList.contains('modal-wrapper')) {
          handleClose();
        }
      }}
    >
      <div className="modal">
        <button className="modal__close" onClick={handleClose}>×</button>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
