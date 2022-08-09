const { sequelize } = require('../models/db');
const { NutritionApiService } = require('../services/api');
const { UserDbService, FoodDbService, NutritionDbService } = require('../services/db');
const FormData = require('form-data');
// const fs = require('fs');

class FoodNutritionController {
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
    } catch (error) {
      res.sendStatus(500).end();
    }
  }

  static async add(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { email } = req.user;
      const formData = new FormData();
      const foodNutritions = [];
      const { buffer } = req.file;
      formData.append('file', buffer, 'food.jpg');

      // const buffer = fs.readFileSync(__dirname + '/food.jpeg');
      // formData.append('file', buffer, 'food.jpeg');

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

          const name = key[0].toUpperCase().concat(key.slice(1));
          const weight = values.value;
          const unit = values.unit === 'calories' ? 'kcal' : values.unit;

          const data = {
            name,
            weight,
            unit,
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

      const { id: uuidFood } = await FoodDbService.findOneFood({ idFood });

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          id: uuidFood,
          foodName,
          foodNutritions,
        },
      });
    } catch (error) {
      transaction.rollback();
      res.sendStatus(500).end();
    }
  }

  static async delete(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { idFood } = req.params;
      const { email } = req.user;
      const { id: idUser } = await UserDbService.findOneUserByEmail(email);

      const deleteNutrition = await NutritionDbService.deleteNutrition({ idUser, idFood }, transaction);
      if (deleteNutrition < 1) {
        return res.status(404).json({
          code: res.statusCode,
          status: 'Food Nutrition Not Found',
        });
      }

      await FoodDbService.deleteFood({ idFood }, transaction);
      await transaction.commit();

      res.status(204).json({
        code: res.statusCode,
        status: 'No Content',
      });
    } catch (error) {
      transaction.rollback();
      res.sendStatus(500).end();
    }
  }
}

module.exports = FoodNutritionController;
