'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return queryInterface.createTable('users', {
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
          first_name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          last_name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          email: {
            type: "VARCHAR(191)",
            allowNull: false,
            unique: true,
            validate: {
              isEmail: {
                msg: "Invalid email"
              }
            }
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          },
          mobile: {
            allowNull: true,
            type: Sequelize.STRING
          },
          gender: {
            allowNull: true,
            type: Sequelize.STRING
          },
          profile_pic: {
            allowNull: true,
            type: Sequelize.STRING
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
        return queryInterface.dropTable('users');
      })
      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  }
};