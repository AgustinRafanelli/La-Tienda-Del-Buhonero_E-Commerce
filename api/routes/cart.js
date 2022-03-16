const express = require('express');
const { User, Orders, Cart } = require('../models');
const transporter = require('../config/mailer');
const router = express.Router();

const isLogged = (req, res, next) => {
  if (!req.user) res.sendStatus(401);
  else next();
};
 
const pricer = price =>{
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

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

router.put('/checkout', isLogged, (req,res,next)=>{
  User.findByPk(req.user.id)
    .then(user => user.getProducts())
    .then(cart => {
      transporter.sendMail({
        to: `${req.user.name} <${req.user.email}>`,
        subject: 'Check your last purchase ✔',
        html: `<p><b>Hello</b> ${req.user.name}</p>
      <p>Here's what you bought today: </p>
      ${cart.map((product => `<p>${product.title} ${product.brand} ${product.model} x ${product.cart.amount}: ${pricer(product.price * product.cart.amount)} (${pricer(product.price)})</p>`))}
      <p>Total: ${pricer(cart.reduce((partialSum, product) => partialSum + (product.price * product.cart.amount), 0))}</p>`,
      }, (error, info) => {
        if (error) {
          console.log('Error occurred');
          console.log(error.message);
          return process.exit(1);
        }
        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));
        transporter.close();
      });
      res.sendStatus(202);
    })
    .catch(next)
})

router.put('/history', isLogged, (req,res,next)=>{
  User.findByPk(req.user.id)
    .then(user => user.getProducts()
      .then(cart => {
        let products = cart.map(product => JSON.stringify(product))
        Orders.create({ products })
          .then(order => user.addOrder(order))
          //.then(()=> Cart.destroy({ where: { userId: req.user.id } }))
          .then(()=> res.status(202).send([]))
      })
    )
    .catch(next)
})
module.exports = router;
