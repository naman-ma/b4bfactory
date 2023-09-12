'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_has_roles = sequelize.define('user_has_roles', {
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    role_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
  });
  user_has_roles.associate = function (models) {
    // associations can be defined here
    user_has_roles.belongsTo(models.users);
    // TODO need to check this relation
    user_has_roles.belongsTo(models.user_roles, {
      foreignKey: 'role_id',
      targetKey: 'id',
      as: 'user_has_role_name'
    });
  };
  return user_has_roles;
};
