'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nutrition_history_detail', {
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
      idNutritionHistory: {
        allowNull: false,
        field: 'id_nutrition_history',
        primaryKey: true,
        references: {
          model: 'nutrition_history',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      nutritionName: {
        allowNull: false,
        primaryKey: true,
        field: 'nutrition_name',
        type: Sequelize.ENUM('Calories', 'Carbs', 'Fat', 'Protein'),
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('nutrition_history_detail');
  },
};
