const cardRouter = require('express').Router();
const { getCards,createCard,deleteCard } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:id', deleteCard);

module.exports = cardRouter;