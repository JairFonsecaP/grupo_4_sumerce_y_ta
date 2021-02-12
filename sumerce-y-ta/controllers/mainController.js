exports.index = (req, res) => {
  res.render("index");
};

exports.carrito = (req, res) => {
  res.render("products/cart");
};

exports.categorias = (req, res) => {
  res.render("products/categories");
};

exports.producto = (req, res) => {
  res.render("products/product");
};


exports.contacto = (req, res) => {
  res.render("users/contact");
};

exports.login = (req, res) => {
  res.render("users/login");
};

exports.registro = (req, res) => {
  res.render("users/register");
};
