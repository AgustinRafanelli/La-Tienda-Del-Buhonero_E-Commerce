const S = require('sequelize')
const sequelize = require('../config/db')

class Product extends S.Model { }

Product.init({
  title: {
    type: S.DataTypes.STRING,
    allowNull: false
  }, 
  brand: {
    type: S.DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: S.DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: S.DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: S.DataTypes.INTEGER,
    allowNull: false
  },
  stok: {
    type: S.DataTypes.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: S.DataTypes.STRING
  },
}, { sequelize, modelName: "products" })

module.exports = Product