const User = require("../models/user");

// получить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

// найти пользователя по id
const getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Некорректный ID" });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

// создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() =>
      res.status(400).send({ message: "Данные введены некорректно" })
    );
};

// обновить профиль пользователя
const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.params.id, {'name': name, 'about': about}, {new: true, runValidators: true})
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }
    return res.status(200).send(req.body);
  })
  .catch((err) => {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Некорректный ID" });
    }
    return res.status(500).send({ message: "Произошла ошибка" });
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile
};
