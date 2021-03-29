const uniqid = require("uniqid");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

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
  let user = {};
  user.id = uniqid();
  user.name = req.body.name;
  user.phone = req.body.phone;
  user.photo = req.body.photo;
  user.region = req.body.region;
  user.comuna = req.body.comuna;
  user.email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 12);
  user.password = password;
  users.push(user);
  let created = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), created);
};

exports.auth = (req, res) => {
  const mail = req.body.email;
  let log = false;
  users.forEach((user) => {
    if (user.email === mail) {
      const check = bcrypt.compareSync(req.body.password, user.password);
      if (check) {
        log = true;
        res.redirect("/users/profile");
      }
    }
  });
  if (!log) {
    res.redirect("/users/login");
  }
};

exports.profile = (req, res) => {
  res.render("users/profile");
};
