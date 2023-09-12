'use strict';
module.exports = (sequelize, DataTypes) => {
  const services = sequelize.define('services', {
    uid: DataTypes.STRING,
    database_name: DataTypes.STRING,
    database_url: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
		underscored: true,
	});
  services.associate = function(models) {
    // associations can be defined here
  };
  return services;
};
