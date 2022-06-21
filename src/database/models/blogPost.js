module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING(255),
    content: DataTypes.STRING(255),
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'id', as: 'Users' });
  };

  return BlogPost;
};