const cardRouter = require('express').Router();
const { getCards,createCard,deleteCard,addLikeCard } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:id', deleteCard);
cardRouter.put('/:id/likes', addLikeCard);

module.exports = cardRouter;