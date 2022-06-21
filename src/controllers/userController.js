const express = require('express');

const { createUser, getUserAll } = require('../services/userService');
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

module.exports = user;