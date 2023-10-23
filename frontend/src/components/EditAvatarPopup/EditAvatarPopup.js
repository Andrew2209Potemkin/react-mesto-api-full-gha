import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onOutsideClick }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOutsideClick={onOutsideClick}
    >
      <input id="avatar-url-input" type="url" name="link" ref={avatarRef} placeholder="Ссылка на картинку" className="popup__form-item popup__form-item_type_url" required />
      <span className="avatar-url-input-error popup__form-error" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;