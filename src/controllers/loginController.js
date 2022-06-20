const express = require('express');
const { authenticator } = require('../services/loginService');

const login = express();

login.post('/', async (req, res) => {
  const { email, password } = req.body;
  const token = await authenticator(email, password);
  console.log(token);
  if (token && token.message) {
    return res.status(token.status).json({ message: token.message });
  }
  return res.status(200).json({ token });
});
module.exports = login;