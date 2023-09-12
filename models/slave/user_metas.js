'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_metas = sequelize.define('user_metas', {
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    type: {
      field: 'type',
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['TRANSLATION'],
      comment: 'TRANSLATION : is language translation detail'
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
  user_metas.associate = function (models) {
    // associations can be defined here
    user_metas.belongsTo(models.users);

  };
  return user_metas;
};