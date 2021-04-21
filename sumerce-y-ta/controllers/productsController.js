const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

exports.carrito = (req, res) => {
  res.render("products/cart");
};

exports.categorias = async (req, res) => {
  const category = req.params.category;
  const products = await db.Products.findAll({
    include: [{ association: "categoria" }],
    raw: true,
    neft: true,
  });
  res.render("products/categories", {
    products: products,
    toThousand: toThousand,
    category: category,
  });
};

exports.producto = async (req, res) => {
  const product = await db.Products.findByPk(
    req.params.id,
    {
      include: [
        { association: "categoria" },
        { association: "sizes" },
        { association: "colors" },
      ],
    },
    {
      raw: true,
      neft: true,
    }
  );
  res.render("products/product", {
    product: product,
    toThousand: toThousand,
  });
};

exports.admproducto = async (req, res) => {
  const products = await db.Products.findAll(
    {
      include: [
        { association: "categoria" },
        { association: "sizes" },
        { association: "colors" },
      ],
    },
    {
      raw: true,
      neft: true,
    }
  );

  let salida = JSON.parse(JSON.stringify(products));
  res.render("products/admproduct", {
    products: salida,
    toThousand: toThousand,
  });
};

exports.create = async (req, res) => {
  const tallas = await db.Sizes.findAll({ raw: true, neft: true });
  const tonalidades = await db.Colors.findAll({ raw: true, neft: true });
  const categorias = await db.Categories.findAll({ raw: true, neft: true });
  res.render("products/createProduct", {
    categorias: categorias,
    tallas: tallas,
    tonalidades: tonalidades,
  });
};

exports.store = async (req, res) => {
  let product = {};

  product.name = req.body.name;
  product.description = req.body.description;
  if (req.file) {
    product.photo = req.file.filename;
  } else {
    product.photo = null;
  }
  product.price = parseFloat(req.body.price);
  product.categories = parseInt(req.body.categories);

  if (typeof req.body.sizes === "string") {
    let sizes = [];
    sizes.push(req.body.sizes);
    product.sizes = sizes;
  } else {
    product.sizes = req.body.sizes;
  }
  if (typeof req.body.color === "string") {
    let colors = [];
    colors.push(req.body.types);
    product.colors = colors;
  } else {
    product.colors = req.body.color;
  }
  let created = await db.Products.create({
    name: product.name,
    photo: product.photo,
    description: product.description,
    price: product.price,
    category_id: product.categories,
  });
  created = JSON.parse(JSON.stringify(created));
  if (product.sizes) {
    product.sizes.forEach((size) =>
      db.ProductsSizes.create({
        product_id: created.idproduct,
        size_id: parseInt(size),
      })
    );
  }
  if (product.colors) {
    product.colors.forEach((color) =>
      db.ProductsColors.create({
        product_id: created.idproduct,
        color_id: parseInt(color),
      })
    );
  }
  res.redirect("/products/admproducto");
};

exports.edit = async (req, res) => {
  const tallas = await db.Sizes.findAll({ raw: true, neft: true });
  const tonalidades = await db.Colors.findAll({ raw: true, neft: true });
  const categorias = await db.Categories.findAll({ raw: true, neft: true });
  let product = await db.Products.findByPk(
    req.params.id,
    {
      include: [
        { association: "categoria" },
        { association: "sizes" },
        { association: "colors" },
      ],
    },
    {
      raw: true,
      neft: true,
    }
  );
  product = JSON.parse(JSON.stringify(product));
  res.render("products/editProduct", {
    product: product,
    tallas: tallas,
    tonalidades: tonalidades,
    toThousand: toThousand,
    categorias: categorias,
  });
};

exports.update = (req, res) => {
  let sizes = [];
  let colors = [];
  if (typeof req.body.sizes === "string") {
    sizes.push(req.body.sizes);
  } else {
    sizes = req.body.sizes;
  }

  if (typeof req.body.color === "string") {
    colors.push(req.body.color);
  } else {
    colors = req.body.color;
  }
  req.body.categories = parseInt(req.body.categories);
  req.body.price = parseFloat(req.body.price);
  console.log(req.body);
  db.Products.update(
    {
      name: req.body.name,
      photo: req.body.file ? req.body.file.filename : null,
      description: req.body.description,
      price: req.body.price,
      category_id: req.body.categories,
    },
    {
      where: { idproduct: req.params.id },
    }
  )
    .then(
      db.ProductsSizes.destroy({
        where: { product_id: req.params.id },
      }).then(
        sizes
          ? sizes.forEach((size) =>
              db.ProductsSizes.create({
                product_id: req.params.id,
                size_id: parseInt(size),
              })
            )
          : null
      )
    )
    .then(
      db.ProductsColors.destroy({
        where: { product_id: req.params.id },
      }).then(
        colors
          ? colors.forEach((color) =>
              db.ProductsColors.create({
                product_id: req.params.id,
                color_id: parseInt(color),
              })
            )
          : null
      )
    )
    .then(res.redirect("/products/admproducto"));
};

exports.delete = (req, res) => {
  db.ProductsColors.destroy({
    where: { product_id: req.params.id },
  }).then(
    db.ProductsSizes.destroy({
      where: { product_id: req.params.id },
    }).then(
      db.Products.destroy({
        where: { idproduct: req.params.id },
      }).then(res.redirect("/products/admproducto"))
    )
  );
};
