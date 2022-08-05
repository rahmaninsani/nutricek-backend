'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NutritionHistoryDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'id_user',
      });
      this.belongsTo(models.User, {
        foreignKey: 'id_nutrition_history',
      });
    }
  }
  NutritionHistoryDetail.init(
    {
      idUser: {
        allowNull: false,
        field: 'id_user',
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      idNutritionHistory: {
        allowNull: false,
        field: 'id_nutrition_history',
        primaryKey: true,
        references: {
          model: 'nutrition_history',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      nutritionName: {
        allowNull: false,
        primaryKey: true,
        field: 'nutrition_name',
        type: DataTypes.ENUM('Calories', 'Carbs', 'Fat', 'Protein'),
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      modelName: 'NutritionHistoryDetail',
      tableName: 'nutrition_history_detail',
    }
  );
  return NutritionHistoryDetail;
};
