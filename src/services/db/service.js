class Service {
  static model;

  static async findOne(options) {
    return await this.model.findOne({ raw: true, ...options });
  }

  static async create(payload, options) {
    return await this.model.create(payload, options);
  }
}

module.exports = Service;
