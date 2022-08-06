const router = require('express').Router();

const { AuthController } = require('../controllers');

router.delete('/', AuthController.signout);

module.exports = router;
