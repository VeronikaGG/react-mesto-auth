const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
} = require('../controllers/cards');
const { cardIdValidation, cardValidation } = require('../middlewares/requestValidation');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, deleteCardLike);

module.exports = router;
