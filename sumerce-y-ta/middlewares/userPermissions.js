const db = require("../database/models");

const userPermissions = async (req, res, next) => {
  if (!req.session.isLogged && req.cookies.auth) {
    const user = await db.Users.findByPk(req.cookies.auth);
    const userAut = {
      id: user.iduser,
      name: user.name,
      phone: user.phone,
      photo: user.photo,
      comuna: user.comuna_id,
      email: user.email,
    };
    req.session.userAuth = userAut;
  }

  res.locals.isLogged = false;
  if (req.session.userAuth) {
    res.locals.isLogged = true;
    res.locals.userAuth = req.session.userAuth;
  }
  next();
};

module.exports = userPermissions;
