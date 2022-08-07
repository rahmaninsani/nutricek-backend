const { Nutrition } = require('../../models/db');

const Service = require('./service');

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
}

NutritionDbService.model = Nutrition;

module.exports = NutritionDbService;
