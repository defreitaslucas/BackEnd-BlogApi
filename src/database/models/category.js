module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(255),
  },
    {
      tableName: 'Categories',
      timestamps: false,
    });

  return Category;
};