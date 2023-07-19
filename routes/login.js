var express = require('express');
var router = express.Router();
var accountModel = require("../models/accountmodel");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let account = await accountModel.findOne({ username: username });
  if (account.username === username && account.password === password) {
    req.session.loggedUser = { permissions: account.permissions, username: account.username };
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
})

module.exports = router;