const express = require('express');
const { User } = require('../models');
const router = express.Router();
const passport = require('passport');

const isLogged = (req, res, next) => {
  if (!req.user) res.sendStatus(401);
  else next();
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) res.sendStatus(401);
  else next();
};

router.post('/register', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(next);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

router.post('/logout', (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.put('/update', (req, res, next) => {
  User.update(req.body, { where: { id: req.user.id }, returning: true })
    .then(([_, updated]) => res.send(updated[0]))
    .catch(next);
});

router.get('/me', isLogged, (req, res) => {
  res.send(req.user);
});

router.put('/admin/:id', isLogged, isAdmin, (req, res, next) => {
  User.update(req.body, { where: { id: req.params.id }, returning: true })
    .then(([_, updated]) => res.send(updated[0]))
    .catch(next);
});

router.get('/admin', isLogged, isAdmin, (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

module.exports = router;
