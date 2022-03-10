const S = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')
const Product = require('./Product')
const Cart = require('./Cart')

class User extends S.Model {}

User.init({
  name:{
    type: S.DataTypes.STRING,
    allowNull:false 
  },
  email: {
    type: S.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  },
  isAdmin:{
    type: S.DataTypes.BOOLEAN,
    defaultValue: false
  },
  password:{
    type: S.DataTypes.STRING,
    allowNull: false
  },
  salt:{
    type: S.DataTypes.STRING
  }
}, { sequelize, modelName: "users"})

User.prototype.hash = (password, salt) => {
  return bcrypt.hash(password, salt)
}

/**
 * Esta funcion agrega un producto al carrito del usuario
 * @param {int} productId es el id del producto que se desea agregar al carrito
 * @param {int} amount indica la cantidad del mismo producto que se desea agregar
 */
User.prototype.addToCart = function (productId, amount = 1){
  return Product.findByPk(productId)
    .then(async product=>{
      await this.addProduct(product, { through: { amount } })
      .then(()=>{})
    })
    
}
/**
 * Moidifica la cantidad de un producto existente
 * @param {int} productId es el id del producto que se desea modificar del carrito
 * @param {int} amount indica la cantidad del mismo producto que se desea agregar
 */
User.prototype.changeProductAmount = function(productId, amount){
  return Cart.update({ count: amount }, { where: { userId: this.id, productId } })
}
/**
 * Agrega 1 mas de producto al carrito
 * @param {int} productId es el id del producto que se desea modificar del carrito
 */
User.prototype.moreProduct =  function(productId){
  return Cart.findOne({ where: { userId: this.id, productId }})
    .then( async cart => {
      await cart.update( {count: cart.count + 1})
      await cart.save()
    })
}
/**
 * Remueve 1 del producto del carrito
 * @param {int} productId es el id del producto que se desea modificar del carrito
 */
User.prototype.lessProduct = function (productId) {
  return Cart.findOne({ where: { userId: this.id, productId } })
    .then(async cart => {
      await cart.update({ count: cart.count - 1 })
      await cart.save()
    })
}
/**
 * Remueve un producto del carrito
 * @param {int} productId es el id del producto que se desea modificar del carrito
 */
User.prototype.removeFromCart = function(productId){
  return Cart.destroy({ where: { userId: this.id, productId } })
}
/**
 * Borra el carrito del usuario
 */
User.prototype.removeCart = function () {
  return Cart.destroy({ where: { userId: this.id } })
}

User.beforeCreate(user => {
  return bcrypt
    .genSalt(16)
    .then(salt => {
      user.salt = salt
      return user.hash(user.password, user.salt)
    })
    .then(hash => user.password = hash)
})

module.exports = User