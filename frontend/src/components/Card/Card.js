import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-icon-btn ${isLiked && 'element__like-icon-btn_active'}`);
  const cardDeleteButtonClassName = (`element__delete-icon-btn ${!isOwn && 'element__delete-icon-btn_inactive'}`);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <article className="element">
      <button className={cardDeleteButtonClassName} aria-label="Удалить" type="button" onClick={handleDeleteClick} />
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <div className="element__title-zone">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-zone">
          <button className={cardLikeButtonClassName} aria-label="Нравится" type="button" onClick={handleLikeClick} />
          <p className="element__number-like">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;