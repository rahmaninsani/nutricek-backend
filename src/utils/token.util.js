const jwt = require('jsonwebtoken');
const accessSecret = process.env.ACCESS_SECRET || '$AcCeSs-sEcReT$';
const refreshSecret = process.env.REFRESH_SECRET || '$ReFrEsH-sEcReT$';

const generateAccessToken = ({ name, email }) => {
  const data = { name, email };
  const options = { expiresIn: '15 minutes' };

  return jwt.sign(data, accessSecret, options);
};

const generateRefreshToken = ({ name, email }) => {
  const data = { name, email };
  const options = { expiresIn: '30 days' };

  return jwt.sign(data, refreshSecret, options);
};

const verifyAccessToken = (accessToken, done) => {
  const options = (error, decodedUser) => {
    return error ? done(Error) : done(null, decodedUser);
  };

  return jwt.verify(accessToken, accessSecret, options);
};

const verifyRefreshToken = (refreshToken, { name, email }) => {
  try {
    const decodedUser = jwt.verify(refreshToken, refreshSecret);
    return decodedUser.name === name && decodedUser.email === email;
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
