import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithAuth from './PopupWithAuth.js';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onRegister({ email, password });
  };

  return (
    <section className="auth">
      <div className="login">
        <h2 className="login__title">Регистрация</h2>
        <PopupWithAuth buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
          <label className="popup__field">
            <input
              name="email"
              type="email"
              className="popup__input popup__input_type_login"
              placeholder="Email"
              required
              minLength="2"
              value={email}
              onChange={handleChangeEmail}
            />
            <span className="email-error"></span>
          </label>
          <label className="popup__field">
            <input
              name="password"
              type="password"
              className="popup__input popup__input_type_login"
              placeholder="Пароль"
              required
              minLength="6"
              value={password}
              onChange={handleChangePassword}
            />
            <span className="password-error"></span>
          </label>
        </PopupWithAuth>
        <p className="login__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="login__link">
            &nbsp;Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
