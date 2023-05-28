const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');
const { OK_CODE } = require('../utils/constants');
const Card = require('../models/card');

// возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};
// создаёт карточку
module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      Card.findOne(newCard)
        .populate(['owner'])
        .then((card) => res.status(OK_CODE).send(card));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
// удаляет карточку по id
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Нет карточки по заданному id');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        return Card.deleteOne(card).then(() => res.send(card));
      }
    })
    .catch(next);
};
// поставить и удалить лайк карточке
const handleLikes = (req, res, data, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, data, { new: true })
    .orFail(() => {
      throw new NotFoundError('Нет карточки по заданному id');
    })
    .populate(['owner', 'likes'])
    .then((likes) => {
      res.send(likes);
    })
    .catch(next);
};
// обертка
module.exports.likeCard = (req, res, next) => {
  const data = { $addToSet: { likes: req.user._id } };
  handleLikes(req, res, data, next);
};
// обертка
module.exports.deleteCardLike = (req, res, next) => {
  const data = { $pull: { likes: req.user._id } };
  handleLikes(req, res, data, next);
};
