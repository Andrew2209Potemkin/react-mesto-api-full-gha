import React from "react";

function ImagePopup({ card, onClose, onOutsideClick }) {
  return (
    <div className={`popup popup_type_image ${card.link ? 'popup_opened' : ''}`} onClick={onOutsideClick}>
      <div className="popup__container-image">
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__figure-image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;