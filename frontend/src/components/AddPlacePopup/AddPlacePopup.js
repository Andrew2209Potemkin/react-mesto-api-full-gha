import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onOutsideClick }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleInputNameChange(evt) {
    setName(evt.target.value);
  };

  function handleInputLinkChange(evt) {
    setLink(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  };

  return (
    <PopupWithForm
      name="create"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onOutsideClick={onOutsideClick}
      onSubmit={handleSubmit}
    >
      <input id="text-input" type="text" name="name" value={name || ''} onChange={handleInputNameChange} placeholder="Название" className="popup__form-item popup__form-item_type_name-place" required minLength={2} maxLength={30} />
      <span className="text-input-error popup__form-error" />
      <input id="url-input" type="url" name="link" value={link || ''} onChange={handleInputLinkChange} placeholder="Ссылка на картинку" className="popup__form-item popup__form-item_type_url" required />
      <span className="url-input-error popup__form-error" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;