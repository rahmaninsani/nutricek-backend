const { NutritionApiService } = require('../services');
class NutritionController {
  static async getAll(req, res) {
    try {
      const { data: recipe } = await NutritionApiService.getRecipe('Burger');

      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
        data: { recipe },
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }
  static async add(req, res) {
    try {
      const { name } = req.body;

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: { name },
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }
}

module.exports = NutritionController;
