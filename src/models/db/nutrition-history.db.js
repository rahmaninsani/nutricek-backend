'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NutritionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.NutritionHistoryDetail, {
        foreignKey: 'id_nutrition_history',
        as: 'NutritionHistoryDetail',
      });
    }
  }
  NutritionHistory.init(
    {
      id: {
        allowNull: false,
        defaultValue: sequelize.literal('UUID_TO_BIN(UUID(), 1)'),
        primaryKey: true,
        type: 'BINARY(16)',
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: 'TIMESTAMP',
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'NutritionHistory',
      tableName: 'nutrition_history',
    }
  );
  return NutritionHistory;
};
