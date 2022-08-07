const sequelize = require('sequelize');
const { Food } = require('../../models/db');

const Service = require('./service');
const { binToUUID, uuidToBin, todayDate } = require('../../utils');

class FoodDbService extends Service {
  static async createFood(food, transaction) {
    const payload = {
      name: food.name,
      date: todayDate(),
    };

    const options = { transaction };

    return await super.create(payload, options);
  }
}

FoodDbService.model = Food;

module.exports = FoodDbService;
