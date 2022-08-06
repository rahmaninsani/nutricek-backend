const router = require('express').Router();

const { AuthController } = require('../controllers');

router.post('/', AuthController.register);

module.exports = router;
