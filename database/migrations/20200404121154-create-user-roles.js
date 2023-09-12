'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return queryInterface.createTable('user_roles', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: "VARCHAR(191)"
          },
          parent_id: {
            allowNull: true,
            type: "INTEGER",
            references: {
              "model": "user_roles",
              "key": "id"
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
          },
          created_by: {
            allowNull: true,
            type: "INTEGER"
          },
          full_access: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: 0
          },
          platform_access: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: 0
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
        return queryInterface.dropTable('user_roles');
      })
      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  }
};