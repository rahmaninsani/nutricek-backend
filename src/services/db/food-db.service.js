const sequelize = require('sequelize');
const { Food } = require('../../models/db');

const Service = require('./service');
const { binToUUID, uuidToBin, todayDate } = require('../../utils');

class FoodDbService extends Service {
  static async findOneFood({ idFood }) {
    // console.log(idFood);

    const options = {
      attributes: {
        include: [[binToUUID('id', 1), 'id']],
      },
      where: {
        id: idFood,
      },
    };

    return await super.findOne(options);
  }

  static async createFood(food, transaction) {
    const payload = {
      name: food.name,
      date: todayDate(),
    };

    const options = { transaction };

    return await super.create(payload, options);
  }

  static async deleteFood({ idFood }, transaction) {
    const options = {
      where: {
        id: {
          [sequelize.Op.eq]: uuidToBin(idFood, 1),
        },
      },
      transaction,
    };

    return await super.delete(options);
  }
}

FoodDbService.model = Food;

module.exports = FoodDbService;
