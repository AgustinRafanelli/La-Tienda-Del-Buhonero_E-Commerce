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
      title: "Headphone",
      brand: "Logitech",
      model: "G332",
      description: "tira tiros",
      price: 5580,
      stock: 3,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_14036_Auriculares_Logitech_G332_Leatherette_c4671f67-grn.jpg",
    })
      .then((product) => {
        user.addProduct(product);
      })
      .then(() => {
        Product.create({
          title: "Headphone",
          brand: "Redragon",
          model: "H901",
          description: "Now your dancing with this",
          price: 6040,
          stock: 5,
          imgUrl:
            "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_8854_Auriculares_Redragon_Scylla_H901_PC___PS4___Switch___XBOX_d52354ae-grn.jpg",
        })
          .then((product) => {
            user.addToCart(product.id);
            Category.findByPk(1).then((categories) => {
              categories.addProduct(product.id);
            });
          })
          .then(() => {
            User.findOne({
              where: { email: "rafas@gmail.com" },
              include: Product,
            });
          });
      });
  })
  .catch((err) => console.log("find one ", err));

Category.create({ name: "Products pc" }).then((categoryDad) => {
  Category.create({ name: "Microphone" }).then((category) => {
    Product.create({
      title: "Microphone",
      brand: "HyperX",
      model: "QuadCast Streaming-17",
      description: "For your streems bb",
      price: 16000,
      stock: 10,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30639_Microfono_HyperX_QuadCast_Streaming_PC_PS4_Condensador_2274d539-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Microphone",
      brand: "Marvo",
      model: "MIC-03 USB",
      description: "For your streems bb",
      price: 6800,
      stock: 4,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_19475_Microfono_Marvo_MIC-03_USB_Streaming_23ccc460-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });

  Category.create({ name: "Chair" }).then((category) => {
    Product.create({
      title: "Chair Gamer",
      brand: "Vertagear",
      model: "Racing Series SL-1000",
      description: "Chair blue and black",
      price: 46000,
      stock: 1,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_16825_Silla_Gamer_Vertagear_Racing_Series_SL-1000_Negro_y_Azul_f1671546-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Chair Gamer",
      brand: "Vertagear",
      model: "Racing Series SL-5000",
      description: "Chair red and black",
      price: 73500,
      stock: 1,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_16870_Silla_Gamer_Vertagear_Racing_Series_SL-5000_Negro_y_Rojo_6a03f4ef-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Chair Gamer",
      brand: "Vertagear",
      model: "Ak-Racing ARCTICA",
      description: "Chair white and black",
      price: 76300,
      stock: 2,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_16825_Silla_Gamer_Vertagear_Racing_Series_SL-1000_Negro_y_Azul_f1671546-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });

  Category.create({ name: "Monitors" }).then((category) => {
    Product.create({
      title: "Monitor",
      brand: "Samsung",
      model: "24'' Curvo F390",
      description: "Monitor gamer full pro 4K",
      price: 31240,
      stock: 3,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_8720_Monitor_Samsung_24___Curvo_F390_3a4722ad-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Monitor",
      brand: "Samsung",
      model: "27'' Curvo LC27F390FHLX",
      description: "Monitor gamer full pro 4K",
      price: 42240,
      stock: 3,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_9755_Monitor_Samsung_27___Curvo_LC27F390FHLX_b6fab1bd-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Monitor",
      brand: "Viewsonic",
      model: "27'' Elite XG270",
      description: "Monitor gamer full pro 4K",
      price: 118670,
      stock: 5,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_22739_Monitor_Viewsonic_27__Elite_XG270_240Hz_1Ms_80bab1ec-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });

  });

  Category.create({ name: "Mouse" }).then((category) => {
    Product.create({
      title: "Mouse",
      brand: "Logitech",
      model: "G903",
      description: "Now with more speed",
      price: 9999,
      stock: 5,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_9807_Mouse_Logitech_G903_Lightspeed_Wireless_Gaming_16.000dpi_86c5e07e-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Mouse",
      brand: "HyperX",
      model: "Pulsefire FPS",
      description: "Now with more speed",
      price: 3900,
      stock: 9,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_10439_Mouse_HyperX_Pulsefire_FPS_Pro_RGB_16_000DPI_c758dbf2-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });
  Category.create({ name: "Keyboards" }).then((category) => {
    Product.create({
      title: "Keyboard",
      brand: "Redragon",
      model: "K585RGB",
      description: "Now with more speed and is mechanic",
      price: 3630,
      stock: 2,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_14755_Teclado_Redragon_K585RGB_Diti_Mecanico_RGB_3c6a2bbd-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Keyboard",
      brand: "XPG",
      model: "Infarex K-10",
      description: "Now with more speed and is mechanic",
      price: 3330,
      stock: 2,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_13798_Teclado_XPG_Infarex_K10_RGB_Lighting__Mem-chanical_662b8e09-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });

  Category.create({ name: "Speakers" }).then((category) => {
    Product.create({
      title: "Speaker",
      brand: "Logitech",
      model: "S150",
      description: "USB spekers x2",
      price: 1730,
      stock: 4,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_6829_Parlantes_Logitech_S150_Black_USB_912abc90-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Speaker",
      brand: "Harman",
      model: "Kardon HK-SB20",
      description: "I don't know what it do",
      price: 51350,
      stock: 2,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_22578_Barra_de_Sonido_Harman_Kardon_HK-SB20_2.1_300W_45164ecf-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });

});

Category.create({ name: "Hardware" }).then((categoryDad) => {
  Category.create({ name: "Memory RAM" }).then((category) => {
    Product.create({
      title: "Memoria RAM",
      brand: "Redragon",
      model: "DDR4 8GB",
      description: "Buy now plis",
      price: 6080,
      stock: 20,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_18007_Memoria_Team_DDR4_8GB_3200MHz_T-Force_Delta_RGB_Black_441c03ab-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Memory RAM",
      brand: "GeiL",
      model: "DDR4 8GB",
      description: "Buy now plis",
      price: 6100,
      stock: 2,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_20524_Memoria_GeiL_DDR4_8GB_3200MHz_Orion_Black_eace4827-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });
  Category.create({ name: "Video Cards" }).then((category) => {
    Product.create({
      title: "Video Card",
      brand: "Zotac",
      model: "RTX-3090-24GB",
      description: "If you buy this, you will play minecreft",
      price: 470000,
      stock: 2,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_27768_Placa_de_Video_Zotac_GeForce_RTX_3090_24GB_GDDR6X_Trinity_bb3dd604-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Video Card",
      brand: "GeForce",
      model: "MGT-1030-2GB",
      description: "Buy now plis",
      price: 30000,
      stock: 4,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_8821_Placa_de_Video_GeForce_MSI_GT_1030_2GB_GDDR4_OC_LP_c8126a3a-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });
  Category.create({ name: "Disk" }).then((category) => {
    Product.create({
      title: "Solid disk SSD",
      brand: "Adata",
      model: "120GB-SU650SS",
      description: "Solid disk SSD 120GB",
      price: 3219,
      stock: 10,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_11226_Disco_S__lido_SSD_Adata_120GB_SU650SS_520MB_s__8b455937-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Solid disk SSD",
      brand: "ADATA",
      model: "1TB-XPG",
      description: "Solid disk SSD 1TB, buy now plis, I'm hungry",
      price: 21319,
      stock: 2,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_12623_Disco_S__lido_SSD_M.2_ADATA_1TB_XPG_S11_Pro_3D_NAND_3500MB_s_NVME_PCI-E_X4_079ac56b-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });

    Product.create({
      title: "Hard disk",
      brand: "WD",
      model: "1TB-SATA",
      description: "Hard disk 1TB",
      price: 3219,
      stock: 10,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_9018_Disco_R__gido_WD_1TB_BLUE_64MB_SATA_6.0GB_s__ca74d162-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
    Product.create({
      title: "Hard disk",
      brand: "WD",
      model: "8TB-SATA",
      description: "Buy now plis",
      price: 66000,
      stock: 5,
      imgUrl:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_25931_Disco_R__gido_WD_8TB_PURPLE_128MB_SATA_6.0GB_s_ab6fe82a-grn.jpg",
    }).then((product) => {
      category.addProduct(product.id);
      categoryDad.addProduct(product.id);
    });
  });
});
