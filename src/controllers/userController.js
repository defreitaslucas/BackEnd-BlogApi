const express = require('express');

const { createUser } = require('../services/userService');
const userAuthenticated = require('../middlewares/userAuthenticated');

const user = express();

user.post('/', userAuthenticated, async (req, res) => {
  const userData = req.body;
  const token = await createUser(userData);
  if (token.message) {
    return res.status(token.status).json({ message: token.message });
  }
  return res.status(201).json({ token });
});

module.exports = user;