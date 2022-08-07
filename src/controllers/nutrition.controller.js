const { sequelize } = require('../models/db');
const { NutritionApiService } = require('../services/api');
const { UserDbService, FoodDbService, NutritionDbService } = require('../services/db');
const FormData = require('form-data');
const fs = require('fs');

class NutritionController {
  static async getAll(req, res) {
    try {
      const { query } = req.query;
      const { data } = await NutritionApiService.getRecipe(query);

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
        data: {
          results: data.results,
        },
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }

  static async add(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { email } = req.user;
      const formData = new FormData();
      const foodNutritions = [];
      // const { buffer } = req.file;
      // formData.append('file', buffer, 'food.jpg');

      const buffer = fs.readFileSync(__dirname + '/food.jpeg');
      formData.append('file', buffer, 'food.jpeg');

      const { data } = await NutritionApiService.getNutritionByImage(formData);
      let foodName = data.category.name;
      const nutritions = data.nutrition;

      foodName = foodName[0].toUpperCase().concat(foodName.slice(1));
      await FoodDbService.createFood({ name: foodName }, transaction);

      const { id: idUser } = await UserDbService.findOneUserByEmail(email);
      const { id: idFood } = await FoodDbService.findLastInsertedRow(transaction);

      await Promise.all(
        Object.entries(nutritions).map(async ([key, values]) => {
          if (key === 'recipesUsed') return;

          const nutritionName = key[0].toUpperCase().concat(key.slice(1));
          const data = {
            name: nutritionName,
            weight: values.value,
            unit: values.unit,
          };

          foodNutritions.push(data);

          const payload = {
            idUser,
            idFood,
            ...data,
          };

          await NutritionDbService.createNutrition(payload, transaction);
        })
      );

      await transaction.commit();

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          foodName,
          foodNutritions,
        },
      });
    } catch (err) {
      transaction.rollback();
      res.sendStatus(500).end();
    }
  }
}

module.exports = NutritionController;
