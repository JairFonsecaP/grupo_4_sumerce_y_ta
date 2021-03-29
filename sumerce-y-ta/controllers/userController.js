const uniqid = require("uniqid");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/users.json");
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const comunas = require("../data/comunas");
const regiones = require("../data/regiones");

exports.contacto = (req, res) => {
  res.render("users/contact");
};

exports.login = (req, res) => {
  res.render("users/login");
};

exports.registro = (req, res) => {
  res.render("users/register", { regiones: regiones, comunas: comunas });
};

exports.singup = (req, res) => {
  const userInDB = users.find((oneUser) => oneUser.email === req.body.email);

  if (userInDB) {
    return res.render("user/register", {
      errors: {
        email: {
          msg: "Este email ya está registrado",
        },
      },
      oldData: req.body,
    });
  }
  let user = {};
  user.id = uniqid();
  user.name = req.body.name;
  user.phone = req.body.phone;
  user.photo = req.file.filename;
  user.region = req.body.region;
  user.comuna = req.body.comuna;
  user.email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 12);
  user.password = password;
  users.push(user);

  const created = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), created);
  res.redirect("/users/login");
};

exports.auth = (req, res) => {
  console.log(req.body);
  let log = false;
  const user = users.find((oneUser) => oneUser.email === req.body.email);
  if (user) {
    const pass = bcrypt.compareSync(req.body.password, user.password);
    if (pass) {
      delete user.password;
      log = true;
      if (req.body.remember === "on") {
      }
      req.session.userAuth = user;

      res.redirect("/users/profile");
    }
  }
  if (!log) {
    return res.render("/users/login", {
      errors: {
        log: "error buscando el usuario, compruebe usuario y/o contraseña",
      },
    });
  }
};

exports.profile = (req, res) => {
  res.render("users/profile", {
    user: req.session.userAuth,
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
