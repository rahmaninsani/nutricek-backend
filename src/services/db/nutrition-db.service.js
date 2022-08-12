const sequelize = require('sequelize');
const { Nutrition, Food } = require('../../models/db');

const Service = require('./service');
const { uuidToBin } = require('../../utils');

class NutritionDbService extends Service {
  static async findAllFoodNutrition(idUser) {
    const options = {
      attributes: [[sequelize.col('Food.date'), 'date'], 'name', 'weight'],
      include: [
        {
          model: Food,
          as: 'Food',
          attributes: [],
          required: true,
        },
      ],
      where: {
        idUser: {
          [sequelize.Op.eq]: idUser,
        },
      },
    };

    return await super.findAll(options);
  }

  static async findAllUserFoodNutrition(idUser, idFood) {
    const options = {
      attributes: [
        ['id_user', 'idUser'],
        ['id_food', 'idFood'],
      ],
      where: {
        idUser: {
          [sequelize.Op.eq]: idUser,
        },
        idFood: {
          [sequelize.Op.eq]: uuidToBin(idFood, 1),
        },
      },
    };

    return await super.findAll(options);
  }

  static async createNutrition(nutrition, transaction) {
    const payload = {
      idUser: nutrition.idUser,
      idFood: nutrition.idFood,
      name: nutrition.name,
      weight: nutrition.weight,
      unit: nutrition.unit,
    };

    const options = { transaction };

    return await super.create(payload, options);
  }

  static async deleteNutrition({ idUser, idFood }, transaction) {
    const options = {
      where: {
        idUser: {
          [sequelize.Op.eq]: idUser,
        },
        idFood: {
          [sequelize.Op.eq]: uuidToBin(idFood, 1),
        },
      },
      transaction,
    };

    return await super.delete(options);
  }
}

NutritionDbService.model = Nutrition;

module.exports = NutritionDbService;
