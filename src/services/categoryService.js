const { Category } = require('../database/models');

const createCategory = async (name) => {
  const addCategory = await Category.create({ name });
  return addCategory;
};

const allCategories = async () => {
  const getAllCategories = await Category.findAll();
  return getAllCategories;
};

module.exports = {
  createCategory,
  allCategories,
};