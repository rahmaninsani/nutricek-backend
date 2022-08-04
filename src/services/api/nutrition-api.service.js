const Service = require('../service');
const { NutritionApi } = require('../../models/api');

class NutritionApiService extends Service {
  static async getRecipe(queryValue) {
    this.model.defaults.params = {
      ...this.model.defaults.params,
      query: queryValue,
    };
    return await this.model.get('/recipes/complexSearch');
  }
}

NutritionApiService.model = NutritionApi;

module.exports = NutritionApiService;
