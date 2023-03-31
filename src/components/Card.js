import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `item__like ${isLiked && 'item__like_active_black'}`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="item">
      {isOwn && (
        <button type="button" className="item__trash" aria-label="Кнопка удаления" onClick={handleDeleteClick}></button>
      )}
      <img src={card.link} alt={card.name} className="item__image" onClick={handleClick} />
      <div className="item__info">
        <h2 className="item__name">{card.name}</h2>
        <div className="item__like-block">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Кнопка лайка"
            onClick={handleLikeClick}
          ></button>
          <p className="item__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
