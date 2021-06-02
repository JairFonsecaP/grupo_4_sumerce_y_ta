const db = require("../database/models");
const { validationResult } = require("express-validator");

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
  const resultValidation = validationResult(req);

  if (typeof req.body.sizes === "string") {
    let sizes = [];
    sizes.push(req.body.sizes);
    req.body.sizes = sizes;
  }
  if (typeof req.body.colors === "string") {
    let colors = [];
    colors.push(req.body.colors);
    req.body.colors = colors;
  }

  if (resultValidation.errors.length > 0) {
    const errors = resultValidation.mapped();
    if (errors.price && req.body.price) {
      delete req.body.price;
    }
    const tallas = await db.Sizes.findAll({ raw: true, neft: true });
    const tonalidades = await db.Colors.findAll({ raw: true, neft: true });
    const categorias = await db.Categories.findAll({ raw: true, neft: true });
    return res.render("products/createProduct", {
      categorias: categorias,
      tallas: tallas,
      tonalidades: tonalidades,
      errors: errors,
      oldData: req.body,
    });
  }

  let created = await db.Products.create({
    name: req.body.name,
    photo: req.file ? req.file.filename : null,
    description: req.body.description,
    price: parseFloat(req.body.price),
    category_id: parseInt(req.body.categories),
  });
  created = JSON.parse(JSON.stringify(created));
  if (req.body.sizes) {
    req.body.sizes.forEach((size) =>
      db.ProductsSizes.create({
        product_id: created.idproduct,
        size_id: parseInt(size),
      })
    );
  }
  if (req.body.colors) {
    req.body.colors.forEach((color) =>
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

exports.update = async (req, res) => {
  const resultValidation = validationResult(req);

  if (typeof req.body.sizes === "string") {
    let sizes = [];
    sizes.push(req.body.sizes);
    req.body.sizes = sizes;
  }
  if (typeof req.body.colors === "string") {
    let colors = [];
    colors.push(req.body.colors);
    req.body.colors = colors;
  }
  if (req.file) {
    req.body.photo = req.file.filename;
  }
  if (resultValidation.errors.length > 0) {
    const errors = resultValidation.mapped();
    if (errors.price && req.body.price) {
      delete req.body.price;
    }
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
    return res.render("products/editProduct", {
      toThousand: toThousand,
      product: product,
      categorias: categorias,
      tallas: tallas,
      tonalidades: tonalidades,
      errors: errors,
      oldData: req.body,
    });
  }

  db.Products.update(
    {
      name: req.body.name,
      photo: req.body.photo,
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
        req.body.sizes
          ? req.body.sizes.forEach((size) =>
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
        req.body.colors
          ? req.body.colors.forEach((color) =>
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

exports.list = async (req, res) => {
  const productos = await db.Products.findAll({
    include: [
      { association: "categoria" },
      { association: "sizes" },
      { association: "colors" },
    ],
  });
  for (let i = 0; i < productos.length; i++) {
    productos[
      i
    ].dataValues.url = `http://localhost:3000/products/detail/${productos[i].idproduct}`;
  }
  res.status(200).json({ productos });
};

exports.detail = async (req, res) => {
  const detalle = await db.Products.findByPk(
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

  detalle.dataValues.imagen = `http://localhost:3000/static/images/products/${detalle.photo}`;

  res.status(200).json(detalle);
};
