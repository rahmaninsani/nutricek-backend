'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nutrition', {
      idUser: {
        allowNull: false,
        field: 'id_user',
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      idFood: {
        allowNull: false,
        field: 'id_food',
        primaryKey: true,
        references: {
          model: 'food',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.ENUM('Calories', 'Carbs', 'Fat', 'Protein'),
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      unit: {
        allowNull: false,
        type: Sequelize.STRING(10),
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
    await queryInterface.dropTable('nutrition');
  },
};
