const { sequelize } = require('../models/db');
const { UserDbService } = require('../services/db');

class AuthController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    const transaction = await sequelize.transaction();

    try {
      const user = await UserDbService.findOneUserByEmail(email);

      if (user) {
        return res.status(400).json({
          code: res.statusCode,
          status: 'Email is already registered',
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
      res.status(201).json({
        code: res.statusCode,
        status: 'Created',
        data: {},
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
