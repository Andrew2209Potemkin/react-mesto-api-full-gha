import React from "react";

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit, onOutsideClick }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onOutsideClick}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-btn">{buttonText}</button>
        </form>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;