const S = require('sequelize');
const sequelize = require('../config/db');

class Orders extends S.Model { }

Orders.init(
  {
    products: {
      type: S.DataTypes.ARRAY(S.DataTypes.JSON),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'orders' }
);

module.exports = Orders