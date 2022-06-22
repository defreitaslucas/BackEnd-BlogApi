const express = require('express');
const tokenAuthenticated = require('../middlewares/tokenAuth');
const validateCategoryMiddleware = require('../middlewares/categoriesAuthenticated');
const { createCategory, allCategories } = require('../services/categoryService');

const categories = express();

categories.post('/', tokenAuthenticated, validateCategoryMiddleware, async (req, res) => {
  const { name } = req.body;
  const addCategory = await createCategory(name);
  return res.status(201).json(addCategory);
});

categories.get('/', tokenAuthenticated, async (req, res) => {
  const getAllCategory = await allCategories();
  return res.status(200).json(getAllCategory);
});

module.exports = categories;