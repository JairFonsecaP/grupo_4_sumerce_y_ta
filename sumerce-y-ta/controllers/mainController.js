const db = require("../database/models");

//const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

exports.index = async (req, res) => {
  const products = await db.Products.findAll({
    include: [{ association: "categoria" }],
    raw: true,
    neft: true,
  });

  res.render("index", { products });
};

// exports.search = (req, res) => {
//   let busca = req.query.search;
//   let results = [];

//   products.forEach((product) => {
//     if (product.name.includes(busca)) {
//       results.push(product);
//     }
//   });

//   res.render("results", { results: results, busca: busca });
// };
