const express = require('express');
const router = express.Router();
const { Review, Product } = require('../models');

router.get('/valorations/:productId', (req, res, next) => {
  Review.findOne({
    where: { productId: req.params.productId, userId: req.user.id },
  })
    .then(review => {
      Product.findByPk(req.params.productId).then(
        ({ ratingSum, ratingLength }) => {
          if (review) {
            res.send({
              valoration: review.valoration,
              ratingSum: ratingSum,
              ratingLength: ratingLength,
            });
          } else {
            res.send({
              valoration: 0,
              ratingSum: ratingSum,
              ratingLength: ratingLength,
            });
          }
        }
      );
    })
    .catch(next);
});

router.put('/valorations/:productId', (req, res, next) => {
  Product.update(req.body, { where: { id: req.params.productId } })
    .then(() => {
      Review.update(req.body, {
        where: { productId: req.params.productId, userId: req.user.id },
        returning: true,
      }).then(([_, updated]) => {
        res.send(updated[0]);
      });
    })
    .catch(next);
});

router.post('/valorations/:productId', (req, res, next) => {
  Product.update(req.body, {
    where: { id: req.params.productId },
    returning: true,
  })
    .then(([_, updated]) => {
      Review.findOne({
        where: { productId: req.params.productId, userId: req.user.id },
      }).then(review => {
        if (!review) {
          Review.create({
            valoration: req.body.valoration,
          }).then(review => {
            review.setUser(req.user);
            review.setProduct(updated[0]);
            res.status(201).send(review);
          });
        } else {
          review.valoration = req.body.valoration;
        }
      });
    })
    .catch(next);
});

router.get('/comments/:productId', (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      if (!product.comments) return res.send([]);
      res.send(JSON.parse(product.comments));
    })
    .catch(next);
});

router.post('/comments/:productId', (req, res, next) => {
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
