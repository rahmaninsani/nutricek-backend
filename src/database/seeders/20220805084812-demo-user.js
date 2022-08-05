'use strict';

const { hash } = require('../../utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    const preparedData = {
      name: 'Rahman Insani',
      email: 'rahman@gmail.com',
      password: await hash('user'),
      created_at: new Date(),
      updated_at: new Date(),
    };
    return queryInterface.bulkInsert('user', [preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  },
};
