const router = require('express').Router();

const { AuthController } = require('../controllers');

router.post('/', AuthController.refreshToken);

module.exports = router;
