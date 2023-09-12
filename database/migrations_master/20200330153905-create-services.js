'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return queryInterface.createTable('services', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          uid: {
            allowNull: false,
            type: Sequelize.STRING
          },
          database_name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          database_url: {
            allowNull: false,
            type: Sequelize.STRING
          },
          status: {
            allowNull: false,
            type: Sequelize.BOOLEAN
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      })
      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return queryInterface.dropTable('services');
      })
      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  }
};