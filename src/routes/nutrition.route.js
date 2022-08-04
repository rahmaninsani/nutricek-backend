const express = require('express');
const router = express.Router();

const { NutritionController } = require('../controllers');

router.get('/', NutritionController.get);
router.post('/', NutritionController.add);

module.exports = router;
