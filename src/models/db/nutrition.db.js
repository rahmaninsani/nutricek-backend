'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Nutrition extends Model {
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
      this.belongsTo(models.Food, {
        foreignKey: 'id_food',
      });
    }
  }
  Nutrition.init(
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
      idFood: {
        allowNull: false,
        field: 'id_food',
        primaryKey: true,
        references: {
          model: 'food',
          key: 'id',
        },
        type: 'BINARY(16)',
      },
      name: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.ENUM('Calories', 'Carbs', 'Fat', 'Protein'),
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      unit: {
        allowNull: false,
        type: DataTypes.STRING(10),
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
      modelName: 'Nutrition',
      tableName: 'nutrition',
    }
  );
  return Nutrition;
};
