const User = require("../models/user");
const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../errors/errors");

// получить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Произошла ошибка" })
    );
};

// найти пользователя по id
const getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(user);
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

// создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
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

// обновить профиль пользователя
const updateProfile = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(req.body);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Некорректный ID" });
      }
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

// обновить аватар пользователя
const updateAvatar = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(req.body);
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
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
