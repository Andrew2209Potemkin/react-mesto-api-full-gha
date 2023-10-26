import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { api } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import * as mestoAuth from "../../utils/mestoAuth";
import success from "../../images/popup-message-successfully.svg";
import fail from "../../images/popup-message-fail.svg";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  function handleEditAvatarClick() { //yes
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() { //yes
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() { //yes
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(selectedCard) { //yes
    setSelectedCard(selectedCard);
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  };

  function closeAllPopups() { //yes
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({});
  };

  function handleCardLike(card) { //yes
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleCardDelete(card) { //yes
    api.deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleUpdateUser({ name, about }) { //yes
    api.editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleUpdateAvatar({ avatar }) { //yes
    api.updateUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleAddPlaceSubmit({ name, link }) {//yes
    api.addNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleOutsideClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  function handleSubmitRegister({ email, password }) { //yes
    mestoAuth.register(email, password)
      .then((res) => {
        if (res) {
          setImage(success);
          setMessage("Вы успешно зарегистрировались!");
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setImage(fail);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  };

  function handleSubmitLogin({ email, password }) {
    mestoAuth.authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setImage(fail);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  };

  function handleSignOut() {
    setLoggedIn(false);
    setEmail("");
    navigate("/signin", { replace: true });
    localStorage.removeItem("jwt");
  };

  React.useEffect(() => {

    if (loggedIn) {
      api.getInitialCards()
        .then((res) => {
          setCards(res.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isInfoTooltip) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, isInfoTooltip]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mestoAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  React.useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={
            <>
              <Header email={email} text="Выйти" address="" onSignOut={handleSignOut} />
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
              <Footer />
            </>
          } />
          <Route path="/sign-up" element={
            <>
              <Header text="Войти" address="/sign-in" />
              <Register onRegister={handleSubmitRegister} />
            </>
          } />
          <Route path="/sign-in" element={
            <>
              <Header text="Регистрация" address="/sign-up" />
              <Login onLogin={handleSubmitLogin} />
            </>
          } />
          <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />
        </Routes>
      </div>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onOutsideClick={handleOutsideClick}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onOutsideClick={handleOutsideClick}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onOutsideClick={handleOutsideClick}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onOutsideClick={handleOutsideClick}
      />
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={null}
        onClose={null}
      />
      <InfoTooltip
        isOpen={isInfoTooltip}
        image={image}
        message={message}
        onClose={closeAllPopups}
        onOutsideClick={handleOutsideClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
