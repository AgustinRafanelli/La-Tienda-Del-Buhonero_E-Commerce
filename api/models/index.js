const User = require('./User')
const Product = require('./Product')
const Category = require('./Category')
const Cart = require('./Cart')
const Orders = require('./Orders')

User.belongsToMany(Product, { through: Cart})
Product.belongsToMany(User, { through: Cart})

/* 
User.belongsToMany(Product, { through: Orders, as: 'history'  })
Product.belongsToMany(User, { through: Orders, as: 'history' }) */

Product.belongsToMany(Category, { through: 'product_category' })
Category.belongsToMany(Product, { through: 'product_category' })

User.hasMany(Orders)
Orders.belongsTo(User)

module.exports = { User, Product, Category, Cart, Orders }