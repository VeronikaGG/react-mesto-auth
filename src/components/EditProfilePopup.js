import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';



function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="name"
          id="name-card"
          type="text"
          className="popup__input popup__input_type_name"
          placeholder="Введите имя"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-card-error"></span>
      </label>
      <label className="popup__field">
        <input
          name="about"
          type="text"
          id="about"
          className="popup__input popup__input_type_aboutme"
          placeholder="Введите профессию"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="about-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
