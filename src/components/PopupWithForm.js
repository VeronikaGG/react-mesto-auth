import React from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, onSubmit }) {
  return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Кнопка закрытия попапа" onClick={onClose}></button>
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          <form name={`${name}`} className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
            <label className="popup__field">
              <span className="about-error"></span>
            </label>
            {children}
            <button type="submit" className={`popup__button popup__button_type_${name}`}>
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
