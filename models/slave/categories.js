'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    uid: {
      type: DataTypes.STRING(191),
      field: 'uid'
    },
    category_name: {
      type: DataTypes.STRING(191),
      field: 'category_name'
    },
    parent_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'parent_id'
    },
  }, {
    underscored: true,
  });
  categories.associate = function (models) {
    // associations can be defined here
    categories.hasMany(models.category_metas, {
      foreignKey: "category_id",
      targetKey: "id",
      as: "metas",
      onDelete: "CASCADE"
    });

  };
  return categories;
};