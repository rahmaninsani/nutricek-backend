const { sequelize } = require('../models/db');
const { NutritionApiService } = require('../services/api');
const { UserDbService, FoodDbService, NutritionDbService } = require('../services/db');
const FormData = require('form-data');

class FoodNutritionController {
  static async getAll(req, res) {
    try {
      const { email } = req.user;
      const { id: idUser } = await UserDbService.findOneUserByEmail(email);
      const data = await NutritionDbService.findAllFoodNutrition(idUser);

      const nutritions = data.reduce((prev, curr) => {
        const name = curr.name.toLowerCase();
        const index = prev.findIndex((obj) => obj?.date === curr.date);

        if (index < 0) {
          const foodNutritions = {
            date: curr.date,
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
          };
          foodNutritions[name] = curr.weight;
          prev.push(foodNutritions);
        } else {
          prev[index][name] += curr.weight;
        }

        return prev;
      }, []);

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
        data: { nutritions },
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
