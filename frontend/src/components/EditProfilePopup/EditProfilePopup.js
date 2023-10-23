import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onOutsideClick }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);


  function handleInputNameChange(evt) {
    setName(evt.target.value);
  };

  function handleInputDescriptionChange(evt) {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, about: description });
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOutsideClick={onOutsideClick}
    >
      <input id="text-input-name" type="text" name="name" value={name || ''} onChange={handleInputNameChange} placeholder="Имя" className="popup__form-item popup__form-item_type_name" required minLength={2} maxLength={40} />
      <span className="text-input-name-error popup__form-error" />
      <input id="text-input-info" type="text" name="info" value={description || ''} onChange={handleInputDescriptionChange} placeholder="О себе" className="popup__form-item popup__form-item_type_job" required minLength={2} maxLength={200} />
      <span className="text-input-info-error popup__form-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;