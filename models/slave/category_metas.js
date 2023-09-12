'use strict';
module.exports = (sequelize, DataTypes) => {
  const category_metas = sequelize.define('category_metas', {
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'category_id'
    },
    type: {
      field: 'type',
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['TRANSLATION', 'CANONICAL'],
      comment: 'TRANSLATION : is language translation detail, CANONICAL : other name of the category'
    },
    type_defination: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: 'type_defination'
    },
    type_value: {
      type: DataTypes.STRING(191),
      allowNull: true,
      field: 'type_value'
    },
    type_option: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'type_option'
    },
  }, {
    underscored: true,
  });
  category_metas.associate = function (models) {
    // associations can be defined here
    category_metas.belongsTo(models.categories);

  };
  return category_metas;
};