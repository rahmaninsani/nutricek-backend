require('dotenv').config();
const axios = require('axios');

const NutritionApi = axios.create({
  baseURL: process.env.SPOONACULAR_BASE_URL,
  params: {
    apiKey: process.env.SPOONACULAR_API_KEY,
  },
});

NutritionApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

module.exports = NutritionApi;
