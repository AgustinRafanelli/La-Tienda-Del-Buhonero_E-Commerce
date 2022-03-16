const { User, Product, Cart, Category } = require("./models");

User.create({
  name: "Admin",
  email: "admin@gmail.com",
  password: "1234",
  isAdmin: true,
});
User.create({
  name: "Rafa",
  email: "rafa@gmail.com",
  password: "1234",
  isAdmin: true,
})
  .then((user) => {
    Product.create({
      title: "Pistola",
      brand: "ACME",
      model: "9mm",
      description: "tira tiros",
      price: 50,
      stock: 5,
    })
      .then((product) => {
        user.addProduct(product);
      })
      .then(() => {
        Product.create({
          title: "Metralleta",
          brand: "ACME",
          model: "9mm",
          description: "tira tiros",
          price: 500,
          stock: 5,
        })
          .then((product) => {
            user.addToCart(product.id)
            Category.findByPk(1).then((categories)=>{
              categories.addProduct(product.id)
            })
          })
          /* .then(cart => console.log(cart)) */
          .then(() => {
            User.findOne({
              where: { email: "rafas@gmail.com" },
              include: Product,
            })
              .then((user) => {
                /*  console.log(user); return user.getProducts() */
              })
              .then((bool) => {
                /* console.log(bool) */
              });
          });
      });
  })
  .catch((err) => console.log("find one ", err));
Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Lanzacohetes",
    brand: "ACME",
    model: "bom-17",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});

Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Pistola",
    brand: "ACME",
    model: "Glock",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});

Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Pistola",
    brand: "ACME",
    model: "Glock",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});

Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Pistola",
    brand: "ACME",
    model: "Glock",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});

Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Pistola",
    brand: "ACME",
    model: "Glock",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});

Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Pistola",
    brand: "ACME",
    model: "Glock",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});

Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Pistola",
    brand: "ACME",
    model: "Glock",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});

Category.create({ name: "armas" }).then((category) => {
  Product.create({
    title: "Pistola",
    brand: "ACME",
    model: "Glock",
    description: "tira tiros",
    price: 500,
    stock: 5,
  }).then((product) => {
    category.addProduct(product.id);
  });
});


