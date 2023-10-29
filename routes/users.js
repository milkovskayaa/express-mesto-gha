const userRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.patch("/me", updateProfile);
userRouter.patch("/me/avatar", updateAvatar);

module.exports = userRouter;
