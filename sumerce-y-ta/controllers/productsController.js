const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

exports.carrito = (req, res) => {
  res.render("products/cart");
};

exports.categorias = (req, res) => {
  res.render("products/categories", {
    products: products,
    toThousand: toThousand,
  });
};

exports.producto = (req, res) => {
  let idDetail = req.params.id - 1;
  let product = products[idDetail];
  res.render("products/product", { product: product, toThousand: toThousand });
};

exports.admproducto = (req, res) => {
  res.render("products/admproduct");
};

exports.store = (req, res) => {
  let product = {};
  product.name = req.body.name;
  product.price = req.body.price;
  product.discount = req.body.discount;
  product.category = req.body.category;
  product.description = req.body.description;
  product.id = products.length + 1;
  products.push(product);
  let created = JSON.stringify(products);
  fs.writeFileSync(
    path.join(__dirname, "../data/productsDataBase.json"),
    created
  );
  // res.send(products);
  let ruta = path.join(__dirname, "/products/detail/18");
};
