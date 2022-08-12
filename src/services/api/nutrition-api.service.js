const Service = require('./service');
const { NutritionApi } = require('../../models/api');

class NutritionApiService extends Service {
  static async getNutritionByImage(formData) {
    return await this.model.post('/food/images/analyze', formData);
  }
}

NutritionApiService.model = NutritionApi;

module.exports = NutritionApiService;
