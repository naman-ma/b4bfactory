'use strict';
module.exports = (sequelize, DataTypes) => {
  const settings = sequelize.define('settings', {
    uid: {
      type: DataTypes.STRING(191),
      field: 'uid'
    },
    key: {
      type: DataTypes.STRING(191),
      field: 'key'
    },
    value: {
      type: DataTypes.STRING(191),
      field: 'value'
    }
  }, {
    underscored: true,
  });
  settings.associate = function (models) {
    // associations can be defined here
  };
  return settings;
};