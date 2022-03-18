const express = require('express');
const router = express.Router();
const { Review, Product } = require('../models');

const isLogged = (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  next();
};

router.get('/valorations/average/:productId', (req, res, next) => {
  Review.findAll({ where: { productId: req.params.productId } })
    .then(reviews => {
      if (reviews.length) {
        let acc = 0;
        reviews.forEach(review => {
          acc += review.valoration;
        });
        return res.send(`${Math.round(acc / reviews.length)}`);
      }
      res.send('0');
    })
    .catch(next);
});

router.get('/valorations/:productId', isLogged, (req, res, next) => {
  Review.findOne({
    where: { productId: req.params.productId, userId: req.user.id },
  })
    .then(review => {
      if (!review) { 
        res.send('0')
      } else {
        res.send(`${review.valoration}`)
      }
    })
    .catch(next);
});

router.post('/valorations/:productId', isLogged, (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      Review.create(req.body).then(review => {
        review.setUser(req.user);
        review.setProduct(product);
        res.status(201).send(`${review.valoration}`);
      });
    })
    .catch(next);
});

router.put('/valorations/:productId', isLogged, (req, res, next) => {
  Review.update(req.body, {
    where: { productId: req.params.productId, userId: req.user.id },
    returning: true,
  })
    .then(([_, updated]) => {
      res.send(`${updated[0].valoration}`);
    })
    .catch(next);
});

router.get('/comments/:productId', isLogged, (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      if (!product.comments) return res.send([]);
      res.send(JSON.parse(product.comments));
    })
    .catch(next);
});

router.post('/comments/:productId', isLogged, (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      let aux;
      if (!product.comments) aux = [];
      else aux = JSON.parse(product.comments);
      aux.push(req.body.comment);
      Product.update(
        { comments: JSON.stringify(aux) },
        { where: { id: req.params.productId } }
      );
      res.status(201).send(aux);
    })
    .catch(next);
});

module.exports = router;
