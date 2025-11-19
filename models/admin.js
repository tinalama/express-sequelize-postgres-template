"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      f_name: {
        types: DataTypes.STRING,
        allowNull: false,
      },
      l_name: {
        types: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        types: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        types: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
