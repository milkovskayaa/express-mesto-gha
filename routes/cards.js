const cardRouter = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  removeLikeCard,
} = require("../controllers/cards");

cardRouter.get("/", getCards);
cardRouter.post("/", createCard);
cardRouter.delete("/:id", deleteCard);
cardRouter.put("/:id/likes", addLikeCard);
cardRouter.delete("/:id/likes", removeLikeCard);

module.exports = cardRouter;
