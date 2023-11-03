const Card = require("../models/card");
const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../errors/errors");

// получить все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Произошла ошибка" })
    );
};

// создать карточку
const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Введены некорректные данные" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

// удалить карточку
const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Некорректный ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

// постановка лайка на карточку
const addLikeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Некорректный ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

// дизлайк карточки
const removeLikeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Некорректный ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Произошла ошибка" });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  removeLikeCard,
};
