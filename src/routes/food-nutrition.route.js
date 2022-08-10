const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { FoodNutritionController } = require('../controllers');

router.get('/', FoodNutritionController.getAll);
router.post('/', upload.single('file'), FoodNutritionController.add);
router.delete('/:idFood', FoodNutritionController.delete);

module.exports = router;
