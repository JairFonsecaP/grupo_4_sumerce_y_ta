const users = require("../data/users.json");

const userPermissions = (req, res, next) => {
  if (!req.session.isLogged && req.cookies.auth) {
    const user = users.find((user) => req.cookies.auth === user.id);

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

  res.locals.isLogged = false;
  if (req.session.userAuth) {
    res.locals.isLogged = true;
    res.locals.userAuth = req.session.userAuth;
  }
  next();
};

module.exports = userPermissions;
