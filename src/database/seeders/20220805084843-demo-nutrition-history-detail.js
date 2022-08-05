'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const rahman = await queryInterface.sequelize.query(`SELECT * FROM user WHERE name = 'Rahman Insani';`);
    const nutritionHistory = await queryInterface.sequelize.query(
      `SELECT * FROM nutrition_history ORDER BY id DESC LIMIT 1;`
    );

    const preparedData = [
      {
        id_user: rahman[0][0].id,
        id_nutrition_history: nutritionHistory[0][0].id,
        nutrition_name: 'Calories',
        weight: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: rahman[0][0].id,
        id_nutrition_history: nutritionHistory[0][0].id,
        nutrition_name: 'Carbs',
        weight: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: rahman[0][0].id,
        id_nutrition_history: nutritionHistory[0][0].id,
        nutrition_name: 'Fat',
        weight: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: rahman[0][0].id,
        id_nutrition_history: nutritionHistory[0][0].id,
        nutrition_name: 'Protein',
        weight: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    return queryInterface.bulkInsert('nutrition_history_detail', [...preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('nutrition_history_detail', null, {});
  },
};
