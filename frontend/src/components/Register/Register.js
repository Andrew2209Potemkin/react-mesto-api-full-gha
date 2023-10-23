import React from "react";
import { Link } from "react-router-dom";
import WindowWithForm from "../WindowWithForm/WindowWithForm";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleInputNameEmail(evt) {
    setEmail(evt.target.value);
  };

  function handleInputNamePassword(evt) {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email, password });
  };

  return (
    <WindowWithForm
      title="Регистрация"
      text="Зарегистрироваться"
      onSubmit={handleSubmit}
      link={
        <p className="window__text">Уже зарегистрированы? <Link to="/sign-in" className="window__link" type="button">Войти</Link></p>
      }
    >
      <input className="window__form-item" type="email" name="email" value={email || ''} onChange={handleInputNameEmail} placeholder="Email" required />
      <input className="window__form-item" type="password" name="password" value={password || ''} onChange={handleInputNamePassword} placeholder="Пароль" required />
    </WindowWithForm>
  );
}

export default Register;