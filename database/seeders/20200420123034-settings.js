'use strict';
const uuid = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.query('TRUNCATE TABLE settings');

    let currentDate = new Date();

    return queryInterface.bulkInsert('settings', [{
      uid: uuid(),
      key: 'language',
      value: 'en',
      created_at: currentDate,
      updated_at: currentDate
    },
    {
      uid: uuid(),
      key: 'currency',
      value: 'USD',
      created_at: currentDate,
      updated_at: currentDate
    }
    ], {})
      .then(_ => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      })

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('settings', null, {});
  }
};
