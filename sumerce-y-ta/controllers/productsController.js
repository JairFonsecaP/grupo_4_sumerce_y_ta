const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const tallas = ["XS", "S", "M", "XL", "XLL"];
const tonalidades = [
  "Claro",
  "Medio",
  "Oscuro",
  "Pasteles",
  "Militar",
  "Multicolor",
  "Metalizados",
];
const tipos = ["Manga-larga", "Deportivas", "Top", "Manga-corta", "Sin-manga"];

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
  let idDetail = req.params.id;
  const product = await db.Products.findByPk(idDetail, {
    include: [
      { association: "categoria" },
      { association: "sizes" },
      { association: "colors" },
    ],
    raw: true,
    neft: true,
  });

  const tallas = await db.Sizes.findAll({ raw: true, neft: true });

  res.render("products/product", {
    product: product,
    toThousand: toThousand,
    tallas: tallas,
  });
};

exports.admproducto = async (req, res) => {
  const products = await db.Products.findAll({
    include: [{ association: "categoria" }],
    raw: true,
    neft: true,
  });

  res.render("products/admproduct", {
    products: products,
    toThousand: toThousand,
  });
};

exports.create = (req, res) => {
  res.render("products/createProduct", {
    tallas: tallas,
    tonalidades: tonalidades,
    tipos: tipos,
  });
};

exports.store = (req, res) => {
  let product = {};

  if (typeof req.body.sizes === "string") {
    let sizes = [];
    sizes.push(req.body.sizes);
    product.sizes = sizes;
  } else {
    product.sizes = req.body.sizes;
  }
  if (typeof req.body.types === "string") {
    let types = [];
    types.push(req.body.types);
    product.types = types;
  } else {
    product.types = req.body.types;
  }
  if (typeof req.body.color === "string") {
    let tonalidades = [];
    tonalidades.push(req.body.types);
    product.color = tonalidades;
  } else {
    product.color = req.body.color;
  }

  product.id = uniqid();
  product.name = req.body.name;
  product.categories = req.body.categories;

  product.description = req.body.description;
  product.price = req.body.price;
  if (req.file) {
    product.photo = req.file.filename;
  }
  products.push(product);
  let created = JSON.stringify(products);
  fs.writeFileSync(path.join(__dirname, "../data/products.json"), created);
  res.redirect("/products/admproducto");
};

exports.edit = (req, res) => {
  const id = req.params.id;
  products.forEach((product) => {
    if (product.id === id) {
      res.render("products/editProduct", {
        product: product,
        tallas: tallas,
        tipos: tipos,
        tonalidades: tonalidades,
        toThousand: toThousand,
      });
    }
  });
};

exports.update = (req, res) => {
  let id = req.params.id;
  let editProduct = req.body;

  products.forEach((product) => {
    if (product.id === id) {
      if (typeof req.body.sizes === "string") {
        let sizes = [];
        sizes.push(req.body.sizes);
        product.sizes = sizes;
      } else {
        product.sizes = req.body.sizes;
      }
      if (typeof req.body.types === "string") {
        let types = [];
        types.push(req.body.types);
        product.types = types;
      } else {
        product.types = req.body.types;
      }
      if (typeof req.body.color === "string") {
        let tonalidades = [];
        tonalidades.push(req.body.types);
        product.color = tonalidades;
      } else {
        product.color = req.body.color;
      }

      product.name = editProduct.name;
      product.categories = editProduct.categories;
      product.description = editProduct.description;
      product.price = editProduct.price;
      if (editProduct.file) {
        product.photo = editProduct.file.filename;
      }
    }
  });
  let edited = JSON.stringify(products);
  fs.writeFileSync(path.join(__dirname, "../data/products.json"), edited);
  res.redirect("/products/admproducto");
};

exports.delete = (req, res) => {
  db.Products.destroy({
    where: { idproduct: req.params.id },
  }).then(res.redirect("/products/admproducto"));
};
