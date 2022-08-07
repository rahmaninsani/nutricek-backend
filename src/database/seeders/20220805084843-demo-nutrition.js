'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await queryInterface.sequelize.query(`SELECT * FROM user WHERE name = 'Rahman Insani';`);
    const food = await queryInterface.sequelize.query(`SELECT * FROM food ORDER BY id DESC LIMIT 1;`);

    const preparedData = [
      {
        id_user: user[0][0].id,
        id_food: food[0][0].id,
        name: 'Calories',
        weight: 10,
        unit: 'calories',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: user[0][0].id,
        id_food: food[0][0].id,
        name: 'Carbs',
        weight: 20,
        unit: 'g',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: user[0][0].id,
        id_food: food[0][0].id,
        name: 'Fat',
        weight: 30,
        unit: 'g',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: user[0][0].id,
        id_food: food[0][0].id,
        name: 'Protein',
        weight: 40,
        unit: 'g',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    return queryInterface.bulkInsert('nutrition', [...preparedData]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('nutrition', null, {});
  },
};
