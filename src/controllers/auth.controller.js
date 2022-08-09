const { sequelize } = require('../models/db');
const { UserDbService } = require('../services/db');
const { compare, generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils');

class AuthController {
  static async signup(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { name, email, password } = req.body;
      const user = await UserDbService.findOneUserByEmail(email);

      if (user) {
        return res.status(400).json({
          code: res.statusCode,
          status: 'Email is Already Registered',
        });
      }

      await UserDbService.createUser({ name, email, password }, transaction);
      await transaction.commit();

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
      });
    } catch (error) {
      transaction.rollback();
      res.sendStatus(500).end();
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserDbService.findOneUserByEmail(email);

      if (user === null) {
        return res.status(404).json({
          code: res.statusCode,
          status: 'Email Not Found',
        });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          code: res.statusCode,
          status: 'Invalid Password',
        });
      }

      const accessToken = generateAccessToken({ name: user.name, email: user.email });
      // const refreshToken = generateRefreshToken({ name: user.name, email: user.email });

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          name: user.name,
          email: user.email,
          accessToken,
          // refreshToken,
        },
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }

  static async refreshToken(req, res) {
    try {
      const { name, email } = req.user;
      const { refreshToken } = req.body;
      const isValid = verifyRefreshToken(refreshToken, { name, email });

      if (!isValid) {
        return res.status(401).json({
          code: res.statusCode,
          status: 'Invalid Token. Try Sign In Again',
        });
      }

      const newAccessToken = generateAccessToken({ name, email });
      const newRefreshToken = generateRefreshToken({ name, email });

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          newAccessToken,
          newRefreshToken,
        },
      });
    } catch (error) {
      res.sendStatus(500).end();
    }
  }

  static async signout(req, res) {
    // try {
    const { authorization } = req.headers;
    console.log(authorization);

    req.user.deleteToken(req.token, (err, user) => {
      if (error) return res.status(400).send(error);

      res.status(204).json({
        code: res.statusCode,
        status: 'No Content',
      });
    });
    // } catch (error) {
    //   res.sendStatus(500).end();
    // }
  }
}

module.exports = AuthController;
