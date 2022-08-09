const sequelize = require('sequelize');
const { Nutrition } = require('../../models/db');

const Service = require('./service');
const { binToUUID, uuidToBin } = require('../../utils');

class NutritionDbService extends Service {
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
