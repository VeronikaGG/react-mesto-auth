import React from 'react';
import Success from '../images/Success.svg';
import Fail from '../images/Fail.svg';

function InfoTooltip({ isOpen, onClose, isSuccess, ...props }) {
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Кнопка закрытия попапа" onClick={onClose}></button>
        <div className="popup__content popup__content-tooltip">
          <img className="popup__tooltip-image" src={isSuccess ? Success : Fail} alt="" />
          <p className="popup__title popup__title-tooltip">{isSuccess ? props.successMessage : props.FailMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
