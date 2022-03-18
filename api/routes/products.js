const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const { Op } = require('sequelize');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Product.update(req.body, { where: { id: req.params.id }, returning: true })
    .then(product => {
      res.send(product[1][0]);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(202))
    .catch(next);
});

router.get('/search/:title', (req, res, next) => {
  Product.findAll({
    where: {
      title: {
        [Op.like]: `%${
          req.params.title[0].toUpperCase() +
          req.params.title
            .slice(1)
            .split('')
            .map(letter => letter.toLowerCase())
            .join('')
        }%`,
      },
    },
  })
    .then(products => res.send(products))
    .catch(next);
});

module.exports = router;
