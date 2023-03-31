import React from 'react';
export default function PopupWithAuth({ children, buttonText, onSubmit }) {
  return (
    <form className="popup__form popup__form_type_auth" name="auth" onSubmit={onSubmit}>
      {children}
      <button type="submit" className="popup__button popup__button_type_auth">
        {buttonText}
      </button>
    </form>
  );
}
