import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import { auth } from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isEditProfilePopupOnLoading, setIsEditProfilePopupOnLoading] = React.useState(false);
  const [isAddPlacePopupOnLoading, setIsAddPlacePopupOnLoading] = React.useState(false);
  const [isEditAvatarPopupOnLoading, setIsEditAvatarPopupOnLoading] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  //auth
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);
  const [responseInfo, setResponseInfo] = React.useState(false);
  // const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    // .finally(() => {
    //   setLoading(false);
    // });
  }, [loggedIn]);

  const isOpen =
    isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isOpenInfoTooltip;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenInfoTooltip(false);
    setSelectedCard(null);
  }
  //авторизация,регистрация
  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .checkToken()
        .then((res) => {
          console.log(res);
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate('/main', { replace: true });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate]);
  //рег.пользователя
  function handleRegister({ password, email }) {
    auth
      .register(email, password)
      .then(() => {
        setResponseInfo(true);
        setIsOpenInfoTooltip(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setResponseInfo(false);
        setIsOpenInfoTooltip(true);
        console.error(err);
      })
      .finally(() => {
        setIsOpenInfoTooltip(true);
      });
  }
  //вход в профиль
  function handleLogin(formData) {
    const { email, password } = formData;
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setUserEmail('');
          setLoggedIn(false);
          navigate('/main', { replace: true });
        }
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        setResponseInfo(false);
        console.error(err);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  }

  //лайки карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => (item._id === card._id ? newCard : item)));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //редактирование профиля
  function handleUpdateUser(inputs) {
    setIsEditProfilePopupOnLoading(true);
    api
      .setUserInfo(inputs)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEditProfilePopupOnLoading(false);
      });
  }
  //редактирование аватарки
  function handleUpdateAvatar(inputs) {
    setIsEditAvatarPopupOnLoading(true);
    api
      .setUserAvatar(inputs)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEditAvatarPopupOnLoading(false);
      });
  }
  //добавление карточки
  function handleAddPlaceSubmit(card) {
    setIsAddPlacePopupOnLoading(true);
    api
      .createCard(card)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAddPlacePopupOnLoading(false);
      });
  }

  // if (loading) {
  //   return 'Идет загрузка...';
  // }

  //выход из профиля
  function handleSignOut() {
    localStorage.removeItem('token');
    setUserEmail('');
    navigate('/sign-up', { replace: true });
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
          <Route
            path="/main"
            element={
              <ProtectedRouteElement
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isEditProfilePopupOnLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isAddPlacePopupOnLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isEditAvatarPopupOnLoading}
        />
        <PopupWithForm name="confirm" title="Вы&nbsp;уверены?" buttonText="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          isSuccess={responseInfo}
          successMessage="Вы успешно зарегистрировались!"
          FailMessage="Что-то пошло не так! Попробуйте ещё раз."
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
