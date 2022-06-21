module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {},
  {
    timestamps: false,
  });
  PostCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'Categories',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'BlogPosts',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategories;
};