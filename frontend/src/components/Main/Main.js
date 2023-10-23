import React from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__avatar-btn" type="button" aria-label="Редактировать" onClick={onEditAvatar} />
          <img src={currentUser.avatar} className="profile__avatar-image" alt="Фото пользователя" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать" onClick={onEditProfile} />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Создать" onClick={onAddPlace} />
      </section>
      <section className="elements">{cards.map((card) => (<Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}</section>
    </main>
  );
}

export default Main;