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
  let idDetail = req.params.id;
  const product = await db.Products.findByPk(
    idDetail,
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
  product.price = parseInt(req.body.price);
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
  console.log(product);
  let created = await db.Products.create({
    name: product.name,
    photo: product.photo,
    description: product.description,
    price: product.price,
    category_id: product.categories,
  });
  created = JSON.parse(JSON.stringify(created));
  product.sizes.forEach((size) =>
    db.ProductsSizes.create({
      product_id: created.idproduct,
      size_id: parseInt(size),
    })
  );
  product.colors.forEach((color) =>
    db.ProductsColors.create({
      product_id: created.idproduct,
      color_id: parseInt(color),
    })
  );
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
