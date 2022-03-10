const S = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')

class Category extends S.Model { }

Category.init({
  name: {
    type: S.DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: "categorys" })

module.exports = Category