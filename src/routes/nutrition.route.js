const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { NutritionController } = require('../controllers');

router.get('/', NutritionController.getAll);
// router.post('/', upload.single('file'), NutritionController.add);
router.post('/', NutritionController.add);

module.exports = router;
