const userRouter = require('express').Router();
const { getUsers, getUserById, createUser, updateProfile } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateProfile);

module.exports = userRouter;