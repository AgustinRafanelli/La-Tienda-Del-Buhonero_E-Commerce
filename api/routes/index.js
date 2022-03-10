const express = require('express');
const router = express.Router();
const users = require('./users');
const products = require('./products');
const cart = require('./cart');

const isLogged = (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  next();
};

router.use('/users', users);
router.use('/products', products);
router.use('/cart', isLogged, cart);

module.exports = router;
