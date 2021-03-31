const uniqid = require("uniqid");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.render("users/register", {
      regiones: regiones,
      comunas: comunas,
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const userInDB = users.find((oneUser) => oneUser.email === req.body.email);
  if (userInDB) {
    return res.render("users/register", {
      regiones: regiones,
      comunas: comunas,
      errors: {
        email: {
          msg: "Este email ya está registrado, use otro email",
        },
      },
      oldData: req.body,
    });
  }

  let user = {};
  user.id = uniqid();
  user.name = req.body.name;
  user.phone = req.body.phone;
  if (req.file) {
    user.photo = req.file.filename;
  }
  user.region = req.body.region;
  user.comuna = req.body.comuna;
  user.email = req.body.email;
  user.password = bcrypt.hashSync(req.body.password, 12);
  users.push(user);

  const created = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), created);
  res.redirect("/users/login");
};

exports.auth = (req, res) => {
  let log = false;
  const user = users.find((oneUser) => oneUser.email === req.body.email);
  if (user) {
    const pass = bcrypt.compareSync(req.body.password, user.password);

    if (pass) {
      const userAut = {
        id: user.id,
        name: user.name,
        phone: user.phone,
        photo: user.photo,
        region: user.region,
        comuna: user.comuna,
        email: user.email,
      };
      log = true;

      req.session.userAuth = userAut;
      if (req.body.remember === "on") {
        res.cookie("auth", userAut.id, { maxAge: 1000 * 60 * 60 * 24 });
      }
      res.redirect("/users/profile");
    }
  }
  if (!log) {
    return res.render("users/login", {
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
  res.clearCookie("auth");
  res.redirect("/");
};
exports.editUser = (req, res) => {
  res.render("users/editar", {
    regiones: regiones,
    comunas: comunas,
    user: req.session.userAuth,
  });
};

exports.updateUser = (req, res) => {
  users.forEach((user) => {
    if (user.id === req.session.userAuth.id) {
      user.name = req.body.name;
      user.phone = req.body.phone;
      user.region = req.body.region;
      user.comuna = req.body.comuna;
      user.email = req.body.email;
      if (req.file) {
        user.photo = req.file.filename;
      }
      const userAut = {
        id: user.id,
        name: user.name,
        phone: user.phone,
        photo: user.photo,
        region: user.region,
        comuna: user.comuna,
        email: user.email,
      };
      req.session.userAuth = userAut;
    }
  });
  let edited = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), edited);
  res.redirect("/users/profile");
};

exports.editPass = (req, res) => {
  res.render("users/editar_contrasena");
};

exports.updatePassword = (req, res) => {
  const resultValidation = validationResult(req);
  console.log(resultValidation.errors.length);
  if (resultValidation.errors.length > 0) {
    return res.render("users/editar_contrasena", {
      errors: resultValidation.mapped(),
    });
  }
  users.forEach((oneUser) => {
    if (oneUser.id === req.session.userAuth.id) {
      const pass = bcrypt.compareSync(
        req.body.passwordAnterior,
        oneUser.password
      );

      if (pass) {
        const passwordNew = bcrypt.hashSync(req.body.password, 12);
        oneUser.password = passwordNew;
        const userAut = {
          id: oneUser.id,
          name: oneUser.name,
          phone: oneUser.phone,
          photo: oneUser.photo,
          region: oneUser.region,
          comuna: oneUser.comuna,
          email: oneUser.email,
        };
        req.session.userAuth = userAut;
      }
    } else {
      return res.render("users/editar_contrasena", {
        errors: {
          passwordAnterior: {
            msg: "Debes ingresar tu contraseña actual",
          },
        },
      });
    }
  });
  let edited = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../data/users.json"), edited);
  res.redirect("/users/profile");
};
