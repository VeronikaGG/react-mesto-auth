import React from 'react';
import PopupWithAuth from './PopupWithAuth.js';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <section className="auth">
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <PopupWithAuth name="login" title="Вход" buttonText="Войти" onSubmit={handleSubmit}>
          <label className="popup__field">
            <input
              name="email"
              id="email-login"
              type="email"
              className="popup__input popup__input_type_login"
              placeholder="Email"
              required
              minLength="2"
              value={email}
              onChange={handleChangeEmail}
            />
            <span className="email-login-error"></span>
          </label>
          <label className="popup__field">
            <input
              name="password"
              type="password"
              id="password"
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
      </div>
    </section>
  );
}

export default Login;
