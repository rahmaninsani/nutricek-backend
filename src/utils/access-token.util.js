const jwt = require('jsonwebtoken');

const generateAccessToken = ({ id, name, email }) => {
  const data = { id, name, email };
  const accessTokenSecret = process.env.TOKEN_SECRET || '$ToKeN-sEcReT$';
  const options = { expiresIn: 86400 };

  return jwt.sign(data, accessTokenSecret, options);
};

module.exports = generateAccessToken;
