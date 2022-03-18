const { User, Product, Cart, Category } = require("./models");

User.create({
  name: "Admin",
  email: "admin@gmail.com",
  password: "1234",
  isAdmin: true,
});
User.create({
  name: "Rafa",
  email: "agustinrafa1995@hotmail.com",
  password: "1234",
  isAdmin: false,
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
            user.addToCart(product.id);
            Category.findByPk(1).then((categories) => {
              categories.addProduct(product.id);
            });
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

Product.create({
  title: "Mochla",
  brand: "ACME",
  model: "Barby-17",
  description: "Puedes ser lo que quieras ser",
  price: 500,
  stock: 5,
});

Product.create({
  title: "La tuya",
  brand: "ACME",
  model: "null",
  description: "carta trampa",
  price: 500,
  stock: 5,
});
Product.create({
  title: "algo caro",
  brand: "ACME",
  model: "bom-17",
  description: "tira tiros",
  price: 1000000,
  stock: 5,
});
Product.create({
  title: "comida",
  brand: "ACME",
  model: "pan-47",
  description: "ñam ñam",
  price: 500,
  stock: 5,
})
Product.create({
  title: "gatito",
  brand: "negro",
  model: "chikito",
  description: "te sirve de compania",
  price: 1,
  stock: 1,
})
Product.create({
  title: "silla gamer",
  brand: "flex",
  model: "new-12-k",
  description: "para que te sientes comodo",
  price: 50000,
  stock: 5,
})
Product.create({
  title: "pc",
  brand: "ACME",
  model: "gamer",
  description: "juega jueguitos",
  price: 99999999,
  stock: 10,
})
Product.create({
  title: "fifa",
  brand: "pes",
  model: "2017",
  description: "vamo messi",
  price: 734,
  stock: 7,
})
