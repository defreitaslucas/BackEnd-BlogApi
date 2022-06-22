const express = require('express');
const tokenAuthenticated = require('../middlewares/tokenAuth');
const validateCategoryMiddleware = require('../middlewares/categoriesAuthenticated');
const { createCategory } = require('../services/categoryService');

const categories = express();

categories.post('/', tokenAuthenticated, validateCategoryMiddleware, async (req, res) => {
  const { name } = req.body;
  const addCategory = await createCategory(name);
  return res.status(201).json(addCategory);
});

module.exports = categories;