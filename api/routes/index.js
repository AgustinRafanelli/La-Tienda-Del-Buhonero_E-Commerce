const express = require('express');
const router = express.Router();
const users = require('./users');
const products = require('./products');
const cart = require('./cart');
const category = require('./category');
const reviews = require('./reviews');

const isLogged = (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  next();
};

router.use('/users', users);
router.use('/products', products);
router.use('/cart', isLogged, cart);
router.use('/category', category);
router.use('/reviews', reviews);

module.exports = router;
