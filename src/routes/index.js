const router = require('express').Router();

const { isAuthenticated } = require('../middlewares');

const signupRoute = require('./signup.route');
const signinRoute = require('./signin.route');
const refreshTokenRoute = require('./refresh-token.route');
const signoutRoute = require('./signout.route');
const foodNutritionRoute = require('./food-nutrition.route');

router.use('/signup', signupRoute);
router.use('/signin', signinRoute);
router.use('/refresh-token', isAuthenticated, refreshTokenRoute);
router.use('/signout', signoutRoute);
router.use('/food-nutrition', isAuthenticated, foodNutritionRoute);
router.use('*', (req, res) => {
  res.status(404).json({
    code: res.statusCode,
    status: 'Not Found',
  });
});

module.exports = router;
