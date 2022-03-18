const { Category, Product } = require("../models");
const express = require("express");
const router = express.Router();

const isLogedAndAdmin = (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  if (!req.user.isAdmin) return res.sendStatus(401);
  next();
};

router.get("/", (req, res, next) => {
  Category.findAll()
    .then((data) => res.send(data))
    .catch(next);
});

router.get("/:category/count", (req, res, next) => {
  Category.findOne({ where: { name: req.params.category } })
    .then((category) => category.countProducts())
    .then((data) => res.status(200).send(`${data}`))
    .catch(next);
});

router.get("/:category", (req, res, next) => {
  Category.findOne({ where: { name: req.params.category } })
    .then((category) => category.getProducts())
    .then((data) => res.send(data))
    .catch(next);
});

router.post("/", isLogedAndAdmin, (req, res, next) => {
  Category.create(req.body)
    .then((category) => res.sendStatus(201).send(category))
    .catch(next);
});

router.post("/:category", isLogedAndAdmin, (req, res, next) => {
  Category.findOne({ where: { name: req.params.category } })
    .then((category) => category.addProduct(req.body.productId))
    .then((data) => res.send(data))
    .catch(next);
});

router.put("/:category", isLogedAndAdmin, (req, res, next) => {
  Category.findOne({ where: { name: req.params.category } })
    .then((category) => category.update({ name: req.body.name }))
    .then((data) => res.send(data))
    .catch(next);
});

router.delete("/:id", isLogedAndAdmin, (req, res, next) => {
  Category.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(202))
    .catch(next);
});

router.delete("/:category/:productId", isLogedAndAdmin, (req, res, next) => {
  Category.findOne({ where: { name: req.params.category } })
    .then((category) => {
      Product.findOne({ where: { id: req.params.productId } })
        .then((product) => {
          category.removeProduct(product);
        })
        .then(() => category.getProducts())
        .then((data) => res.status(202).send(data));
    })
    .catch(next);
});

module.exports = router;