const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
  let idDetail = req.params.id - 1;
  let product = products[idDetail];
  res.render("products/product", { product: product, toThousand: toThousand });
};

exports.admproducto = (req, res) => {
  res.render("products/admproduct");
};

exports.store = (req, res) => {
  let product = {};
  let sizes = req.body.sizes;
  let type = req.body.type;
  let tonalidades = req.body.tonalidades;
  sizes = sizes.toString();
  type = type.toString();
  tonalidades = tonalidades.toString();

  product.id = products.length + 1;
  product.name = req.body.name;
  product.categories = req.body.categories;
  product.color = tonalidades;
  product.sizes = sizes;
  product.description = req.body.description;
  product.price = req.body.price;
  product.type = type;
  product.photo = req.body.photo;
  console.log(product.id);
  products.push(product);
  let created = JSON.stringify(products);
  fs.writeFileSync(
    path.join(__dirname, "../data/productsDataBase.json"),
    created
  );
  res.redirect("/products/admproducto");
};

exports.edit = (req, res) => {};
