exports.index = (req, res) => {
  res.render("index");
};

exports.carrito = (req, res) => {
  res.render("cart");
};

exports.categorias = (req, res) => {
  res.render("categories");
};

exports.contacto = (req, res) => {
  res.render("contact");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.producto = (req, res) => {
  res.render("product");
};

exports.registro = (req, res) => {
  res.render("register");
};
