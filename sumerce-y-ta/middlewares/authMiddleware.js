const auth = (req, res, next) => {
  if (req.session.userAuth) {
    res.redirect("/users/profile");
  } else {
    next();
  }
};

module.exports = auth;
