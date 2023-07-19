var express = require('express');
var router = express.Router();
var accountModel = require("../models/accountmodel");

const isAuth = (req, res, next) => {
  if (req.session.loggedUser) {
    next()
  } else {
    return res.redirect('/login')
  }
}

router.get("/", isAuth, (req, res) => {
  let errormsg = "";
  res.render("register", { errormsg: errormsg });
});

router.post("/", isAuth, async (req, res) => {
  let errormsg = "";
  let checkUsername = await accountModel.find({ username: req.body.username });
  if (checkUsername.length === 0) {
    if (req.body.password === req.body.password2) {
      let user = new accountModel({
        username: req.body.username,
        password: req.body.password,
        permissions: req.body.permissions
      })
      await user.save();
      res.redirect("/login");
    } else {
      // Gesli se ne ujemata
      errormsg = "Gesli se ne ujemata";
      res.render("register", { errormsg: errormsg });
    }
  } else {
    errormsg = "Uporabnik s tem uporabniškim imenom že obstaja."
    res.render("register", { errormsg: errormsg });
  }
})

module.exports = router;