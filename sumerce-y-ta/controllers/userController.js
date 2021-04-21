const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

exports.contacto = (req, res) => {
  res.render("users/contact");
};

exports.login = (req, res) => {
  res.render("users/login");
};

exports.registro = async (req, res) => {
  const regiones = await db.Regions.findAll({ raw: true, netf: true });
  const comunas = await db.Comunas.findAll({
    raw: true,
    netf: true,
  });
  res.render("users/register", { regiones: regiones, comunas: comunas });
};

exports.singup = async (req, res) => {
  const resultValidation = validationResult(req);

  const regiones = await db.Regions.findAll({ raw: true, netf: true });
  const comunas = await db.Comunas.findAll({ raw: true, netf: true });

  if (resultValidation.errors.length > 0) {
    return res.render("users/register", {
      regiones: regiones,
      comunas: comunas,
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const userInDB = await db.Users.findOne({
    where: { email: req.body.email },
    raw: true,
    neft: true,
  });
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
  user.name = req.body.name;
  user.phone = req.body.phone;
  if (req.file) {
    user.photo = req.file.filename;
  }
  user.region = req.body.region;
  user.comuna_id = req.body.comuna;
  user.email = req.body.email;
  user.password = bcrypt.hashSync(req.body.password, 12);

  db.Users.create({
    name: user.name,
    phone: user.phone,
    photo: user.photo,
    email: user.email,
    password: user.password,
    comuna_id: user.comuna_id,
  }).then(res.redirect("/users/login"));
};

exports.auth = async (req, res) => {
  let log = false;
  const user = await db.Users.findOne({
    where: { email: req.body.email },
    raw: true,
    netf: true,
  });
  if (user) {
    const pass = bcrypt.compareSync(req.body.password, user.password);
    if (pass) {
      const userAuth = {
        id: user.iduser,
        name: user.name,
        phone: user.phone,
        photo: user.photo,
        region: user.region,
        comuna: user.comuna,
        email: user.email,
      };
      log = true;

      req.session.userAuth = userAuth;
      if (req.body.remember === "on") {
        res.cookie("auth", userAuth.id, { maxAge: 1000 * 60 * 60 * 24 });
      }
      return res.redirect("/users/profile");
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

exports.profile = async (req, res) => {
  const comuns = await db.Comunas.findByPk(
    req.session.userAuth.comuna,
    { include: ["region"] },
    {
      raw: true,
      netf: true,
    }
  );
  res.render("users/profile", {
    user: req.session.userAuth,
    comuns: comuns,
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("auth");
  res.redirect("/");
};
exports.editUser = async (req, res) => {
  const comunas = await db.Comunas.findAll({ raw: true, netf: true });
  res.render("users/editar", {
    comunas: comunas,
    user: req.session.userAuth,
  });
};

exports.updateUser = (req, res) => {
  const user = {};

  if (user) {
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.comuna_id = req.body.comuna;
    user.email = req.body.email;

    if (req.file) {
      user.photo = req.file.filename;
    }

    req.session.userAuth = {
      id: req.session.userAuth.id,
      name: user.name,
      phone: user.phone,
      photo: user.photo,
      comuna: user.comuna_id,
      email: user.email,
    };

    db.Users.update(
      {
        name: user.name,
        phone: user.phone,
        photo: user.photo,
        email: user.email,
        comuna_id: user.comuna_id,
      },
      {
        where: { iduser: req.session.userAuth.id },
      }
    ).then(res.redirect("/users/profile"));
  }
};

exports.editPass = (req, res) => {
  res.render("users/editar_contrasena");
};

exports.updatePassword = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.render("users/editar_contrasena", {
      errors: resultValidation.mapped(),
    });
  }

  const user = await db.Users.findByPk(req.session.userAuth.id, {
    raw: true,
    netf: true,
  });
  if (user) {
    const pass = bcrypt.compareSync(req.body.passwordAnterior, user.password);

    if (pass) {
      const passwordNew = bcrypt.hashSync(req.body.password, 12);
      console.log(passwordNew);
      db.Users.update(
        {
          password: passwordNew,
        },
        {
          where: { iduser: user.iduser },
        }
      ).then(res.redirect("/users/profile"));
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
};
