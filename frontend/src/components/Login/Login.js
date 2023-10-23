import React from "react";
import WindowWithForm from "../WindowWithForm/WindowWithForm";

function Login({ onLogin }) {
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
    onLogin({ email, password });
  };

  return (
    <WindowWithForm
      title="Вход"
      text="Войти"
      onSubmit={handleSubmit}
    >
      <input className="window__form-item" type="email" name="email" value={email || ''} onChange={handleInputNameEmail} placeholder="Email" required />
      <input className="window__form-item" type="password" name="password" value={password || ''} onChange={handleInputNamePassword} placeholder="Пароль" required />
    </WindowWithForm>
  );
}

export default Login;