const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

exports.index = (req, res) => {
  res.render("index", {products:products});
};

exports.search = (req, res) => {
  let busca = req.query.search;
  let results = [];

  products.forEach((product) => {
    if (product.name.includes(busca)) {
      results.push(product);
    }
  });

  res.render("results", { results: results, busca: busca });
};
