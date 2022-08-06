const FormData = require('form-data');
const { NutritionApiService } = require('../services/api');

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
    try {
      const formData = new FormData();
      const { buffer } = req.file;

      formData.append('file', buffer, 'food.jpg');

      const { data } = await NutritionApiService.getNutritionByImage(formData);

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          category: data.category,
          nutrition: data.nutrition,
        },
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }
}

module.exports = NutritionController;
