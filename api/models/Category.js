const S = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const Product = require("./Product");

class Category extends S.Model {}

Category.init(
  {
    name: {
      type: S.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "categories",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Category;
