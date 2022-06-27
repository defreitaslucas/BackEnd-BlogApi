const { Op } = require('sequelize');
const { Category, BlogPost, sequelize, PostCategory, User } = require('../database/models');

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
    const resultPostCategory = categoryIds.map((categoryId) =>
      ({ postId: addBlogPost.dataValues.id, categoryId }));
    await PostCategory.bulkCreate((resultPostCategory), { transaction: t });
    await t.commit();
    return addBlogPost;
  } catch (error) {
    await t.rollback();
    return error.message;
  }
};

const getAllBlogPost = async () => {
  const getAll = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
    ],
  });
  if (!getAll) throw Error('Not Found');
  return getAll;
};

const getById = async (id) => {
  const getFindById = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
    ],
  });
  if (!getFindById) throw Error('Post does not exist');
  return getFindById;
};

const verifyUserPost = async (postId, userId) => {
  const verify = await getById(postId);
  if (verify.dataValues.userId !== userId) {
    return { code: 401, message: 'Unauthorized user' };
  }
  return verify;
};

const updateBlogPost = async (title, content, id) => {
  const update = await BlogPost.update({ title, content, updated: Date.now() }, { where: { id } });
  if (!update) throw Error('Erro no update');
  const findUpdate = await getById(id);
  return findUpdate;
};

const deletePostById = async (postId, userId) => {
  try {
    const verifyPost = await verifyUserPost(postId, userId);
    if (verifyPost.message) {
      return verifyPost;
    }
    const deleteBlogPost = await BlogPost.destroy({ where: { id: verifyPost.id } });
    return deleteBlogPost;
  } catch (error) {
    return error;
  }
};

const searchTerm = async (q) => {
  if (!q) {
    const searchAll = await getAllBlogPost();
    return searchAll;
  }
  const searchQuery = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } }],
      },
    });
  if (!searchQuery) return [];
  return searchQuery;
};

module.exports = {
  createBlogPost,
  getAllBlogPost,
  getById,
  updateBlogPost,
  verifyUserPost,
  deletePostById,
  searchTerm,
};