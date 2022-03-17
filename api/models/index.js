const Review = require('./Review');
const User = require('./User')
const Product = require('./Product')
const Category = require('./Category')
const Cart = require('./Cart')
const Orders = require('./Orders')

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

Product.belongsToMany(Category, { through: 'product_category' });
Category.belongsToMany(Product, { through: 'product_category' });

Review.belongsTo(User);
Review.belongsTo(Product);

User.hasMany(Orders)
Orders.belongsTo(User)

Product.belongsToMany(Category, { through: 'product_category' })
Category.belongsToMany(Product, { through: 'product_category' })

module.exports = { User, Product, Category, Cart, Orders, Review }

