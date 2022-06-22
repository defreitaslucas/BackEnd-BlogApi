const { Category, BlogPost, sequelize, PostCategory } = require('../database/models');

const validCategoryFunction = async (categoryIds) => {
  const validCategory = await Category.findAndCountAll({ where: { id: categoryIds } });
  if (validCategory.count !== categoryIds.length) {
    return {
      code: 400,
      message: '"categoryIds" not found',
    };
  }
};
const createBlogPost = async (body, userId) => {
  const { title, content, categoryIds } = body;
  const validador = await validCategoryFunction(categoryIds);
  if (validador) return validador;
  const t = await sequelize.transaction();
  try {
    const addBlogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postCategory = categoryIds.map((categoryId) => 
    ({ postId: addBlogPost.dataValues.id, categoryId }));
    await PostCategory.bulkCreate((postCategory), { transaction: t });
    await t.commit();
    return addBlogPost;
  } catch (error) {
    await t.rollback();
    return error.message;
  }
};

module.exports = {
  createBlogPost,
};