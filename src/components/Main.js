import React from 'react';
import pen from '../images/botton_pen.svg';
import plus from '../images/botton_plus.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__section">
        <button className="profile__avatar-edit" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
          <img src={pen} alt="Ручка" className="profile__pen-avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Кнопка редактировать"
            onClick={onEditProfile}
          >
            <img src={pen} alt="Ручка" className="profile__pen" />
          </button>
          <p className="profile__activities">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Кнопка добавления картинки"
          onClick={onAddPlace}
        >
          <img src={plus} alt="Плюс" className="profile__plus" />
        </button>
      </section>
      <section className="cards content__section" aria-label="Блок с карточками">
        <ul className="cards__list">
          {cards.map((card, i) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
