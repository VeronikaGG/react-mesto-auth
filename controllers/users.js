const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { OK_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const AuthorizationError = require('../errors/authorizationError');
const { NODE_ENV, JWT_SECRET } = require('../utils/constants');

// аутентификация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Некорректные email или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError('Некорректные email или пароль');
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
          expiresIn: '7d',
        });
        res.send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

// возвращение всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};
// возвращение пользователя по id
const findUserById = (req, res, data, next) => {
  User.findById(data)
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
// обертка
module.exports.getUser = (req, res, next) => {
  const data = req.params.userId;
  findUserById(req, res, data, next);
};
// обертка
module.exports.getUserProfile = (req, res, next) => {
  const data = req.user._id;
  findUserById(req, res, data, next);
};

// Добавление пользователя с существующим email в БД
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(OK_CODE).send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
};
// обновление профиля пользователя
const handleUserUpdate = (req, res, data, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
// обертка
module.exports.updateUserInfo = (req, res, next) => {
  const data = req.body;
  handleUserUpdate(req, res, data, next);
};
// обертка
module.exports.updateUserAvatar = (req, res, next) => {
  const data = req.body;
  handleUserUpdate(req, res, data, next);
};
