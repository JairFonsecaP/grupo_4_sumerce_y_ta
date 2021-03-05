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

  product.photo = req.body.photo;
  console.log(product);
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

  let tonalidades = [];

  if (typeof req.body.types === "string") {
    types.push(req.body.types);
  }
  if (typeof req.body.tonalidades === "string") {
    tonalidades.push(req.body.tonalidades);
  }

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
      product.photo = editProduct.photo;
      console.log(product);
    }
  });
  let edited = JSON.stringify(products);
  fs.writeFileSync(path.join(__dirname, "../data/products.json"), edited);
  res.redirect("/products/admproducto");
};
