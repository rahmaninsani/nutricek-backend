const { sequelize } = require('../models/db');
const { UserDbService } = require('../services/db');
const { compare, generateAccessToken } = require('../utils');

class AuthController {
  static async register(req, res) {
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

      const accessToken = generateAccessToken({ id: user.id, name: user.name, email: user.email });

      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {
          accessToken,
        },
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }

  static async signout(req, res) {
    try {
      res.status(204).json({
        code: res.statusCode,
        status: 'No Content',
      });
    } catch (err) {
      res.sendStatus(500).end();
    }
  }
}

module.exports = AuthController;
