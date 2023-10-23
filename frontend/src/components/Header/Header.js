import React from "react";
import { Link } from "react-router-dom";

function Header({ email, text, address, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo" />
      <nav className="header__menu">
        <p className="header__email">{email}</p>
        <Link to={address} className="header__link" type="button" onClick={onSignOut}>{text}</Link>
      </nav>
    </header>
  );
}

export default Header;