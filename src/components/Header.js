import React from 'react';
import logo from '../images/image.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Лого Место" className="header__logo" />
      {loggedIn ? (
        <div className="header__auth">
          <p className="header__auth-email">{userEmail}</p>
          <button className="header__auth-logout" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      ) : (
        <div className="links">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link to={'/sign-in'} className="header__link">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link to={'/sign-up'} className="header__link">
                  Регистрация
                </Link>
              }
            />
          </Routes>
        </div>
      )}
    </header>
  );
}

export default Header;
