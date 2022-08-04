class NutritionController {
  static async get(req, res) {
    try {
      res.status(200).json({
        code: res.statusCode,
        status: 'OK',
        data: { nutrition: 'Nutrition' },
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
