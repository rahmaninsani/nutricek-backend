const { User } = require('../../models/db');

const Service = require('./service');
const { hash } = require('../../utils');

class UserDbService extends Service {
  static async findOneUserByEmail(email) {
    const options = {
      where: {
        email,
      },
    };
    return await super.findOne(options);
  }

  static async createUser(user, transaction) {
    const hashedPassword = await hash(user.password);
    const payload = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    };

    const options = { transaction };

    return await super.create(payload, options);
  }
}

UserDbService.model = User;

module.exports = UserDbService;
