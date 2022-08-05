'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const preparedData = {
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    return queryInterface.bulkInsert('nutrition_history', [preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('nutrition_history', null, {});
  },
};
