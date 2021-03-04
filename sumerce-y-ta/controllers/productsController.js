const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
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

exports.categorias = (req, res) => {
  const category = req.params.category;
  res.render("products/categories", {
    products: products,
    toThousand: toThousand,
    category: category,
  });
};

exports.producto = (req, res) => {
  let idDetail = req.params.id;
  products.forEach((product) => {
    if (product.id === idDetail) {
      res.render("products/product", {
        product: product,
        toThousand: toThousand,
        tallas: tallas,
      });
    }
  });
};

exports.admproducto = (req, res) => {
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
  let sizes = "";
  let type = "";
  let tonalidades = "";

  if (typeof req.body.sizes === "string") {
    sizes = [req.body.sizes];
  }
  if (typeof req.body.type === "string") {
    types = [req.body.type];
  }
  if (typeof req.body.tonalidades === "string") {
    tonalidades = [req.body.color];
  }

  product.id = uniqid();
  product.name = req.body.name;
  product.categories = req.body.categories;
  product.color = tonalidades;
  product.sizes = sizes;
  product.description = req.body.description;
  product.price = req.body.price;
  product.type = type;
  product.photo = req.body.photo;
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
  console.log(req.body);
  let sizes = editProduct.sizes;
  let type = editProduct.type;
  let tonalidades = editProduct.color;

  if (typeof req.body.sizes === "string") {
    sizes = [req.body.sizes];
  }
  if (typeof req.body.type === "string") {
    types = [req.body.type];
  }
  if (typeof req.body.tonalidades === "string") {
    tonalidades = [req.body.tonalidades];
  }

  products.forEach((product) => {
    if (product.id === id) {
      product.name = editProduct.name;
      product.categories = editProduct.categories;
      product.color = tonalidades;
      product.sizes = sizes;
      product.description = editProduct.description;
      product.price = editProduct.price;
      product.type = type;

      product.photo = editProduct.photo;
    }
  });
  let edited = JSON.stringify(products);
  fs.writeFileSync(path.join(__dirname, "../data/products.json"), edited);
  res.redirect("/products/admproducto");
};
