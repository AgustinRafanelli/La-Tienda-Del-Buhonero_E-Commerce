const S = require('sequelize')
const sequelize = require('../config/db')

const Cart = sequelize.define("cart", 
{ 
  amount: {
    type: S.DataTypes.INTEGER,
    defaultValue: 1
  }
}, 
{ timestamps: false, freezeTableName: true})


module.exports = Cart 