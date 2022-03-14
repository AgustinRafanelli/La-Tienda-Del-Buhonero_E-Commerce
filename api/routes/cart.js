const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => user.getProducts())
    .then(data => {
      res.send(data);
    });
});

router.post('/', (req, res) => {
  User.findByPk(req.user.id).then(async user => {
    return await user
      .addToCart(req.body.productId, req.body.amount)
      .then(() => user.getProducts())
      .then(data => res.send(data));
  });
});

router.delete('/:productId', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      return user
        .removeFromCart(req.params.productId) 
        .then(() => user.getProducts());
    })
    .then(data => res.send(data));
});

router.delete('/', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      return user.removeCart().then(() => user.getProducts());
    })
    .then(data => res.send(data));
});

module.exports = router;
