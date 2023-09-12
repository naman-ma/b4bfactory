'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define('user_roles', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(191),
    },
    parent_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    created_by: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    full_access: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    },
    platform_access: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    underscored: true,
  });
  user_roles.associate = function (models) {
    // associations can be defined here
    this.parentFolder = this.belongsTo(models.user_roles, {
      foreignKey: 'parent_id',
      targetKey: 'id',
      as: 'parent_user_role'
    });

    user_roles.hasMany(models.user_has_roles, {
      foreignKey: "role_id",
      targetKey: 'id',
      onDelete: "CASCADE"
    });
  };
  return user_roles;
};