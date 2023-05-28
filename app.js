require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, userValidation } = require('./middlewares/requestValidation');
const handelErrors = require('./middlewares/handelErrors');
const indexRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use(errorLogger);
app.use(auth);
app.use('/', indexRouter);
app.use(errors());
app.use(handelErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running on ${PORT}`);
});
