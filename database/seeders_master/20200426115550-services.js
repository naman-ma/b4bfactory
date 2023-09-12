'use strict';
const uuid = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.query('TRUNCATE TABLE services');

    let currentDate = new Date();
    return queryInterface.bulkInsert('services', [{
      uid: uuid(),
      database_name: 'b4bfactory',
      database_url: 'http://localhost:4200',
      status: 1,
      created_at: currentDate,
      updated_at: currentDate
    },
    ], {})
      .then(_ => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', null, {});
  }
};
