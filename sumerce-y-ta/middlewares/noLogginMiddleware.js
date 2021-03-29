const noLoggin = (req, res, next) => {
  if (!req.session.userAuth) {
    res.redirect("/users/login");
  } else {
    next();
  }
};
module.exports = noLoggin;
