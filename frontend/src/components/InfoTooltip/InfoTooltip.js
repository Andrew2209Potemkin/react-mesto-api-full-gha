import React from "react";

function InfoTooltip({ isOpen, image, message, onClose, onOutsideClick }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onOutsideClick}>
      <div className="popup__content">
        <img src={image} className="popup__image" alt={message} />
        <h2 className="popup__message">{message}</h2>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;