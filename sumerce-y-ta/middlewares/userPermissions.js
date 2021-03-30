const users = require("../data/users.json");

const userPermissions = (req, res, next) => {
  if (!req.session.isLogged && req.cookies.auth) {
    const userCookie = users.find((user) => req.cookies.auth === user.id);
    req.session.userAuth = userCookie;
  }

  res.locals.isLogged = false;
  if (req.session.userAuth) {
    res.locals.isLogged = true;
    res.locals.userAuth = req.session.userAuth;
  }
  next();
};

module.exports = userPermissions;
