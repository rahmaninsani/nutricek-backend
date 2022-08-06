const router = require('express').Router();

const registerRoute = require('./register.route');
const signinRoute = require('./signin.route');
const signoutRoute = require('./signout.route');
const nutritionRoute = require('./nutrition.route');

router.use('/register', registerRoute);
router.use('/signin', signinRoute);
router.use('/signout', signoutRoute);
router.use('/nutrition', nutritionRoute);
router.use('/', (req, res) => {
  res.status(200).json({
    code: res.statusCode,
    status: 'OK',
  });
});

module.exports = router;
