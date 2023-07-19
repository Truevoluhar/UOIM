var express = require('express');
var router = express.Router();

const isAuth = (req, res, next) => {
  if (req.session.loggedUser) {
    next()
  } else {
    return res.redirect('/login')
  }
}

router.get("/", isAuth, (req, res) => {
  res.render("admin");
});

module.exports = router;