const {User, Product, Cart} = require('./models')

User.create({ name: 'Rafa', email: 'rafa@gmail.com', password: '1234' })
  .then(user =>{
    Product.create({ title: 'Pistola', brand: 'ACME', model: '9mm', description: 'tira tiros', price: 50, stock: 5 })
      .then(product => { user.addProduct(product) })
      .then(() => {
        Product.create({ title: 'Metralleta', brand: 'ACME', model: '9mm', description: 'tira tiros', price: 500, stock: 5 })
          .then(product =>  user.addToCart(product.id,3))
          .then(cart => console.log(cart))
          .then(() => {
            User.findOne({
              where: { email: 'rafas@gmail.com' },
              include: Product
            })
              .then(user => {/*  console.log(user); return user.getProducts() */ })
              .then(bool => {/* console.log(bool) */})
             
          })
      })
  })
  .catch(err => console.log('find one ',err))  