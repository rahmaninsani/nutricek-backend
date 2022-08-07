const router = require('express').Router();

const { isAuthenticated } = require('../middlewares');

const registerRoute = require('./register.route');
const signinRoute = require('./signin.route');
const refreshTokenRoute = require('./refresh-token.route');
const signoutRoute = require('./signout.route');
const nutritionRoute = require('./nutrition.route');

router.use('/register', registerRoute);
router.use('/signin', signinRoute);
router.use('/refresh-token', isAuthenticated, refreshTokenRoute);
router.use('/signout', signoutRoute);
router.use('/nutrition', isAuthenticated, nutritionRoute);
router.use('/', (req, res) => {
  res.status(200).json({
    code: res.statusCode,
    status: 'OK',
  });
});

module.exports = router;
