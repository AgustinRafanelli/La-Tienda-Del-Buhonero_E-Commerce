const S = require('sequelize');
const sequelize = require('../config/db');

class Product extends S.Model {}

Product.init(
  {
    title: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: S.DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: S.DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: S.DataTypes.INTEGER,
      allowNull: false,
    },
    imgUrl: {
      type: S.DataTypes.STRING,
    },
    ratingSum: {
      type: S.DataTypes.INTEGER,
      defaultValue: 0,
    },
    ratingLength: {
      type: S.DataTypes.INTEGER,
      defaultValue: 0,
    },
    comments: {
      type: S.DataTypes.TEXT,
    },
  },
  { sequelize, modelName: 'products' }
);

module.exports = Product;
