'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    permission: {
      allowNull: false,
      type: DataTypes.STRING(191),
      field: 'permission'
    },
    parent_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        "model": "permissions",
        "key": "id"
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    // parent_id: {
    //   type: DataTypes.INTEGER,
    //   set(valueToBeSet) { // defines the 'setter'
    //     if (valueToBeSet > 0) {
    //       this.setDataValue('parent_id', valueToBeSet);
    //     } else {
    //       this.setDataValue('parent_id', null);
    //     }
    //   }
    // }
  }, {
    underscored: true
  });
  permissions.associate = function (models) {
    // associations can be defined here
  };
  return permissions;
};