import React from 'react';

function ImagePopup({ card, onClose }) {
  const image = card ? card.link : '';
  const name = card ? card.name : '';

  return (
    <div className={`popup popup_open-image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close popup__close-image"
          aria-label="Кнопка закрытия картинки"
          onClick={onClose}
        ></button>
        <img src={image} alt={name} className="popup__image" />
        <h2 className="popup__name">{name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;
