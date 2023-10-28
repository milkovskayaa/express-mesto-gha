const Card = require('../models/card');

// получить все карточки
const getCards = (req, res) => {
  Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
}

// создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
  .then((card) => res.status(200).send(card))
  .catch(() => res.status(400).send({ message: "Данные введены некорректно" }));
}

// удалить карточку
const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: "Карточка не найдена" });
    }
    return res.status(200).send(user);
  })
  .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard
}
