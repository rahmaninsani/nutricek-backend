const express = require('express');
const router = express.Router();

const nutritionRoute = require('./nutrition.route');

router.use('/nutrition', nutritionRoute);
router.use('/', (req, res) => {
  res.status(200).json({
    code: res.statusCode,
    status: 'OK',
  });
});

module.exports = router;
