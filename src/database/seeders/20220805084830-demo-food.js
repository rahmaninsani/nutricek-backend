'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const preparedData = {
      name: 'Burger',
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    return queryInterface.bulkInsert('food', [preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('food', null, {});
  },
};
