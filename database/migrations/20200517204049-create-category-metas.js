'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
      .then(() => {
        return queryInterface.createTable('category_metas', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "categories",
              key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          type: {
            allowNull: false,
            type: Sequelize.ENUM('TRANSLATION', 'CANONICAL'),
            // values: ['TRANSLATION', 'CANONICAL'],
            comment: 'TRANSLATION : is language translation detail, CANONICAL : other name of the category'
          },
          type_defination: {
            type: Sequelize.STRING,
            allowNull: true
          },
          type_value: {
            type: Sequelize.STRING,
            allowNull: true
          },
          type_option: {
            type: "VARCHAR(10)",
            allowNull: true
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
        return queryInterface.dropTable('category_metas');
      })
      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  }
};