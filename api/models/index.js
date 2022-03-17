const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const Review = require('./Review');

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

Product.belongsToMany(Category, { through: 'product_category' });
Category.belongsToMany(Product, { through: 'product_category' });

Review.belongsTo(User);
Review.belongsTo(Product);

module.exports = { User, Product, Category, Cart, Review };
