const express = require('express');

const { createUser, getUserAll, getUserById, userDelete } = require('../services/userService');
const userAuthenticated = require('../middlewares/userAuthenticated');
const tokenAuthenticated = require('../middlewares/tokenAuth');

const user = express();

user.post('/', userAuthenticated, async (req, res) => {
  const userData = req.body;
  const token = await createUser(userData);
  if (token.message) {
    return res.status(token.status).json({ message: token.message });
  }
  return res.status(201).json({ token });
});

user.get('/', tokenAuthenticated, async (req, res) => {
  try {
    const users = await getUserAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(401).json(error.message);
  }
});

user.get('/:id', tokenAuthenticated, async (req, res) => {
  const { id } = req.params;
  const userById = await getUserById(id);
  if (userById.message) {
    return res.status(userById.status).json({ message: userById.message });
  }
  return res.status(200).json(userById);
});

user.delete('/me', tokenAuthenticated, async (req, res) => {
  const userId = req.user.id;

  const userDeleteById = await userDelete(userId);
  if (userDeleteById.message) {
    return res.status(userDeleteById.code).json({ message: userDeleteById.message });
  }
  return res.status(204).end();
});

module.exports = user;