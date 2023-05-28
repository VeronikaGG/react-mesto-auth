import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      buttonText={onLoading ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="name"
          type="text"
          id="title-image"
          className="popup__input popup__input_type_title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="title-image-error"></span>
      </label>
      <label className="popup__field">
        <input
          name="link"
          type="url"
          id="link-image"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="link-image-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
