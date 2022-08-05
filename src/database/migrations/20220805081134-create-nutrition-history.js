'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nutrition_history', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('(UUID_TO_BIN(UUID(), 1))'),
        primaryKey: true,
        type: 'BINARY(16)',
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: 'TIMESTAMP',
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nutrition_history');
  },
};
