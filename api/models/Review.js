const S = require('sequelize');
const sequelize = require('../config/db');

class Review extends S.Model {}

Review.init(
  {
    valoration: {
      type: S.DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize, modelName: 'reviews' }
);

module.exports = Review;
