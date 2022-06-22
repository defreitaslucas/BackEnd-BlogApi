const { Category } = require('../database/models');

const createCategory = async (name) => {
  const addCategory = await Category.create({ name });
  return addCategory;
};

module.exports = {
  createCategory,
};